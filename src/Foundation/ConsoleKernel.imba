import { GenerateKeyCommand } from './Commands/GenerateKeyCommand'
import type { Application } from '@formidablejs/console'

export default class ConsoleKernel

	get default
		[
			GenerateKeyCommand
		]

	get registered
		[
			
		]
	
	def registerCommands app\Application
		for command in self.default
			app.register(command)
		
		for command in self.registered
			app.register(command)
