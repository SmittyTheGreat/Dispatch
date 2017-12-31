using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DispatchCore.Models;

namespace DispatchData.Repositories
{
    public class DriverRepository
    {
        public SearchResults<DispatchCore.Models.Driver> GetDrivers(SearchOptions<DispatchCore.Models.Driver> filter)
        {
            List<DispatchCore.Models.Driver> results = new List<DispatchCore.Models.Driver>();
            using (DispatchEntities db = new DispatchEntities())
            {
                var query = db.Drivers.Select(d => new DispatchCore.Models.Driver()
                {
                    DriverId = d.DriverId,
                    Handle = d.DriverHandle,
                    Name = d.Name,
                    BrokerOwnerId = d.BrokerId,
                    OnDuty = d.OnDuty,
                    HomeLocationId = d.HomeLocationId
                });

                results = query.ToList();
            }

            return new SearchResults<DispatchCore.Models.Driver>(results, results.Count);

        }

        public DispatchCore.Models.Driver GetDriver(int driverId)
        {
            DispatchCore.Models.Driver result = new DispatchCore.Models.Driver();
            using(DispatchEntities db = new DispatchEntities())
            {
                var d = db.Drivers.FirstOrDefault(drv => drv.DriverId == driverId);
                if(d != null)
                {
                    result.DriverId = d.DriverId;
                    result.Handle = d.DriverHandle;
                    result.Name = d.Name;
                    result.BrokerOwnerId = d.BrokerId;
                    result.OnDuty = d.OnDuty;
                    result.HomeLocationId = d.HomeLocationId;
                }
            }

            return result;
        }

        public DispatchCore.Models.Driver SetDriver(DispatchCore.Models.Driver d)
        {
            using(DispatchEntities db = new DispatchEntities())
            {
                Driver dbDriver = db.Drivers.FirstOrDefault(drv => drv.DriverId == d.DriverId);
                if(dbDriver == null)
                {
                    dbDriver = db.Drivers.Create();
                    db.Drivers.Add(dbDriver);
                }

                dbDriver.DriverHandle = d.Handle;
                dbDriver.Name = d.Name;
                dbDriver.BrokerId = d.BrokerOwnerId;
                dbDriver.OnDuty = d.OnDuty;
                dbDriver.HomeLocationId = d.HomeLocationId;

                db.SaveChanges();

                d.DriverId = dbDriver.DriverId;

            }

            return d;
        }
    }
}
