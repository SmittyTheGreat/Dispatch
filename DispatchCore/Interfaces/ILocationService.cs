using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DispatchCore.Models;

namespace DispatchCore.Interfaces
{
    public interface ILocationService
    {
        SearchResults<Location> GetLocations(SearchOptions<Location> filter);
        Location GetLocation(int locationId);
        Location SetLocation(Location location);
    }
}
