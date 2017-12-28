using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using DispatchCore.Models;
using DispatchCore.Interfaces;
using DispatchData.Repositories;

namespace DispatchService
{
    public class LocationService : ILocationService
    {
        private LocationRepository repo;
        public LocationService() { repo = new LocationRepository(); }
        public SearchResults<Location> GetLocations(SearchOptions<Location> filter)
        {
            return repo.GetLocations(filter);
        }
        public Location GetLocation(int locationId)
        {
            return repo.GetLocation(locationId);
        }
        public Location SetLocation(Location location)
        {
            return repo.SetLocation(location);
        }
    }
}
