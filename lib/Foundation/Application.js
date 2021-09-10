function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };
const Ψinit = Symbol.for('#init');

const Bootstrap = require('./Bootstrap'/*$path$*/);
const ConfigRepository = require('../Config/Repository'/*$path$*/);
const Database = require('../Database/Config'/*$path$*/);
const dotenv = require('dotenv'/*$path$*/);
const ExceptionHandler = require('./Exceptions/Handler'/*$path$*/);
const Kernel = require('../Http/Kernel'/*$path$*/);
const Route = require('../Http/Router/Manager'/*$path$*/);

const settings = {
	server: null,
	config: null
};

module.exports = class Application {
	[Ψinit]($$ = null){
		var φ;
		this.bindings = ($$ && (φ = $$.bindings) !== undefined) ? (φ) : (new Object);
		this.root = ($$ && (φ = $$.root) !== undefined) ? (φ) : null;
		this.config = $$ ? $$.config : undefined;
		this.hooks = ($$ && (φ = $$.hooks) !== undefined) ? (φ) : (new Object);
		
	}
	/**
	@param {String} root
	*/
	constructor(root){
		this[Ψinit]();
		dotenv.config();
		
		this.root = root;
	}
	
	routes(){
		
		return Route.all();
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
		
		return this;
	}
	
	cache(){
		var φ2;
		
		settings.config = this.make(ConfigRepository);
		Bootstrap.cache('./bootstrap/cache/config.json',this.make(ConfigRepository).all());
		
		// create a database.json config file.
		
		const dbConfig = Database.make().connection;
		
		dbConfig.driver = Database.client;
		
		if (dbConfig.driver == 'sqlite3' && dbConfig.database) {
			
			dbConfig.filename = dbConfig.database;
			
			(((φ2 = dbConfig.database),delete dbConfig.database, φ2));
		};
		
		return Bootstrap.cache('./bootstrap/cache/database.json',{
			'default': dbConfig
		});
	}
	
	/**
	@param {Kernel} kernel
	@param {Boolean} testMode
	*/
	async initiate(kernel,testMode = false){
		
		const handler = this.make(ExceptionHandler,[this.config]);
		
		settings.server = await kernel.listen(
			this.config,
			handler,
			this.hooks,
			testMode
		);
		
		return this;
	}
	
	prepare(){
		
		this.config = this.make(ConfigRepository);
		
		this.resolve();
		
		return this;
	}
	
	resolve(){
		var φ3, φ6;
		
		const resolvers = this.config.get('app.resolvers');
		
		if (resolvers && (resolvers instanceof Array)) {
			
			
			φ3 = [];
			for (let φ4 = 0, φ5 = iter$__(resolvers), φ7 = φ5.length; φ4 < φ7; φ4++) {
				let resolver = φ5[φ4];
				resolver = ((φ6 = resolver.default) != null) ? (φ6) : resolver;
				
				this.boot(resolver);
				φ3.push(this.register(resolver));
			};
			return φ3;
		};
	}
	
	boot(resolver){
		
		return new resolver(this).boot();
	}
	
	register(resolver){
		
		return new resolver(this).register();
	}
};
