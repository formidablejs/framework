Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
class TransformsRequest {
	
	
	get except(){
		
		return [];
	}
	
	handle(request){
		
		return this.clean(request);
	}
	
	clean(request){
		var self = this;
		
		if ((request.request.body && request.request.body.constructor === ({}).constructor)) {
			
			const results = Object.keys(request.request.body).map(function(key) {
				
				let value = request.request.body[key];
				
				if (self.except.includes(key) == false) {
					
					value = self.transform(key,request.input(key));
				};
				
				return {
					[key]: value
				};
			});
			
			let output = {};
			
			try {
				
				output = Object.assign(...results);
			} catch (e) { };
			
			return request.request.body = output;
		};
	}
	
	transform(key,value){
		
		return value;
	}
};
exports.default = TransformsRequest;
