module.exports = class IgnoreCookies

	def handle request, reply
		reply.setCookie = do null
