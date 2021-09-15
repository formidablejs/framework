function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$FormRequestφ = requireDefault$__(require('../../../Http/Request/FormRequest'/*$path$*/));

class LoginRequest extends _$FormRequestφ.default {
	
	
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
exports.default = LoginRequest;
