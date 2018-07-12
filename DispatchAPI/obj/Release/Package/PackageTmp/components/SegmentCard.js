var SegmentCard = React.createClass({displayName: "SegmentCard",
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
