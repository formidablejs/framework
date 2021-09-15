function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$TransformsRequestφ = requireDefault$__(require('./TransformsRequest'/*$path$*/));

class ConvertEmptyStringsToNull extends _$TransformsRequestφ.default {
	
	
	transform(key,value){
		
		return (value !== '') ? value : null;
	}
};
exports.default = ConvertEmptyStringsToNull;
