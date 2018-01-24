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
    public class SegmentController : ApiController
    {
        DispatchCore.Interfaces.ISegmentService segmentService;
        public SegmentController() : this(new SegmentService()) { }
        public SegmentController(DispatchCore.Interfaces.ISegmentService service)
        {
            this.segmentService = service;
        }

        [HttpPost]
        public IHttpActionResult SearchStandbySegments(SearchOptions<StandbySegment> filter)
        {
            var results = segmentService.GetStandbySegments(filter);
            return Ok(results);
        }

        [HttpGet]
        public IHttpActionResult GetStandbySegment(int id)
        {
            var results = segmentService.GetStandbySegment(id);
            return Ok(results);
        }

        [HttpPost]
        public IHttpActionResult SetStandbySegment(StandbySegment s)
        {
            var results = segmentService.SetStandbySegment(s);
            return Ok(results);
        }




        [HttpPost]
        public IHttpActionResult SearchTravelSegments(SearchOptions<TravelSegment> filter)
        {
            var results = segmentService.GetTravelSegments(filter);
            return Ok(results);
        }

        [HttpGet]
        public IHttpActionResult GetTravelSegment(int id)
        {
            var results = segmentService.GetTravelSegment(id);
            return Ok(results);
        }

        [HttpPost]
        public IHttpActionResult SetStandbySegment(TravelSegment s)
        {
            var results = segmentService.SetTravelSegment(s);
            return Ok(results);
        }

        [HttpGet]
        public IHttpActionResult GetSegmentStatuses()
        {
            var results = segmentService.GetSegmentStatuses();
            return Ok(results);
        }
        [HttpGet]
        public IHttpActionResult GetSegmentStatus(int id)
        {
            var result = segmentService.GetSegmentStatus(id);
            return Ok(result);
        }

        [HttpGet]
        public IHttpActionResult GetSegmentActivities()
        {
            var results = segmentService.GetSegmentActivities();
            return Ok(results);
        }
        [HttpGet]
        public IHttpActionResult GetSegmentActivity(int id)
        {
            var result = segmentService.GetSegmentActivity(id);
            return Ok(result);
        }


    }
}
