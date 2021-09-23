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
var _$hasCookieφ = requireDefault$__(require('./Kernel/hasCookie'/*$path$*/));
var _$hasCorsφ = requireDefault$__(require('./Kernel/hasCors'/*$path$*/));
var _$hasSessionφ = requireDefault$__(require('./Kernel/hasSession'/*$path$*/));
var _$hasStaticContentφ = requireDefault$__(require('./Kernel/hasStaticContent'/*$path$*/));
var _$InvalidRouteActionExceptionφ = requireDefault$__(require('./Router/Exceptions/InvalidRouteActionException'/*$path$*/));
var _$isArrayφ = requireDefault$__(require('../Support/Helpers/isArray'/*$path$*/));
var _$isClassφ = requireDefault$__(require('../Support/Helpers/isClass'/*$path$*/));
var _$isEmptyφ = requireDefault$__(require('../Support/Helpers/isEmpty'/*$path$*/));
var _$isFunctionφ = requireDefault$__(require('../Support/Helpers/isFunction'/*$path$*/));
var _$resolveResponseφ = requireDefault$__(require('./Kernel/resolveResponse'/*$path$*/));
var _$Routeφ = requireDefault$__(require('./Router/Route'/*$path$*/));
var _$UndefinedMiddlewareExceptionφ = requireDefault$__(require('./Exceptions/UndefinedMiddlewareException'/*$path$*/));

const routes = {
	invalid: []
};

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
	
	async listen(config,errorHandler,hooks,plugins,returnMode){
		var φ, φ2;
		
		const router = _$fastifyφ.default({
			ignoreTrailingSlash: true
		});
		
		_$hasStaticContentφ.default(router);
		_$hasContentTypesφ.default(router);
		_$hasCookieφ.default(router,config);
		_$hasSessionφ.default(router,config);
		_$hasCorsφ.default(router,config);
		
		router.addHook('onRoute',function(options) {
			
			return routes.invalid = routes.invalid.filter(function(route) { return route !== options.path; });
		});
		
		for (let iφ = 0, itemsφ = iter$__(plugins), lenφ = itemsφ.length; iφ < lenφ; iφ++) {
			let plugin = itemsφ[iφ];
			router.register(plugin.plugin,plugin.options).after(function() {
				
				if (!(_$isEmptyφ.default(plugin.handler))) { return plugin.handler(router) };
			});
		};
		
		for (let iφ2 = 0, keysφ = Object.keys(hooks), lφ = keysφ.length, hook, registeredHooks; iφ2 < lφ; iφ2++){
			hook = keysφ[iφ2];registeredHooks = hooks[hook];
			for (let iφ3 = 0, itemsφ2 = iter$__(registeredHooks), lenφ2 = itemsφ2.length; iφ3 < lenφ2; iφ3++) {
				let hookHandler = itemsφ2[iφ3];
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
			
			if (routes.invalid.length > 0) {
				
				throw new _$InvalidRouteActionExceptionφ.default(("Expected route action for " + (routes.invalid[0]) + " to be an array or a function."));
			};
			
			if (error) { throw error };
			
			return console.log(("\x1b[32mServer started on:\x1b[0m " + address));
		});
	}
	
	hasRoutes(router,config){
		var self = this, resφ;
		
		resφ = [];
		for (let iφ4 = 0, itemsφ3 = iter$__(_$Routeφ.default.all()), lenφ3 = itemsφ3.length; iφ4 < lenφ3; iφ4++) {
			let route = itemsφ3[iφ4];
			resφ.push((_$isArrayφ.default(route.action) || (_$isFunctionφ.default(route.action) && !(_$isClassφ.default(route.action)))) ? (
				
				router[route.method.toLowerCase()](route.path,async function(req,reply) {
					
					const request = await new _$FormRequestφ.default(req,route,reply,config);
					
					await self.resolveMiddleware(route,request,reply,config);
					
					const response = await _$getResponseφ.default(route,request,reply);
					
					return await _$resolveResponseφ.default(response,reply);
				})
			) : 
				routes.invalid.push(route.path)
			);
		};
		return resφ;
	}
	
	/**
	@param {Object} route
	*/
	async resolveMiddleware(route,request,reply,config){
		var resφ2;
		
		resφ2 = [];
		for (let iφ5 = 0, itemsφ4 = iter$__(this.getAllMiddleware(route)), lenφ4 = itemsφ4.length; iφ5 < lenφ4; iφ5++) {
			let middleware = itemsφ4[iφ5];
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
