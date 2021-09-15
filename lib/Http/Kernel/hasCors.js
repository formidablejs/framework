function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$fastify_corsφ = requireDefault$__(require('fastify-cors'/*$path$*/));
var _$NotFoundExceptionφ = requireDefault$__(require('../../Http/Exceptions/NotFoundException'/*$path$*/));

/**
@param {String} origin
*/
function getOrigins(origin,config){
	
	const origins = [];
	const requestOrigin = origin.split('://')[1];
	
	for (let iφ = 0, itemsφ = iter$__(config.get('cors.allowed_origins')), lenφ = itemsφ.length; iφ < lenφ; iφ++) {
		let o = itemsφ[iφ];
		const incomingOrigin = requestOrigin.split('.');
		const allowedOrigin = o.includes('://') ? o.split('://')[1].split('.') : o.split('.');
		
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
	
	for (let iφ2 = 0, itemsφ2 = iter$__(config.get('cors.paths')), lenφ2 = itemsφ2.length; iφ2 < lenφ2; iφ2++) {
		let path = itemsφ2[iφ2];
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

function hasCors(fastify,config){
	
	return fastify.register(_$fastify_corsφ.default,function(instance) {
		
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
					throw new _$NotFoundExceptionφ.default(("Route " + (request.method) + ":" + (request.url) + " not found."));
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
exports.default = hasCors;
