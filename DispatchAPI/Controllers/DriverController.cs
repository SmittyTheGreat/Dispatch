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
    public class DriverController : ApiController
    {
        DispatchCore.Interfaces.IDriverService driverService;
        public DriverController() : this(new DriverService()) { }
        public DriverController(DispatchCore.Interfaces.IDriverService service)
        {
            this.driverService = service;
        }

        [HttpPost]
        public IHttpActionResult SearchDrivers(SearchOptions<Driver> filter)
        {
            var results = driverService.GetDrivers(filter);
            return Ok(results);
        }

        [HttpGet]
        public IHttpActionResult GetDriver(int id)
        {
            var results = driverService.GetDriver(id);
            return Ok(results);
        }

        [HttpPost]
        public IHttpActionResult SetDriver(Driver d)
        {
            var results = driverService.SetDriver(d);
            return Ok(results);
        }

       

    }
}
