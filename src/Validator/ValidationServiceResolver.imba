import DB from '../Database/Database'
import ServiceResolver from '../Support/ServiceResolver'
import Validator from './Validator'

export default class ValidationServiceResolver < ServiceResolver

	def boot
		const rules = self.registeredRules!

		this.registerRules rules

	def register
		Validator.get!.register 'nullable', self.nullable, ''
		Validator.get!.registerAsync 'unique', self.unique
		Validator.get!.registerAsync 'exists', self.unique

	def nullable
		true

	def unique value\string, definition\string, field\string, passes\CallableFunction
		let [
			table,
			column = field,
			ignore = null
		] = definition.split(',')

		let results

		if ignore
			const [
				identifierValue,
				identifierColumn = 'id'
			] = ignore.split(':')

			results = await DB.table(table)
				.whereRaw("LOWER({column}) = LOWER(?) AND {identifierColumn} != ?", [ value, identifierValue ])
				.first!
		else
			results = await DB.table(table)
				.whereRaw("LOWER({column}) = LOWER(?)", [ value ])
				.first!

		passes(!results, "The {field} has already been taken.")

	def exists value\string, definition\string, field\string, passes\CallableFunction
		let [
			table,
			column = field,
			ignore = null
		] = definition.split(',')

		const results = await DB.table(table)
			.whereRaw(`LOWER(${field}) = LOWER(?)`, [value])
			.first()

		passes(results !== undefined || results !== null, "The selected {field} is invalid.")

	def registeredRules
		{  }

	def registerRules rules\object
		Object.keys(rules).forEach do(name)
			Validator.get!.registerAsync(name, rules[name].handler)

		this
