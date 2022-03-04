Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
/**
@param {Object} object
*/
function asObject(object){
	
	let output = new Object;
	
	for (let $1 = 0, $2 = Object.keys(object), $3 = $2.length, property, value; $1 < $3; $1++){
		property = $2[$1];value = object[property];
		output[property] = value;
	};
	
	return output;
};
exports.default = asObject;
