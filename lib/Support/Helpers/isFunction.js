Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
function isFunction(object){
	
	return object !== undefined && object !== null && object.constructor == Function;
};
exports.default = isFunction;
