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
    
    public partial class Product
    {
        public Product()
        {
            this.TravelSegments = new HashSet<TravelSegment>();
            this.StandbySegments = new HashSet<StandbySegment>();
        }
    
        public int ProductId { get; set; }
        public string Name { get; set; }
        public Nullable<int> PickupLocationId { get; set; }
        public Nullable<int> VendorId { get; set; }
        public string Notes { get; set; }
    
        public virtual Location Location { get; set; }
        public virtual Vendor Vendor { get; set; }
        public virtual ICollection<TravelSegment> TravelSegments { get; set; }
        public virtual ICollection<StandbySegment> StandbySegments { get; set; }
    }
}
