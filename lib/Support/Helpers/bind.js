function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../../Database/Bind'/*$path$*/));

/**
@param {String} table
@param {Boolean} first
*/
function bind(table,first = true){
	
	return new $1.default(table,first);
};
exports.bind = bind;
