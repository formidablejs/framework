import TransformsRequest from './TransformsRequest'

export default class ConvertEmptyStringsToNull < TransformsRequest

	def transform key, value
		value !== '' ? value : null
