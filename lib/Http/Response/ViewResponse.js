const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$Helpersφ = require('../../Support/Helpers'/*$path$*/);
var _$Helpersφ2 = require('../../Support/Helpers'/*$path$*/);
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
		
		this.view.setData({
			locale: request.locale(),
			_token: (!((_$Helpersφ2.isEmpty(request.req.session) && _$Helpersφ2.isEmpty(request.req.session.token)))) ? _$Helpersφ.encrypt(request.req.session.token) : null
		});
		
		const output = await this.view.make();
		
		return reply.code(this.statusCode).type('text/html').send(output).sent = true;
	}
};
exports.default = ViewResponse;

