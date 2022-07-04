function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : a; };
const $ref$ = Symbol.for('#ref'), $reply$ = Symbol.for('#reply'), $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../../Support/Helpers/config'/*$path$*/));
var $2 = requireDefault$__(require('../../Support/Helpers/dotNotation'/*$path$*/));
var $3 = requireDefault$__(require('../../Support/Helpers/isArray'/*$path$*/));
var $4 = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));
class Cookies {
	[$__patch__$]($$ = {}){
		var $5;
		($5 = $$[$ref$]) !== undefined && (this[$ref$] = $5);
		($5 = $$[$reply$]) !== undefined && (this[$reply$] = $5);
		
	}
	[$__init__$]($$ = null,deep = true){
		this[$ref$] = $$ ? $$[$ref$] : undefined;
		this[$reply$] = $$ ? $$[$reply$] : undefined;
		
	}
	/**
	@param {FastifyRequest} request
	@param {FastifyReply} reply
	*/
	constructor(request,reply){
		this[$__init__$]();
		this[$ref$] = request;
		this[$reply$] = reply;
		
		if ($4.default(this[$ref$].cookies)) {
			
			this[$ref$].cookies = {};
		};
	}
	
	/**
	@param {String} key
	*/
	has(key){
		
		return !($4.default(this[$ref$].cookies[key]));
	}
	
	/**
	@param {String} key
	@param {any} default
	*/
	get(key,default$){
		
		return (this[$ref$].cookies[key] != null) ? this[$ref$].cookies[key] : default$;
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
		
		return this[$reply$].setCookie(key,value,{
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
		var $6, $9;
		
		if (!($3.default(key))) { key = [key] };
		
		$6 = [];
		for (let $7 = 0, $8 = iter$__(key), $10 = $8.length; $7 < $10; $7++) {
			let i = $8[$7];
			$6.push(((($9 = this[$ref$].cookies[i]),delete this[$ref$].cookies[i], $9)));
		};
		return $6;
	}
};
exports.default = Cookies;
