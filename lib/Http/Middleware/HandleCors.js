function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };

const config = {cors: null};

module.exports = class HandleCors {
	
	
	handle(request,reply){
		
		if (!(this.shouldRun(request))) {
			
			return true;
		};
		
		return this.run(request,reply);
	}
	
	shouldRun(request){
		
		return this.isMatchingPath(request);
	}
	
	isMatchingPath(request){
		
		for (let φ = 0, φ2 = iter$__(config.cors.paths), φ3 = φ2.length; φ < φ3; φ++) {
			let path = φ2[φ];
			if (path.endsWith('/*')) {
				
				const pathWithoutWildcard = path.substring(0,path.length - 2);
				const currentPath = request.url();
				
				if (currentPath.startsWith(pathWithoutWildcard)) {
					
					path = pathWithoutWildcard + currentPath.substring(currentPath.indexOf(pathWithoutWildcard) + pathWithoutWildcard.length);
				};
			};
			
			if (request.isUrl(path) || request.isFullUrl(path)) {
				
				return true;
			};
		};
		
		return false;
	}
	
	run(request,reply){
		
		const origin = this.getOrigin(request);
		
		if (origin) {
			
			request.setHeaders({
				'Access-Control-Allow-Origin': origin,
				'Access-Control-Request-Method': config.cors.allowed_methods.join(', '),
				'Access-Control-Allow-Methods': config.cors.allowed_methods.join(', '),
				'Access-Control-Allow-Headers': config.cors.allowed_headers.join(', ')
			});
			
			if (config.cors.supports_credentials === true) {
				
				request.setHeader('Access-Control-Allow-Credentials',config.cors.supports_credentials);
			};
			
			if (config.cors.max_age > 0) {
				
				request.setHeader('Access-Control-Max-Age',config.cors.max_age);
			};
		};
		
		if (request.isMethod('options')) {
			
			return reply.send('');
		};
		
		return this;
	}
	
	getOrigin(request){
		
		const origins = [];
		
		for (let φ4 = 0, φ5 = iter$__(config.cors.allowed_origins), φ6 = φ5.length; φ4 < φ6; φ4++) {
			let origin = φ5[φ4];
			origins.push(this.getWildcardOrigin(origin,request));
		};
		
		if (origins.includes(request.getFullOrigin())) {
			
			return request.getFullOrigin();
		};
		
		return null;
	}
	
	/**
	@param {String} origin
	*/
	getWildcardOrigin(origin,request){
		
		if (origin === '*') {
			
			return request.getFullOrigin();
		};
		
		const ghostProtocol = request.getOriginProtocol();
		const currentOrigin = request.getOrigin().split('.');
		
		if (origin.split('.').length === currentOrigin.length) {
			
			let index = 0;
			let build = [];
			
			while (index < currentOrigin.length){
				
				const match = (origin.split('.')[index] === '*') ? currentOrigin[index] : origin.split('.')[index];
				
				build.push(match);
				
				index++;
			};
			
			return ghostProtocol + build.join('.');
		};
		
		return origin;
	}
	
	/**
	@param {Object} cors
	*/
	static configure(cors){
		
		if (config.cors) {
			
			throw new Error('Cors already configured.');
		};
		
		return config.cors = cors;
	}
};
