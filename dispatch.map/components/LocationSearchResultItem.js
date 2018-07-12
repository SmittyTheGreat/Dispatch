
    
var LocationSearchResultItem = React.createClass({displayName: "LocationSearchResultItem",
getInitialState: function(){
    return { location: this.props.location}
},
componentDidMount: function(){

},
handleLocationSelect:function(){
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
handleFoundLocation:function(data){
    var newLocation = this.state.location
 
    this.props.onLocationSelect(data,newLocation)
 //   this.setState({location:newLocation})
},
render: function(){
    
    var self = this;

    if(self.state.location === undefined){
        self.state.location = {Name:'No Results'}
    }

    return (
        React.createElement("div", {className: 'locationSearchResultItemWrapper',onClick: self.handleLocationSelect},
            React.createElement('span', {className:'locationSearchResultsItemNameWrapper'},self.state.location.Name)
            
        )
    );
}
});




