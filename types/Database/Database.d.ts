import type { Knex } from "knex";

export default Database;
declare let Database: Knex;

import "knex";

type PaginationOptions = {
  page?: number;
  pageSize?: number;
  query?: any;
  url?: string;
}

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
      [key: keyof PaginationResults<T>.pagination.pages | 'firstPage' | 'prevPage' | 'nextPage' | 'lastPage']: {
        label: string;
        active: boolean;
        url: string;
      };
    }
  }
}

declare module "knex" {
  namespace Knex {
    interface QueryBuilder {
      create<T = unknown>(data: any): Promise<T>;
      softDelete<T = unknown>(): Promise<T>;
      restore<T = unknown>(): Promise<T>;
      withTrashed(): Knex.QueryBuilder;
      withoutTrashed(): Knex.QueryBuilder;
      onlyTrashed(): Knex.QueryBuilder;
      get<T = unknown>(...columns: ?string[] = null): Promise<T>;
      pagination<T = unknown>(options: PaginationOptions): Promise<PaginationResults<T>>;
      /**
       * @experimental
       */
      autoPaginate<T = unknown>(perPage?: number): Promise<PaginationResults<T>>;
    }
    interface TableBuilder {
      softDeletes(): Knex.TableBuilder;
      dropSoftDeletes(): Knex.TableBuilder;
      rememberToken(): Knex.TableBuilder;
    }
  }
}
