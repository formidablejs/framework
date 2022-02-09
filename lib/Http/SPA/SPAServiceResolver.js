function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
var φ = Symbol();
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$isArrayφ = requireDefault$__(require('../../Support/Helpers/isArray'/*$path$*/));
var _$Kernelφ = requireDefault$__(require('../Kernel'/*$path$*/));
var _$NotFoundExceptionφ = requireDefault$__(require('../Exceptions/NotFoundException'/*$path$*/));
var _$Requestφ = requireDefault$__(require('../Request/Request'/*$path$*/));
var _$ServiceResolverφ = requireDefault$__(require('../../Support/ServiceResolver'/*$path$*/));
var _$viewφ = requireDefault$__(require('../../Support/Helpers/view'/*$path$*/));

class SPAServiceResolver extends _$ServiceResolverφ.default {
	static [Ψ__init__](){
		this.prototype[Ψ__initor__] = φ;
		return this;
	}
	constructor(){
		super(...arguments);
		super[Ψ__init__] || this[Ψ__init__]();this[Ψ__initor__]===φ && this[Ψ__inited__] && this[Ψ__inited__]();
	}
	[Ψ__init__]($$ = null){
		super[Ψ__init__] && super[Ψ__init__](...arguments);
		this.request = $$ ? $$.request : undefined;
		
	}
	get view(){
		
		return null;
	}
	
	get props(){
		
		return {};
	}
	
	get middleware(){
		
		return [];
	}
	
	boot(){
		var self = this;
		
		return self.app.onResponse(function(response,request,reply) {
			
			if ((response instanceof _$NotFoundExceptionφ.default) && request.isMethod('get') && self.view) {
				
				if (_$isArrayφ.default(self.middleware)) {
					
					self.app.make(_$Kernelφ.default).resolveMiddleware(null,request,reply,self.app.config,self.middleware);
				};
				
				self.request = request;
				
				return _$viewφ.default(self.view,self.props).toView(request,reply);
			};
		});
	}
};
exports.default = SPAServiceResolver; SPAServiceResolver[Ψ__init__]();
