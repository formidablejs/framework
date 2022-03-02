function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };
const {serve: imba_serve} = require('imba'/*$path$*/);
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$fs_extraφ = require('fs-extra'/*$path$*/);
var _$pathφ = require('path'/*$path$*/);
var _$handleExceptionφ = require('../Foundation/Exceptions/Handler/handleException'/*$path$*/);
var _$fastifyφ = requireDefault$__(require('fastify'/*$path$*/));
var _$FormRequestφ = requireDefault$__(require('./Request/FormRequest'/*$path$*/));
var _$getResponseφ = requireDefault$__(require('./Kernel/getResponse'/*$path$*/));
var _$handleNotFoundφ = requireDefault$__(require('./Kernel/handleNotFound'/*$path$*/));
var _$hasContentTypesφ = requireDefault$__(require('./Kernel/hasContentTypes'/*$path$*/));
var _$InvalidRouteActionExceptionφ = requireDefault$__(require('./Router/Exceptions/InvalidRouteActionException'/*$path$*/));
var _$isArrayφ = requireDefault$__(require('../Support/Helpers/isArray'/*$path$*/));
var _$isClassφ = requireDefault$__(require('../Support/Helpers/isClass'/*$path$*/));
var _$isEmptyφ = requireDefault$__(require('../Support/Helpers/isEmpty'/*$path$*/));
var _$isFunctionφ = requireDefault$__(require('../Support/Helpers/isFunction'/*$path$*/));
var _$MaintenanceModeExceptionφ = requireDefault$__(require('../Foundation/Exceptions/MaintenanceModeException'/*$path$*/));
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
	
	getAllMiddleware(route,_middleware = null){
		var self = this;
		
		// get default middleware list.
		let list = [...this.middleware];
		
		let params = [];
		
		// get route grouped middleware list.
		Object.values((_middleware ? _middleware : route.middleware) || []).forEach(function(middleware) {
			
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
		var self = this, φ, φ2;
		
		const router = _$fastifyφ.default({
			ignoreTrailingSlash: true
		});
		
		_$hasContentTypesφ.default(router);
		
		router.addHook('onRoute',function(options) {
			
			return routes.invalid = routes.invalid.filter(function(route) { return route !== options.path; });
		});
		
		for (let iφ = 0, itemsφ = iter$__(plugins), lenφ = itemsφ.length; iφ < lenφ; iφ++) {
			let plugin = itemsφ[iφ];
			router.register(plugin.plugin,plugin.options).after(function(error) {
				
				if (!(_$isEmptyφ.default(plugin.handler))) { return plugin.handler(error,router) };
			});
		};
		
		for (let iφ2 = 0, keysφ = Object.keys(hooks), lφ = keysφ.length, hook, registeredHooks; iφ2 < lφ; iφ2++){
			hook = keysφ[iφ2];registeredHooks = hooks[hook];
			for (let iφ3 = 0, itemsφ2 = iter$__(registeredHooks), lenφ2 = itemsφ2.length; iφ3 < lenφ2; iφ3++) {
				let hookHandler = itemsφ2[iφ3];
				if (hook !== 'onMaintenance') { router.addHook(hook,hookHandler) };
			};
		};
		
		await this.hasRoutes(router,config);
		
		router.setNotFoundHandler(function(req,reply) {
			
			const request = new _$FormRequestφ.default(req,{},reply,config);
			
			throw _$handleNotFoundφ.default(request);
		});
		
		router.setErrorHandler(function(error,req,reply) {
			
			const request = new _$FormRequestφ.default(req,{},reply,config);
			
			if (error instanceof _$MaintenanceModeExceptionφ.default) {
				
				return _$handleExceptionφ.handleMaintenanceMode(error,request,reply,hooks);
			};
			
			if (error.constructor.name == 'NotFoundError' && error.message == 'Not Found') {
				
				error = _$handleNotFoundφ.default(request);
			};
			
			return errorHandler.beforeHandle(error,request,reply);
		});
		
		const port = process.env.FORMIDABLE_PORT || 3000;
		const host = process.env.FORMIDABLE_HOST || '0.0.0.0';
		
		(((φ = process.env.FORMIDABLE_PORT),delete process.env.FORMIDABLE_PORT, φ));
		(((φ2 = process.env.FORMIDABLE_HOST),delete process.env.FORMIDABLE_HOST, φ2));
		
		if ((typeof returnMode=='boolean'||returnMode instanceof Boolean) && returnMode == true) { return router };
		
		router.listen(Number(port),host,function(error,address) {
			
			if (routes.invalid.length > 0) {
				
				throw new _$InvalidRouteActionExceptionφ.default(("Expected route action for " + (routes.invalid[0]) + " to be an array or a function."));
			};
			
			if (error) { throw error };
			
			if (process.env.FORMIDABLE_ADDRESS_SET === '1') { return self.storeAddress(address) };
		});
		
		return imba_serve(router.server);
	}
	
	/**
	@param {String} address
	*/
	storeAddress(address){
		var φ3;
		
		const location = _$pathφ.join(process.cwd(),'storage','framework','address.json');
		
		const object = {
			current: address
		};
		
		_$fs_extraφ.writeFileSync(location,JSON.stringify(object,null,2),{
			encoding: 'utf8'
		});
		
		return (((φ3 = process.env.FORMIDABLE_ADDRESS_SET),delete process.env.FORMIDABLE_ADDRESS_SET, φ3));
	}
	
	hasRoutes(router,config){
		var self = this, resφ;
		
		resφ = [];
		for (let iφ4 = 0, itemsφ3 = iter$__(_$Routeφ.default.all()), lenφ3 = itemsφ3.length; iφ4 < lenφ3; iφ4++) {
			let route = itemsφ3[iφ4];
			resφ.push((_$isArrayφ.default(route.action) || (_$isFunctionφ.default(route.action) && !(_$isClassφ.default(route.action))) || route.action.constructor.name === 'AsyncFunction') ? (
				
				router[route.method.toLowerCase()](route.path,async function(/**@type {FastifyRequest}*/req,/**@type {FastifyReply}*/reply) {
					
					const request = await new _$FormRequestφ.default(req,route,reply,config);
					
					await self.resolveMiddleware(route,request,reply,config);
					
					const response = await _$getResponseφ.default(route,request,reply);
					
					return await _$resolveResponseφ.default(response,request,reply);
				})
			) : (
				
				routes.invalid.push(route.path)
			));
		};
		return resφ;
	}
	
	/**
	@param {Object} route
	*/
	async resolveMiddleware(route,request,reply,config,_middleware = null){
		var resφ2;
		
		resφ2 = [];
		for (let iφ5 = 0, itemsφ4 = iter$__(this.getAllMiddleware(route,_middleware)), lenφ4 = itemsφ4.length; iφ5 < lenφ4; iφ5++) {
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
