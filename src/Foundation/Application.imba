import Bootstrap from './Bootstrap'
import ConfigRepository from '../Config/Repository'
import Database from '../Database/Config'
import ExceptionHandler from './Exceptions/Handler'
import Kernel from '../Http/Kernel'
import Route from '../Http/Router/Route'
import EnvironmentRepository from '../Environment/Repository'

const settings = {
	config: null
	environment: null
	port: 3000
	server: null
	request: null
}

export default class Application

	prop bindings = new Object
	prop config
	prop hooks = new Object
	prop root = null

	def constructor root\String
		self.root = root

		settings.environment = new EnvironmentRepository(root)
		settings.port = process.env.FORMIDABLE_PORT ?? 3000

	static def getConfig notation\String, default\any = null
		self.config.get(notation, default)

	static def getEnv key\String, default\any = null
		settings.environment.get(key, default)

	static def env
		settings.environment.get('app.env')

	def port default\Number = 3000
		settings.port ?? default

	def routes
		Route.all!

	def fastify
		settings.server

	def addHook hook, handler
		if self.hooks[hook] == undefined || self.hooks[hook] == null
			hooks[hook] = new Array

		hooks[hook].push(handler)

		self

	def make abstract\Function, params\array = []
		const key = Object.keys({[abstract]: null})[0]

		try
			new self.bindings[key.replace(/\t/g, '').split('\r\n')](...params)

	def bind abstract\Function, concrete\Function
		const key = Object.keys({[abstract]: null})[0]

		Object.assign self.bindings, {
			[key.replace(/\t/g, '').split('\r\n')]: concrete
		}

		self

	def cache
		settings.config = self.make(ConfigRepository)

		Bootstrap.cache "./bootstrap/cache/config.json", self.make(ConfigRepository).all!

		const dbConfig = Database.make!.connection

		dbConfig.driver = Database.client

		if dbConfig.driver == 'sqlite3' && dbConfig.database
			dbConfig.filename = dbConfig.database

			delete dbConfig.database

		Bootstrap.cache "./bootstrap/cache/database.json", {
			default: dbConfig
		}

	def initiate kernel\Kernel, returnMode\Boolean = false
		const handler = self.make(ExceptionHandler, [self.config])

		settings.server = await kernel.listen(
			self.config,
			handler,
			self.hooks,
			returnMode
		)

		return self

	def prepare
		self.config = self.make(ConfigRepository)

		self.resolve!

		self

	def resolve
		const resolvers = self.config.get 'app.resolvers'

		if resolvers && resolvers instanceof Array

			for resolver in resolvers
				resolver = resolver.default ?? resolver

				self.boot(resolver)
				self.register(resolver)

	def boot resolver
		new resolver(self).boot!

	def register resolver
		new resolver(self).register!
