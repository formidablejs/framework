const { Knex } = require('knex');
const { db } = require('./db-config');

module.exports = class Database {
  static table(name) {
    return db.from(name)
  }

  /**
   * @returns {Knex} db
   */
  static get knex() {
    return db;
  }
}