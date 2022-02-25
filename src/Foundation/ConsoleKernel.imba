import { DownCommand } from './Console/Commands/DownCommand'
import { GenerateKeyCommand } from './Console/Commands/GenerateKeyCommand'
import { MakeConfigCommand } from './Console/Commands/MakeConfigCommand'
import { MakeControllerCommand } from './Console/Commands/MakeControllerCommand'
import { MakeExceptionCommand } from './Console/Commands/MakeExceptionCommand'
import { MakeMailCommand } from './Console/Commands/MakeMailCommand'
import { MakeMiddlewareCommand } from './Console/Commands/MakeMiddlewareCommand'
import { MakeMigrationCommand } from './Console/Commands/MakeMigrationCommand'
import { MakeModelCommand } from './Console/Commands/MakeModelCommand'
import { MakeRequestCommand } from './Console/Commands/MakeRequestCommand'
import { MakeResolverCommand } from './Console/Commands/MakeResolverCommand'
import { MakeSeederCommand } from './Console/Commands/MakeSeederCommand'
import { UpCommand } from './Console/Commands/UpCommand'
import type { Application } from '@formidablejs/console'

export default class ConsoleKernel

	get default
		[
			GenerateKeyCommand

			# make commands
			MakeConfigCommand
			MakeControllerCommand
			MakeExceptionCommand
			MakeMailCommand
			MakeMiddlewareCommand
			MakeMigrationCommand
			MakeModelCommand
			MakeRequestCommand
			MakeResolverCommand
			MakeSeederCommand

			# maintenance commands
			DownCommand
			UpCommand
		]

	get registered
		[
			
		]
	
	def registerCommands app\Application
		for command in self.default
			app.register(command)
		
		for command in self.registered
			app.register(command)
