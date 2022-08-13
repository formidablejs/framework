import { unlinkSync, existsSync } from 'fs-extra'
import { Command } from '../Command'
import { join } from 'path'

export class CacheCommand < Command

	get config
		join process.cwd!, 'bootstrap', 'cache', 'config.json'

	get address
		join process.cwd!, 'storage', 'framework', 'address.json'

	def cache
		self.clear false

		app.cache!

		self.message 'info', 'Configuration cached successfully!'

		self.exit!

	def clear newLine\boolean = true
		if existsSync(self.config) then unlinkSync(self.config)

		if existsSync(self.address) then unlinkSync(self.address)

		self.message 'info', 'Configuration address cleared!', false
		self.message 'info', 'Configuration cache cleared!', newLine
