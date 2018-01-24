
var AddressEntryAccordion = React.createClass({displayName: "AddressEntryAccordion",
getInitialState: function(){
    
    return { location: this.props.location, accOpen: false}
},
componentDidMount: function(){

    
},
handleClick: function(index){
   var self = this.state
   self.accOpen = !self.accOpen
   this.setState(self)
},
handleDetailsClick: function(index){
    Dispatch.currentDetailOrder = this.props.data
    this.props.onDetailsClick(index)
},
handleCloseClick: function(){
    this.props.onCloseClick()
},
handleFindLocationClick: function(){
    var fullAddress = (this.state.location.Address + ',' + this.state.location.City + ',' + this.state.location.State + ',' + this.state.location.Zip)
    var self = this
    $.ajax({
            type: 'GET',
            url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+ fullAddress+'&key='+Config.googleMapsKey,
            dataType: 'json'
            
        }).then(function(data){
            self.handleFoundLocation(data)
        })
},
handleLocationNameChange:function(e){
    var newLocation = this.state.location
    newLocation.Name = e.target.value
    this.setState({location: newLocation})
},
handleLocationAddressChange:function(e){
    var newLocation = this.state.location
    newLocation.Address = e.target.value
    this.setState({location: newLocation})
},
handleLocationCityChange:function(e){
    var newLocation = this.state.location
    newLocation.City = e.target.value
    this.setState({location: newLocation})
},
handleLocationStateChange:function(e){
    var newLocation = this.state.location
    newLocation.State = e.target.value
    this.setState({location: newLocation})
},
handleLocationZipChange:function(e){
    var newLocation = this.state.location
    newLocation.Zip = e.target.value
    this.setState({location: newLocation})
},
handleLocationLatChange:function(e){
    var newLocation = this.state.location
    newLocation.Lat = e.target.value
    this.setState({location:newLocation})
},
handleLocationLngChange:function(e){
    var newLocation = this.state.location
    newLocation.Lon = e.target.value
    this.setState({location:newLocation})
},
handleFoundLocation:function(data){
    var newLocation = this.state.location
    if(data.status == 'OK'){
        newLocation.Lat = data.results[0].geometry.location.lat
        newLocation.Lon = data.results[0].geometry.location.lng
    }
    this.props.onFoundLocation(data,newLocation)
    this.setState({location:newLocation})
},
handleSaveClick:function(){
    var self = this
    this.props.onSaveLocation(this.state.location,function(result){
        self.props.onSetLocation(result,function(){})
    })
},
validateLocationInputs:function(){

},
render: function(){
    var self = this;
    if(!this.state.location){
        this.state.location = {}
        this.state.location.Name = ''
        this.state.location.Address = ''
        this.state.location.City = ''
        this.state.location.State = ''
        this.state.location.Zip = ''
        this.state.location.Lat = ''
        this.state.location.Lon = ''
    }
    // var contentClass = 'addressEntryContent' + (self.state.accOpen ? ' addressEntryContentOpen ' : '')
    // var contentTextClass = 'addressEntryContentText' + (self.state.accOpen ? ' addressEntryContentTextOpen ' : '')
    return (
       React.createElement('div',{className: 'addressWrapper'},
                        React.createElement('div', {className:'orderEditProductRow'},
                            React.createElement('input',{className: 'orderProductInput',type:'text',
                                value:this.state.location.Name,
                                onChange:this.handleLocationNameChange
                        }),
                            React.createElement('button',{className:'addressFindButton',
                                onClick:this.handleFindLocationClick
                            },'Find')

                        ),
                        React.createElement('div', {className:'orderEditProductLabelRow'},
                            React.createElement('label',{className:'orderEditProductLabel',id:'address'}, 'Location Name')
                        ),
                        React.createElement('div', {className:'orderEditProductRow'},
                            React.createElement('input',{className: 'orderProductInput',type:'text',
                                value:this.state.location.Address,
                                onChange:this.handleLocationAddressChange
                            })
                        ),
                        React.createElement('div', {className:'orderEditProductLabelRow'},
                            React.createElement('label',{className:'orderEditProductLabel'}, 'Address')
                        ),
                        React.createElement('div', {className:'orderEditProductRow'},
                            React.createElement('input',{className: 'orderProductInput',type:'text',
                                value:this.state.location.City,
                                onChange:this.handleLocationCityChange
                            })
                        ),
                        React.createElement('div', {className:'orderEditProductLabelRow'},
                            React.createElement('label',{className:'orderEditProductLabel'}, 'City')
                        ),
                        React.createElement('div', {className:'orderEditProductRow'},
                            React.createElement('input',{className: 'pickupLocationWidgetStateInput',type:'text',
                                value:this.state.location.State,
                                onChange:this.handleLocationStateChange
                            }),
                            React.createElement('input',{className: 'pickupLocationWidgetZipInput',type:'text',
                                value:this.state.location.Zip,
                                onChange:this.handleLocationZipChange
                            })
                        ),
                        React.createElement('div', {className:'orderEditProductLabelRow'},
                            React.createElement('label',{className:'orderEditProductLabel'}, 'State'),
                            React.createElement('label',{className:'pickupLocationWidgetZipLabel'}, 'Zip')
                        ),
                        React.createElement('div', {className:'orderEditProductRow'},
                            React.createElement('input',{className: 'pickupLocationWidgetLatInput',type:'text',
                                value:this.state.location.Lat,
                                onChange:this.handleLocationLatChange
                            }),
                            React.createElement('input',{className: 'pickupLocationWidgetLngInput',type:'text',
                                value:this.state.location.Lon,
                                onChange:this.handleLocationLngChange
                            })
                        ),                   
                        React.createElement('div', {className:'orderEditProductLabelRow'},
                            React.createElement('label',{className:'orderEditProductLabel'}, 'Lattitude'),
                            React.createElement('label',{className:'pickupLocationWidgetZipLabel'}, 'Longitude')
                        ),
                        React.createElement('div', {className: 'addressEntryButtonRow'},
                            React.createElement('button',{className:'addressSaveButton',
                                onClick:this.handleSaveClick
                            },'Save')
                        )         
        )
    );
}
});

