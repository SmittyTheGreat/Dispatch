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
    public class BrokerController : ApiController
    {
        DispatchCore.Interfaces.IBrokerService brokerService;
        public BrokerController() : this(new BrokerService()) { }
        public BrokerController(DispatchCore.Interfaces.IBrokerService service)
        {
            this.brokerService = service;
        }

        [HttpPost]
        public IHttpActionResult SearchBrokers(SearchOptions<Broker> filter)
        {
            var results = brokerService.GetBrokers(filter);
            return Ok(results);
        }

        [HttpGet]
        public IHttpActionResult GetBroker(int id)
        {
            var results = brokerService.GetBroker(id);
            return Ok(results);
        }

        [HttpPost]
        public IHttpActionResult SetBroker(Broker v)
        {
            var results = brokerService.SetBroker(v);
            return Ok(results);
        }

       




    }
}
