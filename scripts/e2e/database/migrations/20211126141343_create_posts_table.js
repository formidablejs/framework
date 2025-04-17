const { Knex } = require('knex');

/** @param {Knex} knex */
exports.up = (knex) => {
  knex.schema.hasTable('posts')
    .then((exists) => {
      if (!exists) {
        return knex.schema.createTable('posts', (table) => {
          table.increments('id').primary();
          table.string('body');
          table.timestamps(true, true);
        });
      }
    })
    .catch((error) => {
      console.error('Error checking for posts table:', error);
    });
};

exports.down = (knex) => knex.schema.dropTable('posts');
