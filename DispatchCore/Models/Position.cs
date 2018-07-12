using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DispatchCore.Models
{
    public class Position
    {
        public int PositionId { get; set; }
        public float? Lat { get; set; }
        public float? Lon { get; set; }
        public DateTime? PositionTime { get; set; }
        public int? UserId { get; set; }
        public int? VehicleId { get; set; }
       
    }
}
