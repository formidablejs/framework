
const {config: config} = require('@formidablejs/helpers'/*$path$*/);
const bookshelf = require('bookshelf'/*$path$*/);
const knex = require('knex'/*$path$*/);

module.exports = class Config {
	
	
	// Configure database connection.
	// 
	// @returns {void}
	
	static make(){
		var φ, φ2;
		
		try {
			
			const connectionName = config('database.default');
			
			const selectedConnection = config(("database.connections." + connectionName));
			
			const client = config(("database.connections." + connectionName + ".driver"),"mysql");
			
			return {
				client: client,
				connection: {
					host: ((φ = selectedConnection.host) != null) ? (φ) : '127.0.0.1',
					port: ((φ2 = selectedConnection.port) != null) ? (φ2) : '3306',
					user: selectedConnection.username,
					password: selectedConnection.password,
					database: selectedConnection.database,
					charset: selectedConnection.charset
				}
			};
		} catch (e) { };
	}
	
	static get bookshelf(){
		
		try {
			
			return bookshelf(knex(this.make()));
		} catch (e) { };
	}
};
