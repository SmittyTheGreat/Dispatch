using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DispatchCore.Models
{
    public class VehicleSchedule
    {
        public int VehicleScheduleId { get; set; }
        public int? VehicleId { get; set; }
        public int? DispatchedById { get; set; }
        public Dispatcher DispatchedBy { get; set; }
        public int? BrokerId { get; set; }
        public Broker VehicleBroker { get; set; }
    }
}
