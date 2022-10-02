function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
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
	[$__patch__$]($$ = {}){
		var $5;
		($5 = $$._driver) !== undefined && (this._driver = $5);
		
	}
	[$__init__$]($$ = null,deep = true){
		this._driver = $$ ? $$._driver : undefined;
		
	}
	/**
	@param {object} user
	@param {string} abilities
	@param {Driver} driverManager
	*/
	constructor(user = null,abilities = null,driverManager){
		this[$__init__$]();
		this.abilities = function() { return ((typeof abilities=='string'||abilities instanceof String)) ? JSON.parse(abilities) : null; };
		
		let userObject = {};
		
		for (let $6 = 0, $7 = Object.keys(user), $8 = $7.length, key, value; $6 < $8; $6++){
			key = $7[$6];value = user[key];
			userObject[key] = value;
		};
		
		this.user = function() { return userObject; };
		this._driver = driverManager;
	}
	
	driver(){
		
		return this._driver;
	}
	
	/**
	@param {string} perform
	*/
	can(perform){
		
		return this.abilities().includes('*') || this.abilities().includes(perform);
	}
	
	check(){
		
		return this.user() !== null || this.user() !== undefined;
	}
	
	/**
	@param {object} provider
	*/
	static setProvider(provider){
		
		return config.provider = provider;
	}
	
	static getTable(){
		
		return config.provider.table;
	}
	
	/**
	@param {object} body
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
