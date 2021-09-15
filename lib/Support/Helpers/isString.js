Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
function isString(object){
	
	return object !== undefined && object !== null && object.constructor == String;
};
exports.default = isString;
