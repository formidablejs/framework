
const FormRequest = require('../../../Http/Request/FormRequest'/*$path$*/);

module.exports = class VerifyEmailRequest extends FormRequest {
	
	
	authorize(){
		
		return true;
	}
	
	rules(){
		
		return {
			// Validation rules
		};
	}
	
	async persist(){
		
		return await this.authDriver.verifyEmail();
	}
};
