
var AddressEntryAccordion = React.createClass({displayName: "AddressEntryAccordion",
getInitialState: function(){

    
    return { address: this.props.address, open: false}
        
    
},
componentDidMount: function(){

    var routeArray = [];
   

    
},
handleClick: function(index){
   var self = this.state
   self.open = !self.open
   this.setState(self)
   
},
handleDetailsClick: function(index){
    Dispatch.currentDetailOrder = this.props.data
    this.props.onDetailsClick(index)
},
handleCloseClick: function(){
    this.props.onCloseClick()
},
render: function(){
    var self = this;
    var address = this.props.address;
    if(!address){
        address = {}
    }
    
    var contentClass = 'addressEntryContent' + (self.state.open ? ' addressEntryContentOpen ' : '')
    var contentTextClass = 'addressEntryContentText' + (self.state.open ? ' addressEntryContentTextOpen ' : '')
    
    return (
        // React.createElement("div", {className: 'shade',onClick: self.handleCloseClick}, ),
        React.createElement("div", {className: ''},
                React.createElement("div", {className: 'accordionTitle',onClick: self.handleClick},
                        React.createElement('span',{className:'accordionTitleText'}, 'Add New Address')
                ),
                React.createElement('div',{className: contentClass},
                    React.createElement('div',{className: contentTextClass},
                        React.createElement('span',{},'FOOOOOO')
                          
                    )
                )
                

        )

         
        
    );
}
});




// componentWillMount () {
//     let accordion = [];
    
//     this.props.data.forEach((i) => {
//       accordion.push({
//         title: i.title, 
//         content: i.content, 
//         open: false
//       });
//     });
    
//         this.setState({
//       accordionItems: accordion
//     });
//   },
  
//   click (i) {
//     const newAccordion = this.state.accordionItems.slice();
//     const index = newAccordion.indexOf(i)
    
//     newAccordion[index].open = !newAccordion[index].open;
//     this.setState({accordionItems: newAccordion});
//   },
  
//     render () {
//     const sections = this.state.accordionItems.map((i) => (
//       <div key={this.state.accordionItems.indexOf(i)}>
//         <div 
//           className="title" 
//           onClick={this.click.bind(null, i)}
//         >
//          <div className="arrow-wrapper">
//            <i className={i.open 
//              ? "fa fa-angle-down fa-rotate-180" 
//              : "fa fa-angle-down"}
//            ></i>
//          </div>
//          <span className="title-text">
//            {i.title}
//          </span>
//        </div>
//        <div className={i.open 
//          ? "content content-open" 
//          : "content"}
//         >
//           <div className={i.open 
//             ? "content-text content-text-open" 
//             : "content-text"}
//           > {i.content}
//           </div>
//         </div>
//       </div>
//     ));
    
//     return (
//       <div className="accordion">
//         {sections}
//       </div>
//     );
//    }
// });


