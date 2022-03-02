import { CacheCommand } from './CacheCommand'

export class ConfigCacheCommand < CacheCommand

	get signature
		'config:cache'

	get description
		'Create a cache file for faster configuration loading'

	def handle
		self.cache!
