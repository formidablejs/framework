export default class AcceptLanguage

	get mappings
		{

		}

	def handle request
		if request.hasHeader('accept-language')
			let language = request.header('accept-language')

			language = language == '*' ? null : language.split(';')[0].trim!

			if language !== null || language !== undefined
				request.setLocale(self.getLanguage(request))

		request

	def getLanguage request
		const languageMaps = {}

		for own key, value of self.mappings
			languageMaps[key.toLowerCase!] = value

		const language = languageMaps[request.header('accept-language')]

		if language !== undefined
			return language

		return request.header('accept-language')
