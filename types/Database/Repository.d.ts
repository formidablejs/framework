import type { Knex } from 'knex'

export default class Repository {
    get tableName(): string;
    get db(): Knex;
    get database(): Knex;
    get table(): Knex;
}
