
const csrf = require('fastify-csrf'/*$path$*/);

module.exports = function hasCsrf(fastify){
	
	return fastify.register(csrf,{sessionPlugin: 'fastify-session'});
};
