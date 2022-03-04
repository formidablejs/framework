function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../../Mix/Repository'/*$path$*/));

/**
@param {String} file
*/
function mix(file){
	
	return $1.default.get(file);
};
exports.default = mix;
