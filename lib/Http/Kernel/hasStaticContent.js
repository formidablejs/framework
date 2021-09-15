function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$fastify_staticφ = requireDefault$__(require('fastify-static'/*$path$*/));
var _$pathφ = requireDefault$__(require('path'/*$path$*/));

function hasStaticContent(fastify){
	
	fastify.register(_$fastify_staticφ.default,{
		root: _$pathφ.default.join(process.cwd(),'public')
	});
	
	return fastify.register(_$fastify_staticφ.default,{
		root: _$pathφ.default.join(process.cwd(),'bootstrap','compiled','public','__assets__'),
		prefix: '/__assets__/',
		decorateReply: false
	});
};
exports.default = hasStaticContent;
