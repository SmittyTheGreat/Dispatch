using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DispatchCore.Models;

namespace DispatchCore.Interfaces
{
    public interface ICustomerService
    {
        SearchResults<Customer> SearchCustomers(SearchOptions<Customer> filter);
        Customer GetCustomer(int id);
        Customer SetCustomer(Customer input);
    }
}
