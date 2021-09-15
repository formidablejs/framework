Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
/**
@param {Object} object
*/
function asObject(object){
	
	let output = new Object;
	
	for (let iφ = 0, keysφ = Object.keys(object), lφ = keysφ.length, property, value; iφ < lφ; iφ++){
		property = keysφ[iφ];value = object[property];
		output[property] = value;
	};
	
	return output;
};
exports.default = asObject;
