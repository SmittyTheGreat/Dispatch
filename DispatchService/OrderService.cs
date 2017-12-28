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
    public class OrderService : IOrderService
    {
        private OrdersRepository repo;
        private SegmentService segmentService;
        public OrderService()
        {
            repo = new OrdersRepository();
            segmentService = new SegmentService();
        }
        public SearchResults<Order> GetOrders(SearchOptions<DispatchCore.Models.Order> filter)
        {
            List<Order> results = repo.GetOrders(filter).results.ToList();

            foreach (Order o in results)
            {
                BuildOrder(o);
            }

            return new SearchResults<Order>(results, results.Count);
        }
        public Order GetOrder(int orderId)
        {
            return BuildOrder(repo.GetOrder(orderId));
        }
        public Order SetOrder(Order order)
        {
            return BuildOrder(repo.SetOrder(order));
        }

        private Order BuildOrder(Order o)
        {
            o.StandbySegments = segmentService.GetStandbySegments(new SearchOptions<StandbySegment>(new StandbySegment()
            {
                OrderId = o.OrderId
            }, 0, 10, "", false)).results.ToList();


            o.TravelSegments = segmentService.GetTravelSegments(new SearchOptions<TravelSegment>(new TravelSegment()
            {
                OrderId = o.OrderId
            }, 0, 10, "", false)).results.ToList();

            return o;

        }

    }
}
