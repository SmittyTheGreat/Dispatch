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
    public class PositionController : ApiController
    {
        DispatchCore.Interfaces.IPositionService positionService;
        DispatchCore.Interfaces.IUserService userService;
        public PositionController() : this(new PositionService(), new UserService()) { }
        public PositionController(DispatchCore.Interfaces.IPositionService posService, DispatchCore.Interfaces.IUserService usrService)
        {
            this.positionService = posService;
            this.userService = usrService;
        }

        [HttpPost]
        public IHttpActionResult SearchPositions(Position filter)
        {
            var theFilter = new SearchOptions<Position>(filter, 0, 10, "", false);
            var results = positionService.GetPositions(theFilter);
            return Ok(results);
        }

        [HttpGet]
        public IHttpActionResult GetPositions(int id)
        {
            var results = positionService.GetPosition(id);
            return Ok(results);
        }

        [HttpPost]
        public IHttpActionResult SetPosition(Position p)
        {
            var results = positionService.SetPosition(p);
            return Ok(results);
        }

        [HttpGet]
        public IHttpActionResult GetUserCurrentPosition(int id)
        {
            var results = userService.GetUser(id);
            var newPos = new DispatchCore.Models.Position()
            {
                Lat = results.CurrentLat,
                Lon = results.CurrentLon,
                PositionTime = results.LastLocationTime
            };
            return Ok(results);
        }

       

    }
}
