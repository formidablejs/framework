function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };
const $5 = Symbol.for('#ref'), $6 = Symbol.for('#reply'), $7 = Symbol.for('#__init__'), $14 = Symbol.for('#__initor__'), $15 = Symbol.for('#__inited__'), $8 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../../Support/Helpers/config'/*$path$*/));
var $2 = requireDefault$__(require('../../Support/Helpers/dotNotation'/*$path$*/));
var $3 = requireDefault$__(require('../../Support/Helpers/isArray'/*$path$*/));
var $4 = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));
class Cookies {
	[$7]($$ = null){
		this[$5] = $$ ? $$[$5] : undefined;
		this[$6] = $$ ? $$[$6] : undefined;
		
	}
	/**
	@param {FastifyRequest} request
	@param {FastifyReply} reply
	*/
	constructor(request,reply){
		this[$7]();
		this[$5] = request;
		this[$6] = reply;
		
		if ($4.default(this[$5].cookies)) {
			
			this[$5].cookies = {};
		};
	}
	
	/**
	@param {String} key
	*/
	has(key){
		
		return !($4.default(this[$5].cookies[key]));
	}
	
	/**
	@param {String} key
	@param {any} default
	*/
	get(key,default$){
		
		return (this[$5].cookies[key] != null) ? this[$5].cookies[key] : default$;
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
		
		const session = $1.default('session');
		
		return this[$6].setCookie(key,value,{
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
		var $9, $12;
		
		if (!($3.default(key))) { key = [key] };
		
		$9 = [];
		for (let $10 = 0, $11 = iter$__(key), $13 = $11.length; $10 < $13; $10++) {
			let i = $11[$10];
			$9.push(((($12 = this[$5].cookies[i]),delete this[$5].cookies[i], $12)));
		};
		return $9;
	}
};
exports.default = Cookies;
