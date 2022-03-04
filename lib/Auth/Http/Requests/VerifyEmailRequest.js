function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../../../Http/Request/FormRequest'/*$path$*/));

class VerifyEmailRequest extends $1.default {
	
	
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
exports.default = VerifyEmailRequest;
