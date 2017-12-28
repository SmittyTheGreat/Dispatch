using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DispatchCore.Models
{
    public class Vehicle
    {
        public int VehicleId { get; set; }
        public int? VehicleTypeId { get; set; }
        public VehicleType VehType { get; set; }
        public int? StartingMileage { get; set; }
        public int? CurrentMileage { get; set; }
        public int? HomeLocationId { get; set; }
        public Location HomeLocation { get; set; }
        public int? CurrentDriverId { get; set; }
        public Driver CurrentDriver { get; set; }
        public int? BrokerOwnerId { get; set; }
        public Broker BrokerOwner { get; set; }
        public int? VendorOwnerId { get; set; }
        public Vendor VendorOwner { get; set; }
        public int? CustomerOwnerId { get; set; }
        public Customer CustomerOwner { get; set; }
        public int? DriverOwnerId { get; set; }
        public Driver DriverOwner { get; set; }
    }
}
