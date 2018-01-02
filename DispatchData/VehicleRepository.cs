using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DispatchCore.Models;

namespace DispatchData.Repositories
{
    public class VehicleRepository
    {
        public SearchResults<DispatchCore.Models.Vehicle> GetVehicles(SearchOptions<DispatchCore.Models.Vehicle> filter)
        {
            List<DispatchCore.Models.Vehicle> results = new List<DispatchCore.Models.Vehicle>();
            using(DispatchEntities db = new DispatchEntities())
            {
                var query = db.Vehicles.Select(v => new DispatchCore.Models.Vehicle()
                {
                    VehicleId = v.VehicleId,
                    VehicleNumber = v.VehicleNumber,
                    VehicleTypeId = v.VehicleTypeId,
                    StartingMileage = v.StartingMileage,
                    CurrentMileage = v.CurrentMileage,
                    HomeLocationId = v.HomeLocationId,
                    CurrentDriverId = v.CurrentDriverId,
                    BrokerOwnerId = v.BrokerOwnerId,
                    VendorOwnerId = v.VendorOwnerId,
                    CustomerOwnerId = v.CustomerOwnerId,
                    DriverOwnerId = v.DriverOwnerId
                });

                results = query.ToList();
            }

            return new SearchResults<DispatchCore.Models.Vehicle>(results, results.Count);
        }

        public DispatchCore.Models.Vehicle GetVehicle(int vehicleId)
        {
            DispatchCore.Models.Vehicle result = new DispatchCore.Models.Vehicle();
            using(DispatchEntities db = new DispatchEntities())
            {
                var v = db.Vehicles.FirstOrDefault(veh => veh.VehicleId == vehicleId);
                if(v != null)
                {
                    result.VehicleId = v.VehicleId;
                    result.VehicleNumber = v.VehicleNumber;
                    result.VehicleTypeId = v.VehicleTypeId;
                    result.StartingMileage = v.StartingMileage;
                    result.CurrentMileage = v.CurrentMileage;
                    result.HomeLocationId = v.HomeLocationId;
                    result.CurrentDriverId = v.CurrentDriverId;
                    result.BrokerOwnerId = v.BrokerOwnerId;
                    result.VendorOwnerId = v.VendorOwnerId;
                    result.CustomerOwnerId = v.CustomerOwnerId;
                    result.DriverOwnerId = v.DriverOwnerId;
                }
            }
            return result;
        }

        public DispatchCore.Models.Vehicle SetVehicle(DispatchCore.Models.Vehicle v)
        {
            using(DispatchEntities db = new DispatchEntities())
            {
                Vehicle dbVehicle = db.Vehicles.FirstOrDefault(veh => veh.VehicleId == v.VehicleId);
                if(dbVehicle == null)
                {
                    dbVehicle = db.Vehicles.Create();
                    db.Vehicles.Add(dbVehicle);
                }

        
                dbVehicle.VehicleTypeId = v.VehicleTypeId;
                dbVehicle.VehicleNumber = v.VehicleNumber;
                dbVehicle.StartingMileage = v.StartingMileage;
                dbVehicle.CurrentMileage = v.CurrentMileage;
                dbVehicle.HomeLocationId = v.HomeLocationId;
                dbVehicle.CurrentDriverId = v.CurrentDriverId;
                dbVehicle.BrokerOwnerId = v.BrokerOwnerId;
                dbVehicle.VendorOwnerId = v.VendorOwnerId;
                dbVehicle.CustomerOwnerId = v.CustomerOwnerId;
                dbVehicle.DriverOwnerId = v.DriverOwnerId;

                db.SaveChanges();

                v.VehicleId = dbVehicle.VehicleId;
            }

            return v;
        }

        public List<DispatchCore.Models.VehicleStatus> GetVehicleStatuses()
        {
            List<DispatchCore.Models.VehicleStatus> results = new List<DispatchCore.Models.VehicleStatus>();
            using(DispatchEntities db = new DispatchEntities())
            {
                var query = db.VehicleStatuses.Select(v => new DispatchCore.Models.VehicleStatus()
                {
                    VehicleStatusId = v.VehicleStatusId,
                    Description = v.Description
                });

                results = query.ToList();
            }
            return results;
        }

        public DispatchCore.Models.VehicleStatus GetVehicleStatus(int statusId)
        {
            DispatchCore.Models.VehicleStatus result = new DispatchCore.Models.VehicleStatus();
            using(DispatchEntities db = new DispatchEntities())
            {
                var v = db.VehicleStatuses.FirstOrDefault(s => s.VehicleStatusId == statusId);
                if(v != null)
                {
                    result.VehicleStatusId = v.VehicleStatusId;
                    result.Description = v.Description;
                }

            }
            return result;
        }

        public List<DispatchCore.Models.VehicleType> GetVehicleTypes()
        {
            List<DispatchCore.Models.VehicleType> results = new List<DispatchCore.Models.VehicleType>();
            using(DispatchEntities db = new DispatchEntities())
            {
                var query = db.VehicleTypes.Select(v => new DispatchCore.Models.VehicleType()
                {
                    VehicleTypeId = v.VehicleTypeId,
                    Description = v.Description
                });

                results = query.ToList();
            }
            return results;
        }

        public DispatchCore.Models.VehicleType GetVehicleType(int typeId)
        {
            DispatchCore.Models.VehicleType result = new DispatchCore.Models.VehicleType();
            using(DispatchEntities db = new DispatchEntities())
            {
                var v = db.VehicleTypes.FirstOrDefault(t => t.VehicleTypeId == typeId);
                if(v != null)
                {
                    result.VehicleTypeId = v.VehicleTypeId;
                    result.Description = v.Description;
                }

            }

            return result;
        }


    }
}
