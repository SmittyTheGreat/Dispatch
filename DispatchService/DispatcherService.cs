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
    public class DispatcherService : IDispatcherService
    {
        private DispatcherRepository repo;
        public DispatcherService() { repo = new DispatcherRepository(); }
        public SearchResults<Dispatcher> GetDispatchers(SearchOptions<Dispatcher> filter)
        {
            return repo.GetDispatchers(filter);
        }
        public Dispatcher GetDispatcher(int dispatcherId)
        {
            return repo.GetDispatcher(dispatcherId);
        }
        public Dispatcher SetDispatcher(Dispatcher dispatcher)
        {
            return repo.SetDriver(dispatcher);
        }
    }
}
