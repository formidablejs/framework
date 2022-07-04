function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : a; };
const $ref$ = Symbol.for('#ref'), $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/

var $1 = requireDefault$__(require('../../Support/Helpers/isArray'/*$path$*/));
var $2 = requireDefault$__(require('../../Support/Helpers/dotNotation'/*$path$*/));
var $3 = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));

class Session {
	[$__patch__$]($$ = {}){
		var $4;
		($4 = $$[$ref$]) !== undefined && (this[$ref$] = $4);
		
	}
	[$__init__$]($$ = null,deep = true){
		this[$ref$] = $$ ? $$[$ref$] : undefined;
		
	}
	/**
	@param {FastifyRequest} request
	*/
	constructor(request){
		this[$__init__$]();
		this[$ref$] = request;
		
		if ($3.default(this[$ref$].session)) {
			
			this[$ref$].session = {};
		};
	}
	
	/**
	@param {String} key
	*/
	has(key){
		
		return !($3.default(this[$ref$].session[key]));
	}
	
	/**
	@param {String} key
	@param {any} default
	*/
	get(key,default$){
		
		return (this[$ref$].session[key] != null) ? this[$ref$].session[key] : default$;
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
		
		return this[$ref$].session[key] = value;
	}
	
	/**
	@param {String|String[]} key
	*/
	forget(key){
		var $5, $8;
		
		if (!($1.default(key))) { key = [key] };
		
		$5 = [];
		for (let $6 = 0, $7 = iter$__(key), $9 = $7.length; $6 < $9; $6++) {
			let i = $7[$6];
			$5.push(((($8 = this[$ref$].session[i]),delete this[$ref$].session[i], $8)));
		};
		return $5;
	}
};
exports.default = Session;
