var OrderDetails = React.createClass({displayName: "OrderDetails",
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
    
    if(Dispatch.currentDetailOrder !== undefined){
        return (
         
            
                React.createElement("div", {className: 'orderCardWrapper',onClick: self.handleClick}, 
                    React.createElement('div', {className:'orderCardHeaderRow'},//React.createElement("i", {className:"fa fa-hashtag cardIcon"}), 
                    React.createElement('span',{className:'orderCardOrderNumberWrapper'}, Dispatch.currentDetailOrder.OrderNumber),
                    React.createElement('div',{className:'orderCardDistanceDurationWrapper'},
                    React.createElement('span',{className:'orderCardLegDistanceWrapper'},Dispatch.currentDetailOrder.friendlyTotalDistance),
                    React.createElement('span',{className:'orderCardLegDurationWrapper'},Dispatch.currentDetailOrder.friendlyTotalDuration))),
                    React.createElement('div', {className:'orderCardProductLabelRow'},
                        React.createElement('label',{className:'orderCardProductLabel'}, "Product"), 
                        React.createElement('label',{className:'orderCardVendorLabel'}, 'Vendor')),
                    React.createElement('div', {className:'orderCardProductRow'},
                        React.createElement('span',{className:'orderCardProductWrapper'}, Dispatch.currentDetailOrder.productList), 
                        React.createElement('span',{className:'orderCardVendorWrapper'}, Dispatch.currentDetailOrder.OrderVendor.Name)),
                    React.createElement('div', {className:'orderCardLocationsLabelRow'},
                        React.createElement('label',{className:'orderCardAssignedVehicleLabel'}, "Assigned Vehicle"), 
                        React.createElement('label',{className:'orderCardDestinationLabel'}, '')),
                    React.createElement('div', {className:'orderCardLocationNamesRow'},
                        React.createElement('span',{className:'orderCardSourceNameWrapper'}, Dispatch.currentDetailOrder.assignedVehicleList), 
                     
                        // React.createElement('span',{className:'orderCardDestinationNameWrapper'},  data.DestinationName)),
                  //  React.createElement('div',{className:'orderCardButtonRow'},
                       // React.createElement("button", {onClick:self.handleDetailsClick}, "Details")
                   // )

                    
                    ),

                    
                

                    React.createElement('div',{className: 'standbySegmentListWrapper'},
                       
                            //React.createElement(StandbySegmentCardList,{data: Dispatch.currentDetailOrder.StandbySegments})
                            React.createElement(SegmentCardList,{data: Dispatch.currentDetailOrder.totalSegments})
                        
                    
                    )
                
                )

                    
        
                
                
               
        
        );
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
handleEditClick: function(){
    this.props.onEditClick();
},
render: function(){
   
    return (
                React.createElement("div", {className:'orderDetailsHeaderButtonRow'}, 
                    React.createElement("button", {className:'orderDetailsHeaderClose',
                        onClick: this.handleCloseClick}, "Close"),
                     React.createElement("button", {className:'orderDetailsHeaderEdit',
                        onClick: this.handleEditClick}, "Edit")
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