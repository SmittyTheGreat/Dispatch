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
    public class VehicleController : ApiController
    {
        DispatchCore.Interfaces.IVehicleService vehicleService;
        public VehicleController() : this(new VehicleService()) { }
        public VehicleController(DispatchCore.Interfaces.IVehicleService service)
        {
            this.vehicleService = service;
        }

        [HttpPost]
        public IHttpActionResult SearchVehicles(SearchOptions<Vehicle> filter)
        {
            var results = vehicleService.GetVehicles(filter);
            return Ok(results);
        }

        [HttpGet]
        public IHttpActionResult GetVehicle(int id)
        {
            var results = vehicleService.GetVehicle(id);
            return Ok(results);
        }

        [HttpPost]
        public IHttpActionResult SetVehicle(Vehicle v)
        {
            var results = vehicleService.SetVehicle(v);
            return Ok(results);
        }

       

    }
}
