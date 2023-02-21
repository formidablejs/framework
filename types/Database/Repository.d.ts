import type { Knex } from 'knex'
import type { Registry } from 'knex'

export default class Repository {
    get tableName(): string;
    get db(): Knex;
    get database(): Knex;
    get table(): Knex;
    static query(): Knex;
    static find(value: any): any;
    static first(): Knex.Select<TRecord, Knex.DeferredKeySelection.AddUnionMember<Knex.UnwrapArrayMember<TResult>, undefined>>;
    static insert(
        data: TRecord extends CompositeTableType<unknown>
          ?
              | ResolveTableType<TRecord, 'insert'>
              | ReadonlyArray<ResolveTableType<TRecord, 'insert'>>
          : DbRecordArr<TRecord> | ReadonlyArray<Knex.DbRecordArr<TRecord>>,
        returning?: '*',
        options?: Knex.DMLOptions
      ): Knex.QueryBuilder<TRecord, Knex.DeferredKeySelection<TRecord, never>[]>;
      insert<
        TKey extends Knex.StrKey<ResolveTableType<TRecord>>,
        TResult2 = Knex.DeferredKeySelection.Augment<
          Knex.UnwrapArrayMember<TResult>,
          ResolveTableType<TRecord>,
          TKey
        >[]
      >(
        data: TRecord extends CompositeTableType<unknown>
          ?
              | ResolveTableType<TRecord, 'insert'>
              | ReadonlyArray<ResolveTableType<TRecord, 'insert'>>
          : Knex.DbRecordArr<TRecord> | ReadonlyArray<Knex.DbRecordArr<TRecord>>,
        returning?: TKey,
        options?: Knex.DMLOptions
      ): Knex.QueryBuilder<TRecord, TResult2>;
      insert<
        TKey extends StrKey<ResolveTableType<TRecord>>,
        TResult2 = Knex.DeferredKeySelection.Augment<
          Knex.UnwrapArrayMember<TResult>,
          ResolveTableType<TRecord>,
          TKey
        >[]
      >(
        data: TRecord extends CompositeTableType<unknown>
          ?
              | ResolveTableType<TRecord, 'insert'>
              | ReadonlyArray<ResolveTableType<TRecord, 'insert'>>
          : Knex.DbRecordArr<TRecord> | ReadonlyArray<Knex.DbRecordArr<TRecord>>,
        returning?: readonly TKey[],
        options?: Knex.DMLOptions
      ): Knex.QueryBuilder<TRecord, TResult2>;
      insert<
        TKey extends string,
        TResult2 = Knex.DeferredKeySelection.Augment<
          Knex.UnwrapArrayMember<TResult>,
          TRecord,
          TKey
        >[]
      >(
        data: TRecord extends CompositeTableType<unknown>
          ?
              | ResolveTableType<TRecord, 'insert'>
              | ReadonlyArray<ResolveTableType<TRecord, 'insert'>>
          : Knex.DbRecordArr<TRecord> | ReadonlyArray<Knex.DbRecordArr<TRecord>>,
        returning?: TKey,
        options?: Knex.DMLOptions
      ): Knex.QueryBuilder<TRecord, TResult2>;
      insert<
        TKey extends string,
        TResult2 = Knex.DeferredKeySelection.Augment<
          Knex.UnwrapArrayMember<TResult>,
          TRecord,
          TKey
        >[]
      >(
        data: TRecord extends CompositeTableType<unknown>
          ?
              | ResolveTableType<TRecord, 'insert'>
              | ReadonlyArray<ResolveTableType<TRecord, 'insert'>>
          : Knex.DbRecordArr<TRecord> | ReadonlyArray<Knex.DbRecordArr<TRecord>>,
        returning?: readonly TKey[],
        options?: Knex.DMLOptions
      ): Knex.QueryBuilder<TRecord, TResult2>;
      insert<TResult2 = number[]>(
        data: TRecord extends CompositeTableType<unknown>
          ?
              | ResolveTableType<TRecord, 'insert'>
              | ReadonlyArray<ResolveTableType<TRecord, 'insert'>>
          : Knex.DbRecordArr<TRecord> | ReadonlyArray<Knex.DbRecordArr<TRecord>>
      ): Knex.QueryBuilder<TRecord, TResult2>;

    static join: Knex.Join<TRecord, TResult>;
    static joinRaw: Knex.JoinRaw<TRecord, TResult>;
    static innerJoin: Knex.Join<TRecord, TResult>;
    static leftJoin: Knex.Join<TRecord, TResult>;
    static leftOuterJoin: Knex.Join<TRecord, TResult>;
    static rightJoin: Knex.Join<TRecord, TResult>;
    static rightOuterJoin: Knex.Join<TRecord, TResult>;
    static outerJoin: Knex.Join<TRecord, TResult>;
    static fullOuterJoin: Knex.Join<TRecord, TResult>;
    static crossJoin: Knex.Join<TRecord, TResult>;
    static where: Knex.Where<TRecord, TResult>;
    static whereNot: Knex.Where<TRecord, TResult>;
    static whereRaw: Knex.WhereRaw<TRecord, TResult>;
    static whereExists: Knex.WhereExists<TRecord, TResult>;
    static whereNotExists: Knex.WhereExists<TRecord, TResult>;
    static whereIn: Knex.WhereIn<TRecord, TResult>;
    static whereNotIn: Knex.WhereIn<TRecord, TResult>;
    static whereLike: Knex.Where<TRecord, TResult>;
    static whereILike: Knex.Where<TRecord, TResult>;
    static whereNull: Knex.WhereNull<TRecord, TResult>;
    static whereNotNull: Knex.WhereNull<TRecord, TResult>;
    static whereBetween: Knex.WhereBetween<TRecord, TResult>;
    static whereNotBetween: Knex.WhereBetween<TRecord, TResult>;
    static whereJsonObject: Knex.WhereJsonObject<TRecord, TResult>;
    static whereNotJsonObject: Knex.WhereJsonObject<TRecord, TResult>;
    static whereJsonPath: Knex.WhereJsonPath<TRecord, TResult>;
    static whereJsonSupersetOf: Knex.WhereJsonObject<TRecord, TResult>;
    static whereJsonNotSupersetOf: Knex.WhereJsonObject<TRecord, TResult>;
    static whereJsonSubsetOf: Knex.WhereJsonObject<TRecord, TResult>;
    static whereJsonNotSubsetOf: Knex.WhereJsonObject<TRecord, TResult>;
    static groupBy: Knex.GroupBy<TRecord, TResult>;
    static groupByRaw: Knex.RawQueryBuilder<TRecord, TResult>;
    static orderBy: Knex.OrderBy<TRecord, TResult>;
    static orderByRaw: Knex.RawQueryBuilder<TRecord, TResult>;
    static having: Knex.Having<TRecord, TResult>;
    static havingRaw: Knex.RawQueryBuilder<TRecord, TResult>;
    static havingIn: Knex.HavingRange<TRecord, TResult>;
    static havingNotBetween: Knex.HavingRange<TRecord, TResult>;
    static havingBetween: Knex.HavingRange<TRecord, TResult>;
    static havingNotIn: Knex.HavingRange<TRecord, TResult>;
    static min: Knex.TypePreservingAggregation<TRecord, TResult>;
    static max: Knex.TypePreservingAggregation<TRecord, TResult>;
    static sum: Knex.TypePreservingAggregation<TRecord, TResult>;
    static sumDistinct: Knex.TypePreservingAggregation<TRecord, TResult>;
    static avg: Knex.TypePreservingAggregation<TRecord, TResult>;
    static avgDistinct: Knex.TypePreservingAggregation<TRecord, TResult>;
    static offset(offset: number, options?: boolean | Readonly<{ skipBinding?: boolean }>): Knex.QueryBuilder<TRecord, TResult>;
    static limit(limit: number, options?: string | Readonly<{ skipBinding?: boolean }>): Knex.QueryBuilder<TRecord, TResult>;
    static count: Knex.AsymmetricAggregation<TRecord, TResult, Knex.Lookup<Registry, 'Count', number | string>>;
    static countDistinct: Knex.AsymmetricAggregation<TRecord, TResult, Knex.Lookup<Registry, 'Count', number | string>>;
}
