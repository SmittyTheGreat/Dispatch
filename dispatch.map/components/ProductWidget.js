
    
var ProductWidget = React.createClass({displayName: "ProductWidget",
getInitialState: function(){
    return { pickupLocation: this.props.pickupLocation, product: this.props.existingProduct, openNewInput: false, openExistingInput:false, editing:false}
},
componentDidMount: function(){
    var routeArray = [];
},
handleClick: function(index){

},
handleDetailsClick: function(index){
    Dispatch.currentDetailOrder = this.props.data
    this.props.onDetailsClick(index)
},
handleCloseClick: function(){
    this.props.onCloseClick()
},
handleNewProductClick: function(){
    var self = this.state
    self.openNewInput = true
    this.setState(self)
},
handleSaveClick:function(){
    var self = this
    this.state.product.PickupLocationId = this.state.pickupLocation.LocationId
    ProductService.saveProduct(this.state.product,function(data){
        self.props.onSetProduct(data,function(result){

            self.setState({openNewInput:false,existingProduct:result})
            // self.props.onSetLocation(result)

        })
    })
},
handleProductNameChange:function(e){
    var newProduct = this.state.product
    newProduct.Name = e.target.value
    this.setState({product:newProduct})
},
render: function(){
    var self = this;

    var contentNewClass = 'productEntryContent' + (self.state.openNewInput ? ' productEntryContentOpen ' : '')
    var contentNewTextClass = 'productEntryContentText' + (self.state.openNewInput ? ' productEntryContentTextOpen ' : '')
    
    if(self.state.existingProduct === undefined){
        var newProduct = {}
        newProduct.Name = ''
        self.state.existingProduct = newProduct
    }
     if(self.state.product === undefined){
        var newProduct = {}
        newProduct.Name = ''
        self.state.product = newProduct
    }

    this.state.pickupLocation = this.props.pickupLocation

    return (
        React.createElement("div", {className: 'productWidgetWrapper'},
            React.createElement('div', {className:'productInputRow'},
                React.createElement('input',{className: 'existingProductNameInput',type:'text', value:self.state.existingProduct.Name})
            ),
            React.createElement("div", {className: 'productWidgetHeader'},
                React.createElement('label',{className:'none'},"Existing Product"),
                React.createElement('label',{className:'productWidgetNewProductLabel', 
                    onClick:this.handleNewProductClick
                }, 'Add New Product')
            ),
            React.createElement("div", {className: 'productWidgetAccordionRow'},      
                React.createElement('div',{className: contentNewClass},
                    React.createElement('div',{className: contentNewTextClass},
                        React.createElement('div', {className:'orderEditProductRow'},
                            React.createElement('input',{className: 'orderProductInput',type:'text',
                                onChange:this.handleProductNameChange}),
                            React.createElement('button',{className:'productSaveButton',
                                onClick:this.handleSaveClick
                            },'Save')
                        ),
                        React.createElement('div', {className:'orderEditProductLabelRow'},                        
                            React.createElement('label',{className:'orderEditProductLabel'}, 'Product Name')
                        )     
                    )
                )
            )
        )
    );
}
});




