
const Config = require('./Config'/*$path$*/);

let knex = null;

try {
	
	knex = require('knex'/*$path$*/)(Config.make());
	
	const {attachPaginate: attachPaginate} = require('knex-paginate'/*$path$*/);
	attachPaginate();
} catch (φ) {
	
	knex = null;
};

module.exports = knex;
