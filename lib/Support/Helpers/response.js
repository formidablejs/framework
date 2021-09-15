function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$Responseφ = requireDefault$__(require('../../Http/Response/Response'/*$path$*/));

/**
@param {any} data
@param {number} statusCode
*/
function response(data = null,statusCode = 200){
	
	return new _$Responseφ.default(data,statusCode);
};
exports.default = response;
