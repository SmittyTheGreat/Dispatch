
    
var LocationSearchResultItemList = React.createClass({displayName: "LocationSearchResultItemList",
getInitialState: function(){
    return {locationList:this.props.locationList}
},
componentDidMount: function(){
    
},
handleLocationSelect:function(data,location){
    this.props.onLocationSelect(data,location)
},

render: function(){
    var self = this;

        var locationList = this.props.locationList.map(function(d,i){
            var key = d.LocationId


            return (
                React.createElement("li", {className:'none'}, 
                    React.createElement(LocationSearchResultItem,{key:d.LocationId,location:d,
                        onLocationSelect:self.handleLocationSelect
                        // onClick: self.handleClick.bind(self, i),
                        // onDetailsClick: self.handleDetailsClick.bind(self,i)
                    })
                )
            )
        })
        this.props.locationList = locationList

        return (
  
            React.createElement("div",null,locationList)
        );
    }
    
});




