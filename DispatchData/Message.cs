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
    
    public partial class Message
    {
        public int MessageId { get; set; }
        public int ToUserId { get; set; }
        public int FromUserId { get; set; }
        public int MessageTypeId { get; set; }
        public int MessageTextId { get; set; }
        public bool ReadByUser { get; set; }
    
        public virtual User User { get; set; }
        public virtual MessageText MessageText { get; set; }
        public virtual MessageType MessageType { get; set; }
        public virtual User User1 { get; set; }
    }
}
