import { Command } from '@formidablejs/console'
import { Prop } from '@formidablejs/console'
import { existsSync } from 'fs'
import { join } from 'path'
import { randomBytes } from 'crypto'
import { updateLine } from '../../Support/Helpers/updateLine'

export class GenerateKeyCommand < Command

	get signature
		'key:generate {?--env} {?--show}'

	get props
		{
			env: Prop.string!.alias('e').description('Set the application key')
			show: Prop.boolean!.description('Display the key instead of modifying files')
		}
	
	get envFile
		let env = self.option('env')

		env = env === undefined ? '.env' : ".env.{env}"

		env

	get envPath
		join process.cwd!, self.envFile

	def handle
		if !existsSync self.envPath then return this.error "No {self.envFile} file found."

		const key = self.key 32

		if self.option('show', false)
			return self.write "<fg:green>Application key [{key}] generated successfully.</fg:green>"

		self.updateEnv key

		this.write "<fg:green>Application key set successfully.</fg:green>"

	def key length\Number = 32
		const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

		let key = ''
		for i in [0 ... length]
			key += chars.charAt(Math.floor(Math.random() * chars.length));

		'base64:' + Buffer.from(key + ':' + randomBytes(8).toString('hex')).toString('base64');
	
	def updateEnv key\String
		updateLine self.envPath, do(line)
			if line.startsWith('APP_KEY=') then return "APP_KEY={key}"
			
			line
