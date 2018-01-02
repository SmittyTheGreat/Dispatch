using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DispatchCore.Models;

namespace DispatchData.Repositories
{
    public class VendorRepository
    {
        public SearchResults<DispatchCore.Models.Vendor> GetVendors (SearchOptions<DispatchCore.Models.Vendor> filter)
        {
            List<DispatchCore.Models.Vendor> results = new List<DispatchCore.Models.Vendor>();
            using (DispatchEntities db = new DispatchEntities())
            {
                var query = db.Vendors.Select(v => new DispatchCore.Models.Vendor()
                {
                    VendorId = v.VendorId,
                    Name = v.Name,
                    HomeLocationId = v.HomeLocationId                   
                    
                });

                results = query.ToList();
            }

            return new SearchResults<DispatchCore.Models.Vendor>(results, results.Count);

        }

        public DispatchCore.Models.Vendor GetVendor(int vendorId)
        {
            DispatchCore.Models.Vendor result = new DispatchCore.Models.Vendor();
            using(DispatchEntities db = new DispatchEntities())
            {
                var v = db.Vendors.FirstOrDefault(ven => ven.VendorId == vendorId);
                if(v != null)
                {

                    result.VendorId = v.VendorId;
                    result.Name = v.Name;
                    result.HomeLocationId = v.HomeLocationId;
                }

            }

            return result;
        }

        public DispatchCore.Models.Vendor SetVendor(DispatchCore.Models.Vendor v)
        {
            using(DispatchEntities db = new DispatchEntities())
            {
                Vendor dbVendor = db.Vendors.FirstOrDefault(ven => ven.VendorId == v.VendorId);
                if(dbVendor == null)
                {
                    dbVendor = db.Vendors.Create();
                    db.Vendors.Add(dbVendor);

                }

                dbVendor.Name = v.Name;
                dbVendor.HomeLocationId = v.HomeLocationId;

                db.SaveChanges();

                v.VendorId = dbVendor.VendorId;
            }

            return v;
        }
    }
}
