function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('redis'/*$path$*/));

const settings = {instances: {},config: {}};

class RedisFactory {
	
	
	/**
	@param {String} database
	*/
	constructor(database = 'default'){
		var $4, $6;
		
		if (settings.instances[database]) { return settings.instances[database] };
		
		let connection = settings.config.get(("database.redis." + database));
		
		// merge redis options to redis connection.
		connection = {
			...connection,
			...settings.config.get('database.redis.options',{})
		};
		
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
		
		settings.instances[database] = $1.default.createClient(connection);
		
		settings.instances[database].on('error',function(error) { throw error; });
		
		// return redis connection.
		settings.instances[database];
	}
	
	/**
	@param {String} database
	*/
	static connection(database = 'default'){
		
		let instance = settings.instances[database];
		
		if (instance == undefined || instance == null) {
			
			new this(database);
			
			return settings.instances[database];
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
			$7.push(instance.quit());
		};
		return $7;
	}
};
exports.default = RedisFactory;
