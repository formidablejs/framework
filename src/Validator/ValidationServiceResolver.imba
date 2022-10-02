import ServiceResolver from '../Support/ServiceResolver'
import Validator from './Validator'

export default class ValidationServiceResolver < ServiceResolver

	def boot
		const rules = self.registeredRules!

		this.registerRules rules

	def register
		Validator.get!.register 'nullable', self.nullable, ''

	def nullable
		true

	def registeredRules
		{  }

	def registerRules rules\object
		Object.keys(rules).forEach do(name)
			Validator.get!.registerAsync(name, rules[name].handler)

		this
