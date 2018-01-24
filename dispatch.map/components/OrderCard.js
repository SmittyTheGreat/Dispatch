
var OrderCard = React.createClass({displayName: "OrderCard",
getInitialState: function(){   
    return { data: this.props.data, routes:[], legDistance:0,legDistanceText:'',legDuration:0,legDurationText:'',selected:this.props.data.selected}
},
componentDidMount: function(){
    var routeArray = [];
},
handleClick: function(index){
    var selfOrder = this.props.data
    var result = selfOrder.dRenderer.directions
    $.each(Dispatch.Orders,function(i,o){
        if(o.OrderId != selfOrder.OrderId){
            o.polyline.setOptions({strokeColor:Config.routePolylineStyle.strokeColor});
            var i = 0
            if(o.waypointMarkers !== undefined)
            while(i<o.waypointMarkers.length){
               o.waypointMarkers[i].setVisible(false)
               o.waypointMarkers[i]['infowin'].close()
                i++
            }

        }
    })
    var bounds = new google.maps.LatLngBounds();
    var route = result.routes[0];
    var path = result.routes[0].overview_path;
    var legs = result.routes[0].legs;

    for (i = 0; i < legs.length; i++) {
      var steps = legs[i].steps;
      for (j = 0; j < steps.length; j++) {
        var nextSegment = steps[j].path;
        for (k = 0; k < nextSegment.length; k++) {
          selfOrder.polyline.getPath().push(nextSegment[k]);
          bounds.extend(nextSegment[k]);
        }
      }
    }
    if(selfOrder.waypointMarkers === undefined || selfOrder.waypointMarkers.length == 0){
        selfOrder.waypointMarkers = []
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(selfOrder.StandbySegments[0].StandbyLocation.Lat,selfOrder.StandbySegments[0].StandbyLocation.Lon),
            map: Dispatch.map,
            title: selfOrder.StandbySegments[0].StandbyLocation.Name,
            icon: Config.waypointMapMarkerURL

        })
        marker['infowin'] = new google.maps.InfoWindow({
            content: '<b>#1 ' + selfOrder.StandbySegments[0].StandbyLocation.Name + '</b>'
        })
        google.maps.event.addListener(marker,'click',function(){
            this['infowin'].open(Dispatch.map,this)
        })

        selfOrder.waypointMarkers.push(marker);
        var i = 1
        while(i<selfOrder.StandbySegments.length-1){
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(selfOrder.StandbySegments[i].StandbyLocation.Lat,selfOrder.StandbySegments[i].StandbyLocation.Lon),
                map: Dispatch.map,
                title: selfOrder.StandbySegments[i].StandbyLocation.Name,
                icon: Config.waypointMapMarkerURL

            })
            marker['infowin'] = new google.maps.InfoWindow({
                content: '<b>#' +(i+1) + ' ' + selfOrder.StandbySegments[i].StandbyLocation.Name + '</b>'
            })
            google.maps.event.addListener(marker,'click',function(){
                this['infowin'].open(Dispatch.map,this)
            })
            selfOrder.waypointMarkers.push(marker);
            i++
        }
        var length = selfOrder.StandbySegments.length - 1
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(selfOrder.StandbySegments[length].StandbyLocation.Lat,selfOrder.StandbySegments[length].StandbyLocation.Lon),
            map: Dispatch.map,
            title: selfOrder.StandbySegments[length].StandbyLocation.Name,
            icon: Config.waypointMapMarkerURL

        })
        marker['infowin'] = new google.maps.InfoWindow({
            content: '<b>#' + (length +1) + ' ' + selfOrder.StandbySegments[length].StandbyLocation.Name + '</b>'
        })
        google.maps.event.addListener(marker,'click',function(){
            this['infowin'].open(Dispatch.map,this)
        })
        selfOrder.waypointMarkers.push(marker);
    }
    var i = 0
    while(i<selfOrder.waypointMarkers.length){
        selfOrder.waypointMarkers[i].setVisible(true)
        selfOrder.waypointMarkers[i]['infowin'].open(Dispatch.map,selfOrder.waypointMarkers[i])
        i++
    } 
    selfOrder.polyline.setOptions({strokeColor:Config.selectedRoutePolylineStyle.strokeColor});
    selfOrder.polyline.setOptions({ zIndex: Config.globalZIndex++ });
    selfOrder.dRenderer.setDirections(result)
    Dispatch.map.fitBounds(bounds);
    this.setState({
        selected: true
    });
    this.props.onClick(index);
},
handleDetailsClick: function(index){
    Dispatch.currentDetailOrder = this.props.data
    this.props.onDetailsClick(index)
},
render: function(){
    var self = this;
    var data = this.props.data;
   
    var units = {
        distance: this.state.distanceUnit,
        height: this.state.heightUnit
    };
    var travelMode = this.state.travelMode;
    
    return (
        React.createElement("div", {className: 'orderCardWrapper',onClick: self.handleClick}, 
            React.createElement('div', {className:'orderCardHeaderRow'},
                React.createElement('span',{className:'orderCardOrderNumberWrapper'}, data.OrderNumber),
                React.createElement('div',{className:'orderCardDistanceDurationWrapper'},
                    React.createElement('span',{className:'orderCardLegDistanceWrapper'},data.friendlyTotalDistance),
                    React.createElement('span',{className:'orderCardLegDurationWrapper'},data.friendlyTotalDuration)
                )
            ),
            React.createElement('div', {className:'orderCardProductLabelRow'},
                React.createElement('label',{className:'orderCardProductLabel'}, "Product"), 
                React.createElement('label',{className:'orderCardVendorLabel'}, 'Vendor')),
            React.createElement('div', {className:'orderCardProductRow'},
                React.createElement('span',{className:'orderCardProductWrapper'}, data.productList), 
                React.createElement('span',{className:'orderCardVendorWrapper'}, data.OrderVendor.Name)),
            React.createElement('div', {className:'orderCardLocationsLabelRow'},
                React.createElement('label',{className:'orderCardAssignedVehicleLabel'}, "Assigned Vehicle"), 
                React.createElement('label',{className:'orderCardDestinationLabel'}, '')),
            React.createElement('div', {className:'orderCardLocationNamesRow'},
                React.createElement('span',{className:'orderCardSourceNameWrapper'}, data.assignedVehicleList), 
                React.createElement('div', {className:'orderCardButtonRow'},
                    React.createElement("button", {onClick:self.handleDetailsClick}, "Details"),
                )
                
            )
        )
        
    );
}
});


