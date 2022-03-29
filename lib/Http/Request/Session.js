function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };
const $4 = Symbol.for('#ref'), $5 = Symbol.for('#__init__'), $6 = Symbol.for('#__patch__'), $14 = Symbol.for('#__initor__'), $15 = Symbol.for('#__inited__'), $7 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/

var $1 = requireDefault$__(require('../../Support/Helpers/isArray'/*$path$*/));
var $2 = requireDefault$__(require('../../Support/Helpers/dotNotation'/*$path$*/));
var $3 = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));

class Session {
	[$6]($$ = {}){
		var $8;
		($8 = $$[$4]) !== undefined && (this[$4] = $8);
		
	}
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
		var $9, $12;
		
		if (!($1.default(key))) { key = [key] };
		
		$9 = [];
		for (let $10 = 0, $11 = iter$__(key), $13 = $11.length; $10 < $13; $10++) {
			let i = $11[$10];
			$9.push(((($12 = this[$4].session[i]),delete this[$4].session[i], $12)));
		};
		return $9;
	}
};
exports.default = Session;
