//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DispatchData
{
    using System;
    using System.Collections.Generic;
    
    public partial class Location
    {
        public Location()
        {
            this.Brokers = new HashSet<Broker>();
            this.Drivers = new HashSet<Driver>();
            this.Products = new HashSet<Product>();
            this.StandbySegments = new HashSet<StandbySegment>();
            this.Vehicles = new HashSet<Vehicle>();
            this.Vendors = new HashSet<Vendor>();
        }
    
        public int LocationId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public Nullable<float> Lat { get; set; }
        public Nullable<float> Lon { get; set; }
        public Nullable<int> IsPickup { get; set; }
        public Nullable<int> CustomerId { get; set; }
        public Nullable<int> VendorId { get; set; }
    
        public virtual ICollection<Broker> Brokers { get; set; }
        public virtual ICollection<Driver> Drivers { get; set; }
        public virtual ICollection<Product> Products { get; set; }
        public virtual ICollection<StandbySegment> StandbySegments { get; set; }
        public virtual ICollection<Vehicle> Vehicles { get; set; }
        public virtual ICollection<Vendor> Vendors { get; set; }
    }
}
