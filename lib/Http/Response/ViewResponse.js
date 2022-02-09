const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$Helpersφ = require('../../Support/Helpers'/*$path$*/);
var _$Helpersφ2 = require('../../Support/Helpers'/*$path$*/);
var _$Helpersφ3 = require('../../Support/Helpers'/*$path$*/);
class ViewResponse {
	[Ψ__init__]($$ = null){
		var vφ;
		this.view = $$ ? $$.view : undefined;
		this.statusCode = ($$ && (vφ = $$.statusCode) !== undefined) ? (vφ) : 200;
		
	}
	/**
	@param {View} view
	@param {Object|null} data
	@param {Number} statusCode
	*/
	constructor(view,data = null,statusCode = 200){
		this[Ψ__init__]();
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
		var φ, φ2, φ3, φ4;
		
		const oldData = (!(_$Helpersφ2.isEmpty(request.req.session._flashed))) ? ((((φ = request.req.session._flashed._old) != null) ? (φ) : {})) : {};
		const token = (!(_$Helpersφ2.isEmpty(request.req.session)) && !(_$Helpersφ2.isEmpty(request.req.session.token))) ? _$Helpersφ.encrypt(request.req.session.token) : null;
		
		this.view.setData({
			locale: request.locale(),
			csrf_token: token,
			_flashed: _$Helpersφ3.without(((φ2 = request.req.session._flashed) != null) ? (φ2) : {},['_old']),
			_old: ((φ3 = _$Helpersφ3.without(oldData,['_token'])) != null) ? (φ3) : {}
		});
		
		(((φ4 = request.req.session._flashed),delete request.req.session._flashed, φ4));
		
		const output = await this.view.make();
		
		return reply.code(this.statusCode).type('text/html').send(output).sent = true;
	}
};
exports.default = ViewResponse;

