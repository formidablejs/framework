function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $5 = Symbol.for('#__init__'), $6 = Symbol.for('#__patch__'), $12 = Symbol.for('#__initor__'), $13 = Symbol.for('#__inited__'), $7 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../Support/Helpers/isEmpty'/*$path$*/));
var $2 = requireDefault$__(require('../Hashing/Hash'/*$path$*/));
var $3 = requireDefault$__(require('../Validator/Exceptions/ValidationException'/*$path$*/));
var $4 = requireDefault$__(require('../Database/Database'/*$path$*/));

const config = {
	provider: null,
	auth: null
};

class Auth {
	[$6]($$ = {}){
		var $8;
		($8 = $$._driver) !== undefined && (this._driver = $8);
		
	}
	[$5]($$ = null,deep = true){
		this._driver = $$ ? $$._driver : undefined;
		
	}
	/**
	@param {Object} user
	@param {String} abilities
	@param {Driver} driverManager
	*/
	constructor(user = null,abilities = null,driverManager){
		this[$5]();
		this.abilities = function() { return ((typeof abilities=='string'||abilities instanceof String)) ? JSON.parse(abilities) : null; };
		
		let userObject = {};
		
		for (let $9 = 0, $10 = Object.keys(user), $11 = $10.length, key, value; $9 < $11; $9++){
			key = $10[$9];value = user[key];
			userObject[key] = value;
		};
		
		this.user = function() { return userObject; };
		this._driver = driverManager;
	}
	
	driver(){
		
		return this._driver;
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
		
		const user = await $4.default.table(dbTable).where('email',body.email).first();
		
		
		if (user && await $2.default.check(body.password,user.password)) {
			
			return user;
		};
		
		throw $3.default.withMessages({
			email: [
				'Invalid credentials'
			]
		});
	}
};

exports.default = Auth;
