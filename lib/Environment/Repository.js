function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $6 = Symbol.for('#__init__'), $7 = Symbol.for('#__patch__'), $12 = Symbol.for('#__initor__'), $13 = Symbol.for('#__inited__'), $8 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('dotenv'/*$path$*/));
var $2 = requireDefault$__(require('fs'/*$path$*/));
var $3 = requireDefault$__(require('../Support/Helpers/isEmpty'/*$path$*/));
var $4 = requireDefault$__(require('../Support/Helpers/isString'/*$path$*/));
var $5 = requireDefault$__(require('path'/*$path$*/));

class Repository {
	[$7]($$ = {}){
		var $9;
		($9 = $$.variables) !== undefined && (this.variables = $9);
		
	}
	[$6]($$ = null,deep = true){
		var $10;
		this.variables = ($$ && ($10 = $$.variables) !== undefined) ? ($10) : {};
		
	}
	/**
	@param {String} root
	*/
	constructor(root){
		var $11;
		this[$6]();
		let env = process.env.BUILD_ENV ? (("." + (process.env.BUILD_ENV))) : '';
		
		const envPath = $5.default.join(root,(".env" + env));
		
		env = $2.default.existsSync(envPath) ? envPath : $5.default.join(root,'.env');
		
		$1.default.config({
			path: env
		});
		
		((($11 = process.env.BUILD_ENV),delete process.env.BUILD_ENV, $11));
		
		this.variables = process.env;
	}
	
	/**
	@param {String} key
	@param {any} default
	*/
	get(key,default$ = null){
		var self = this;
		
		if (!($4.default(key))) { throw new TypeError('Expected string.') };
		
		let output = this.variables[key];
		
		// if (output !== undefined && output !== null) && output.startsWith('${') && output.endsWith('}')
		// 	output = self.variables[output.slice(2, -1)]
		
		if ($4.default(output)) {
			
			const results = output.match(/\$\{(.*?)\}/g);
			
			if (!($3.default(results))) {
				
				results.forEach(function(variable) {
					
					return output = output.replace(variable,self.variables[variable.slice(2,-1)]);
				});
			};
		};
		
		if ($3.default(output)) { return default$ };
		
		return ['true','false'].includes(output.toLowerCase()) ? (output = JSON.parse(output)) : output;
	}
};
exports.default = Repository;
