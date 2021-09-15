import TransformsRequest from './TransformsRequest'

export default class TrimStrings < TransformsRequest

	def transform key, value
		typeof value == 'string' ? value.trim! : value
