import { Faker } from "@faker-js/faker";
import Database from "./Database";
import Repository from "./Repository";
import type { Knex } from "knex";

export declare class Factory {
  /**
   * The repository instance.
   */
  protected repository: Repository | typeof Repository | null;

  /**
   * The name of the database table.
   */
  protected table: string | null;

  /**
   * Get the table name.
   */
  private get tableName();

  /**
   * Create a new Factory instance.
   *
   * @param {number} [count] - The number of records to generate.
   */
  constructor(count?: number);

  /**
   * Create a new factory instance.
   *
   * @param {number} [count] - The number of records to generate.
   * @returns {U} - A new factory instance.
   */
  static factory<U>(this: new (count?: number) => U, count?: number): U;

  /**
   * Set the number of records to generate.
   *
   * @param {number} count - The number of records.
   * @returns {this} - The factory instance.
   */
  count(count: number): this;

  /**
   * Set database instance to use.
   *
   * @param db {Knex | Database} - The database instance.
   */
  using(db: Knex | Database): this;

  /**
   * Define the default attributes for the model.
   *
   * @returns {Promise<any>} - The defined attributes.
   */
  definition(): Promise<any>;

  /**
   * Reset the factory state.
   *
   * @returns {this} - The factory instance.
   */
  reset(): this;

  /**
   * Get the Faker instance.
   *
   * @returns {Faker} - The Faker instance.
   */
  faker(): Faker;

  /**
   * Set a custom state for the factory.
   *
   * @param {Record<string, any>} data - The custom state data.
   * @returns {this} - The factory instance.
   */
  state(data: Record<string, any>): this;

  /**
   * Create and persist records in the database.
   *
   * @param {any} [data] - Optional data to override defaults.
   * @returns {Promise<T>} - The created record(s).
   */
  create<T = any>(data?: any): Promise<T>;
}
