using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DispatchCore.Models
{
    public class Broker
    {
        public int BrokerId { get; set; }
        public String Name { get; set; }
        public int? HomeLocationId { get; set; }
        public Location HomeLocation { get; set; }
    }
}
