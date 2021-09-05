const Bootstrap = require './Bootstrap'
const ConfigRepository = require '../Config/Repository'
const dotenv = require 'dotenv'
const ExceptionHandler = require './Exceptions/Handler'
const Kernel = require '../Http/Kernel'
const Route = require '../Http/Router/Manager'

const settings = {
	server: null
	config: null
}

module.exports = class Application

	prop bindings = new Object
	prop root = null
	prop config
	prop hooks = new Object

	def constructor root\String
		dotenv.config!

		self.root = root

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

		if abstract.name == ConfigRepository.name
			settings.config = self.make(ConfigRepository)
			Bootstrap.cache './bootstrap/cache/config.json', self.make(ConfigRepository).all!

		self

	def initiate kernel\Kernel, testMode\Boolean = false
		const handler = self.make(ExceptionHandler, [self.config])

		settings.server = await kernel.listen(
			self.config,
			handler,
			self.hooks,
			testMode
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
