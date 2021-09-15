Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
function isClass(object){
	
	return typeof object === 'function' && /^\s*class\s+/.test(object.toString());
};
exports.default = isClass;
