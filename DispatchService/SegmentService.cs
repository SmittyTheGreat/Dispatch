using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DispatchCore.Models;
using DispatchData.Repositories;



namespace DispatchService
{
    public class SegmentService : DispatchCore.Interfaces.ISegmentService
    {
        private SegmentRespository repo;
        private VehicleService vehicleService;
        private DriverService driverService;
        private BrokerService brokerService;
        private ProductService productService;
        private LocationService locationService;
        public SegmentService()
        {
            repo = new SegmentRespository();
            vehicleService = new VehicleService();
            driverService = new DriverService();
            brokerService = new BrokerService();
            productService = new ProductService();
            locationService = new LocationService();
        }
        public SearchResults<StandbySegment> GetStandbySegments(SearchOptions<StandbySegment> filter)
        {
            List<StandbySegment> segments = repo.GetStandbySegments(filter).results.ToList();
            foreach(StandbySegment seg in segments)
            {
                BuildSegment(seg);
            }

            return new SearchResults<StandbySegment>(segments, segments.Count);
        }
        public StandbySegment GetStandbySegment(int segmentId)
        {
            return BuildSegment(repo.GetStandbySegment(segmentId));
        }
        public StandbySegment SetStandbySegment(StandbySegment segment)
        {
            return BuildSegment(repo.SetStandbySegment(segment));
        }


        public SearchResults<TravelSegment> GetTravelSegments(SearchOptions<TravelSegment> filter)
        {
            List<TravelSegment> segments = repo.GetTravelSegments(filter).results.ToList();
            foreach (TravelSegment seg in segments)
            {
                BuildSegment(seg);
            }

            return new SearchResults<TravelSegment>(segments, segments.Count);
        }
        public TravelSegment GetTravelSegment(int segmentId)
        {
            return BuildSegment(repo.GetTravelSegment(segmentId));
        }
        public TravelSegment SetTravelSegment(TravelSegment segment)
        {
            return BuildSegment(repo.SetTravelSegment(segment));
        }


        public List<SegmentStatus> GetSegmentStatuses()
        {
            return repo.GetSegmentStatuses();
        }
        public SegmentStatus GetSegmentStatus(int statusId)
        {
            return repo.GetSegmentStatus(statusId);
        }

        public List<SegmentActivity> GetSegmentActivities()
        {
            return repo.GetSegmentActivities();
        }
        public SegmentActivity GetSegmentActivity(int id)
        {
            return repo.GetSegmentActivity(id);
        }


        private StandbySegment BuildSegment(StandbySegment seg)
        {
            if (seg.AssignedVehicleId != null)
            {
                seg.AssignedVehicle = vehicleService.GetVehicle((int)seg.AssignedVehicleId);
            }
            if (seg.AssignedDriverId != null)
            {
                seg.AssignedDriver = driverService.GetDriver((int)seg.AssignedDriverId);
            }
            if (seg.AssignedBrokerId != null)
            {
                seg.AssignedBroker = brokerService.GetBroker((int)seg.AssignedBrokerId);
            }
            if (seg.ProductId != null)
            {
                seg.SegmentProduct = productService.GetProduct((int)seg.ProductId);
            }
            if (seg.StandbyLocationId != null)
            {
                seg.StandbyLocation = locationService.GetLocation((int)seg.StandbyLocationId);
            }
            if (seg.SegmentStatusId != null)
            {
                seg.SegmentStatus = GetSegmentStatus((int)seg.SegmentStatusId);
            }
            if (seg.SegmentActivityId != null)
            {
                seg.StandbyActivity = GetSegmentActivity((int)seg.SegmentActivityId);
            }

            return seg;
        }

        private TravelSegment BuildSegment(TravelSegment seg)
        {
            if (seg.AssignedVehicleId != null)
            {
                seg.AssignedVehicle = vehicleService.GetVehicle((int)seg.AssignedVehicleId);
            }
            if (seg.AssignedDriverId != null)
            {
                seg.AssignedDriver = driverService.GetDriver((int)seg.AssignedDriverId);
            }
            if (seg.AssignedBrokerId != null)
            {
                seg.AssignedBroker = brokerService.GetBroker((int)seg.AssignedBrokerId);
            }
            if (seg.ProductId != null)
            {
                seg.SegmentProduct = productService.GetProduct((int)seg.ProductId);
            }
            if (seg.SegmentStatusId != null)
            {
                seg.SegmentStatus = GetSegmentStatus((int)seg.SegmentStatusId);
            }

            return seg;
        }


    }
}
