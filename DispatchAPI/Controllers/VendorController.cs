using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DispatchCore.Models;
using DispatchService;

namespace DispatchAPI.Controllers
{
    public class VendorController : ApiController
    {
        DispatchCore.Interfaces.IVendorService vendorService;
        public VendorController() : this(new VendorService()) { }
        public VendorController(DispatchCore.Interfaces.IVendorService service)
        {
            this.vendorService = service;
        }

        [HttpPost]
        public IHttpActionResult SearchVendors(SearchOptions<Vendor> filter)
        {
            var results = vendorService.SearchVendors(filter);
            return Ok(results);
        }

        [HttpGet]
        public IHttpActionResult GetVendor(int id)
        {
            var results = vendorService.GetVendor(id);
            return Ok(results);
        }

        [HttpPost]
        public IHttpActionResult SetVendor(Vendor v)
        {
            var results = vendorService.SetVendor(v);
            return Ok(results);
        }

    }
}
