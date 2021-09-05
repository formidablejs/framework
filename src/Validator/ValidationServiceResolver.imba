const ServiceResolver = require '../Support/ServiceResolver'
const Validator = require './Validator'

module.exports = class ValidationServiceResolver < ServiceResolver

	def boot
		const rules = self.registeredRules!

		this.registerRules rules

	def registeredRules
		{  }

	def registerRules rules\Object
		Object.keys(rules).forEach do(name)
			Validator.get!.registerAsync(name, rules[name].handler)

		this
