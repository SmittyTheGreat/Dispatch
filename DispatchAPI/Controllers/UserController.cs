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
    public class UserController : ApiController
    {
        DispatchCore.Interfaces.IUserService userService;
        public UserController() : this(new UserService()) { }
        public UserController(DispatchCore.Interfaces.IUserService service)
        {
            this.userService = service;
        }

        //[HttpPost]
        //public IHttpActionResult SearchUsers(SearchOptions<User> filter)
        //{
        //    var results = userService.GetUser(filter);
        //    return Ok(results);
        //}

        [HttpGet]
        public IHttpActionResult GetUser(int id)
        {
            var results = userService.GetUser(id);
            return Ok(results);
        }

        [HttpPost]
        public IHttpActionResult SetUser(User u)
        {
            var results = userService.SetUser(u);
            return Ok(results);
        }

       

    }
}
