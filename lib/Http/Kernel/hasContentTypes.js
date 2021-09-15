function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$fastify_formbodyφ = requireDefault$__(require('fastify-formbody'/*$path$*/));
var _$fastify_multipartφ = requireDefault$__(require('fastify-multipart'/*$path$*/));

function hasContentTypes(fastify){
	
	fastify.register(_$fastify_formbodyφ.default);
	fastify.register(_$fastify_multipartφ.default);
	
	return fastify.addContentTypeParser('application/json',{parseAs: 'string'},function(req,body,done) {
		
		try {
			
			return done(null,JSON.parse(body));
		} catch (φ) {
			
			return done(null,{});
		};
	});
};
exports.default = hasContentTypes;
