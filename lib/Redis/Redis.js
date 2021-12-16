function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$redisφ = requireDefault$__(require('redis'/*$path$*/));

const settings = {instances: {},config: {}};

class Redis {
	
	/**
	@param {String} database
	*/
	constructor(database = 'default'){
		var φ, φ2;
		
		
		if (settings.instances[database]) { return settings.instances[database] };
		
		let connection = settings.config.get(("database.redis." + database));
		
		// merge redis options to redis connection.
		
		connection = Object.assign(
			connection,
			settings.config.get('database.redis.options',{})
		);
		
		// prepend database name to connection prefix.
		
		if (connection.prefix) { connection.prefix += ("" + database + "_") };
		
		// remove null values.
		
		for (let iφ = 0, keysφ = Object.keys(connection), lφ = keysφ.length, key, value; iφ < lφ; iφ++){
			key = keysφ[iφ];value = connection[key];
			if (value == null || value == 'null') { (((φ = connection[key]),delete connection[key], φ)) };
		};
		
		const db = connection.database;
		
		if (db !== undefined || db !== null) {
			
			(((φ2 = connection.database),delete connection.database, φ2));
			
			connection.db = db;
		};
		
		settings.instances[database] = _$redisφ.default.createClient(connection);
		
		settings.instances[database].on('error',function(error) { throw error; });
		
		settings.instances[database];
	}
	
	/**
	@param {String} database
	*/
	static connection(database = 'default'){
		
		let instance = settings.instances[database];
		
		if (instance == undefined || instance == null) {
			
			new Redis(database);
			
			return settings.instances[database];
		};
		
		return instance;
	}
	
	static configure(config){
		
		return settings.config = config;
	}
	
	static closeAll(){
		var resφ;
		
		resφ = [];
		for (let oφ = settings.instances, iφ2 = 0, keysφ2 = Object.keys(oφ), lφ2 = keysφ2.length, database, instance; iφ2 < lφ2; iφ2++){
			database = keysφ2[iφ2];instance = oφ[database];
			resφ.push(instance.quit());
		};
		return resφ;
	}
	
	/**
	@param {String} key
	@param {String} value
	@param {any} options
	*/
	static set(key,value,options = null){
		
		return this.connection().set(key,value,options);
	}
	
	/**
	@param {String} key
	*/
	static get(key){
		
		return this.connection().get(key);
	}
	
	/**
	@param {String} key
	*/
	static del(key){
		
		return this.connection().del(key);
	}
	
	/**
	@param {String} command
	@param {String} key
	@param {String|null} value
	@param {any} nx
	*/
	static command(command,key,value = null,nx = null){
		
		return this.connection().sendCommand(command,key,value,nx);
	}
};
exports.default = Redis;
