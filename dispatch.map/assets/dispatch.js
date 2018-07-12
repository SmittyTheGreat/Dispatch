
Date.prototype.formatForCard = function(){
    return (this.getMonth() + 1) + 
    "/" +  this.getDate() + ' ' + this.getHours() + ':' + this.getMinutes()
}

Date.prototype.formatTimeForCard = function(){
    if(this.getMinutes() == '0'){
    	return  this.getHours() + ':00'
    }
    return  this.getHours() + ':' + this.getMinutes()
}
var getTravelSegmentMinutes = function(segment){
	var start = new Date(segment.ScheduledStart)
	var end = new Date(segment.ScheduledEnd)
	if(start.getHours() == end.getHours()){
		return (end.getMinutes() - start.getMinutes())
	}else{
		var totalMinutes = 0
		totalMinutes += end.getMinutes()
		totalMinutes += (60-start.getMinutes())
		return totalMinutes
	}
}
var Config ={
	 //url: 'http://dispatch.us-east-1.elasticbeanstalk.com/api/',
	url: 'http://localhost:63499/api/',
	googleMapsKey:'AIzaSyDy78KkjYwsF3L8za764FPJBhqqPZnVu2w',
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
			showingOrder: false,
			showingList: true,
			editingOrder: false,
			showingModal: false,
			orders:[]
		};
	},
	componentDidMount: function(){
	
		var self = this
		self.state.orders = []
		OrderService.searchOrders(null).then(function(data){
			OrderService.processOrders(data,function(ordersArray){
				Dispatch.Orders = ordersArray
				self.state.orders = ordersArray
				self.setState(self.state)
			})
			
		})
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
	
	handleOrderClick:function(index){
		this.state.orders.forEach(function(d, i){
			d.selected = (index == i);
		});
		this.setState(this.state);
		
		
	},
	handleDetailsClick:function(index){
		var self = this.state
		this.state.orders.forEach(function(d, i){
			if(index == i){
				self.currentOrder = d;
				self.showingOrder = true;
				self.showingList = false;
				self.editingOrder = false;
				Dispatch.currentDetailOrder = d
			}
		});
	
		this.setState(self);
	},
	handleCloseClick:function(){
		var self = this.state
		self.showingOrder = false;
		self.editingOrder = false;
		self.showingList = true;
		this.setState(self);
	},
	handleEditClick:function(){
		var self = this.state;
		self.showingOrder = false;
		self.showingList = false;
		self.editingOrder = true;
		this.setState(self);
	},
	handleAddPickupLocation:function(){
		var self = this.state;
		self.showingModal = true;
		this.setState(self);
	},
	handleModalClose:function(){
		var self = this.state;
		self.showingModal = false;
		this.setState(self);
	},
	render: function(){
		var units = {
			distance: this.state.distanceUnit,
			height: this.state.heightUnit
		};
		var travelMode = this.state.travelMode;
		var listWrapperHeaderClass = 'orderListWrapperContentHeader' + (this.state.showingList ? ' orderListWrapperContentHeaderOpen' : '')
		var listWrapperContentClass = 'orderListWrapperContent' + (this.state.showingList ? ' orderListWrapperContentOpen' : '')
		var orderDetailsWrapperHeaderClass = 'orderDetailsWrapperContentHeader' + (this.state.showingOrder ? ' orderDetailsWrapperContentOpen' : '')
		var orderDetailsWrapperContentClass = 'orderDetailsWrapperContent' + (this.state.showingOrder ? ' orderDetailsWrapperContentOpen' : '')
		var orderEditDetailsWrapperHeaderClass = 'orderEditDetailsWrapperContentHeader' + (this.state.editingOrder ? ' orderEditDetailsWrapperContentHeaderOpen' : '')
		var orderEditDetailsWrapperContentClass = 'orderEditDetailsWrapperContent' + (this.state.editingOrder ? ' orderEditDetailsWrapperContentOpen' : '')
		var listHeaderWrapperClass = 'orderListHeaderWrapper' + (this.state.showingOrder ? ' inactivePanel' : '')
		var detailsHeaderWrapperClass = 'orderDetailsHeaderWrapper' + (!this.state.showingOrder ? ' inactivePanel' : '')
		var modalClass = 'shade' + (!this.state.showingModal ? ' inactivePanel ' : '')


		return (
			React.createElement("div", null, 
				React.createElement(Map, null), 
				React.createElement("div", {id: "sidebar"}, 
					React.createElement("header", null, 
						React.createElement("h1", null, React.createElement('i',{className:'fa fa-truck'}), " Dispatch Map"),		  
					),
					
					React.createElement("div", {className:listHeaderWrapperClass},
					React.createElement(OrderListHeader, {start: this.state.start, end: this.state.end, units: units, travelMode: travelMode,
						 onUnitChange: this.handleUnitChange, onTravelModeChange: this.handleTravelModeChange})), 
					React.createElement("div", {className:detailsHeaderWrapperClass},
					React.createElement(OrderDetailsHeader, {start: this.state.start, end: this.state.end, units: units, travelMode: travelMode,
							onCloseClick: this.handleCloseClick,
							onEditClick: this.handleEditClick
						})), 
					React.createElement('div',{className:listWrapperHeaderClass},
						React.createElement("div", {className:listWrapperContentClass}, 
							React.createElement(OrderList, {data: this.state.orders, travelMode: travelMode, units: units, 
								onOrderClick: this.handleOrderClick, 
								onDetailsClick: this.handleDetailsClick
							})
						)
					),
					React.createElement("div", {className:orderDetailsWrapperHeaderClass},
						React.createElement("div",{className:orderDetailsWrapperContentClass},
							React.createElement(OrderDetails,{data: this.state.currentOrder, travelMode: travelMode, units: units, 
								onOrderClick: this.handleOrderClick, 
								onDetailsClick: this.handleDetailsClick
							})
						)
						
					),
					React.createElement("div", {className:orderEditDetailsWrapperHeaderClass},
						React.createElement('div', {className:orderEditDetailsWrapperContentClass},
							React.createElement(OrderEditDetails,{data: this.state.currentOrder, travelMode: travelMode, units: units, 
								onOrderClick: this.handleOrderClick, 
								onDetailsClick: this.handleDetailsClick,
								onAddPickupLocation: this.handleAddPickupLocation
							})
						)
						
					),


				),
				React.createElement('div',{className: modalClass, onClick:this.handleModalClose}, React.createElement(ModalWindow,{onCloseClick:this.handleModalClose}))
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
				disableDefaultUI: false
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
		var node = ReactDOM.findDOMNode(this)
		// var node = this.getDOMNode();
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


ReactDOM.render(
	React.createElement(App, null),
	document.getElementById('app')
);
