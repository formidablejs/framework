const TransformsRequest = require './TransformsRequest'

module.exports = class TrimStrings < TransformsRequest

	def transform key, value
		typeof value == 'string' ? value.trim! : value
