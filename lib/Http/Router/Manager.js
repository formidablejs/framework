
const Path = require('./Path'/*$path$*/);

const routes = [];
const middleware = [];
const prefix = [];

module.exports = class Manager {
	
	
	/**
	@param {String} verb
	@param {String} pattern
	@param {Function|[Function, String]} action
	*/
	static addRoute(verb,pattern,action){
		
		if (!(['delete','get','options','patch','post','put'].includes(verb))) {
			
			throw new Error(("" + verb + " is not a valid HTTP verb."));
		};
		
		if (typeof pattern !== 'string' && pattern.trim() !== '') {
			
			throw new Error(("" + pattern + " is not a valid route pattern."));
		};
		
		routes.push({
			method: verb,
			path: Path.clean(prefix,pattern.trim()),
			middleware: middleware.flat(),
			action: action,
			name: null
		});
		
		return this;
	}
	
	
	/**
	@param {String} path
	@param {Function|[Function, String]} action
	*/
	static delete(path,action){
		
		this.addRoute('delete',path,action);
		
		return this;
	}
	
	/**
	@param {String} path
	@param {Function|[Function, String]} action
	*/
	static get(path,action){
		
		this.addRoute('get',path,action);
		
		return this;
	}
	
	/**
	@param {String} path
	@param {Function|[Function, String]} action
	*/
	static options(path,action){
		
		this.addRoute('options',path,action);
		
		return this;
	}
	
	/**
	@param {String} path
	@param {Function|[Function, String]} action
	*/
	static patch(path,action){
		
		this.addRoute('patch',path,action);
		
		return this;
	}
	
	/**
	@param {String} path
	@param {Function|[Function, String]} action
	*/
	static post(path,action){
		
		this.addRoute('post',path,action);
		
		return this;
	}
	
	/**
	@param {String} path
	@param {Function|[Function, String]} action
	*/
	static put(path,action){
		
		this.addRoute('put',path,action);
		
		return this;
	}
	
	/**
	@param {String} name
	*/
	static name(name){
		
		if (routes.length === 0) {
			
			return this;
		};
		
		const names = routes.map(function(route) {
			
			return route.name;
		});
		
		if (names.includes(name)) {
			
			throw new Error(("\"" + name + "\" is already in use by another route."));
		};
		
		routes.slice(-1).pop().name = name;
		
		return this;
	}
	
	/**
	@param {String|String[]} name
	*/
	static middleware(name){
		
		if (routes.length === 0) {
			
			return this;
		};
		
		if (!(Array.isArray(name))) {
			
			name = [name];
		};
		
		name.forEach(function(middleware) {
			
			return routes.slice(-1).pop().middleware.push(middleware);
		});
		
		return this;
	}
	
	/**
	@param {Function} callable
	*/
	static group(options = new Object,callable){
		
		if (!options || options && typeof options !== 'object') {
			
			throw new Error('Invalid route group.');
		};
		
		let groupPrefix = options.prefix ? options.prefix : '';
		let groupMiddleware = options.middleware ? options.middleware : [];
		
		// validate prefix
		if (typeof groupPrefix !== 'string' || groupPrefix.trim() === '/') {
			
			throw new Error('Invalid prefix.');
		};
		
		// validate middleware
		if (typeof groupMiddleware === 'undefined') {
			
			groupMiddleware = [];
		};
		
		if (!(Array.isArray(groupMiddleware))) {
			
			groupMiddleware = [groupMiddleware];
		};
		
		// append prefix
		let prefixIndex = 0;
		
		if (groupPrefix.trim() !== '') {
			
			prefix.push(groupPrefix.trim());
			
			prefixIndex = prefix.length - 1;
		};
		
		let middlewareIndex = [];
		
		// push middleware
		if (groupMiddleware.length > 0) {
			
			groupMiddleware.forEach(function(m) {
				
				middleware.push(m);
				
				return middlewareIndex.push(middleware.length - 1);
			});
		};
		
		// call callable
		(callable)();
		
		// remove appended prefix
		if (groupPrefix.trim() !== '') {
			
			prefix.splice(prefixIndex);
		};
		
		// remove pushed middleware
		if (middlewareIndex.length > 0) {
			
			return middlewareIndex.forEach(function(index) {
				
				return middleware.splice(index);
			});
		};
	}
	
	static all(){
		
		return routes;
	}
};
