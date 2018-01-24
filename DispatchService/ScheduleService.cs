using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DispatchData;
using DispatchCore.Interfaces;
using DispatchCore.Models;

namespace DispatchService
{
    public class ScheduleService : IScheduleService
    {
        private ScheduleRepository repo;
        public ScheduleService()
        {
            repo = new ScheduleRepository();
        }
        public SearchResults<DispatchCore.Models.VehicleSchedule> GetVehicleSchedules(SearchOptions<DispatchCore.Models.VehicleSchedule> filter)
        {
            return repo.GetVehicleSchedules(filter);
        }
        public DispatchCore.Models.VehicleSchedule GetVehicleSchedule(int id)
        {
            return repo.GetVehicleSchedule(id);
        }
        public DispatchCore.Models.VehicleSchedule SetVehicleSchedule(DispatchCore.Models.VehicleSchedule v)
        {
            return repo.SetVehicleSchedule(v);
        }

        public SearchResults<DispatchCore.Models.DriverSchedule> GetDriverSchedules(SearchOptions<DispatchCore.Models.DriverSchedule> filter)
        {
            return repo.GetDriverSchedules(filter);
        }

        public DispatchCore.Models.DriverSchedule GetDriverSchedule(int id)
        {
            return repo.GetDriverSchedule(id);
        }
        public DispatchCore.Models.DriverSchedule SetDriverSchedule(DispatchCore.Models.DriverSchedule d)
        {
            return repo.SetDriverSchedule(d);
        }

    }
}
