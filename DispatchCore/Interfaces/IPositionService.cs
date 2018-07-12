using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DispatchCore.Models;

namespace DispatchCore.Interfaces
{
    public interface IPositionService
    {
        SearchResults<Position> GetPositions(SearchOptions<Position> filter);
        Position GetPosition(int positionId);
        Position SetPosition(Position position);
    }
}
