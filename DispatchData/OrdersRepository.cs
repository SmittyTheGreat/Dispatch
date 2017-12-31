using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DispatchCore.Models;

namespace DispatchData.Repositories
{
    public class OrdersRepository
    {
        public SearchResults<DispatchCore.Models.Order> GetOrders(SearchOptions<DispatchCore.Models.Order> filter)
        {
            List<DispatchCore.Models.Order> results = new List<DispatchCore.Models.Order>();
            
            using(DispatchEntities db = new DispatchEntities())
            {
                var query = db.Orders.Select(o => new DispatchCore.Models.Order()
                {
                    OrderId = o.OrderId,
                    OrderNumber = o.OrderNumber,
                    CustomerId = o.CustomerId,
                    VendorId = o.VendorId,
                    IsRecurring = o.IsRecurring

                });

                ApplyFilter(filter, query);
                results = query.ToList();

                
                
            }
            return new SearchResults<DispatchCore.Models.Order>(results, results.Count);

        }

        public DispatchCore.Models.Order GetOrder(int filterId)
        {
            DispatchCore.Models.Order result = new DispatchCore.Models.Order();
            using(DispatchEntities db = new DispatchEntities())
            {
                var dbResult = db.Orders.FirstOrDefault(o => o.OrderId == filterId);
                if(dbResult != null)
                {
                    result.OrderId = dbResult.OrderId;
                    result.OrderNumber = dbResult.OrderNumber;
                    result.VendorId = dbResult.VendorId;
                    result.CustomerId = dbResult.CustomerId;
                    result.IsRecurring = dbResult.IsRecurring;
                }
            }


            return result;
            
        }

        public DispatchCore.Models.Order SetOrder(DispatchCore.Models.Order order)
        {
            using (DispatchEntities db = new DispatchEntities())
            {
                DispatchData.Order dbOrder = db.Orders.FirstOrDefault(o => o.OrderId == order.OrderId);
                if (dbOrder == null)
                {
                    dbOrder = db.Orders.Create();
                    db.Orders.Add(dbOrder);
                }
             
                dbOrder.CustomerId = order.CustomerId;
                dbOrder.VendorId = order.VendorId;
                dbOrder.IsRecurring = order.IsRecurring;
                dbOrder.OrderNumber = order.OrderNumber;

                db.SaveChanges();

                order.OrderId = dbOrder.OrderId;
                
            }

            return order;
        }

        private IQueryable<DispatchCore.Models.Order> ApplyFilter(SearchOptions<DispatchCore.Models.Order> filter, IQueryable<DispatchCore.Models.Order> query )
        {
            if (filter != null)
            {
                if (filter.filter.OrderNumber != null)
                {
                    query = query.Where(o => o.OrderNumber.Contains(filter.filter.OrderNumber));
                }
                if (filter.filter.OrderCustomer != null || filter.filter.CustomerId != null)
                {
                    int? filterId = filter.filter.OrderCustomer != null ? filter.filter.OrderCustomer.CustomerId : filter.filter.CustomerId;
                    if (filterId != null)
                    {
                        query = query.Where(o => o.CustomerId == filterId);
                    }
                }
                if (filter.filter.OrderVendor != null || filter.filter.VendorId != null)
                {
                    int? filterId = filter.filter.OrderVendor != null ? filter.filter.OrderVendor.VendorId : filter.filter.VendorId;
                    if (filterId != null)
                    {
                        query = query.Where(o => o.VendorId == filterId);
                    }
                }
            }
            return query;
        }
            
    }
}
