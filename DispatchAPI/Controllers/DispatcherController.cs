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
    public class DispatcherController : ApiController
    {
        DispatchCore.Interfaces.IDispatcherService dispatcherService;
        public DispatcherController() : this(new DispatcherService()) { }
        public DispatcherController(DispatchCore.Interfaces.IDispatcherService service)
        {
            this.dispatcherService = service;
        }

        [HttpPost]
        public IHttpActionResult SearchDispatchers(SearchOptions<Dispatcher> filter)
        {
            var results = dispatcherService.GetDispatchers(filter);
            return Ok(results);
        }

        [HttpGet]
        public IHttpActionResult GetDispatcher(int id)
        {
            var results = dispatcherService.GetDispatcher(id);
            return Ok(results);
        }

        [HttpPost]
        public IHttpActionResult SetDispatcher(Dispatcher d)
        {
            var results = dispatcherService.SetDispatcher(d);
            return Ok(results);
        }

       

    }
}
