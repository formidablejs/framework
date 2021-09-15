function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$TransformsRequestφ = requireDefault$__(require('./TransformsRequest'/*$path$*/));

class TrimStrings extends _$TransformsRequestφ.default {
	
	
	transform(key,value){
		
		return (typeof value == 'string') ? value.trim() : value;
	}
};
exports.default = TrimStrings;
