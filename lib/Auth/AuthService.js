function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('./Tokens/PersonalAccessToken'/*$path$*/));
var $2 = require('@formidablejs/mailer'/*$path$*/);
var $3 = requireDefault$__(require('./Drivers/Driver'/*$path$*/));

var $4 = requireDefault$__(require('./Http/Middleware/BeforeForgot'/*$path$*/));
var $5 = requireDefault$__(require('./Http/Middleware/BeforeLogin'/*$path$*/));
var $6 = requireDefault$__(require('./Http/Middleware/BeforeLogout'/*$path$*/));
var $7 = requireDefault$__(require('./Http/Middleware/BeforeRegister'/*$path$*/));
var $8 = requireDefault$__(require('./Http/Middleware/BeforeResend'/*$path$*/));
var $9 = requireDefault$__(require('./Http/Middleware/BeforeReset'/*$path$*/));
var $10 = requireDefault$__(require('./Http/Middleware/BeforeVerify'/*$path$*/));

var $11 = requireDefault$__(require('./Http/Controllers/EmailVerificationController'/*$path$*/));
var $12 = requireDefault$__(require('./Http/Controllers/LoginController'/*$path$*/));
var $13 = requireDefault$__(require('./Http/Controllers/LogoutController'/*$path$*/));
var $14 = requireDefault$__(require('./Http/Controllers/PasswordController'/*$path$*/));
var $15 = requireDefault$__(require('./Http/Controllers/RegisterController'/*$path$*/));
var $16 = requireDefault$__(require('../Http/Router/Route'/*$path$*/));

class AuthService {
	
	
	/**
	@param {Function} callback
	*/
	static beforeLogin(callback){
		
		$5.default.beforeLogin(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static beforeLogout(callback){
		
		$6.default.beforeLogout(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static beforeRegister(callback){
		
		$7.default.beforeRegister(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static beforeVerify(callback){
		
		$10.default.beforeVerify(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static beforeResend(callback){
		
		$8.default.beforeResend(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static beforeForgot(callback){
		
		$4.default.beforeForgot(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static beforeReset(callback){
		
		$9.default.beforeReset(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static onLogin(callback){
		
		$12.default.onLogin(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static onLogout(callback){
		
		$13.default.onLogout(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static onRegister(callback){
		
		$15.default.onRegister(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static onForgot(callback){
		
		$14.default.onForgot(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static onReset(callback){
		
		$14.default.onReset(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static onAuthenticated(callback){
		
		$3.default.onAuthenticated(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static onFetchAuthenticated(callback){
		
		$1.default.onFetchAuthenticated(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static onSessionDestroyed(callback){
		
		$3.default.onSessionDestroyed(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static onSuccessfulAttempt(callback){
		
		$3.default.onSuccessfulAttempt(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static onCreateUser(callback){
		
		$3.default.onCreateUser(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static onRegistered(callback){
		
		$3.default.onRegistered(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static onVerification(callback){
		
		$11.default.onVerification(callback);
		
		return this;
	}
	
	/**
	@param {Function} callback
	*/
	static onEmailResend(callback){
		
		$11.default.onEmailResend(callback);
		
		return this;
	}
	
	/**
	@param {Mailable} mailer
	*/
	static verificationMailer(mailer){
		
		$3.default.verificationMailer(mailer);
		
		return this;
	}
	
	/**
	@param {Mailable} mailer
	*/
	static resetPasswordMailer(mailer){
		
		$3.default.resetPasswordMailer(mailer);
		
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
			
			$8.default._params = [protocol];
			$4.default._params = [protocol];
			$5.default._params = [protocol];
			$6.default._params = [protocol];
			$7.default._params = [protocol];
			$9.default._params = [protocol];
			$10.default._params = [protocol];
		};
		
		if (login === true) {
			
			$16.default.post('login',[$12.default,'login']).middleware(['guest',$5.default]).name('login');
		};
		
		if (register === true) {
			
			$16.default.post('register',[$15.default,'register']).middleware(['guest',$7.default]).name('register');
		};
		
		if (logout === true) {
			
			$16.default.post('logout',[$13.default,'logout']).middleware(['auth',$6.default]).name('logout');
		};
		
		if (email === true) {
			
			$16.default.post('email/verify',[$11.default,'verify']).name('email.verify').middleware(['signed',$10.default]);
			$16.default.post('email/resend',[$11.default,'resend']).name('email.resend').middleware([$8.default]);
		};
		
		if (password === true) {
			
			$16.default.post('password/forgot',[$14.default,'forgot']).middleware(['guest',$4.default]).name('password.forgot');
			return $16.default.post('password/reset',[$14.default,'reset']).middleware(['signed','guest',$9.default]).name('password.reset');
		};
	}
};
exports.default = AuthService;
