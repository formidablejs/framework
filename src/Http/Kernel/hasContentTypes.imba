import formbody from '@fastify/formbody'
import multipart from '@fastify/multipart'

export default def hasContentTypes fastify
	fastify.register formbody
	fastify.register multipart

	fastify.addContentTypeParser 'application/json', { parseAs: 'string' }, do(req, body, done)
		try
			done(null, JSON.parse(body))
		catch
			done(null, {})
