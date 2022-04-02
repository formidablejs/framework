import { join } from 'path'
import { spawn } from 'child_process'

export default class Console
	prop runtime\string = join(process.cwd!, 'node_modules', '.bin', 'imbar')
	prop console\string = join(process.cwd!, 'bootstrap', 'console.imba');

	prop config\object = {
		stdio: 'inherit'
		cwd: process.cwd!
	}
	
	static def make
		new Console
	
	def run
		if process.platform == 'win32'
			const sh = process.env.comspec || 'cmd'
			const shFlag = '/d /s /c'
			self.config.windowsVerbatimArguments = true

			return spawn(sh, [shFlag, self.runtime, self.console, ...process.argv.slice(2)], self.config)
		
		spawn(runtime, [self.console, ...process.argv.slice(2)], self.config)
