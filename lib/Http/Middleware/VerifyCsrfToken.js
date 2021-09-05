function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };

const {wildcard: wildcard} = require('@formidablejs/helpers'/*$path$*/);
const csrf = require('@fastify/csrf'/*$path$*/);
const TokenMismatchException = require('../Session/Exceptions/TokenMismatchException'/*$path$*/);

module.exports = class VerifyCsrfToken {
	
	
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
		
		throw new TokenMismatchException('CSRF token mismatch.');
	}
	
	isReading(request){
		
		return ['HEAD','GET','OPTIONS'].includes(request.method());
	}
	
	shouldIgnore(request){
		
		for (let φ = 0, φ2 = iter$__(this.except), φ3 = φ2.length; φ < φ3; φ++) {
			let value = φ2[φ];
			if (wildcard(value,request.url())) { return true };
		};
		
		return false;
	}
	
	tokensMatch(request){
		
		const token = this.getTokenFromRequest(request);
		
		const results = (new csrf()).verify(request.request.session.secret,token);
		
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
