import dot from '../Helpers/dotNotation'
import runtime from '../Helpers/runtime'
import fs from 'fs'
import path from 'path'

def getDirectories location
	const all = []

	for folder in fs.readdirSync(location)
		if fs.statSync(path.join(location, folder)).isDirectory! then all.push folder

	all

export default class Language

	prop lang = {
		locale: null
		fallback_locale: null
		packs: { }
	}

	get locale
		self.lang.locale

	get fallbackLocale
		self.lang.fallback_locale

	get packs
		self.lang.packs

	def setLocale locale\string
		self.lang.locale = locale

		self

	def setFallbackLocale locale\string
		self.lang.fallback_locale = locale

		self

	def register location\string
		const packs = getDirectories location

		for pack in packs
			if !self.lang.packs[pack]
				self.lang.packs[pack] = {}

			for file in fs.readdirSync(path.join(location, pack))
				if path.extname(file) == '.json'
					const translation = path.join(location, pack, file)

					const definition = {
						[path.parse(file).name]: runtime! == 'bun' ? JSON.parse(fs.readFileSync(translation).toString()) : require(translation)
					}

					if !definition
						throw new Error "Can't resolve language pack: \"{path.join(location, pack, file)}\""

					self.lang.packs[pack] = Object.assign(
						self.lang.packs[pack]
						definition
					)
		this

	def get path\string, default\string
		const output = dot(self.lang.packs, "{self.lang.locale}.{path}") ?? dot(self.lang.packs, "{self.lang.fallback_locale}.{path}")

		output !== undefined && output !== null ? output : default

	def unset
		self.lang = {
			locale: null
			fallback_locale: null
			packs: { }
		}
