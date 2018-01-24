

var OrderService = {
	
	saveOrder: function(location){
			

	},
	searchOrders:function(filter){
		return $.ajax({
			type: 'POST',
			url: Config.url + 'order/SearchOrders',
			dataType: 'json',
			data: JSON.stringify({filter:{filter:{},skip:0,take:10}}),
			
		})
	},
	processOrders:function(data, callback){
		var ordersArray = [];
			var ordersProcessed = 0;
			$.each(data.results,function(index,o){
				var i=1
				o.waypoints = [];
				o.waypointMarkers = [];
				o.totalSegments = [];

				var totalIndex = 0
				while(totalIndex<((o.StandbySegments.length + o.TravelSegments.length)+2)){
					$.each(o.StandbySegments,function(i,s){
						if(s.OrderIndex == totalIndex){
							o.totalSegments.push(s)
						}
					})
					if(o.totalSegments[totalIndex] === undefined){
						$.each(o.TravelSegments,function(i,s){
							if(s.OrderIndex == totalIndex){
								o.totalSegments.push(s)
							}
						})
					}
					totalIndex++
				}

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
							callback(ordersArray)
							// self.state.orders = ordersArray
							// self.setState(self.state)
						} 
					 }); 						
				}
				while(i<o.StandbySegments.length-1){
					if(o.StandbySegments[i-1].SegmentProduct !== undefined && o.StandbySegments[i-1].SegmentProduct !== null){
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
								suppressPolylines: true,
								suppressMarkers: true,
							}); 
							directionsRenderer.setMap(Dispatch.map); 
							directionsRenderer.setDirections(result);
							var bounds = new google.maps.LatLngBounds();
							var route = result.routes[0];
							var path = result.routes[0].overview_path;
							var legs = result.routes[0].legs;
							o.totalDistance = 0;
							o.totalDuration = 0;
							o.polyline = new google.maps.Polyline({
								strokeColor:Config.routePolylineStyle.strokeColor,
								strokeOpacity:Config.routePolylineStyle.strokeOpacity,
								strokeWeight: Config.routePolylineStyle.strokeWeight,
								path:[]
							})
							for (i = 0; i < legs.length; i++) {
							    o.totalDistance += legs[i].distance.value
								o.totalDuration += legs[i].duration.value 
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
							o.totalDuration = ((o.totalDuration / 60).toFixed(2))
							o.friendlyTotalDistance = ((o.totalDistance / 1609.34).toFixed(2)) + ' mi'
							o.totalDuration = parseInt(o.totalDuration)
							$.each(o.TravelSegments,function(i,s){
								o.totalDuration += getTravelSegmentMinutes(s)
							})
							o.friendlyTotalDuration = o.totalDuration + ' min'
							o.dRenderer = directionsRenderer
							o.orderRendered = true;
							ordersArray.push(o);
							ordersProcessed++;
							if(ordersProcessed == data.results.length){
								Dispatch.Orders = ordersArray
								callback(ordersArray)
								// self.state.orders = ordersArray
								// self.setState(self.state)
							} 
						}); 
					}
						
					i++
				}

			})
	}


	
	
};
