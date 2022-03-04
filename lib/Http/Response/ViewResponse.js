const $4 = Symbol.for('#__init__'), $11 = Symbol.for('#__initor__'), $12 = Symbol.for('#__inited__'), $5 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('../../Support/Helpers'/*$path$*/);
var $2 = require('../../Support/Helpers'/*$path$*/);
var $3 = require('../../Support/Helpers'/*$path$*/);
class ViewResponse {
	[$4]($$ = null){
		var $6;
		this.view = $$ ? $$.view : undefined;
		this.statusCode = ($$ && ($6 = $$.statusCode) !== undefined) ? ($6) : 200;
		
	}
	/**
	@param {View} view
	@param {Object|null} data
	@param {Number} statusCode
	*/
	constructor(view,data = null,statusCode = 200){
		this[$4]();
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
		var $7, $8, $9, $10;
		
		const oldData = (!($2.isEmpty(request.req.session._flashed))) ? (((($7 = request.req.session._flashed._old) != null) ? ($7) : {})) : {};
		const token = (!($2.isEmpty(request.req.session)) && !($2.isEmpty(request.req.session.token))) ? $1.encrypt(request.req.session.token) : null;
		
		this.view.setData({
			locale: request.locale(),
			csrf_token: token,
			_flashed: $3.without((($8 = request.req.session._flashed) != null) ? ($8) : {},['_old']),
			_old: (($9 = $3.without(oldData,['_token'])) != null) ? ($9) : {}
		});
		
		((($10 = request.req.session._flashed),delete request.req.session._flashed, $10));
		
		const output = await this.view.make();
		
		return reply.code(this.statusCode).type('text/html').send(output).sent = true;
	}
};
exports.default = ViewResponse;

