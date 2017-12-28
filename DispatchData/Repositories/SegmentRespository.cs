using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DispatchCore.Models;

namespace DispatchData.Repositories
{
    public class SegmentRespository
    {
        public SearchResults<DispatchCore.Models.StandbySegment> GetStandbySegments(SearchOptions<DispatchCore.Models.StandbySegment> filter)
        {
            List<DispatchCore.Models.StandbySegment> results = new List<DispatchCore.Models.StandbySegment>();

            using(DispatchEntities db = new DispatchEntities())
            {
                var query = db.StandbySegments.Select(s => new DispatchCore.Models.StandbySegment()
                {
                    StandbySegmentId = s.StandbySegmentId,
                    OrderId = s.OrderId,
                    AssignedVehicleId = s.AssignedVehicleId,
                    AssignedDriverId = s.AssignedDriverId,
                    AssignedBrokerId = s.AssignedBrokerId,
                    ProductId = s.ProductId,
                    ScheduledStart = s.ScheduledStart,
                    ScheduledEnd = s.ScheduledEnd,
                    ActualStart = s.ActualStart,
                    ActualEnd = s.ActualEnd,
                    OrderIndex = s.OrderIndex,
                    StandbyLocationId = s.StandbyLocationId,
                    SegmentStatusId = s.SegmentStatusId,
                    StatusChangeAckBroker = s.StatusChangeAckBroker,
                    StatusChangeAckCustomer = s.StatusChangeAckCustomer,
                    StatusChangeAckDispatch = s.StatusChangeAckDispatch,
                    StatusChangeAckDriver = s.StatusChangeAckDriver,
                    StatusChangeAckVendor = s.StatusChangeAckVendor

                });
                ApplyFilter(filter, query);
                results = query.ToList();
                
            }
            return new SearchResults<DispatchCore.Models.StandbySegment>(results, results.Count);

        }

        public DispatchCore.Models.StandbySegment GetStandbySegment(int segmentId)
        {
            DispatchCore.Models.StandbySegment result = new DispatchCore.Models.StandbySegment();
            using(DispatchEntities db = new DispatchEntities())
            {
                var s = db.StandbySegments.FirstOrDefault(seg => seg.StandbySegmentId == segmentId);
                if(s != null)
                {
                    result.StandbySegmentId = s.StandbySegmentId;
                    result.OrderId = s.OrderId;
                    result.AssignedVehicleId = s.AssignedVehicleId;
                    result.AssignedDriverId = s.AssignedDriverId;
                    result.AssignedBrokerId = s.AssignedBrokerId;
                    result.ProductId = s.ProductId;
                    result.ScheduledStart = s.ScheduledStart;
                    result.ScheduledEnd = s.ScheduledEnd;
                    result.ActualStart = s.ActualStart;
                    result.ActualEnd = s.ActualEnd;
                    result.OrderIndex = s.OrderIndex;
                    result.StandbyLocationId = s.StandbyLocationId;
                    result.SegmentStatusId = s.SegmentStatusId;
                    result.StatusChangeAckBroker = s.StatusChangeAckBroker;
                    result.StatusChangeAckCustomer = s.StatusChangeAckCustomer;
                    result.StatusChangeAckDispatch = s.StatusChangeAckDispatch;
                    result.StatusChangeAckDriver = s.StatusChangeAckDriver;
                    result.StatusChangeAckVendor = s.StatusChangeAckVendor;
                }
            }

            return result;

        }

        public DispatchCore.Models.StandbySegment SetStandbySegment(DispatchCore.Models.StandbySegment s)
        {
            using(DispatchEntities db = new DispatchEntities())
            {
                StandbySegment dbSegment = db.StandbySegments.FirstOrDefault(seg => seg.StandbySegmentId == s.StandbySegmentId);
                if(dbSegment == null)
                {
                    dbSegment = db.StandbySegments.Create();
                    db.StandbySegments.Add(dbSegment);
                }

             
                dbSegment.OrderId = s.OrderId;
                dbSegment.AssignedVehicleId = s.AssignedVehicleId;
                dbSegment.AssignedDriverId = s.AssignedDriverId;
                dbSegment.AssignedBrokerId = s.AssignedBrokerId;
                dbSegment.ProductId = s.ProductId;
                dbSegment.ScheduledStart = s.ScheduledStart;
                dbSegment.ScheduledEnd = s.ScheduledEnd;
                dbSegment.ActualStart = s.ActualStart;
                dbSegment.ActualEnd = s.ActualEnd;
                dbSegment.OrderIndex = s.OrderIndex;
                dbSegment.StandbyLocationId = s.StandbyLocationId;
                dbSegment.SegmentStatusId = s.SegmentStatusId;
                dbSegment.StatusChangeAckBroker = s.StatusChangeAckBroker;
                dbSegment.StatusChangeAckCustomer = s.StatusChangeAckCustomer;
                dbSegment.StatusChangeAckDispatch = s.StatusChangeAckDispatch;
                dbSegment.StatusChangeAckDriver = s.StatusChangeAckDriver;
                dbSegment.StatusChangeAckVendor = s.StatusChangeAckVendor;

                db.SaveChanges();

                s.StandbySegmentId = dbSegment.StandbySegmentId;

            }

            return s;
        }



        public SearchResults<DispatchCore.Models.TravelSegment> GetTravelSegments(SearchOptions<DispatchCore.Models.TravelSegment> filter)
        {
            List<DispatchCore.Models.TravelSegment> results = new List<DispatchCore.Models.TravelSegment>();

            using (DispatchEntities db = new DispatchEntities())
            {
                var query = db.TravelSegments.Select(s => new DispatchCore.Models.TravelSegment()
                {
                    TravelSegmentId = s.TravelSegmentId,
                    OrderId = s.OrderId,
                    AssignedVehicleId = s.AssignedVehicleId,
                    AssignedDriverId = s.AssignedDriverId,
                    AssignedBrokerId = s.AssignedBrokerId,
                    ProductId = s.ProductId,
                    ScheduledStart = s.ScheduledStart,
                    ScheduledEnd = s.ScheduledEnd,
                    ActualStart = s.ActualStart,
                    ActualEnd = s.ActualEnd,
                    OrderIndex = s.OrderIndex,
                    SegmentStatusId = s.SegmentStatusId,
                    StatusChangeAckBroker = s.StatusChangeAckBroker,
                    StatusChangeAckCustomer = s.StatusChangeAckCustomer,
                    StatusChangeAckDispatch = s.StatusChangeAckDispatch,
                    StatusChangeAckDriver = s.StatusChangeAckDriver,
                    StatusChangeAckVendor = s.StatusChangeAckVendor

                });
                ApplyFilter(filter, query);
                results = query.ToList();
            }

            return new SearchResults<DispatchCore.Models.TravelSegment>(results, results.Count);
        }

        public DispatchCore.Models.TravelSegment GetTravelSegment(int segmentId)
        {
            DispatchCore.Models.TravelSegment result = new DispatchCore.Models.TravelSegment();
            using (DispatchEntities db = new DispatchEntities())
            {
                var s = db.TravelSegments.FirstOrDefault(seg => seg.TravelSegmentId == segmentId);
                if (s != null)
                {
                    result.TravelSegmentId = s.TravelSegmentId;
                    result.OrderId = s.OrderId;
                    result.AssignedVehicleId = s.AssignedVehicleId;
                    result.AssignedDriverId = s.AssignedDriverId;
                    result.AssignedBrokerId = s.AssignedBrokerId;
                    result.ProductId = s.ProductId;
                    result.ScheduledStart = s.ScheduledStart;
                    result.ScheduledEnd = s.ScheduledEnd;
                    result.ActualStart = s.ActualStart;
                    result.ActualEnd = s.ActualEnd;
                    result.OrderIndex = s.OrderIndex;
                    result.SegmentStatusId = s.SegmentStatusId;
                    result.StatusChangeAckBroker = s.StatusChangeAckBroker;
                    result.StatusChangeAckCustomer = s.StatusChangeAckCustomer;
                    result.StatusChangeAckDispatch = s.StatusChangeAckDispatch;
                    result.StatusChangeAckDriver = s.StatusChangeAckDriver;
                    result.StatusChangeAckVendor = s.StatusChangeAckVendor;
                }
            }

            return result;

        }

        public DispatchCore.Models.TravelSegment SetTravelSegment(DispatchCore.Models.TravelSegment s)
        {
            using (DispatchEntities db = new DispatchEntities())
            {
                TravelSegment dbSegment = db.TravelSegments.FirstOrDefault(seg => seg.TravelSegmentId == s.TravelSegmentId);
                if (dbSegment == null)
                {
                    dbSegment = db.TravelSegments.Create();
                    db.TravelSegments.Add(dbSegment);
                }

   
                dbSegment.OrderId = s.OrderId;
                dbSegment.AssignedVehicleId = s.AssignedVehicleId;
                dbSegment.AssignedDriverId = s.AssignedDriverId;
                dbSegment.AssignedBrokerId = s.AssignedBrokerId;
                dbSegment.ProductId = s.ProductId;
                dbSegment.ScheduledStart = s.ScheduledStart;
                dbSegment.ScheduledEnd = s.ScheduledEnd;
                dbSegment.ActualStart = s.ActualStart;
                dbSegment.ActualEnd = s.ActualEnd;
                dbSegment.OrderIndex = s.OrderIndex;
                dbSegment.SegmentStatusId = s.SegmentStatusId;
                dbSegment.StatusChangeAckBroker = s.StatusChangeAckBroker;
                dbSegment.StatusChangeAckCustomer = s.StatusChangeAckCustomer;
                dbSegment.StatusChangeAckDispatch = s.StatusChangeAckDispatch;
                dbSegment.StatusChangeAckDriver = s.StatusChangeAckDriver;
                dbSegment.StatusChangeAckVendor = s.StatusChangeAckVendor;

                db.SaveChanges();

                s.TravelSegmentId = dbSegment.TravelSegmentId;

            }

            return s;
        }

        public List<DispatchCore.Models.SegmentStatus> GetSegmentStatuses()
        {
            List<DispatchCore.Models.SegmentStatus> results = new List<DispatchCore.Models.SegmentStatus>();
            using(DispatchEntities db = new DispatchEntities())
            {
                var query = db.SegmentStatuses.Select(s => new DispatchCore.Models.SegmentStatus()
                {
                    SegmentStatusId = s.SegmentStatusId,
                    Description = s.Description
                });
                results = query.ToList();
            }

            return results;

        }

        public DispatchCore.Models.SegmentStatus GetSegmentStatus(int statusId)
        {
            DispatchCore.Models.SegmentStatus result = new DispatchCore.Models.SegmentStatus();
            using(DispatchEntities db = new DispatchEntities())
            {
                var s = db.SegmentStatuses.FirstOrDefault(sta => sta.SegmentStatusId == statusId);
                if(s != null)
                {
                    result.SegmentStatusId = s.SegmentStatusId;
                    result.Description = s.Description;
                }
            }

            return result;
        }

        private IQueryable<DispatchCore.Models.StandbySegment> ApplyFilter(SearchOptions<DispatchCore.Models.StandbySegment> filter, IQueryable<DispatchCore.Models.StandbySegment> query)
        {
            if (filter != null)
            {
                if (filter.filter.OrderId != null)
                {
                    query = query.Where(s => s.OrderId == filter.filter.OrderId);
                }
            }
            return query;
        }

        private IQueryable<DispatchCore.Models.TravelSegment> ApplyFilter(SearchOptions<DispatchCore.Models.TravelSegment> filter, IQueryable<DispatchCore.Models.TravelSegment> query)
        {
            if (filter != null)
            {
                if (filter.filter.OrderId != null)
                {
                    query = query.Where(s => s.OrderId == filter.filter.OrderId);
                }
            }

            return query;
        }

    }
}
