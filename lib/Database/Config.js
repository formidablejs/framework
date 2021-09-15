function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$configφ = requireDefault$__(require('../Support/Helpers/config'/*$path$*/));
var _$bookshelfφ = requireDefault$__(require('bookshelf'/*$path$*/));
var _$knexφ = requireDefault$__(require('knex'/*$path$*/));

class Config {
	
	
	// Default connection name.
	// 
	/** @type {string}*/
	
	static get default(){
		
		return _$configφ.default('database.default','mysql');
	}
	
	// All connections.
	// 
	/** @type {object}*/
	
	static get connections(){
		
		return _$configφ.default('database.connections',[]);
	}
	
	// Selected client.
	// 
	/** @type {string}*/
	
	static get client(){
		var φ;
		
		return ((φ = this.connections[this.default]?.driver) != null) ? (φ) : 'mysql';
	}
	
	// Configure database connection.
	// 
	// @returns {void}
	
	static make(){
		var φ2, φ3, φ4;
		
		try {
			
			const connectionName = _$configφ.default('database.default');
			
			const selectedConnection = _$configφ.default(("database.connections." + connectionName));
			
			const client = _$configφ.default(("database.connections." + connectionName + ".driver"),"mysql");
			
			const connection = {
				client: client,
				connection: {
					host: ((φ2 = selectedConnection.host) != null) ? (φ2) : '127.0.0.1',
					port: ((φ3 = selectedConnection.port) != null) ? (φ3) : '3306',
					user: selectedConnection.username,
					password: selectedConnection.password,
					database: selectedConnection.database,
					charset: selectedConnection.charset
				}
			};
			
			if (connection.client == 'sqlite3' && connection.connection.database) {
				
				connection.connection.filename = connection.connection.database;
				
				(((φ4 = connection.connection.database),delete connection.connection.database, φ4));
			};
			
			return connection;
		} catch (e) { };
		
		return {};
	}
	
	static get bookshelf(){
		
		try {
			
			return _$bookshelfφ.default(_$knexφ.default(this.make()));
		} catch (e) { };
	}
};
exports.default = Config;
