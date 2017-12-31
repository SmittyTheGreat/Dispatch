using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DispatchCore.Models;

namespace DispatchData.Repositories
{
    public class BrokerRepository
    {
        public SearchResults<DispatchCore.Models.Broker> GetBrokers (SearchOptions<DispatchCore.Models.Broker> filter)
        {
            List<DispatchCore.Models.Broker> results = new List<DispatchCore.Models.Broker>();
            using (DispatchEntities db = new DispatchEntities())
            {
                var query = db.Brokers.Select(b => new DispatchCore.Models.Broker()
                {
                    BrokerId = b.BrokerId,
                    Name = b.Name,
                    HomeLocationId = b.HomeLocationId
                });

                results = query.ToList();
            }

            return new SearchResults<DispatchCore.Models.Broker>(results, results.Count);

        }

        public DispatchCore.Models.Broker GetBroker(int brokerId)
        {
            DispatchCore.Models.Broker result = new DispatchCore.Models.Broker();
            using(DispatchEntities db = new DispatchEntities())
            {
                var b = db.Brokers.FirstOrDefault(bro => bro.BrokerId == brokerId);
                if(b != null)
                {

                    result.BrokerId = b.BrokerId;
                    result.Name = b.Name;
                    result.HomeLocationId = b.HomeLocationId;
                }

            }

            return result;
        }

        public DispatchCore.Models.Broker SetBroker(DispatchCore.Models.Broker b)
        {
            using(DispatchEntities db = new DispatchEntities())
            {
                Broker dbBroker = db.Brokers.FirstOrDefault(bro => bro.BrokerId == b.BrokerId);
                if(dbBroker == null)
                {
                    dbBroker = db.Brokers.Create();
                    db.Brokers.Add(dbBroker);

                }

                dbBroker.Name = b.Name;
                dbBroker.HomeLocationId = b.HomeLocationId;

                db.SaveChanges();

                b.BrokerId = dbBroker.BrokerId;
            }

            return b;
        }
    }
}
