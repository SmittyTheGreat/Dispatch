
    
var ProductSearchResultItem = React.createClass({displayName: "ProductSearchResultItem",
getInitialState: function(){
    return { product: this.props.product}
},
componentDidMount: function(){

},
handleProductSelect:function(){
    this.props.onProductSelect(this.state.product)
},

render: function(){
    
    var self = this;

    if(self.state.product === undefined){
        self.state.product = {Name:'No Results'}
    }

    return (
        React.createElement("div", {className: 'productSearchResultItemWrapper',onClick: self.handleProductSelect},
            React.createElement('span', {className:'productSearchResultsItemNameWrapper'},self.state.product.Name)
            
        )
    );
}
});




