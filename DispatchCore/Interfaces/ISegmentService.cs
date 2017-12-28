using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DispatchCore.Models;

namespace DispatchCore.Interfaces
{
    public interface ISegmentService
    {
        SearchResults<StandbySegment> GetStandbySegments(SearchOptions<StandbySegment> filter);
        StandbySegment GetStandbySegment(int segmentId);
        StandbySegment SetStandbySegment(StandbySegment segment);

        SearchResults<TravelSegment> GetTravelSegments(SearchOptions<TravelSegment> filter);
        TravelSegment GetTravelSegment(int segmentId);
        TravelSegment SetTravelSegment(TravelSegment segment);

        List<SegmentStatus> GetSegmentStatuses();
        SegmentStatus GetSegmentStatus(int statusId);

    }
}
