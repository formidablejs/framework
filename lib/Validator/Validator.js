function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../Http/Request/FormValidation'/*$path$*/));

class Validator {
	
	
	/**
	@param {object} body
	@param {object} rules
	@param {object} messages
	*/
	static make(body,rules,messages = {}){
		
		const validation = this.get();
		
		return new validation(body,rules,messages);
	}
	
	static get(){
		
		return this.validation = (new $1.default).getValidation();
	}
};
exports.default = Validator;
