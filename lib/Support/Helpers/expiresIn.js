function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$msφ = requireDefault$__(require('ms'/*$path$*/));

/**
@param {String} time
*/
function expiresIn(time){
	
	return ("PX " + _$msφ.default(time));
};
exports.default = expiresIn;
