
const fastifystatic = require('fastify-static'/*$path$*/);
const path = require('path'/*$path$*/);

module.exports = function hasStaticContent(fastify){
	
	return fastify.register(fastifystatic,{
		root: path.join(process.cwd(),'public')
	});
};
