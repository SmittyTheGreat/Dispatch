var StandbySegmentCardList = React.createClass({displayName: "StandbySegmentCardList",
getInitialState: function(){
    return { data: this.props.data, segmentList: [], handleClick:function(index){} }
},
handleClick: function(index){
    // this.state.data.forEach(function(d, i){
    //     d.selected = false;
    // });
    // this.setState({
    //     data: this.state.data
    // });
    this.props.onOrderClick(index);
},
handleDetailsClick: function(index){
    this.props.onDetailsClick(index)
},
componentWillReceiveProps(props){
    this.setState({ data: props.data, segmentList: [], handleClick:function(index){} })
},
render: function(){
    var self = this;
    var data = this.props.data;
    var segmentList = this.state.data.map(function(d, i){
        var key =  d.StandbySegmentId;
        return (
            React.createElement("li", {className: d.selected ? 'selected' : '', onClick: self.handleClick.bind(self, i)}, 
                React.createElement(StandbySegmentCard,{data:d})
                  //  onClick: self.handleClick.bind(self, i),
                   // onDetailsClick: self.handleDetailsClick.bind(self,i)})
            )
        )
              
    });
    this.props.segmentList = segmentList  
    return (
  
        React.createElement("div",null, segmentList )
      );
    }
});



var OrderListHeaderForm = React.createClass({displayName: "OrderListHeaderForm",

componentDidMount: function(){
    // var startNode = this.refs.start.getDOMNode();
    // var endNode = this.refs.end.getDOMNode();
    // var start = startNode.value.trim();
    // var end = endNode.value.trim();

    // if (start && end){
    //     if (this.props.start) startNode.value = this.props.start;
    //     if (this.props.end) endNode.value = this.props.end;
    // }

    // new google.maps.places.Autocomplete(startNode);
    // new google.maps.places.Autocomplete(endNode);
},
componentWillReceiveProps: function(){
    // if (this.props.travelMode) this.refs.travelMode.getDOMNode().value = this.props.travelMode;
    // if (this.props.start) this.refs.start.getDOMNode().value = this.props.start;
    // if (this.props.end) this.refs.end.getDOMNode().value = this.props.end;
},
handleTravelModeChange: function(){
    var travelMode = this.refs.travelMode.getDOMNode().value;
    this.updateLocationHash(travelMode);
},

handleDistanceChange: function(){
    var unit = this.refs.distanceSelect.getDOMNode().value;
    this.props.onUnitChange({
        distanceUnit: unit
    });
},
render: function(){
    var units = this.props.units;
    return (
        React.createElement("div", {className:'orderListHeaderButtonRow'}, 
            React.createElement("button", {className:'orderListHeaderCreatNew',
                onClick: this.handleCloseClick}, "New Order")
        )
    );
}
});

