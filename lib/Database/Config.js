function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../Support/Helpers/config'/*$path$*/));
var $2 = requireDefault$__(require('../Support/Helpers/isEmpty'/*$path$*/));

class Config {
	
	
	// Default connection name.
	// 
	/** @type {string}*/
	
	static get default(){
		
		return $1.default('database.default','mysql');
	}
	
	// All connections.
	// 
	/** @type {object}*/
	
	static get connections(){
		
		return $1.default('database.connections',[]);
	}
	
	// Selected client.
	// 
	/** @type {string}*/
	
	static get client(){
		var $3;
		
		return (($3 = this.connections[this.default]?.driver) != null) ? ($3) : 'mysql';
	}
	
	// Configure database connection.
	// 
	// @returns {void}
	
	static make(){
		
		try {
			
			const connectionName = $1.default('database.default');
			
			const selectedConnection = $1.default(("database.connections." + connectionName));
			
			const client = $1.default(("database.connections." + connectionName + ".driver"),"mysql");
			
			const connection = {
				client: client,
				connection: selectedConnection,
				migrations: $1.default('database.migrations',{
					tableName: 'migrations',
					directory: './database/migrations'
				}),
				seeds: $1.default('database.seeds',{
					directory: './database/seeds'
				})
			};
			
			const useNullAsDefault = $2.default($1.default('database.useNullAsDefault')) ? {} : {useNullAsDefault: $1.default('database.useNullAsDefault')};
			
			return Object.assign(connection,useNullAsDefault);
		} catch (e) { };
		
		return {};
	}
};

exports.Config = Config;

exports.default = Config;
