const Config = require './Config'

let knex = null

try
	knex = require('knex')(Config.make!)

	const { attachPaginate } = require 'knex-paginate'
	attachPaginate!
catch
	knex = null

module.exports = knex
