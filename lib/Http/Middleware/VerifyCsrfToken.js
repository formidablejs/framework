function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };
const Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$csrfφ = requireDefault$__(require('@fastify/csrf'/*$path$*/));
var _$TokenMismatchExceptionφ = requireDefault$__(require('../Session/Exceptions/TokenMismatchException'/*$path$*/));
var _$wildcardφ = requireDefault$__(require('../../Support/Helpers/wildcard'/*$path$*/));

class VerifyCsrfToken {
	
	
	get addHttpCookie(){
		
		return true;
	}
	
	get except(){
		
		return [];
	}
	
	constructor(config){
		
		this.config = config;
	}
	
	handle(request,reply){
		
		this.shouldIgnore(request);
		if (this.isReading(request) || this.shouldIgnore(request) || this.tokensMatch(request)) {
			
			if (!(this.isReading(request))) { this.forgetTokens(request) };
			
			if (this.shouldAddXsrfTokenCookie()) { this.addCookieToResponse(request,reply) };
			
			return request;
		};
		
		this.forgetTokens(request);
		
		throw new _$TokenMismatchExceptionφ.default('CSRF token mismatch.');
	}
	
	isReading(request){
		
		return ['HEAD','GET','OPTIONS'].includes(request.method());
	}
	
	shouldIgnore(request){
		
		for (let iφ = 0, itemsφ = iter$__(this.except), lenφ = itemsφ.length; iφ < lenφ; iφ++) {
			let value = itemsφ[iφ];
			if (_$wildcardφ.default(value,request.url())) { return true };
		};
		
		return false;
	}
	
	tokensMatch(request){
		
		const token = this.getTokenFromRequest(request);
		
		const results = (new _$csrfφ.default()).verify(request.request.session.secret,token);
		
		return results;
	}
	
	getTokenFromRequest(request){
		
		const token = request.input('_token') ? request.input('_token') : request.header('x-csrf-token');
		
		return token ? token : (new String);
	}
	
	shouldAddXsrfTokenCookie(){
		
		return this.addHttpCookie;
	}
	
	addCookieToResponse(request,reply){
		
		const session = this.config.get('session');
		
		const token = request.request.session.token;
		
		if (token === null || token === undefined) { return false };;
		
		return reply.setCookie('XSRF-TOKEN',request.request.session.token,{
			domain: session.domain,
			httpOnly: session.http_only,
			maxAge: session.lifetime,
			path: session.path,
			sameSite: session.same_site,
			secure: session.secure
		});
	}
	
	forgetTokens(request){
		
		request.request.session.secret = null;
		request.request.session.token = null;
		
		return request;
	}
};
exports.default = VerifyCsrfToken;
