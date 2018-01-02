using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DispatchCore.Models;

namespace DispatchData.Repositories
{
    public class CustomerRepository
    {
        public SearchResults<DispatchCore.Models.Customer> GetCustomers (SearchOptions<DispatchCore.Models.Customer> filter)
        {
            List<DispatchCore.Models.Customer> results = new List<DispatchCore.Models.Customer>();
            using (DispatchEntities db = new DispatchEntities())
            {
                var query = db.Customers.Select(c => new DispatchCore.Models.Customer()
                {
                    CustomerId = c.CustomerId,
                    Name = c.CustomerName,
                    Phone = c.CustomerPhone
                });

                results = query.ToList();
            }

            return new SearchResults<DispatchCore.Models.Customer>(results, results.Count);

        }

        public DispatchCore.Models.Customer GetCustomer(int customerId)
        {
            DispatchCore.Models.Customer result = new DispatchCore.Models.Customer();
            using(DispatchEntities db = new DispatchEntities())
            {
                var c = db.Customers.FirstOrDefault(cust => cust.CustomerId == customerId);
                if(c != null)
                {

                    result.CustomerId = c.CustomerId;
                    result.Name = c.CustomerName;
                    result.Phone = c.CustomerPhone;
                }

            }

            return result;
        }

        public DispatchCore.Models.Customer SetCustomer(DispatchCore.Models.Customer c)
        {
            using(DispatchEntities db = new DispatchEntities())
            {
                Customer dbCustomer = db.Customers.FirstOrDefault(cust => cust.CustomerId == c.CustomerId);
                if(dbCustomer == null)
                {
                    dbCustomer = db.Customers.Create();
                    db.Customers.Add(dbCustomer);

                }

                dbCustomer.CustomerName = c.Name;
                dbCustomer.CustomerPhone = c.Phone;

                db.SaveChanges();

                c.CustomerId = dbCustomer.CustomerId;
            }

            return c;
        }
    }
}
