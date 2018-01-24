
var OrderListHeader = React.createClass({displayName: "OrderListHeader",
componentDidMount: function(){
 
},
componentWillReceiveProps: function(){
 
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

