function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$decryptφ = requireDefault$__(require('../Support/Helpers/decrypt'/*$path$*/));
var _$encryptφ = requireDefault$__(require('../Support/Helpers/encrypt'/*$path$*/));
var _$FormRequestφ = requireDefault$__(require('../Http/Request/FormRequest'/*$path$*/));
var _$fsφ = requireDefault$__(require('fs'/*$path$*/));
var _$isEmptyφ = requireDefault$__(require('../Support/Helpers/isEmpty'/*$path$*/));
var _$MaintenanceModeExceptionφ = requireDefault$__(require('./Exceptions/MaintenanceModeException'/*$path$*/));
var _$pathφ = requireDefault$__(require('path'/*$path$*/));
var _$ServiceResolverφ = requireDefault$__(require('../Support/ServiceResolver'/*$path$*/));
var _$slugφ = requireDefault$__(require('../Support/Helpers/slug'/*$path$*/));
class MaintenanceServiceResolver extends _$ServiceResolverφ.default {
	
	
	get cookieName(){
		
		return _$slugφ.default(this.app.config.get('app.name'),'_') + '_maintenance';
	}
	
	getDown(){
		
		const maintenanceFile = _$pathφ.default.join(process.cwd(),'storage','framework','down.json');
		
		const isDown = _$fsφ.default.existsSync(maintenanceFile);
		
		if (_$isEmptyφ.default(isDown)) { return false };
		
		const down = JSON.parse(_$fsφ.default.readFileSync(maintenanceFile,'utf8'));
		
		const message = (!(_$isEmptyφ.default(down)) && !(_$isEmptyφ.default(down.message))) ? down.message : 'Service Unavailable';
		const statusCode = (!(_$isEmptyφ.default(down)) && !(_$isEmptyφ.default(down.statusCode))) ? down.statusCode : 503;
		const secret = (!(_$isEmptyφ.default(down)) && !(_$isEmptyφ.default(down.secret))) ? down.secret : null;
		const redirect = (!(_$isEmptyφ.default(down)) && !(_$isEmptyφ.default(down.redirect))) ? down.redirect : null;
		const retry = (!(_$isEmptyφ.default(down)) && !(_$isEmptyφ.default(down.retry))) ? Number(down.retry) : null;
		const refresh = (!(_$isEmptyφ.default(down)) && !(_$isEmptyφ.default(down.refresh))) ? Number(down.refresh) : null;
		
		return {
			message: message,
			statusCode: statusCode,
			secret: secret,
			redirect: redirect,
			retry: retry,
			refresh: refresh
		};
	}
	
	boot(){
		var self = this;
		
		self.app.addHook('onRequest',function(/**@type {FastifyRequest}*/req,/**@type {FastifyReply}*/reply,/**@type {Function}*/done) {
			
			const down = self.getDown();
			
			if (_$isEmptyφ.default(down)) { return done() };
			
			const request = new _$FormRequestφ.default(req,{},reply,self.app.config);
			
			if (!(_$isEmptyφ.default(down.redirect))) {
				
				if (self.isFile(request) || request.isUrl(down.redirect)) { return done() };
				
				return reply.redirect(down.redirect);
			};
			
			const {secret: secret} = down;
			
			if (!(_$isEmptyφ.default(secret))) {
				
				if (!(_$isEmptyφ.default(self.hasBypassMaintenanceModeCookie(secret,request)))) {
					
					return done();
				};
				
				const urlSecret = request.urlWithoutQuery().split('/').slice(-1).pop();
				
				if (urlSecret === secret) {
					
					const splitUrl = request.urlWithoutQuery().split('/');
					
					splitUrl.pop();
					
					const redirectUrl = splitUrl.join('/');
					
					self.setBypassMaintenanceModeCookie(secret,request);
					
					if (!(_$isEmptyφ.default(down.retry))) {
						
						reply.header('Retry-After',down.retry);
					};
					
					if (!(_$isEmptyφ.default(down.refresh))) {
						
						reply.header('Refresh',down.refresh);
					};
					
					reply.redirect(redirectUrl || '/');
					
					return done();
				};
			};
			
			throw new _$MaintenanceModeExceptionφ.default(down.message,down.statusCode);
		});
		
		return self;
	}
	
	/**
	@param {String} secret
	@param {FormRequest} request
	*/
	hasBypassMaintenanceModeCookie(secret,request){
		
		
		const cookie = request.request.cookies[this.cookieName];
		
		if (!(_$isEmptyφ.default(cookie))) {
			
			const unsignCookie = request.reply.unsignCookie(cookie);
			
			if (!(_$isEmptyφ.default(unsignCookie.valid)) && !(_$isEmptyφ.default(unsignCookie.value)) && _$decryptφ.default(unsignCookie.value) == secret) {
				
				return true;
			};
		};
	}
	
	/**
	@param {FormRequest} request
	*/
	setBypassMaintenanceModeCookie(secret,request){
		
		const session = this.app.config.get('session');
		
		return request.reply.setCookie(this.cookieName,_$encryptφ.default(secret),{
			domain: session.domain,
			httpOnly: session.http_only,
			maxAge: session.lifetime,
			path: session.path,
			sameSite: session.same_site,
			secure: session.secure,
			signed: session.encrypt
		});
	}
	
	/**
	@param {FormRequest} request
	*/
	isFile(request){
		
		const publicPath = _$pathφ.default.join(process.cwd(),'public',request.urlWithoutQuery());
		const formidablePath = _$pathφ.default.join(process.cwd(),'.formidable','public',request.urlWithoutQuery());
		
		if (_$fsφ.default.existsSync(publicPath) && _$fsφ.default.statSync(publicPath).isFile()) { return true };
		
		if (_$fsφ.default.existsSync(formidablePath) && _$fsφ.default.statSync(formidablePath).isFile()) { return true };
		
		return false;
	}
};
exports.default = MaintenanceServiceResolver;
