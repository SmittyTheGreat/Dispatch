using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DispatchCore.Models
{
    public class SearchOptions<TEntity>
    {
        TEntity _filter;
        int _skip;
        int _take;
        string _orderBy;
        bool _isDescending;

        public SearchOptions(TEntity filter, int skip, int take, string orderBy, bool isDescending)
        {
            _filter = filter;
            _skip = skip;
            _take = take;
            _orderBy = orderBy;
            _isDescending = isDescending;
        }
        public int skip { get { return _skip; } set { _skip = value; } }
        public int take { get { return _take; } set { _take = value; } }
        public TEntity filter { get { return _filter; } set { _filter = value; } }
        public string orderBy { get { return _orderBy; } set { _orderBy = value; } }
        public bool isDescending { get { return _isDescending; } set { _isDescending = value; } }
    }
}
