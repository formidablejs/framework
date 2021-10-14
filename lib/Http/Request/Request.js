function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$FormRequestφ = requireDefault$__(require('./FormRequest'/*$path$*/));

class Request extends _$FormRequestφ.default {};
exports.default = Request;
