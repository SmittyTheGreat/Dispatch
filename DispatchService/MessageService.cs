using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DispatchCore.Models;
using DispatchCore.Interfaces;
using DispatchData.Repositories;

namespace DispatchService
{
    public class MessageService : IMessageService

    {
        private MessageRepository repo;
        public MessageService() { repo = new MessageRepository(); }
        public SearchResults<Message> SearchMessages(SearchOptions<Message> filter)
        {
            return repo.GetMessages(filter);
        }
        public Message SetMessage(Message m)
        {
            return repo.SetMessage(m);
        }
        public List<MessageType> GetMessageTypes()
        {
            return repo.GetMessageTypes();
        }
    }
}
