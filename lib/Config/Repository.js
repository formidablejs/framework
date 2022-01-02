function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$dotNotationφ = requireDefault$__(require('../Support/Helpers/dotNotation'/*$path$*/));

const settings = {
	environment: null
};

class Repository {
	constructor($$ = null){
		this[Ψ__init__]($$);
	}
	[Ψ__init__]($$ = null){
		var vφ;
		this.temp = ($$ && (vφ = $$.temp) !== undefined) ? (vφ) : {};
		
	}
	
	
	// All of the configuration items.
	get registered(){
		
		return new Object;
	}
	
	/**
	@param {String} key
	*/
	has(key){
		
		let tempCheck = _$dotNotationφ.default(this.temp,key);
		
		if (tempCheck !== undefined && tempCheck !== null) { return true };
		
		return _$dotNotationφ.default(this.registered,key) !== undefined && _$dotNotationφ.default(this.registered,key) !== null;
	}
	
	/**
	@param {String} key
	@param {any} default
	*/
	get(key,default$){
		
		let tempValue = _$dotNotationφ.default(this.temp,key);
		
		if (tempValue !== undefined && tempValue !== null) { return tempValue };
		
		const output = _$dotNotationφ.default(this.registered,key);
		
		return (output != null) ? output : default$;
	}
	
	/**
	@param {String} key
	@param {any} value
	*/
	set(key,value){
		
		return this.temp[key] = value;
	}
	
	all(){
		
		return this.registered;
	}
	
	static setEnvironment(){
		
		return settings.environment;
	}
	
	static getEnvironment(){
		
		return settings.environment;
	}
};
exports.default = Repository;
