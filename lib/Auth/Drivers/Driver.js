function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('@formidablejs/mailer'/*$path$*/);
var $2 = requireDefault$__(require('../../Database/Database'/*$path$*/));
var $3 = requireDefault$__(require('../../Database/Config'/*$path$*/));
var $4 = requireDefault$__(require('../Exceptions/EmailNotVerifiedException'/*$path$*/));
var $5 = requireDefault$__(require('../Exceptions/EmailVerifiedException'/*$path$*/));
var $6 = requireDefault$__(require('../../Hashing/Hash'/*$path$*/));
var $7 = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));
var $8 = requireDefault$__(require('../../Support/Helpers/isFunction'/*$path$*/));
var $9 = requireDefault$__(require('../../Support/Helpers/now'/*$path$*/));
var $10 = requireDefault$__(require('../Tokens/PersonalAccessToken'/*$path$*/));
var $11 = requireDefault$__(require('../../Support/Helpers/strRandom'/*$path$*/));
var $12 = requireDefault$__(require('../../Http/URL/URL'/*$path$*/));
var $13 = requireDefault$__(require('../../Validator/Exceptions/ValidationException'/*$path$*/));
const events = {
	onRegistered: null,
	onAuthenticated: null,
	onSessionDestroyed: null,
	onSuccessfulAttempt: null,
	onCreateUser: null,
	onEmailVerified: null,
	onRequestEmailVerificationUrl: null,
	onRequestForgotPasswordUrl: null,
	onUpdatePassword: null
};

const mailers = {
	verificationEmail: null,
	resetPasswordMailer: null
};

class Driver {
	
	
	/**
	@param {string} protocol
	@param {Request} request
	@param {FastifyReply} reply
	@param {any[]|null} params
	@param {Repository} config
	*/
	constructor(protocol,request,reply,params,config){
		
		this.protocol = protocol;
		this.request = request;
		this.reply = reply;
		this.params = params;
		this.config = config;
	}
	
	/**
	@param {string} name
	@param {object} user
	@param {number|null} ttl
	*/
	async attempt(name,user,ttl = null){
		
		const token = await this.createPersonalAccessToken(name,user.id,ttl);
		
		this.request.request.session.personal_access_token = token;
		
		return await this.getPersonalAccessToken(token);
	}
	
	/**
	@param {string} token
	*/
	async getPersonalAccessToken(token = null){
		
		return await $10.default.find((!($7.default(token))) ? token : this.request.bearerToken(),this.protocol);
	}
	
	/**
	@param {object} token
	*/
	async usingPersonalAccessToken(token){
		
		return await $10.default.using(token);
	}
	
	verify(){
		
		return null;
	}
	
	/**
	@param {object} body
	*/
	authenticate(body){
		
		return null;
	}
	
	/**
	@param {object} body
	*/
	register(body){
		
		return null;
	}
	
	/**
	@param {object} user
	*/
	afterRegistered(user){
		
		if ($8.default(events.onRegistered)) {
			
			return events.onRegistered(this.request,this.reply,user,this.protocol,this.params);
		};
	}
	
	/**
	@param {object} user
	*/
	afterAuthenticated(user){
		
		if ($8.default(events.onAuthenticated)) {
			
			return events.onAuthenticated(this.request,this.reply,user,this.protocol,this.params);
		};
	}
	
	afterSessionDestroyed(){
		
		if ($8.default(events.onSessionDestroyed)) {
			
			return events.onSessionDestroyed(this.request,this.reply,this.protocol,this.params);
		};
	}
	
	/**
	@param {boolean} verified
	*/
	afterEmailVerified(verified){
		
		if ($8.default(events.onEmailVerified)) {
			
			return events.onEmailVerified(this.request,this.reply,verified,this.protocol,this.params);
		};
	}
	
	afterRequestEmailVerificationUrl(){
		
		if ($8.default(events.onRequestEmailVerificationUrl)) {
			
			return events.onRequestEmailVerificationUrl(this.request,this.reply,this.protocol,this.params);
		};
	}
	
	afterRequestForgotPasswordUrl(){
		
		if ($8.default(events.onRequestForgotPasswordUrl)) {
			
			return events.onRequestForgotPasswordUrl(this.request,this.reply,this.protocol,this.params);
		};
	}
	
	afterUpdatePassword(){
		
		if ($8.default(events.onUpdatePassword)) {
			
			return events.onUpdatePassword(this.request,this.reply,this.protocol,this.params);
		};
	}
	
	onSuccessfulAuthAttemptEvent(){
		
		return events.onSuccessfulAttempt;
	}
	
	getVerificationMailer(){
		
		return mailers.verificationEmail;
	}
	
	/**
	@param {object} user
	*/
	async sendVerificationEmail(user){
		
		if (this.getVerificationMailer()) {
			
			this.request.verificationUrl = await this.verificationUrl(user);
			
			return $1.Mail.to(user.email).send(new (this.getVerificationMailer())(this.request,user));
		};
	}
	
	getResetPasswordMailer(){
		
		return mailers.resetPasswordMailer;
	}
	
	/**
	@param {object} user
	@param {string} token
	*/
	async sendResetPasswordEmail(user,token){
		
		if (this.getResetPasswordMailer()) {
			
			this.request.passwordResetUrl = await this.passwordResetUrl(user,token);
			
			return $1.Mail.to(user.email).send(new (this.getResetPasswordMailer())(this.request,user));
		};
	}
	
	async verifyEmail(){
		
		const email = this.request.query('email');
		
		if (!email) { throw new Error('Email is required.') };
		
		const response = await $2.default.table(this.getProvider.table).where('email',email).whereNull('email_verified_at').update('email_verified_at',$9.default());
		
		
		if (response == null || response == undefined || response == 0) {
			
			const results = await this.afterEmailVerified(false);
			
			if ($7.default(results)) { throw new $4.default('Could not verify email.') };
			
			return results;
		};
		
		const results = await this.afterEmailVerified(true);
		
		return $7.default(results) ? {status: 'success'} : results;
	}
	
	/**
	@param {object} body
	*/
	async requestEmailVerificationUrl(body = new Object){
		
		const user = await this.findUser(body);
		
		if (user) {
			
			if (user.email_verified_at) {
				
				throw new $5.default('Email is already verified.');
			};
			
			this.sendVerificationEmail(user);
		};
		
		const results = await this.afterRequestEmailVerificationUrl();
		
		// we will always return success even if the email was not sent
		// to prevent attackers from knowing if the email was sent or not.
		return $7.default(results) ? {status: 'success'} : results;
	}
	
	/**
	@param {object} body
	*/
	async requestForgotPasswordUrl(body = new Object){
		
		const user = await this.findUser(body);
		
		if (user && !user.email_verified_at) {
			
			throw new $4.default('Email is not verified.');
		};
		
		if (user) {
			
			await $2.default.table('password_resets').where('email',user.email).delete();
			
			
			const token = $11.default(60);
			
			const results = await $2.default.table('password_resets').insert({
				email: user.email,
				token: token
			});
			
			
			if (!results) {
				
				throw new Error('Could not create password reset token.');
			};
			
			this.sendResetPasswordEmail(user,token);
		};
		
		const results = await this.afterRequestForgotPasswordUrl();
		
		return $7.default(results) ? {status: 'success'} : results;
	}
	
	/**
	@param {object} body
	*/
	async updatePassword(body = new Object){
		
		// get email and token from url.
		const email = this.request.query('email');
		const token = this.request.query('token');
		
		// get token request/record from database.
		const tokenRequest = await $2.default.table('password_resets').join(this.getProvider.table,'password_resets.email','=',("" + (this.getProvider.table) + ".email")).where('password_resets.token',token).where('password_resets.email',email).select(
			'users.id',
			'users.password'
		).first();
		
		
		// if token request is not found, return error.
		if (!tokenRequest) {
			
			throw new Error('Invalid password reset token.');
		};
		
		// if token request is found, compare new password with old password
		// and return error if they are the same.
		if (await $6.default.check(body.password,tokenRequest.password)) {
			
			throw $13.default.withMessages({
				password: [
					'Password cannot be the same as the old one.'
				]
			});
		};
		
		// if new password is different from old password, update password.
		const updatedPassword = await $2.default.table(this.getProvider.table).where('id',tokenRequest.id).update({
			password: await $6.default.make(body.password)
		});
		
		
		// if password is not updated, return error.
		if (!updatedPassword) {
			
			throw new Error('Could not update password.');
		};
		
		// if password is updated, delete token request.
		await $2.default.table('password_resets').where('email',email).delete();
		
		
		const results = await this.afterUpdatePassword();
		
		return $7.default(results) ? {status: 'success'} : results;
	}
	
	/**
	@param {object} body
	*/
	logout(body = new Object){
		
		return this;
	}
	
	/**
	@param {string} token
	@param {object} body
	*/
	async destroy(token = null,body = new Object){
		
		return await $10.default.destroy((!($7.default(token))) ? token : this.request.bearerToken());
	}
	
	/**
	@param {string} name
	@param {number} id
	@param {number|null} ttl
	*/
	async createPersonalAccessToken(name,id,ttl = null){
		
		return await $10.default.create(name,id,this.getProvider.table,['*'],ttl,{
			protocol: this.protocol,
			ip_address: this.request.ip() || null,
			user_agent: this.request.header('user-agent',null)
		});
	}
	
	get getProvider(){
		
		const protocol = this.config.get(("auth.protocols." + (this.protocol)));
		
		return this.config.get(("auth.providers." + (protocol.provider)));
	}
	
	/**
	@param {object} body
	*/
	async insertUser(body){
		
		let user = await this.findUser(body);
		
		if (user !== undefined) {
			
			throw $13.default.withMessages({
				email: [
					"The email is already taken."
				]
			});
		};
		
		return await this.createUser(body);
	}
	
	/**
	@param {object} body
	*/
	async createUser(body){
		var self = this;
		
		if (events.onCreateUser !== null) {
			
			return events.onCreateUser(
				this.request,
				body,
				this.getProvider.table
			);
		};
		
		return $2.default.table(this.getProvider.table).insert({
			name: body.name,
			email: body.email,
			password: await $6.default.make(body.password)
		},($3.default.client == 'pg') ? ['id'] : null).then(async function([user]) {
			
			user = (typeof user === 'object' && user.hasOwnProperty('id')) ? user.id : user;
			
			return await $2.default.table(self.getProvider.table).where('id',user).first();
		});
	}
	
	/**
	@param {object} body
	*/
	async findUser(body){
		
		return await $2.default.table(this.getProvider.table).where('email',body.email).first();
	}
	
	/**
	@param {object} user
	*/
	async verificationUrl(user){
		
		const clientUrl = this.config.get('app.client_url',this.config.get('app.url'));
		
		const signature = await $12.default.temporarySignedRoute('email.verify','2h',null,{
			email: user.email
		});
		
		return clientUrl + signature;
	}
	
	/**
	@param {object} user
	@param {string} token
	*/
	async passwordResetUrl(user,token){
		
		const clientUrl = this.config.get('app.client_url',this.config.get('app.url'));
		
		const signature = await $12.default.temporarySignedRoute('password.reset','15m',null,{
			email: user.email,
			token: token
		});
		
		return clientUrl + signature;
	}
	
	/**
	@param {function} handler
	*/
	static onEmailVerified(handler){
		
		if (events.onEmailVerified !== null) {
			
			throw new Error('onEmailVerified handler is already set.');
			
			return;
		};
		
		return events.onEmailVerified = handler;
	}
	
	/**
	@param {function} handler
	*/
	static onCreateUser(handler){
		
		if (events.onCreateUser !== null) {
			
			throw new Error('onCreateUser handler is already set.');
			
			return;
		};
		
		return events.onCreateUser = handler;
	}
	
	/**
	@param {function} handler
	*/
	static onRegistered(handler){
		
		if (events.onRegistered !== null) {
			
			throw new Error('onRegistered handler is already set.');
			
			return;
		};
		
		return events.onRegistered = handler;
	}
	
	/**
	@param {function} handler
	*/
	static onAuthenticated(handler){
		
		if (events.onAuthenticated !== null) {
			
			throw new Error('onAuthenticated handler is already set.');
			
			return;
		};
		
		return events.onAuthenticated = handler;
	}
	
	/**
	@param {function} handler
	*/
	static onSessionDestroyed(handler){
		
		if (events.onSessionDestroyed !== null) {
			
			throw new Error('onSessionDestroyed handler is already set.');
			
			return;
		};
		
		return events.onSessionDestroyed = handler;
	}
	
	/**
	@param {function} handler
	*/
	static onSuccessfulAttempt(handler){
		
		if (events.onSuccessfulAttempt !== null) {
			
			throw new Error('onSuccessfulAttempt handler is already set.');
			
			return;
		};
		
		return events.onSuccessfulAttempt = handler;
	}
	
	/**
	@param {function} handler
	*/
	static onRequestEmailVerificationUrl(handler){
		
		if (events.onRequestEmailVerificationUrl !== null) {
			
			throw new Error('onRequestEmailVerificationUrl handler is already set.');
			
			return;
		};
		
		return events.onRequestEmailVerificationUrl = handler;
	}
	
	/**
	@param {function} handler
	*/
	static onRequestForgotPasswordUrl(handler){
		
		if (events.onRequestForgotPasswordUrl !== null) {
			
			throw new Error('onRequestForgotPasswordUrl handler is already set.');
			
			return;
		};
		
		return events.onRequestForgotPasswordUrl = handler;
	}
	
	/**
	@param {function} handler
	*/
	static onUpdatePassword(handler){
		
		if (events.onUpdatePassword !== null) {
			
			throw new Error('onUpdatePassword handler is already set.');
			
			return;
		};
		
		return events.onUpdatePassword = handler;
	}
	
	/**
	@param {Mailable} mailer
	*/
	static verificationMailer(mailer){
		
		if (mailers.verificationEmail) {
			
			throw new Error('Verification mailer already set');
		};
		
		return mailers.verificationEmail = mailer;
	}
	
	/**
	@param {Mailable} mailer
	*/
	static resetPasswordMailer(mailer){
		
		if (mailers.resetPasswordMailer) {
			
			throw new Error('Reset password mailer already set');
		};
		
		return mailers.resetPasswordMailer = mailer;
	}
};
exports.default = Driver;

