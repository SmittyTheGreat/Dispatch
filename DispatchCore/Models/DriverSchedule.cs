using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DispatchCore.Models
{
    public class DriverSchedule
    {
        public int DriverScheduleId { get; set; }
        public int? DriverId { get; set; }
        public int? DispatchedById { get; set; }
        public Dispatcher DispatchedBy { get; set; }
        public int? BrokerId { get; set; }
        public Broker DriverBroker { get; set; }
    }
}
