function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$FormRequestφ = requireDefault$__(require('../../../Http/Request/FormRequest'/*$path$*/));

class ForgotPasswordRequest extends _$FormRequestφ.default {
	
	
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
exports.default = ForgotPasswordRequest;
