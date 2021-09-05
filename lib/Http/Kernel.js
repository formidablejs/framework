function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };

const fastify = require('fastify'/*$path$*/);
const FormRequest = require('./Request/FormRequest'/*$path$*/);
const getResponse = require('./Kernel/getResponse'/*$path$*/);
const handleNotFound = require('./Kernel/handleNotFound'/*$path$*/);
const hasContentTypes = require('./Kernel/hasContentTypes'/*$path$*/);
const hasStaticContent = require('./Kernel/hasStaticContent'/*$path$*/);
const hasCookie = require('./Kernel/hasCookie'/*$path$*/);
const hasSession = require('./Kernel/hasSession'/*$path$*/);
const hasCors = require('./Kernel/hasCors'/*$path$*/);
const resolveResponse = require('./Kernel/resolveResponse'/*$path$*/);
const Route = require('./Router/Manager'/*$path$*/);
const UndefinedMiddlewareException = require('./Exceptions/UndefinedMiddlewareException'/*$path$*/);

module.exports = class Kernel {
	
	
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
	
	async listen(config,errorHandler,hooks,testMode){
		
		const router = fastify();
		
		hasStaticContent(router);
		hasContentTypes(router);
		hasCookie(router,config);
		hasSession(router,config);
		hasCors(router,config);
		
		for (let φ = 0, φ2 = Object.keys(hooks), φ6 = φ2.length, hook, registeredHooks; φ < φ6; φ++){
			hook = φ2[φ];registeredHooks = hooks[hook];
			for (let φ3 = 0, φ4 = iter$__(registeredHooks), φ5 = φ4.length; φ3 < φ5; φ3++) {
				let hookHandler = φ4[φ3];
				router.addHook(hook,hookHandler);
			};
		};
		
		await this.hasRoutes(router,config);
		
		router.setNotFoundHandler(function(request) {
			
			throw handleNotFound(request);
		});
		
		router.setErrorHandler(function(error,request,reply) {
			
			if (error.constructor.name == 'NotFoundError' && error.message == 'Not Found') {
				
				error = handleNotFound(request);
			};
			
			return errorHandler.handle(error,request,reply);
		});
		
		if ((typeof testMode=='boolean'||testMode instanceof Boolean) && testMode == true) { return router };
		
		const port = process.env.npm_package_config_port || 3000;
		
		return router.listen(port,function(error,address) {
			
			if (error) { throw error };
			
			return console.log(("\x1b[32mServer started on:\x1b[0m " + address));
		});
	}
	
	hasRoutes(router,config){
		var self = this, φ7;
		
		φ7 = [];
		for (let φ8 = 0, φ9 = iter$__(Route.all()), φ10 = φ9.length; φ8 < φ10; φ8++) {
			let route = φ9[φ8];
			φ7.push(router[route.method.toLowerCase()](route.path,async function(req,reply) {
				
				const request = await new FormRequest(req,route,reply,config);
				
				await self.resolveMiddleware(route,request,reply,config);
				
				const response = await getResponse(route,request,reply);
				
				return await resolveResponse(response,reply);
			}));
		};
		return φ7;
	}
	
	/**
	@param {Object} route
	*/
	async resolveMiddleware(route,request,reply,config){
		var φ11;
		
		φ11 = [];
		for (let φ12 = 0, φ13 = iter$__(this.getAllMiddleware(route)), φ14 = φ13.length; φ12 < φ14; φ12++) {
			let middleware = φ13[φ12];
			if (middleware == undefined || typeof middleware == 'string') {
				
				throw new UndefinedMiddlewareException(("Middleware " + middleware + " is undefined."));
			};
			
			const params = middleware._params;
			
			middleware = new middleware(config);
			
			φ11.push(await middleware.handle(request,reply,(params !== undefined) ? params : []));
		};
		return φ11;
	}
};
