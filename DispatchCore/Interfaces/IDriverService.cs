using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DispatchCore.Models;

namespace DispatchCore.Interfaces
{
    public interface IDriverService
    {
        SearchResults<Driver> GetDrivers(SearchOptions<Driver> filter);
        Driver GetDriver(int driverId);
        Driver SetDriver(Driver driver);
    }
}
