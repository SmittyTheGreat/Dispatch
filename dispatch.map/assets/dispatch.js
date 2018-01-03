var Steepless = {
	directionsService: new google.maps.DirectionsService(),
	directionsRenderer: new google.maps.DirectionsRenderer(),
	elevationService: new google.maps.ElevationService(),
	longestDistance: 0,
	highestElevation: 0,
	lowestElevation: Infinity,
	chartWidth: 400,
	chartBarWidth: 2
};


var Config ={
	url: 'http://dispatch.us-east-1.elasticbeanstalk.com/api/',
	//url: 'http://localhost:63499/api/',
	routePolylineStyle:{
		strokeColor:'#AAA',
		strokeOpacity:0.7,
		strokeWeight: 5
	},
	selectedRoutePolylineStyle:{
		strokeColor:"#4286f4",
		strokeOpacity:0.6,
		strokeWeight:6
	},
	globalZIndex:0,
	waypointMapMarkerURL:'https://maps.google.com/mapfiles/kml/pal2/icon13.png'

}

var Dispatch = {
	// map: function(){
	// 	var map = new google.maps.Map(document.getElementById("map-canvas"))
	// 	return map
	// },
	map: {},
	renderDirections: function(result){
			var directionsRenderer = new google.maps.DirectionsRenderer(); 
			var poly = new google.maps.Polyline({
				strokeColor:'#555',
				strokeOpacity:0.7,
				strokeWeight: 5
			})
			directionsRenderer.setOptions({polylineOptions: poly}); 
			directionsRenderer.setMap(Dispatch.map); 
			directionsRenderer.setDirections(result);
			return directionsRenderer 
		  },
	requestDirections: function(start, end,waypts) { 
		return Dispatch.directionsService.route({ 
			  origin: start, 
			  destination: end, 
			  waypoints: waypts,
			  optimizeWaypoints: false,	
			  travelMode: google.maps.DirectionsTravelMode.DRIVING 
			}, function(result) { 
				return Dispatch.renderDirections(result); 
			}); 
		  },
	directionsService: new google.maps.DirectionsService(),
	directionsRenderer: new google.maps.DirectionsRenderer(),
	elevationService: new google.maps.ElevationService(),
	longestDistance: 0,
	highestElevation: 0,
	lowestElevation: Infinity,
	chartWidth: 400,
	chartBarWidth: 2
};

var App = React.createClass({displayName: "App",
	getInitialState: function(){
		return {
			start: '',
			end: '',
			routes: null,
			distanceUnit: localStorage['steepless:distanceUnit'] || 'km',
			heightUnit: localStorage['steepless:heightUnit'] || 'm',
			travelMode: 'walking',
			currentOrder:{},
			editingOrder: false,
			orders:[]
		};
	},
	componentDidMount: function(){
		//this.url = 'http://127.0.0.1:8081/api/'
		this.url = 'http://localhost:63499/api/'
		this.OrdersList()
	//	this.VendorsList()

	},
	VendorsList(){
		var self = this
		self.state.vendors = {}
		$.getJSON(Config.url + 'vendors')
		.then(function(vendors){
			$.each(vendors,function(i,v){
				self.state.vendors[v.VendorId] = v
				self.setState(self.state)
			})
		
		})
	},
	OrdersList() {
		var self = this
		// $.getJSON('http://127.0.0.1:8081/orders')
		//   .then(function(data){
		// 	self.state.orders = JSON.parse(data)
		// 	self.setState(self.state)
		//   });
		//self.state.url = 'http://dispatchapi.us-east-1.elasticbeanstalk.com/'
	
		self.state.orders = []
		$.ajax({
			type: 'POST',
			url: Config.url + 'order',
			dataType: 'json',
			data: JSON.stringify({filter:{filter:{},skip:0,take:10}}),
			
		}).then(function(data){

			var ordersArray = [];
			var ordersProcessed = 0;
			$.each(data.results,function(index,o){
				var i=1
				o.waypoints = [];
				o.waypointMarkers = [];
				o.productList = '';
				o.assignedVehicleList = '';
				var wpCount = o.StandbySegments.length - 2
				var start = o.StandbySegments[0].StandbyLocation.Address + ' ' + o.StandbySegments[0].StandbyLocation.City + ' ' +  o.StandbySegments[0].StandbyLocation.Zip;
				o.startAddress = start;
				var end = o.StandbySegments[wpCount + 1].StandbyLocation.Address + ' ' + o.StandbySegments[wpCount + 1].StandbyLocation.City + ' ' +  o.StandbySegments[wpCount + 1].StandbyLocation.Zip
				o.endAddress = o.end
				var wpProcessed = 0
				var geocoder = new google.maps.Geocoder();
				if(o.StandbySegments.length == 2){
					if(o.StandbySegments[i-1].SegmentProduct !== undefined){
						if(o.productList.indexOf(o.StandbySegments[i-1].SegmentProduct.Name) < 0){
							if(o.productList.length < 1){
								o.productList += o.StandbySegments[i-1].SegmentProduct.Name
							}else{
								o.productList += ', ' + o.StandbySegments[i-1].SegmentProduct.Name
							}
							
						}
					}
					//redundant but safe
					if(o.StandbySegments[i].SegmentProduct !== undefined){
						if(o.productList.indexOf(o.StandbySegments[i].SegmentProduct.Name) < 0){
							if(o.productList.length < 1){
								o.productList += o.StandbySegments[i].SegmentProduct.Name
							}else{
								o.productList += ', ' + o.StandbySegments[i].SegmentProduct.Name
							}
							
						}
					}

					if(o.StandbySegments[i-1].AssignedVehicle !== undefined){
						if(o.assignedVehicleList.indexOf(o.StandbySegments[i-1].AssignedVehicle.VehicleNumber) < 0){
							if(o.assignedVehicleList.length < 1){
								o.assignedVehicleList += o.StandbySegments[i-1].AssignedVehicle.VehicleNumber
							}else{
								o.assignedVehicleList += ', ' + o.StandbySegments[i-1].AssignedVehicle.VehicleNumber
							}
							
						}
					}
					//redundant but safe
					if(o.StandbySegments[i].SegmentProduct !== undefined){
						if(o.assignedVehicleList.indexOf(o.StandbySegments[i].AssignedVehicle.VehicleNumber) < 0){
							if(o.assignedVehicleList.length < 1){
								o.assignedVehicleList += o.StandbySegments[i].AssignedVehicle.VehicleNumber
							}else{
								o.assignedVehicleList += ', ' + o.StandbySegments[i].AssignedVehicle.VehicleNumber
							}
							
						}
					}





					
					Dispatch.directionsService.route({ 
						origin: new google.maps.LatLng(o.StandbySegments[0].StandbyLocation.Lat,selfOrder.StandbySegments[0].StandbyLocation.Lon),
						destination: new google.maps.LatLng(o.StandbySegments[o.StandbySegments-1].StandbyLocation.Lat,selfOrder.StandbySegments[o.StandbySegments-1].StandbyLocation.Lon),
						waypoints: o.waypoints,
						optimizeWaypoints: false,	
						travelMode: google.maps.DirectionsTravelMode.DRIVING 
					  }, function(result) { 
						var directionsRenderer = new google.maps.DirectionsRenderer(); 
						var poly = new google.maps.Polyline({
							strokeColor:Config.routePolylineStyle.strokeColor,
							strokeOpacity:Config.routePolylineStyle.strokeOpacity,
							strokeWeight: Config.routePolylineStyle.strokeWeight
						})
						directionsRenderer.setOptions({polylineOptions: poly, suppressMarkers:true}); 
						directionsRenderer.setMap(Dispatch.map); 
						directionsRenderer.setDirections(result);
						o.dRenderer = directionsRenderer
			
						o.orderRendered = true;
						ordersArray.push(o);
						ordersProcessed++;
						if(ordersProcessed == data.results.length){
							Dispatch.Orders = ordersArray
							self.state.orders = ordersArray
							self.setState(self.state)
						} 
					 }); 
					
						
				}
				while(i<o.StandbySegments.length-1){
					if(o.StandbySegments[i-1].SegmentProduct !== undefined){
						if(o.productList.indexOf(o.StandbySegments[i-1].SegmentProduct.Name) < 0){
							if(o.productList.length < 1){
								o.productList += o.StandbySegments[i-1].SegmentProduct.Name
							}else{
								o.productList += ', ' + o.StandbySegments[i-1].SegmentProduct.Name
							}
							
						}
					}
					if(o.StandbySegments[i-1].AssignedVehicle !== undefined){
						if(o.assignedVehicleList.indexOf(o.StandbySegments[i-1].AssignedVehicle.VehicleNumber) < 0){
							if(o.assignedVehicleList.length < 1){
								o.assignedVehicleList += o.StandbySegments[i-1].AssignedVehicle.VehicleNumber
							}else{
								o.assignedVehicleList += ', ' + o.StandbySegments[i-1].AssignedVehicle.VehicleNumber
							}
							
						}
					}

				

					// geocoder.geocode({'address':o.StandbySegments[i].StandbyLocation.Address + ' ' + o.StandbySegments[i].StandbyLocation.City + ' ' +  o.StandbySegments[i].StandbyLocation.Zip}, function(results,status){
					// 	if(status == 'OK'){
							//var pos = {lat:results[0].geometry.location.lat(),lng:results[0].geometry.location.lng()}
							o.waypoints.push({ location : new google.maps.LatLng(o.StandbySegments[i].StandbyLocation.Lat, o.StandbySegments[i].StandbyLocation.Lon), stopover:true });
							
							wpProcessed++
							if(wpProcessed == wpCount){
								Dispatch.directionsService.route({ 
									origin: new google.maps.LatLng(o.StandbySegments[0].StandbyLocation.Lat,o.StandbySegments[0].StandbyLocation.Lon),
									destination: new google.maps.LatLng(o.StandbySegments[o.StandbySegments.length-1].StandbyLocation.Lat,o.StandbySegments[o.StandbySegments.length-1].StandbyLocation.Lon),
									waypoints: o.waypoints,
									optimizeWaypoints: true,	
									travelMode: google.maps.DirectionsTravelMode.DRIVING 
								  }, function(result) { 
									var directionsRenderer = new google.maps.DirectionsRenderer({
										//map: map,
										suppressPolylines: true,
										suppressMarkers: true,
									  }); 
									// var poly = new google.maps.Polyline({
									// 	strokeColor:'#555',
									// 	strokeOpacity:0.7,
									// 	strokeWeight: 5
									// })
									// directionsRenderer.setOptions({polylineOptions: poly}); 
									directionsRenderer.setMap(Dispatch.map); 
									directionsRenderer.setDirections(result);

									var bounds = new google.maps.LatLngBounds();
									var route = result.routes[0];
									var path = result.routes[0].overview_path;
									var legs = result.routes[0].legs;
									o.totalDistance = 0;
									o.totalDuration = 0;
									o.polyline = new google.maps.Polyline({
									//	map:Dispatch.map, 
										strokeColor:Config.routePolylineStyle.strokeColor,
										strokeOpacity:Config.routePolylineStyle.strokeOpacity,
										strokeWeight: Config.routePolylineStyle.strokeWeight,
										path:[]})
									for (i = 0; i < legs.length; i++) {
									  
									  o.totalDistance += legs[i].distance.value
									  o.totalDuration += legs[i].duration.value 
									//   if (i == 1) {
									// 	polyline.setOptions({strokeColor: "red"});
									// 	}
									  var steps = legs[i].steps;
									  for (j = 0; j < steps.length; j++) {
										var nextSegment = steps[j].path;
										for (k = 0; k < nextSegment.length; k++) {
										  o.polyline.getPath().push(nextSegment[k]);
										  bounds.extend(nextSegment[k]);
										}
									  }
									}
								
									o.polyline.setMap(Dispatch.map);
									Dispatch.map.fitBounds(bounds);

									o.friendlyTotalDuration = ((o.totalDuration / 60).toFixed(2)) + ' min'
									o.friendlyTotalDistance = ((o.totalDistance / 1609.34).toFixed(2)) + ' mi'


									o.dRenderer = directionsRenderer
						
									o.orderRendered = true;
									ordersArray.push(o);
									ordersProcessed++;
									if(ordersProcessed == data.results.length){
										Dispatch.Orders = ordersArray
										self.state.orders = ordersArray
										self.setState(self.state)
									} 
								  }); 
							}
						
					i++
				}

					// var length = o.StandbySegments.length - 1
					// marker = new google.maps.Marker({
					// 	position: new google.maps.LatLng(o.StandbySegments[length].StandbyLocation.Lat,o.StandbySegments[length].StandbyLocation.Lon),
					// 	map: Dispatch.map,
					// 	title: o.StandbySegments[1].StandbyLocation.Name,
					// 	icon: Config.waypointMapMarkerURL

					// })

					// marker['infowin'] = new google.maps.InfoWindow({
					// 	content: '<b>' + o.StandbySegments[length].StandbyLocation.Name + '</b>'
					// 	size: new google.maps.Size(150,50)
					// })

					// o.waypointMarkers.push(marker)




			})
			
			// self.state.orders = data.results
			// self.setState(self.state)
		});  
		// $.getJSON(self.url + 'orders')
		// .then(function(orders){
			
		// 	self.state.orders = JSON.parse(data)
		// 	self.setState(self.state)
		// });  

	  },
	componentDidUpdate: function(){
		localStorage['steepless:distanceUnit'] = this.state.distanceUnit;
		localStorage['steepless:heightUnit'] = this.state.heightUnit;
	},
	hashChange: function(){
		
	},
	getRoutes: function(){
		var self = this;
		var state = this.state;

	},
	getElevations: function(){
		var self = this;
		var routes = this.state.routes;

		var q = queue();

		routes.forEach(function(data, i){
			q.defer(function(done){
				var route = data.route;
				var path = route.overview_path;
				var distance = route.legs[0].distance.value;
				var samples = Math.round(distance/Steepless.longestDistance * (Steepless.chartWidth/Steepless.chartBarWidth));
				Steepless.elevationService.getElevationAlongPath({
					path: path,
					samples: samples
				}, function(result, status){
					if (status == google.maps.ElevationStatus.OK){
						done(null, {
							data: data,
							elevations: result
						});
					} else {
						done(status);
					}
				});
			});
		});


		q.awaitAll(function(error, results){
			if (error){
				console.log(error);
				return;
			}

			var highestElevation = 0, lowestElevation = Infinity;

			results.forEach(function(result, i){
				var elevations = result.elevations;
				var prevElevation = elevations[0].elevation;
				var rise = 0, drop = 0;

				elevations.forEach(function(r){
					var elevation = r.elevation;
					if (elevation > prevElevation) rise += elevation - prevElevation;
					if (elevation < prevElevation) drop += prevElevation - elevation;
					prevElevation = elevation;

					if (elevation > highestElevation) highestElevation = elevation;
					if (elevation < lowestElevation) lowestElevation = elevation;
				});

				result.data.stats = {
					rise: rise,
					drop: drop
				};
				result.data.elevations = elevations;
			});

			Steepless.highestElevation = highestElevation;
			Steepless.lowestElevation = lowestElevation;
			self.setState({
				routes: routes
			});
		});
	},
	
	handleOrderClick:function(index){
		this.state.orders.forEach(function(d, i){
			d.selected = (index == i);
		});
		// this.setState({
		// 	orders: this.state.orders
		// });
		this.setState(this.state);
		
		
	},
	handleDetailsClick:function(index){
		var self = this.state
		this.state.orders.forEach(function(d, i){
			if(index == i){
				self.currentOrder = d;
				self.editingOrder = true;
				Dispatch.currentDetailOrder = d
			}
		});
	
		this.setState(self);
	},
	handleCloseClick:function(){
		var self = this.state
		self.editingOrder = false;
		this.setState(self);
	},
	
	render: function(){
		var units = {
			distance: this.state.distanceUnit,
			height: this.state.heightUnit
		};
		var travelMode = this.state.travelMode;
		var listWrapperClass = 'orderListWrapper' + (this.state.editingOrder ? ' inactivePanel' : '')
		var orderDetailsWrapperClass = 'orderDetailsWrapper' + (!this.state.editingOrder ? ' inactivePanel' : '')
		var listHeaderWrapperClass = 'orderListHeaderWrapper' + (this.state.editingOrder ? ' inactivePanel' : '')
		var detailsHeaderWrapperClass = 'orderDetailsHeaderWrapper' + (!this.state.editingOrder ? ' inactivePanel' : '')
		return (
			React.createElement("div", null, 
				React.createElement(Map, null), 
				React.createElement("div", {id: "sidebar"}, 
					React.createElement("header", null, 
						React.createElement("h1", null, React.createElement('i',{className:'fa fa-truck'}), " Dispatch Map"),
						
						  
					),
					
					React.createElement("div", {className:listHeaderWrapperClass},
					React.createElement(OrderListHeaderForm, {start: this.state.start, end: this.state.end, units: units, travelMode: travelMode,
						 onUnitChange: this.handleUnitChange, onTravelModeChange: this.handleTravelModeChange})), 
					React.createElement("div", {className:detailsHeaderWrapperClass},
					React.createElement(OrderDetailsHeaderForm, {start: this.state.start, end: this.state.end, units: units, travelMode: travelMode,
							onCloseClick: this.handleCloseClick 
						})), 
					React.createElement("div", {className:listWrapperClass}, 
					React.createElement(OrderList, {data: this.state.orders, travelMode: travelMode, units: units, 
						onOrderClick: this.handleOrderClick, 
						onDetailsClick: this.handleDetailsClick})),
					React.createElement("div", {className:orderDetailsWrapperClass},
					React.createElement(OrderDetails,{data: this.state.currentOrder, travelMode: travelMode, units: units, 
						onOrderClick: this.handleOrderClick, 
						onDetailsClick: this.handleDetailsClick,
						
					}))
				)
			)
		);
	}
});

var Icon = React.createClass({displayName: "Icon",
	render: function(){
		var type = this.props.type;
		var title = this.props.title;
		return (
			React.createElement("svg", {title: title, className: "icon", dangerouslySetInnerHTML: {__html: '<use xlink:href="assets/fontawesome-webfont.svg#fa-' + type + '"></use>'}, width: this.props.width, height: this.props.height})
		);
	}
});

var Map = React.createClass({displayName: "Map",
	getDefaultProps: function(){
		return {
			map: {
				center: new google.maps.LatLng(33.7577, -88.4376),
				zoom: 12,
				disableDefaultUI: true
			}
		};
	},
	statics: {
		pinpointMarker: new google.maps.Marker({
			visible: false,
			clickable: false,
			zIndex: 1000
		}),
		showPinpointMarker: function(location){
			this.pinpointMarker.setPosition(location);
			this.pinpointMarker.setVisible(true);
		},
		hidePinpointMarker: function(){
			this.pinpointMarker.setVisible(false);
		}
	},
	componentDidMount: function(){
		var node = this.getDOMNode();
		var map = new google.maps.Map(node, this.props.map);
		Map.pinpointMarker.setMap(map);

		Dispatch.directionsRenderer.setMap(map);
		Dispatch.map = map;
	},

	render: function(){
		return (
			React.createElement("div", {id: "map-canvas"})
		);
	}
});

var Chart = React.createClass({displayName: "Chart",
	handleBarMouseEnter: function(index){
		this.props.onBarMouseEnter(index);
	},
	handleBarMouseLeave: function(){
		this.props.onBarMouseLeave();
	},
	render: function(){
		var self = this;
		var props = this.props;
		var chartStyle = {
			width: props.width,
			height: 0 // initially zero height
		};
		var bars = '';
		if (props.data){
			bars = props.data.map(function(d, i){
				var style = {
					borderBottomWidth: props.height * d.value / props.domain[1]
				};
				var key = i + '-' + d.value;
				return (
					React.createElement("div", {style: style, key: key, onMouseEnter: self.handleBarMouseEnter.bind(self, i), onMouseLeave: self.handleBarMouseLeave}, React.createElement("span", null, d.title))
				);
			});
			chartStyle.height = props.height; // then grow the height, CSS transition applied here
		}
		return (
			React.createElement("div", {className: "chart", style: chartStyle}, 
				bars
			)
		)
	}
});


React.renderComponent(
	React.createElement(App, null),
	document.getElementById('app')
);
