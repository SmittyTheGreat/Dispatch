using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DispatchCore.Models;

namespace DispatchCore.Interfaces
{
    public interface IVehicleService
    {
        SearchResults<Vehicle> GetVehicles(SearchOptions<Vehicle> filter);
        Vehicle GetVehicle(int vehicleId);
        Vehicle SetVehicle(Vehicle vehicle);

        List<VehicleStatus> GetVehicleStatuses();
        VehicleStatus GetVehicleStatus(int statusId);

        List<VehicleType> GetVehicleTypes();
        VehicleType GetVehicleType(int typeId);

    }
}
