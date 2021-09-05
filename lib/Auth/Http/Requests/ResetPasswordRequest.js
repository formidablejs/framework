
const FormRequest = require('../../../Http/Request/FormRequest'/*$path$*/);

module.exports = class ResetPasswordRequest extends FormRequest {
	
	
	authorize(){
		
		return true;
	}
	
	rules(){
		
		return {
			password: 'required|min:8|confirmed',
			password_confirmation: 'required'
		};
	}
	
	async persist(){
		
		return await this.authDriver.updatePassword(this.body());
	}
};
