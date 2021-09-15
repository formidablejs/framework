function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$Validatorφ = requireDefault$__(require('../Validator/Validator'/*$path$*/));

class Controller {
	
	
	/**
	@param {Object} rules
	*/
	validate(request,rules = null){
		
		return _$Validatorφ.default.make(request.input(),rules);
	}
};
exports.default = Controller;
