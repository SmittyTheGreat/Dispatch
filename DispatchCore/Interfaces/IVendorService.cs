using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DispatchCore.Models;

namespace DispatchCore.Interfaces
{
    public interface IVendorService
    {
        SearchResults<Vendor> SearchVendors(SearchOptions<Vendor> filter);
        Vendor GetVendor(int id);
        Vendor SetVendor(Vendor input);
    }
}
