function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$fsφ = requireDefault$__(require('fs'/*$path$*/));
var _$pathφ = requireDefault$__(require('path'/*$path$*/));
var _$jsonφ = require('../../../package.json'/*$path$*/);

function version(){
	
	return _$jsonφ.version;
};
exports.default = version;
