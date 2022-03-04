function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };
const $4 = Symbol.for('#ref'), $5 = Symbol.for('#__init__'), $12 = Symbol.for('#__initor__'), $13 = Symbol.for('#__inited__'), $6 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/

var $1 = requireDefault$__(require('../../Support/Helpers/isArray'/*$path$*/));
var $2 = requireDefault$__(require('../../Support/Helpers/dotNotation'/*$path$*/));
var $3 = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));

class Session {
	[$5]($$ = null){
		this[$4] = $$ ? $$[$4] : undefined;
		
	}
	/**
	@param {FastifyRequest} request
	*/
	constructor(request){
		this[$5]();
		this[$4] = request;
		
		if ($3.default(this[$4].session)) {
			
			this[$4].session = {};
		};
	}
	
	/**
	@param {String} key
	*/
	has(key){
		
		return !($3.default(this[$4].session[key]));
	}
	
	/**
	@param {String} key
	@param {any} default
	*/
	get(key,default$){
		
		return (this[$4].session[key] != null) ? this[$4].session[key] : default$;
	}
	
	/**
	@param {String} key
	@param {any} default
	*/
	pull(key,default$){
		
		if (this.has(key)) {
			
			const value = this.get(key);
			
			this.forget(key);
			
			return value;
		};
		
		return default$;
	}
	
	/**
	@param {String} key
	@param {any} value
	*/
	set(key,value){
		
		return this[$4].session[key] = value;
	}
	
	/**
	@param {String|String[]} key
	*/
	forget(key){
		var $7, $10;
		
		if (!($1.default(key))) { key = [key] };
		
		$7 = [];
		for (let $8 = 0, $9 = iter$__(key), $11 = $9.length; $8 < $11; $8++) {
			let i = $9[$8];
			$7.push(((($10 = this[$4].session[i]),delete this[$4].session[i], $10)));
		};
		return $7;
	}
};
exports.default = Session;
