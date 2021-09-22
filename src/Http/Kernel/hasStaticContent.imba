import fastifystatic from 'fastify-static'
import path from 'path'

export default def hasStaticContent fastify
	fastify.register(fastifystatic, {
		root: path.join(process.cwd!, 'public')
	})

	fastify.register(fastifystatic, {
		root: path.join(process.cwd!, '.formidable', 'public', '__assets__')
		prefix: '/__assets__/'
		decorateReply: false
	})
