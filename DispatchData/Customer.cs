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
    
    public partial class Customer
    {
        public Customer()
        {
            this.Dispatchers = new HashSet<Dispatcher>();
            this.Orders = new HashSet<Order>();
            this.Users = new HashSet<User>();
            this.Vehicles = new HashSet<Vehicle>();
        }
    
        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
        public string CustomerPhone { get; set; }
    
        public virtual ICollection<Dispatcher> Dispatchers { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<User> Users { get; set; }
        public virtual ICollection<Vehicle> Vehicles { get; set; }
    }
}