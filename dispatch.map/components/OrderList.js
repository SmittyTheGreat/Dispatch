var OrderList = React.createClass({displayName: "OrderList",
getInitialState: function(){
    return { data: this.props.data, ordersList: [], handleClick:function(index){} }
},
handleClick: function(index){
    this.props.onOrderClick(index);
},
handleDetailsClick: function(index){
    this.props.onDetailsClick(index)
},
componentWillReceiveProps(props){
    this.setState({ data: props.data, ordersList: [], handleClick:function(index){} })
},
render: function(){
    var self = this;
    var data = this.props.data;
    var ordersList = this.state.data.map(function(d, i){
        var key =  d.orderNumber;
        return (
            React.createElement("li", {className: d.selected ? 'selected' : '', onClick: self.handleClick.bind(self, i)}, 
                React.createElement(OrderCard,{key:d.orderNumber,data:d,
                    onClick: self.handleClick.bind(self, i),
                    onDetailsClick: self.handleDetailsClick.bind(self,i)})
            )
        )
              
    });
    this.props.ordersList = ordersList  
    return (
  
        React.createElement("div",null, ordersList )
      );
    }
});
