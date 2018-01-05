using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DispatchCore.Models
{
    public class Dispatcher
    {
        public int DispatcherId { get; set; }
        public String Handle { get; set; }
        public String Name { get; set; }
        public int? VendorId { get; set; }
        public Vendor DispatcherVendor { get; set; }
        public int? BrokerId { get; set; }
        public Broker DispatcherBroker { get; set; }
        public int? CustomerId { get; set; }
        public Customer DispatcherCustomer { get; set; }
    }
}
