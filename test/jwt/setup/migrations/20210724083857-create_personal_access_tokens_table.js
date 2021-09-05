exports.up = function(knex, Promise) {
  return knex.schema.createTable('personal_access_tokens', function(table) {
    table.increments();
    table.string('tokenable_type').notNullable();
    table.integer('tokenable_id').notNullable();
    table.string('name').notNullable();
    table.text('abilities').nullable();
    table.timestamp('last_used_at').defaultTo(knex.fn.now())
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('personal_access_tokens');
}