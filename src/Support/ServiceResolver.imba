const Application = require '../Foundation/Application'

module.exports = class ServiceResolver

	prop app\Application

	def constructor app\Application
		self.app = app

	def boot
		self

	def register
		self
