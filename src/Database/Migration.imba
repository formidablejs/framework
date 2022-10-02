import Database from './Database'
import isEmpty from '../Support/Helpers/isEmpty'

export default class Migration

	def make name\string
		if isEmpty(Database) then return false

		Database.migrate.make name

	def migrate name\string|null = null, up\boolean = true
		if isEmpty(Database) then return false

		const config = {}

		if !isEmpty(name) then config.name = name

		Database.migrate[up ? 'up' : 'down'](config)

	def latest
		if isEmpty(Database) then return false

		Database.migrate.latest!

	def fresh
		if isEmpty(Database) then return false

		await Database.migrate.rollback({}, true)

		await Database.migrate.latest!

	def rollback all\boolean = false
		if isEmpty(Database) then return false

		Database.migrate.rollback({}, all)

	def list
		if isEmpty(Database) then return false

		Database.migrate.list!
