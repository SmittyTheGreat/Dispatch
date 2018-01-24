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
    public class CustomerController : ApiController
    {
        DispatchCore.Interfaces.ICustomerService customerService;
        public CustomerController() : this(new CustomerService()) { }
        public CustomerController(DispatchCore.Interfaces.ICustomerService service)
        {
            this.customerService = service;
        }

        [HttpPost]
        public IHttpActionResult SearchCustomers(SearchOptions<Customer> filter)
        {
            var results = customerService.SearchCustomers(filter);
            return Ok(results);
        }

        [HttpGet]
        public IHttpActionResult GetCustomer(int id)
        {
            var results = customerService.GetCustomer(id);
            return Ok(results);
        }

        [HttpPost]
        public IHttpActionResult SetCustomer(Customer v)
        {
            var results = customerService.SetCustomer(v);
            return Ok(results);
        }


     



    }
}
