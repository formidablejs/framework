
const FormRequest = require('../../../Http/Request/FormRequest'/*$path$*/);

module.exports = class ForgotPasswordRequest extends FormRequest {
	
	
	authorize(){
		
		return true;
	}
	
	rules(){
		
		return {
			email: 'required|email'
		};
	}
	
	async persist(){
		
		return await this.authDriver.requestForgotPasswordUrl(this.body());
	}
};
