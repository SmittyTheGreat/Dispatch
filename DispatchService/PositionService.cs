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
    public class PositionService : IPositionService
    {
        private PositionRepository repo;
        public PositionService() { repo = new PositionRepository(); }
        public SearchResults<Position> GetPositions(SearchOptions<Position> filter)
        {
            return repo.GetPositions(filter);
        }
        public Position GetPosition(int positionId)
        {
            return repo.GetPosition(positionId);
        }
        public Position SetPosition(Position position)
        {
            return repo.SetPosition(position);
        }



    }
}
