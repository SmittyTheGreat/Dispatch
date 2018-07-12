using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DispatchCore.Models;

namespace DispatchData.Repositories
{
    public class PositionRepository
    {
        public SearchResults<DispatchCore.Models.Position> GetPositions(SearchOptions<DispatchCore.Models.Position> filter)
        {
            List<DispatchCore.Models.Position> results = new List<DispatchCore.Models.Position>();
            using(DispatchEntities db = new DispatchEntities())
            {
                var query = db.Positions.Select(p => new DispatchCore.Models.Position()
                {
                    PositionId = p.PositionId,
                    Lat = p.Lat,
                    Lon = p.Lon,
                    PositionTime = p.PositionTime,
                    UserId = p.UserId,
                    VehicleId = p.VehicleId
                });

                if(filter != null)
                {
                    if(filter.filter != null)
                    {
                        if(filter.filter.UserId != null)
                        {
                            query = query.Where(p => p.UserId == filter.filter.UserId);
                        }
                    }
                }
                results = query.ToList();
            }

            return new SearchResults<DispatchCore.Models.Position>(results, results.Count);
        }

        public DispatchCore.Models.Position GetPosition(int positionId)
        {
            DispatchCore.Models.Position result = new DispatchCore.Models.Position();
            using(DispatchEntities db = new DispatchEntities())
            {
                var p = db.Positions.FirstOrDefault(pos => pos.PositionId == positionId);
                if (p != null)
                {
                    result.PositionId = p.PositionId;
                    result.Lat = p.Lat;
                    result.Lon = p.Lon;
                    result.PositionTime = p.PositionTime;
                    result.UserId = p.UserId;
                    result.VehicleId = p.VehicleId;
                }
            }
            return result;
        }

        public DispatchCore.Models.Position SetPosition(DispatchCore.Models.Position p)
        {
            using(DispatchEntities db = new DispatchEntities())
            {
                var dbPosition = db.Positions.FirstOrDefault(pos => pos.PositionId == p.PositionId);
                if(dbPosition == null)
                {
                    dbPosition = db.Positions.Create();
                    db.Positions.Add(dbPosition);
                }

             
                dbPosition.Lat = p.Lat;
                dbPosition.Lon = p.Lon;
                dbPosition.PositionTime = p.PositionTime;
                dbPosition.UserId = p.UserId;
                dbPosition.VehicleId = p.VehicleId;

                db.SaveChanges();

                p.PositionId = dbPosition.PositionId;

            }
            return p;
        }
    }
}
