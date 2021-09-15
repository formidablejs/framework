Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
class AcceptLanguage {
	
	
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
		
		for (let oφ = this.mappings, iφ = 0, keysφ = Object.keys(oφ), lφ = keysφ.length, key, value; iφ < lφ; iφ++){
			key = keysφ[iφ];value = oφ[key];
			languageMaps[key.toLowerCase()] = value;
		};
		
		const language = languageMaps[request.header('accept-language')];
		
		if (language !== undefined) {
			
			return language;
		};
		
		return request.header('accept-language');
	}
};
exports.default = AcceptLanguage;
