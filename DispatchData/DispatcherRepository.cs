using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DispatchCore.Models;

namespace DispatchData.Repositories
{
    public class DispatcherRepository
    {
        public SearchResults<DispatchCore.Models.Dispatcher> GetDispatchers(SearchOptions<DispatchCore.Models.Dispatcher> filter)
        {
            List<DispatchCore.Models.Dispatcher> results = new List<DispatchCore.Models.Dispatcher>();
            using (DispatchEntities db = new DispatchEntities())
            {
                var query = db.Dispatchers.Select(d => new DispatchCore.Models.Dispatcher()
                {
                    DispatcherId = d.DispatcherId,
                    Handle = d.DispatcherHandle,
                    Name = d.Name,
                    BrokerId = d.BrokerId,
                    CustomerId = d.CustomerId,
                    VendorId = d.VendorId
                });

                results = query.ToList();
            }

            return new SearchResults<DispatchCore.Models.Dispatcher>(results, results.Count);

        }

        public DispatchCore.Models.Dispatcher GetDispatcher(int dispatcherId)
        {
            DispatchCore.Models.Dispatcher result = new DispatchCore.Models.Dispatcher();
            using(DispatchEntities db = new DispatchEntities())
            {
                var d = db.Dispatchers.FirstOrDefault(drv => drv.DispatcherId == dispatcherId);
                if(d != null)
                {
                    result.DispatcherId = d.DispatcherId;
                    result.Handle = d.DispatcherHandle;
                    result.Name = d.Name;
                    result.BrokerId = d.BrokerId;
                    result.CustomerId = d.CustomerId;
                    result.VendorId = d.VendorId;
                }
            }

            return result;
        }

        public DispatchCore.Models.Dispatcher SetDriver(DispatchCore.Models.Dispatcher d)
        {
            using(DispatchEntities db = new DispatchEntities())
            {
                Dispatcher dbDispatcher = db.Dispatchers.FirstOrDefault(dis => dis.DispatcherId == d.DispatcherId);
                if(dbDispatcher == null)
                {
                    dbDispatcher = db.Dispatchers.Create();
                    db.Dispatchers.Add(dbDispatcher);
                }

                dbDispatcher.DispatcherHandle = d.Handle;
                dbDispatcher.Name = d.Name;
                dbDispatcher.BrokerId = d.BrokerId;
                dbDispatcher.CustomerId = d.CustomerId;
                dbDispatcher.VendorId = d.VendorId;

                db.SaveChanges();

                d.DispatcherId = dbDispatcher.DispatcherId;

            }

            return d;
        }
    }
}
