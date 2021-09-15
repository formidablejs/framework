function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$fastify_csrfφ = requireDefault$__(require('fastify-csrf'/*$path$*/));

function hasCsrf(fastify){
	
	return fastify.register(_$fastify_csrfφ.default,{sessionPlugin: 'fastify-session'});
};
exports.default = hasCsrf;
