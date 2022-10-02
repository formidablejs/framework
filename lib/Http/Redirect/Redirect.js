function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('../../Support/Helpers/index'/*$path$*/);
var $2 = requireDefault$__(require('../URL/URL'/*$path$*/));

class Redirect {
	[$__patch__$]($$ = {}){
		var $3;
		($3 = $$.path) !== undefined && (this.path = $3);
		($3 = $$.statusCode) !== undefined && (this.statusCode = $3);
		($3 = $$._flashed) !== undefined && (this._flashed = $3);
		
	}
	[$__init__$]($$ = null,deep = true){
		var $4;
		this.path = $$ ? $$.path : undefined;
		this.statusCode = $$ ? $$.statusCode : undefined;
		this._flashed = ($$ && ($4 = $$._flashed) !== undefined) ? ($4) : {};
		
	}
	/**
	@param {string} path
	@param {number} statusCode
	*/
	constructor(path,statusCode = 302){
		this[$__init__$]();
		this.path = path;
		this.statusCode = statusCode;
	}
	
	/**
	@param {string} path
	*/
	static to(path){
		
		return new this(path);
	}
	
	/**
	@param {number|null} statucCode
	*/
	static back(statucCode = 302){
		
		return new this(null,statucCode);
	}
	
	/**
	@param {string} name
	@param {object} params
	*/
	static route(name,params = {}){
		
		return new this($2.default.route(name,params));
	}
	
	/**
	@param {string} key
	@param {any} value
	*/
	with(key,value){
		
		this._flashed = Object.assign(this._flashed,{
			[key]: value
		});
		
		return this;
	}
	
	hasFlash(){
		
		return !($1.isEmpty(this._flashed));
	}
	
	flashed(){
		
		return this._flashed;
	}
	
	/**
	@param {number} statusCode
	*/
	code(statusCode){
		
		this.statusCode = statusCode;
		
		return this;
	}
	
	handle(request,reply){
		
		if ($1.isEmpty(this.path)) { this.path = request.header('referer') };
		
		if (this.hasFlash()) { request.flashMany(this.flashed()) };
		
		return reply.code(this.statusCode).redirect(this.path);
	}
};
exports.default = Redirect;
