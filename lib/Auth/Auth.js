function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$Hashφ = requireDefault$__(require('../Hashing/Hash'/*$path$*/));
var _$ValidationExceptionφ = requireDefault$__(require('../Validator/Exceptions/ValidationException'/*$path$*/));
var _$Databaseφ = requireDefault$__(require('../Database/Database'/*$path$*/));

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
		
		for (let iφ = 0, keysφ = Object.keys(user), lφ = keysφ.length, key, value; iφ < lφ; iφ++){
			key = keysφ[iφ];value = user[key];
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
		
		const user = await _$Databaseφ.default.table(dbTable).where('email',body.email).first();
		
		
		if (user && await _$Hashφ.default.check(body.password,user.password)) {
			
			return user;
		};
		
		throw _$ValidationExceptionφ.default.withMessages({
			email: [
				'Invalid credentials'
			]
		});
	}
};

exports.default = Auth;
