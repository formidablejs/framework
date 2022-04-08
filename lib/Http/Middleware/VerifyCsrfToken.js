function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : a; };
const $12 = Symbol.for('#__initor__'), $13 = Symbol.for('#__inited__'), $7 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('@fastify/csrf'/*$path$*/));
var $2 = requireDefault$__(require('../../Support/Helpers/decrypt'/*$path$*/));
var $3 = requireDefault$__(require('../../Support/Helpers/encrypt'/*$path$*/));
var $4 = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));
var $5 = requireDefault$__(require('../Session/Exceptions/TokenMismatchException'/*$path$*/));
var $6 = requireDefault$__(require('../../Support/Helpers/wildcard'/*$path$*/));

class VerifyCsrfToken {
	
	
	get addHttpCookie(){
		
		return true;
	}
	
	get except(){
		
		return [];
	}
	
	/**
	@param {Repository} config
	*/
	constructor(config){
		
		this.config = config;
	}
	
	/**
	@param {FormRequest} request
	@param {FastifyReply} reply
	*/
	handle(request,reply){
		
		if (this.isReading(request) || this.shouldIgnore(request) || this.tokensMatch(request)) {
			
			if (!(this.isReading(request))) { this.forgetTokens(request) };
			
			if (this.shouldAddXsrfTokenCookie()) { this.addCookieToResponse(request,reply) };
			
			return request;
		};
		
		this.forgetTokens(request);
		
		throw new $5.default('CSRF token mismatch.');
	}
	
	/**
	@param {FormRequest} request
	*/
	isReading(request){
		
		return ['HEAD','GET','OPTIONS'].includes(request.method());
	}
	
	/**
	@param {FormRequest} request
	*/
	shouldIgnore(request){
		
		for (let $8 = 0, $9 = iter$__(this.except), $10 = $9.length; $8 < $10; $8++) {
			let value = $9[$8];
			if ($6.default(value,request.url())) { return true };
		};
		
		return false;
	}
	
	/**
	@param {FormRequest} request
	*/
	tokensMatch(request){
		
		let token = this.getTokenFromRequest(request);
		
		if (!($4.default(token))) {
			
			try {
				token = $2.default(token);
			} catch ($11) {
				
				token = new String;
			};
		};
		
		return (new $1.default()).verify(request.request.session.secret,token);
	}
	
	/**
	@param {FormRequest} request
	*/
	getTokenFromRequest(request){
		
		let token = request.input('_token') ? request.input('_token') : request.header('x-csrf-token');
		
		if ($4.default(token)) { token = request.header('x-xsrf-token') };
		
		return token ? token : (new String);
	}
	
	shouldAddXsrfTokenCookie(){
		
		return this.addHttpCookie;
	}
	
	/**
	@param {FormRequest} request
	@param {FastifyReply} reply
	*/
	addCookieToResponse(request,reply){
		
		const session = this.config.get('session');
		
		const token = request.request.session.token;
		
		if ($4.default(token)) { return false };;
		
		return reply.setCookie('XSRF-TOKEN',$3.default(token),{
			domain: session.domain,
			httpOnly: session.http_only,
			maxAge: session.lifetime,
			path: session.path,
			sameSite: session.same_site,
			secure: session.secure
		});
	}
	
	/**
	@param {FormRequest} request
	*/
	forgetTokens(request){
		
		request.request.session.secret = null;
		request.request.session.token = null;
		
		return request;
	}
};
exports.default = VerifyCsrfToken;
