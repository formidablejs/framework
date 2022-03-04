function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../../../Http/Request/FormRequest'/*$path$*/));

class ResetPasswordRequest extends $1.default {
	
	
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
exports.default = ResetPasswordRequest;
