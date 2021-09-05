const { dotNotation: dot } = require '@formidablejs/helpers'
const fs = require 'fs'
const path = require 'path'

def getDirectories location
	const all = []

	fs.readdirSync(location).forEach do(folder)
		if fs.statSync(path.join(location, folder)).isDirectory! then all.push folder

	all

module.exports = class Language

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

	def setLocale locale\String
		self.lang.locale = locale

		self

	def setFallbackLocale locale\String
		self.lang.fallback_locale = locale

		self

	def register location\String
		const packs = getDirectories location

		packs.forEach do(pack)
			if !self.lang.packs[pack]
				self.lang.packs[pack] = {}

			fs.readdirSync(path.join(location, pack)).forEach do(file)
				if path.extname(file) == '.json'
					const definition = {
						[path.parse(file).name]: require path.join(location, pack, file)
					}

					if !definition
						throw new Error "Can't resolve language pack: \"{path.join(location, pack, file)}\""

					self.lang.packs[pack] = Object.assign(
						self.lang.packs[pack]
						definition
					)
		this

	def get path\String, default\String
		const output = dot(self.lang.packs, "{self.lang.locale}.{path}") ?? dot(self.lang.packs, "{self.lang.fallback_locale}.{path}")

		output !== undefined && output !== null ? output : default

	def unset
		self.lang = {
			locale: null
			fallback_locale: null
			packs: { }
		}
