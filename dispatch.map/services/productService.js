

var ProductService = {
	
	saveProduct: function(product,callback){
			$.ajax({
			type: 'POST',
			url: Config.url + 'Product/SetProduct',
			dataType: 'json',
			data: product,
			
		}).then(function(data){
			callback(data)
		})

	}
	
	
};
