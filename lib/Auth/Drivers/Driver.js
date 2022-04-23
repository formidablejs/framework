function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $15 = Symbol.for('#__initor__'), $16 = Symbol.for('#__inited__'), $14 = Symbol.for('#__hooks__');
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
	onCreateUser: null
};

const mailers = {
	verificationEmail: null,
	resetPasswordMailer: null
};

class Driver {
	
	
	/**
	@param {String} protocol
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
	@param {String} name
	@param {Object} user
	@param {Number|null} ttl
	*/
	async attempt(name,user,ttl = null){
		
		const token = await this.createPersonalAccessToken(name,user.id,ttl);
		
		this.request.request.session.personal_access_token = token;
		
		return await this.getPersonalAccessToken(token);
	}
	
	/**
	@param {String} token
	*/
	async getPersonalAccessToken(token = null){
		
		return await $10.default.find((!($7.default(token))) ? token : this.request.bearerToken(),this.protocol);
	}
	
	/**
	@param {Object} token
	*/
	async usingPersonalAccessToken(token){
		
		return await $10.default.using(token);
	}
	
	verify(){
		
		return null;
	}
	
	/**
	@param {Object} body
	*/
	authenticate(body){
		
		return null;
	}
	
	/**
	@param {Object} body
	*/
	register(body){
		
		return null;
	}
	
	/**
	@param {Object} user
	*/
	afterRegistered(user){
		
		if ($8.default(events.onRegistered)) {
			
			return events.onRegistered(this.request,this.reply,user,this.protocol,this.params);
		};
	}
	
	/**
	@param {Object} user
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
	
	onSuccessfulAuthAttemptEvent(){
		
		return events.onSuccessfulAttempt;
	}
	
	getVerificationMailer(){
		
		return mailers.verificationEmail;
	}
	
	/**
	@param {Object} user
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
	@param {Object} user
	@param {String} token
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
			
			throw new Error('Could not verify email.');
		};
		
		return {status: 'success'};
	}
	
	/**
	@param {Object} body
	*/
	async requestEmailVerificationUrl(body = new Object){
		
		const user = await this.findUser(body);
		
		if (user) {
			
			if (user.email_verified_at) {
				
				throw new $5.default('Email is already verified.');
			};
			
			this.sendVerificationEmail(user);
		};
		
		// we will always return success even if the email was not sent
		// to prevent attackers from knowing if the email was sent or not.
		return {status: 'success'};
	}
	
	/**
	@param {Object} body
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
		
		return {status: 'success'};
	}
	
	/**
	@param {Object} body
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
		
		
		// return success.
		return {status: 'success'};
	}
	
	/**
	@param {Object} body
	*/
	logout(body = new Object){
		
		return this;
	}
	
	/**
	@param {String} token
	@param {Object} body
	*/
	async destroy(token = null,body = new Object){
		
		return await $10.default.destroy((!($7.default(token))) ? token : this.request.bearerToken());
	}
	
	/**
	@param {String} name
	@param {Number} id
	@param {Number|null} ttl
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
	@param {Object} body
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
	@param {Object} body
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
		
		return $2.default.table(self.getProvider.table).insert({
			name: body.name,
			email: body.email,
			password: await $6.default.make(body.password)
		},($3.default.client == 'pg') ? ['id'] : null).then(async function([user]) {
			
			user = (typeof user === 'object' && user.hasOwnProperty('id')) ? user.id : user;
			
			return await $2.default.table(self.getProvider.table).where('id',user).first();
		});
	}
	
	/**
	@param {Object} body
	*/
	async findUser(body){
		
		return await $2.default.table(this.getProvider.table).where('email',body.email).first();
	}
	
	/**
	@param {Object} user
	*/
	async verificationUrl(user){
		
		const clientUrl = this.config.get('app.client_url',this.config.get('app.url'));
		
		const signature = await $12.default.temporarySignedRoute('email.verify','2h',null,{
			email: user.email
		});
		
		return clientUrl + signature;
	}
	
	/**
	@param {Object} user
	@param {String} token
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
	@param {Function} handler
	*/
	static onCreateUser(handler){
		
		if (events.onCreateUser !== null) {
			
			throw new Error('onCreateUser handler is already set.');
			
			return;
		};
		
		return events.onCreateUser = handler;
	}
	
	/**
	@param {Function} handler
	*/
	static onRegistered(handler){
		
		if (events.onRegistered !== null) {
			
			throw new Error('onRegistered handler is already set.');
			
			return;
		};
		
		return events.onRegistered = handler;
	}
	
	/**
	@param {Function} handler
	*/
	static onAuthenticated(handler){
		
		if (events.onAuthenticated !== null) {
			
			throw new Error('onAuthenticated handler is already set.');
			
			return;
		};
		
		return events.onAuthenticated = handler;
	}
	
	/**
	@param {Function} handler
	*/
	static onSessionDestroyed(handler){
		
		if (events.onSessionDestroyed !== null) {
			
			throw new Error('onSessionDestroyed handler is already set.');
			
			return;
		};
		
		return events.onSessionDestroyed = handler;
	}
	
	/**
	@param {Function} handler
	*/
	static onSuccessfulAttempt(handler){
		
		if (events.onSuccessfulAttempt !== null) {
			
			throw new Error('onSuccessfulAttempt handler is already set.');
			
			return;
		};
		
		return events.onSuccessfulAttempt = handler;
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

