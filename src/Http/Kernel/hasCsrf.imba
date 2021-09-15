import csrf from 'fastify-csrf'

export default def hasCsrf fastify
	fastify.register(csrf, sessionPlugin: 'fastify-session')
