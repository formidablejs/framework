const formbody = require 'fastify-formbody'
const multipart = require 'fastify-multipart'

module.exports = def hasContentTypes fastify
	fastify.register formbody
	fastify.register multipart

	fastify.addContentTypeParser 'application/json', { parseAs: 'string' }, do(req, body, done)
		try
			done(null, JSON.parse(body))
		catch
			done(null, {})
