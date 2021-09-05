
const redis = require('redis'/*$path$*/);
const expiresIn = require('../Support/Helpers/expiresIn'/*$path$*/);

const settings = {
	instances: {},
	config: {}
};

module.exports = class Redis {
	
	
	/**
	@param {String} database
	*/
	constructor(database = 'default'){
		var φ3, φ5;
		
		
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
		
		for (let φ = 0, φ2 = Object.keys(connection), φ4 = φ2.length, key, value; φ < φ4; φ++){
			key = φ2[φ];value = connection[key];
			if (value == null || value == 'null') { (((φ3 = connection[key]),delete connection[key], φ3)) };
		};
		
		const db = connection.database;
		
		if (db !== undefined || db !== null) {
			
			(((φ5 = connection.database),delete connection.database, φ5));
			
			connection.db = db;
		};
		
		settings.instances[database] = redis.createClient(connection);
		
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
		var φ6;
		
		φ6 = [];
		for (let φ9 = settings.instances, φ7 = 0, φ8 = Object.keys(φ9), φ10 = φ8.length, database, instance; φ7 < φ10; φ7++){
			database = φ8[φ7];instance = φ9[database];
			φ6.push(instance.quit());
		};
		return φ6;
	}
};
