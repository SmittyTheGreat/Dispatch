using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DispatchCore.Models
{
    public class SearchResults<TEntity>
    {
        IList<TEntity> _items;
        int _resultCount;

        public SearchResults(IList<TEntity> items, int resultCount)
        {
            _items = items;
            _resultCount = resultCount;

        }
        public int resultCount { get { return _resultCount; } set { _resultCount = value; } }
        public IList<TEntity> results { get { return _items; } set { _items = value; } }
    }
}
