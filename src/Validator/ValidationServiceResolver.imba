import ServiceResolver from '../Support/ServiceResolver'
import Validator from './Validator'

export default class ValidationServiceResolver < ServiceResolver

	def boot
		const rules = self.registeredRules!

		this.registerRules rules

	def registeredRules
		{  }

	def registerRules rules\Object
		Object.keys(rules).forEach do(name)
			Validator.get!.registerAsync(name, rules[name].handler)

		this
