import "knex";
import type { Knex } from "knex";
import type Repository from "../Database/Repository";

declare let Database: Knex;
declare type Database = Knex;

export default Database;

type PaginationOptions = {
  page?: number;
  pageSize?: number;
  query?: any;
  url?: string;
};

type PaginationResults<T = unknown> = {
  data: T[];
  pagination: {
    total: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
    pages: number[];
    firstPage: number;
    lastPage: number;
    prevPage: number;
    nextPage: number;
    links?: {
      [key in 'firstPage' | 'prevPage' | 'nextPage' | 'lastPage' | keyof PaginationResults<T>['pagination']['pages']]: {
        label: string;
        active: boolean;
        url: string;
      };
    };
  };
};


declare module "knex" {
  namespace Knex {
    interface QueryBuilder {
      create<T = unknown>(data: any): Promise<T>;
      softDelete<T = unknown>(): Promise<T>;
      restore<T = unknown>(): Promise<T>;
      withTrashed(): Knex.QueryBuilder;
      withoutTrashed(): Knex.QueryBuilder;
      onlyTrashed(): Knex.QueryBuilder;
      get<T = unknown>(columns?: string[]): Promise<T>;
      pagination<T = unknown>(options: PaginationOptions): Promise<PaginationResults<T>>;
      /**
       * @experimental
       */
      autoPaginate<T = unknown>(perPage?: number): Promise<PaginationResults<T>>;
      hidden(columns: string[]): Knex.QueryBuilder;
      belongsTo(related: string | typeof Repository): Knex.QueryBuilder;
      belongsTo(related: string | typeof Repository, queryCallback: (query: Knex.QueryBuilder) => Knex.QueryBuilder): Knex.QueryBuilder;
      belongsTo(related: string | typeof Repository, foreignKey: string, localKey: string): Knex.QueryBuilder;
      hasOne(related: string | typeof Repository): Knex.QueryBuilder;
      hasOne(related: string | typeof Repository, queryCallback: (query: Knex.QueryBuilder) => Knex.QueryBuilder): Knex.QueryBuilder;
      hasOne(related: string | typeof Repository, foreignKey: string, localKey: string): Knex.QueryBuilder;
      hasMany(related: string | typeof Repository): Knex.QueryBuilder;
      hasMany(related: string | typeof Repository, queryCallback: (query: Knex.QueryBuilder) => Knex.QueryBuilder): Knex.QueryBuilder;
      hasMany(related: string | typeof Repository, foreignKey: string, localKey: string): Knex.QueryBuilder;
      belongsToMany(related: string | typeof Repository): Knex.QueryBuilder;
      belongsToMany(related: string | typeof Repository, queryCallback: (query: Knex.QueryBuilder) => Knex.QueryBuilder): Knex.QueryBuilder;
      belongsToMany(related: string | typeof Repository, pivotTable: string, foreignKey?: string, relatedKey?: string, localKey?: string, relatedLocalKey?: string): Knex.QueryBuilder;
    }
    interface TableBuilder {
      softDeletes(): Knex.TableBuilder;
      dropSoftDeletes(): Knex.TableBuilder;
      rememberToken(): Knex.TableBuilder;
    }
  }
}
