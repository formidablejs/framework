
const formbody = require('fastify-formbody'/*$path$*/);
const multipart = require('fastify-multipart'/*$path$*/);

module.exports = function hasContentTypes(fastify){
	
	fastify.register(formbody);
	fastify.register(multipart);
	
	return fastify.addContentTypeParser('application/json',{parseAs: 'string'},function(req,body,done) {
		
		try {
			
			return done(null,JSON.parse(body));
		} catch (φ) {
			
			return done(null,{});
		};
	});
};
