import pluralize from 'pluralize'
import Database from './Database'

export class Factory

	repository
	table
	#_total = 1
	#_database
	#_reset_table = false
	#_faker
	#_state = {}

	get tableName
		const className = this.constructor.name.split(/(?=[A-Z])/)

		if className.length > 0 && className[className.length - 1].toLowerCase() == 'factory'
			className.pop!

		pluralize(className.join('_').toLowerCase())

	def constructor count = 1
		if !this.repository && !this.table
			this.table = this.tableName

		this.#_database = Database
		this.#_total = count

	static def factory count = 1
		new this(count)

	def using db
		this.#_database = db

		this

	def definition
		{}

	def count count
		this.#_total = count

		this

	def reset
		this.#_reset_table = true

		this

	def faker
		this.#_faker

	def state data
		this.#_state = { ...this.#_state, ...data }

		this

	def create data = null
		const items = []

		for i in [0...this.#_total]
			this.#_faker = require('@faker-js/faker').faker

			let definition = await this.definition!

			if this.#_state
				definition = { ...definition, ...this.#_state }

			if data
				definition = { ...definition, ...data }


			items.push definition

		if this.repository
			if this.#_reset_table
				await this.repository.delete!

			return await this.repository.create(items)

		if this.#_reset_table
			await this.#_database.table(this.table).delete!

		await this.#_database.table(this.table).create(items)
