function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : a; };
const $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('./Exceptions/Handler/handleException'/*$path$*/);
var $2 = require('../Http/Kernel/resolveResponse'/*$path$*/);
var $3 = require('@formidablejs/console'/*$path$*/);
var $4 = require('./Context'/*$path$*/);
var $5 = requireDefault$__(require('../Support/Helpers/version'/*$path$*/));
var $6 = requireDefault$__(require('./Bootstrap'/*$path$*/));
var $7 = requireDefault$__(require('../Config/Repository'/*$path$*/));
var $8 = requireDefault$__(require('../Database/Database'/*$path$*/));
var $9 = requireDefault$__(require('../Database/Config'/*$path$*/));
var $10 = requireDefault$__(require('../Environment/Repository'/*$path$*/));
var $11 = requireDefault$__(require('./Exceptions/Handler'/*$path$*/));
var $12 = requireDefault$__(require('fs'/*$path$*/));
var $13 = requireDefault$__(require('../Support/Helpers/isEmpty'/*$path$*/));
var $14 = requireDefault$__(require('../Http/Kernel'/*$path$*/));
var $15 = requireDefault$__(require('../Database/Migration'/*$path$*/));
var $16 = requireDefault$__(require('../Http/Router/Route'/*$path$*/));
var $17 = requireDefault$__(require('../Database/Seeder'/*$path$*/));
var $18 = requireDefault$__(require('../Support/Helpers/version'/*$path$*/));
const settings = {
	config: null,
	console: null,
	environment: null,
	port: 3000,
	host: '0.0.0.0',
	server: null,
	request: null,
	migration: null,
	seeder: null,
	handler: null
};

class Application {
	[$__patch__$]($$ = {}){
		var $19;
		($19 = $$.bindings) !== undefined && (this.bindings = $19);
		($19 = $$.config) !== undefined && (this.config = $19);
		($19 = $$.hooks) !== undefined && (this.hooks = $19);
		($19 = $$.plugins) !== undefined && (this.plugins = $19);
		($19 = $$.root) !== undefined && (this.root = $19);
		($19 = $$.handler) !== undefined && (this.handler = $19);
		($19 = $$.context) !== undefined && (this.context = $19);
		($19 = $$.serverConfig) !== undefined && (this.serverConfig = $19);
		
	}
	[$__init__$]($$ = null,deep = true){
		var $20;
		this.bindings = ($$ && ($20 = $$.bindings) !== undefined) ? ($20) : (new Object);
		this.config = $$ ? $$.config : undefined;
		this.hooks = ($$ && ($20 = $$.hooks) !== undefined) ? ($20) : [];
		this.plugins = ($$ && ($20 = $$.plugins) !== undefined) ? ($20) : [];
		this.root = ($$ && ($20 = $$.root) !== undefined) ? ($20) : null;
		this.handler = ($$ && ($20 = $$.handler) !== undefined) ? ($20) : null;
		this.context = ($$ && ($20 = $$.context) !== undefined) ? ($20) : $4.Context;
		this.serverConfig = ($$ && ($20 = $$.serverConfig) !== undefined) ? ($20) : {
			ignoreTrailingSlash: true
		};
		
	}
	/**
	@param {String} root
	*/
	constructor(root){
		this[$__init__$]();
		this.root = root;
		
		settings.console = new $3.Application('Formidable Framework',$18.default());
		settings.environment = new $10.default(root);
		settings.migration = new $15.default;
		settings.seeder = new $17.default;
		settings.port = Number(process.env.FORMIDABLE_PORT) || 3000;
		settings.host = process.env.HOST || '0.0.0.0';
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
	
	static get version(){
		
		return $5.default();
	}
	
	get version(){
		
		return $5.default();
	}
	
	/**
	@param {Number} default
	*/
	port(default$ = 3000){
		
		return settings.port || default$;
	}
	
	host(default$ = '0.0.0.0'){
		
		return settings.host || default$;
	}
	
	routes(){
		
		return $16.default.all();
	}
	
	/**
	@param {Object} config
	*/
	server(config){
		
		this.serverConfig = config;
		
		return this;
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
	
	registerCommand(command){
		
		settings.console.register(command);
		
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
		
		$2.addResolver(handler);
		$1.addExceptionResolver(handler);
		
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
		
		if (abstract.name == $7.default.name) {
			
			settings.config = this.make($7.default);
		};
		
		return this;
	}
	
	/**
	@param {Boolean} distribute
	*/
	cache(distribute = false){
		
		$6.default.cache("./bootstrap/cache/config.json",this.make($7.default).all());
		
		if (distribute && $12.default.existsSync('./.formidable')) {
			
			return $6.default.cache("./.formidable/config.json",this.make($7.default).all());
		};
	}
	
	/**
	@param {Kernel} kernel
	@param {Boolean} returnMode
	*/
	async initiate(kernel,returnMode = false){
		
		settings.server = await kernel.listen(
			this.config,
			this.handler,
			this.hooks,
			this.plugins,
			this.serverConfig,
			returnMode
		);
		
		return this;
	}
	
	/**
	@param {ConsoleKernel} kernel
	*/
	craftsman(kernel){
		
		kernel.registerCommands(settings.console,this);
		
		return {
			run: function() {
				
				return settings.console.run();
			}
		};
	}
	
	prepare(){
		
		this.config = this.make($7.default);
		this.handler = this.make($11.default,[this.config]);
		
		this.resolve();
		
		return this;
	}
	
	resolve(){
		var $21, $24;
		
		const resolvers = this.config.get('app.resolvers');
		
		if (resolvers && (resolvers instanceof Array)) {
			
			
			$21 = [];
			for (let $22 = 0, $23 = iter$__(resolvers), $25 = $23.length; $22 < $25; $22++) {
				let resolver = $23[$22];
				resolver = (($24 = resolver.default) != null) ? ($24) : resolver;
				
				this.bootResolver(resolver);
				$21.push(this.registerResolver(resolver));
			};
			return $21;
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
