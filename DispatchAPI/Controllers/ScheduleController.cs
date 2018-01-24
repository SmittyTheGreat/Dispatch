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
    public class ScheduleController : ApiController
    {
        DispatchCore.Interfaces.IScheduleService scheduleService;
        public ScheduleController() : this(new ScheduleService()) { }
        public ScheduleController(DispatchCore.Interfaces.IScheduleService service)
        {
            this.scheduleService = service;
        }

        [HttpPost]
        public IHttpActionResult SearchVehicleSchedules(SearchOptions<VehicleSchedule> filter)
        {
            var results = scheduleService.GetVehicleSchedules(filter);
            return Ok(results);
        }

        [HttpGet]
        public IHttpActionResult GetVehicleSchedule(int id)
        {
            var results = scheduleService.GetVehicleSchedule(id);
            return Ok(results);
        }

        [HttpPost]
        public IHttpActionResult SetVehicleSchedule(VehicleSchedule v)
        {
            var results = scheduleService.SetVehicleSchedule(v);
            return Ok(results);
        }


        [HttpPost]
        public IHttpActionResult SearchDriverSchedules(SearchOptions<DriverSchedule> filter)
        {
            var results = scheduleService.GetDriverSchedules(filter);
            return Ok(results);
        }

        [HttpGet]
        public IHttpActionResult GetDriverSchedules(int id)
        {
            var result = scheduleService.GetDriverSchedule(id);
            return Ok(result);
        }

        [HttpPost]
        public IHttpActionResult SetDriverSchedule(DriverSchedule v)
        {
            var result = scheduleService.SetDriverSchedule(v);
            return Ok(result);
        }

        //[HttpPost]
        //public IHttpActionResult Set(Order order)
        //{
        //    var results = orderService.SetOrder(order);
        //    return Ok(results);
        //}




    }
}
