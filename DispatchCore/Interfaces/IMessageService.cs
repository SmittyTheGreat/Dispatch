using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DispatchCore.Models;

namespace DispatchCore.Interfaces
{
    public interface IMessageService
    {
        SearchResults<Message> SearchMessages(SearchOptions<Message> filter);
        Message SetMessage(Message m);
        List<MessageType> GetMessageTypes();
    }
}
