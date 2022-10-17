import type { Knex } from "knex";

export default class Repository {
    get table(): string;
    get database(): Knex;
    get db(): Knex
}
