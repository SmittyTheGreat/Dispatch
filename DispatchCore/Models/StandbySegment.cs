using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DispatchCore.Models
{
    public class StandbySegment
    {
        public int StandbySegmentId { get; set; }
        public int? OrderId { get; set; }
        public Order SegmentOrder { get; set; }
        public int? AssignedVehicleId { get; set; }
        public Vehicle AssignedVehicle { get; set; }
        public int? AssignedDriverId { get; set; }
        public Driver AssignedDriver { get; set; }
        public int? AssignedBrokerId { get; set; }
        public Broker AssignedBroker { get; set; }
        public int? ProductId { get; set; }
        public Product SegmentProduct { get; set; }
        public DateTime? ScheduledStart { get; set; } 
        public DateTime? ScheduledEnd { get; set; }
        public DateTime? ActualStart { get; set; }
        public DateTime? ActualEnd { get; set; }
        public int? OrderIndex { get; set; }
        public int? VehicleScheduleId { get; set; }
        public int? DriverScheduleId { get; set; }
        public int? VehicleScheduleIndex { get; set; }
        public int? DriverScheduleIndex { get; set; }
        public int? StandbyLocationId { get; set; }
        public Location StandbyLocation { get; set; }
        public int? SegmentActivityId { get; set; }
        public SegmentActivity StandbyActivity { get; set; }
        public int? SegmentStatusId { get; set; }
        public SegmentStatus SegmentStatus { get; set; }
        public int? StatusChangeAckDriver { get; set; }
        public int? StatusChangeAckDispatch { get; set; }
        public int? StatusChangeAckVendor { get; set; }
        public int? StatusChangeAckCustomer { get; set; }
        public int? StatusChangeAckBroker { get; set; }

    }
}
