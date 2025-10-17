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
		Validator.get!.registerAsync 'exists', self.exists

	def nullable
		true

	def unique value\string, definition\string, field\string, passes\CallableFunction
		let rawDef = definition.trim!
		let conditionBlock = null

		if rawDef.includes('[')
			conditionBlock = rawDef.slice(rawDef.indexOf('[') + 1, rawDef.lastIndexOf(']'))
			rawDef = rawDef.slice(0, rawDef.indexOf('[')) // remove condition part

		let [
			table,
			column = field,
			ignore = null
		] = rawDef.split(',')

		let results

		let query = DB.table(table)

		if ignore
			let [identifierValue, identifierColumn = 'id'] = ignore.split(':')
			query.whereRaw("LOWER({column}) = LOWER(?) AND {identifierColumn} != ?", [value, identifierValue])
		else
			query.whereRaw("LOWER({column}) = LOWER(?)", [value])

		if conditionBlock
			let conditionRegex = /(where(?:Not)?(?:In|Like|ILike|Null)?\(([^)]*)\))/g
			let conditionMatch

			while conditionMatch = conditionRegex.exec(conditionBlock)
				let full = conditionMatch[1]
				let method = full.split('(')[0].trim()
				let args = conditionMatch[2].split(',').map do(x) x.trim()

				args = args.map do(arg) arg === 'true' ? true : arg === 'false' ? false : arg === 'null' ? null : isNaN(arg) ? arg.replace(/^['"]|['"]$/g, '') : Number(arg)

				if method in ['where', 'whereNot']
					query[method](...args)
				else if method in ['whereIn', 'whereNotIn']
					query[method](args[0], args.slice(1))
				else if method in ['whereLike', 'whereILike']
					query[method](...args)
				else if method in ['whereNull', 'whereNotNull']
					query[method](args[0])
				else
					continue

		results = await query.first!

		passes(!results, "The {field} has already been taken.")

	def exists value\string, definition\string, field\string, passes\CallableFunction
		let [
			table,
			column = field,
			ignore = null
		] = definition.split(',')

		const results = await DB.table(table)
			.whereRaw("LOWER({field}) = LOWER(?)", [value])
			.first()

		passes(results ? true : false, "The selected {field} is invalid.")

	def registeredRules
		{  }

	def registerRules rules\object
		for name in Object.keys(rules)
			Validator.get!.registerAsync(name, rules[name])

		this
