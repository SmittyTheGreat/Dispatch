using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DispatchCore.Models;
using DispatchCore.Interfaces;
using DispatchData.Repositories;

namespace DispatchService
{
    public class VendorService : IVendorService

    {
        private VendorRepository repo;
        public VendorService() { repo = new VendorRepository(); }
        public SearchResults<Vendor> SearchVendors(SearchOptions<Vendor> filter)
        {
            return repo.GetVendors(filter);
        }
        public Vendor GetVendor(int id)
        {
            return repo.GetVendor(id);
        }
        public Vendor SetVendor(Vendor vendor)
        {
            return repo.SetVendor(vendor);
        }
    }
}
