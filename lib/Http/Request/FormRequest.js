function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : a; };
const $16 = Symbol.for('#session'), $17 = Symbol.for('#cookies'), $18 = Symbol.for('#__init__'), $19 = Symbol.for('#__patch__'), $38 = Symbol.for('#__initor__'), $39 = Symbol.for('#__inited__'), $20 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../../Auth/Auth'/*$path$*/));
var $2 = requireDefault$__(require('./Cookies'/*$path$*/));
var $3 = requireDefault$__(require('./Session'/*$path$*/));
var $4 = requireDefault$__(require('../../Support/Helpers/version'/*$path$*/));
var $5 = requireDefault$__(require('../../Support/Helpers/asObject'/*$path$*/));
var $6 = requireDefault$__(require('../../Auth/Exceptions/AuthorizationException'/*$path$*/));
var $7 = requireDefault$__(require('../../Support/Helpers/dotNotation'/*$path$*/));
var $8 = requireDefault$__(require('./FileCollection'/*$path$*/));
var $9 = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));
var $10 = requireDefault$__(require('../../Support/Helpers/isFunction'/*$path$*/));
var $11 = requireDefault$__(require('../../Support/Helpers/isArray'/*$path$*/));
var $12 = requireDefault$__(require('../../Support/Helpers/isString'/*$path$*/));
var $13 = requireDefault$__(require('querystring'/*$path$*/));
var $14 = requireDefault$__(require('../../Validator/Validator'/*$path$*/));
var $15 = requireDefault$__(require('../../Support/Helpers/wildcard'/*$path$*/));
class FormRequest {
	[$19]($$ = {}){
		var $21;
		($21 = $$.req) !== undefined && (this.req = $21);
		($21 = $$.request) !== undefined && (this.request = $21);
		($21 = $$.reply) !== undefined && (this.reply = $21);
		($21 = $$.route) !== undefined && (this.route = $21);
		($21 = $$.config) !== undefined && (this.config = $21);
		($21 = $$[$16]) !== undefined && (this[$16] = $21);
		($21 = $$[$17]) !== undefined && (this[$17] = $21);
		($21 = $$._rules) !== undefined && (this._rules = $21);
		
	}
	[$18]($$ = null,deep = true){
		var $22;
		this.req = $$ ? $$.req : undefined;
		this.request = $$ ? $$.request : undefined;
		this.reply = $$ ? $$.reply : undefined;
		this.route = ($$ && ($22 = $$.route) !== undefined) ? ($22) : {};
		this.config = $$ ? $$.config : undefined;
		this[$16] = $$ ? $$[$16] : undefined;
		this[$17] = $$ ? $$[$17] : undefined;
		this._rules = ($$ && ($22 = $$._rules) !== undefined) ? ($22) : null;
		
	}
	/**
	@param {FastifyRequest} request
	@param {Object} route
	@param {FastifyReply} reply
	@param {Repository} config
	*/
	constructor(request,route = {},reply,config){
		this[$18]();
		this.req = request;
		this.request = request;
		this.reply = reply;
		this.route = route;
		this.config = config;
		this[$16] = new $3.default(request);
		this[$17] = new $2.default(request,reply);
	}
	
	get version(){
		
		return $4.default();
	}
	
	passesAuthorization(){
		
		if (typeof this.authorize === 'function') { return this.authorize() };
		
		return false;
	}
	
	failedAuthorization(){
		
		throw new $6.default('This action is unauthorized.');
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
	
	session(){
		
		return this[$16];
	}
	
	cookies(){
		
		return this[$17];
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
		 * Flash data.
		 */
	
	/**
	*
		 * Flash data.
		 
	@param {String} key
	@param {any} value
	*/
	flash(key,value){
		var $23;
		
		if (!($12.default(key))) { throw TypeError('Expected key to be a string.') };
		
		this.req.session._flashed = Object.assign((($23 = this.req.session._flashed) != null) ? ($23) : {},{
			[key]: value
		});
		
		return this;
	}
	
	/**
		 * Flash many.
		 */
	
	/**
	*
		 * Flash many.
		 
	@param {Object} object
	*/
	flashMany(object){
		
		for (let $24 = 0, $25 = Object.keys(object), $26 = $25.length, key, value; $24 < $26; $24++){
			key = $25[$24];value = object[key];
			this.flash(key,value);
		};
		
		return this;
	}
	
	/**
		 * Get url signature.
		 */
	
	/**
	*
		 * Get url signature.
		 
	*/
	signature(){
		var $27;
		
		let urlSignature = this.query('signature',null);
		
		if (urlSignature == null || urlSignature == undefined || urlSignature == '') {
			
			urlSignature = (($27 = this.param('signature')) != null) ? ($27) : null;
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
		
		return this.signature() ? $13.default.unescape(this.url().split('signature')[0].slice(0,-1)) : this.url();
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
		 * Get request referer.
		 */
	
	/**
	*
		 * Get request referer.
		 
	*/
	referer(){
		
		return this.header('referer',new String);
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
		
		return $15.default(this.route.path,path);
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
		var $28;
		
		return $15.default((($28 = this.route.name) != null) ? ($28) : '',route);
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
		 * Get body input or specified query keys.
		 */
	
	/**
	*
		 * Get body input or specified query keys.
		 
	@param {String[]} keys
	*/
	all(keys = null){
		
		if ($11.default(keys) && !($9.default(keys))) {
			
			const all = Object.assign(this.query(),this.body());
			const res = {};
			
			for (let $29 = 0, $30 = iter$__(keys), $31 = $30.length; $29 < $31; $29++) {
				let key = $30[$29];
				res[key] = all[key];
			};
			
			return res;
		};
		
		return this.body();
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
		var $32;
		
		if (!key && !(default$)) { return this.body() };
		
		return (($32 = $7.default($5.default(this.body()),key)) != null) ? ($32) : default$;
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
		
		if ((!($11.default(keys)))) {
			
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
		 * Get filled input.
		 */
	
	/**
	*
		 * Get filled input.
		 
	@param {String[]} keys
	*/
	filled(keys){
		
		if ($11.default(keys)) { keys = Object.keys(this.body()) };
		
		let filled = {};
		
		for (let $33 = 0, $34 = iter$__(keys), $35 = $34.length; $33 < $35; $33++) {
			let key = $34[$33];
			if (!($9.default(this.get(key)))) {
				
				filled = Object.assign(filled,{
					[key]: this.get(key)
				});
			};
		};
		
		return filled;
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
		var $36;
		
		if ((!key && !(default$))) {
			
			return (($36 = this.request.query) != null) ? ($36) : {};
		};
		
		let value = this.request.query[key];
		
		value = value ? $13.default.unescape(value) : value;
		
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
		
		return (!($9.default(this.request.rawFiles))) ? Object.values(this.request.rawFiles) : [];
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
		
		return (!(($9.default(this.request.rawFiles) && $9.default(this.request.rawFiles[name])))) ? this.request.rawFiles[name] : null;
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
		
		return !($9.default(this.file(name)));
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
		
		return new String(this.header('accept','')).includes('json');
	}
	
	/**
		 * Check if request expects an html response.
		 *
		 * @returns {Boolean}
		 */
	
	/**
	*
		 * Check if request expects an html response.
		 *
		 * @returns {Boolean}
		 
	*/
	expectsHtml(){
		
		return new String(this.header('accept','')).includes('html');
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
		var $37;
		
		const requestRules = $9.default(rules) ? this.getRules() : rules;
		const files = (!($9.default(this.request._rawFiles))) ? this.request._rawFiles : {};
		const body = Object.assign((($37 = this.input()) != null) ? ($37) : {},(files != null) ? files : {});
		
		return $14.default.make(body,requestRules,this.messages());
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
		
		const onRequestAuth = this.request.auth;
		
		if ($10.default(onRequestAuth) && $10.default(onRequestAuth().user) && onRequestAuth().user() !== null) {
			
			return onRequestAuth();
		};
		
		return {
			user: function() { return null; },
			driver: function() { return null; },
			check: function() { return false; },
			can: function(/**@type {String}*/perform) { return false; }
		};
	}
	
	user(){
		
		return this.auth().user();
	}
};
exports.default = FormRequest;
