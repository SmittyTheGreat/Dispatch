using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DispatchCore.Models;

namespace DispatchData
{
    public class ScheduleRepository
    {
        public SearchResults<DispatchCore.Models.VehicleSchedule> GetVehicleSchedules(SearchOptions<DispatchCore.Models.VehicleSchedule> filter)
        {
            List<DispatchCore.Models.VehicleSchedule> results = new List<DispatchCore.Models.VehicleSchedule>();

            using(DispatchEntities db = new DispatchEntities())
            {
                var query = db.VehicleSchedules.Select(v => new DispatchCore.Models.VehicleSchedule()
                {
                    VehicleScheduleId = v.VehicleScheduleId,
                    VehicleId = v.VehicleId,
                    DispatchedById = v.DispatchedBy,
                    BrokerId = v.BrokerId
                });

                results = query.ToList();
            }

            return new SearchResults<DispatchCore.Models.VehicleSchedule>(results, results.Count);

        }

        public DispatchCore.Models.VehicleSchedule GetVehicleSchedule (int id)
        {
            DispatchCore.Models.VehicleSchedule result = new DispatchCore.Models.VehicleSchedule();
            using(DispatchEntities db = new DispatchEntities())
            {
                var v = db.VehicleSchedules.FirstOrDefault(sch => sch.VehicleScheduleId == id);
                if(v != null)
                {
                    result.VehicleScheduleId = v.VehicleScheduleId;
                    result.VehicleId = v.VehicleId;
                    result.DispatchedById = v.DispatchedBy;
                    result.BrokerId = v.BrokerId;
                }
            }
            return result;
            
        }

        public DispatchCore.Models.VehicleSchedule SetVehicleSchedule(DispatchCore.Models.VehicleSchedule v)
        {
            using(DispatchEntities db = new DispatchEntities())
            {
                VehicleSchedule dbSchedule = db.VehicleSchedules.FirstOrDefault(sch => sch.VehicleScheduleId == v.VehicleScheduleId);
                if(dbSchedule == null)
                {
                    dbSchedule = db.VehicleSchedules.Create();
                    db.VehicleSchedules.Add(dbSchedule);
                }

                dbSchedule.VehicleId = v.VehicleId;
                dbSchedule.BrokerId = v.BrokerId;
                dbSchedule.DispatchedBy = v.DispatchedById;
                db.SaveChanges();
                v.VehicleScheduleId = dbSchedule.VehicleScheduleId;
                
            }
            return v;
        }

        public SearchResults<DispatchCore.Models.DriverSchedule> GetDriverSchedules(SearchOptions<DispatchCore.Models.DriverSchedule> filter)
        {
            List<DispatchCore.Models.DriverSchedule> results = new List<DispatchCore.Models.DriverSchedule>();

            using (DispatchEntities db = new DispatchEntities())
            {
                var query = db.DriverSchedules.Select(v => new DispatchCore.Models.DriverSchedule()
                {
                    DriverScheduleId = v.DriverScheduleId,
                    DriverId = v.DriverId,
                    DispatchedById = v.DispatchedBy,
                    BrokerId = v.BrokerId
                });

                results = query.ToList();
            }

            return new SearchResults<DispatchCore.Models.DriverSchedule>(results, results.Count);

        }

        public DispatchCore.Models.DriverSchedule GetDriverSchedule(int id)
        {
            DispatchCore.Models.DriverSchedule result = new DispatchCore.Models.DriverSchedule();
            using (DispatchEntities db = new DispatchEntities())
            {
                var v = db.DriverSchedules.FirstOrDefault(sch => sch.DriverScheduleId == id);
                if (v != null)
                {
                    result.DriverScheduleId = v.DriverScheduleId;
                    result.DriverId = v.DriverId;
                    result.DispatchedById = v.DispatchedBy;
                    result.BrokerId = v.BrokerId;
                }
            }
            return result;

        }

        public DispatchCore.Models.DriverSchedule SetDriverSchedule(DispatchCore.Models.DriverSchedule v)
        {
            using (DispatchEntities db = new DispatchEntities())
            {
                DriverSchedule dbSchedule = db.DriverSchedules.FirstOrDefault(sch => sch.DriverScheduleId == v.DriverScheduleId);
                if (dbSchedule == null)
                {
                    dbSchedule = db.DriverSchedules.Create();
                    db.DriverSchedules.Add(dbSchedule);
                }

                dbSchedule.DriverId = v.DriverId;
                dbSchedule.BrokerId = v.BrokerId;
                dbSchedule.DispatchedBy = v.DispatchedById;
                db.SaveChanges();
                v.DriverScheduleId = dbSchedule.DriverScheduleId;

            }
            return v;
        }


    }
}
