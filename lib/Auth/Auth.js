
const Hash = require('../Hashing/Hash'/*$path$*/);
const ValidationException = require('../Validator/Exceptions/ValidationException'/*$path$*/);
const Database = require('../Database/Database'/*$path$*/);

const config = {
	provider: null,
	auth: null
};

class Auth {
	
	
	/**
	@param {Object} user
	@param {String} abilities
	*/
	constructor(user = null,abilities = null){
		
		this.abilities = function() { return ((typeof abilities=='string'||abilities instanceof String)) ? JSON.parse(abilities) : null; };
		
		let userObject = {};
		
		for (let φ = 0, φ2 = Object.keys(user), φ3 = φ2.length, key, value; φ < φ3; φ++){
			key = φ2[φ];value = user[key];
			userObject[key] = value;
		};
		
		this.user = function() { return userObject; };
	}
	
	/**
	@param {String} perform
	*/
	can(perform){
		
		return this.abilities().includes('*') || this.abilities().includes(perform);
	}
	
	check(){
		
		return this.user() !== null || this.user() !== undefined;
	}
	
	/**
	@param {Object} provider
	*/
	static setProvider(provider){
		
		return config.provider = provider;
	}
	
	static getTable(){
		
		return config.provider.table;
	}
	
	/**
	@param {Object} body
	*/
	static async attempt(body){
		
		const dbTable = config.provider.table;
		
		const user = await Database.table(dbTable).where('email',body.email).first();
		
		
		if (user && await Hash.check(body.password,user.password)) {
			
			return user;
		};
		
		throw ValidationException.withMessages({
			email: [
				'Invalid credentials'
			]
		});
	}
};

module.exports = Auth;
