function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$mailerφ = require('@formidablejs/mailer'/*$path$*/);
var _$Driverφ = requireDefault$__(require('./Drivers/Driver'/*$path$*/));

var _$BeforeForgotφ = requireDefault$__(require('./Http/Middleware/BeforeForgot'/*$path$*/));
var _$BeforeLoginφ = requireDefault$__(require('./Http/Middleware/BeforeLogin'/*$path$*/));
var _$BeforeLogoutφ = requireDefault$__(require('./Http/Middleware/BeforeLogout'/*$path$*/));
var _$BeforeRegisterφ = requireDefault$__(require('./Http/Middleware/BeforeRegister'/*$path$*/));
var _$BeforeResendφ = requireDefault$__(require('./Http/Middleware/BeforeResend'/*$path$*/));
var _$BeforeResetφ = requireDefault$__(require('./Http/Middleware/BeforeReset'/*$path$*/));
var _$BeforeVerifyφ = requireDefault$__(require('./Http/Middleware/BeforeVerify'/*$path$*/));

var _$EmailVerificationControllerφ = requireDefault$__(require('./Http/Controllers/EmailVerificationController'/*$path$*/));
var _$LoginControllerφ = requireDefault$__(require('./Http/Controllers/LoginController'/*$path$*/));
var _$LogoutControllerφ = requireDefault$__(require('./Http/Controllers/LogoutController'/*$path$*/));
var _$PasswordControllerφ = requireDefault$__(require('./Http/Controllers/PasswordController'/*$path$*/));
var _$RegisterControllerφ = requireDefault$__(require('./Http/Controllers/RegisterController'/*$path$*/));
var _$Routeφ = requireDefault$__(require('../Http/Router/Route'/*$path$*/));

class AuthService {
	
	
	/**
	@param {Function} callback
	*/
	static beforeLogin(callback){
		
		_$BeforeLoginφ.default.beforeLogin(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static beforeLogout(callback){
		
		_$BeforeLogoutφ.default.beforeLogout(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static beforeRegister(callback){
		
		_$BeforeRegisterφ.default.beforeRegister(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static beforeVerify(callback){
		
		_$BeforeVerifyφ.default.beforeVerify(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static beforeResend(callback){
		
		_$BeforeResendφ.default.beforeResend(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static beforeForgot(callback){
		
		_$BeforeForgotφ.default.beforeForgot(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static beforeReset(callback){
		
		_$BeforeResetφ.default.beforeReset(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static onLogin(callback){
		
		_$LoginControllerφ.default.onLogin(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static onRegister(callback){
		
		_$RegisterControllerφ.default.onRegister(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static onForgot(callback){
		
		_$PasswordControllerφ.default.onForgot(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static onReset(callback){
		
		_$PasswordControllerφ.default.onReset(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static onAuthenticated(callback){
		
		_$Driverφ.default.onAuthenticated(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static onRegistered(callback){
		
		_$Driverφ.default.onRegistered(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static onVerification(callback){
		
		_$EmailVerificationControllerφ.default.onVerification(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static onEmailResend(callback){
		
		_$EmailVerificationControllerφ.default.onEmailResend(callback);
		
		return this;
	}
	
	/**
	@param {Mailable} mailer
	*/
	static verificationMailer(mailer){
		
		_$Driverφ.default.verificationMailer(mailer);
		
		return this;
	}
	
	/**
	@param {Mailable} mailer
	*/
	static resetPasswordMailer(mailer){
		
		_$Driverφ.default.resetPasswordMailer(mailer);
		
		return this;
	}
	
	/**
	@param {Object} config
	*/
	static routes(config = {}){
		
		const login = config.login ? config.login : true;
		const register = config.register ? config.register : true;
		const logout = config.logout ? config.logout : true;
		const email = config.email ? config.email : true;
		const password = config.password ? config.password : true;
		
		if (config.protocol) {
			
			const protocol = config.protocol;
			
			_$BeforeResendφ.default._params = [protocol];
			_$BeforeForgotφ.default._params = [protocol];
			_$BeforeLoginφ.default._params = [protocol];
			_$BeforeLogoutφ.default._params = [protocol];
			_$BeforeRegisterφ.default._params = [protocol];
			_$BeforeResetφ.default._params = [protocol];
			_$BeforeVerifyφ.default._params = [protocol];
		};
		
		if (login === true) {
			
			_$Routeφ.default.post('login',[_$LoginControllerφ.default,'login']).middleware(['guest',_$BeforeLoginφ.default]).name('login');
		};
		
		if (register === true) {
			
			_$Routeφ.default.post('register',[_$RegisterControllerφ.default,'register']).middleware(['guest',_$BeforeRegisterφ.default]).name('register');
		};
		
		if (logout === true) {
			
			_$Routeφ.default.post('logout',[_$LogoutControllerφ.default,'logout']).middleware(['auth',_$BeforeLogoutφ.default]).name('logout');
		};
		
		if (email === true) {
			
			_$Routeφ.default.post('email/verify',[_$EmailVerificationControllerφ.default,'verify']).name('email.verify').middleware(['signed',_$BeforeVerifyφ.default]);
			_$Routeφ.default.post('email/resend',[_$EmailVerificationControllerφ.default,'resend']).name('email.resend').middleware([_$BeforeResendφ.default]);
		};
		
		if (password === true) {
			
			_$Routeφ.default.post('password/forgot',[_$PasswordControllerφ.default,'forgot']).middleware(['guest',_$BeforeForgotφ.default]).name('password.forgot');
			return _$Routeφ.default.post('password/reset',[_$PasswordControllerφ.default,'reset']).middleware(['signed','guest',_$BeforeResetφ.default]).name('password.reset');
		};
	}
};
exports.default = AuthService;
