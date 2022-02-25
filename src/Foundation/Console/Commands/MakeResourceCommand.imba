import { Command } from '@formidablejs/console'
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

	get stub
		new Stub('resource', {}, 'resource')
	
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
			return self.write "<fg:green>{self.resource} created successfully.</fg:green>"

		self.error "{self.resource} not created."
