using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DispatchCore.Models
{
    public class Order
    {
      

        public int OrderId { get; set; }
        public String OrderNumber { get; set; }
        public int? CustomerId { get; set; }
        public Customer OrderCustomer { get; set; }
        public int? VendorId { get; set; }
        public Vendor OrderVendor { get; set; }
        public List<StandbySegment> StandbySegments { get; set; }
        public List<TravelSegment> TravelSegments { get; set; }
        public int? IsRecurring { get; set; }
    }
}
