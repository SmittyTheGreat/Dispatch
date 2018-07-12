using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DispatchCore.Models
{
    public class Message
    {
        public int MessageId { get; set; }
        public int? ToUserId { get; set; }
        public int? FromUserId { get; set; }
        public int? TypeId { get; set; }
        public String MessageText { get; set; }
        public User ToUser { get; set; }
        public User FromUser { get; set; }
        public MessageType Type { get; set; }
        public bool? ReadByUser { get; set; }
    }
}
