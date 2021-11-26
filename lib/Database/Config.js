function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$bookshelfφ = requireDefault$__(require('bookshelf'/*$path$*/));
var _$configφ = requireDefault$__(require('../Support/Helpers/config'/*$path$*/));
var _$isEmptyφ = requireDefault$__(require('../Support/Helpers/isEmpty'/*$path$*/));
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
		
		try {
			
			const connectionName = _$configφ.default('database.default');
			
			const selectedConnection = _$configφ.default(("database.connections." + connectionName));
			
			const client = _$configφ.default(("database.connections." + connectionName + ".driver"),"mysql");
			
			const connection = {
				client: client,
				connection: selectedConnection,
				migrations: _$configφ.default('database.migrations',{
					tableName: 'migrations',
					directory: './database/migrations'
				}),
				seeds: _$configφ.default('database.seeds',{
					directory: './database/seeds'
				})
			};
			
			const useNullAsDefault = _$isEmptyφ.default(_$configφ.default('database.useNullAsDefault')) ? {} : {useNullAsDefault: _$configφ.default('database.useNullAsDefault')};
			
			return Object.assign(connection,useNullAsDefault);
		} catch (e) { };
		
		return {};
	}
	
	static get bookshelf(){
		
		try {
			
			return _$bookshelfφ.default(_$knexφ.default(this.make()));
		} catch (e) { };
	}
};

exports.Config = Config;

exports.default = Config;
