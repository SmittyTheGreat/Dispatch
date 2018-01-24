using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DispatchCore.Models;


namespace DispatchCore.Interfaces
{
    public interface IScheduleService
    {

        SearchResults<VehicleSchedule> GetVehicleSchedules(SearchOptions<VehicleSchedule> filter);
        VehicleSchedule GetVehicleSchedule(int id);
        VehicleSchedule SetVehicleSchedule(VehicleSchedule v);

        SearchResults<DriverSchedule> GetDriverSchedules(SearchOptions<DriverSchedule> filter);
        DriverSchedule GetDriverSchedule(int id);
        DriverSchedule SetDriverSchedule(DriverSchedule d);
     
    }
}
