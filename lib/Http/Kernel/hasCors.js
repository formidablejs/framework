function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };

const cors = require('fastify-cors'/*$path$*/);
const NotFoundException = require('../../Http/Exceptions/NotFoundException'/*$path$*/);

/**
@param {String} origin
*/
function getOrigins(origin,config){
	
	const origins = [];
	const requestOrigin = origin.split('://')[1];
	
	for (let φ = 0, φ2 = iter$__(config.get('cors.allowed_origins')), φ3 = φ2.length; φ < φ3; φ++) {
		let o = φ2[φ];
		const incomingOrigin = requestOrigin.split('.');
		const allowedOrigin = o.split('.');
		
		if (o === '*') {
			
			origins.push(origin);
		} else {
			
			if (allowedOrigin.length === incomingOrigin.length) {
				
				let index = 0;
				let build = [];
				
				while (index < incomingOrigin.length){
					
					const match = (allowedOrigin[index] == '*') ? incomingOrigin[index] : allowedOrigin[index];
					
					build.push(match);
					
					index++;
				};
				
				origins.push(build.join('.'));
			};
		};
	};
	
	return origins;
};

function isMatchingPath(request,config){
	
	const url = request.url.includes('?') ? request.url.split('?')[0] : request.url;
	
	for (let φ4 = 0, φ5 = iter$__(config.get('cors.paths')), φ6 = φ5.length; φ4 < φ6; φ4++) {
		let path = φ5[φ4];
		if (path.endsWith('/*')) {
			
			const pathWithoutWildcard = path.substring(0,path.length - 2);
			const currentPath = url;
			
			if (currentPath.startsWith(pathWithoutWildcard)) {
				
				path = pathWithoutWildcard + currentPath.substring(currentPath.indexOf(pathWithoutWildcard) + pathWithoutWildcard.length);
			};
		};
		
		if (url == path) {
			
			return true;
		};
	};
	
	return false;
};

module.exports = function hasCors(fastify,config){
	
	return fastify.register(cors,function(instance) {
		
		return function(request,callback) {
			
			const options = {
				origin: function(origin,cb) {
					
					if (origin == undefined || origin == null) {
						
						return cb(null,true);
					};
					
					const requestOrigin = origin.split('://')[1];
					
					if (getOrigins(origin,config).includes(requestOrigin) && isMatchingPath(request,config)) {
						
						cb(null,true);
						return;
					};
					
					// If the origin is not allowed, or the path is not allowed, return a 404
					throw new NotFoundException(("Route " + (request.method) + ":" + (request.url) + " not found."));
				},
				
				credentials: config.get('cors.supports_credentials'),
				maxAge: config.get('cors.max_age')
			};
			
			if (config.get('cors.allowed_methods') && config.get('cors.allowed_methods')[0] !== '*') {
				
				options.methods = config.get('cors.allowed_methods');
			};
			
			if (config.get('cors.allowed_headers') && config.get('cors.allowed_headers')[0] !== '*') {
				
				options.allowed_headers = config.get('cors.allowed_headers');
			};
			
			return callback(null,options);
		};
	});
};
