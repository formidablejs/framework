function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/

var $1 = requireDefault$__(require('../../Http/Response/ViewResponse'/*$path$*/));

/**
@param {View} view
@param {object|null} data
*/
function view(view,data = null){
	
	return $1.default.make(view,data);
};
exports.default = view;
