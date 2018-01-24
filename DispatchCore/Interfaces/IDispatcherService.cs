using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DispatchCore.Models;

namespace DispatchCore.Interfaces
{
    public interface IDispatcherService
    {
        SearchResults<Dispatcher> GetDispatchers(SearchOptions<Dispatcher> filter);
        Dispatcher GetDispatcher(int dispatcherId);
        Dispatcher SetDispatcher(Dispatcher dispatcher);
    }
}
