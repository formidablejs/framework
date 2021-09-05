
module.exports = class AcceptLanguage {
	
	
	get mappings(){
		
		return {};
	}
	
	handle(request){
		
		if (request.hasHeader('accept-language')) {
			
			let language = request.header('accept-language');
			
			language = (language == '*') ? null : language.split(';')[0].trim();
			
			if (language !== null || language !== undefined) {
				
				request.setLocale(this.getLanguage(request));
			};
		};
		
		return request;
	}
	
	getLanguage(request){
		
		const languageMaps = {};
		
		for (let φ3 = this.mappings, φ = 0, φ2 = Object.keys(φ3), φ4 = φ2.length, key, value; φ < φ4; φ++){
			key = φ2[φ];value = φ3[key];
			languageMaps[key.toLowerCase()] = value;
		};
		
		const language = languageMaps[request.header('accept-language')];
		
		if (language !== undefined) {
			
			return language;
		};
		
		return request.header('accept-language');
	}
};
