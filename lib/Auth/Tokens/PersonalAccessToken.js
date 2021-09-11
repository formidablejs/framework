
const {isArray: isArray,isClass: isClass,isNumber: isNumber,isString: isString} = require('@formidablejs/helpers'/*$path$*/);
const ConfigRepository = require('../../Config/Repository'/*$path$*/);
const Database = require('../../Database/Database'/*$path$*/);
const DatabaseConfig = require('../../Database/Config'/*$path$*/);
const jwt = require('jsonwebtoken'/*$path$*/);

const settings = {
	config: null,
	database: null,
	secret: null
};

module.exports = class PersonalAccessToken {
	
	
	/**
	@param {String} name
	@param {Number} id
	@param {String} table
	@param {Array} abilities
	*/
	static create(name,id,table,abilities = ['*']){
		
		if (!(isString(name))) { throw new TypeError('name must be a string.') };
		
		if (!(isNumber(id))) { throw new TypeError('id must be an int.') };
		
		if (!(isString(table))) { throw new TypeError('table must be a string.') };
		
		if (!(isArray(abilities))) { throw new TypeError('abilities must be an array.') };
		
		return this.getDatabase().table('personal_access_tokens').insert({
			tokenable_type: table,
			tokenable_id: id,
			name: name,
			abilities: JSON.stringify(abilities)
		},(DatabaseConfig.client == 'pg') ? ['id'] : null).then(async function([token]) {
			
			token = (typeof token === 'object' && token.hasOwnProperty('id')) ? token.id : token;
			
			return await jwt.sign({id: token},settings.secret,{
				issuer: settings.config.get('app.url')
			});
		});
	}
	
	/**
	@param {String} token
	*/
	static async find(token){
		
		if (!(isString(token))) { throw new TypeError('token must be a string.') };
		
		const response = {
			token: null,
			tokenable: null
		};
		
		const decodedToken = await this.verify(token);
		
		if (!decodedToken) { return response };
		
		token = await this.getDatabase().table('personal_access_tokens').where({id: decodedToken.id}).first();
		
		
		if (token === undefined) { return response };
		
		const tokenable = await this.getDatabase().table(token.tokenable_type).where({id: token.tokenable_id}).first();
		
		
		return {
			token: (token !== undefined) ? token : null,
			tokenable: (tokenable !== undefined) ? tokenable : null
		};
	}
	
	/**
	@param {String} token
	*/
	static async destroy(token){
		
		const decodedToken = await this.verify(token);
		
		return await this.getDatabase().table('personal_access_tokens').where({id: decodedToken.id}).del();
	}
	
	/**
	@param {String} token
	*/
	static async verify(token){
		
		if (!(isString(token))) { throw new TypeError('token must be a string.') };
		
		try {
			return await jwt.verify(token,settings.secret);
		} catch (e) { };
		
		return false;
	}
	
	static getDatabase(){
		
		return settings.database ? settings.database : Database;
	}
	
	/**
	@param {Database} database
	*/
	static setDatabase(database){
		
		if (!(isClass(database))) { throw new TypeError('database must be a valid class.') };
		
		settings.database = database;
		
		return this;
	}
	
	/**
	@param {Object} config
	*/
	static setConfig(config){
		
		if (!((config instanceof ConfigRepository))) {
			
			throw new TypeError('config must be an instance of ConfigRepository.');
		};
		
		settings.config = config;
		
		return this;
	}
	
	/**
	@param {String} secret
	*/
	static setSecret(secret){
		
		if (!(isString(secret))) { throw new TypeError('secret must be a string.') };
		
		settings.secret = secret;
		
		return this;
	}
};
