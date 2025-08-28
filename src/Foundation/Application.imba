import { addExceptionResolver } from './Exceptions/Handler/handleException'
import { addResolver } from '../Http/Kernel/resolveResponse'
import { Application as ApplicationConsole } from '@formidablejs/console'
import { Context } from './Context'
import { ServeEvents } from './Console/ServeEvents'
import appVersion from '../Support/Helpers/version'
import Bootstrap from './Bootstrap'
import ConfigRepository from '../Config/Repository'
import Database from '../Database/Database'
import DatabaseConfig from '../Database/Config'
import EnvironmentRepository from '../Environment/Repository'
import ExceptionHandler from './Exceptions/Handler'
import fs from 'fs'
import InvalidServiceResolver from './Exceptions/InvalidServiceResolver'
import isEmpty from '../Support/Helpers/isEmpty'
import Kernel from '../Http/Kernel'
import Migration from '../Database/Migration'
import Route from '../Http/Router/Route'
import Seeder from '../Database/Seeder'
import ServiceResolver from '../Support/ServiceResolver'
import version from '../Support/Helpers/version'
import loadHelpers from '../Support/Helpers/loadHelpers'
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
	prop beforeListen = null
	prop serverConfig\object = {
		routerOptions: {
			ignoreTrailingSlash: true
		}
	}

	def constructor root\string
		loadHelpers!

		self.root = root

		settings.console = new ApplicationConsole('Formidable Framework', version!)
		settings.environment = new EnvironmentRepository(root)
		settings.migration = new Migration
		settings.seeder = new Seeder
		settings.port = Number(process.env.FORMIDABLE_PORT) || 3000
		settings.host = process.env.HOST || '0.0.0.0'

	static def getConfig notation\string, default\any = null
		settings.config.get(notation, default)

	static def getEnv key\string, default\any = null
		settings.environment.get(key, default)

	static def env
		settings.environment.get('app.env')

	static get version
		appVersion!

	get version
		appVersion!

	get isCli?
		process.argv.at(-1).endsWith('console.js')

	def port default\number = 3000
		settings.port || default

	def host default = '0.0.0.0'
		settings.host || default

	def routes
		Route.all!

	def onBeforeListen event
		self.beforeListen = event

	def onServeInjection event
		ServeEvents.add event

	def server config\object
		self.serverConfig = config

		self

	def fastify
		settings.server

	def intercept callback\function
		settings.interceptors.push(callback)

		self

	def addHook hook\string, handler
		if self.hooks[hook] == undefined || self.hooks[hook] == null
			hooks[hook] = new Array

		hooks[hook].push(handler)

		self

	def registerCommand command
		settings.console.register(command)

		self

	def register plugin\function, options\object = {}, handler\function = null
		self.plugins.push({
			plugin: plugin
			options: options
			handler: handler
		})

		self

	def on event\string, callback\function
		if event === 'onDefaultCommand'
			settings.console.onDefaultCommand(callback)
		else
			throw new Error `Application.on: event ${event} not supported`

		self

	def onResponse handler\function
		addResolver(handler)
		addExceptionResolver(handler)

		self

	def migration
		settings.migration

	def seeder
		settings.seeder

	def make abstract\function, params\array = []
		const key = Object.keys({[abstract]: null})[0]

		try
			new self.bindings[key.replace(/\t/g, '').split('\r\n')](...params)

	def bind abstract\function, concrete\function
		const key = Object.keys({[abstract]: null})[0]

		Object.assign self.bindings, {
			[key.replace(/\t/g, '').split('\r\n')]: concrete
		}

		if abstract.name == ConfigRepository.name
			settings.config = self.make ConfigRepository

		self

	def cache distribute\boolean = false
		Bootstrap.cache "./bootstrap/cache/config.json", self.make(ConfigRepository).all!

		if distribute && fs.existsSync('./.formidable')
			Bootstrap.cache "./.formidable/config.json", self.make(ConfigRepository).all!

	def initiate kernel\Kernel, returnMode\boolean = false
		settings.server = await kernel.listen(
			self.config,
			self.handler,
			settings.interceptors,
			self.hooks,
			self.plugins,
			self.serverConfig,
			self.beforeListen,
			returnMode
		)

		return self

	def craftsman kernel\ConsoleKernel
		kernel.registerCommands(settings.console, this)

		{
			run: do settings.console.run!
		}

	def console
		settings.console

	def prepare\Application resolvers = null
		self.config = self.make(ConfigRepository)
		self.handler = self.make ExceptionHandler, [self.config]

		self.resolve(resolvers)

		self

	def resolve resolvers = null
		resolvers = resolvers ? (resolvers.default ?? resolvers) : self.config.get 'app.resolvers'

		if !(resolvers && resolvers instanceof Array)
			return

		for resolver\ServiceResolver in resolvers
			if isCli? && resolver && resolver.runInCli !== undefined && resolver.cli == false
				continue

			if resolver == undefined || resolver == null
				throw new InvalidServiceResolver 'Service Resolver is not defined. Please check your app config.'

			resolver = new resolver(self)

			resolver.boot!
			resolver.register!

			if resolver.context && Array.isArray(resolver.context)
				resolver.context.forEach do(context)
					self.context.inject(context)
