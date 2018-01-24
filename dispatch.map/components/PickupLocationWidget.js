
    
var PickupLocationWidget = React.createClass({displayName: "PickupLocationWidget",
getInitialState: function(){
    return { location: this.props.location, openNewInput: false, openExistingInput:false, editing:false}
},
componentDidMount: function(){
    var routeArray = [];
},
handleClick: function(index){

},
handleDetailsClick: function(index){
    Dispatch.currentDetailOrder = this.props.data
    this.props.onDetailsClick(index)
},
handleCloseClick: function(){
    this.props.onCloseClick()
},
handleNewLocationClick: function(){
    var self = this.state
    self.openNewInput = true
    this.setState(self)
},
showExistingLocation: function(){

},
handlePickupLocationFound: function(data,location){
    this.props.onPickupLocationFound(data,location)
},
handleLocationSave:function(location,callback){
    location.IsPickup = 1
    LocationService.saveLocation(location,callback)
},
handleSetLocation:function(newLocation,callback){
    this.props.onSetLocation(newLocation)
    this.setState({location:newLocation,openNewInput:false})

   
},
render: function(){
    var self = this;

    var contentNewClass = 'addressEntryContent' + (self.state.openNewInput ? ' addressEntryContentOpen ' : '')
    var contentNewTextClass = 'addressEntryContentText' + (self.state.openNewInput ? ' addressEntryContentTextOpen ' : '')
    
    if(self.state.location === undefined){
        var newLocation = {}
        newLocation.Name = ''
        self.state.location = location
    }

    return (
        React.createElement("div", {className: 'pickupLocationWidgetWrapper'},
            React.createElement('div', {className:'orderEditPickupLocationRow'},
                React.createElement('input',{className: 'orderPickupLocationInput',type:'text', value:self.state.location.Name})
            ),
            React.createElement("div", {className: 'pickupLocationWidgetHeader'},
                React.createElement('label',{className:'none'},"Existing Pickup Location"),
                React.createElement('label',{className:'pickupLocationWidgetNewAddressLabel', onClick:this.handleNewLocationClick}, 'Add New Location')
            ),
            React.createElement("div", {className: 'pickupLocationWidgetAccordionRow'},      
                React.createElement('div',{className: contentNewClass},
                    React.createElement('div',{className: contentNewTextClass},
                        React.createElement(AddressEntryAccordion,{data:{},
                            onFoundLocation:this.handlePickupLocationFound,
                            onSaveLocation:this.handleLocationSave,
                            onSetLocation:this.handleSetLocation
                        })
                    )
                )
            )
        )
    );
}
});




