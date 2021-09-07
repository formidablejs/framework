
const {config: config} = require('@formidablejs/helpers'/*$path$*/);
const bookshelf = require('bookshelf'/*$path$*/);
const knex = require('knex'/*$path$*/);

module.exports = class Config {
	
	
	// Default connection name.
	// 
	/** @type {string}*/
	
	static get default(){
		
		return config('database.default','mysql');
	}
	
	// All connections.
	// 
	/** @type {object}*/
	
	static get connections(){
		
		return config('database.connections',[]);
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
			
			const connectionName = config('database.default');
			
			const selectedConnection = config(("database.connections." + connectionName));
			
			const client = config(("database.connections." + connectionName + ".driver"),"mysql");
			
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
			
			return bookshelf(knex(this.make()));
		} catch (e) { };
	}
};
