const { Knex } = require('knex');

/** @param {Knex} knex */
exports.up = (knex) => {
  knex.schema.hasTable('personal_access_tokens')
    .then((exists) => {
      if (!exists) {
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
    })
    .catch((error) => {
      console.error('Error checking for personal_access_tokens table:', error);
    });
}

/** @param {Knex} knex */
exports.down = (knex) => knex.schema.dropTable('personal_access_tokens');
