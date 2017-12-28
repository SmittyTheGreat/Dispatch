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
    public class DriverService : IDriverService
    {
        private DriverRepository repo;
        public DriverService() { repo = new DriverRepository(); }
        public SearchResults<Driver> GetDrivers(SearchOptions<Driver> filter)
        {
            return repo.GetDrivers(filter);
        }
        public Driver GetDriver(int driverId)
        {
            return repo.GetDriver(driverId);
        }
        public Driver SetDriver(Driver driver)
        {
            return repo.SetDriver(driver);
        }
    }
}
