
const FormValidation = require('../Http/Request/FormValidation'/*$path$*/);

module.exports = class Validator {
	
	
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
		
		return this.validation = (new FormValidation).getValidation();
	}
};
