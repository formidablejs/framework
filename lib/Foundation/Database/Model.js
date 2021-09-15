const Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
class Model {
	
	constructor(config){
		
		this.config = config;
	}
	
	static get routeKeyName(){
		
		return 'id';
	}
	
	fetch(){
		
		return {};
	}
	
	fetchAll(){
		
		return [];
	}
	
	count(){
		
		return 0;
	}
};
exports.default = Model;
