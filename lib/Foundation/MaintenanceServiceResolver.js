function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../Support/Helpers/decrypt'/*$path$*/));
var $2 = requireDefault$__(require('../Support/Helpers/encrypt'/*$path$*/));
var $3 = requireDefault$__(require('../Http/Request/FormRequest'/*$path$*/));
var $4 = requireDefault$__(require('fs'/*$path$*/));
var $5 = requireDefault$__(require('../Support/Helpers/isEmpty'/*$path$*/));
var $6 = requireDefault$__(require('./Exceptions/MaintenanceModeException'/*$path$*/));
var $7 = requireDefault$__(require('path'/*$path$*/));
var $8 = requireDefault$__(require('../Support/ServiceResolver'/*$path$*/));
var $9 = requireDefault$__(require('../Support/Helpers/slug'/*$path$*/));
class MaintenanceServiceResolver extends $8.default {
	
	
	get cookieName(){
		
		return $9.default(this.app.config.get('app.name'),'_') + '_maintenance';
	}
	
	getDown(){
		
		const maintenanceFile = $7.default.join(process.cwd(),'storage','framework','down.json');
		
		const isDown = $4.default.existsSync(maintenanceFile);
		
		if ($5.default(isDown)) { return false };
		
		const down = JSON.parse($4.default.readFileSync(maintenanceFile,'utf8'));
		
		const message = (!($5.default(down)) && !($5.default(down.message))) ? down.message : 'Service Unavailable';
		const statusCode = (!($5.default(down)) && !($5.default(down.statusCode))) ? down.statusCode : 503;
		const secret = (!($5.default(down)) && !($5.default(down.secret))) ? down.secret : null;
		const redirect = (!($5.default(down)) && !($5.default(down.redirect))) ? down.redirect : null;
		const retry = (!($5.default(down)) && !($5.default(down.retry))) ? Number(down.retry) : null;
		const refresh = (!($5.default(down)) && !($5.default(down.refresh))) ? Number(down.refresh) : null;
		
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
		
		this.app.addHook('onRequest',function(/**@type {FastifyRequest}*/req,/**@type {FastifyReply}*/reply,/**@type {Function}*/done) {
			
			const down = self.getDown();
			
			if ($5.default(down)) { return done() };
			
			const request = new $3.default(req,{},reply,self.app.config);
			
			if (!($5.default(down.redirect))) {
				
				if (self.isFile(request) || request.isUrl(down.redirect)) { return done() };
				
				return reply.redirect(down.redirect);
			};
			
			const {secret: secret} = down;
			
			if (!($5.default(secret))) {
				
				if (!($5.default(self.hasBypassMaintenanceModeCookie(secret,request)))) {
					
					return done();
				};
				
				const urlSecret = request.urlWithoutQuery().split('/').slice(-1).pop();
				
				if (urlSecret === secret) {
					
					const splitUrl = request.urlWithoutQuery().split('/');
					
					splitUrl.pop();
					
					const redirectUrl = splitUrl.join('/');
					
					self.setBypassMaintenanceModeCookie(secret,request);
					
					if (!($5.default(down.retry))) {
						
						reply.header('Retry-After',down.retry);
					};
					
					if (!($5.default(down.refresh))) {
						
						reply.header('Refresh',down.refresh);
					};
					
					reply.redirect(redirectUrl || '/');
					
					return done();
				};
			};
			
			throw new $6.default(down.message,down.statusCode);
		});
		
		return this;
	}
	
	/**
	@param {String} secret
	@param {FormRequest} request
	*/
	hasBypassMaintenanceModeCookie(secret,request){
		
		
		const cookie = request.request.cookies[this.cookieName];
		
		try {
			
			if (!($5.default(cookie)) && $1.default(cookie) == secret) {
				
				return true;
			};
		} catch (e) { };
		
		return false;
	}
	
	/**
	@param {FormRequest} request
	*/
	setBypassMaintenanceModeCookie(secret,request){
		
		const session = this.app.config.get('session');
		
		return request.reply.setCookie(this.cookieName,$2.default(secret),{
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
	isFile(request){
		
		const publicPath = $7.default.join(process.cwd(),'public',request.urlWithoutQuery());
		const formidablePath = $7.default.join(process.cwd(),'.formidable','public',request.urlWithoutQuery());
		
		if ($4.default.existsSync(publicPath) && $4.default.statSync(publicPath).isFile()) { return true };
		
		if ($4.default.existsSync(formidablePath) && $4.default.statSync(formidablePath).isFile()) { return true };
		
		return false;
	}
};
exports.default = MaintenanceServiceResolver;
