import { Command } from '../Command'
import { copySync } from 'fs'
import { existsSync } from 'fs'
import { isString } from '../../../Support/Helpers'
import { join } from 'path'
import { Prop } from '@formidablejs/console'
import { readFileSync } from 'fs'

export class PackagePublishCommand < Command

	get signature
		'package:publish {--package} {--tag} {?--force}'

	get description
		'Install Formidable package'

	get props
		{
			package: Prop.string!.description 'Package name'
			tag: Prop.string!.description 'Assets you want to publish'
			force: Prop.boolean!.default(false).description 'Overwrite any existing files'
		}

	get package
		join process.cwd!, 'node_modules', self.option('package')

	get basePackage
		join(process.cwd!, 'package.json')

	get language
		if existsSync(self.basePackage)
			return require(self.basePackage).language || 'imba'
		else
			'imba'

	get definition
		const npmFile = join self.package, 'package.json'

		if !existsSync npmFile then return self.error('Package is not installed.')

		JSON.parse readFileSync(npmFile, 'utf8').toString!

	get publisherPath
		self.definition['publisher']

	get publisher
		if !self.publisherPath
			return self.error 'This package is not publishable.'

		const publisherModule = join(package, self.publisherPath)

		if !existsSync(publisherModule)
			return self.error 'Publisher does not exist.'

		let publisher = require(publisherModule).Package

		publisher = new publisher

		if typeof publisher.publish !== 'function'
			return self.error 'Publish function missing.'

		publisher.publish(self.language.toLowerCase!)

	def handle
		let tags\String[] = self.option('tag').split(',')

		tags.forEach do(optTag) self.persist optTag

	def persist optTag\String
		if !self.publisher[optTag] || (self.publisher[optTag] && self.publisher[optTag].paths === undefined || self.publisher[optTag].paths === null)
			return self.write "<fg:red>{optTag} is missing.</fg:red>"

		if typeof self.publisher[optTag] !== 'object'
			return self.write "<fg:red>{optTag} is missing paths.</fg:red>"

		Object.keys(self.publisher[optTag].paths).forEach do(entry)
			const file = join self.package, self.publisher[optTag].paths[entry]

			if existsSync(entry) && !self.option('force', false)
				self.write "<fg:red>{entry} already exists. Skipping.</fg:red>"
			else
				copySync file, entry, { overwrite: true }

				self.write existsSync(entry) ? "<fg:green>Published</fg:green> {entry}" : "<fg:red>{entry} not published.</fg:red>"
