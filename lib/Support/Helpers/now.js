function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$Databaseφ = requireDefault$__(require('../../Database/Database'/*$path$*/));

function now(){
	
	// new Date().toISOString().replace('Z','').replace('T', ' ')
	// 'CURRENT_TIMESTAMP'
	return _$Databaseφ.default.fn.now();
};
exports.default = now;
