function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };
const $19 = Symbol.for('#__init__'), $20 = Symbol.for('#__patch__'), $29 = Symbol.for('#__initor__'), $30 = Symbol.for('#__inited__'), $21 = Symbol.for('#__hooks__');
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
	[$20]($$ = {}){
		var $22;
		($22 = $$.bindings) !== undefined && (this.bindings = $22);
		($22 = $$.config) !== undefined && (this.config = $22);
		($22 = $$.hooks) !== undefined && (this.hooks = $22);
		($22 = $$.plugins) !== undefined && (this.plugins = $22);
		($22 = $$.root) !== undefined && (this.root = $22);
		($22 = $$.handler) !== undefined && (this.handler = $22);
		($22 = $$.context) !== undefined && (this.context = $22);
		
	}
	[$19]($$ = null){
		var $23;
		this.bindings = ($$ && ($23 = $$.bindings) !== undefined) ? ($23) : (new Object);
		this.config = $$ ? $$.config : undefined;
		this.hooks = ($$ && ($23 = $$.hooks) !== undefined) ? ($23) : [];
		this.plugins = ($$ && ($23 = $$.plugins) !== undefined) ? ($23) : [];
		this.root = ($$ && ($23 = $$.root) !== undefined) ? ($23) : null;
		this.handler = ($$ && ($23 = $$.handler) !== undefined) ? ($23) : null;
		this.context = ($$ && ($23 = $$.context) !== undefined) ? ($23) : $4.Context;
		
	}
	/**
	@param {String} root
	*/
	constructor(root){
		this[$19]();
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
		var $24, $27;
		
		const resolvers = this.config.get('app.resolvers');
		
		if (resolvers && (resolvers instanceof Array)) {
			
			
			$24 = [];
			for (let $25 = 0, $26 = iter$__(resolvers), $28 = $26.length; $25 < $28; $25++) {
				let resolver = $26[$25];
				resolver = (($27 = resolver.default) != null) ? ($27) : resolver;
				
				this.bootResolver(resolver);
				$24.push(this.registerResolver(resolver));
			};
			return $24;
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
