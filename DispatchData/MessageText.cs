//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DispatchData
{
    using System;
    using System.Collections.Generic;
    
    public partial class MessageText
    {
        public MessageText()
        {
            this.Messages = new HashSet<Message>();
        }
    
        public int MessageTextId { get; set; }
        public Nullable<int> MessageId { get; set; }
        public string MessageText1 { get; set; }
    
        public virtual ICollection<Message> Messages { get; set; }
    }
}