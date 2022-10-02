function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('dotenv'/*$path$*/));
var $2 = requireDefault$__(require('fs'/*$path$*/));
var $3 = requireDefault$__(require('../Support/Helpers/isEmpty'/*$path$*/));
var $4 = requireDefault$__(require('../Support/Helpers/isString'/*$path$*/));
var $5 = requireDefault$__(require('path'/*$path$*/));

class Repository {
	[$__patch__$]($$ = {}){
		var $6;
		($6 = $$.variables) !== undefined && (this.variables = $6);
		
	}
	[$__init__$]($$ = null,deep = true){
		var $7;
		this.variables = ($$ && ($7 = $$.variables) !== undefined) ? ($7) : {};
		
	}
	/**
	@param {string} root
	*/
	constructor(root){
		var $8;
		this[$__init__$]();
		let env = process.env.BUILD_ENV ? (("." + (process.env.BUILD_ENV))) : '';
		
		const envPath = $5.default.join(root,(".env" + env));
		
		env = $2.default.existsSync(envPath) ? envPath : $5.default.join(root,'.env');
		
		$1.default.config({
			path: env
		});
		
		((($8 = process.env.BUILD_ENV),delete process.env.BUILD_ENV, $8));
		
		this.variables = process.env;
	}
	
	/**
	@param {string} key
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
		
		return ['true','false'].includes(output.toLowerCase()) ? (output = JSON.parse(output)) : (((output === 'null') ? null : output));
	}
};
exports.default = Repository;
