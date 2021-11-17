function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$Applicationφ = requireDefault$__(require('../Foundation/Application'/*$path$*/));

class ServiceResolver {
	[Ψ__init__]($$ = null){
		this.app = $$ ? $$.app : undefined;
		
	}
	/**
	@param {Application} app
	*/
	constructor(app){
		this[Ψ__init__]();
		this.app = app;
	}
	
	boot(){
		
		return null;
	}
	
	register(){
		
		return null;
	}
};
exports.default = ServiceResolver;
