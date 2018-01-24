using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DispatchCore.Interfaces;
using DispatchCore.Models;
using DispatchData.Repositories;

namespace DispatchService
{
    public class CustomerService : ICustomerService
    {
        private CustomerRepository repo;
        public CustomerService() { repo = new CustomerRepository(); }
        public SearchResults<Customer> SearchCustomers(SearchOptions<Customer> filter)
        {
            return repo.GetCustomers(filter);
        }
        public Customer GetCustomer(int id)
        {
            return repo.GetCustomer(id);
        }
        public Customer SetCustomer(Customer input)
        {
            return repo.SetCustomer(input);
        }
    }
}
