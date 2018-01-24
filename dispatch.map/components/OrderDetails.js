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
    this.props.onClick(index);
},
handleCloseClick: function(index){
    this.props.onCloseClick(index);
},
render: function(){
    var self = this;
    var data = this.props.data;    
    if(Dispatch.currentDetailOrder !== undefined){
        return (
                React.createElement("div", {className: 'orderCardWrapper',onClick: self.handleClick}, 
                    React.createElement('div', {className:'orderDetailsHeaderRow'},
                        React.createElement('span',{className:'orderCardOrderNumberWrapper'}, Dispatch.currentDetailOrder.OrderNumber),
                        React.createElement('div',{className:'orderCardDistanceDurationWrapper'},
                            React.createElement('span',{className:'orderCardLegDistanceWrapper'},Dispatch.currentDetailOrder.friendlyTotalDistance),
                            React.createElement('span',{className:'orderCardLegDurationWrapper'},Dispatch.currentDetailOrder.friendlyTotalDuration)
                        ),
                        React.createElement('div', {className:'orderCardProductLabelRow'},
                            React.createElement('label',{className:'orderCardProductLabel'}, "Product"), 
                            React.createElement('label',{className:'orderCardVendorLabel'}, 'Vendor')
                        ),
                        React.createElement('div', {className:'orderCardProductRow'},
                            React.createElement('span',{className:'orderCardProductWrapper'}, Dispatch.currentDetailOrder.productList), 
                            React.createElement('span',{className:'orderCardVendorWrapper'}, Dispatch.currentDetailOrder.OrderVendor.Name)
                        ),
                        React.createElement('div', {className:'orderCardLocationsLabelRow'},
                            React.createElement('label',{className:'orderCardAssignedVehicleLabel'}, "Assigned Vehicle"), 
                            React.createElement('label',{className:'orderCardDestinationLabel'}, '')
                        ),
                        React.createElement('div', {className:'orderCardLocationNamesRow'},
                            React.createElement('span',{className:'orderCardSourceNameWrapper'}, Dispatch.currentDetailOrder.assignedVehicleList), 
                        ),
                    ),
                    React.createElement('div',{className: 'standbySegmentListWrapper'},
                        React.createElement(SegmentCardList,{data: Dispatch.currentDetailOrder.totalSegments})                       
                    )
                    
                )    
            );
    }else{
        return(React.createElement('div'))
    }
}
});

