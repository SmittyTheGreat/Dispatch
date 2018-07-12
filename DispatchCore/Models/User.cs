using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DispatchCore.Models
{
    public class User
    {
        public int UserId { get; set; }
        public String UserName { get; set; }
        public String HumanName { get; set; }
        public String Email { get; set; }
        public int? BrokerId { get; set; }
        public int? VendorId { get; set; }
        public int? DriverId { get; set; }
        public int? CustomerId { get; set; }
        public int? DispatcherId { get; set; }
        public DateTime? LastLogin { get; set; }
        public String Device { get; set; }
        public String Version { get; set; }
        public float? CurrentLat { get; set; }
        public float? CurrentLon { get; set; }
        public DateTime? LastLocationTime { get; set; }
        public String FirebaseToken { get; set; }
    }
}
