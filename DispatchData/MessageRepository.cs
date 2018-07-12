using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DispatchCore.Models;

namespace DispatchData.Repositories
{
    public class MessageRepository
    {
        public SearchResults<DispatchCore.Models.Message> GetMessages(SearchOptions<DispatchCore.Models.Message> filter)
        {
            List<DispatchCore.Models.Message> results = new List<DispatchCore.Models.Message>();
            using(DispatchEntities db = new DispatchEntities())
            {
                var query = db.Messages.Select(m => new DispatchCore.Models.Message()
                {
                    MessageId = m.MessageId,
                    MessageText = m.MessageText.MessageText1,
                    ToUser = new DispatchCore.Models.User()
                    {
                        UserId = m.User.UserId,
                        FirebaseToken = m.User.FirebaseToken
                    },
                    FromUser = new DispatchCore.Models.User()
                    {
                        UserId = m.User1.UserId,
                        UserName = m.User1.UserName
                    },
                    Type = new DispatchCore.Models.MessageType()
                    {
                        MessageTypeId = m.MessageType.MessageTypeId,
                        MessageTypeName = m.MessageType.MessageType1
                    },
                    ReadByUser = m.ReadByUser
                });

                if(filter != null)
                {
                    if(filter.filter != null)
                    {
                        if(filter.filter.ToUserId != null)
                        {
                            query = query.Where(u => u.ToUserId == filter.filter.ToUserId);
                        }
                    }
                }
                results = query.ToList();
            }

            return new SearchResults<DispatchCore.Models.Message>(results, results.Count);
        }

       
        public DispatchCore.Models.Message SetMessage(DispatchCore.Models.Message m)
        {
            using(DispatchEntities db = new DispatchEntities())
            {
                var dbMessage = db.Messages.FirstOrDefault(mess => mess.MessageId == m.MessageId);
                
                if(dbMessage == null)
                {
                    dbMessage = db.Messages.Create();
                    db.Messages.Add(dbMessage);
                }

                var dbMessageText = db.MessageTexts.Create();
                db.MessageTexts.Add(dbMessageText);
                dbMessageText.MessageText1 = m.MessageText;
                db.SaveChanges();
                dbMessage.MessageTextId = dbMessageText.MessageTextId;
                dbMessage.ToUserId = m.ToUser.UserId;
                dbMessage.FromUserId = m.FromUser.UserId;
                dbMessage.MessageTypeId = m.Type.MessageTypeId;

                db.SaveChanges();

                m.MessageId = dbMessage.MessageId;

            }
            return m;
        }


        public List<DispatchCore.Models.MessageType> GetMessageTypes()
        {
            List<DispatchCore.Models.MessageType> results = new List<DispatchCore.Models.MessageType>();
            using (DispatchEntities db = new DispatchEntities())
            {
                var query = db.MessageTypes.Select(mt => new DispatchCore.Models.MessageType()
                {
                    MessageTypeId = mt.MessageTypeId,
                    MessageTypeName = mt.MessageType1
                });
                results = query.ToList();
            }

            return results;
        }
    }
}
