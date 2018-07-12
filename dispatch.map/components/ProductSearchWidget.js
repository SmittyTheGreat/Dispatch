
    
var ProductSearchWidget = React.createClass({displayName: "ProductSearchWidget",
getInitialState: function(){
    return { searchTerm: '', productList:[],currentProductId:this.props.currentProductId}
},
componentDidMount: function(){
    
},
searchProducts: function(e){
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


        var productSearcher = {}
        productSearcher.Name = newSearchTerm
        ProductService.searchProducts(productSearcher,function(data){
            $.each(data,function(i,v){
                
            })
            self.setState({searchTerm:newSearchTerm,productList:data})

        })
    }else{
        self.setState({searchTerm:newSearchTerm,productList:[]})

    }


},
handleProductSelect:function(product){
    this.props.onFoundProduct(product)
    this.setState({searchTerm:product.Name,productList:[]})
},
render: function(){
    var self = this;

    var listWrapperClass = 'locationSearchWidgetResultListWrapper'

    if(self.state.searchTerm === undefined){
        self.state.searchTerm = ''
    }
    if(self.state.productList.length > 0){
        listWrapperClass = listWrapperClass + ' locationSearchWidgetResultListWrapperOpen'
    }

    return (
        React.createElement("div", {className: 'locationSearchWidgetWrapper'},
            React.createElement('div', {className:'locationSearchWidgetInputRow'},
                React.createElement('input',{className: 'orderExistingProductInput',
                    type:'text', 
                    value:self.state.searchTerm,
                    onChange:self.searchProducts
                }),
                React.createElement('ul',{className:listWrapperClass},
                    React.createElement(ProductSearchResultItemList,{productList:self.state.productList,
                        onProductSelect:this.handleProductSelect
                    })
                )
            ),
            
        )
    );
}
});




