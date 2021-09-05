
const FormRequest = require('../../../Http/Request/FormRequest'/*$path$*/);

module.exports = class LogoutRequest extends FormRequest {
	
	
	authorize(){
		
		return true;
	}
	
	rules(){
		
		return {
			// nothing to validate
		};
	}
	
	async persist(){
		
		return await this.authDriver.logout(this.body());
	}
};
