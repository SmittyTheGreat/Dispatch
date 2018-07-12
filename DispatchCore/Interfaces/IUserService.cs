using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DispatchCore.Models;

namespace DispatchCore.Interfaces
{
    public interface IUserService
    {
        SearchResults<User> SearchUsers(SearchOptions<User> filter);
        User GetUser(int id);
        User SetUser(User input);
    }
}
