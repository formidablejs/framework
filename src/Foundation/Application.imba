import { addExceptionResolver } from './Exceptions/Handler/handleException'
import { addResolver } from '../Http/Kernel/resolveResponse'
import { Application as ApplicationConsole } from '@formidablejs/console'
import { Context } from './Context'
import appVersion from '../Support/Helpers/version'
import Bootstrap from './Bootstrap'
import ConfigRepository from '../Config/Repository'
import Database from '../Database/Database'
import DatabaseConfig from '../Database/Config'
import EnvironmentRepository from '../Environment/Repository'
import ExceptionHandler from './Exceptions/Handler'
import fs from 'fs'
import isEmpty from '../Support/Helpers/isEmpty'
import Kernel from '../Http/Kernel'
import Migration from '../Database/Migration'
import Route from '../Http/Router/Route'
import Seeder from '../Database/Seeder'
import version from '../Support/Helpers/version'
import type ConsoleKernel from './ConsoleKernel'

const settings = {
	config\ConfigRepository: null
	console\ApplicationConsole: null
	environment: null
	port: 3000
	host: '0.0.0.0'
	server: null
	request: null
	migration: null
	seeder: null
	handler: null
	interceptors: []
}

export default class Application

	prop bindings = new Object
	prop config\ConfigRepository
	prop hooks = []
	prop plugins = []
	prop root = null
	prop handler\ExceptionHandler = null
	prop context\Context = Context
	prop serverConfig\Object = {
		ignoreTrailingSlash: true
	}

	def constructor root\String
		self.root = root

		settings.console = new ApplicationConsole('Formidable Framework', version!)
		settings.environment = new EnvironmentRepository(root)
		settings.migration = new Migration
		settings.seeder = new Seeder
		settings.port = Number(process.env.FORMIDABLE_PORT) || 3000
		settings.host = process.env.HOST || '0.0.0.0'

	static def getConfig notation\String, default\any = null
		settings.config.get(notation, default)

	static def getEnv key\String, default\any = null
		settings.environment.get(key, default)

	static def env
		settings.environment.get('app.env')

	static get version
		appVersion!

	get version
		appVersion!

	def port default\Number = 3000
		settings.port || default

	def host default = '0.0.0.0'
		settings.host || default

	def routes
		Route.all!

	def server config\Object
		self.serverConfig = config

		self

	def fastify
		settings.server

	def intercept callback\Function
		settings.interceptors.push(callback)

		self

	def addHook hook, handler
		if self.hooks[hook] == undefined || self.hooks[hook] == null
			hooks[hook] = new Array

		hooks[hook].push(handler)

		self

	def registerCommand command
		settings.console.register(command)

		self

	def register plugin\Function, options\Object = {}, handler\Function = null
		self.plugins.push({
			plugin: plugin
			options: options
			handler: handler
		})

		self

	def on event\String, callback\Function
		if event === 'onDefaultCommand'
			settings.console.onDefaultCommand(callback)
		else
			throw new Error `Application.on: event ${event} not supported`

		self

	def onResponse handler\Function
		addResolver(handler)
		addExceptionResolver(handler)

		self

	def migration
		settings.migration

	def seeder
		settings.seeder

	def make abstract\Function, params\array = []
		const key = Object.keys({[abstract]: null})[0]

		try
			new self.bindings[key.replace(/\t/g, '').split('\r\n')](...params)

	def bind abstract\Function, concrete\Function
		const key = Object.keys({[abstract]: null})[0]

		Object.assign self.bindings, {
			[key.replace(/\t/g, '').split('\r\n')]: concrete
		}

		if abstract.name == ConfigRepository.name
			settings.config = self.make ConfigRepository

		self

	def cache distribute\Boolean = false
		Bootstrap.cache "./bootstrap/cache/config.json", self.make(ConfigRepository).all!

		if distribute && fs.existsSync('./.formidable')
			Bootstrap.cache "./.formidable/config.json", self.make(ConfigRepository).all!

	def initiate kernel\Kernel, returnMode\Boolean = false
		settings.server = await kernel.listen(
			self.config,
			self.handler,
			settings.interceptors,
			self.hooks,
			self.plugins,
			self.serverConfig,
			returnMode
		)

		return self

	def craftsman kernel\ConsoleKernel
		kernel.registerCommands(settings.console, this)

		{
			run: do
				settings.console.run!
		}

	def console
		settings.console

	def prepare
		self.config = self.make(ConfigRepository)
		self.handler = self.make ExceptionHandler, [self.config]

		self.resolve!

		self

	def resolve
		const resolvers = self.config.get 'app.resolvers'

		if resolvers && resolvers instanceof Array

			for resolver in resolvers
				resolver = resolver.default ?? resolver

				self.bootResolver(resolver)
				self.registerResolver(resolver)

	def bootResolver resolver
		new resolver(self).boot!

	def registerResolver resolver
		new resolver(self).register!
