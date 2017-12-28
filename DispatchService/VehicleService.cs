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
    public class VehicleService : IVehicleService
    {
        private VehicleRepository repo;
        public VehicleService() { repo = new VehicleRepository(); }
        public SearchResults<Vehicle> GetVehicles(SearchOptions<Vehicle> filter)
        {
            return repo.GetVehicles(filter);
        }
        public Vehicle GetVehicle(int vehicleId)
        {
            Vehicle vehicle = repo.GetVehicle(vehicleId);
            if(vehicle.VehicleTypeId != null)
            {
                vehicle.VehType = GetVehicleType((int)vehicle.VehicleTypeId);
            }
            return vehicle;
        }
        public Vehicle SetVehicle(Vehicle vehicle)
        {
            return repo.SetVehicle(vehicle);
        }


        public List<VehicleStatus> GetVehicleStatuses()
        {
            return repo.GetVehicleStatuses();
        }
        public VehicleStatus GetVehicleStatus(int statusId)
        {
            return repo.GetVehicleStatus(statusId);
        }

        public List<VehicleType> GetVehicleTypes()
        {
            return repo.GetVehicleTypes();
        }
        public VehicleType GetVehicleType(int typeId)
        {
            return repo.GetVehicleType(typeId);
        }

         

    }
}
