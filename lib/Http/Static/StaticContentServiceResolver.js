function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('path'/*$path$*/);
var $2 = requireDefault$__(require('@fastify/static'/*$path$*/));
var $3 = requireDefault$__(require('../../Support/ServiceResolver'/*$path$*/));

class StaticContentServiceResolver extends $3.default {
	
	
	/**
		 * Public directory.
		 */
	
	/**
	*
		 * Public directory.
		 
	*/
	get public(){
		
		return {
			root: $1.join(process.cwd(),'public'),
			wildcard: false
		};
	}
	
	/**
		 * Formidable assets directory.
		 */
	
	/**
	*
		 * Formidable assets directory.
		 
	*/
	get assets(){
		
		return {
			root: $1.join(process.cwd(),'.formidable','public','__assets__'),
			wildcard: false,
			prefix: '/__assets__/',
			decorateReply: false
		};
	}
	
	/**
		 * Register public and formidable assets directories as static content paths.
		 *
		 * @returns {void}
		 */
	
	/**
	*
		 * Register public and formidable assets directories as static content paths.
		 *
		 * @returns {void}
		 
	*/
	boot(){
		
		/** register public directory. */
		
		this.app.register($2.default,this.public);
		
		/** register formidable assets directory. */
		
		return this.app.register($2.default,this.assets);
	}
};
exports.default = StaticContentServiceResolver;
