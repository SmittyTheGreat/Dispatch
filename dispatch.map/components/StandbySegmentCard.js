var StandbySegmentCard = React.createClass({displayName: "StandbySegmentCard",
getInitialState: function(){

    
    return { data: this.props.data, routes:[], legDistance:0,legDistanceText:'',legDuration:0,legDurationText:''}
        
    
},
componentDidMount: function(){
    var source = this.props.data.source
    var destination = this.props.data.destination
    var self = this;
    var state = this.state; 

    
    
},
handleClick: function(){
    var poly = new google.maps.Polyline({
        strokeColor:'#00FF00',
        strokeOpacity:0.9,
        strokeWeight: 6
    })
    this.props.data.dRenderer.setOptions({polylineOptions: poly}); 
    this.props.data.dRenderer.setDirections(directionsRenderer.directions);
    this.setState({
        selected: true
    });
  //  Steepless.directionsRenderer.setDirections(this.state.routes);
    this.props.onClick(index);
},
handleCloseClick: function(index){
    this.props.onCloseClick(index);
},
render: function(){
    var self = this;
    var data = this.props.data;
    var units = {
        distance: this.state.distanceUnit,
        height: this.state.heightUnit
    };
    var travelMode = this.state.travelMode;

    var productDisplay = ''
    if(data.SegmentProduct !== undefined && data.SegmentProduct !== null){
        productDisplay = data.SegmentProduct.Name || ''
        if(productDisplay != ''){
            productDisplay = ' (' + productDisplay + ')'
        }
    } 
    
    if(Dispatch.currentDetailOrder !== undefined){
        if(data.StandbySegmentId){
            return (
             
                
                    React.createElement("div", {className: 'standbySegmentCardWrapper',onClick: self.handleClick}, 
                        React.createElement('div', {className:'standbySegmentCardHeaderRow'},//React.createElement("i", {className:"fa fa-hashtag cardIcon"}), 
                        React.createElement('span',{className:'standbySegmentCardTitleWrapper'}, '#' + (data.OrderIndex + 1) + ' ' +  data.StandbyLocation.Name),
                        React.createElement('div',{className:'standbySegmentCardDurationWrapper'},
                            React.createElement('span',{className:'standbySegmentCardStartTimeWrapper'},new Date(data.ScheduledStart).formatTimeForCard()),
                            React.createElement('span',{className:'standbySegmentCardTimeDash'},' - '),
                            React.createElement('span',{className:'standbySegmentCardEndTimeWrapper'},new Date(data.ScheduledEnd).formatTimeForCard()))),
                        React.createElement('div', {className:'StandbySegmentCardAddressLabelRow'},
                            React.createElement('label',{className:'StandbySegmentCardAddressLabelRow'}, "Address")), 
                           // React.createElement('label',{className:'orderCardVendorLabel'}, 'Vendor')),
                        React.createElement('div', {className:'standbySegmentCardAddressRow'},
                            React.createElement('span',{className:'standbySegmentCardAddressWrapper'}, data.StandbyLocation.Address + ', ' + data.StandbyLocation.City + ' ' + data.StandbyLocation.Zip), 
                            React.createElement('span',{className:'standbySegmentCardCityWrapper'}, )),
                            //React.createElement('div', {className:'orderCardLocationsLabelRow'},
                               // React.createElement('label',{className:'orderCardAssignedVehicleLabel'}, "Assigned Vehicle"), 
                               // React.createElement('label',{className:'orderCardDestinationLabel'}, '')),
                        React.createElement('div', {className:'StandbySegmentCardActivityLabelRow'},
                            React.createElement('label',{className:'StandbySegmentCardActivityLabelRow'}, "Activity")),
                        React.createElement('div', {className:'standbySegmentCardActivitiesRow'},
                            React.createElement('span',{className:'standbySegmentCardActivityWrapper'}, data.StandbyActivity.Description + productDisplay)), 
                            //React.createElement('div', {className:'orderCardButtonRow'},
                              //  React.createElement("button", {onClick:self.handleDetailsClick}, "Details"),
                            //)
                            // React.createElement('span',{className:'orderCardDestinationNameWrapper'},  data.DestinationName)),
                      //  React.createElement('div',{className:'orderCardButtonRow'},
                           // React.createElement("button", {onClick:self.handleDetailsClick}, "Details")
                       // )

                        
                        )
            
                    
                    
                   
            
            );
        }else{
            return (
             
                
                    React.createElement("div", {className: 'travelSegmentCardWrapper',onClick: self.handleClick}, 
                        React.createElement('div', {className:'standbySegmentCardHeaderRow'},//React.createElement("i", {className:"fa fa-hashtag cardIcon"}), 
                        React.createElement('span',{className:'standbySegmentCardTitleWrapper'}, '#' + (data.OrderIndex +1) + ' Travel to Next Waypoint'),
                        React.createElement('div',{className:'standbySegmentCardDurationWrapper'},
                            React.createElement('span',{className:'standbySegmentCardStartTimeWrapper'},new Date(data.ScheduledStart).formatTimeForCard()),
                            React.createElement('span',{className:'standbySegmentCardTimeDash'},' - '),
                            React.createElement('span',{className:'standbySegmentCardEndTimeWrapper'},new Date(data.ScheduledEnd).formatTimeForCard()))),
                       

                        
                        )
            
                    
                    
                   
            
            );
        }
    }else{
        return(React.createElement('div'))
    }
}
});


var OrderDetailsHeaderForm = React.createClass({displayName: "OrderDetailsHeaderForm",


componentDidMount: function(){
   
},

handleCloseClick: function(){
    this.props.onCloseClick();
},
render: function(){
   
    return (
             React.createElement("div", {className:'orderDetailsHeaderButtonRow'}, 
                React.createElement("button", {className:'orderDetailsHeaderClose',
                    onClick: this.handleCloseClick}, "Close")
            )
        
    );
}
});

var Route = React.createClass({displayName: "Route",
handleBarHover: function(index){
    if (index){
        var data = this.props.data.elevations[index];
        Map.showPinpointMarker(data.location);
    } else {
        Map.hidePinpointMarker();
    }
},
iconMap: {
    walking: 'pedestrian',
    bicycling: 'bicycle',
    driving: 'car-side'
},
render: function(){
    var data = this.props.data;
    var units = this.props.units;
    var route = data.route;
    var leg = route.legs[0];
    var distance = leg.distance.value;
    var width = Math.ceil(distance/Steepless.longestDistance * Steepless.chartWidth);
    var chartWidth = {width: width};
    var stats = data.stats;
    var domain = [0, Steepless.highestElevation];

    var iconType = this.iconMap[this.props.travelMode];

    var height = Math.round((Steepless.highestElevation - Steepless.lowestElevation) / 2);
    var rise = null, drop = null, heightUnit = units.height;
    if (stats){
        var statsRise = stats.rise, statsDrop = stats.drop;
        rise = Math.round(heightUnit == 'm' ? statsRise : statsRise*3.28084) + ' ' + heightUnit;
        drop = Math.round(heightUnit == 'm' ? statsDrop : statsDrop*3.28084) + ' ' + heightUnit;
    }

    var distanceUnit = units.distance;
    var distanceVal = leg.distance.value;
    var distance = (distanceUnit == 'km' ? distanceVal/1000 : distanceVal*0.000621371).toFixed(2) + ' ' + distanceUnit;
    var riseStat = rise ? React.createElement("span", null, React.createElement(Icon, {type: "arrow-graph-up-right", width: "14", height: "14", title: "Rise"}), " ", rise) : '';
    var dropStat = drop ? React.createElement("span", null, React.createElement(Icon, {type: "arrow-graph-down-right", width: "14", height: "14", title: "Drop"}), " ", drop) : '';

    var elevations = data.elevations ? data.elevations.map(function(d){
        var elevation = d.elevation;
        return {
            value: elevation,
            title: Math.round(heightUnit == 'm' ? elevation : elevation*3.28084) + ' ' + heightUnit
        }
    }) : null;

    return (
        React.createElement("a", null, 
            React.createElement("div", {className: "heading"}, 
            React.createElement(Icon, {type: iconType, width: "24", height: "24", title: iconType}), " order #1234",
            React.createElement("br", {className: ""}), 
                React.createElement(Icon, {type: iconType, width: "24", height: "24", title: iconType}), " via ", route.summary
            ), 
            React.createElement(Chart, {data: elevations, domain: domain, width: width, height: height, onBarMouseEnter: this.handleBarHover, onBarMouseLeave: this.handleBarHover}), 
            //React.createElement("div", {className: "stats"}, riseStat, "   ", dropStat), 
            React.createElement("div", {className: "metadata"}, leg.duration.text, "   ", distance)
        )
    );
}
});