function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $13 = Symbol.for('#__initor__'), $14 = Symbol.for('#__inited__'), $2 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('redis'/*$path$*/));

const settings = {instances: {},config: {}};

class RedisFactory {
	
	
	/**
	@param {String} database
	*/
	constructor(database = 'default'){
		var $5, $7;
		
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
		for (let $3 = 0, $4 = Object.keys(connection), $6 = $4.length, key, value; $3 < $6; $3++){
			key = $4[$3];value = connection[key];
			if (value == null || value == 'null') { ((($5 = connection[key]),delete connection[key], $5)) };
		};
		
		const db = connection.database;
		
		if (db !== undefined || db !== null) {
			
			((($7 = connection.database),delete connection.database, $7));
			
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
		var $8;
		
		$8 = [];
		for (let $11 = settings.instances, $9 = 0, $10 = Object.keys($11), $12 = $10.length, database, instance; $9 < $12; $9++){
			database = $10[$9];instance = $11[database];
			$8.push(instance.quit());
		};
		return $8;
	}
};
exports.default = RedisFactory;
