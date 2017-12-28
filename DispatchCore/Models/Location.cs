using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DispatchCore.Models
{
    public class Location
    {
        public int LocationId { get; set; }
        public String Name { get; set; }
        public String Address { get; set; }
        public String State { get; set; }
        public String City { get; set; }
        public String Zip { get; set; }
        public float? Lat { get; set; }
        public float? Lon { get; set; }
        public int? IsPickup { get; set; }
        public int? CustomerOwnerId { get; set; }
        public Customer CustomerOwner { get; set; }
        public int? VendorOwnerId { get; set; }
        public Vendor VendorOwner { get; set; }

    }
}
