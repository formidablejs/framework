function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };
const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$Bootstrapφ = requireDefault$__(require('./Bootstrap'/*$path$*/));
var _$Repositoryφ = requireDefault$__(require('../Config/Repository'/*$path$*/));
var _$Configφ = requireDefault$__(require('../Database/Config'/*$path$*/));
var _$Handlerφ = requireDefault$__(require('./Exceptions/Handler'/*$path$*/));
var _$Kernelφ = requireDefault$__(require('../Http/Kernel'/*$path$*/));
var _$Managerφ = requireDefault$__(require('../Http/Router/Manager'/*$path$*/));
var _$Repositoryφ2 = requireDefault$__(require('../Environment/Repository'/*$path$*/));

const settings = {
	config: null,
	environment: null,
	port: 3000,
	server: null,
	request: null
};

class Application {
	[Ψ__init__]($$ = null){
		var vφ;
		this.bindings = ($$ && (vφ = $$.bindings) !== undefined) ? (vφ) : (new Object);
		this.config = $$ ? $$.config : undefined;
		this.hooks = ($$ && (vφ = $$.hooks) !== undefined) ? (vφ) : (new Object);
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
		settings.port = ((φ = process.env.FORMIDABLE_PORT) != null) ? (φ) : 3000;
	}
	
	/**
	@param {String} notation
	@param {any} default
	*/
	static getConfig(notation,default$ = null){
		
		return this.config.get(notation,default$);
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
		
		return _$Managerφ.default.all();
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
		var φ3;
		
		settings.config = this.make(_$Repositoryφ.default);
		
		_$Bootstrapφ.default.cache("./bootstrap/cache/config.json",this.make(_$Repositoryφ.default).all());
		
		const dbConfig = _$Configφ.default.make().connection;
		
		dbConfig.driver = _$Configφ.default.client;
		
		if (dbConfig.driver == 'sqlite3' && dbConfig.database) {
			
			dbConfig.filename = dbConfig.database;
			
			(((φ3 = dbConfig.database),delete dbConfig.database, φ3));
		};
		
		return _$Bootstrapφ.default.cache("./bootstrap/cache/database.json",{
			'default': dbConfig
		});
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
		var resφ, φ4;
		
		const resolvers = this.config.get('app.resolvers');
		
		if (resolvers && (resolvers instanceof Array)) {
			
			
			resφ = [];
			for (let iφ = 0, itemsφ = iter$__(resolvers), lenφ = itemsφ.length; iφ < lenφ; iφ++) {
				let resolver = itemsφ[iφ];
				resolver = ((φ4 = resolver.default) != null) ? (φ4) : resolver;
				
				this.boot(resolver);
				resφ.push(this.register(resolver));
			};
			return resφ;
		};
	}
	
	boot(resolver){
		
		return new resolver(this).boot();
	}
	
	register(resolver){
		
		return new resolver(this).register();
	}
};
exports.default = Application;
