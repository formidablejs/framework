function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$FormValidationφ = requireDefault$__(require('../Http/Request/FormValidation'/*$path$*/));

class Validator {
	
	
	/**
	@param {Object} body
	@param {Object} rules
	@param {Object} messages
	*/
	static make(body,rules,messages = {}){
		
		const validation = this.get();
		
		return new validation(body,rules,messages);
	}
	
	static get(){
		
		return this.validation = (new _$FormValidationφ.default).getValidation();
	}
};
exports.default = Validator;
