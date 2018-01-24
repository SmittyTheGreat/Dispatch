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
    public class LocationController : ApiController
    {
        DispatchCore.Interfaces.ILocationService locationService;
        public LocationController() : this(new LocationService()) { }
        public LocationController(DispatchCore.Interfaces.ILocationService service)
        {
            this.locationService = service;
        }

        [HttpPost]
        public IHttpActionResult SearchLocations(SearchOptions<Location> filter)
        {
            var results = locationService.GetLocations(filter);
            return Ok(results);
        }

        [HttpGet]
        public IHttpActionResult GetLocation(int id)
        {
            var results = locationService.GetLocation(id);
            return Ok(results);
        }

        [HttpPost]
        public IHttpActionResult SetLocation(Location l)
        {
            var results = locationService.SetLocation(l);
            return Ok(results);
        }

       

    }
}
