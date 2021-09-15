function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$fastifyφ = requireDefault$__(require('fastify'/*$path$*/));
var _$FormRequestφ = requireDefault$__(require('./Request/FormRequest'/*$path$*/));
var _$getResponseφ = requireDefault$__(require('./Kernel/getResponse'/*$path$*/));
var _$handleNotFoundφ = requireDefault$__(require('./Kernel/handleNotFound'/*$path$*/));
var _$hasContentTypesφ = requireDefault$__(require('./Kernel/hasContentTypes'/*$path$*/));
var _$hasStaticContentφ = requireDefault$__(require('./Kernel/hasStaticContent'/*$path$*/));
var _$hasCookieφ = requireDefault$__(require('./Kernel/hasCookie'/*$path$*/));
var _$hasSessionφ = requireDefault$__(require('./Kernel/hasSession'/*$path$*/));
var _$hasCorsφ = requireDefault$__(require('./Kernel/hasCors'/*$path$*/));
var _$resolveResponseφ = requireDefault$__(require('./Kernel/resolveResponse'/*$path$*/));
var _$Managerφ = requireDefault$__(require('./Router/Manager'/*$path$*/));
var _$UndefinedMiddlewareExceptionφ = requireDefault$__(require('./Exceptions/UndefinedMiddlewareException'/*$path$*/));

class Kernel {
	
	
	get middleware(){
		
		return [];
	}
	
	get middlewareGroups(){
		
		return {};
	}
	
	get routeMiddleware(){
		
		return {};
	}
	
	getAllMiddleware(route){
		var self = this;
		
		// get default middleware list.
		let list = [...this.middleware];
		
		let params = [];
		
		// get route grouped middleware list.
		Object.values(route.middleware || []).forEach(function(middleware) {
			
			if (typeof middleware === 'string') {
				
				if (typeof middleware.split(':')[1] === 'string') { params = middleware.split(':')[1].split(',') };
				
				middleware = middleware.split(':')[0];
			};
			
			if (self.middlewareGroups[middleware]) {
				
				const groupedList = self.middlewareGroups[middleware];
				
				return Object.values(groupedList).forEach(function(match) {
					
					if (typeof match == 'string' && typeof match.split(':')[1] === 'string') {
						
						params = match.split(':')[1].split(',');
						match = match.split(':')[0];
					};
					
					const mappedMiddleware = (typeof match === 'string') ? ((self.routeMiddleware[match] != null) ? self.routeMiddleware[match] : match) : match;
					
					if (typeof mappedMiddleware === 'function') { mappedMiddleware._params = params };
					
					return list.push(mappedMiddleware);
				});
			} else {
				
				const namedMiddleware = self.routeMiddleware[middleware];
				
				if (typeof namedMiddleware === 'function') { namedMiddleware._params = params };
				
				return list.push((namedMiddleware != null) ? namedMiddleware : middleware);
			};
		});
		
		return list;
	}
	
	async listen(config,errorHandler,hooks,returnMode){
		var φ, φ2;
		
		const router = _$fastifyφ.default({
			ignoreTrailingSlash: true
		});
		
		_$hasStaticContentφ.default(router);
		_$hasContentTypesφ.default(router);
		_$hasCookieφ.default(router,config);
		_$hasSessionφ.default(router,config);
		_$hasCorsφ.default(router,config);
		
		for (let iφ = 0, keysφ = Object.keys(hooks), lφ = keysφ.length, hook, registeredHooks; iφ < lφ; iφ++){
			hook = keysφ[iφ];registeredHooks = hooks[hook];
			for (let iφ2 = 0, itemsφ = iter$__(registeredHooks), lenφ = itemsφ.length; iφ2 < lenφ; iφ2++) {
				let hookHandler = itemsφ[iφ2];
				router.addHook(hook,hookHandler);
			};
		};
		
		await this.hasRoutes(router,config);
		
		router.setNotFoundHandler(function(request) {
			
			throw _$handleNotFoundφ.default(request);
		});
		
		router.setErrorHandler(function(error,request,reply) {
			
			if (error.constructor.name == 'NotFoundError' && error.message == 'Not Found') {
				
				error = _$handleNotFoundφ.default(request);
			};
			
			return errorHandler.handle(error,request,reply);
		});
		
		const port = ((φ = process.env.FORMIDABLE_PORT) != null) ? (φ) : 3000;
		
		(((φ2 = process.env.FORMIDABLE_PORT),delete process.env.FORMIDABLE_PORT, φ2));
		
		if ((typeof returnMode=='boolean'||returnMode instanceof Boolean) && returnMode == true) { return router };
		
		return router.listen(Number(port),function(error,address) {
			
			if (error) { throw error };
			
			return console.log(("\x1b[32mServer started on:\x1b[0m " + address));
		});
	}
	
	hasRoutes(router,config){
		var self = this, resφ;
		
		resφ = [];
		for (let iφ3 = 0, itemsφ2 = iter$__(_$Managerφ.default.all()), lenφ2 = itemsφ2.length; iφ3 < lenφ2; iφ3++) {
			let route = itemsφ2[iφ3];
			resφ.push(router[route.method.toLowerCase()](route.path,async function(req,reply) {
				
				const request = await new _$FormRequestφ.default(req,route,reply,config);
				
				await self.resolveMiddleware(route,request,reply,config);
				
				const response = await _$getResponseφ.default(route,request,reply);
				
				return await _$resolveResponseφ.default(response,reply);
			}));
		};
		return resφ;
	}
	
	/**
	@param {Object} route
	*/
	async resolveMiddleware(route,request,reply,config){
		var resφ2;
		
		resφ2 = [];
		for (let iφ4 = 0, itemsφ3 = iter$__(this.getAllMiddleware(route)), lenφ3 = itemsφ3.length; iφ4 < lenφ3; iφ4++) {
			let middleware = itemsφ3[iφ4];
			if (middleware == undefined || typeof middleware == 'string') {
				
				throw new _$UndefinedMiddlewareExceptionφ.default(("Middleware " + middleware + " is undefined."));
			};
			
			const params = middleware._params;
			
			middleware = new middleware(config);
			
			resφ2.push(await middleware.handle(request,reply,(params !== undefined) ? params : []));
		};
		return resφ2;
	}
};
exports.default = Kernel;
