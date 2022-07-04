import { unlinkSync, existsSync } from 'fs-extra'
import { Command } from '../Command'
import { join } from 'path'

export class CacheCommand < Command

	get config
		join process.cwd!, 'bootstrap', 'cache', 'config.json'

	get address
		join process.cwd!, 'storage', 'framework', 'address.json'

	def cache
		self.clear!

		app.cache!

		self.info 'Configuration cached successfully!'

		self.exit!

	def clear
		if existsSync(self.config) then unlinkSync(self.config)

		if existsSync(self.address) then unlinkSync(self.address)

		self.info 'Configuration address cleared!'
		self.info 'Configuration cache cleared!'
