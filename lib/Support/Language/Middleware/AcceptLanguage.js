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
		
		for (let $3 = this.mappings, $1 = 0, $2 = Object.keys($3), $4 = $2.length, key, value; $1 < $4; $1++){
			key = $2[$1];value = $3[key];
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
