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
    
    public partial class DriverSchedule
    {
        public DriverSchedule()
        {
            this.TravelSegments = new HashSet<TravelSegment>();
            this.StandbySegments = new HashSet<StandbySegment>();
        }
    
        public int DriverScheduleId { get; set; }
        public Nullable<int> DriverId { get; set; }
        public Nullable<int> DispatchedBy { get; set; }
        public Nullable<int> BrokerId { get; set; }
    
        public virtual Broker Broker { get; set; }
        public virtual Dispatcher Dispatcher { get; set; }
        public virtual Driver Driver { get; set; }
        public virtual ICollection<TravelSegment> TravelSegments { get; set; }
        public virtual ICollection<StandbySegment> StandbySegments { get; set; }
    }
}
