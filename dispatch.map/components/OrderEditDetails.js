var OrderEditDetails = React.createClass({displayName: "OrderEditDetails",
getInitialState: function(){

    return { data: this.props.data, 
        pickupLocation: {}, 
        pickupLocationMarker:null,
        destinationLocation: {}, 
        destinationLocationMarker:null,
        product:{}, 
        routes:[], 
        legDistance:0,
        legDistanceText:'',
        legDuration:0,
        legDurationText:''}
},
componentDidMount: function(){
    var source = this.props.data.source
    var destination = this.props.data.destination
    var self = this;
    this.state.showingModal = false
    var state = this.state;     
},
handleClick: function(){
    
},
handleCloseClick: function(index){
    this.props.onCloseClick(index);
},
handleLocationAddClick: function(){
    this.props.onAddPickupLocation()
},
handlePickupLocationFound:function(data,location){
    var pickupLocationMarker = this.state.pickupLocationMarker
    if(pickupLocationMarker != null && pickupLocationMarker != {}){
        pickupLocationMarker.setMap(null)
    }
    pickupLocationMarker = new google.maps.Marker({
        position: new google.maps.LatLng(location.Lat,location.Lon),
        map: Dispatch.map,
        title: location.Name,
        icon: Config.waypointMapMarkerURL

    })
    pickupLocationMarker['infowin'] = new google.maps.InfoWindow({
        content: '<b>#1 '+ location.Name +'</b>'
    })
    google.maps.event.addListener(pickupLocationMarker,'click',function(){
        this['infowin'].open(Dispatch.map,this)
    })
    pickupLocationMarker['infowin'].open(Dispatch.map,pickupLocationMarker)
    Dispatch.map.setCenter(new google.maps.LatLng(data.results[0].geometry.location.lat,data.results[0].geometry.location.lng))
    Dispatch.map.setZoom(15)
    if(location.LocationId){
        this.setState({pickupLocationMarker: pickupLocationMarker,pickupLocation:location})
    }else{
        this.setState({pickupLocationMarker: pickupLocationMarker})
    }
},
handleSetPickupLocation:function(location){
    this.setState({pickupLocation:location})
},
handleDestinationLocationFound:function(data,location){
    var destinationLocationMarker = this.state.destinationLocationMarker
    if(destinationLocationMarker != null && destinationLocationMarker != {}){
        destinationLocationMarker.setMap(null)
    }
    destinationLocationMarker = new google.maps.Marker({
        position: new  google.maps.LatLng(location.Lat,location.Lon),
        map: Dispatch.map,
        title: location.Name,
        icon: Config.waypointMapMarkerURL

    })
    destinationLocationMarker['infowin'] = new google.maps.InfoWindow({
        content: '<b>#2 '+ location.Name +'</b>'
    })
    google.maps.event.addListener(destinationLocationMarker,'click',function(){
        this['infowin'].open(Dispatch.map,this)
    })
    destinationLocationMarker['infowin'].open(Dispatch.map,destinationLocationMarker)
    // Dispatch.map.setCenter(new google.maps.LatLng(data.results[0].geometry.location.lat,data.results[0].geometry.location.lng))
    // Dispatch.map.setZoom(15)

    Dispatch.directionsService.route({ 
        origin: new google.maps.LatLng(this.state.pickupLocation.Lat,this.state.pickupLocation.Lon),
        destination: new google.maps.LatLng(data.results[0].geometry.location.lat,data.results[0].geometry.location.lng),
       // waypoints: o.waypoints,
        optimizeWaypoints: false,   
        travelMode: google.maps.DirectionsTravelMode.DRIVING 
    }, function(result) { 
            var directionsRenderer = new google.maps.DirectionsRenderer(); 
            var poly = new google.maps.Polyline({
                strokeColor:Config.selectedRoutePolylineStyle.strokeColor,
                strokeOpacity:Config.selectedRoutePolylineStyle.strokeOpacity,
                strokeWeight: Config.selectedRoutePolylineStyle.strokeWeight
            })
            directionsRenderer.setOptions({polylineOptions: poly, suppressMarkers:true}); 
            directionsRenderer.setMap(Dispatch.map); 
            directionsRenderer.setDirections(result);
        }
    );    

    this.setState({destinationLocationMarker: destinationLocationMarker})
},
handleSetDestinationLocation:function(location){
    this.setState({destinationLocation:location})
},
handleSetProduct:function(newProduct,callback){
    callback(newProduct)
    this.setState({product:newProduct})
},
handleSelectProduct:function(selectedProduct){
    this.setState({product:selectedProduct})
},
render: function(){
    var self = this;
    var data = this.props.data;
    if(Dispatch.currentDetailOrder !== undefined){       
        return (
                React.createElement("div", {className: 'orderEditWrapper',onClick: self.handleClick}, 
                    React.createElement('div', {className:'orderEditOrderNumberRow'},                       
                        React.createElement('input',{className: 'orderNumberInput',type:'text'})                        
                    ),
                    React.createElement('div', {className:'orderOrderNumberLabelRow'},                        
                            React.createElement('label',{className:'orderEditOrderNumberLabel'}, "Order #"),                        
                    ),
                    React.createElement(PickupLocationWidget,{data:{},
                        onPickupLocationFound:this.handlePickupLocationFound,
                        onSetLocation:this.handleSetPickupLocation
                    }),                    
                    
                    React.createElement(ProductWidget,{pickupLocation:this.state.pickupLocation,
                        onSetProduct:this.handleSetProduct,
                        onSelectProduct:this.handleSelectProduct
                       
                    }),
                    React.createElement(DestinationLocationWidget,{data:{},
                        onDestinationLocationFound:this.handleDestinationLocationFound,
                        onSetLocation:this.handleSetDestinationLocation
                    }),
                    React.createElement(TimeEntryWidget,{data:{},
                        onDestinationLocationFound:this.handleDestinationLocationFound,
                        onSetLocation:this.handleSetDestinationLocation
                    })
                    // React.createElement('div', {className:'orderEditProductRow'},
                    //     React.createElement('input',{className: 'orderProductInput',type:'text'})
                    // ),     
                    // React.createElement('div', {className:'orderEditProductLabelRow'},                        
                    //     React.createElement('label',{className:'orderEditProductLabel'}, 'Product')
                    // ),                    
                    // React.createElement('div', {className:'orderEditDestinationRow'},
                    //     React.createElement('input',{className: 'orderDestinationInput',type:'text'})
                    // ),
                    // React.createElement('div', {className:'orderEditDestinationLabelRow'},
                    //     React.createElement('label',{className:'orderEditDestinationLabel'}, "Destination")
                    // ),
                )        
        );
    }else{
        return(React.createElement('div'))
    }
}
});

