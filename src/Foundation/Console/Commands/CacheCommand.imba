import { unlinkSync, existsSync } from 'fs-extra'
import { Command } from '../Command'
import { join } from 'path'

export class CacheCommand < Command

	get path
		join process.cwd!, 'bootstrap', 'cache', 'config.json'

	def cache
		self.clear!

		app.cache!

		self.info 'Configuration cached successfully!'

	def clear
		if existsSync(self.path) then unlinkSync(self.path)

		self.info 'Configuration cached cleared!'
