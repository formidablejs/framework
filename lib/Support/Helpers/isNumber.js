Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
function isNumber(object){
	
	return object !== undefined && object !== null && object.constructor == Number;
};
exports.default = isNumber;
