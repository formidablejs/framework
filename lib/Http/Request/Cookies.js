function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };
const Ψref = Symbol.for('#ref'), Ψreply = Symbol.for('#reply'), Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$configφ = requireDefault$__(require('../../Support/Helpers/config'/*$path$*/));
var _$dotNotationφ = requireDefault$__(require('../../Support/Helpers/dotNotation'/*$path$*/));
var _$isArrayφ = requireDefault$__(require('../../Support/Helpers/isArray'/*$path$*/));
var _$isEmptyφ = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));
class Cookies {
	[Ψ__init__]($$ = null){
		this[Ψref] = $$ ? $$[Ψref] : undefined;
		this[Ψreply] = $$ ? $$[Ψreply] : undefined;
		
	}
	/**
	@param {FastifyRequest} request
	@param {FastifyReply} reply
	*/
	constructor(request,reply){
		this[Ψ__init__]();
		this[Ψref] = request;
		this[Ψreply] = reply;
		
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
	@param {String} value
	*/
	set(key,value){
		
		const session = _$configφ.default('session');
		
		return this[Ψreply].setCookie(key,value,{
			domain: session.domain,
			httpOnly: session.http_only,
			maxAge: session.lifetime,
			path: session.path,
			sameSite: session.same_site,
			secure: session.secure
		});
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
