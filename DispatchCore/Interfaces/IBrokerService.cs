using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DispatchCore.Models;

namespace DispatchCore.Interfaces
{
    public interface IBrokerService
    {
        SearchResults<Broker> GetBrokers(SearchOptions<Broker> filter);
        Broker GetBroker(int brokerId);
        Broker SetBroker(Broker broker);
    }
}
