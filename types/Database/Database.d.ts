import type { Knex } from "knex";

export default Database;
declare let Database: Knex;

import "knex";

declare module "knex" {
  namespace Knex {
    interface QueryBuilder {
      create<T = unknown>(data: any): Promise<T>;
      softDelete<T = unknown>(): Promise<T>;
      restore<T = unknown>(): Promise<T>;
      withTrashed(): Knex.QueryBuilder;
      withoutTrashed(): Knex.QueryBuilder;
      onlyTrashed(): Knex.QueryBuilder;
    }
    interface TableBuilder {
      softDeletes(): Knex.TableBuilder;
      dropSoftDeletes(): Knex.TableBuilder;
    }
  }
}
