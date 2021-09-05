function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };
const Ψinit = Symbol.for('#init');

const Bootstrap = require('./Bootstrap'/*$path$*/);
const ConfigRepository = require('../Config/Repository'/*$path$*/);
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
		
		if (abstract.name == ConfigRepository.name) {
			
			settings.config = this.make(ConfigRepository);
			Bootstrap.cache('./bootstrap/cache/config.json',this.make(ConfigRepository).all());
		};
		
		return this;
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
		var φ2, φ5;
		
		const resolvers = this.config.get('app.resolvers');
		
		if (resolvers && (resolvers instanceof Array)) {
			
			
			φ2 = [];
			for (let φ3 = 0, φ4 = iter$__(resolvers), φ6 = φ4.length; φ3 < φ6; φ3++) {
				let resolver = φ4[φ3];
				resolver = ((φ5 = resolver.default) != null) ? (φ5) : resolver;
				
				this.boot(resolver);
				φ2.push(this.register(resolver));
			};
			return φ2;
		};
	}
	
	boot(resolver){
		
		return new resolver(this).boot();
	}
	
	register(resolver){
		
		return new resolver(this).register();
	}
};
