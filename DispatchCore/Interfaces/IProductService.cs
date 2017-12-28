using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DispatchCore.Models;

namespace DispatchCore.Interfaces
{
    public interface IProductService
    {
        SearchResults<Product> GetProducts(SearchOptions<Product> filter);
        Product GetProduct(int productId);
        Product SetProduct(Product product);
    }
}
