function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('bookshelf'/*$path$*/));
var $2 = requireDefault$__(require('../Support/Helpers/config'/*$path$*/));
var $3 = requireDefault$__(require('../Support/Helpers/isEmpty'/*$path$*/));
var $4 = requireDefault$__(require('knex'/*$path$*/));

class Config {
	
	
	// Default connection name.
	// 
	/** @type {string}*/
	
	static get default(){
		
		return $2.default('database.default','mysql');
	}
	
	// All connections.
	// 
	/** @type {object}*/
	
	static get connections(){
		
		return $2.default('database.connections',[]);
	}
	
	// Selected client.
	// 
	/** @type {string}*/
	
	static get client(){
		var $5;
		
		return (($5 = this.connections[this.default]?.driver) != null) ? ($5) : 'mysql';
	}
	
	// Configure database connection.
	// 
	// @returns {void}
	
	static make(){
		
		try {
			
			const connectionName = $2.default('database.default');
			
			const selectedConnection = $2.default(("database.connections." + connectionName));
			
			const client = $2.default(("database.connections." + connectionName + ".driver"),"mysql");
			
			const connection = {
				client: client,
				connection: selectedConnection,
				migrations: $2.default('database.migrations',{
					tableName: 'migrations',
					directory: './database/migrations'
				}),
				seeds: $2.default('database.seeds',{
					directory: './database/seeds'
				})
			};
			
			const useNullAsDefault = $3.default($2.default('database.useNullAsDefault')) ? {} : {useNullAsDefault: $2.default('database.useNullAsDefault')};
			
			return Object.assign(connection,useNullAsDefault);
		} catch (e) { };
		
		return {};
	}
	
	static get bookshelf(){
		
		try {
			
			return $1.default($4.default(this.make()));
		} catch (e) { };
	}
};

exports.Config = Config;

exports.default = Config;
