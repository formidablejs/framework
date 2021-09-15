Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
function isObject(object){
	
	return object !== undefined && object !== null && object.constructor == Object;
};
exports.default = isObject;
