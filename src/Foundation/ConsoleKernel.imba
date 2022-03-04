import { PackagePublishCommand } from './Console/Commands/PackagePublishCommand'
import { ConfigCacheCommand } from './Console/Commands/ConfigCacheCommand'
import { ConfigClearCommand } from './Console/Commands/ConfigClearCommand'
import { DbSeedCommand } from './Console/Commands/DbSeedCommand'
import { DownCommand } from './Console/Commands/DownCommand'
import { EnvironmentCommand } from './Console/Commands/EnvironmentCommand'
import { GenerateKeyCommand } from './Console/Commands/GenerateKeyCommand'
import { MakeCommandCommand } from './Console/Commands/MakeCommandCommand'
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
import { MigrateDownCommand } from './Console/Commands/MigrateDownCommand'
import { MigrateFreshCommand } from './Console/Commands/MigrateFreshCommand'
import { MigrateLatestCommand } from './Console/Commands/MigrateLatestCommand'
import { MigrateRollbackCommand } from './Console/Commands/MigrateRollbackCommand'
import { MigrateUpCommand } from './Console/Commands/MigrateUpCommand'
import { RouteListCommand } from './Console/Commands/RouteListCommand'
import { ServeCommand } from './Console/Commands/ServeCommand'
import { ShellCommand } from './Console/Commands/ShellCommand'
import { UpCommand } from './Console/Commands/UpCommand'
import type { Application } from '@formidablejs/console'

export default class ConsoleKernel

	get default
		[
			# db commands
			DbSeedCommand

			# env command
			EnvironmentCommand

			# key command
			GenerateKeyCommand

			# shell command
			ShellCommand

			# config commands
			ConfigCacheCommand
			ConfigClearCommand

			# serve command
			ServeCommand

			# package commands
			PackagePublishCommand

			# make commands
			MakeCommandCommand
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

			# migration commands
			MigrateDownCommand
			MigrateFreshCommand
			MigrateLatestCommand
			MigrateRollbackCommand
			MigrateUpCommand

			# route commands
			RouteListCommand
		]

	get registered
		[
			
		]
	
	def registerCommands app\Application, ctx
		for command in self.default
			command.ctx = ctx
			app.register(command)
		
		for command in self.registered
			command.ctx = ctx
			app.register(command)
