function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : a; };
const {serve: imba_serve} = require('imba'/*$path$*/);
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('fs'/*$path$*/);
var $2 = require('path'/*$path$*/);
var $3 = require('../Foundation/Exceptions/Handler/handleException'/*$path$*/);
var $4 = requireDefault$__(require('fastify'/*$path$*/));
var $5 = requireDefault$__(require('./Request/FormRequest'/*$path$*/));
var $6 = requireDefault$__(require('./Kernel/getResponse'/*$path$*/));
var $7 = requireDefault$__(require('./Kernel/handleNotFound'/*$path$*/));
var $8 = requireDefault$__(require('./Kernel/hasContentTypes'/*$path$*/));
var $9 = requireDefault$__(require('./Router/Exceptions/InvalidRouteActionException'/*$path$*/));
var $10 = requireDefault$__(require('../Support/Helpers/isArray'/*$path$*/));
var $11 = requireDefault$__(require('../Support/Helpers/isClass'/*$path$*/));
var $12 = requireDefault$__(require('../Support/Helpers/isEmpty'/*$path$*/));
var $13 = requireDefault$__(require('../Support/Helpers/isFunction'/*$path$*/));
var $14 = requireDefault$__(require('../Foundation/Exceptions/MaintenanceModeException'/*$path$*/));
var $15 = requireDefault$__(require('./Kernel/resolveResponse'/*$path$*/));
var $16 = requireDefault$__(require('./Router/Route'/*$path$*/));
var $17 = requireDefault$__(require('./Exceptions/UndefinedMiddlewareException'/*$path$*/));
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
	
	async listen(config,errorHandler,interceptors,hooks,plugins,serverConfig,returnMode){
		var self = this, $27, $28;
		
		const router = $4.default(serverConfig);
		
		$8.default(router);
		
		router.addHook('onRoute',function(options) {
			
			return routes.invalid = routes.invalid.filter(function(route) { return route !== options.path; });
		});
		
		for await (let interceptor of iter$__(interceptors)){
			
			interceptor(router);
		};
		
		for (let $18 = 0, $19 = iter$__(plugins), $20 = $19.length; $18 < $20; $18++) {
			let plugin = $19[$18];
			router.register(plugin.plugin,plugin.options).after(function(error) {
				
				if (!($12.default(plugin.handler))) { return plugin.handler(error,router) };
			});
		};
		
		for (let $21 = 0, $22 = Object.keys(hooks), $26 = $22.length, hook, registeredHooks; $21 < $26; $21++){
			hook = $22[$21];registeredHooks = hooks[hook];
			for (let $23 = 0, $24 = iter$__(registeredHooks), $25 = $24.length; $23 < $25; $23++) {
				let hookHandler = $24[$23];
				if (hook !== 'onMaintenance') { router.addHook(hook,hookHandler) };
			};
		};
		
		await this.hasRoutes(router,config);
		
		router.setNotFoundHandler(function(req,reply) {
			
			const request = new $5.default(req,{},reply,config);
			
			throw $7.default(request);
		});
		
		router.setErrorHandler(function(error,req,reply) {
			
			const request = new $5.default(req,{},reply,config);
			
			if (error instanceof $14.default) {
				
				return $3.handleMaintenanceMode(error,request,reply,hooks);
			};
			
			if (error.constructor.name == 'NotFoundError' && error.message == 'Not Found') {
				
				error = $7.default(request);
			};
			
			return errorHandler.beforeHandle(error,request,reply);
		});
		
		const port = process.env.FORMIDABLE_PORT || 3000;
		const host = process.env.FORMIDABLE_HOST || '0.0.0.0';
		
		((($27 = process.env.FORMIDABLE_PORT),delete process.env.FORMIDABLE_PORT, $27));
		((($28 = process.env.FORMIDABLE_HOST),delete process.env.FORMIDABLE_HOST, $28));
		
		if ((typeof returnMode=='boolean'||returnMode instanceof Boolean) && returnMode == true) { return router };
		
		router.listen({
			port: Number(port),
			host: host
		},function(error,address) {
			
			if (routes.invalid.length > 0) {
				
				throw new $9.default(("Expected route action for " + (routes.invalid[0]) + " to be an array or a function."));
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
		var $29;
		
		const location = $2.join(process.cwd(),'storage','framework','address.json');
		
		const object = {
			current: address
		};
		
		$1.writeFileSync(location,JSON.stringify(object,null,2),{
			encoding: 'utf8'
		});
		
		return ((($29 = process.env.FORMIDABLE_ADDRESS_SET),delete process.env.FORMIDABLE_ADDRESS_SET, $29));
	}
	
	hasRoutes(router,config){
		var self = this, $30;
		
		$30 = [];
		for (let $31 = 0, $32 = iter$__($16.default.all()), $33 = $32.length; $31 < $33; $31++) {
			let route = $32[$31];
			$30.push(($10.default(route.action) || $13.default(route.action) || $11.default(route.action) || route.action.constructor.name === 'AsyncFunction') ? (
				
				router[route.method.toLowerCase()](route.path,async function(/**@type {FastifyRequest}*/req,/**@type {FastifyReply}*/reply) {
					
					const request = await new $5.default(req,route,reply,config);
					
					await self.resolveMiddleware(route,request,reply,config);
					
					const response = await $6.default(route,request,reply);
					
					return await $15.default(response,request,reply);
				})
			) : (
				
				routes.invalid.push(route.path)
			));
		};
		return $30;
	}
	
	/**
	@param {Object} route
	*/
	async resolveMiddleware(route,request,reply,config,_middleware = null){
		var $34;
		
		$34 = [];
		for (let $35 = 0, $36 = iter$__(this.getAllMiddleware(route,_middleware)), $37 = $36.length; $35 < $37; $35++) {
			let middleware = $36[$35];
			if (middleware == undefined || typeof middleware == 'string') {
				
				throw new $17.default(("Middleware " + middleware + " is undefined."));
			};
			
			const params = middleware._params;
			
			middleware = new middleware(config);
			
			$34.push(await middleware.handle(request,reply,(params !== undefined) ? params : []));
		};
		return $34;
	}
};
exports.default = Kernel;
