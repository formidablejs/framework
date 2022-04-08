function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : a; };
const $7 = Symbol.for('#__init__'), $8 = Symbol.for('#__patch__'), $14 = Symbol.for('#__initor__'), $15 = Symbol.for('#__inited__'), $9 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../../Http/Kernel/resolveResponse'/*$path$*/));
var $2 = requireDefault$__(require('./ExitHandlerException'/*$path$*/));
var $3 = requireDefault$__(require('../../Support/Helpers/isArray'/*$path$*/));
var $4 = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));
var $5 = requireDefault$__(require('../../Http/Exceptions/HttpException'/*$path$*/));
var $6 = require('./Handler/handleException'/*$path$*/);
class Handler {
	[$8]($$ = {}){
		var $10;
		($10 = $$.config) !== undefined && (this.config = $10);
		
	}
	[$7]($$ = null){
		this.config = $$ ? $$.config : undefined;
		
	}
	get dontReport(){
		
		return [
			$5.default
		];
	}
	
	/**
	@param {Repository} config
	*/
	constructor(config){
		this[$7]();
		this.config = config;
		
		$6.setConfig(this.config);
	}
	
	/**
	@param {Error|ApplicationException|HttpException} error
	@param {FormRequest} request
	@param {FastifyReply} reply
	*/
	async beforeHandle(error,request,reply){
		
		const resutls = this.handle(error,request,reply,this.shouldReport(error));
		
		if (!($4.default(resutls))) {
			
			return $1.default(resutls,request,reply,true);
		} else if (error instanceof $2.default) {
			
			let handler;
			
			if (error.response.constructor.name == 'AsyncFunction') {
				
				handler = await error.response();
			} else if (typeof error.response == 'function') {
				
				handler = error.response();
			} else {
				
				handler = error.response;
			};
			
			return $1.default(handler,request,reply,true);
		} else {
			
			return $6.handleException(error,request,reply,false,this.shouldReport(error));
		};
	}
	
	/**
	@param {Error|ApplicationException|HttpException} error
	@param {FormRequest} request
	@param {FastifyReply} reply
	@param {Boolean} shouldReport
	*/
	handle(error,request,reply,shouldReport){
		
		return null;
	}
	
	/**
	@param {Error} error
	*/
	shouldReport(error){
		
		if (!($4.default(this.dontReport)) && $3.default(this.dontReport)) {
			
			for (let $11 = 0, $12 = iter$__(this.dontReport), $13 = $12.length; $11 < $13; $11++) {
				let exception = $12[$11];
				if (error instanceof exception) { return false };
			};
		};
		
		return true;
	}
};
exports.default = Handler;
