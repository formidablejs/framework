function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };
const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$handleExceptionφ = require('./Exceptions/Handler/handleException'/*$path$*/);
var _$resolveResponseφ = require('../Http/Kernel/resolveResponse'/*$path$*/);
var _$Bootstrapφ = requireDefault$__(require('./Bootstrap'/*$path$*/));
var _$Repositoryφ = requireDefault$__(require('../Config/Repository'/*$path$*/));
var _$Databaseφ = requireDefault$__(require('../Database/Database'/*$path$*/));
var _$Configφ = requireDefault$__(require('../Database/Config'/*$path$*/));
var _$Repositoryφ2 = requireDefault$__(require('../Environment/Repository'/*$path$*/));
var _$Handlerφ = requireDefault$__(require('./Exceptions/Handler'/*$path$*/));
var _$fsφ = requireDefault$__(require('fs'/*$path$*/));
var _$isEmptyφ = requireDefault$__(require('../Support/Helpers/isEmpty'/*$path$*/));
var _$Kernelφ = requireDefault$__(require('../Http/Kernel'/*$path$*/));
var _$Migrationφ = requireDefault$__(require('../Database/Migration'/*$path$*/));
var _$Routeφ = requireDefault$__(require('../Http/Router/Route'/*$path$*/));
var _$Seederφ = requireDefault$__(require('../Database/Seeder'/*$path$*/));

const settings = {
	config: null,
	environment: null,
	port: 3000,
	server: null,
	request: null,
	migration: null,
	seeder: null
};

class Application {
	[Ψ__init__]($$ = null){
		var vφ;
		this.bindings = ($$ && (vφ = $$.bindings) !== undefined) ? (vφ) : (new Object);
		this.config = $$ ? $$.config : undefined;
		this.hooks = ($$ && (vφ = $$.hooks) !== undefined) ? (vφ) : [];
		this.plugins = ($$ && (vφ = $$.plugins) !== undefined) ? (vφ) : [];
		this.root = ($$ && (vφ = $$.root) !== undefined) ? (vφ) : null;
		
	}
	/**
	@param {String} root
	*/
	constructor(root){
		var φ;
		this[Ψ__init__]();
		this.root = root;
		
		settings.environment = new _$Repositoryφ2.default(root);
		settings.migration = new _$Migrationφ.default;
		settings.seeder = new _$Seederφ.default;
		settings.port = ((φ = process.env.FORMIDABLE_PORT) != null) ? (φ) : 3000;
	}
	
	/**
	@param {String} notation
	@param {any} default
	*/
	static getConfig(notation,default$ = null){
		
		return settings.config.get(notation,default$);
	}
	
	/**
	@param {String} key
	@param {any} default
	*/
	static getEnv(key,default$ = null){
		
		return settings.environment.get(key,default$);
	}
	
	static env(){
		
		return settings.environment.get('app.env');
	}
	
	/**
	@param {Number} default
	*/
	port(default$ = 3000){
		var φ2;
		
		return ((φ2 = settings.port) != null) ? (φ2) : default$;
	}
	
	routes(){
		
		return _$Routeφ.default.all();
	}
	
	fastify(){
		
		return settings.server;
	}
	
	addHook(hook,handler){
		
		if (this.hooks[hook] == undefined || this.hooks[hook] == null) {
			
			this.hooks[hook] = new Array;
		};
		
		this.hooks[hook].push(handler);
		
		return this;
	}
	
	/**
	@param {Function} plugin
	@param {Object} options
	@param {Function} handler
	*/
	register(plugin,options = {},handler = null){
		
		this.plugins.push({
			plugin: plugin,
			options: options,
			handler: handler
		});
		
		return this;
	}
	
	/**
	@param {Function} handler
	*/
	onResponse(handler){
		
		_$resolveResponseφ.addResolver(handler);
		_$handleExceptionφ.addExceptionResolver(handler);
		
		return this;
	}
	
	migration(){
		
		return settings.migration;
	}
	
	seeder(){
		
		return settings.seeder;
	}
	
	/**
	@param {Function} abstract
	@param {array} params
	*/
	make(abstract,params = []){
		
		const key = Object.keys({[abstract]: null})[0];
		
		try {
			
			return new this.bindings[key.replace(/\t/g,'').split('\r\n')](...params);
		} catch (e) { };
	}
	
	/**
	@param {Function} abstract
	@param {Function} concrete
	*/
	bind(abstract,concrete){
		
		const key = Object.keys({[abstract]: null})[0];
		
		Object.assign(this.bindings,{
			[key.replace(/\t/g,'').split('\r\n')]: concrete
		});
		
		if (abstract.name == _$Repositoryφ.default.name) {
			
			settings.config = this.make(_$Repositoryφ.default);
		};
		
		return this;
	}
	
	/**
	@param {Boolean} distribute
	*/
	cache(distribute = false){
		
		_$Bootstrapφ.default.cache("./bootstrap/cache/config.json",this.make(_$Repositoryφ.default).all());
		
		if (distribute && _$fsφ.default.existsSync('./.formidable')) {
			
			return _$Bootstrapφ.default.cache("./.formidable/config.json",this.make(_$Repositoryφ.default).all());
		};
	}
	
	/**
	@param {Kernel} kernel
	@param {Boolean} returnMode
	*/
	async initiate(kernel,returnMode = false){
		
		const handler = this.make(_$Handlerφ.default,[this.config]);
		
		settings.server = await kernel.listen(
			this.config,
			handler,
			this.hooks,
			this.plugins,
			returnMode
		);
		
		return this;
	}
	
	prepare(){
		
		this.config = this.make(_$Repositoryφ.default);
		
		this.resolve();
		
		return this;
	}
	
	resolve(){
		var resφ, φ3;
		
		const resolvers = this.config.get('app.resolvers');
		
		if (resolvers && (resolvers instanceof Array)) {
			
			
			resφ = [];
			for (let iφ = 0, itemsφ = iter$__(resolvers), lenφ = itemsφ.length; iφ < lenφ; iφ++) {
				let resolver = itemsφ[iφ];
				resolver = ((φ3 = resolver.default) != null) ? (φ3) : resolver;
				
				this.bootResolver(resolver);
				resφ.push(this.registerResolver(resolver));
			};
			return resφ;
		};
	}
	
	bootResolver(resolver){
		
		return new resolver(this).boot();
	}
	
	registerResolver(resolver){
		
		return new resolver(this).register();
	}
};
exports.default = Application;
