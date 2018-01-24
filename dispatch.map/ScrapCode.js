getElevations: function(){
		var self = this;
		var routes = this.state.routes;

		var q = queue();

		routes.forEach(function(data, i){
			q.defer(function(done){
				var route = data.route;
				var path = route.overview_path;
				var distance = route.legs[0].distance.value;
				var samples = Math.round(distance/Steepless.longestDistance * (Steepless.chartWidth/Steepless.chartBarWidth));
				Steepless.elevationService.getElevationAlongPath({
					path: path,
					samples: samples
				}, function(result, status){
					if (status == google.maps.ElevationStatus.OK){
						done(null, {
							data: data,
							elevations: result
						});
					} else {
						done(status);
					}
				});
			});
		});


		q.awaitAll(function(error, results){
			if (error){
				console.log(error);
				return;
			}

			var highestElevation = 0, lowestElevation = Infinity;

			results.forEach(function(result, i){
				var elevations = result.elevations;
				var prevElevation = elevations[0].elevation;
				var rise = 0, drop = 0;

				elevations.forEach(function(r){
					var elevation = r.elevation;
					if (elevation > prevElevation) rise += elevation - prevElevation;
					if (elevation < prevElevation) drop += prevElevation - elevation;
					prevElevation = elevation;

					if (elevation > highestElevation) highestElevation = elevation;
					if (elevation < lowestElevation) lowestElevation = elevation;
				});

				result.data.stats = {
					rise: rise,
					drop: drop
				};
				result.data.elevations = elevations;
			});

			Steepless.highestElevation = highestElevation;
			Steepless.lowestElevation = lowestElevation;
			self.setState({
				routes: routes
			});
		});
	},




	componentWillMount () {
    let accordion = [];
    
    this.props.data.forEach((i) => {
      accordion.push({
        title: i.title, 
        content: i.content, 
        open: false
      });
    });
    
        this.setState({
      accordionItems: accordion
    });
  },
  
  click (i) {
    const newAccordion = this.state.accordionItems.slice();
    const index = newAccordion.indexOf(i)
    
    newAccordion[index].open = !newAccordion[index].open;
    this.setState({accordionItems: newAccordion});
  },
  
    render () {
    const sections = this.state.accordionItems.map((i) => (
      <div key={this.state.accordionItems.indexOf(i)}>
        <div 
          className="title" 
          onClick={this.click.bind(null, i)}
        >
         <div className="arrow-wrapper">
           <i className={i.open 
             ? "fa fa-angle-down fa-rotate-180" 
             : "fa fa-angle-down"}
           ></i>
         </div>
         <span className="title-text">
           {i.title}
         </span>
       </div>
       <div className={i.open 
         ? "content content-open" 
         : "content"}
        >
          <div className={i.open 
            ? "content-text content-text-open" 
            : "content-text"}
          > {i.content}
          </div>
        </div>
      </div>
    ));
    
    return (
      <div className="accordion">
        {sections}
      </div>
    );
   }
});


