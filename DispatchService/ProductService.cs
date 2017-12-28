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
    public class ProductService : IProductService
    {
        private ProductRepository repo;
        public ProductService() { repo = new ProductRepository(); }
        public SearchResults<Product> GetProducts(SearchOptions<Product> filter)
        {
            return repo.GetProducts(filter);
        }
        public Product GetProduct(int productId)
        {
            return repo.GetProduct(productId);
        }
        public Product SetProduct(Product product)
        {
            return repo.SetProduct(product);
        }
    }
}
