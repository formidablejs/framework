function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$versionφ = requireDefault$__(require('../../Support/Helpers/version'/*$path$*/));
var _$asObjectφ = requireDefault$__(require('../../Support/Helpers/asObject'/*$path$*/));
var _$AuthorizationExceptionφ = requireDefault$__(require('../../Auth/Exceptions/AuthorizationException'/*$path$*/));
var _$dotNotationφ = requireDefault$__(require('../../Support/Helpers/dotNotation'/*$path$*/));
var _$FileCollectionφ = requireDefault$__(require('./FileCollection'/*$path$*/));
var _$isEmptyφ = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));
var _$querystringφ = requireDefault$__(require('querystring'/*$path$*/));
var _$Validatorφ = requireDefault$__(require('../../Validator/Validator'/*$path$*/));
var _$wildcardφ = requireDefault$__(require('../../Support/Helpers/wildcard'/*$path$*/));
class FormRequest {
	[Ψ__init__]($$ = null){
		var vφ;
		this.req = $$ ? $$.req : undefined;
		this.request = $$ ? $$.request : undefined;
		this.reply = $$ ? $$.reply : undefined;
		this.route = ($$ && (vφ = $$.route) !== undefined) ? (vφ) : {};
		this.config = $$ ? $$.config : undefined;
		this._rules = ($$ && (vφ = $$._rules) !== undefined) ? (vφ) : null;
		
	}
	/**
	@param {FastifyRequest} request
	@param {Object} route
	@param {FastifyReply} reply
	@param {Repository} config
	*/
	constructor(request,route = {},reply,config){
		this[Ψ__init__]();
		this.req = request;
		this.request = request;
		this.reply = reply;
		this.route = route;
		this.config = config;
	}
	
	get version(){
		
		return _$versionφ.default();
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
	
	/**
		 * Get request locale.
		 */
	
	/**
	*
		 * Get request locale.
		 
	*/
	locale(){
		
		return this.request.language.locale;
	}
	
	/**
		 * Get request default locale.
		 */
	
	/**
	*
		 * Get request default locale.
		 
	*/
	defaultLocale(){
		
		return this.request.language.fallbackLocale;
	}
	
	/**
		 * Set locale.
		 */
	
	/**
	*
		 * Set locale.
		 
	@param {String} locale
	*/
	setLocale(locale){
		
		return this.request.language.setLocale(locale);
	}
	
	/**
		 * Set fallback locale.
		 */
	
	/**
	*
		 * Set fallback locale.
		 
	@param {String} locale
	*/
	setFallbackLocale(locale){
		
		return this.request.language.setFallbackLocale(locale);
	}
	
	/**
		 * Translate text.
		 */
	
	/**
	*
		 * Translate text.
		 
	@param {String} path
	@param {String} default
	*/
	translate(path,default$){
		
		return this.request.language.get(path,default$);
	}
	
	/**
		 * Translate text.
		 */
	
	/**
	*
		 * Translate text.
		 
	@param {String} path
	@param {String} default
	*/
	t(path,default$){
		
		return this.translate(path,default$);
	}
	
	/**
		 * Translate text.
		 */
	
	/**
	*
		 * Translate text.
		 
	@param {String} path
	@param {String} default
	*/
	__(path,default$){
		
		return this.translate(path,default$);
	}
	
	/**
		 * Get url signature.
		 */
	
	/**
	*
		 * Get url signature.
		 
	*/
	signature(){
		var φ;
		
		let urlSignature = this.query('signature',null);
		
		if (urlSignature == null || urlSignature == undefined || urlSignature == '') {
			
			urlSignature = ((φ = this.param('signature')) != null) ? (φ) : null;
		};
		
		return urlSignature;
	}
	
	/**
		 * Get request url.
		 */
	
	/**
	*
		 * Get request url.
		 
	*/
	url(){
		
		return this.request.url;
	}
	
	/**
		 * Get request url without query.
		 */
	
	/**
	*
		 * Get request url without query.
		 
	*/
	urlWithoutQuery(){
		
		return this.url().includes('?') ? this.url().split('?')[0] : this.url();
	}
	
	/**
		 * Get request url without signature.
		 */
	
	/**
	*
		 * Get request url without signature.
		 
	*/
	urlWithoutSignature(){
		
		return this.signature() ? _$querystringφ.default.unescape(this.url().split('signature')[0].slice(0,-1)) : this.url();
	}
	
	/**
		 * Get full request url.
		 */
	
	/**
	*
		 * Get full request url.
		 
	*/
	fullUrl(){
		
		return this.header('host') + this.url();
	}
	
	/**
		 * Get request method.
		 */
	
	/**
	*
		 * Get request method.
		 
	*/
	method(){
		
		return this.request.method;
	}
	
	/**
		 * Check if path matches current request path.
		 */
	
	/**
	*
		 * Check if path matches current request path.
		 
	*/
	isUrl(path){
		
		return this.url() === '/' + (path.replace(/^\s*\/*\s*|\s*\/*\s*$/gm,''));
	}
	
	/**
		 * Check if path matches current request path.
		 */
	
	/**
	*
		 * Check if path matches current request path.
		 
	*/
	isFullUrl(path){
		
		return this.fullUrl() === path.replace(/^\s*\/*\s*|\s*\/*\s*$/gm,'');
	}
	
	/**
		 * Check if method matches current request method.
		 */
	
	/**
	*
		 * Check if method matches current request method.
		 
	@param {string} method
	*/
	isMethod(method){
		
		return this.method().toLowerCase() == method.toLowerCase();
	}
	
	/**
		 * Get request headers.
		 */
	
	/**
	*
		 * Get request headers.
		 
	*/
	headers(){
		
		return this.request.headers;
	}
	
	/**
		 * Check if header is present.
		 */
	
	/**
	*
		 * Check if header is present.
		 
	@param {string} header
	*/
	hasHeader(header){
		
		return this.headers()[header.toLowerCase()] ? true : false;
	}
	
	/**
		 * Set request header.
		 */
	
	/**
	*
		 * Set request header.
		 
	@param {string} header
	@param {string} value
	*/
	setHeader(header,value){
		
		this.reply.header(header,value);
		
		return this;
	}
	
	/**
		 * Set request headers.
		 */
	
	/**
	*
		 * Set request headers.
		 
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
		 * Get specified header.
		 */
	
	/**
	*
		 * Get specified header.
		 
	@param {string} header
	*/
	header(header,default$ = null){
		
		return (this.headers()[header] != null) ? this.headers()[header] : default$;
	}
	
	/**
		 * Get bearer token used to authenticate current request.
		 */
	
	/**
	*
		 * Get bearer token used to authenticate current request.
		 
	*/
	bearerToken(){
		
		const token = this.header('authorization',new String);
		
		return token.startsWith('Bearer ') ? token.split(' ')[1] : (new String);
	}
	
	/**
		 * Get request host.
		 */
	
	/**
	*
		 * Get request host.
		 
	*/
	getHost(){
		
		return this.header('host');
	}
	
	/**
		 * Get full request host.
		 */
	
	/**
	*
		 * Get full request host.
		 
	*/
	getFullOrigin(){
		
		return this.header('origin');
	}
	
	/**
		 * Get request origin.
		 */
	
	/**
	*
		 * Get request origin.
		 
	*/
	getOrigin(){
		
		try {
			
			return this.getFullOrigin().split('://')[1];
		} catch (e) { };
		
		return '';
	}
	
	/**
		 * Get request origin protocol.
		 */
	
	/**
	*
		 * Get request origin protocol.
		 
	*/
	getOriginProtocol(){
		
		try {
			
			return this.getFullOrigin().split('://')[0] + '://';
		} catch (e) { };
		
		return '';
	}
	
	/**
		 * Get request ip address.
		 */
	
	/**
	*
		 * Get request ip address.
		 
	*/
	ip(){
		
		return this.request.ip;
	}
	
	/**
		 * Check if path matches.
		 */
	
	/**
	*
		 * Check if path matches.
		 
	@param {string} path
	*/
	pathIs(path){
		
		return _$wildcardφ.default(this.route.path,path);
	}
	
	/**
		 * Check if request matches specified route.
		 */
	
	/**
	*
		 * Check if request matches specified route.
		 
	@param {string} route
	*/
	routeIs(route){
		var φ2;
		
		return _$wildcardφ.default(((φ2 = this.route.name) != null) ? (φ2) : '',route);
	}
	
	/**
		 * Get url param.
		 */
	
	/**
	*
		 * Get url param.
		 
	@param {String} name
	*/
	param(name){
		
		return this.request.params[name];
	}
	
	/**
		 * Get all url params.
		 */
	
	/**
	*
		 * Get all url params.
		 
	*/
	params(){
		
		return this.request.params;
	}
	
	/**
		 * Get request body.
		 */
	
	/**
	*
		 * Get request body.
		 
	*/
	body(){
		
		return (this.request.body !== null) ? this.request.body : {};
	}
	
	/**
		 * Get all query and body input.
		 */
	
	/**
	*
		 * Get all query and body input.
		 
	*/
	all(){
		
		return Object.assign(this.query(),this.body());
	}
	
	/**
		 * Get specified input from body.
		 */
	
	/**
	*
		 * Get specified input from body.
		 
	@param {string|null} key
	*/
	input(key = null,default$ = null){
		var φ3;
		
		if (!key && !(default$)) { return this.body() };
		
		return ((φ3 = _$dotNotationφ.default(_$asObjectφ.default(this.body()),key)) != null) ? (φ3) : default$;
	}
	
	/**
		 * Check body/query has key.
		 */
	
	/**
	*
		 * Check body/query has key.
		 
	@param {string} key
	*/
	has(key){
		
		return this.all()[key] ? true : false;
	}
	
	/**
		 * Get key from body/query.
		 */
	
	/**
	*
		 * Get key from body/query.
		 
	@param {string} key
	*/
	get(key,default$ = null){
		
		return (this.all()[key] != null) ? this.all()[key] : default$;
	}
	
	/**
		 * Get specified keys from request.
		 */
	
	/**
	*
		 * Get specified keys from request.
		 
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
		 * Get specified query.
		 */
	
	/**
	*
		 * Get specified query.
		 
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
	
	/**
		 * Get files.
		 *
		 * @returns {FileCollection[]|[]}
		 */
	
	/**
	*
		 * Get files.
		 *
		 * @returns {FileCollection[]|[]}
		 
	*/
	files(){
		
		return (!(_$isEmptyφ.default(this.request.rawFiles))) ? Object.values(this.request.rawFiles) : [];
	}
	
	/**
		 * Get file.
		 *
		 * @returns {FileCollection|null}
		 */
	
	/**
	*
		 * Get file.
		 *
		 * @returns {FileCollection|null}
		 
	@param {String} name
	*/
	file(name){
		
		return (!((_$isEmptyφ.default(this.request.rawFiles) && _$isEmptyφ.default(this.request.rawFiles[name])))) ? this.request.rawFiles[name] : null;
	}
	
	/**
		 * Check if request has file.
		 *
		 * @returns {Boolean}
		 */
	
	/**
	*
		 * Check if request has file.
		 *
		 * @returns {Boolean}
		 
	@param {String} name
	*/
	hasFile(name){
		
		return !(_$isEmptyφ.default(this.file(name)));
	}
	
	/**
		 * Check if request expects a json response.
		 *
		 * @returns {Boolean}
		 */
	
	/**
	*
		 * Check if request expects a json response.
		 *
		 * @returns {Boolean}
		 
	*/
	expectsJson(){
		
		return _$wildcardφ.default(this.header('accept',''),'*json');
	}
	
	/**
		 * Validate a request using specified rules.
		 */
	
	/**
	*
		 * Validate a request using specified rules.
		 
	@param {Object|null} rules
	*/
	validate(rules = null){
		var φ4;
		
		const requestRules = _$isEmptyφ.default(rules) ? this.getRules() : rules;
		const files = (!(_$isEmptyφ.default(this.request._rawFiles))) ? this.request._rawFiles : {};
		const body = Object.assign(((φ4 = this.input()) != null) ? (φ4) : {},(files != null) ? files : {});
		
		return _$Validatorφ.default.make(body,requestRules,this.messages());
	}
	
	/**
		 * Set request rules.
		 *
		 * @param {Object} rules
		 * @returns {FormRequest}
		 */
	
	/**
	*
		 * Set request rules.
		 *
		 * @param {Object} rules
		 * @returns {FormRequest}
		 
	@param {Object} rules
	*/
	setRules(rules){
		
		if (this._rules !== null) {
			
			throw new Error('FormRequest rules have already been set.');
		};
		
		this._rules = rules;
		
		return this;
	}
	
	/**
		 * Get request rules.
		 *
		 * @returns {Object}
		 */
	
	/**
	*
		 * Get request rules.
		 *
		 * @returns {Object}
		 
	*/
	getRules(){
		
		return (this._rules === null) ? this.rules() : this._rules;
	}
	
	/**
		 * Get currently authenticated user.
		 */
	
	/**
	*
		 * Get currently authenticated user.
		 
	*/
	auth(){
		
		return {
			user: function() { return null; },
			check: function() { return false; },
			can: function(/**@type {String}*/perform) { return false; }
		};
	}
};
exports.default = FormRequest;
