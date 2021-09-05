
const Config = require('./Config'/*$path$*/);
const knex = require('knex'/*$path$*/)(Config.make());

const {attachPaginate: attachPaginate} = require('knex-paginate'/*$path$*/);
attachPaginate();

module.exports = knex;
