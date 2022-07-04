const $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('../../Support/Helpers'/*$path$*/);
var $2 = require('../../Support/Helpers'/*$path$*/);
var $3 = require('../../Support/Helpers'/*$path$*/);
class ViewResponse {
	[$__patch__$]($$ = {}){
		var $4;
		($4 = $$.view) !== undefined && (this.view = $4);
		($4 = $$.statusCode) !== undefined && (this.statusCode = $4);
		
	}
	[$__init__$]($$ = null,deep = true){
		var $5;
		this.view = $$ ? $$.view : undefined;
		this.statusCode = ($$ && ($5 = $$.statusCode) !== undefined) ? ($5) : 200;
		
	}
	/**
	@param {View} view
	@param {Object|null} data
	@param {Number} statusCode
	*/
	constructor(view,data = null,statusCode = 200){
		this[$__init__$]();
		this.view = new view(data || {});
		this.statusCode = statusCode;
	}
	
	/**
	@param {View} view
	@param {Object|null} data
	@param {Number} statusCode
	*/
	static make(view,data = null,statusCode = 200){
		
		return new ViewResponse(view,data || {},statusCode);
	}
	
	/**
	@param {Number} statusCode
	*/
	code(statusCode){
		
		return this.statusCode = statusCode;
	}
	
	/**
	@param {FormRequest} request
	@param {FastifyReply} reply
	*/
	async toView(request,reply){
		var $6, $7, $8, $9;
		
		const oldData = (!($2.isEmpty(request.req.session._flashed))) ? (((($6 = request.req.session._flashed._old) != null) ? ($6) : {})) : {};
		const token = (!($2.isEmpty(request.req.session)) && !($2.isEmpty(request.req.session.token))) ? $1.encrypt(request.req.session.token) : null;
		
		this.view.setLanguage(request.request.language).setData({
			locale: request.locale(),
			csrf_token: token,
			_flashed: $3.without((($7 = request.req.session._flashed) != null) ? ($7) : {},['_old']),
			_old: (($8 = $3.without(oldData,['_token'])) != null) ? ($8) : {}
		});
		
		
		((($9 = request.req.session._flashed),delete request.req.session._flashed, $9));
		
		const output = await this.view.make();
		
		return reply.code(this.statusCode).type('text/html').send(output).sent = true;
	}
};
exports.default = ViewResponse;
