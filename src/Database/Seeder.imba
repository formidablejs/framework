import Database from './Database'
import isEmpty from '../Support/Helpers/isEmpty'

export default class Seeder

	def make name\string
		if isEmpty(Database) then return false

		Database.seed.make name

	def run
		if isEmpty(Database) then return false

		Database.seed.run!
