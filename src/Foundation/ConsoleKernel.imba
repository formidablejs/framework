import { existsSync } from 'fs-extra'
import { MakeCrudCommand } from './Console/Commands/MakeCrudCommand'
import { SessionPruneExpiredCommand } from './Console/Commands/SessionPruneExpiredCommand'
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
import { execSync } from 'child_process'
import { join } from 'path'
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

			# session command
			SessionPruneExpiredCommand

			# package commands
			PackagePublishCommand

			# make commands
			MakeCommandCommand
			MakeConfigCommand
			MakeControllerCommand
			MakeCrudCommand
			MakeExceptionCommand
			MakeMailCommand
			MakeMiddlewareCommand
			MakeMigrationCommand
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

		self.loadEvents app\Application

	def loadEvents app\Application
		const appPackage = join(process.cwd!, 'package.json')

		if !existsSync(appPackage)
			return

		const hooks = require(appPackage).hooks || {}

		for own event, commands of hooks
			if !Array.isArray(commands)
				commands = []

			for command in commands
				app.onEvent event, do
					execSync(command, {
						cwd: process.cwd!,
						stdio: 'inherit'
					})
