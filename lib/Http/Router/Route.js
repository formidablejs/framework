function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('./Path'/*$path$*/));
var $2 = requireDefault$__(require('../../Support/Helpers/isString'/*$path$*/));
var $3 = requireDefault$__(require('../Response/ViewResponse'/*$path$*/));
const routes = [];
const middleware = [];
const prefix = [];

class Route {
	
	
	/**
	@param {String} verb
	@param {String} pattern
	@param {Function|[Function, String]} action
	*/
	static addRoute(verb,pattern,action){
		
		if (!(['delete','get','options','patch','post','put'].includes(verb))) {
			
			throw new Error(("" + verb + " is not a valid HTTP verb."));
		};
		
		if (typeof pattern !== 'string' || ($2.default(pattern) && pattern.trim() == '')) {
			
			throw new Error('Invalid route path.');
		};
		
		routes.push({
			method: verb,
			path: $1.default.clean(prefix,pattern.trim()),
			middleware: middleware.flat(),
			action: action,
			name: null
		});
		
		return this;
	}
	
	/**
		 * Check if route exists.
		 */
	
	/**
	*
		 * Check if route exists.
		 
	@param {String} name
	*/
	static has(name){
		
		if (routes.length === 0) { return false };
		
		const names = routes.map(function(route) { return route.name; });
		
		return names.includes(name);
	}
	
	/**
		 * Add a get route that renders a view.
		 */
	
	/**
	*
		 * Add a get route that renders a view.
		 
	@param {String} path
	@param {View} view
	@param {Object} data
	@param {Number|null} statusCode
	*/
	static view(path,view,data = {},statusCode = null){
		
		return this.get(path,function() {
			
			return $3.default.make(view,data,(statusCode != null) ? statusCode : 200);
		});
	}
	
	/**
		 * Add a delete route.
		 */
	
	/**
	*
		 * Add a delete route.
		 
	@param {String} path
	@param {Function|[Function, String]} action
	*/
	static delete(path,action){
		
		return this.addRoute('delete',path,action);
	}
	
	/**
		 * Add a get route.
		 */
	
	/**
	*
		 * Add a get route.
		 
	@param {String} path
	@param {Function|[Function, String]} action
	*/
	static get(path,action){
		
		return this.addRoute('get',path,action);
	}
	
	/**
		 * Add a options route.
		 */
	
	/**
	*
		 * Add a options route.
		 
	@param {String} path
	@param {Function|[Function, String]} action
	*/
	static options(path,action){
		
		return this.addRoute('options',path,action);
	}
	
	/**
		 * Add a patch route.
		 */
	
	/**
	*
		 * Add a patch route.
		 
	@param {String} path
	@param {Function|[Function, String]} action
	*/
	static patch(path,action){
		
		return this.addRoute('patch',path,action);
	}
	
	/**
		 * Add a post route.
		 */
	
	/**
	*
		 * Add a post route.
		 
	@param {String} path
	@param {Function|[Function, String]} action
	*/
	static post(path,action){
		
		return this.addRoute('post',path,action);
	}
	
	/**
		 * Add a put route.
		 */
	
	/**
	*
		 * Add a put route.
		 
	@param {String} path
	@param {Function|[Function, String]} action
	*/
	static put(path,action){
		
		return this.addRoute('put',path,action);
	}
	
	/**
		 * Set route name.
		 */
	
	/**
	*
		 * Set route name.
		 
	@param {String} name
	*/
	static name(name){
		
		if (routes.length === 0) { return this };
		
		const names = routes.map(function(route) { return route.name; });
		
		if (names.includes(name)) {
			
			throw new Error(("\"" + name + "\" is already in use by another route."));
		};
		
		routes.slice(-1).pop().name = name;
		
		return this;
	}
	
	/**
		 * Add middleware to route.
		 */
	
	/**
	*
		 * Add middleware to route.
		 
	@param {String|String[]} name
	*/
	static middleware(name){
		
		if (routes.length === 0) { return this };
		
		if (!(Array.isArray(name))) { name = [name] };
		
		name.forEach(function(middleware) {
			
			return routes.slice(-1).pop().middleware.push(middleware);
		});
		
		return this;
	}
	
	/**
		 * Add grouped routes.
		 */
	
	/**
	*
		 * Add grouped routes.
		 
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
exports.default = Route;
