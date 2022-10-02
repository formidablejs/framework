const $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('redis'/*$path$*/);

const settings = {instances: {},config: {},running: []};

class Redis {
	
	/**
	@param {string} database
	*/
	constructor(database = 'default'){
		var $4, $6;
		
		
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
		
		for (let $2 = 0, $3 = Object.keys(connection), $5 = $3.length, key, value; $2 < $5; $2++){
			key = $3[$2];value = connection[key];
			if (value == null || value == 'null') { ((($4 = connection[key]),delete connection[key], $4)) };
		};
		
		const db = connection.database;
		
		if (db !== undefined || db !== null) {
			
			((($6 = connection.database),delete connection.database, $6));
			
			connection.db = db;
		};
		
		settings.instances[database] = $1.createClient(connection);
		
		settings.instances[database].on('error',function(error) { throw error; });
	}
	
	/**
	@param {string} database
	*/
	static async connection(database = 'default'){
		
		let instance = settings.instances[database];
		
		if (instance == undefined || instance == null) {
			
			new Redis(database,this.config);
			
			instance = settings.instances[database];
		};
		
		if (settings.running.indexOf(database) == -1) {
			
			await instance.connect();
			
			settings.running.push(database);
			
			settings.instances[database] = instance;
		};
		
		return instance;
	}
	
	static configure(config){
		
		return settings.config = config;
	}
	
	static closeAll(){
		var $7;
		
		$7 = [];
		for (let $10 = settings.instances, $8 = 0, $9 = Object.keys($10), $11 = $9.length, database, instance; $8 < $11; $8++){
			database = $9[$8];instance = $10[database];
			settings.running.splice(settings.running.indexOf(database),1);
			
			$7.push(instance.quit());
		};
		return $7;
	}
	
	/**
	@param {string} key
	@param {string} value
	@param {any} options
	*/
	static async set(key,value,options = null){
		
		const i = await this.connection();
		
		return await i.set(key,value,options);
	}
	
	/**
	@param {string} key
	*/
	static async get(key){
		
		const i = await this.connection();
		
		return await i.get(key);
	}
	
	/**
	@param {string} key
	*/
	static async del(key){
		
		const i = await this.connection();
		
		return await i.del(key);
	}
	
	/**
	@param {string} command
	@param {string} key
	@param {string|null} value
	@param {any} nx
	*/
	static async command(command,key,value = null,nx = null){
		
		const i = await this.connection();
		
		return await i.sendCommand(command,key,value,nx);
	}
};
exports.default = Redis;
