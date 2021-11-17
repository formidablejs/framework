function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$pathφ = require('path'/*$path$*/);
var _$fastify_staticφ = requireDefault$__(require('fastify-static'/*$path$*/));
var _$ServiceResolverφ = requireDefault$__(require('../../Support/ServiceResolver'/*$path$*/));

class StaticContentServiceResolver extends _$ServiceResolverφ.default {
	
	
	/**
		 * Public directory.
		 */
	
	/**
	*
		 * Public directory.
		 
	*/
	get public(){
		
		return {root: _$pathφ.join(process.cwd(),'public')};
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
			root: _$pathφ.join(process.cwd(),'.formidable','public','__assets__'),
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
		
		this.app.register(_$fastify_staticφ.default,this.public);
		
		/** register formidable assets directory. */
		
		return this.app.register(_$fastify_staticφ.default,this.assets);
	}
};
exports.default = StaticContentServiceResolver;
