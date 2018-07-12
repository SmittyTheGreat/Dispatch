using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DispatchCore.Models;

namespace DispatchData.Repositories
{
    public class UserRepository
    {
        public SearchResults<DispatchCore.Models.User> GetUsers (SearchOptions<DispatchCore.Models.User> filter)
        {
            List<DispatchCore.Models.User> results = new List<DispatchCore.Models.User>();
            using (DispatchEntities db = new DispatchEntities())
            {
                var query = db.Users.Select(u => new DispatchCore.Models.User()
                {
                    UserId = u.UserId,
                    UserName = u.UserName,
                    HumanName = u.HumanName,
                    Email = u.Email,
                    BrokerId = u.BrokerId,
                    VendorId = u.VendorId,
                    DriverId = u.DriverId,
                    CustomerId = u.CustomerId,
                    DispatcherId = u.DispatcherId,
                    LastLogin = u.LastLogin,
                    Device = u.Device,
                    Version = u.Version,
                    CurrentLat = u.CurrentLat,
                    CurrentLon = u.CurrentLon,
                    LastLocationTime = u.LastLocationTime,
                    FirebaseToken = u.FirebaseToken
                });

                results = query.ToList();
            }

            return new SearchResults<DispatchCore.Models.User>(results, results.Count);

        }

        public DispatchCore.Models.User GetUser(int userId)
        {
            DispatchCore.Models.User result = new DispatchCore.Models.User();
            using(DispatchEntities db = new DispatchEntities())
            {
                var u = db.Users.FirstOrDefault(usr => usr.UserId == userId);
                if(u != null)
                {

                    result.UserId = u.UserId;
                    result.UserName = u.UserName;
                    result.HumanName = u.HumanName;
                    result.Email = u.Email;
                    result.BrokerId = u.BrokerId;
                    result.VendorId = u.VendorId;
                    result.DriverId = u.DriverId;
                    result.CustomerId = u.CustomerId;
                    result.DispatcherId = u.DispatcherId;
                    result.LastLogin = u.LastLogin;
                    result.Device = u.Device;
                    result.Version = u.Version;
                    result.CurrentLat = u.CurrentLat;
                    result.CurrentLon = u.CurrentLon;
                    result.LastLocationTime = u.LastLocationTime;
                    result.FirebaseToken = u.FirebaseToken;
                }

            }

            return result;
        }

        public DispatchCore.Models.User SetUser(DispatchCore.Models.User u)
        {
            using(DispatchEntities db = new DispatchEntities())
            {
                User dbUser = db.Users.FirstOrDefault(usr => usr.UserId == usr.UserId);
                if(dbUser == null)
                {
                    dbUser = db.Users.Create();
                    db.Users.Add(dbUser);

                }

               
                dbUser.UserName = u.UserName;
                dbUser.HumanName = u.HumanName;
                dbUser.Email = u.Email;
                dbUser.BrokerId = u.BrokerId;
                dbUser.VendorId = u.VendorId;
                dbUser.DriverId = u.DriverId;
                dbUser.CustomerId = u.CustomerId;
                dbUser.DispatcherId = u.DispatcherId;
                dbUser.LastLogin = u.LastLogin;
                dbUser.Device = u.Device;
                dbUser.Version = u.Version;
                dbUser.CurrentLat = u.CurrentLat;
                dbUser.CurrentLon = u.CurrentLon;
                dbUser.LastLocationTime = u.LastLocationTime;
                dbUser.FirebaseToken = u.FirebaseToken;

                db.SaveChanges();

                u.UserId = dbUser.UserId;
            }

            return u;
        }
    }
}
