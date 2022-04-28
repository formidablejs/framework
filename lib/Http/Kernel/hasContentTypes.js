function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('@fastify/formbody'/*$path$*/));
var $2 = requireDefault$__(require('@fastify/multipart'/*$path$*/));

function hasContentTypes(fastify){
	
	fastify.register($1.default);
	fastify.register($2.default);
	
	return fastify.addContentTypeParser('application/json',{parseAs: 'string'},function(req,body,done) {
		
		try {
			
			return done(null,JSON.parse(body));
		} catch ($3) {
			
			return done(null,{});
		};
	});
};
exports.default = hasContentTypes;
