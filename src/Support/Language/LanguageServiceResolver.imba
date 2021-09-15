import ConfigRepository from '../../Config/Repository'
import fs from 'fs'
import Language from './Language'
import path from 'path'
import ServiceResolver from '../ServiceResolver'

export default class LanguageServiceResolver < ServiceResolver

	def boot
		self.app.addHook('onRequest', do(request, reply, done)
			const resourcesLang = path.join(process.cwd!, 'resources', 'lang')

			const language = self.app.make(Language)
			const locale   = self.app.make(ConfigRepository).get('app.locale')
			const fallback = self.app.make(ConfigRepository).get('app.fallback_locale')

			language
				.setLocale(locale)
				.setFallbackLocale(fallback)

			if fs.existsSync resourcesLang then language.register(resourcesLang)

			request.language = language

			done!
		)

		self.app.addHook('onResponse', do(request, reply, done)
			request.language.unset!

			request.language = null

			done!
		)
