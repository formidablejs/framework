import { CacheCommand } from './CacheCommand'

export class ConfigClearCommand < CacheCommand

	get signature
		'config:clear'

	get description
		'Remove the configuration cache file'

	def handle
		self.clear!
