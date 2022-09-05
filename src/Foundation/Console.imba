import { join } from 'path'
import { spawn } from 'child_process'

export default class Console
	prop runtime\string
	prop console\string

	prop config\object = {
		stdio: 'inherit'
		cwd: process.cwd!
	}

	def constructor runtime\String = null, console\String = null
		self.runtime = runtime || join(process.cwd!, 'node_modules', '.bin', 'imba')
		self.console = console || join('bootstrap', 'console.imba')

	static def make runtime\String = null, console\String = null
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
