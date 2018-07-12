
var ModalWindow = React.createClass({displayName: "ModalWindow",
getInitialState: function(){

    
    return { data: this.props.data}
        
    
},
componentDidMount: function(){

    var routeArray = [];
   

    
},
handleClick: function(index){
    // Steepless.directionsRenderer.setDirections(this.state.routes);

   
},
handleDetailsClick: function(index){
    Dispatch.currentDetailOrder = this.props.data
    this.props.onDetailsClick(index)
},
handleCloseClick: function(){
    this.props.onCloseClick()
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
        // React.createElement("div", {className: 'shade',onClick: self.handleCloseClick}, ),
        React.createElement("div", {className: 'modal',onClick: self.handleClick}, )

        
    );
}
});


