using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DispatchCore.Models;

namespace DispatchCore.Interfaces
{
    public interface IOrderService
    {
        SearchResults<Order> GetOrders(SearchOptions<DispatchCore.Models.Order> filter);
        Order GetOrder(int orderId);
        Order SetOrder(Order order);
    }
}
