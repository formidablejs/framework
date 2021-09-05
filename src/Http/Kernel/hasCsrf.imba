const csrf = require 'fastify-csrf'

module.exports = def hasCsrf fastify
	fastify.register(csrf, sessionPlugin: 'fastify-session')
