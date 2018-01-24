var OrderEditDetails = React.createClass({displayName: "OrderEditDetails",
getInitialState: function(){

    
    return { data: this.props.data, routes:[], legDistance:0,legDistanceText:'',legDuration:0,legDurationText:''}
        
    
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
         
            
                React.createElement("div", {className: 'orderEditWrapper',onClick: self.handleClick}, 
                    
                    React.createElement('div', {className:'orderEditOrderNumberRow'},//React.createElement("i", {className:"fa fa-hashtag cardIcon"}), 
                       
                        React.createElement('input',{className: 'orderNumberInput',type:'text'})
                        
                    ),
                    React.createElement('div', {className:'orderOrderNumberLabelRow'},//React.createElement("i", {className:"fa fa-hashtag cardIcon"}), 
                        
                            React.createElement('label',{className:'orderEditOrderNumberLabel'}, "Order #"), 
                        
                    ),
                    React.createElement('div', {className:'orderEditPickupLocationRow'},
                         React.createElement('input',{className: 'orderPickupLocationInput',type:'text'}),
                         React.createElement(AddressEntryAccordion, {className:'none', address: {}})
                    ),
                    React.createElement('div', {className:'orderEditPickupLocationLabelRow'},
                        React.createElement('label',{className:'orderEditPickupLocationLabel'}, "Pickup Location")
                    ),
                    
                    React.createElement('div', {className:'orderEditProductRow'},
                        React.createElement('input',{className: 'orderProductInput',type:'text'})
                    ),
                    React.createElement('div', {className:'orderEditProductLabelRow'},
                        
                        React.createElement('label',{className:'orderEditProductLabel'}, 'Product')
                    ),
                    
                    React.createElement('div', {className:'orderEditDestinationRow'},
                        React.createElement('input',{className: 'orderDestinationInput',type:'text'})
                    ),
                    React.createElement('div', {className:'orderEditDestinationLabelRow'},
                        React.createElement('label',{className:'orderEditDestinationLabel'}, "Destination")
                    ),

                   


                )

                // ,
                //         React.createElement('div',{className:'orderCardDistanceDurationWrapper'},
                //             React.createElement('span',{className:'orderCardLegDistanceWrapper'},Dispatch.currentDetailOrder.friendlyTotalDistance),
                //             React.createElement('span',{className:'orderCardLegDurationWrapper'},Dispatch.currentDetailOrder.friendlyTotalDuration)
                //         )
                
        
        );
    }else{
        return(React.createElement('div'))
    }
}
});

