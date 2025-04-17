exports.up = (knex) => {
	return knex.schema.createTable('posts', (table) => {
		table.increments('id').primary();
		table.string('body');
		table.timestamps(true, true);
	});
};

exports.down = (knex) => knex.schema.dropTable('posts');
