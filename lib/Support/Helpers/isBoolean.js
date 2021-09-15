Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
function isBoolean(object){
	
	return object !== undefined && object !== null && object.constructor == Boolean;
};
exports.default = isBoolean;
