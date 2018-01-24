var StandbySegmentCardList = React.createClass({displayName: "StandbySegmentCardList",
getInitialState: function(){
    return { data: this.props.data, segmentList: [], handleClick:function(index){} }
},
handleClick: function(index){
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
            )
        )
    });
    this.props.segmentList = segmentList  
    return (
        React.createElement("div",null, segmentList )
      );
    }
});
