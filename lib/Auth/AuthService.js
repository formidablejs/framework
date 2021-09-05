
const {Mailable: Mailable} = require('@formidablejs/mailer'/*$path$*/);
const Driver = require('./Drivers/Driver'/*$path$*/);

const BeforeForgot = require('./Http/Middleware/BeforeForgot'/*$path$*/);
const BeforeLogin = require('./Http/Middleware/BeforeLogin'/*$path$*/);
const BeforeLogout = require('./Http/Middleware/BeforeLogout'/*$path$*/);
const BeforeRegister = require('./Http/Middleware/BeforeRegister'/*$path$*/);
const BeforeResend = require('./Http/Middleware/BeforeResend'/*$path$*/);
const BeforeReset = require('./Http/Middleware/BeforeReset'/*$path$*/);
const BeforeVerify = require('./Http/Middleware/BeforeVerify'/*$path$*/);

const EmailVerificationController = require('./Http/Controllers/EmailVerificationController'/*$path$*/);
const LoginController = require('./Http/Controllers/LoginController'/*$path$*/);
const LogoutController = require('./Http/Controllers/LogoutController'/*$path$*/);
const PasswordController = require('./Http/Controllers/PasswordController'/*$path$*/);
const RegisterController = require('./Http/Controllers/RegisterController'/*$path$*/);
const Route = require('../Http/Router/Manager'/*$path$*/);

module.exports = class AuthService {
	
	
	/**
	@param {Function} callback
	*/
	static beforeLogin(callback){
		
		BeforeLogin.beforeLogin(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static beforeLogout(callback){
		
		BeforeLogout.beforeLogout(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static beforeRegister(callback){
		
		BeforeRegister.beforeRegister(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static beforeVerify(callback){
		
		BeforeVerify.beforeVerify(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static beforeResend(callback){
		
		BeforeResend.beforeResend(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static beforeForgot(callback){
		
		BeforeForgot.beforeForgot(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static beforeReset(callback){
		
		BeforeReset.beforeReset(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static onLogin(callback){
		
		LoginController.onLogin(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static onRegister(callback){
		
		RegisterController.onRegister(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static onForgot(callback){
		
		PasswordController.onForgot(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static onReset(callback){
		
		PasswordController.onReset(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static onAuthenticated(callback){
		
		Driver.onAuthenticated(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static onRegistered(callback){
		
		Driver.onRegistered(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static onVerification(callback){
		
		EmailVerificationController.onVerification(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static onEmailResend(callback){
		
		EmailVerificationController.onEmailResend(callback);
		
		return this;
	}
	
	/**
	@param {Mailable} mailer
	*/
	static verificationMailer(mailer){
		
		Driver.verificationMailer(mailer);
		
		return this;
	}
	
	/**
	@param {Mailable} mailer
	*/
	static resetPasswordMailer(mailer){
		
		Driver.resetPasswordMailer(mailer);
		
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
			
			BeforeResend._params = [protocol];
			BeforeForgot._params = [protocol];
			BeforeLogin._params = [protocol];
			BeforeLogout._params = [protocol];
			BeforeRegister._params = [protocol];
			BeforeReset._params = [protocol];
			BeforeVerify._params = [protocol];
		};
		
		if (login === true) {
			
			Route.post('login',[LoginController,'login']).middleware(['guest',BeforeLogin]).name('login');
		};
		
		if (register === true) {
			
			Route.post('register',[RegisterController,'register']).middleware(['guest',BeforeRegister]).name('register');
		};
		
		if (logout === true) {
			
			Route.post('logout',[LogoutController,'logout']).middleware(['auth',BeforeLogout]).name('logout');
		};
		
		if (email === true) {
			
			Route.post('email/verify',[EmailVerificationController,'verify']).name('email.verify').middleware(['signed',BeforeVerify]);
			Route.post('email/resend',[EmailVerificationController,'resend']).name('email.resend').middleware([BeforeResend]);
		};
		
		if (password === true) {
			
			Route.post('password/forgot',[PasswordController,'forgot']).middleware(['guest',BeforeForgot]).name('password.forgot');
			return Route.post('password/reset',[PasswordController,'reset']).middleware(['signed','guest',BeforeReset]).name('password.reset');
		};
	}
};
