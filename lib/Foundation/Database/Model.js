const $2 = Symbol.for('#__initor__'), $3 = Symbol.for('#__inited__'), $1 = Symbol.for('#__hooks__');
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
