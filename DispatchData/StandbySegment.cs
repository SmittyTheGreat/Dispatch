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
    
    public partial class StandbySegment
    {
        public int StandbySegmentId { get; set; }
        public Nullable<int> OrderId { get; set; }
        public Nullable<int> AssignedVehicleId { get; set; }
        public Nullable<int> AssignedDriverId { get; set; }
        public Nullable<int> AssignedBrokerId { get; set; }
        public Nullable<int> ProductId { get; set; }
        public Nullable<System.DateTime> ScheduledStart { get; set; }
        public Nullable<System.DateTime> ScheduledEnd { get; set; }
        public Nullable<System.DateTime> ActualStart { get; set; }
        public Nullable<System.DateTime> ActualEnd { get; set; }
        public Nullable<int> OrderIndex { get; set; }
        public Nullable<int> StandbyLocationId { get; set; }
        public Nullable<int> SegmentStatusId { get; set; }
        public Nullable<int> StatusChangeAckDriver { get; set; }
        public Nullable<int> StatusChangeAckDispatch { get; set; }
        public Nullable<int> StatusChangeAckVendor { get; set; }
        public Nullable<int> StatusChangeAckCustomer { get; set; }
        public Nullable<int> StatusChangeAckBroker { get; set; }
        public Nullable<int> SegmentActivityId { get; set; }
        public Nullable<int> VehicleScheduleId { get; set; }
        public Nullable<int> DriverScheduleId { get; set; }
        public Nullable<int> VehicleScheduleIndex { get; set; }
        public Nullable<int> DriverScheduleIndex { get; set; }
    
        public virtual Broker Broker { get; set; }
        public virtual Driver Driver { get; set; }
        public virtual Location Location { get; set; }
        public virtual Order Order { get; set; }
        public virtual Product Product { get; set; }
        public virtual SegmentStatus SegmentStatus { get; set; }
        public virtual Vehicle Vehicle { get; set; }
        public virtual SegmentActivity SegmentActivity { get; set; }
        public virtual DriverSchedule DriverSchedule { get; set; }
        public virtual VehicleSchedule VehicleSchedule { get; set; }
    }
}
