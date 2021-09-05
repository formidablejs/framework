const TransformsRequest = require './TransformsRequest'

module.exports = class ConvertEmptyStringsToNull < TransformsRequest

	def transform key, value
		value !== '' ? value : null
