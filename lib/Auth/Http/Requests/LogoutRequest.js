function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$FormRequestφ = requireDefault$__(require('../../../Http/Request/FormRequest'/*$path$*/));

class LogoutRequest extends _$FormRequestφ.default {
	
	
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
exports.default = LogoutRequest;
