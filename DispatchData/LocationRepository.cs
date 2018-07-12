using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DispatchCore.Models;

namespace DispatchData.Repositories
{
    public class LocationRepository
    {
        public SearchResults<DispatchCore.Models.Location> GetLocations(SearchOptions<DispatchCore.Models.Location> filter)
        {
            List<DispatchCore.Models.Location> results = new List<DispatchCore.Models.Location>();
            using(DispatchEntities db = new DispatchEntities())
            {
                var query = db.Locations.Select(l => new DispatchCore.Models.Location()
                {
                    LocationId = l.LocationId,
                    Name = l.Name,
                    Address = l.Address,
                    State = l.State,
                    City = l.City,
                    Zip = l.Zip,
                    Lat = l.Lat,
                    Lon = l.Lon,
                    IsPickup = l.IsPickup,
                    CustomerOwnerId = l.CustomerId,
                    VendorOwnerId = l.VendorId
                });

                if(filter != null)
                {
                    if(filter.filter != null)
                    {
                        if(filter.filter.Name != null)
                        {
                            query = query.Where(l => l.Name.Contains(filter.filter.Name));
                        }
                    }
                }
                results = query.ToList();
            }

            return new SearchResults<DispatchCore.Models.Location>(results, results.Count);
        }

        public DispatchCore.Models.Location GetLocation(int locationId)
        {
            DispatchCore.Models.Location result = new DispatchCore.Models.Location();
            using(DispatchEntities db = new DispatchEntities())
            {
                var l = db.Locations.FirstOrDefault(loc => loc.LocationId == locationId);
                if (l != null)
                {
                    result.LocationId = l.LocationId;
                    result.Name = l.Name;
                    result.Address = l.Address;
                    result.State = l.State;
                    result.City = l.City;
                    result.Zip = l.Zip;
                    result.Lat = l.Lat;
                    result.Lon = l.Lon;
                    result.IsPickup = l.IsPickup;
                    result.CustomerOwnerId = l.CustomerId;
                    result.VendorOwnerId = l.VendorId;
                }
            }
            return result;
        }

        public DispatchCore.Models.Location SetLocation(DispatchCore.Models.Location l)
        {
            using(DispatchEntities db = new DispatchEntities())
            {
                var dbLocation = db.Locations.FirstOrDefault(loc => loc.LocationId == l.LocationId);
                if(dbLocation == null)
                {
                    dbLocation = db.Locations.Create();
                    db.Locations.Add(dbLocation);
                }

             
                dbLocation.Name = l.Name;
                dbLocation.Address = l.Address;
                dbLocation.State = l.State;
                dbLocation.City = l.City;
                dbLocation.Zip = l.Zip;
                dbLocation.Lat = l.Lat;
                dbLocation.Lon = l.Lon;
                dbLocation.IsPickup = l.IsPickup;
                dbLocation.CustomerId = l.CustomerOwnerId;
                dbLocation.VendorId = l.VendorOwnerId;

                db.SaveChanges();

                l.LocationId = dbLocation.LocationId;

            }
            return l;
        }
    }
}
