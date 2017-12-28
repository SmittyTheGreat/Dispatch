using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DispatchCore.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public String Name { get; set; }
        public int? PickupLocationId { get; set; }
        public Location PickupLocation { get; set; }
        public int? VendorId { get; set; }
        public Vendor ProductVendor { get; set; }
        public String Notes { get; set; }

    }
}
