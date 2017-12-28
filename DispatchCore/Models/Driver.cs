using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DispatchCore.Models
{
    public class Driver
    {
        public int DriverId { get; set; }
        public String Handle { get; set; }
        public String Name { get; set; }
        public int? BrokerOwnerId { get; set; }
        public Broker BrokerOwner { get; set; }
        public int? OnDuty { get; set; }
        public int? HomeLocationId { get; set; }
        public Location HomeLocation { get; set; }
      
    }
}
