function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$AuthorizationExceptionφ = requireDefault$__(require('../../Auth/Exceptions/AuthorizationException'/*$path$*/));
var _$dotNotationφ = requireDefault$__(require('../../Support/Helpers/dotNotation'/*$path$*/));
var _$querystringφ = requireDefault$__(require('querystring'/*$path$*/));
var _$Validatorφ = requireDefault$__(require('../../Validator/Validator'/*$path$*/));
var _$wildcardφ = requireDefault$__(require('../../Support/Helpers/wildcard'/*$path$*/));

const response = {raw: null};
const options = {rules: null};

class FormRequest {
	[Ψ__init__]($$ = null){
		var vφ;
		this.request = $$ ? $$.request : undefined;
		this.route = ($$ && (vφ = $$.route) !== undefined) ? (vφ) : {};
		this.config = $$ ? $$.config : undefined;
		
	}
	/**
	@param {FastifyRequest} request
	@param {Repository} config
	*/
	constructor(request,route,raw,config){
		this[Ψ__init__]();
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
		
		throw new _$AuthorizationExceptionφ.default('This action is unauthorized.');
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
	
	/**
	@param {String} path
	@param {String} default
	*/
	__(path,default$){
		
		return this.translate(path,default$);
	}
	
	signature(){
		var φ;
		
		let urlSignature = this.query('signature',null);
		
		if (urlSignature == null || urlSignature == undefined || urlSignature == '') {
			
			urlSignature = ((φ = this.param('signature')) != null) ? (φ) : null;
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
		
		return this.signature() ? _$querystringφ.default.unescape(this.url().split('signature')[0].slice(0,-1)) : this.url();
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
		
		return _$wildcardφ.default(this.route.path,path);
	}
	
	/**
	@param {string} route
	*/
	routeIs(route){
		var φ2;
		
		return _$wildcardφ.default(((φ2 = this.route.name) != null) ? (φ2) : '',route);
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
		var φ3;
		
		if (!key && !(default$)) { return this.body() };
		
		return ((φ3 = _$dotNotationφ.default(this.body(),key)) != null) ? (φ3) : default$;
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
		
		value = value ? _$querystringφ.default.unescape(value) : value;
		
		return (value != null) ? value : default$;
	}
	
	expectsJson(){
		
		return _$wildcardφ.default(this.header('accept',''),'*json');
	}
	
	validate(){
		
		return _$Validatorφ.default.make(this.input(),this.getRules(),this.messages());
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
			can: function(/**@type {String}*/perform) { return false; }
		};
	}
};
exports.default = FormRequest;
