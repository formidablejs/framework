function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('./TransformsRequest'/*$path$*/));

class TrimStrings extends $1.default {
	
	
	transform(key,value){
		
		return (typeof value == 'string') ? value.trim() : value;
	}
};
exports.default = TrimStrings;
