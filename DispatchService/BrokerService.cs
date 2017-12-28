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

    public class BrokerService : IBrokerService
    {
        private BrokerRepository repo;
        public BrokerService() { repo = new BrokerRepository(); }
        public SearchResults<Broker> GetBrokers(SearchOptions<Broker> filter)
        {
            return repo.GetBrokers(filter);
        }
        public Broker GetBroker(int brokerId)
        {
            return repo.GetBroker(brokerId);
        }
        public Broker SetBroker(Broker broker)
        {
            return repo.SetBroker(broker);
        }

    }
}
