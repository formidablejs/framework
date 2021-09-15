export default class ConfigNotCachedError < Error

	def constructor message\string = 'Config is not cached'
		super message

		this.name = 'ConfigNotCachedError'
