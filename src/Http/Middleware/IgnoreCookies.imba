export default class IgnoreCookies

	def handle request, reply
		reply.setCookie = do null
