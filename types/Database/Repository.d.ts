import { Knex } from 'knex'
import ResultTypes = require('./result')

type AnyOrUnknownToOther<T1, T2> = unknown extends T1 ? T2 : T1;
type SafePartial<T> = Partial<AnyOrUnknownToOther<T, {}>>;

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

type AnyToUnknown<T> = unknown extends T ? unknown : T;
type UnknownToAny<T> = unknown extends T ? any : T;
type StrKey<T> = string & keyof T;
type CurlyCurlyToAny<T> = T extends unknown // distribute
  ? (<U>() => U extends T ? 0 : 1) extends <U>() => U extends {} ? 0 : 1
    ? any
    : T
  : never;
type ArrayIfAlready<T1, T2> = AnyToUnknown<T1> extends any[] ? T2[] : T2;
type UnwrapArrayMember<T> = T extends (infer M)[] ? M : T;
type UnknownOrCurlyCurlyToAny<T> = [UnknownToAny<T> | CurlyCurlyToAny<T>][0];

type AugmentParams<TTarget, TParams> = TParams extends {}
  ? keyof TParams extends never
    ? TTarget
    : {} & TTarget & TParams
  : TTarget;

// Wrap a type in a container, making it an object type.
// This is primarily useful in circumventing special handling of union/intersection in typescript
interface Boxed<T> {
  _value: T;
}

type SafePick<T, K extends keyof T> = T extends {} ? Pick<T, K> : any;

type PartialOrAny<TBase, TKeys> = Boxed<TKeys> extends Boxed<never>
  ? {}
  : Boxed<TKeys> extends Boxed<keyof TBase>
  ? SafePick<TBase, TKeys & keyof TBase>
  : any;

type MappedAliasType<TBase, TAliasMapping> = {} & {
    [K in keyof TAliasMapping]: TAliasMapping[K] extends keyof TBase
      ? TBase[TAliasMapping[K]]
      : any;
  };

type DeferredKeySelection<
  // The base of selection. In intermediate stages this may be unknown.
  // If it remains unknown at the point of resolution, the selection will fall back to any
  TBase,
  // Union of keys to be selected
  // In intermediate stages this may be never.
  TKeys extends string,
  // Changes how the resolution should behave if TKeys is never.
  // If true, then we assume that some keys were selected, and if TKeys is never, we will fall back to any.
  // If false, and TKeys is never, then we select TBase in its entirety
  THasSelect extends true | false = false,
  // Mapping of aliases <key in result> -> <key in TBase>
  TAliasMapping extends {} = {},
  // If enabled, then instead of extracting a partial, during resolution
  // we will pick just a single property.
  TSingle extends boolean = false,
  // Extra props which will be intersected with the result
  TIntersectProps extends {} = {},
  // Extra props which will be unioned with the result
  TUnionProps = never
> = {
  // These properties are not actually used, but exist simply because
  // typescript doesn't end up happy when type parameters are unused
  _base: TBase;
  _hasSelection: THasSelect;
  _keys: TKeys;
  _aliases: TAliasMapping;
  _single: TSingle;
  _intersectProps: TIntersectProps;
  _unionProps: TUnionProps;
};

declare namespace DeferredKeySelection {
  type Any = DeferredKeySelection<any, any, any, any, any, any, any>;

  // Replace the Base if already a deferred selection.
  // If not, create a new deferred selection with specified base.
  type SetBase<TSelection, TBase> = TSelection extends DeferredKeySelection<
    any,
    infer TKeys,
    infer THasSelect,
    infer TAliasMapping,
    infer TSingle,
    infer TIntersectProps,
    infer TUnionProps
  >
    ? DeferredKeySelection<
      TBase,
      TKeys,
      THasSelect,
      TAliasMapping,
      TSingle,
      TIntersectProps,
      TUnionProps
    >
    : DeferredKeySelection<TBase, never>;

  // If TSelection is already a deferred selection, then replace the base with TBase
  // If unknown, create a new deferred selection with TBase as the base
  // Else, retain original
  //
  // For practical reasons applicable to current context, we always return arrays of
  // deferred selections. So, this particular operator may not be useful in generic contexts.
  type ReplaceBase<TSelection, TBase> =
    UnwrapArrayMember<TSelection> extends DeferredKeySelection.Any
    ? ArrayIfAlready<
      TSelection,
      DeferredKeySelection.SetBase<UnwrapArrayMember<TSelection>, TBase>
    >
    : unknown extends UnwrapArrayMember<TSelection>
    ? ArrayIfAlready<TSelection, DeferredKeySelection.SetBase<unknown, TBase>>
    : TSelection;

  // Type operators to substitute individual type parameters:

  type SetSingle<
    TSelection,
    TSingle extends boolean
  > = TSelection extends DeferredKeySelection<
    infer TBase,
    infer TKeys,
    infer THasSelect,
    infer TAliasMapping,
    any,
    infer TIntersectProps,
    infer TUnionProps
  >
    ? DeferredKeySelection<
      TBase,
      TKeys,
      THasSelect,
      TAliasMapping,
      TSingle,
      TIntersectProps,
      TUnionProps
    >
    : never;

  type AddKey<
    TSelection,
    TKey extends string
  > = TSelection extends DeferredKeySelection<
    infer TBase,
    infer TKeys,
    any,
    infer TAliasMapping,
    infer TSingle,
    infer TIntersectProps,
    infer TUnionProps
  >
    ? DeferredKeySelection<
      TBase,
      TKeys | TKey,
      true,
      TAliasMapping,
      TSingle,
      TIntersectProps,
      TUnionProps
    >
    : DeferredKeySelection<unknown, TKey, true>;

  type AddAliases<
    TSelection,
    T extends {}
  > = TSelection extends DeferredKeySelection<
    infer TBase,
    infer TKeys,
    infer THasSelect,
    infer TAliasMapping,
    infer TSingle,
    infer TIntersectProps,
    infer TUnionProps
  >
    ? DeferredKeySelection<
      TBase,
      TKeys,
      THasSelect,
      TAliasMapping & T,
      TSingle,
      TIntersectProps,
      TUnionProps
    >
    : DeferredKeySelection<unknown, never, false, T>;

  type AddUnionMember<TSelection, T> = TSelection extends DeferredKeySelection<
    infer TBase,
    infer TKeys,
    infer THasSelect,
    infer TAliasMapping,
    infer TSingle,
    infer TIntersectProps,
    infer TUnionProps
  >
    ? DeferredKeySelection<
      TBase,
      TKeys,
      THasSelect,
      TAliasMapping,
      TSingle,
      TIntersectProps,
      TUnionProps | T
    >
    : DeferredKeySelection<TSelection, never, false, {}, false, {}, T>;

  // Convenience utility to set base, keys and aliases in a single type
  // application
  type Augment<
    T,
    TBase,
    TKey extends string,
    TAliasMapping extends {} = {}
  > = AddAliases<AddKey<SetBase<T, TBase>, TKey>, TAliasMapping>;

  // Core resolution logic -- Refer to docs for DeferredKeySelection for specifics
  type ResolveOne<TSelection> = TSelection extends DeferredKeySelection<
    infer TBase,
    infer TKeys,
    infer THasSelect,
    infer TAliasMapping,
    infer TSingle,
    infer TIntersectProps,
    infer TUnionProps
  >
    ? UnknownOrCurlyCurlyToAny<
      // ^ We convert final result to any if it is unknown for backward compatibility.
      //   Historically knex typings have been liberal with returning any and changing
      //   default return type to unknown would be a major breaking change for users.
      //
      //   So we compromise on type safety here and return any.
      | AugmentParams<
        AnyToUnknown<TBase> extends {}
        ? // ^ Conversion of any -> unknown is needed here to prevent distribution
        //   of any over the conditional
        TSingle extends true
        ? TKeys extends keyof TBase
        ? TBase[TKeys]
        : any
        : AugmentParams<
          true extends THasSelect
          ? PartialOrAny<TBase, TKeys>
          : TBase,
          MappedAliasType<TBase, TAliasMapping>
        >
        : unknown,
        TIntersectProps
      >
      | TUnionProps
    >
    : TSelection;

  type Resolve<TSelection> = TSelection extends DeferredKeySelection.Any
    ? Knex.ResolveTableType<ResolveOne<TSelection>>
    : TSelection extends DeferredKeySelection.Any[]
    ? Knex.ResolveTableType<ResolveOne<TSelection[0]>>[]
    : TSelection extends (infer I)[]
    ? UnknownOrCurlyCurlyToAny<Knex.ResolveTableType<I>>[]
    : UnknownOrCurlyCurlyToAny<Knex.ResolveTableType<TSelection>>;
}

interface DMLOptions {
  includeTriggerModifications?: boolean;
}

export default class Repository<TRecord extends {} = any, TResult = any> {
  get tableName(): string;
  get db(): Knex;
  get database(): Knex;
  get table(): Knex;
  protected get hidden(): string[];
  static query(): Knex;
  static find<T = unknown>(value: any): Promise<T>;
  static first<TRecord extends {} = any, TResult = any>(): Knex.Select<TRecord, DeferredKeySelection.AddUnionMember<UnwrapArrayMember<TResult>, undefined>>;
  static insert<TRecord extends {} = any>(
    data: TRecord extends Knex.CompositeTableType<unknown>
      ?
      | Knex.ResolveTableType<TRecord, 'insert'>
      | ReadonlyArray<Knex.ResolveTableType<TRecord, 'insert'>>
      : Knex.DbRecordArr<TRecord> | ReadonlyArray<Knex.DbRecordArr<TRecord>>,
    returning?: '*',
    options?: DMLOptions
  ): Knex.QueryBuilder<TRecord, DeferredKeySelection<TRecord, never>[]>;
  insert<
    TKey extends StrKey<Knex.ResolveTableType<TRecord>>,
    TResult2 = DeferredKeySelection.Augment<
      UnwrapArrayMember<TResult>,
      Knex.ResolveTableType<TRecord>,
      TKey
    >[]
  >(
    data: TRecord extends Knex.CompositeTableType<unknown>
      ?
      | Knex.ResolveTableType<TRecord, 'insert'>
      | ReadonlyArray<Knex.ResolveTableType<TRecord, 'insert'>>
      : Knex.DbRecordArr<TRecord> | ReadonlyArray<Knex.DbRecordArr<TRecord>>,
    returning?: TKey,
    options?: DMLOptions
  ): Knex.QueryBuilder<TRecord, TResult2>;
  insert<
    TKey extends StrKey<Knex.ResolveTableType<TRecord>>,
    TResult2 = DeferredKeySelection.Augment<
      UnwrapArrayMember<TResult>,
      Knex.ResolveTableType<TRecord>,
      TKey
    >[]
  >(
    data: TRecord extends Knex.CompositeTableType<unknown>
      ?
      | Knex.ResolveTableType<TRecord, 'insert'>
      | ReadonlyArray<Knex.ResolveTableType<TRecord, 'insert'>>
      : Knex.DbRecordArr<TRecord> | ReadonlyArray<Knex.DbRecordArr<TRecord>>,
    returning?: readonly TKey[],
    options?: DMLOptions
  ): Knex.QueryBuilder<TRecord, TResult2>;
  insert<
    TKey extends string,
    TResult2 = DeferredKeySelection.Augment<
      UnwrapArrayMember<TResult>,
      TRecord,
      TKey
    >[]
  >(
    data: TRecord extends Knex.CompositeTableType<unknown>
      ?
      | Knex.ResolveTableType<TRecord, 'insert'>
      | ReadonlyArray<Knex.ResolveTableType<TRecord, 'insert'>>
      : Knex.DbRecordArr<TRecord> | ReadonlyArray<Knex.DbRecordArr<TRecord>>,
    returning?: TKey,
    options?: DMLOptions
  ): Knex.QueryBuilder<TRecord, TResult2>;
  insert<
    TKey extends string,
    TResult2 = DeferredKeySelection.Augment<
      UnwrapArrayMember<TResult>,
      TRecord,
      TKey
    >[]
  >(
    data: TRecord extends Knex.CompositeTableType<unknown>
      ?
      | Knex.ResolveTableType<TRecord, 'insert'>
      | ReadonlyArray<Knex.ResolveTableType<TRecord, 'insert'>>
      : Knex.DbRecordArr<TRecord> | ReadonlyArray<Knex.DbRecordArr<TRecord>>,
    returning?: readonly TKey[],
    options?: DMLOptions
  ): Knex.QueryBuilder<TRecord, TResult2>;
  insert<TResult2 = number[]>(
    data: TRecord extends Knex.CompositeTableType<unknown>
      ?
      | Knex.ResolveTableType<TRecord, 'insert'>
      | ReadonlyArray<Knex.ResolveTableType<TRecord, 'insert'>>
      : Knex.DbRecordArr<TRecord> | ReadonlyArray<Knex.DbRecordArr<TRecord>>
  ): Knex.QueryBuilder<TRecord, TResult2>;

  static insert<TResult2 = number[]>(
    data: TRecord extends Knex.CompositeTableType<unknown>
      ?
      | Knex.ResolveTableType<TRecord, 'insert'>
      | ReadonlyArray<Knex.ResolveTableType<TRecord, 'insert'>>
      : Knex.DbRecordArr<TRecord> | ReadonlyArray<Knex.DbRecordArr<TRecord>>
  ): Knex.QueryBuilder<TRecord, TResult2>;

  static create<T = unknown>(
    data: TRecord extends Knex.CompositeTableType<unknown>
      ?
      | Knex.ResolveTableType<TRecord, 'insert'>
      | ReadonlyArray<Knex.ResolveTableType<TRecord, 'insert'>>
      : Knex.DbRecordArr<TRecord> | ReadonlyArray<Knex.DbRecordArr<TRecord>>
  ): T;

  static del(
    returning?: '*',
    options?: DMLOptions
  ): Knex.QueryBuilder<TRecord, DeferredKeySelection<TRecord, never>[]>;
  del<
    TKey extends StrKey<TRecord>,
    TResult2 = DeferredKeySelection.Augment<
      UnwrapArrayMember<TResult>,
      TRecord,
      TKey
    >[]
  >(
    returning?: TKey,
    options?: DMLOptions
  ): Knex.QueryBuilder<TRecord, TResult2>;

  del<
    TKey extends StrKey<TRecord>,
    TResult2 = DeferredKeySelection.Augment<
      UnwrapArrayMember<TResult>,
      TRecord,
      TKey
    >[]
  >(
    returning?: readonly TKey[],
    options?: DMLOptions
  ): Knex.QueryBuilder<TRecord, TResult2[]>;
  del<TResult2 = SafePartial<TRecord>[]>(
    returning?: string | readonly string[],
    options?: DMLOptions
  ): Knex.QueryBuilder<TRecord, TResult2>;
  del<TResult2 = number>(): Knex.QueryBuilder<TRecord, TResult2>;

  static delete(
    returning?: '*',
    options?: DMLOptions
  ): Knex.QueryBuilder<TRecord, DeferredKeySelection<TRecord, never>[]>;
  delete<
    TKey extends StrKey<Knex.ResolveTableType<TRecord>>,
    TResult2 = DeferredKeySelection.Augment<
      UnwrapArrayMember<TResult>,
      Knex.ResolveTableType<TRecord>,
      TKey
    >[]
  >(
    returning?: TKey,
    options?: DMLOptions
  ): Knex.QueryBuilder<TRecord, TResult2>;
  delete<
    TKey extends StrKey<TRecord>,
    TResult2 = DeferredKeySelection.Augment<
      UnwrapArrayMember<TResult>,
      TRecord,
      TKey
    >[]
  >(
    returning?: readonly TKey[],
    options?: DMLOptions
  ): Knex.QueryBuilder<TRecord, TResult2>;

  static delete<TResult2 = any>(
    returning?: string | readonly (string | Knex.Raw)[] | Knex.Raw,
    options?: DMLOptions
  ): QueryBuilder<TRecord, TResult2>;

  static delete<TResult2 = number>(): Knex.QueryBuilder<TRecord, TResult2>;
  static truncate(): Knex.QueryBuilder<TRecord, void>;
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
  static count: Knex.AsymmetricAggregation<TRecord, TResult, Knex.Lookup<ResultTypes.Registry, 'Count', number | string>>;
  static countDistinct: Knex.AsymmetricAggregation<TRecord, TResult, Knex.Lookup<ResultTypes.Registry, 'Count', number | string>>;
  static pagination<T = unknown>(options: PaginationOptions): Promise<PaginationResults<T>>;
  static autoPaginate<T = unknown>(perPage?: number): Promise<PaginationResults<T>>;
  static softDelete<TRecord extends {} = any, TResult = any>(): Knex.QueryBuilder<TRecord, TResult>;
  static restore<TRecord extends {} = any, TResult = any>(): Knex.QueryBuilder<TRecord, TResult>;
  static withTrashed<TRecord extends {} = any, TResult = any>(): Knex.QueryBuilder<TRecord, TResult>;
  static withoutTrashed<TRecord extends {} = any, TResult = any>(): Knex.QueryBuilder<TRecord, TResult>;
  static onlyTrashed<TRecord extends {} = any, TResult = any>(): Knex.QueryBuilder<TRecord, TResult>;
  static get<T = unknown>(columns?: string[]): Promise<T>;
  get<T = unknown>(columns?: string[]): Promise<T>;
  static belongsTo(related: string | typeof Repository): Knex.QueryBuilder<TRecord, TResult>;
  static belongsTo(related: string | typeof Repository, queryCallback: (query: Knex.QueryBuilder) => Knex.QueryBuilder): Knex.QueryBuilder<TRecord, TResult>;
  static belongsTo(related: string | typeof Repository, foreignKey: string, localKey: string): Knex.QueryBuilder<TRecord, TResult>;
  static hasOne(related: string | typeof Repository): Knex.QueryBuilder<TRecord, TResult>;
  static hasOne(related: string | typeof Repository, queryCallback: (query: Knex.QueryBuilder) => Knex.QueryBuilder): Knex.QueryBuilder<TRecord, TResult>;
  static hasOne(related: string | typeof Repository, foreignKey: string, localKey: string): Knex.QueryBuilder<TRecord, TResult>;
  static hasMany(related: string | typeof Repository): Knex.QueryBuilder<TRecord, TResult>;
  static hasMany(related: string | typeof Repository, queryCallback: (query: Knex.QueryBuilder) => Knex.QueryBuilder): Knex.QueryBuilder<TRecord, TResult>;
  static hasMany(related: string | typeof Repository, foreignKey: string, localKey: string): Knex.QueryBuilder<TRecord, TResult>;
  static belongsToMany(related: string | typeof Repository): Knex.QueryBuilder<TRecord, TResult>;
  static belongsToMany(related: string | typeof Repository, queryCallback: (query: Knex.QueryBuilder) => Knex.QueryBuilder): Knex.QueryBuilder<TRecord, TResult>;
  static belongsToMany(related: string | typeof Repository, pivotTable: string, foreignKey?: string, relatedKey?: string, localKey?: string, relatedLocalKey?: string): Knex.QueryBuilder<TRecord, TResult>;
}
