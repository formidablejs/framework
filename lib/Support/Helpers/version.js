function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('fs'/*$path$*/));
var $2 = requireDefault$__(require('path'/*$path$*/));
var $3 = require('../../../package.json'/*$path$*/);

function version(){
	
	return $3.version;
};
exports.default = version;
