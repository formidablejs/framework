Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
function isArray(object){
	
	return object !== undefined && object !== null && object.constructor == Array;
};
exports.default = isArray;
