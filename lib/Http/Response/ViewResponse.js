const $4 = Symbol.for('#__init__'), $5 = Symbol.for('#__patch__'), $13 = Symbol.for('#__initor__'), $14 = Symbol.for('#__inited__'), $6 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('../../Support/Helpers'/*$path$*/);
var $2 = require('../../Support/Helpers'/*$path$*/);
var $3 = require('../../Support/Helpers'/*$path$*/);
class ViewResponse {
	[$5]($$ = {}){
		var $7;
		($7 = $$.view) !== undefined && (this.view = $7);
		($7 = $$.statusCode) !== undefined && (this.statusCode = $7);
		
	}
	[$4]($$ = null){
		var $8;
		this.view = $$ ? $$.view : undefined;
		this.statusCode = ($$ && ($8 = $$.statusCode) !== undefined) ? ($8) : 200;
		
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
		var $9, $10, $11, $12;
		
		const oldData = (!($2.isEmpty(request.req.session._flashed))) ? (((($9 = request.req.session._flashed._old) != null) ? ($9) : {})) : {};
		const token = (!($2.isEmpty(request.req.session)) && !($2.isEmpty(request.req.session.token))) ? $1.encrypt(request.req.session.token) : null;
		
		this.view.setData({
			locale: request.locale(),
			csrf_token: token,
			_flashed: $3.without((($10 = request.req.session._flashed) != null) ? ($10) : {},['_old']),
			_old: (($11 = $3.without(oldData,['_token'])) != null) ? ($11) : {}
		});
		
		((($12 = request.req.session._flashed),delete request.req.session._flashed, $12));
		
		const output = await this.view.make();
		
		return reply.code(this.statusCode).type('text/html').send(output).sent = true;
	}
};
exports.default = ViewResponse;

