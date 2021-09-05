const fastifystatic = require 'fastify-static'
const path = require 'path'

module.exports = def hasStaticContent fastify
	fastify.register(fastifystatic, {
		root: path.join(process.cwd!, 'public')
	})
