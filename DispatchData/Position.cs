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
    
    public partial class Position
    {
        public int PositionId { get; set; }
        public Nullable<float> Lat { get; set; }
        public Nullable<float> Lon { get; set; }
        public Nullable<System.DateTime> PositionTime { get; set; }
        public Nullable<int> UserId { get; set; }
        public Nullable<int> VehicleId { get; set; }
    
        public virtual User User { get; set; }
        public virtual Vehicle Vehicle { get; set; }
    }
}
