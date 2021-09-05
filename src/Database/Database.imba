const Config = require './Config'
const knex = require('knex')(Config.make!)

const { attachPaginate } = require 'knex-paginate'
attachPaginate!

module.exports = knex
