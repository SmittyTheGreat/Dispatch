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
    public class OrderController : ApiController
    {
        DispatchCore.Interfaces.IOrderService orderService;
        public OrderController() : this(new OrderService()) { }
        public OrderController(DispatchCore.Interfaces.IOrderService service)
        {
            this.orderService = service;
        }

        [HttpPost]
        public IHttpActionResult Search(SearchOptions<Order> filter)
        {
            var results = orderService.GetOrders(filter);
            return Ok(results);
        }

        [HttpGet]
        public IHttpActionResult Get(int id)
        {
            var results = orderService.GetOrder(id);
            return Ok(results);
        }
        //[HttpPost]
        //public IHttpActionResult Set(Order order)
        //{
        //    var results = orderService.SetOrder(order);
        //    return Ok(results);
        //}




    }
}
