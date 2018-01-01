var Icon = React.createClass({displayName: "Icon",
render: function(){
    var type = this.props.type;
    var title = this.props.title;
    return (
        React.createElement("svg", {title: title, className: "icon", dangerouslySetInnerHTML: {__html: '<use xlink:href="assets/fontawesome-webfont.svg#fa-' + type + '"></use>'}, width: this.props.width, height: this.props.height})
    );
}
});

var OrderCard = React.createClass({displayName: "OrderCard",
getInitialState: function(){

    
    return { data: this.props.data, routes:[], legDistance:0,legDistanceText:'',legDuration:0,legDurationText:'',selected:this.props.data.selected}
        
    
},
componentDidMount: function(){

    var routeArray = [];
   

    
},
handleClick: function(index){
    // Steepless.directionsRenderer.setDirections(this.state.routes);

    var selfOrder = this.props.data
   
    //this.props.data.dRenderer.setOptions({polylineOptions: poly}); 
    var result = selfOrder.dRenderer.directions
   

    $.each(Dispatch.Orders,function(i,o){
        if(o.OrderId != selfOrder.OrderId){
        
            nonSelectedResult = o.dRenderer.directions
           // o.dRenderer.setDirections({routes:[]});
            o.dRenderer.setDirections(nonSelectedResult);
            var bounds = new google.maps.LatLngBounds();
            var route = nonSelectedResult.routes[0];
            var path = nonSelectedResult.routes[0].overview_path;
            var legs = nonSelectedResult.routes[0].legs;
          
            o.polyline = new google.maps.Polyline({
               // map:Dispatch.map, 
                strokeColor:Config.routePolylineStyle.strokeColor,
                strokeOpacity:Config.routePolylineStyle.strokeOpacity,
                strokeWeight: Config.routePolylineStyle.strokeWeight, 
                path:[]})
            for (i = 0; i < legs.length; i++) {
             
            //   if (i == 1) {
            // 	polyline.setOptions({strokeColor: "red"});
            // 	}
              var steps = legs[i].steps;
              for (j = 0; j < steps.length; j++) {
                var nextSegment = steps[j].path;
                for (k = 0; k < nextSegment.length; k++) {
                    
                    o.polyline.getPath().push(nextSegment[k]);
                    o.polyline.path =  o.polyline.getPath()
                  bounds.extend(nextSegment[k]);
                }
              }
            }
        
            //o.dRenderer.setDirections({routes:[]});
            
           // o.polyline.setMap(Dispatch.map);
            
          //  Dispatch.map.fitBounds(bounds);


        }
    })
    var bounds = new google.maps.LatLngBounds();
    var route = result.routes[0];
    var path = result.routes[0].overview_path;
    var legs = result.routes[0].legs;

    selfOrder.dRenderer.setDirections({routes:[]});
    selfOrder.dRenderer.setDirections(result);
    selfOrder.polyline = new google.maps.Polyline({
      //  map:Dispatch.map, 
        strokeColor: Config.selectedRoutePolylineStyle.strokeColor,
        strokeOpacity: Config.selectedRoutePolylineStyle.strokeOpacity,
        strokeWeight:  Config.selectedRoutePolylineStyle.strokeWeight, 
        path:[]})
    for (i = 0; i < legs.length; i++) {
      
    //   if (i == 1) {
    // 	polyline.setOptions({strokeColor: "red"});
    // 	}
      var steps = legs[i].steps;
      for (j = 0; j < steps.length; j++) {
        var nextSegment = steps[j].path;
        for (k = 0; k < nextSegment.length; k++) {
          selfOrder.polyline.getPath().push(nextSegment[k]);
          bounds.extend(nextSegment[k]);
        }
      }
    }
    selfOrder.polyline.setMap(null);
    selfOrder.polyline.setMap(Dispatch.map);
    Dispatch.map.fitBounds(bounds);
    this.setState({
        selected: true
    });
    this.props.onClick(index);
},
handleDetailsClick: function(index){
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
            React.createElement('div', {className:'orderCardHeaderRow'},//React.createElement("i", {className:"fa fa-hashtag cardIcon"}), 
                React.createElement('span',{className:'orderCardOrderNumberWrapper'}, data.OrderNumber),
                React.createElement('div',{className:'orderCardDistanceDurationWrapper'},
                React.createElement('span',{className:'orderCardLegDistanceWrapper'},data.friendlyTotalDistance),
                React.createElement('span',{className:'orderCardLegDurationWrapper'},data.friendlyTotalDuration))),
                React.createElement('div', {className:'orderCardProductLabelRow'},
                    React.createElement('label',{className:'orderCardProductLabel'}, "Product"), 
                    React.createElement('label',{className:'orderCardCustomerLabel'}, 'Customer')),
                React.createElement('div', {className:'orderCardProductRow'},
                    React.createElement('span',{className:'orderCardProductWrapper'}, data.ProductName), 
                    React.createElement('span',{className:'orderCardCustomerWrapper'}, data.CustomerName)),
                React.createElement('div', {className:'orderCardLocationsLabelRow'},
                    React.createElement('label',{className:'orderCardSourceLabel'}, "From"), 
                    React.createElement('label',{className:'orderCardDestinationLabel'}, 'At')),
                React.createElement('div', {className:'orderCardLocationNamesRow'},
                    React.createElement('span',{className:'orderCardSourceNameWrapper'}, data.VendorName), 
                    React.createElement('span',{className:'orderCardDestinationNameWrapper'},  data.DestinationName)),
                React.createElement('div',{className:'orderCardButtonRow'},
                    React.createElement("button", {onClick:self.handleDetailsClick}, "Details")
                )

                
            )
        
    );
}
});
var OrderDetails = React.createClass({displayName: "OrderDetails",
getInitialState: function(){

    
    return { data: [], routes:[], legDistance:0,legDistanceText:'',legDuration:0,legDurationText:''}
        
    
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
    // if(this.props.data.StandbySegments){
    //     var i = 1
    //     var waypoints = [];
    //     var wpCount = this.props.data.StandbySegments.length - 2
    //     var start = this.props.data.StandbySegments[0].StandbyLocation.Address + ' ' + this.props.data.StandbySegments[0].StandbyLocation.City + ' ' +  this.props.data.StandbySegments[0].StandbyLocation.Zip
    //     var end = this.props.data.StandbySegments[wpCount + 1].StandbyLocation.Address + ' ' + this.props.data.StandbySegments[wpCount + 1].StandbyLocation.City + ' ' +  this.props.data.StandbySegments[wpCount + 1].StandbyLocation.Zip
    //     var wpProcessed = 0
    //     var geocoder = new google.maps.Geocoder();
    //     if(this.props.data.StandbySegments.length == 2){
    //         Dispatch.requestDirections(start,end,waypoints);
    //     }
    //     while(i<this.props.data.StandbySegments.length-1){
            
    //         geocoder.geocode({'address':this.props.data.StandbySegments[i].StandbyLocation.Address + ' ' + this.props.data.StandbySegments[i].StandbyLocation.City + ' ' +  this.props.data.StandbySegments[i].StandbyLocation.Zip}, function(results,status){
    //             if(status == 'OK'){
    //                 var pos = {lat:results[0].geometry.location.lat(),lng:results[0].geometry.location.lng()}
    //                 waypoints.push({ location : new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()) });
    //                 wpProcessed++
    //                 if(wpProcessed == wpCount){
    //                     Dispatch.requestDirections(start,end,waypoints);
    //                 }
    //             }
    //         })
           
           
            
           
    //        // var self = this;
    //         // var state = this.state; 
    //         // Steepless.directionsService.route({
    //         //     origin: source,
    //         //     destination: destination,
    //         //     travelMode: google.maps.TravelMode['DRIVING'],
    //         //     provideRouteAlternatives: true,
    //         //     unitSystem: google.maps.UnitSystem.IMPERIAL
    //         // }, function(response, status){
    //         //     if (status == google.maps.DirectionsStatus.OK) {
    //         //         //var routes = response.routes;
    //         //         // routeArray.push(response.routes[0].legs[0])
    //         //         var map = new google.maps.Map(document.getElementById("map-canvas"))
    //         //         var directionsRenderer = new google.maps.DirectionsRenderer;
    //         //         directionsRenderer.setMap(map);
    //         //         directionsRenderer.setDirections(response);


    //         //         //Steepless.directionsRenderer.setDirections(response);
    //         //         // this.props.routes.push(response.routes[0].legs[0]); 
    //         //         // this.setState({
    //         //         //     routes: this.props.routes
    //         //         // })
    //         //         // var longestDistance = 0;
    //         //         // routes.forEach(function(route){
    //         //         //     var distance = route.legs[0].distance.value;
    //         //         //     if (distance > longestDistance) longestDistance = distance;
    //         //         // });
    //         //         // Steepless.longestDistance = longestDistance;
                
                
                
                    

                

    //         //     // self.getElevations();
    //         //     } else {
    //         //         // this.setState({
    //         //         //     routes: []
    //         //         // });
    //         //     }
    //       //  })
    //         i++
    //     }
        
    // }
   

    return (
        React.createElement("div", {className:'orderCardWrapper',onClick: self.handleClick}, 
            
              
                
            )
        
    );
}
});

var OrderList = React.createClass({displayName: "OrderList",
getInitialState: function(){
    return { data: this.props.data, ordersList: [], handleClick:function(index){} }
},
handleClick: function(index){
    // this.state.data.forEach(function(d, i){
    //     d.selected = false;
    // });
    // this.setState({
    //     data: this.state.data
    // });
    this.props.onOrderClick(index);
},
handleDetailsClick: function(index){
    this.props.onDetailsClick(index)
},
componentWillReceiveProps(props){
    this.setState({ data: props.data, ordersList: [], handleClick:function(index){} })
},
render: function(){
    var self = this;
    var data = this.props.data;
    var ordersList = this.state.data.map(function(d, i){
        var key =  d.orderNumber;
        return (
            React.createElement("li", {className: d.selected ? 'selected' : '', onClick: self.handleClick.bind(self, i)}, 
                React.createElement(OrderCard,{key:d.orderNumber,data:d,
                    onClick: self.handleClick.bind(self, i),
                    onDetailsClick: self.handleDetailsClick.bind(self,i)})
            )
        )
              
    });
    this.props.ordersList = ordersList  
    return (
  
        React.createElement("div",null, ordersList )
      );
    }
});



var OrderListHeaderForm = React.createClass({displayName: "OrderListHeaderForm",

componentDidMount: function(){
    // var startNode = this.refs.start.getDOMNode();
    // var endNode = this.refs.end.getDOMNode();
    // var start = startNode.value.trim();
    // var end = endNode.value.trim();

    // if (start && end){
    //     if (this.props.start) startNode.value = this.props.start;
    //     if (this.props.end) endNode.value = this.props.end;
    // }

    // new google.maps.places.Autocomplete(startNode);
    // new google.maps.places.Autocomplete(endNode);
},
componentWillReceiveProps: function(){
    // if (this.props.travelMode) this.refs.travelMode.getDOMNode().value = this.props.travelMode;
    // if (this.props.start) this.refs.start.getDOMNode().value = this.props.start;
    // if (this.props.end) this.refs.end.getDOMNode().value = this.props.end;
},
handleTravelModeChange: function(){
    var travelMode = this.refs.travelMode.getDOMNode().value;
    this.updateLocationHash(travelMode);
},

handleDistanceChange: function(){
    var unit = this.refs.distanceSelect.getDOMNode().value;
    this.props.onUnitChange({
        distanceUnit: unit
    });
},
render: function(){
    var units = this.props.units;
    return (
        React.createElement("div", {className:'orderListHeaderButtonRow'}, 
            React.createElement("button", {className:'orderListHeaderCreatNew',
                onClick: this.handleCloseClick}, "New Order")
        )
    );
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