import { Command } from '../Command'
import { join } from 'path'
import { existsSync } from 'fs'
import { unlinkSync } from 'fs'
import { outputFileSync } from 'fs-extra'
import { isEmpty } from '../../../Support/Helpers'

export class MaintenanceCommand < Command

	get file
		join process.cwd!, 'storage', 'framework', 'down.json'

	def down
		if existsSync(file)
			return self.message 'error', "Application is already down."

		const content = { }

		if !isEmpty(self.option('message'))
			content.message = self.option('message')

		if !isEmpty(self.option('redirect'))
			content.redirect = self.option('redirect')

		if !isEmpty(self.option('retry'))
			content.retry = self.option('retry')

		if !isEmpty(self.option('refresh'))
			content.refresh = self.option('refresh')

		if !isEmpty(self.option('secret'))
			content.secret = self.option('secret')

		if self.option('status') !== 503
			content.status = self.option('status')

		outputFileSync(file, JSON.stringify(content, null, 4), {
			encoding: 'utf8'
		})

		if existsSync(file)
			return self.message 'info', "Application is now in maintenance mode."

		self.message 'error', 'Failed to put application in maintenance mode.'

	def up
		if !existsSync(file)
			return self.message 'info', "Application is already up."

		unlinkSync(file)

		if existsSync(file)
			return self.message 'error', "Failed to bring application out of maintenance."

		self.message 'info', "Application is now live."
