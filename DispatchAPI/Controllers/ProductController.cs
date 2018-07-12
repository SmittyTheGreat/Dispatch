using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DispatchService;
using DispatchCore.Models;
using System.Web.Http.Cors;



namespace DispatchAPI.Controllers
{
    [AllowAnonymous]
   // [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ProductController : ApiController
    {
        DispatchCore.Interfaces.IProductService productService;
        public ProductController() : this(new ProductService()) { }
        public ProductController(DispatchCore.Interfaces.IProductService service)
        {
            this.productService = service;
        }

        [HttpPost]
        public IHttpActionResult SearchProducts(Product filter)
        {
            var theFilter = new SearchOptions<Product>(filter, 0, 10, "", false);
            var results = productService.GetProducts(theFilter);
            return Ok(results);
        }

        [HttpGet]
        public IHttpActionResult GetProduct(int id)
        {
            var results = productService.GetProduct(id);
            return Ok(results);
        }

        [HttpPost]
        public IHttpActionResult SetProduct(Product p)
        {
            var results = productService.SetProduct(p);
            return Ok(results);
        }

       

    }
}
