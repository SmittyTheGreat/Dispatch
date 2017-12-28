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
    
    public partial class User
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string HumanName { get; set; }
        public string Email { get; set; }
        public Nullable<int> BrokerId { get; set; }
        public Nullable<int> VendorId { get; set; }
        public Nullable<int> DriverId { get; set; }
        public Nullable<int> CustomerId { get; set; }
        public Nullable<int> DispatcherId { get; set; }
        public Nullable<System.DateTime> LastLogin { get; set; }
        public string Device { get; set; }
        public string Version { get; set; }
        public Nullable<float> CurrentLat { get; set; }
        public Nullable<float> CurrentLon { get; set; }
        public Nullable<float> LastLocationTime { get; set; }
    
        public virtual Broker Broker { get; set; }
        public virtual Customer Customer { get; set; }
        public virtual Dispatcher Dispatcher { get; set; }
        public virtual Driver Driver { get; set; }
        public virtual Vendor Vendor { get; set; }
    }
}
