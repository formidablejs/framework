
const {isFunction: isFunction,strRandom: strRandom} = require('@formidablejs/helpers'/*$path$*/);
const {Mail: Mail} = require('@formidablejs/mailer'/*$path$*/);
const Database = require('../../Database/Database'/*$path$*/);
const Hash = require('../../Hashing/Hash'/*$path$*/);
const now = require('../../Support/Helpers/now'/*$path$*/);
const PersonalAccessToken = require('../Tokens/PersonalAccessToken'/*$path$*/);
const URL = require('../../Http/URL/URL'/*$path$*/);
const ValidationException = require('../../Validator/Exceptions/ValidationException'/*$path$*/);
const EmailNotVerifiedException = require('../Exceptions/EmailNotVerifiedException'/*$path$*/);
const EmailVerifiedException = require('../Exceptions/EmailVerifiedException'/*$path$*/);

const events = {
	onRegistered: null,
	onAuthenticated: null
};

const mailers = {
	verificationEmail: null,
	resetPasswordMailer: null
};

module.exports = class Driver {
	
	
	constructor(protocol,request,reply,params,config){
		
		this.protocol = protocol;
		this.request = request;
		this.reply = reply;
		this.params = params;
		this.config = config;
	}
	
	/**
	@param {String} token
	*/
	async getPersonalAccessToken(token = null){
		
		return await PersonalAccessToken.find((token !== null && token !== undefined) ? token : this.request.bearerToken());
	}
	
	/**
	@param {Object} body
	*/
	authenticate(body){
		
		return this;
	}
	
	/**
	@param {Object} body
	*/
	register(body){
		
		return this;
	}
	
	/**
	@param {Object} user
	*/
	afterRegistered(user){
		
		if (isFunction(events.onRegistered)) {
			
			return events.onRegistered(this.request,user);
		};
	}
	
	/**
	@param {Object} user
	*/
	afterAuthenticated(user){
		
		if (isFunction(events.onAuthenticated)) {
			
			return events.onAuthenticated(this.request,user);
		};
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
			
			return Mail.to(user.email).send(new (this.getVerificationMailer())(this.request,user));
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
			
			return Mail.to(user.email).send(new (this.getResetPasswordMailer())(this.request,user));
		};
	}
	
	async verifyEmail(){
		
		const email = this.request.query('email');
		
		if (!email) { throw new Error('Email is required.') };
		
		const response = await Database.table(this.getProvider.table).where('email',email).whereNull('email_verified_at').update('email_verified_at',now());
		
		
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
				
				throw new EmailVerifiedException('Email is already verified.');
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
			
			throw new EmailNotVerifiedException('Email is not verified.');
		};
		
		if (user) {
			
			await Database.table('password_resets').where('email',user.email).delete();
			
			
			const token = strRandom(60);
			
			const results = await Database.table('password_resets').insert({
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
		const tokenRequest = await Database.table('password_resets').join(this.getProvider.table,'password_resets.email','=',("" + (this.getProvider.table) + ".email")).where('password_resets.token',token).where('password_resets.email',email).select(
			'users.id',
			'users.password'
		).first();
		
		
		// if token request is not found, return error.
		if (!tokenRequest) {
			
			throw new Error('Invalid password reset token.');
		};
		
		// if token request is found, compare new password with old password
		// and return error if they are the same.
		if (await Hash.check(body.password,tokenRequest.password)) {
			
			throw ValidationException.withMessages({
				password: [
					'Password cannot be the same as the old one.'
				]
			});
		};
		
		// if new password is different from old password, update password.
		const updatedPassword = await Database.table(this.getProvider.table).where('id',tokenRequest.id).update({
			password: await Hash.make(body.password)
		});
		
		
		// if password is not updated, return error.
		if (!updatedPassword) {
			
			throw new Error('Could not update password.');
		};
		
		// if password is updated, delete token request.
		await Database.table('password_resets').where('email',email).delete();
		
		
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
		
		return await PersonalAccessToken.destroy((token !== null && token !== undefined) ? token : this.request.bearerToken());
	}
	
	/**
	@param {String} name
	@param {Number} id
	*/
	async createPersonalAccessToken(name,id){
		
		return await PersonalAccessToken.create(name,id,this.getProvider.table);
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
			
			throw ValidationException.withMessages({
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
		
		return Database.table(self.getProvider.table).insert({
			name: body.name,
			email: body.email,
			password: await Hash.make(body.password)
		}).then(async function([userId]) {
			
			return await Database.table(self.getProvider.table).where('id',userId).first();
		});
	}
	
	/**
	@param {Object} body
	*/
	async findUser(body){
		
		return await Database.table(this.getProvider.table).where('email',body.email).first();
	}
	
	/**
	@param {Object} user
	*/
	async verificationUrl(user){
		
		const clientUrl = this.config.get('app.client_url',this.config.get('app.url'));
		
		const signature = await URL.temporarySignedRoute('email.verify','2h',null,{
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
		
		const signature = await URL.temporarySignedRoute('password.reset','15m',null,{
			email: user.email,
			token: token
		});
		
		return clientUrl + signature;
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
	
	static verificationMailer(mailer){
		
		if (mailers.verificationEmail) {
			
			throw new Error('Verification mailer already set');
		};
		
		return mailers.verificationEmail = mailer;
	}
	
	static resetPasswordMailer(mailer){
		
		if (mailers.resetPasswordMailer) {
			
			throw new Error('Reset password mailer already set');
		};
		
		return mailers.resetPasswordMailer = mailer;
	}
};

