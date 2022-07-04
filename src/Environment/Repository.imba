import dotenv from 'dotenv'
import fs from 'fs'
import isEmpty from '../Support/Helpers/isEmpty'
import isString from '../Support/Helpers/isString'
import path from 'path'

export default class Repository

	prop variables\Object = {}

	def constructor root\String
		let env = process.env.BUILD_ENV ? ".{process.env.BUILD_ENV}" : ''

		const envPath = path.join root, ".env{env}"

		env = fs.existsSync(envPath) ? envPath : path.join(root, '.env')

		dotenv.config({
			path: env
		})

		delete process.env.BUILD_ENV

		self.variables = process.env

	def get key\String, default\any = null
		if !isString(key) then throw new TypeError 'Expected string.'

		let output = self.variables[key]

		# if (output !== undefined && output !== null) && output.startsWith('${') && output.endsWith('}')
		# 	output = self.variables[output.slice(2, -1)]

		if isString output
			const results = output.match(/\$\{(.*?)\}/g)

			if !isEmpty(results)
				results.forEach do(variable)
					output = output.replace(variable, self.variables[variable.slice(2, -1)])

		if isEmpty(output) then return default

		['true', 'false'].includes(output.toLowerCase!) ? output = JSON.parse(output) : (output === 'null' ? null : output)
