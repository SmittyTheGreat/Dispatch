

var LocationService = {
	
	saveLocation: function(location,callback){
		$.ajax({
			type: 'POST',
			url: Config.url + 'Location/SetLocation',
			dataType: 'json',
			data: location,
			
		}).then(function(data){
			callback(data)
		})

	},
	searchLocations: function(filter,callback){
		$.ajax({
			type: 'POST',
			url: Config.url + 'Location/SearchLocations',
			dataType: 'json',
			data: filter,
			
		}).then(function(data){
			callback(data.results)
		})
	}
	
	
};
