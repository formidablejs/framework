import { existsSync } from 'fs-extra'
import { join } from 'path'
import { spawn } from 'child_process'

export default class Console
	prop runtime\string
	prop console\string

	prop config\object = {
		stdio: 'inherit'
		cwd: process.cwd!
	}

	get ext
		const appPackage = join(process.cwd!, 'package.json')

		if !existsSync(appPackage)
			return '.imba'

		const language = require(appPackage).language || 'imba'

		language.toLowerCase! == 'typescript' ? '.ts' : '.imba'

	def constructor runtime\string = null, console\string = null
		self.runtime = runtime || join(process.cwd!, 'node_modules', '.bin', 'imba' + (process.platform === 'win32' ? '.cmd' : ''))
		self.console = console || join('bootstrap', "console{ext}")

	static def make runtime\string = null, console\string = null
		new Console(runtime, console)

	def run
		const args = ['--']

		for arg in process.argv.slice(2)
			args.push arg

		if process.platform == 'win32'
			const sh = process.env.comspec || 'cmd'
			const shFlag = '/d /s /c'
			self.config.windowsVerbatimArguments = true

			return spawn(sh, [shFlag, self.runtime, self.console, ...args], self.config)

		spawn(runtime, [self.console, ...args], self.config)
