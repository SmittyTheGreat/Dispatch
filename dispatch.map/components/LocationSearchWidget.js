
    
var LocationSearchWidget = React.createClass({displayName: "LocationSearchWidget",
getInitialState: function(){
    return { searchTerm: '', locationList:[]}
},
componentDidMount: function(){
    
},
searchLocations: function(e){
    var self = this
    var newSearchTerm = e.target.value
    if(newSearchTerm.length > 2){
        // var filter = {}
        // filter.filter = {}
        // filter.filter.Name = newSearchTerm
        // filter.skip = 0
        // filter.take = 10
        // filter.orderBy = ' '
        // filter.isDescending = false


        var locationSearcher = {}
        locationSearcher.Name = newSearchTerm
        LocationService.searchLocations(locationSearcher,function(data){
            $.each(data,function(i,v){
                
            })
            self.setState({searchTerm:newSearchTerm,locationList:data})

        })
    }else{
        self.setState({searchTerm:newSearchTerm,locationList:[]})

    }


},
handleLocationSelect:function(data,location){
    this.props.onFoundLocation(data,location)
    this.setState({searchTerm:location.Name,locationList:[]})
},
render: function(){
    var self = this;

    var listWrapperClass = 'locationSearchWidgetResultListWrapper'

    if(self.state.searchTerm === undefined){
        self.state.searchTerm = ''
    }
    if(self.state.locationList.length > 0){
        listWrapperClass = listWrapperClass + ' locationSearchWidgetResultListWrapperOpen'
    }

    return (
        React.createElement("div", {className: 'locationSearchWidgetWrapper'},
            React.createElement('div', {className:'locationSearchWidgetInputRow'},
                React.createElement('input',{className: 'orderPickupLocationInput',
                    type:'text', 
                    value:self.state.searchTerm,
                    onChange:self.searchLocations
                }),
                React.createElement('ul',{className:listWrapperClass},
                    React.createElement(LocationSearchResultItemList,{locationList:self.state.locationList,
                        onLocationSelect:this.handleLocationSelect
                    })
                )
            ),
            
        )
    );
}
});




