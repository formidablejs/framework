function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };
const Ψref = Symbol.for('#ref'), Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/

var _$isArrayφ = requireDefault$__(require('../../Support/Helpers/isArray'/*$path$*/));
var _$dotNotationφ = requireDefault$__(require('../../Support/Helpers/dotNotation'/*$path$*/));
var _$isEmptyφ = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));

class Cookies {
	[Ψ__init__]($$ = null){
		this[Ψref] = $$ ? $$[Ψref] : undefined;
		
	}
	/**
	@param {FastifyRequest} request
	*/
	constructor(request){
		this[Ψ__init__]();
		this[Ψref] = request;
		
		if (_$isEmptyφ.default(this[Ψref].cookies)) {
			
			this[Ψref].cookies = {};
		};
	}
	
	/**
	@param {String} key
	*/
	has(key){
		
		return !(_$isEmptyφ.default(this[Ψref].cookies[key]));
	}
	
	/**
	@param {String} key
	@param {any} default
	*/
	get(key,default$){
		
		return (this[Ψref].cookies[key] != null) ? this[Ψref].cookies[key] : default$;
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
		
		return this[Ψref].cookies[key] = value;
	}
	
	/**
	@param {String|String[]} key
	*/
	forget(key){
		var resφ, φ;
		
		if (!(_$isArrayφ.default(key))) { key = [key] };
		
		resφ = [];
		for (let iφ = 0, itemsφ = iter$__(key), lenφ = itemsφ.length; iφ < lenφ; iφ++) {
			let i = itemsφ[iφ];
			resφ.push((((φ = this[Ψref].cookies[i]),delete this[Ψref].cookies[i], φ)));
		};
		return resφ;
	}
};
exports.default = Cookies;
