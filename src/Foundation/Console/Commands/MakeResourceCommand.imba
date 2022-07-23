import { Command } from '../Command'
import { dirname } from 'path'
import { existsSync } from 'fs'
import { join } from 'path'
import { mkdirSync } from 'fs'
import { normalize } from  'path'
import { writeFileSync } from 'fs'
import { Stub } from '@formidablejs/stubs'
import type { Stub as StubType } from '@formidablejs/stubs'

export class MakeResourceCommand < Command

	get resource
		''

	get package
		join(process.cwd!, 'package.json')

	get language
		if existsSync(self.package)
			return require(self.package).language || 'imba'
		else
			'imba'

	get stub
		new Stub('resource', {}, 'resource', self.language.toLowerCase!)

	def handle
		const reference = self.stub
		const information\StubType = reference.make!

		const filePath = join(process.cwd!, information.destination, reference.namespace, information.fileName)

		if existsSync(filePath)
			return self.error "{self.resource} already exists."

		const directory = dirname(filePath)

		if !existsSync(directory)
			mkdirSync(directory, { recursive: true })

		writeFileSync(normalize(filePath), information.output)

		if existsSync(filePath)
			return self.info "{self.resource} created successfully."

		self.error "{self.resource} not created."
