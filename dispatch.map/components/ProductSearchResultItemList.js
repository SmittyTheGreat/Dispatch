
    
var ProductSearchResultItemList = React.createClass({displayName: "ProductSearchResultItemList",
getInitialState: function(){
    return {productList:this.props.productList}
},
componentDidMount: function(){
    
},
handleProductSelect:function(product){
    this.props.onProductSelect(product)
},

render: function(){
    var self = this;

        var productList = this.props.productList.map(function(d,i){
            var key = d.ProductId


            return (
                React.createElement("li", {className:'none'}, 
                    React.createElement(ProductSearchResultItem,{key:d.ProductId,product:d,
                        onProductSelect:self.handleProductSelect
                        // onClick: self.handleClick.bind(self, i),
                        // onDetailsClick: self.handleDetailsClick.bind(self,i)
                    })
                )
            )
        })
        this.props.productList = productList

        return (
  
            React.createElement("div",null,productList)
        );
    }
    
});




