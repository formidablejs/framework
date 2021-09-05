
const FormRequest = require('../../../Http/Request/FormRequest'/*$path$*/);

module.exports = class RegisterRequest extends FormRequest {
	
	
	authorize(){
		
		return true;
	}
	
	rules(){
		
		return {
			name: 'required',
			email: 'required|email',
			password: 'required|min:8|confirmed',
			password_confirmation: 'required'
		};
	}
	
	async persist(){
		
		return await this.authDriver.register(this.body());
	}
};
