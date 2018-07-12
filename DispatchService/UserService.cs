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
    public class UserService : IUserService

    {
        private UserRepository repo;
        public UserService() { repo = new UserRepository(); }
        public SearchResults<User> SearchUsers(SearchOptions<User> filter)
        {
            return repo.GetUsers(filter);
        }
        public User GetUser(int id)
        {
            return repo.GetUser(id);
        }
        public User SetUser(User user)
        {
            return repo.SetUser(user);
        }
    }
}
