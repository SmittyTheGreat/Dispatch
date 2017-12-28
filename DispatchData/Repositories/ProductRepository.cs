using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DispatchCore.Models;

namespace DispatchData.Repositories
{
    public class ProductRepository
    {
        public SearchResults<DispatchCore.Models.Product> GetProducts(SearchOptions<DispatchCore.Models.Product> filter)
        {
            List<DispatchCore.Models.Product> results = new List<DispatchCore.Models.Product>();
            using (DispatchEntities db = new DispatchEntities())
            {
                var query = db.Products.Select(p => new DispatchCore.Models.Product()
                {
                    ProductId = p.ProductId,
                    Name = p.Name,
                    PickupLocationId = p.PickupLocationId,
                    VendorId = p.VendorId,
                    Notes = p.Notes
                });

                results = query.ToList();
            }
            return new SearchResults<DispatchCore.Models.Product>(results, results.Count);
        }

        public DispatchCore.Models.Product GetProduct(int productId)
        {
            DispatchCore.Models.Product result = new DispatchCore.Models.Product();
            using(DispatchEntities db = new DispatchEntities())
            {
                var p = db.Products.FirstOrDefault(prod => prod.ProductId == productId);
                if(p != null)
                {
                    result.ProductId = p.ProductId;
                    result.Name = p.Name;
                    result.PickupLocationId = p.PickupLocationId;
                    result.VendorId = p.VendorId;
                    result.Notes = p.Notes;
                }
            }
            return result;
        }

        public DispatchCore.Models.Product SetProduct(DispatchCore.Models.Product p)
        {
            using(DispatchEntities db = new DispatchEntities())
            {
                Product dbProduct = db.Products.FirstOrDefault(prod => prod.ProductId == p.ProductId);
                if (dbProduct == null)
                {
                    dbProduct = db.Products.Create();
                    db.Products.Add(dbProduct);

                }

                dbProduct.Name = p.Name;
                dbProduct.PickupLocationId = p.PickupLocationId;
                dbProduct.VendorId = p.VendorId;
                dbProduct.Notes = p.Notes;

                db.SaveChanges();

                p.ProductId = dbProduct.ProductId;


            }

            return p;
        }
    }
}
