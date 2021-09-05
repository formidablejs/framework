
const FormRequest = require('../../../Http/Request/FormRequest'/*$path$*/);

module.exports = class LoginRequest extends FormRequest {
	
	
	authorize(){
		
		return true;
	}
	
	rules(){
		
		return {
			email: 'required|email',
			password: 'required'
		};
	}
	
	async persist(){
		
		return await this.authDriver.authenticate(this.body());
	}
};
