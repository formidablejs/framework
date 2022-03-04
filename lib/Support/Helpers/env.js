function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../../Foundation/Application'/*$path$*/));
var $2 = requireDefault$__(require('./isEmpty'/*$path$*/));
var $3 = requireDefault$__(require('./isString'/*$path$*/));

/**
@param {String} key
@param {any} default
*/
function env(key,default$ = null){
	
	try {
		return $1.default.getEnv(key,default$);
	} catch ($4) {
		
		if (!($3.default(key))) { throw new TypeError('Expected string.') };
		
		let output = process.env[key];
		
		if ($3.default(output)) {
			
			const results = output.match(/\$\{(.*?)\}/g);
			
			if (!($2.default(results))) {
				
				results.forEach(function(variable) {
					
					return output = output.replace(variable,process.env[variable.slice(2,-1)]);
				});
			};
		};
		
		if ($2.default(output)) { return default$ };
		
		return ['true','false'].includes(output.toLowerCase()) ? (output = JSON.parse(output)) : output;
	};
};
exports.default = env;
