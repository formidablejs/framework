const { Knex } = require('knex');

/** @param {Knex} knex */
exports.up = (knex) => {
	return knex.schema.createTable('personal_access_tokens', (table) => {
		table.increments('id').primary();
		table.string('tokenable_type');
		table.bigInteger('tokenable_id').index().unsigned();
		table.string('name');
		table.string('abilities').nullable();
		table.string('payload').nullable();
		table.integer('ttl').index().nullable();
		table.timestamp('last_used_at').nullable();
		table.timestamps(true, true);
	});
}

/** @param {Knex} knex */
exports.down = (knex) => knex.schema.dropTable('personal_access_tokens');
