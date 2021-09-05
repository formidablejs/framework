const Ψinit = Symbol.for('#init');

const {wildcard: wildcard,dotNotation: dot} = require('@formidablejs/helpers'/*$path$*/);
const Auth = require('../../Auth/Auth'/*$path$*/);
const Validator = require('../../Validator/Validator'/*$path$*/);
const AuthorizationException = require('../../Auth/Exceptions/AuthorizationException'/*$path$*/);

const response = {raw: null};
const options = {rules: null};

module.exports = class FormRequest {
	[Ψinit]($$ = null){
		var φ;
		this.request = ($$ && (φ = $$.request) !== undefined) ? (φ) : {};
		this.route = ($$ && (φ = $$.route) !== undefined) ? (φ) : {};
		this.config = ($$ && (φ = $$.config) !== undefined) ? (φ) : null;
		
	}
	constructor(request,route,raw,config){
		this[Ψinit]();
		this.request = request;
		this.route = route;
		this.config = config;
		
		response.raw = raw;
	}
	
	passesAuthorization(){
		
		if (typeof this.authorize === 'function') { return this.authorize() };
		
		return false;
	}
	
	failedAuthorization(){
		
		throw new AuthorizationException('This action is unauthorized.');
	}
	
	rules(){
		
		return {
			// 
		};
	}
	
	messages(){
		
		return {
			// 
		};
	}
	
	locale(){
		
		return this.request.language.locale;
	}
	
	defaultLocale(){
		
		return this.request.language.fallbackLocale;
	}
	
	/**
	@param {String} locale
	*/
	setLocale(locale){
		
		return this.request.language.setLocale(locale);
	}
	
	/**
	@param {String} locale
	*/
	setFallbackLocale(locale){
		
		return this.request.language.setFallbackLocale(locale);
	}
	
	/**
	@param {String} path
	@param {String} default
	*/
	translate(path,default$){
		
		return this.request.language.get(path,default$);
	}
	
	/**
	@param {String} path
	@param {String} default
	*/
	t(path,default$){
		
		return this.translate(path,default$);
	}
	
	signature(){
		var φ2;
		
		let urlSignature = this.query('signature',null);
		
		if (urlSignature == null || urlSignature == undefined || urlSignature == '') {
			
			urlSignature = ((φ2 = this.param('signature')) != null) ? (φ2) : null;
		};
		
		return urlSignature;
	}
	
	url(){
		
		return this.request.url;
	}
	
	urlWithoutQuery(){
		
		return this.url().includes('?') ? this.url().split('?')[0] : this.url();
	}
	
	urlWithoutSignature(){
		
		return this.signature() ? this.url().split('signature')[0].slice(0,-1) : this.url();
	}
	
	fullUrl(){
		
		return this.header('host') + this.url();
	}
	
	method(){
		
		return this.request.method;
	}
	
	isUrl(path){
		
		return this.url() === '/' + (path.replace(/^\s*\/*\s*|\s*\/*\s*$/gm,''));
	}
	
	isFullUrl(path){
		
		return this.fullUrl() === path.replace(/^\s*\/*\s*|\s*\/*\s*$/gm,'');
	}
	
	/**
	@param {string} method
	*/
	isMethod(method){
		
		return this.method() == method;
	}
	
	headers(){
		
		return this.request.headers;
	}
	
	/**
	@param {string} header
	*/
	hasHeader(header){
		
		return this.headers()[header] ? true : false;
	}
	
	/**
	@param {string} header
	@param {string} value
	*/
	setHeader(header,value){
		
		response.raw.header(header,value);
		
		return this;
	}
	
	/**
	@param {object} headers
	*/
	setHeaders(headers){
		
		const req = this;
		
		Object.keys(headers).forEach(function(value) {
			
			return req.setHeader(value,headers[value]);
		});
		
		return this;
	}
	
	/**
	@param {string} header
	*/
	header(header,default$ = null){
		
		return (this.headers()[header] != null) ? this.headers()[header] : default$;
	}
	
	bearerToken(){
		
		const token = this.header('authorization',new String);
		
		if (token.startsWith('Bearer ')) { return token.split(' ')[1] };
		
		return new String;
	}
	
	getHost(){
		
		return this.header('host');
	}
	
	getFullOrigin(){
		
		return this.header('origin');
	}
	
	getOrigin(){
		
		try {
			
			return this.getFullOrigin().split('://')[1];
		} catch (e) { };
		
		return '';
	}
	
	getOriginProtocol(){
		
		try {
			
			return this.getFullOrigin().split('://')[0] + '://';
		} catch (e) { };
		
		return '';
	}
	
	ip(){
		
		return this.request.ip;
	}
	
	/**
	@param {string} path
	*/
	pathIs(path){
		
		return wildcard(this.route.path,path);
	}
	
	/**
	@param {string} route
	*/
	routeIs(route){
		var φ3;
		
		return wildcard(((φ3 = this.route.name) != null) ? (φ3) : '',route);
	}
	
	/**
	@param {String} name
	*/
	param(name){
		
		return this.request.params[name];
	}
	
	params(){
		
		return this.request.params;
	}
	
	body(){
		
		return (this.request.body !== null) ? this.request.body : {};
	}
	
	all(){
		
		return Object.assign(this.query(),this.body());
	}
	
	/**
	@param {string|null} key
	*/
	input(key = null,default$ = null){
		var φ4;
		
		if (!key && !(default$)) { return this.body() };
		
		return ((φ4 = dot(this.body(),key)) != null) ? (φ4) : default$;
	}
	
	/**
	@param {string} key
	*/
	has(key){
		
		return this.all()[key] ? true : false;
	}
	
	/**
	@param {string} key
	*/
	get(key,default$ = null){
		
		return (this.all()[key] != null) ? this.all()[key] : default$;
	}
	
	/**
	@param {string[]} keys
	*/
	only(keys){
		
		if ((!(Array.isArray(keys)))) {
			
			return [];
		};
		
		let response = {};
		
		keys.forEach(function(key) {
			
			const value = this.all()[key];
			
			if (value) {
				
				return Object.assign(response,{
					[key]: value
				});
			};
		});
		
		return response;
	}
	
	/**
	@param {string|null} key
	*/
	query(key = null,default$ = null){
		
		if ((!key && !(default$))) {
			
			return this.request.query;
		};
		
		let value = this.request.query[key];
		
		value = value ? value.replaceAll(' ','+') : value;
		
		return (value != null) ? value : default$;
	}
	
	expectsJson(){
		
		return wildcard(this.header('accept',''),'*json');
	}
	
	validate(){
		
		return Validator.make(this.input(),this.getRules(),this.messages());
	}
	
	/**
	@param {Array} rules
	*/
	setRules(rules){
		
		if (options.rules !== null) {
			
			throw new Error('FormRequest rules have already been set.');
		};
		
		return options.rules = rules;
	}
	
	getRules(){
		
		return (options.rules === null) ? this.rules() : options.rules;
	}
	
	auth(){
		
		return {
			user: function() { return null; },
			check: function() { return false; },
			can: function() { return false; }
		};
	}
};
