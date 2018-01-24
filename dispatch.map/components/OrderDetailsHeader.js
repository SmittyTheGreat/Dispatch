var OrderDetailsHeader = React.createClass({displayName: "OrderDetailsHeader",

componentDidMount: function(){
   
},

handleCloseClick: function(){
    this.props.onCloseClick();

},
handleEditClick: function(){
    this.props.onEditClick();
},
render: function(){
   
    return (
        React.createElement("div", {className:'orderDetailsHeaderButtonRow'}, 
            React.createElement("button", {className:'orderDetailsHeaderClose',
                onClick: this.handleCloseClick}, "Close"),
            React.createElement("button", {className:'orderDetailsHeaderEdit',
                 onClick: this.handleEditClick}, "Edit")
        )
        
    );
}
});