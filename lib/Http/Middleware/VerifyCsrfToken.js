function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };
const Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$csrfφ = requireDefault$__(require('@fastify/csrf'/*$path$*/));
var _$decryptφ = requireDefault$__(require('../../Support/Helpers/decrypt'/*$path$*/));
var _$encryptφ = requireDefault$__(require('../../Support/Helpers/encrypt'/*$path$*/));
var _$isEmptyφ = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));
var _$TokenMismatchExceptionφ = requireDefault$__(require('../Session/Exceptions/TokenMismatchException'/*$path$*/));
var _$wildcardφ = requireDefault$__(require('../../Support/Helpers/wildcard'/*$path$*/));

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
		
		throw new _$TokenMismatchExceptionφ.default('CSRF token mismatch.');
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
		
		for (let iφ = 0, itemsφ = iter$__(this.except), lenφ = itemsφ.length; iφ < lenφ; iφ++) {
			let value = itemsφ[iφ];
			if (_$wildcardφ.default(value,request.url())) { return true };
		};
		
		return false;
	}
	
	/**
	@param {FormRequest} request
	*/
	tokensMatch(request){
		
		let token = this.getTokenFromRequest(request);
		
		if (!(_$isEmptyφ.default(token))) {
			
			try {
				token = _$decryptφ.default(token);
			} catch (φ) {
				
				token = new String;
			};
		};
		
		return (new _$csrfφ.default()).verify(request.request.session.secret,token);
	}
	
	/**
	@param {FormRequest} request
	*/
	getTokenFromRequest(request){
		
		let token = request.input('_token') ? request.input('_token') : request.header('x-csrf-token');
		
		if (_$isEmptyφ.default(token)) { token = request.header('x-xsrf-token') };
		
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
		
		if (_$isEmptyφ.default(token)) { return false };;
		
		return reply.setCookie('XSRF-TOKEN',_$encryptφ.default(token),{
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
