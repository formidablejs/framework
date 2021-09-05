
const Validator = require('../Validator/Validator'/*$path$*/);

module.exports = class Controller {
	
	
	/**
	@param {Object} rules
	*/
	validate(request,rules = null){
		
		return Validator.make(request.input(),rules);
	}
};
