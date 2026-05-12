
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Report
 * 
 */
export type Report = $Result.DefaultSelection<Prisma.$ReportPayload>
/**
 * Model CampusNews
 * 
 */
export type CampusNews = $Result.DefaultSelection<Prisma.$CampusNewsPayload>
/**
 * Model AssetCategory
 * 
 */
export type AssetCategory = $Result.DefaultSelection<Prisma.$AssetCategoryPayload>
/**
 * Model ItemPreset
 * 
 */
export type ItemPreset = $Result.DefaultSelection<Prisma.$ItemPresetPayload>
/**
 * Model Location
 * 
 */
export type Location = $Result.DefaultSelection<Prisma.$LocationPayload>
/**
 * Model CampusMap
 * 
 */
export type CampusMap = $Result.DefaultSelection<Prisma.$CampusMapPayload>
/**
 * Model BinStatus
 * 
 */
export type BinStatus = $Result.DefaultSelection<Prisma.$BinStatusPayload>
/**
 * Model SystemSettings
 * 
 */
export type SystemSettings = $Result.DefaultSelection<Prisma.$SystemSettingsPayload>
/**
 * Model WasteType
 * 
 */
export type WasteType = $Result.DefaultSelection<Prisma.$WasteTypePayload>
/**
 * Model UrgencyLevel
 * 
 */
export type UrgencyLevel = $Result.DefaultSelection<Prisma.$UrgencyLevelPayload>
/**
 * Model AssetCondition
 * 
 */
export type AssetCondition = $Result.DefaultSelection<Prisma.$AssetConditionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER',
  ADMIN: 'ADMIN',
  MRF: 'MRF'
};

export type Role = (typeof Role)[keyof typeof Role]


export const ReportStatus: {
  PENDING: 'PENDING',
  VERIFIED: 'VERIFIED',
  DISMISSED: 'DISMISSED',
  DISPATCHED: 'DISPATCHED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  COLLECTED: 'COLLECTED',
  RESOLVED: 'RESOLVED'
};

export type ReportStatus = (typeof ReportStatus)[keyof typeof ReportStatus]


export const ReportType: {
  WASTE: 'WASTE',
  ASSET: 'ASSET'
};

export type ReportType = (typeof ReportType)[keyof typeof ReportType]


export const AssetAction: {
  REPAIR: 'REPAIR',
  DISPOSE: 'DISPOSE'
};

export type AssetAction = (typeof AssetAction)[keyof typeof AssetAction]


export const LocationType: {
  BIN_LOCATION: 'BIN_LOCATION',
  ROOM_LOCATION: 'ROOM_LOCATION'
};

export type LocationType = (typeof LocationType)[keyof typeof LocationType]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type ReportStatus = $Enums.ReportStatus

export const ReportStatus: typeof $Enums.ReportStatus

export type ReportType = $Enums.ReportType

export const ReportType: typeof $Enums.ReportType

export type AssetAction = $Enums.AssetAction

export const AssetAction: typeof $Enums.AssetAction

export type LocationType = $Enums.LocationType

export const LocationType: typeof $Enums.LocationType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.report`: Exposes CRUD operations for the **Report** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reports
    * const reports = await prisma.report.findMany()
    * ```
    */
  get report(): Prisma.ReportDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.campusNews`: Exposes CRUD operations for the **CampusNews** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CampusNews
    * const campusNews = await prisma.campusNews.findMany()
    * ```
    */
  get campusNews(): Prisma.CampusNewsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.assetCategory`: Exposes CRUD operations for the **AssetCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AssetCategories
    * const assetCategories = await prisma.assetCategory.findMany()
    * ```
    */
  get assetCategory(): Prisma.AssetCategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.itemPreset`: Exposes CRUD operations for the **ItemPreset** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ItemPresets
    * const itemPresets = await prisma.itemPreset.findMany()
    * ```
    */
  get itemPreset(): Prisma.ItemPresetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.location`: Exposes CRUD operations for the **Location** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Locations
    * const locations = await prisma.location.findMany()
    * ```
    */
  get location(): Prisma.LocationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.campusMap`: Exposes CRUD operations for the **CampusMap** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CampusMaps
    * const campusMaps = await prisma.campusMap.findMany()
    * ```
    */
  get campusMap(): Prisma.CampusMapDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.binStatus`: Exposes CRUD operations for the **BinStatus** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BinStatuses
    * const binStatuses = await prisma.binStatus.findMany()
    * ```
    */
  get binStatus(): Prisma.BinStatusDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.systemSettings`: Exposes CRUD operations for the **SystemSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SystemSettings
    * const systemSettings = await prisma.systemSettings.findMany()
    * ```
    */
  get systemSettings(): Prisma.SystemSettingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.wasteType`: Exposes CRUD operations for the **WasteType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WasteTypes
    * const wasteTypes = await prisma.wasteType.findMany()
    * ```
    */
  get wasteType(): Prisma.WasteTypeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.urgencyLevel`: Exposes CRUD operations for the **UrgencyLevel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UrgencyLevels
    * const urgencyLevels = await prisma.urgencyLevel.findMany()
    * ```
    */
  get urgencyLevel(): Prisma.UrgencyLevelDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.assetCondition`: Exposes CRUD operations for the **AssetCondition** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AssetConditions
    * const assetConditions = await prisma.assetCondition.findMany()
    * ```
    */
  get assetCondition(): Prisma.AssetConditionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Report: 'Report',
    CampusNews: 'CampusNews',
    AssetCategory: 'AssetCategory',
    ItemPreset: 'ItemPreset',
    Location: 'Location',
    CampusMap: 'CampusMap',
    BinStatus: 'BinStatus',
    SystemSettings: 'SystemSettings',
    WasteType: 'WasteType',
    UrgencyLevel: 'UrgencyLevel',
    AssetCondition: 'AssetCondition'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "report" | "campusNews" | "assetCategory" | "itemPreset" | "location" | "campusMap" | "binStatus" | "systemSettings" | "wasteType" | "urgencyLevel" | "assetCondition"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Report: {
        payload: Prisma.$ReportPayload<ExtArgs>
        fields: Prisma.ReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          findFirst: {
            args: Prisma.ReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          findMany: {
            args: Prisma.ReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          create: {
            args: Prisma.ReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          createMany: {
            args: Prisma.ReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          delete: {
            args: Prisma.ReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          update: {
            args: Prisma.ReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          deleteMany: {
            args: Prisma.ReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReportUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          upsert: {
            args: Prisma.ReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          aggregate: {
            args: Prisma.ReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReport>
          }
          groupBy: {
            args: Prisma.ReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReportCountArgs<ExtArgs>
            result: $Utils.Optional<ReportCountAggregateOutputType> | number
          }
        }
      }
      CampusNews: {
        payload: Prisma.$CampusNewsPayload<ExtArgs>
        fields: Prisma.CampusNewsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CampusNewsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampusNewsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CampusNewsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampusNewsPayload>
          }
          findFirst: {
            args: Prisma.CampusNewsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampusNewsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CampusNewsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampusNewsPayload>
          }
          findMany: {
            args: Prisma.CampusNewsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampusNewsPayload>[]
          }
          create: {
            args: Prisma.CampusNewsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampusNewsPayload>
          }
          createMany: {
            args: Prisma.CampusNewsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CampusNewsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampusNewsPayload>[]
          }
          delete: {
            args: Prisma.CampusNewsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampusNewsPayload>
          }
          update: {
            args: Prisma.CampusNewsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampusNewsPayload>
          }
          deleteMany: {
            args: Prisma.CampusNewsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CampusNewsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CampusNewsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampusNewsPayload>[]
          }
          upsert: {
            args: Prisma.CampusNewsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampusNewsPayload>
          }
          aggregate: {
            args: Prisma.CampusNewsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCampusNews>
          }
          groupBy: {
            args: Prisma.CampusNewsGroupByArgs<ExtArgs>
            result: $Utils.Optional<CampusNewsGroupByOutputType>[]
          }
          count: {
            args: Prisma.CampusNewsCountArgs<ExtArgs>
            result: $Utils.Optional<CampusNewsCountAggregateOutputType> | number
          }
        }
      }
      AssetCategory: {
        payload: Prisma.$AssetCategoryPayload<ExtArgs>
        fields: Prisma.AssetCategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssetCategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetCategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssetCategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetCategoryPayload>
          }
          findFirst: {
            args: Prisma.AssetCategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetCategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssetCategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetCategoryPayload>
          }
          findMany: {
            args: Prisma.AssetCategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetCategoryPayload>[]
          }
          create: {
            args: Prisma.AssetCategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetCategoryPayload>
          }
          createMany: {
            args: Prisma.AssetCategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AssetCategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetCategoryPayload>[]
          }
          delete: {
            args: Prisma.AssetCategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetCategoryPayload>
          }
          update: {
            args: Prisma.AssetCategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetCategoryPayload>
          }
          deleteMany: {
            args: Prisma.AssetCategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssetCategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AssetCategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetCategoryPayload>[]
          }
          upsert: {
            args: Prisma.AssetCategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetCategoryPayload>
          }
          aggregate: {
            args: Prisma.AssetCategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssetCategory>
          }
          groupBy: {
            args: Prisma.AssetCategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssetCategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssetCategoryCountArgs<ExtArgs>
            result: $Utils.Optional<AssetCategoryCountAggregateOutputType> | number
          }
        }
      }
      ItemPreset: {
        payload: Prisma.$ItemPresetPayload<ExtArgs>
        fields: Prisma.ItemPresetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ItemPresetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPresetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ItemPresetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPresetPayload>
          }
          findFirst: {
            args: Prisma.ItemPresetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPresetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ItemPresetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPresetPayload>
          }
          findMany: {
            args: Prisma.ItemPresetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPresetPayload>[]
          }
          create: {
            args: Prisma.ItemPresetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPresetPayload>
          }
          createMany: {
            args: Prisma.ItemPresetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ItemPresetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPresetPayload>[]
          }
          delete: {
            args: Prisma.ItemPresetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPresetPayload>
          }
          update: {
            args: Prisma.ItemPresetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPresetPayload>
          }
          deleteMany: {
            args: Prisma.ItemPresetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ItemPresetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ItemPresetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPresetPayload>[]
          }
          upsert: {
            args: Prisma.ItemPresetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPresetPayload>
          }
          aggregate: {
            args: Prisma.ItemPresetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItemPreset>
          }
          groupBy: {
            args: Prisma.ItemPresetGroupByArgs<ExtArgs>
            result: $Utils.Optional<ItemPresetGroupByOutputType>[]
          }
          count: {
            args: Prisma.ItemPresetCountArgs<ExtArgs>
            result: $Utils.Optional<ItemPresetCountAggregateOutputType> | number
          }
        }
      }
      Location: {
        payload: Prisma.$LocationPayload<ExtArgs>
        fields: Prisma.LocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          findFirst: {
            args: Prisma.LocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          findMany: {
            args: Prisma.LocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          create: {
            args: Prisma.LocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          createMany: {
            args: Prisma.LocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LocationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          delete: {
            args: Prisma.LocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          update: {
            args: Prisma.LocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          deleteMany: {
            args: Prisma.LocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LocationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          upsert: {
            args: Prisma.LocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          aggregate: {
            args: Prisma.LocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLocation>
          }
          groupBy: {
            args: Prisma.LocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<LocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.LocationCountArgs<ExtArgs>
            result: $Utils.Optional<LocationCountAggregateOutputType> | number
          }
        }
      }
      CampusMap: {
        payload: Prisma.$CampusMapPayload<ExtArgs>
        fields: Prisma.CampusMapFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CampusMapFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampusMapPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CampusMapFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampusMapPayload>
          }
          findFirst: {
            args: Prisma.CampusMapFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampusMapPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CampusMapFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampusMapPayload>
          }
          findMany: {
            args: Prisma.CampusMapFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampusMapPayload>[]
          }
          create: {
            args: Prisma.CampusMapCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampusMapPayload>
          }
          createMany: {
            args: Prisma.CampusMapCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CampusMapCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampusMapPayload>[]
          }
          delete: {
            args: Prisma.CampusMapDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampusMapPayload>
          }
          update: {
            args: Prisma.CampusMapUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampusMapPayload>
          }
          deleteMany: {
            args: Prisma.CampusMapDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CampusMapUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CampusMapUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampusMapPayload>[]
          }
          upsert: {
            args: Prisma.CampusMapUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampusMapPayload>
          }
          aggregate: {
            args: Prisma.CampusMapAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCampusMap>
          }
          groupBy: {
            args: Prisma.CampusMapGroupByArgs<ExtArgs>
            result: $Utils.Optional<CampusMapGroupByOutputType>[]
          }
          count: {
            args: Prisma.CampusMapCountArgs<ExtArgs>
            result: $Utils.Optional<CampusMapCountAggregateOutputType> | number
          }
        }
      }
      BinStatus: {
        payload: Prisma.$BinStatusPayload<ExtArgs>
        fields: Prisma.BinStatusFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BinStatusFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BinStatusPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BinStatusFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BinStatusPayload>
          }
          findFirst: {
            args: Prisma.BinStatusFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BinStatusPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BinStatusFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BinStatusPayload>
          }
          findMany: {
            args: Prisma.BinStatusFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BinStatusPayload>[]
          }
          create: {
            args: Prisma.BinStatusCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BinStatusPayload>
          }
          createMany: {
            args: Prisma.BinStatusCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BinStatusCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BinStatusPayload>[]
          }
          delete: {
            args: Prisma.BinStatusDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BinStatusPayload>
          }
          update: {
            args: Prisma.BinStatusUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BinStatusPayload>
          }
          deleteMany: {
            args: Prisma.BinStatusDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BinStatusUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BinStatusUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BinStatusPayload>[]
          }
          upsert: {
            args: Prisma.BinStatusUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BinStatusPayload>
          }
          aggregate: {
            args: Prisma.BinStatusAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBinStatus>
          }
          groupBy: {
            args: Prisma.BinStatusGroupByArgs<ExtArgs>
            result: $Utils.Optional<BinStatusGroupByOutputType>[]
          }
          count: {
            args: Prisma.BinStatusCountArgs<ExtArgs>
            result: $Utils.Optional<BinStatusCountAggregateOutputType> | number
          }
        }
      }
      SystemSettings: {
        payload: Prisma.$SystemSettingsPayload<ExtArgs>
        fields: Prisma.SystemSettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SystemSettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SystemSettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingsPayload>
          }
          findFirst: {
            args: Prisma.SystemSettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SystemSettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingsPayload>
          }
          findMany: {
            args: Prisma.SystemSettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingsPayload>[]
          }
          create: {
            args: Prisma.SystemSettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingsPayload>
          }
          createMany: {
            args: Prisma.SystemSettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SystemSettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingsPayload>[]
          }
          delete: {
            args: Prisma.SystemSettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingsPayload>
          }
          update: {
            args: Prisma.SystemSettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingsPayload>
          }
          deleteMany: {
            args: Prisma.SystemSettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SystemSettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SystemSettingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingsPayload>[]
          }
          upsert: {
            args: Prisma.SystemSettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingsPayload>
          }
          aggregate: {
            args: Prisma.SystemSettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSystemSettings>
          }
          groupBy: {
            args: Prisma.SystemSettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<SystemSettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.SystemSettingsCountArgs<ExtArgs>
            result: $Utils.Optional<SystemSettingsCountAggregateOutputType> | number
          }
        }
      }
      WasteType: {
        payload: Prisma.$WasteTypePayload<ExtArgs>
        fields: Prisma.WasteTypeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WasteTypeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WasteTypePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WasteTypeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WasteTypePayload>
          }
          findFirst: {
            args: Prisma.WasteTypeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WasteTypePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WasteTypeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WasteTypePayload>
          }
          findMany: {
            args: Prisma.WasteTypeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WasteTypePayload>[]
          }
          create: {
            args: Prisma.WasteTypeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WasteTypePayload>
          }
          createMany: {
            args: Prisma.WasteTypeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WasteTypeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WasteTypePayload>[]
          }
          delete: {
            args: Prisma.WasteTypeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WasteTypePayload>
          }
          update: {
            args: Prisma.WasteTypeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WasteTypePayload>
          }
          deleteMany: {
            args: Prisma.WasteTypeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WasteTypeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WasteTypeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WasteTypePayload>[]
          }
          upsert: {
            args: Prisma.WasteTypeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WasteTypePayload>
          }
          aggregate: {
            args: Prisma.WasteTypeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWasteType>
          }
          groupBy: {
            args: Prisma.WasteTypeGroupByArgs<ExtArgs>
            result: $Utils.Optional<WasteTypeGroupByOutputType>[]
          }
          count: {
            args: Prisma.WasteTypeCountArgs<ExtArgs>
            result: $Utils.Optional<WasteTypeCountAggregateOutputType> | number
          }
        }
      }
      UrgencyLevel: {
        payload: Prisma.$UrgencyLevelPayload<ExtArgs>
        fields: Prisma.UrgencyLevelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UrgencyLevelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrgencyLevelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UrgencyLevelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrgencyLevelPayload>
          }
          findFirst: {
            args: Prisma.UrgencyLevelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrgencyLevelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UrgencyLevelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrgencyLevelPayload>
          }
          findMany: {
            args: Prisma.UrgencyLevelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrgencyLevelPayload>[]
          }
          create: {
            args: Prisma.UrgencyLevelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrgencyLevelPayload>
          }
          createMany: {
            args: Prisma.UrgencyLevelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UrgencyLevelCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrgencyLevelPayload>[]
          }
          delete: {
            args: Prisma.UrgencyLevelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrgencyLevelPayload>
          }
          update: {
            args: Prisma.UrgencyLevelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrgencyLevelPayload>
          }
          deleteMany: {
            args: Prisma.UrgencyLevelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UrgencyLevelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UrgencyLevelUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrgencyLevelPayload>[]
          }
          upsert: {
            args: Prisma.UrgencyLevelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrgencyLevelPayload>
          }
          aggregate: {
            args: Prisma.UrgencyLevelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUrgencyLevel>
          }
          groupBy: {
            args: Prisma.UrgencyLevelGroupByArgs<ExtArgs>
            result: $Utils.Optional<UrgencyLevelGroupByOutputType>[]
          }
          count: {
            args: Prisma.UrgencyLevelCountArgs<ExtArgs>
            result: $Utils.Optional<UrgencyLevelCountAggregateOutputType> | number
          }
        }
      }
      AssetCondition: {
        payload: Prisma.$AssetConditionPayload<ExtArgs>
        fields: Prisma.AssetConditionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssetConditionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetConditionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssetConditionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetConditionPayload>
          }
          findFirst: {
            args: Prisma.AssetConditionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetConditionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssetConditionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetConditionPayload>
          }
          findMany: {
            args: Prisma.AssetConditionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetConditionPayload>[]
          }
          create: {
            args: Prisma.AssetConditionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetConditionPayload>
          }
          createMany: {
            args: Prisma.AssetConditionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AssetConditionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetConditionPayload>[]
          }
          delete: {
            args: Prisma.AssetConditionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetConditionPayload>
          }
          update: {
            args: Prisma.AssetConditionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetConditionPayload>
          }
          deleteMany: {
            args: Prisma.AssetConditionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssetConditionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AssetConditionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetConditionPayload>[]
          }
          upsert: {
            args: Prisma.AssetConditionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetConditionPayload>
          }
          aggregate: {
            args: Prisma.AssetConditionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssetCondition>
          }
          groupBy: {
            args: Prisma.AssetConditionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssetConditionGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssetConditionCountArgs<ExtArgs>
            result: $Utils.Optional<AssetConditionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    report?: ReportOmit
    campusNews?: CampusNewsOmit
    assetCategory?: AssetCategoryOmit
    itemPreset?: ItemPresetOmit
    location?: LocationOmit
    campusMap?: CampusMapOmit
    binStatus?: BinStatusOmit
    systemSettings?: SystemSettingsOmit
    wasteType?: WasteTypeOmit
    urgencyLevel?: UrgencyLevelOmit
    assetCondition?: AssetConditionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    submittedReports: number
    assignedReports: number
    newsPosts: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submittedReports?: boolean | UserCountOutputTypeCountSubmittedReportsArgs
    assignedReports?: boolean | UserCountOutputTypeCountAssignedReportsArgs
    newsPosts?: boolean | UserCountOutputTypeCountNewsPostsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSubmittedReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAssignedReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNewsPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampusNewsWhereInput
  }


  /**
   * Count Type AssetCategoryCountOutputType
   */

  export type AssetCategoryCountOutputType = {
    itemPresets: number
  }

  export type AssetCategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itemPresets?: boolean | AssetCategoryCountOutputTypeCountItemPresetsArgs
  }

  // Custom InputTypes
  /**
   * AssetCategoryCountOutputType without action
   */
  export type AssetCategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCategoryCountOutputType
     */
    select?: AssetCategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AssetCategoryCountOutputType without action
   */
  export type AssetCategoryCountOutputTypeCountItemPresetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemPresetWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    points: number | null
    reports: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
    points: number | null
    reports: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    username: string | null
    password: string | null
    role: $Enums.Role | null
    firstName: string | null
    lastName: string | null
    email: string | null
    studentId: string | null
    lrn: string | null
    course: string | null
    section: string | null
    department: string | null
    points: number | null
    reports: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    username: string | null
    password: string | null
    role: $Enums.Role | null
    firstName: string | null
    lastName: string | null
    email: string | null
    studentId: string | null
    lrn: string | null
    course: string | null
    section: string | null
    department: string | null
    points: number | null
    reports: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    password: number
    role: number
    firstName: number
    lastName: number
    email: number
    studentId: number
    lrn: number
    course: number
    section: number
    department: number
    points: number
    reports: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    points?: true
    reports?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    points?: true
    reports?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    password?: true
    role?: true
    firstName?: true
    lastName?: true
    email?: true
    studentId?: true
    lrn?: true
    course?: true
    section?: true
    department?: true
    points?: true
    reports?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    password?: true
    role?: true
    firstName?: true
    lastName?: true
    email?: true
    studentId?: true
    lrn?: true
    course?: true
    section?: true
    department?: true
    points?: true
    reports?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    password?: true
    role?: true
    firstName?: true
    lastName?: true
    email?: true
    studentId?: true
    lrn?: true
    course?: true
    section?: true
    department?: true
    points?: true
    reports?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    username: string
    password: string
    role: $Enums.Role
    firstName: string | null
    lastName: string | null
    email: string | null
    studentId: string | null
    lrn: string | null
    course: string | null
    section: string | null
    department: string | null
    points: number
    reports: number
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    studentId?: boolean
    lrn?: boolean
    course?: boolean
    section?: boolean
    department?: boolean
    points?: boolean
    reports?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    submittedReports?: boolean | User$submittedReportsArgs<ExtArgs>
    assignedReports?: boolean | User$assignedReportsArgs<ExtArgs>
    newsPosts?: boolean | User$newsPostsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    studentId?: boolean
    lrn?: boolean
    course?: boolean
    section?: boolean
    department?: boolean
    points?: boolean
    reports?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    studentId?: boolean
    lrn?: boolean
    course?: boolean
    section?: boolean
    department?: boolean
    points?: boolean
    reports?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    studentId?: boolean
    lrn?: boolean
    course?: boolean
    section?: boolean
    department?: boolean
    points?: boolean
    reports?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "password" | "role" | "firstName" | "lastName" | "email" | "studentId" | "lrn" | "course" | "section" | "department" | "points" | "reports" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submittedReports?: boolean | User$submittedReportsArgs<ExtArgs>
    assignedReports?: boolean | User$assignedReportsArgs<ExtArgs>
    newsPosts?: boolean | User$newsPostsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      submittedReports: Prisma.$ReportPayload<ExtArgs>[]
      assignedReports: Prisma.$ReportPayload<ExtArgs>[]
      newsPosts: Prisma.$CampusNewsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      password: string
      role: $Enums.Role
      firstName: string | null
      lastName: string | null
      email: string | null
      studentId: string | null
      lrn: string | null
      course: string | null
      section: string | null
      department: string | null
      points: number
      reports: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    submittedReports<T extends User$submittedReportsArgs<ExtArgs> = {}>(args?: Subset<T, User$submittedReportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    assignedReports<T extends User$assignedReportsArgs<ExtArgs> = {}>(args?: Subset<T, User$assignedReportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    newsPosts<T extends User$newsPostsArgs<ExtArgs> = {}>(args?: Subset<T, User$newsPostsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampusNewsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly username: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly studentId: FieldRef<"User", 'String'>
    readonly lrn: FieldRef<"User", 'String'>
    readonly course: FieldRef<"User", 'String'>
    readonly section: FieldRef<"User", 'String'>
    readonly department: FieldRef<"User", 'String'>
    readonly points: FieldRef<"User", 'Int'>
    readonly reports: FieldRef<"User", 'Int'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.submittedReports
   */
  export type User$submittedReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    cursor?: ReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * User.assignedReports
   */
  export type User$assignedReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    cursor?: ReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * User.newsPosts
   */
  export type User$newsPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampusNews
     */
    select?: CampusNewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampusNews
     */
    omit?: CampusNewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampusNewsInclude<ExtArgs> | null
    where?: CampusNewsWhereInput
    orderBy?: CampusNewsOrderByWithRelationInput | CampusNewsOrderByWithRelationInput[]
    cursor?: CampusNewsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CampusNewsScalarFieldEnum | CampusNewsScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Report
   */

  export type AggregateReport = {
    _count: ReportCountAggregateOutputType | null
    _avg: ReportAvgAggregateOutputType | null
    _sum: ReportSumAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  export type ReportAvgAggregateOutputType = {
    id: number | null
    assignedStaffId: number | null
    kilosCollected: number | null
    userId: number | null
  }

  export type ReportSumAggregateOutputType = {
    id: number | null
    assignedStaffId: number | null
    kilosCollected: number | null
    userId: number | null
  }

  export type ReportMinAggregateOutputType = {
    id: number | null
    location: string | null
    notes: string | null
    photoUrl: string | null
    urgency: string | null
    wasteType: string | null
    type: $Enums.ReportType | null
    status: $Enums.ReportStatus | null
    assignedStaffId: number | null
    kilosCollected: number | null
    assetAction: $Enums.AssetAction | null
    collectionDate: Date | null
    userId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReportMaxAggregateOutputType = {
    id: number | null
    location: string | null
    notes: string | null
    photoUrl: string | null
    urgency: string | null
    wasteType: string | null
    type: $Enums.ReportType | null
    status: $Enums.ReportStatus | null
    assignedStaffId: number | null
    kilosCollected: number | null
    assetAction: $Enums.AssetAction | null
    collectionDate: Date | null
    userId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReportCountAggregateOutputType = {
    id: number
    location: number
    notes: number
    photoUrl: number
    urgency: number
    wasteType: number
    type: number
    status: number
    assignedStaffId: number
    kilosCollected: number
    assetAction: number
    collectionDate: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ReportAvgAggregateInputType = {
    id?: true
    assignedStaffId?: true
    kilosCollected?: true
    userId?: true
  }

  export type ReportSumAggregateInputType = {
    id?: true
    assignedStaffId?: true
    kilosCollected?: true
    userId?: true
  }

  export type ReportMinAggregateInputType = {
    id?: true
    location?: true
    notes?: true
    photoUrl?: true
    urgency?: true
    wasteType?: true
    type?: true
    status?: true
    assignedStaffId?: true
    kilosCollected?: true
    assetAction?: true
    collectionDate?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReportMaxAggregateInputType = {
    id?: true
    location?: true
    notes?: true
    photoUrl?: true
    urgency?: true
    wasteType?: true
    type?: true
    status?: true
    assignedStaffId?: true
    kilosCollected?: true
    assetAction?: true
    collectionDate?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReportCountAggregateInputType = {
    id?: true
    location?: true
    notes?: true
    photoUrl?: true
    urgency?: true
    wasteType?: true
    type?: true
    status?: true
    assignedStaffId?: true
    kilosCollected?: true
    assetAction?: true
    collectionDate?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Report to aggregate.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reports
    **/
    _count?: true | ReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReportSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReportMaxAggregateInputType
  }

  export type GetReportAggregateType<T extends ReportAggregateArgs> = {
        [P in keyof T & keyof AggregateReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReport[P]>
      : GetScalarType<T[P], AggregateReport[P]>
  }




  export type ReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithAggregationInput | ReportOrderByWithAggregationInput[]
    by: ReportScalarFieldEnum[] | ReportScalarFieldEnum
    having?: ReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReportCountAggregateInputType | true
    _avg?: ReportAvgAggregateInputType
    _sum?: ReportSumAggregateInputType
    _min?: ReportMinAggregateInputType
    _max?: ReportMaxAggregateInputType
  }

  export type ReportGroupByOutputType = {
    id: number
    location: string
    notes: string | null
    photoUrl: string | null
    urgency: string
    wasteType: string
    type: $Enums.ReportType
    status: $Enums.ReportStatus
    assignedStaffId: number | null
    kilosCollected: number | null
    assetAction: $Enums.AssetAction | null
    collectionDate: Date | null
    userId: number
    createdAt: Date
    updatedAt: Date
    _count: ReportCountAggregateOutputType | null
    _avg: ReportAvgAggregateOutputType | null
    _sum: ReportSumAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  type GetReportGroupByPayload<T extends ReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReportGroupByOutputType[P]>
            : GetScalarType<T[P], ReportGroupByOutputType[P]>
        }
      >
    >


  export type ReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    location?: boolean
    notes?: boolean
    photoUrl?: boolean
    urgency?: boolean
    wasteType?: boolean
    type?: boolean
    status?: boolean
    assignedStaffId?: boolean
    kilosCollected?: boolean
    assetAction?: boolean
    collectionDate?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    assignedStaff?: boolean | Report$assignedStaffArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    location?: boolean
    notes?: boolean
    photoUrl?: boolean
    urgency?: boolean
    wasteType?: boolean
    type?: boolean
    status?: boolean
    assignedStaffId?: boolean
    kilosCollected?: boolean
    assetAction?: boolean
    collectionDate?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    assignedStaff?: boolean | Report$assignedStaffArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    location?: boolean
    notes?: boolean
    photoUrl?: boolean
    urgency?: boolean
    wasteType?: boolean
    type?: boolean
    status?: boolean
    assignedStaffId?: boolean
    kilosCollected?: boolean
    assetAction?: boolean
    collectionDate?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    assignedStaff?: boolean | Report$assignedStaffArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectScalar = {
    id?: boolean
    location?: boolean
    notes?: boolean
    photoUrl?: boolean
    urgency?: boolean
    wasteType?: boolean
    type?: boolean
    status?: boolean
    assignedStaffId?: boolean
    kilosCollected?: boolean
    assetAction?: boolean
    collectionDate?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ReportOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "location" | "notes" | "photoUrl" | "urgency" | "wasteType" | "type" | "status" | "assignedStaffId" | "kilosCollected" | "assetAction" | "collectionDate" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["report"]>
  export type ReportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    assignedStaff?: boolean | Report$assignedStaffArgs<ExtArgs>
  }
  export type ReportIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    assignedStaff?: boolean | Report$assignedStaffArgs<ExtArgs>
  }
  export type ReportIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    assignedStaff?: boolean | Report$assignedStaffArgs<ExtArgs>
  }

  export type $ReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Report"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      assignedStaff: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      location: string
      notes: string | null
      photoUrl: string | null
      urgency: string
      wasteType: string
      type: $Enums.ReportType
      status: $Enums.ReportStatus
      assignedStaffId: number | null
      kilosCollected: number | null
      assetAction: $Enums.AssetAction | null
      collectionDate: Date | null
      userId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["report"]>
    composites: {}
  }

  type ReportGetPayload<S extends boolean | null | undefined | ReportDefaultArgs> = $Result.GetResult<Prisma.$ReportPayload, S>

  type ReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReportCountAggregateInputType | true
    }

  export interface ReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Report'], meta: { name: 'Report' } }
    /**
     * Find zero or one Report that matches the filter.
     * @param {ReportFindUniqueArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReportFindUniqueArgs>(args: SelectSubset<T, ReportFindUniqueArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Report that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReportFindUniqueOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReportFindUniqueOrThrowArgs>(args: SelectSubset<T, ReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Report that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReportFindFirstArgs>(args?: SelectSubset<T, ReportFindFirstArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Report that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReportFindFirstOrThrowArgs>(args?: SelectSubset<T, ReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reports
     * const reports = await prisma.report.findMany()
     * 
     * // Get first 10 Reports
     * const reports = await prisma.report.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reportWithIdOnly = await prisma.report.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReportFindManyArgs>(args?: SelectSubset<T, ReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Report.
     * @param {ReportCreateArgs} args - Arguments to create a Report.
     * @example
     * // Create one Report
     * const Report = await prisma.report.create({
     *   data: {
     *     // ... data to create a Report
     *   }
     * })
     * 
     */
    create<T extends ReportCreateArgs>(args: SelectSubset<T, ReportCreateArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reports.
     * @param {ReportCreateManyArgs} args - Arguments to create many Reports.
     * @example
     * // Create many Reports
     * const report = await prisma.report.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReportCreateManyArgs>(args?: SelectSubset<T, ReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reports and returns the data saved in the database.
     * @param {ReportCreateManyAndReturnArgs} args - Arguments to create many Reports.
     * @example
     * // Create many Reports
     * const report = await prisma.report.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reports and only return the `id`
     * const reportWithIdOnly = await prisma.report.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReportCreateManyAndReturnArgs>(args?: SelectSubset<T, ReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Report.
     * @param {ReportDeleteArgs} args - Arguments to delete one Report.
     * @example
     * // Delete one Report
     * const Report = await prisma.report.delete({
     *   where: {
     *     // ... filter to delete one Report
     *   }
     * })
     * 
     */
    delete<T extends ReportDeleteArgs>(args: SelectSubset<T, ReportDeleteArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Report.
     * @param {ReportUpdateArgs} args - Arguments to update one Report.
     * @example
     * // Update one Report
     * const report = await prisma.report.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReportUpdateArgs>(args: SelectSubset<T, ReportUpdateArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reports.
     * @param {ReportDeleteManyArgs} args - Arguments to filter Reports to delete.
     * @example
     * // Delete a few Reports
     * const { count } = await prisma.report.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReportDeleteManyArgs>(args?: SelectSubset<T, ReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reports
     * const report = await prisma.report.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReportUpdateManyArgs>(args: SelectSubset<T, ReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reports and returns the data updated in the database.
     * @param {ReportUpdateManyAndReturnArgs} args - Arguments to update many Reports.
     * @example
     * // Update many Reports
     * const report = await prisma.report.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reports and only return the `id`
     * const reportWithIdOnly = await prisma.report.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReportUpdateManyAndReturnArgs>(args: SelectSubset<T, ReportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Report.
     * @param {ReportUpsertArgs} args - Arguments to update or create a Report.
     * @example
     * // Update or create a Report
     * const report = await prisma.report.upsert({
     *   create: {
     *     // ... data to create a Report
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Report we want to update
     *   }
     * })
     */
    upsert<T extends ReportUpsertArgs>(args: SelectSubset<T, ReportUpsertArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportCountArgs} args - Arguments to filter Reports to count.
     * @example
     * // Count the number of Reports
     * const count = await prisma.report.count({
     *   where: {
     *     // ... the filter for the Reports we want to count
     *   }
     * })
    **/
    count<T extends ReportCountArgs>(
      args?: Subset<T, ReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReportAggregateArgs>(args: Subset<T, ReportAggregateArgs>): Prisma.PrismaPromise<GetReportAggregateType<T>>

    /**
     * Group by Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReportGroupByArgs['orderBy'] }
        : { orderBy?: ReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Report model
   */
  readonly fields: ReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Report.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    assignedStaff<T extends Report$assignedStaffArgs<ExtArgs> = {}>(args?: Subset<T, Report$assignedStaffArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Report model
   */
  interface ReportFieldRefs {
    readonly id: FieldRef<"Report", 'Int'>
    readonly location: FieldRef<"Report", 'String'>
    readonly notes: FieldRef<"Report", 'String'>
    readonly photoUrl: FieldRef<"Report", 'String'>
    readonly urgency: FieldRef<"Report", 'String'>
    readonly wasteType: FieldRef<"Report", 'String'>
    readonly type: FieldRef<"Report", 'ReportType'>
    readonly status: FieldRef<"Report", 'ReportStatus'>
    readonly assignedStaffId: FieldRef<"Report", 'Int'>
    readonly kilosCollected: FieldRef<"Report", 'Float'>
    readonly assetAction: FieldRef<"Report", 'AssetAction'>
    readonly collectionDate: FieldRef<"Report", 'DateTime'>
    readonly userId: FieldRef<"Report", 'Int'>
    readonly createdAt: FieldRef<"Report", 'DateTime'>
    readonly updatedAt: FieldRef<"Report", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Report findUnique
   */
  export type ReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findUniqueOrThrow
   */
  export type ReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findFirst
   */
  export type ReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report findFirstOrThrow
   */
  export type ReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report findMany
   */
  export type ReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Reports to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report create
   */
  export type ReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to create a Report.
     */
    data: XOR<ReportCreateInput, ReportUncheckedCreateInput>
  }

  /**
   * Report createMany
   */
  export type ReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reports.
     */
    data: ReportCreateManyInput | ReportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Report createManyAndReturn
   */
  export type ReportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * The data used to create many Reports.
     */
    data: ReportCreateManyInput | ReportCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Report update
   */
  export type ReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to update a Report.
     */
    data: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
    /**
     * Choose, which Report to update.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report updateMany
   */
  export type ReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reports.
     */
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyInput>
    /**
     * Filter which Reports to update
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to update.
     */
    limit?: number
  }

  /**
   * Report updateManyAndReturn
   */
  export type ReportUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * The data used to update Reports.
     */
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyInput>
    /**
     * Filter which Reports to update
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Report upsert
   */
  export type ReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The filter to search for the Report to update in case it exists.
     */
    where: ReportWhereUniqueInput
    /**
     * In case the Report found by the `where` argument doesn't exist, create a new Report with this data.
     */
    create: XOR<ReportCreateInput, ReportUncheckedCreateInput>
    /**
     * In case the Report was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
  }

  /**
   * Report delete
   */
  export type ReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter which Report to delete.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report deleteMany
   */
  export type ReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reports to delete
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to delete.
     */
    limit?: number
  }

  /**
   * Report.assignedStaff
   */
  export type Report$assignedStaffArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Report without action
   */
  export type ReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
  }


  /**
   * Model CampusNews
   */

  export type AggregateCampusNews = {
    _count: CampusNewsCountAggregateOutputType | null
    _avg: CampusNewsAvgAggregateOutputType | null
    _sum: CampusNewsSumAggregateOutputType | null
    _min: CampusNewsMinAggregateOutputType | null
    _max: CampusNewsMaxAggregateOutputType | null
  }

  export type CampusNewsAvgAggregateOutputType = {
    id: number | null
    publishedById: number | null
  }

  export type CampusNewsSumAggregateOutputType = {
    id: number | null
    publishedById: number | null
  }

  export type CampusNewsMinAggregateOutputType = {
    id: number | null
    tag: string | null
    date: string | null
    title: string | null
    desc: string | null
    publishedById: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CampusNewsMaxAggregateOutputType = {
    id: number | null
    tag: string | null
    date: string | null
    title: string | null
    desc: string | null
    publishedById: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CampusNewsCountAggregateOutputType = {
    id: number
    tag: number
    date: number
    title: number
    desc: number
    publishedById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CampusNewsAvgAggregateInputType = {
    id?: true
    publishedById?: true
  }

  export type CampusNewsSumAggregateInputType = {
    id?: true
    publishedById?: true
  }

  export type CampusNewsMinAggregateInputType = {
    id?: true
    tag?: true
    date?: true
    title?: true
    desc?: true
    publishedById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CampusNewsMaxAggregateInputType = {
    id?: true
    tag?: true
    date?: true
    title?: true
    desc?: true
    publishedById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CampusNewsCountAggregateInputType = {
    id?: true
    tag?: true
    date?: true
    title?: true
    desc?: true
    publishedById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CampusNewsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CampusNews to aggregate.
     */
    where?: CampusNewsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampusNews to fetch.
     */
    orderBy?: CampusNewsOrderByWithRelationInput | CampusNewsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CampusNewsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampusNews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampusNews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CampusNews
    **/
    _count?: true | CampusNewsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CampusNewsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CampusNewsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CampusNewsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CampusNewsMaxAggregateInputType
  }

  export type GetCampusNewsAggregateType<T extends CampusNewsAggregateArgs> = {
        [P in keyof T & keyof AggregateCampusNews]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCampusNews[P]>
      : GetScalarType<T[P], AggregateCampusNews[P]>
  }




  export type CampusNewsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampusNewsWhereInput
    orderBy?: CampusNewsOrderByWithAggregationInput | CampusNewsOrderByWithAggregationInput[]
    by: CampusNewsScalarFieldEnum[] | CampusNewsScalarFieldEnum
    having?: CampusNewsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CampusNewsCountAggregateInputType | true
    _avg?: CampusNewsAvgAggregateInputType
    _sum?: CampusNewsSumAggregateInputType
    _min?: CampusNewsMinAggregateInputType
    _max?: CampusNewsMaxAggregateInputType
  }

  export type CampusNewsGroupByOutputType = {
    id: number
    tag: string
    date: string
    title: string
    desc: string
    publishedById: number | null
    createdAt: Date
    updatedAt: Date
    _count: CampusNewsCountAggregateOutputType | null
    _avg: CampusNewsAvgAggregateOutputType | null
    _sum: CampusNewsSumAggregateOutputType | null
    _min: CampusNewsMinAggregateOutputType | null
    _max: CampusNewsMaxAggregateOutputType | null
  }

  type GetCampusNewsGroupByPayload<T extends CampusNewsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CampusNewsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CampusNewsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CampusNewsGroupByOutputType[P]>
            : GetScalarType<T[P], CampusNewsGroupByOutputType[P]>
        }
      >
    >


  export type CampusNewsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tag?: boolean
    date?: boolean
    title?: boolean
    desc?: boolean
    publishedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    publishedBy?: boolean | CampusNews$publishedByArgs<ExtArgs>
  }, ExtArgs["result"]["campusNews"]>

  export type CampusNewsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tag?: boolean
    date?: boolean
    title?: boolean
    desc?: boolean
    publishedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    publishedBy?: boolean | CampusNews$publishedByArgs<ExtArgs>
  }, ExtArgs["result"]["campusNews"]>

  export type CampusNewsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tag?: boolean
    date?: boolean
    title?: boolean
    desc?: boolean
    publishedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    publishedBy?: boolean | CampusNews$publishedByArgs<ExtArgs>
  }, ExtArgs["result"]["campusNews"]>

  export type CampusNewsSelectScalar = {
    id?: boolean
    tag?: boolean
    date?: boolean
    title?: boolean
    desc?: boolean
    publishedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CampusNewsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tag" | "date" | "title" | "desc" | "publishedById" | "createdAt" | "updatedAt", ExtArgs["result"]["campusNews"]>
  export type CampusNewsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    publishedBy?: boolean | CampusNews$publishedByArgs<ExtArgs>
  }
  export type CampusNewsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    publishedBy?: boolean | CampusNews$publishedByArgs<ExtArgs>
  }
  export type CampusNewsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    publishedBy?: boolean | CampusNews$publishedByArgs<ExtArgs>
  }

  export type $CampusNewsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CampusNews"
    objects: {
      publishedBy: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      tag: string
      date: string
      title: string
      desc: string
      publishedById: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["campusNews"]>
    composites: {}
  }

  type CampusNewsGetPayload<S extends boolean | null | undefined | CampusNewsDefaultArgs> = $Result.GetResult<Prisma.$CampusNewsPayload, S>

  type CampusNewsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CampusNewsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CampusNewsCountAggregateInputType | true
    }

  export interface CampusNewsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CampusNews'], meta: { name: 'CampusNews' } }
    /**
     * Find zero or one CampusNews that matches the filter.
     * @param {CampusNewsFindUniqueArgs} args - Arguments to find a CampusNews
     * @example
     * // Get one CampusNews
     * const campusNews = await prisma.campusNews.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CampusNewsFindUniqueArgs>(args: SelectSubset<T, CampusNewsFindUniqueArgs<ExtArgs>>): Prisma__CampusNewsClient<$Result.GetResult<Prisma.$CampusNewsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CampusNews that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CampusNewsFindUniqueOrThrowArgs} args - Arguments to find a CampusNews
     * @example
     * // Get one CampusNews
     * const campusNews = await prisma.campusNews.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CampusNewsFindUniqueOrThrowArgs>(args: SelectSubset<T, CampusNewsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CampusNewsClient<$Result.GetResult<Prisma.$CampusNewsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CampusNews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampusNewsFindFirstArgs} args - Arguments to find a CampusNews
     * @example
     * // Get one CampusNews
     * const campusNews = await prisma.campusNews.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CampusNewsFindFirstArgs>(args?: SelectSubset<T, CampusNewsFindFirstArgs<ExtArgs>>): Prisma__CampusNewsClient<$Result.GetResult<Prisma.$CampusNewsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CampusNews that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampusNewsFindFirstOrThrowArgs} args - Arguments to find a CampusNews
     * @example
     * // Get one CampusNews
     * const campusNews = await prisma.campusNews.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CampusNewsFindFirstOrThrowArgs>(args?: SelectSubset<T, CampusNewsFindFirstOrThrowArgs<ExtArgs>>): Prisma__CampusNewsClient<$Result.GetResult<Prisma.$CampusNewsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CampusNews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampusNewsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CampusNews
     * const campusNews = await prisma.campusNews.findMany()
     * 
     * // Get first 10 CampusNews
     * const campusNews = await prisma.campusNews.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const campusNewsWithIdOnly = await prisma.campusNews.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CampusNewsFindManyArgs>(args?: SelectSubset<T, CampusNewsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampusNewsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CampusNews.
     * @param {CampusNewsCreateArgs} args - Arguments to create a CampusNews.
     * @example
     * // Create one CampusNews
     * const CampusNews = await prisma.campusNews.create({
     *   data: {
     *     // ... data to create a CampusNews
     *   }
     * })
     * 
     */
    create<T extends CampusNewsCreateArgs>(args: SelectSubset<T, CampusNewsCreateArgs<ExtArgs>>): Prisma__CampusNewsClient<$Result.GetResult<Prisma.$CampusNewsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CampusNews.
     * @param {CampusNewsCreateManyArgs} args - Arguments to create many CampusNews.
     * @example
     * // Create many CampusNews
     * const campusNews = await prisma.campusNews.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CampusNewsCreateManyArgs>(args?: SelectSubset<T, CampusNewsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CampusNews and returns the data saved in the database.
     * @param {CampusNewsCreateManyAndReturnArgs} args - Arguments to create many CampusNews.
     * @example
     * // Create many CampusNews
     * const campusNews = await prisma.campusNews.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CampusNews and only return the `id`
     * const campusNewsWithIdOnly = await prisma.campusNews.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CampusNewsCreateManyAndReturnArgs>(args?: SelectSubset<T, CampusNewsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampusNewsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CampusNews.
     * @param {CampusNewsDeleteArgs} args - Arguments to delete one CampusNews.
     * @example
     * // Delete one CampusNews
     * const CampusNews = await prisma.campusNews.delete({
     *   where: {
     *     // ... filter to delete one CampusNews
     *   }
     * })
     * 
     */
    delete<T extends CampusNewsDeleteArgs>(args: SelectSubset<T, CampusNewsDeleteArgs<ExtArgs>>): Prisma__CampusNewsClient<$Result.GetResult<Prisma.$CampusNewsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CampusNews.
     * @param {CampusNewsUpdateArgs} args - Arguments to update one CampusNews.
     * @example
     * // Update one CampusNews
     * const campusNews = await prisma.campusNews.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CampusNewsUpdateArgs>(args: SelectSubset<T, CampusNewsUpdateArgs<ExtArgs>>): Prisma__CampusNewsClient<$Result.GetResult<Prisma.$CampusNewsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CampusNews.
     * @param {CampusNewsDeleteManyArgs} args - Arguments to filter CampusNews to delete.
     * @example
     * // Delete a few CampusNews
     * const { count } = await prisma.campusNews.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CampusNewsDeleteManyArgs>(args?: SelectSubset<T, CampusNewsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CampusNews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampusNewsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CampusNews
     * const campusNews = await prisma.campusNews.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CampusNewsUpdateManyArgs>(args: SelectSubset<T, CampusNewsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CampusNews and returns the data updated in the database.
     * @param {CampusNewsUpdateManyAndReturnArgs} args - Arguments to update many CampusNews.
     * @example
     * // Update many CampusNews
     * const campusNews = await prisma.campusNews.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CampusNews and only return the `id`
     * const campusNewsWithIdOnly = await prisma.campusNews.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CampusNewsUpdateManyAndReturnArgs>(args: SelectSubset<T, CampusNewsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampusNewsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CampusNews.
     * @param {CampusNewsUpsertArgs} args - Arguments to update or create a CampusNews.
     * @example
     * // Update or create a CampusNews
     * const campusNews = await prisma.campusNews.upsert({
     *   create: {
     *     // ... data to create a CampusNews
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CampusNews we want to update
     *   }
     * })
     */
    upsert<T extends CampusNewsUpsertArgs>(args: SelectSubset<T, CampusNewsUpsertArgs<ExtArgs>>): Prisma__CampusNewsClient<$Result.GetResult<Prisma.$CampusNewsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CampusNews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampusNewsCountArgs} args - Arguments to filter CampusNews to count.
     * @example
     * // Count the number of CampusNews
     * const count = await prisma.campusNews.count({
     *   where: {
     *     // ... the filter for the CampusNews we want to count
     *   }
     * })
    **/
    count<T extends CampusNewsCountArgs>(
      args?: Subset<T, CampusNewsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CampusNewsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CampusNews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampusNewsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CampusNewsAggregateArgs>(args: Subset<T, CampusNewsAggregateArgs>): Prisma.PrismaPromise<GetCampusNewsAggregateType<T>>

    /**
     * Group by CampusNews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampusNewsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CampusNewsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CampusNewsGroupByArgs['orderBy'] }
        : { orderBy?: CampusNewsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CampusNewsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCampusNewsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CampusNews model
   */
  readonly fields: CampusNewsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CampusNews.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CampusNewsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    publishedBy<T extends CampusNews$publishedByArgs<ExtArgs> = {}>(args?: Subset<T, CampusNews$publishedByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CampusNews model
   */
  interface CampusNewsFieldRefs {
    readonly id: FieldRef<"CampusNews", 'Int'>
    readonly tag: FieldRef<"CampusNews", 'String'>
    readonly date: FieldRef<"CampusNews", 'String'>
    readonly title: FieldRef<"CampusNews", 'String'>
    readonly desc: FieldRef<"CampusNews", 'String'>
    readonly publishedById: FieldRef<"CampusNews", 'Int'>
    readonly createdAt: FieldRef<"CampusNews", 'DateTime'>
    readonly updatedAt: FieldRef<"CampusNews", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CampusNews findUnique
   */
  export type CampusNewsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampusNews
     */
    select?: CampusNewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampusNews
     */
    omit?: CampusNewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampusNewsInclude<ExtArgs> | null
    /**
     * Filter, which CampusNews to fetch.
     */
    where: CampusNewsWhereUniqueInput
  }

  /**
   * CampusNews findUniqueOrThrow
   */
  export type CampusNewsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampusNews
     */
    select?: CampusNewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampusNews
     */
    omit?: CampusNewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampusNewsInclude<ExtArgs> | null
    /**
     * Filter, which CampusNews to fetch.
     */
    where: CampusNewsWhereUniqueInput
  }

  /**
   * CampusNews findFirst
   */
  export type CampusNewsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampusNews
     */
    select?: CampusNewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampusNews
     */
    omit?: CampusNewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampusNewsInclude<ExtArgs> | null
    /**
     * Filter, which CampusNews to fetch.
     */
    where?: CampusNewsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampusNews to fetch.
     */
    orderBy?: CampusNewsOrderByWithRelationInput | CampusNewsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CampusNews.
     */
    cursor?: CampusNewsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampusNews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampusNews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CampusNews.
     */
    distinct?: CampusNewsScalarFieldEnum | CampusNewsScalarFieldEnum[]
  }

  /**
   * CampusNews findFirstOrThrow
   */
  export type CampusNewsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampusNews
     */
    select?: CampusNewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampusNews
     */
    omit?: CampusNewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampusNewsInclude<ExtArgs> | null
    /**
     * Filter, which CampusNews to fetch.
     */
    where?: CampusNewsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampusNews to fetch.
     */
    orderBy?: CampusNewsOrderByWithRelationInput | CampusNewsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CampusNews.
     */
    cursor?: CampusNewsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampusNews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampusNews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CampusNews.
     */
    distinct?: CampusNewsScalarFieldEnum | CampusNewsScalarFieldEnum[]
  }

  /**
   * CampusNews findMany
   */
  export type CampusNewsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampusNews
     */
    select?: CampusNewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampusNews
     */
    omit?: CampusNewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampusNewsInclude<ExtArgs> | null
    /**
     * Filter, which CampusNews to fetch.
     */
    where?: CampusNewsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampusNews to fetch.
     */
    orderBy?: CampusNewsOrderByWithRelationInput | CampusNewsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CampusNews.
     */
    cursor?: CampusNewsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampusNews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampusNews.
     */
    skip?: number
    distinct?: CampusNewsScalarFieldEnum | CampusNewsScalarFieldEnum[]
  }

  /**
   * CampusNews create
   */
  export type CampusNewsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampusNews
     */
    select?: CampusNewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampusNews
     */
    omit?: CampusNewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampusNewsInclude<ExtArgs> | null
    /**
     * The data needed to create a CampusNews.
     */
    data: XOR<CampusNewsCreateInput, CampusNewsUncheckedCreateInput>
  }

  /**
   * CampusNews createMany
   */
  export type CampusNewsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CampusNews.
     */
    data: CampusNewsCreateManyInput | CampusNewsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CampusNews createManyAndReturn
   */
  export type CampusNewsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampusNews
     */
    select?: CampusNewsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CampusNews
     */
    omit?: CampusNewsOmit<ExtArgs> | null
    /**
     * The data used to create many CampusNews.
     */
    data: CampusNewsCreateManyInput | CampusNewsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampusNewsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CampusNews update
   */
  export type CampusNewsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampusNews
     */
    select?: CampusNewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampusNews
     */
    omit?: CampusNewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampusNewsInclude<ExtArgs> | null
    /**
     * The data needed to update a CampusNews.
     */
    data: XOR<CampusNewsUpdateInput, CampusNewsUncheckedUpdateInput>
    /**
     * Choose, which CampusNews to update.
     */
    where: CampusNewsWhereUniqueInput
  }

  /**
   * CampusNews updateMany
   */
  export type CampusNewsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CampusNews.
     */
    data: XOR<CampusNewsUpdateManyMutationInput, CampusNewsUncheckedUpdateManyInput>
    /**
     * Filter which CampusNews to update
     */
    where?: CampusNewsWhereInput
    /**
     * Limit how many CampusNews to update.
     */
    limit?: number
  }

  /**
   * CampusNews updateManyAndReturn
   */
  export type CampusNewsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampusNews
     */
    select?: CampusNewsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CampusNews
     */
    omit?: CampusNewsOmit<ExtArgs> | null
    /**
     * The data used to update CampusNews.
     */
    data: XOR<CampusNewsUpdateManyMutationInput, CampusNewsUncheckedUpdateManyInput>
    /**
     * Filter which CampusNews to update
     */
    where?: CampusNewsWhereInput
    /**
     * Limit how many CampusNews to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampusNewsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CampusNews upsert
   */
  export type CampusNewsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampusNews
     */
    select?: CampusNewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampusNews
     */
    omit?: CampusNewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampusNewsInclude<ExtArgs> | null
    /**
     * The filter to search for the CampusNews to update in case it exists.
     */
    where: CampusNewsWhereUniqueInput
    /**
     * In case the CampusNews found by the `where` argument doesn't exist, create a new CampusNews with this data.
     */
    create: XOR<CampusNewsCreateInput, CampusNewsUncheckedCreateInput>
    /**
     * In case the CampusNews was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CampusNewsUpdateInput, CampusNewsUncheckedUpdateInput>
  }

  /**
   * CampusNews delete
   */
  export type CampusNewsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampusNews
     */
    select?: CampusNewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampusNews
     */
    omit?: CampusNewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampusNewsInclude<ExtArgs> | null
    /**
     * Filter which CampusNews to delete.
     */
    where: CampusNewsWhereUniqueInput
  }

  /**
   * CampusNews deleteMany
   */
  export type CampusNewsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CampusNews to delete
     */
    where?: CampusNewsWhereInput
    /**
     * Limit how many CampusNews to delete.
     */
    limit?: number
  }

  /**
   * CampusNews.publishedBy
   */
  export type CampusNews$publishedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * CampusNews without action
   */
  export type CampusNewsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampusNews
     */
    select?: CampusNewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampusNews
     */
    omit?: CampusNewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampusNewsInclude<ExtArgs> | null
  }


  /**
   * Model AssetCategory
   */

  export type AggregateAssetCategory = {
    _count: AssetCategoryCountAggregateOutputType | null
    _avg: AssetCategoryAvgAggregateOutputType | null
    _sum: AssetCategorySumAggregateOutputType | null
    _min: AssetCategoryMinAggregateOutputType | null
    _max: AssetCategoryMaxAggregateOutputType | null
  }

  export type AssetCategoryAvgAggregateOutputType = {
    id: number | null
    sortOrder: number | null
  }

  export type AssetCategorySumAggregateOutputType = {
    id: number | null
    sortOrder: number | null
  }

  export type AssetCategoryMinAggregateOutputType = {
    id: number | null
    name: string | null
    label: string | null
    enabled: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AssetCategoryMaxAggregateOutputType = {
    id: number | null
    name: string | null
    label: string | null
    enabled: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AssetCategoryCountAggregateOutputType = {
    id: number
    name: number
    label: number
    enabled: number
    sortOrder: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AssetCategoryAvgAggregateInputType = {
    id?: true
    sortOrder?: true
  }

  export type AssetCategorySumAggregateInputType = {
    id?: true
    sortOrder?: true
  }

  export type AssetCategoryMinAggregateInputType = {
    id?: true
    name?: true
    label?: true
    enabled?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AssetCategoryMaxAggregateInputType = {
    id?: true
    name?: true
    label?: true
    enabled?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AssetCategoryCountAggregateInputType = {
    id?: true
    name?: true
    label?: true
    enabled?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AssetCategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AssetCategory to aggregate.
     */
    where?: AssetCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssetCategories to fetch.
     */
    orderBy?: AssetCategoryOrderByWithRelationInput | AssetCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssetCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssetCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssetCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AssetCategories
    **/
    _count?: true | AssetCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AssetCategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AssetCategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssetCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssetCategoryMaxAggregateInputType
  }

  export type GetAssetCategoryAggregateType<T extends AssetCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateAssetCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssetCategory[P]>
      : GetScalarType<T[P], AggregateAssetCategory[P]>
  }




  export type AssetCategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssetCategoryWhereInput
    orderBy?: AssetCategoryOrderByWithAggregationInput | AssetCategoryOrderByWithAggregationInput[]
    by: AssetCategoryScalarFieldEnum[] | AssetCategoryScalarFieldEnum
    having?: AssetCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssetCategoryCountAggregateInputType | true
    _avg?: AssetCategoryAvgAggregateInputType
    _sum?: AssetCategorySumAggregateInputType
    _min?: AssetCategoryMinAggregateInputType
    _max?: AssetCategoryMaxAggregateInputType
  }

  export type AssetCategoryGroupByOutputType = {
    id: number
    name: string
    label: string
    enabled: boolean
    sortOrder: number
    createdAt: Date
    updatedAt: Date
    _count: AssetCategoryCountAggregateOutputType | null
    _avg: AssetCategoryAvgAggregateOutputType | null
    _sum: AssetCategorySumAggregateOutputType | null
    _min: AssetCategoryMinAggregateOutputType | null
    _max: AssetCategoryMaxAggregateOutputType | null
  }

  type GetAssetCategoryGroupByPayload<T extends AssetCategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssetCategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssetCategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssetCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], AssetCategoryGroupByOutputType[P]>
        }
      >
    >


  export type AssetCategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    label?: boolean
    enabled?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    itemPresets?: boolean | AssetCategory$itemPresetsArgs<ExtArgs>
    _count?: boolean | AssetCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assetCategory"]>

  export type AssetCategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    label?: boolean
    enabled?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["assetCategory"]>

  export type AssetCategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    label?: boolean
    enabled?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["assetCategory"]>

  export type AssetCategorySelectScalar = {
    id?: boolean
    name?: boolean
    label?: boolean
    enabled?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AssetCategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "label" | "enabled" | "sortOrder" | "createdAt" | "updatedAt", ExtArgs["result"]["assetCategory"]>
  export type AssetCategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itemPresets?: boolean | AssetCategory$itemPresetsArgs<ExtArgs>
    _count?: boolean | AssetCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AssetCategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AssetCategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AssetCategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AssetCategory"
    objects: {
      itemPresets: Prisma.$ItemPresetPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      label: string
      enabled: boolean
      sortOrder: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["assetCategory"]>
    composites: {}
  }

  type AssetCategoryGetPayload<S extends boolean | null | undefined | AssetCategoryDefaultArgs> = $Result.GetResult<Prisma.$AssetCategoryPayload, S>

  type AssetCategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AssetCategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AssetCategoryCountAggregateInputType | true
    }

  export interface AssetCategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AssetCategory'], meta: { name: 'AssetCategory' } }
    /**
     * Find zero or one AssetCategory that matches the filter.
     * @param {AssetCategoryFindUniqueArgs} args - Arguments to find a AssetCategory
     * @example
     * // Get one AssetCategory
     * const assetCategory = await prisma.assetCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssetCategoryFindUniqueArgs>(args: SelectSubset<T, AssetCategoryFindUniqueArgs<ExtArgs>>): Prisma__AssetCategoryClient<$Result.GetResult<Prisma.$AssetCategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AssetCategory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssetCategoryFindUniqueOrThrowArgs} args - Arguments to find a AssetCategory
     * @example
     * // Get one AssetCategory
     * const assetCategory = await prisma.assetCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssetCategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, AssetCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssetCategoryClient<$Result.GetResult<Prisma.$AssetCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AssetCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetCategoryFindFirstArgs} args - Arguments to find a AssetCategory
     * @example
     * // Get one AssetCategory
     * const assetCategory = await prisma.assetCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssetCategoryFindFirstArgs>(args?: SelectSubset<T, AssetCategoryFindFirstArgs<ExtArgs>>): Prisma__AssetCategoryClient<$Result.GetResult<Prisma.$AssetCategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AssetCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetCategoryFindFirstOrThrowArgs} args - Arguments to find a AssetCategory
     * @example
     * // Get one AssetCategory
     * const assetCategory = await prisma.assetCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssetCategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, AssetCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssetCategoryClient<$Result.GetResult<Prisma.$AssetCategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AssetCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AssetCategories
     * const assetCategories = await prisma.assetCategory.findMany()
     * 
     * // Get first 10 AssetCategories
     * const assetCategories = await prisma.assetCategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assetCategoryWithIdOnly = await prisma.assetCategory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssetCategoryFindManyArgs>(args?: SelectSubset<T, AssetCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssetCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AssetCategory.
     * @param {AssetCategoryCreateArgs} args - Arguments to create a AssetCategory.
     * @example
     * // Create one AssetCategory
     * const AssetCategory = await prisma.assetCategory.create({
     *   data: {
     *     // ... data to create a AssetCategory
     *   }
     * })
     * 
     */
    create<T extends AssetCategoryCreateArgs>(args: SelectSubset<T, AssetCategoryCreateArgs<ExtArgs>>): Prisma__AssetCategoryClient<$Result.GetResult<Prisma.$AssetCategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AssetCategories.
     * @param {AssetCategoryCreateManyArgs} args - Arguments to create many AssetCategories.
     * @example
     * // Create many AssetCategories
     * const assetCategory = await prisma.assetCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssetCategoryCreateManyArgs>(args?: SelectSubset<T, AssetCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AssetCategories and returns the data saved in the database.
     * @param {AssetCategoryCreateManyAndReturnArgs} args - Arguments to create many AssetCategories.
     * @example
     * // Create many AssetCategories
     * const assetCategory = await prisma.assetCategory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AssetCategories and only return the `id`
     * const assetCategoryWithIdOnly = await prisma.assetCategory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AssetCategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, AssetCategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssetCategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AssetCategory.
     * @param {AssetCategoryDeleteArgs} args - Arguments to delete one AssetCategory.
     * @example
     * // Delete one AssetCategory
     * const AssetCategory = await prisma.assetCategory.delete({
     *   where: {
     *     // ... filter to delete one AssetCategory
     *   }
     * })
     * 
     */
    delete<T extends AssetCategoryDeleteArgs>(args: SelectSubset<T, AssetCategoryDeleteArgs<ExtArgs>>): Prisma__AssetCategoryClient<$Result.GetResult<Prisma.$AssetCategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AssetCategory.
     * @param {AssetCategoryUpdateArgs} args - Arguments to update one AssetCategory.
     * @example
     * // Update one AssetCategory
     * const assetCategory = await prisma.assetCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssetCategoryUpdateArgs>(args: SelectSubset<T, AssetCategoryUpdateArgs<ExtArgs>>): Prisma__AssetCategoryClient<$Result.GetResult<Prisma.$AssetCategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AssetCategories.
     * @param {AssetCategoryDeleteManyArgs} args - Arguments to filter AssetCategories to delete.
     * @example
     * // Delete a few AssetCategories
     * const { count } = await prisma.assetCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssetCategoryDeleteManyArgs>(args?: SelectSubset<T, AssetCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AssetCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AssetCategories
     * const assetCategory = await prisma.assetCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssetCategoryUpdateManyArgs>(args: SelectSubset<T, AssetCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AssetCategories and returns the data updated in the database.
     * @param {AssetCategoryUpdateManyAndReturnArgs} args - Arguments to update many AssetCategories.
     * @example
     * // Update many AssetCategories
     * const assetCategory = await prisma.assetCategory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AssetCategories and only return the `id`
     * const assetCategoryWithIdOnly = await prisma.assetCategory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AssetCategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, AssetCategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssetCategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AssetCategory.
     * @param {AssetCategoryUpsertArgs} args - Arguments to update or create a AssetCategory.
     * @example
     * // Update or create a AssetCategory
     * const assetCategory = await prisma.assetCategory.upsert({
     *   create: {
     *     // ... data to create a AssetCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AssetCategory we want to update
     *   }
     * })
     */
    upsert<T extends AssetCategoryUpsertArgs>(args: SelectSubset<T, AssetCategoryUpsertArgs<ExtArgs>>): Prisma__AssetCategoryClient<$Result.GetResult<Prisma.$AssetCategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AssetCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetCategoryCountArgs} args - Arguments to filter AssetCategories to count.
     * @example
     * // Count the number of AssetCategories
     * const count = await prisma.assetCategory.count({
     *   where: {
     *     // ... the filter for the AssetCategories we want to count
     *   }
     * })
    **/
    count<T extends AssetCategoryCountArgs>(
      args?: Subset<T, AssetCategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssetCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AssetCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AssetCategoryAggregateArgs>(args: Subset<T, AssetCategoryAggregateArgs>): Prisma.PrismaPromise<GetAssetCategoryAggregateType<T>>

    /**
     * Group by AssetCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetCategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AssetCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssetCategoryGroupByArgs['orderBy'] }
        : { orderBy?: AssetCategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AssetCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AssetCategory model
   */
  readonly fields: AssetCategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AssetCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssetCategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    itemPresets<T extends AssetCategory$itemPresetsArgs<ExtArgs> = {}>(args?: Subset<T, AssetCategory$itemPresetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPresetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AssetCategory model
   */
  interface AssetCategoryFieldRefs {
    readonly id: FieldRef<"AssetCategory", 'Int'>
    readonly name: FieldRef<"AssetCategory", 'String'>
    readonly label: FieldRef<"AssetCategory", 'String'>
    readonly enabled: FieldRef<"AssetCategory", 'Boolean'>
    readonly sortOrder: FieldRef<"AssetCategory", 'Int'>
    readonly createdAt: FieldRef<"AssetCategory", 'DateTime'>
    readonly updatedAt: FieldRef<"AssetCategory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AssetCategory findUnique
   */
  export type AssetCategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCategory
     */
    select?: AssetCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssetCategory
     */
    omit?: AssetCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetCategoryInclude<ExtArgs> | null
    /**
     * Filter, which AssetCategory to fetch.
     */
    where: AssetCategoryWhereUniqueInput
  }

  /**
   * AssetCategory findUniqueOrThrow
   */
  export type AssetCategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCategory
     */
    select?: AssetCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssetCategory
     */
    omit?: AssetCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetCategoryInclude<ExtArgs> | null
    /**
     * Filter, which AssetCategory to fetch.
     */
    where: AssetCategoryWhereUniqueInput
  }

  /**
   * AssetCategory findFirst
   */
  export type AssetCategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCategory
     */
    select?: AssetCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssetCategory
     */
    omit?: AssetCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetCategoryInclude<ExtArgs> | null
    /**
     * Filter, which AssetCategory to fetch.
     */
    where?: AssetCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssetCategories to fetch.
     */
    orderBy?: AssetCategoryOrderByWithRelationInput | AssetCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AssetCategories.
     */
    cursor?: AssetCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssetCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssetCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssetCategories.
     */
    distinct?: AssetCategoryScalarFieldEnum | AssetCategoryScalarFieldEnum[]
  }

  /**
   * AssetCategory findFirstOrThrow
   */
  export type AssetCategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCategory
     */
    select?: AssetCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssetCategory
     */
    omit?: AssetCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetCategoryInclude<ExtArgs> | null
    /**
     * Filter, which AssetCategory to fetch.
     */
    where?: AssetCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssetCategories to fetch.
     */
    orderBy?: AssetCategoryOrderByWithRelationInput | AssetCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AssetCategories.
     */
    cursor?: AssetCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssetCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssetCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssetCategories.
     */
    distinct?: AssetCategoryScalarFieldEnum | AssetCategoryScalarFieldEnum[]
  }

  /**
   * AssetCategory findMany
   */
  export type AssetCategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCategory
     */
    select?: AssetCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssetCategory
     */
    omit?: AssetCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetCategoryInclude<ExtArgs> | null
    /**
     * Filter, which AssetCategories to fetch.
     */
    where?: AssetCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssetCategories to fetch.
     */
    orderBy?: AssetCategoryOrderByWithRelationInput | AssetCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AssetCategories.
     */
    cursor?: AssetCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssetCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssetCategories.
     */
    skip?: number
    distinct?: AssetCategoryScalarFieldEnum | AssetCategoryScalarFieldEnum[]
  }

  /**
   * AssetCategory create
   */
  export type AssetCategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCategory
     */
    select?: AssetCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssetCategory
     */
    omit?: AssetCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetCategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a AssetCategory.
     */
    data: XOR<AssetCategoryCreateInput, AssetCategoryUncheckedCreateInput>
  }

  /**
   * AssetCategory createMany
   */
  export type AssetCategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AssetCategories.
     */
    data: AssetCategoryCreateManyInput | AssetCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AssetCategory createManyAndReturn
   */
  export type AssetCategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCategory
     */
    select?: AssetCategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AssetCategory
     */
    omit?: AssetCategoryOmit<ExtArgs> | null
    /**
     * The data used to create many AssetCategories.
     */
    data: AssetCategoryCreateManyInput | AssetCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AssetCategory update
   */
  export type AssetCategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCategory
     */
    select?: AssetCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssetCategory
     */
    omit?: AssetCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetCategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a AssetCategory.
     */
    data: XOR<AssetCategoryUpdateInput, AssetCategoryUncheckedUpdateInput>
    /**
     * Choose, which AssetCategory to update.
     */
    where: AssetCategoryWhereUniqueInput
  }

  /**
   * AssetCategory updateMany
   */
  export type AssetCategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AssetCategories.
     */
    data: XOR<AssetCategoryUpdateManyMutationInput, AssetCategoryUncheckedUpdateManyInput>
    /**
     * Filter which AssetCategories to update
     */
    where?: AssetCategoryWhereInput
    /**
     * Limit how many AssetCategories to update.
     */
    limit?: number
  }

  /**
   * AssetCategory updateManyAndReturn
   */
  export type AssetCategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCategory
     */
    select?: AssetCategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AssetCategory
     */
    omit?: AssetCategoryOmit<ExtArgs> | null
    /**
     * The data used to update AssetCategories.
     */
    data: XOR<AssetCategoryUpdateManyMutationInput, AssetCategoryUncheckedUpdateManyInput>
    /**
     * Filter which AssetCategories to update
     */
    where?: AssetCategoryWhereInput
    /**
     * Limit how many AssetCategories to update.
     */
    limit?: number
  }

  /**
   * AssetCategory upsert
   */
  export type AssetCategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCategory
     */
    select?: AssetCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssetCategory
     */
    omit?: AssetCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetCategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the AssetCategory to update in case it exists.
     */
    where: AssetCategoryWhereUniqueInput
    /**
     * In case the AssetCategory found by the `where` argument doesn't exist, create a new AssetCategory with this data.
     */
    create: XOR<AssetCategoryCreateInput, AssetCategoryUncheckedCreateInput>
    /**
     * In case the AssetCategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssetCategoryUpdateInput, AssetCategoryUncheckedUpdateInput>
  }

  /**
   * AssetCategory delete
   */
  export type AssetCategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCategory
     */
    select?: AssetCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssetCategory
     */
    omit?: AssetCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetCategoryInclude<ExtArgs> | null
    /**
     * Filter which AssetCategory to delete.
     */
    where: AssetCategoryWhereUniqueInput
  }

  /**
   * AssetCategory deleteMany
   */
  export type AssetCategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AssetCategories to delete
     */
    where?: AssetCategoryWhereInput
    /**
     * Limit how many AssetCategories to delete.
     */
    limit?: number
  }

  /**
   * AssetCategory.itemPresets
   */
  export type AssetCategory$itemPresetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPreset
     */
    select?: ItemPresetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemPreset
     */
    omit?: ItemPresetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPresetInclude<ExtArgs> | null
    where?: ItemPresetWhereInput
    orderBy?: ItemPresetOrderByWithRelationInput | ItemPresetOrderByWithRelationInput[]
    cursor?: ItemPresetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemPresetScalarFieldEnum | ItemPresetScalarFieldEnum[]
  }

  /**
   * AssetCategory without action
   */
  export type AssetCategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCategory
     */
    select?: AssetCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssetCategory
     */
    omit?: AssetCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetCategoryInclude<ExtArgs> | null
  }


  /**
   * Model ItemPreset
   */

  export type AggregateItemPreset = {
    _count: ItemPresetCountAggregateOutputType | null
    _avg: ItemPresetAvgAggregateOutputType | null
    _sum: ItemPresetSumAggregateOutputType | null
    _min: ItemPresetMinAggregateOutputType | null
    _max: ItemPresetMaxAggregateOutputType | null
  }

  export type ItemPresetAvgAggregateOutputType = {
    id: number | null
    categoryId: number | null
    sortOrder: number | null
  }

  export type ItemPresetSumAggregateOutputType = {
    id: number | null
    categoryId: number | null
    sortOrder: number | null
  }

  export type ItemPresetMinAggregateOutputType = {
    id: number | null
    name: string | null
    icon: string | null
    categoryId: number | null
    enabled: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ItemPresetMaxAggregateOutputType = {
    id: number | null
    name: string | null
    icon: string | null
    categoryId: number | null
    enabled: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ItemPresetCountAggregateOutputType = {
    id: number
    name: number
    icon: number
    categoryId: number
    enabled: number
    sortOrder: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ItemPresetAvgAggregateInputType = {
    id?: true
    categoryId?: true
    sortOrder?: true
  }

  export type ItemPresetSumAggregateInputType = {
    id?: true
    categoryId?: true
    sortOrder?: true
  }

  export type ItemPresetMinAggregateInputType = {
    id?: true
    name?: true
    icon?: true
    categoryId?: true
    enabled?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ItemPresetMaxAggregateInputType = {
    id?: true
    name?: true
    icon?: true
    categoryId?: true
    enabled?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ItemPresetCountAggregateInputType = {
    id?: true
    name?: true
    icon?: true
    categoryId?: true
    enabled?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ItemPresetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItemPreset to aggregate.
     */
    where?: ItemPresetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemPresets to fetch.
     */
    orderBy?: ItemPresetOrderByWithRelationInput | ItemPresetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ItemPresetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemPresets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemPresets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ItemPresets
    **/
    _count?: true | ItemPresetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ItemPresetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ItemPresetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ItemPresetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ItemPresetMaxAggregateInputType
  }

  export type GetItemPresetAggregateType<T extends ItemPresetAggregateArgs> = {
        [P in keyof T & keyof AggregateItemPreset]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItemPreset[P]>
      : GetScalarType<T[P], AggregateItemPreset[P]>
  }




  export type ItemPresetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemPresetWhereInput
    orderBy?: ItemPresetOrderByWithAggregationInput | ItemPresetOrderByWithAggregationInput[]
    by: ItemPresetScalarFieldEnum[] | ItemPresetScalarFieldEnum
    having?: ItemPresetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ItemPresetCountAggregateInputType | true
    _avg?: ItemPresetAvgAggregateInputType
    _sum?: ItemPresetSumAggregateInputType
    _min?: ItemPresetMinAggregateInputType
    _max?: ItemPresetMaxAggregateInputType
  }

  export type ItemPresetGroupByOutputType = {
    id: number
    name: string
    icon: string
    categoryId: number
    enabled: boolean
    sortOrder: number
    createdAt: Date
    updatedAt: Date
    _count: ItemPresetCountAggregateOutputType | null
    _avg: ItemPresetAvgAggregateOutputType | null
    _sum: ItemPresetSumAggregateOutputType | null
    _min: ItemPresetMinAggregateOutputType | null
    _max: ItemPresetMaxAggregateOutputType | null
  }

  type GetItemPresetGroupByPayload<T extends ItemPresetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ItemPresetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ItemPresetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ItemPresetGroupByOutputType[P]>
            : GetScalarType<T[P], ItemPresetGroupByOutputType[P]>
        }
      >
    >


  export type ItemPresetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    icon?: boolean
    categoryId?: boolean
    enabled?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | AssetCategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemPreset"]>

  export type ItemPresetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    icon?: boolean
    categoryId?: boolean
    enabled?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | AssetCategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemPreset"]>

  export type ItemPresetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    icon?: boolean
    categoryId?: boolean
    enabled?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | AssetCategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemPreset"]>

  export type ItemPresetSelectScalar = {
    id?: boolean
    name?: boolean
    icon?: boolean
    categoryId?: boolean
    enabled?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ItemPresetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "icon" | "categoryId" | "enabled" | "sortOrder" | "createdAt" | "updatedAt", ExtArgs["result"]["itemPreset"]>
  export type ItemPresetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | AssetCategoryDefaultArgs<ExtArgs>
  }
  export type ItemPresetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | AssetCategoryDefaultArgs<ExtArgs>
  }
  export type ItemPresetIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | AssetCategoryDefaultArgs<ExtArgs>
  }

  export type $ItemPresetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ItemPreset"
    objects: {
      category: Prisma.$AssetCategoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      icon: string
      categoryId: number
      enabled: boolean
      sortOrder: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["itemPreset"]>
    composites: {}
  }

  type ItemPresetGetPayload<S extends boolean | null | undefined | ItemPresetDefaultArgs> = $Result.GetResult<Prisma.$ItemPresetPayload, S>

  type ItemPresetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ItemPresetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ItemPresetCountAggregateInputType | true
    }

  export interface ItemPresetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ItemPreset'], meta: { name: 'ItemPreset' } }
    /**
     * Find zero or one ItemPreset that matches the filter.
     * @param {ItemPresetFindUniqueArgs} args - Arguments to find a ItemPreset
     * @example
     * // Get one ItemPreset
     * const itemPreset = await prisma.itemPreset.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ItemPresetFindUniqueArgs>(args: SelectSubset<T, ItemPresetFindUniqueArgs<ExtArgs>>): Prisma__ItemPresetClient<$Result.GetResult<Prisma.$ItemPresetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ItemPreset that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ItemPresetFindUniqueOrThrowArgs} args - Arguments to find a ItemPreset
     * @example
     * // Get one ItemPreset
     * const itemPreset = await prisma.itemPreset.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ItemPresetFindUniqueOrThrowArgs>(args: SelectSubset<T, ItemPresetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ItemPresetClient<$Result.GetResult<Prisma.$ItemPresetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ItemPreset that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemPresetFindFirstArgs} args - Arguments to find a ItemPreset
     * @example
     * // Get one ItemPreset
     * const itemPreset = await prisma.itemPreset.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ItemPresetFindFirstArgs>(args?: SelectSubset<T, ItemPresetFindFirstArgs<ExtArgs>>): Prisma__ItemPresetClient<$Result.GetResult<Prisma.$ItemPresetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ItemPreset that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemPresetFindFirstOrThrowArgs} args - Arguments to find a ItemPreset
     * @example
     * // Get one ItemPreset
     * const itemPreset = await prisma.itemPreset.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ItemPresetFindFirstOrThrowArgs>(args?: SelectSubset<T, ItemPresetFindFirstOrThrowArgs<ExtArgs>>): Prisma__ItemPresetClient<$Result.GetResult<Prisma.$ItemPresetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ItemPresets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemPresetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ItemPresets
     * const itemPresets = await prisma.itemPreset.findMany()
     * 
     * // Get first 10 ItemPresets
     * const itemPresets = await prisma.itemPreset.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const itemPresetWithIdOnly = await prisma.itemPreset.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ItemPresetFindManyArgs>(args?: SelectSubset<T, ItemPresetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPresetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ItemPreset.
     * @param {ItemPresetCreateArgs} args - Arguments to create a ItemPreset.
     * @example
     * // Create one ItemPreset
     * const ItemPreset = await prisma.itemPreset.create({
     *   data: {
     *     // ... data to create a ItemPreset
     *   }
     * })
     * 
     */
    create<T extends ItemPresetCreateArgs>(args: SelectSubset<T, ItemPresetCreateArgs<ExtArgs>>): Prisma__ItemPresetClient<$Result.GetResult<Prisma.$ItemPresetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ItemPresets.
     * @param {ItemPresetCreateManyArgs} args - Arguments to create many ItemPresets.
     * @example
     * // Create many ItemPresets
     * const itemPreset = await prisma.itemPreset.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ItemPresetCreateManyArgs>(args?: SelectSubset<T, ItemPresetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ItemPresets and returns the data saved in the database.
     * @param {ItemPresetCreateManyAndReturnArgs} args - Arguments to create many ItemPresets.
     * @example
     * // Create many ItemPresets
     * const itemPreset = await prisma.itemPreset.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ItemPresets and only return the `id`
     * const itemPresetWithIdOnly = await prisma.itemPreset.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ItemPresetCreateManyAndReturnArgs>(args?: SelectSubset<T, ItemPresetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPresetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ItemPreset.
     * @param {ItemPresetDeleteArgs} args - Arguments to delete one ItemPreset.
     * @example
     * // Delete one ItemPreset
     * const ItemPreset = await prisma.itemPreset.delete({
     *   where: {
     *     // ... filter to delete one ItemPreset
     *   }
     * })
     * 
     */
    delete<T extends ItemPresetDeleteArgs>(args: SelectSubset<T, ItemPresetDeleteArgs<ExtArgs>>): Prisma__ItemPresetClient<$Result.GetResult<Prisma.$ItemPresetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ItemPreset.
     * @param {ItemPresetUpdateArgs} args - Arguments to update one ItemPreset.
     * @example
     * // Update one ItemPreset
     * const itemPreset = await prisma.itemPreset.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ItemPresetUpdateArgs>(args: SelectSubset<T, ItemPresetUpdateArgs<ExtArgs>>): Prisma__ItemPresetClient<$Result.GetResult<Prisma.$ItemPresetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ItemPresets.
     * @param {ItemPresetDeleteManyArgs} args - Arguments to filter ItemPresets to delete.
     * @example
     * // Delete a few ItemPresets
     * const { count } = await prisma.itemPreset.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ItemPresetDeleteManyArgs>(args?: SelectSubset<T, ItemPresetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ItemPresets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemPresetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ItemPresets
     * const itemPreset = await prisma.itemPreset.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ItemPresetUpdateManyArgs>(args: SelectSubset<T, ItemPresetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ItemPresets and returns the data updated in the database.
     * @param {ItemPresetUpdateManyAndReturnArgs} args - Arguments to update many ItemPresets.
     * @example
     * // Update many ItemPresets
     * const itemPreset = await prisma.itemPreset.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ItemPresets and only return the `id`
     * const itemPresetWithIdOnly = await prisma.itemPreset.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ItemPresetUpdateManyAndReturnArgs>(args: SelectSubset<T, ItemPresetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPresetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ItemPreset.
     * @param {ItemPresetUpsertArgs} args - Arguments to update or create a ItemPreset.
     * @example
     * // Update or create a ItemPreset
     * const itemPreset = await prisma.itemPreset.upsert({
     *   create: {
     *     // ... data to create a ItemPreset
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ItemPreset we want to update
     *   }
     * })
     */
    upsert<T extends ItemPresetUpsertArgs>(args: SelectSubset<T, ItemPresetUpsertArgs<ExtArgs>>): Prisma__ItemPresetClient<$Result.GetResult<Prisma.$ItemPresetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ItemPresets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemPresetCountArgs} args - Arguments to filter ItemPresets to count.
     * @example
     * // Count the number of ItemPresets
     * const count = await prisma.itemPreset.count({
     *   where: {
     *     // ... the filter for the ItemPresets we want to count
     *   }
     * })
    **/
    count<T extends ItemPresetCountArgs>(
      args?: Subset<T, ItemPresetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ItemPresetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ItemPreset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemPresetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ItemPresetAggregateArgs>(args: Subset<T, ItemPresetAggregateArgs>): Prisma.PrismaPromise<GetItemPresetAggregateType<T>>

    /**
     * Group by ItemPreset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemPresetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ItemPresetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ItemPresetGroupByArgs['orderBy'] }
        : { orderBy?: ItemPresetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ItemPresetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItemPresetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ItemPreset model
   */
  readonly fields: ItemPresetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ItemPreset.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ItemPresetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends AssetCategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AssetCategoryDefaultArgs<ExtArgs>>): Prisma__AssetCategoryClient<$Result.GetResult<Prisma.$AssetCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ItemPreset model
   */
  interface ItemPresetFieldRefs {
    readonly id: FieldRef<"ItemPreset", 'Int'>
    readonly name: FieldRef<"ItemPreset", 'String'>
    readonly icon: FieldRef<"ItemPreset", 'String'>
    readonly categoryId: FieldRef<"ItemPreset", 'Int'>
    readonly enabled: FieldRef<"ItemPreset", 'Boolean'>
    readonly sortOrder: FieldRef<"ItemPreset", 'Int'>
    readonly createdAt: FieldRef<"ItemPreset", 'DateTime'>
    readonly updatedAt: FieldRef<"ItemPreset", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ItemPreset findUnique
   */
  export type ItemPresetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPreset
     */
    select?: ItemPresetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemPreset
     */
    omit?: ItemPresetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPresetInclude<ExtArgs> | null
    /**
     * Filter, which ItemPreset to fetch.
     */
    where: ItemPresetWhereUniqueInput
  }

  /**
   * ItemPreset findUniqueOrThrow
   */
  export type ItemPresetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPreset
     */
    select?: ItemPresetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemPreset
     */
    omit?: ItemPresetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPresetInclude<ExtArgs> | null
    /**
     * Filter, which ItemPreset to fetch.
     */
    where: ItemPresetWhereUniqueInput
  }

  /**
   * ItemPreset findFirst
   */
  export type ItemPresetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPreset
     */
    select?: ItemPresetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemPreset
     */
    omit?: ItemPresetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPresetInclude<ExtArgs> | null
    /**
     * Filter, which ItemPreset to fetch.
     */
    where?: ItemPresetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemPresets to fetch.
     */
    orderBy?: ItemPresetOrderByWithRelationInput | ItemPresetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItemPresets.
     */
    cursor?: ItemPresetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemPresets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemPresets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItemPresets.
     */
    distinct?: ItemPresetScalarFieldEnum | ItemPresetScalarFieldEnum[]
  }

  /**
   * ItemPreset findFirstOrThrow
   */
  export type ItemPresetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPreset
     */
    select?: ItemPresetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemPreset
     */
    omit?: ItemPresetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPresetInclude<ExtArgs> | null
    /**
     * Filter, which ItemPreset to fetch.
     */
    where?: ItemPresetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemPresets to fetch.
     */
    orderBy?: ItemPresetOrderByWithRelationInput | ItemPresetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItemPresets.
     */
    cursor?: ItemPresetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemPresets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemPresets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItemPresets.
     */
    distinct?: ItemPresetScalarFieldEnum | ItemPresetScalarFieldEnum[]
  }

  /**
   * ItemPreset findMany
   */
  export type ItemPresetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPreset
     */
    select?: ItemPresetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemPreset
     */
    omit?: ItemPresetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPresetInclude<ExtArgs> | null
    /**
     * Filter, which ItemPresets to fetch.
     */
    where?: ItemPresetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemPresets to fetch.
     */
    orderBy?: ItemPresetOrderByWithRelationInput | ItemPresetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ItemPresets.
     */
    cursor?: ItemPresetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemPresets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemPresets.
     */
    skip?: number
    distinct?: ItemPresetScalarFieldEnum | ItemPresetScalarFieldEnum[]
  }

  /**
   * ItemPreset create
   */
  export type ItemPresetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPreset
     */
    select?: ItemPresetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemPreset
     */
    omit?: ItemPresetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPresetInclude<ExtArgs> | null
    /**
     * The data needed to create a ItemPreset.
     */
    data: XOR<ItemPresetCreateInput, ItemPresetUncheckedCreateInput>
  }

  /**
   * ItemPreset createMany
   */
  export type ItemPresetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ItemPresets.
     */
    data: ItemPresetCreateManyInput | ItemPresetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ItemPreset createManyAndReturn
   */
  export type ItemPresetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPreset
     */
    select?: ItemPresetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ItemPreset
     */
    omit?: ItemPresetOmit<ExtArgs> | null
    /**
     * The data used to create many ItemPresets.
     */
    data: ItemPresetCreateManyInput | ItemPresetCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPresetIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ItemPreset update
   */
  export type ItemPresetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPreset
     */
    select?: ItemPresetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemPreset
     */
    omit?: ItemPresetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPresetInclude<ExtArgs> | null
    /**
     * The data needed to update a ItemPreset.
     */
    data: XOR<ItemPresetUpdateInput, ItemPresetUncheckedUpdateInput>
    /**
     * Choose, which ItemPreset to update.
     */
    where: ItemPresetWhereUniqueInput
  }

  /**
   * ItemPreset updateMany
   */
  export type ItemPresetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ItemPresets.
     */
    data: XOR<ItemPresetUpdateManyMutationInput, ItemPresetUncheckedUpdateManyInput>
    /**
     * Filter which ItemPresets to update
     */
    where?: ItemPresetWhereInput
    /**
     * Limit how many ItemPresets to update.
     */
    limit?: number
  }

  /**
   * ItemPreset updateManyAndReturn
   */
  export type ItemPresetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPreset
     */
    select?: ItemPresetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ItemPreset
     */
    omit?: ItemPresetOmit<ExtArgs> | null
    /**
     * The data used to update ItemPresets.
     */
    data: XOR<ItemPresetUpdateManyMutationInput, ItemPresetUncheckedUpdateManyInput>
    /**
     * Filter which ItemPresets to update
     */
    where?: ItemPresetWhereInput
    /**
     * Limit how many ItemPresets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPresetIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ItemPreset upsert
   */
  export type ItemPresetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPreset
     */
    select?: ItemPresetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemPreset
     */
    omit?: ItemPresetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPresetInclude<ExtArgs> | null
    /**
     * The filter to search for the ItemPreset to update in case it exists.
     */
    where: ItemPresetWhereUniqueInput
    /**
     * In case the ItemPreset found by the `where` argument doesn't exist, create a new ItemPreset with this data.
     */
    create: XOR<ItemPresetCreateInput, ItemPresetUncheckedCreateInput>
    /**
     * In case the ItemPreset was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ItemPresetUpdateInput, ItemPresetUncheckedUpdateInput>
  }

  /**
   * ItemPreset delete
   */
  export type ItemPresetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPreset
     */
    select?: ItemPresetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemPreset
     */
    omit?: ItemPresetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPresetInclude<ExtArgs> | null
    /**
     * Filter which ItemPreset to delete.
     */
    where: ItemPresetWhereUniqueInput
  }

  /**
   * ItemPreset deleteMany
   */
  export type ItemPresetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItemPresets to delete
     */
    where?: ItemPresetWhereInput
    /**
     * Limit how many ItemPresets to delete.
     */
    limit?: number
  }

  /**
   * ItemPreset without action
   */
  export type ItemPresetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPreset
     */
    select?: ItemPresetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemPreset
     */
    omit?: ItemPresetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPresetInclude<ExtArgs> | null
  }


  /**
   * Model Location
   */

  export type AggregateLocation = {
    _count: LocationCountAggregateOutputType | null
    _avg: LocationAvgAggregateOutputType | null
    _sum: LocationSumAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  export type LocationAvgAggregateOutputType = {
    id: number | null
    sortOrder: number | null
    mapX: number | null
    mapY: number | null
  }

  export type LocationSumAggregateOutputType = {
    id: number | null
    sortOrder: number | null
    mapX: number | null
    mapY: number | null
  }

  export type LocationMinAggregateOutputType = {
    id: number | null
    code: string | null
    name: string | null
    type: $Enums.LocationType | null
    building: string | null
    enabled: boolean | null
    sortOrder: number | null
    mapX: number | null
    mapY: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LocationMaxAggregateOutputType = {
    id: number | null
    code: string | null
    name: string | null
    type: $Enums.LocationType | null
    building: string | null
    enabled: boolean | null
    sortOrder: number | null
    mapX: number | null
    mapY: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LocationCountAggregateOutputType = {
    id: number
    code: number
    name: number
    type: number
    building: number
    enabled: number
    sortOrder: number
    mapX: number
    mapY: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LocationAvgAggregateInputType = {
    id?: true
    sortOrder?: true
    mapX?: true
    mapY?: true
  }

  export type LocationSumAggregateInputType = {
    id?: true
    sortOrder?: true
    mapX?: true
    mapY?: true
  }

  export type LocationMinAggregateInputType = {
    id?: true
    code?: true
    name?: true
    type?: true
    building?: true
    enabled?: true
    sortOrder?: true
    mapX?: true
    mapY?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LocationMaxAggregateInputType = {
    id?: true
    code?: true
    name?: true
    type?: true
    building?: true
    enabled?: true
    sortOrder?: true
    mapX?: true
    mapY?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LocationCountAggregateInputType = {
    id?: true
    code?: true
    name?: true
    type?: true
    building?: true
    enabled?: true
    sortOrder?: true
    mapX?: true
    mapY?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Location to aggregate.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Locations
    **/
    _count?: true | LocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LocationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LocationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LocationMaxAggregateInputType
  }

  export type GetLocationAggregateType<T extends LocationAggregateArgs> = {
        [P in keyof T & keyof AggregateLocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLocation[P]>
      : GetScalarType<T[P], AggregateLocation[P]>
  }




  export type LocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LocationWhereInput
    orderBy?: LocationOrderByWithAggregationInput | LocationOrderByWithAggregationInput[]
    by: LocationScalarFieldEnum[] | LocationScalarFieldEnum
    having?: LocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LocationCountAggregateInputType | true
    _avg?: LocationAvgAggregateInputType
    _sum?: LocationSumAggregateInputType
    _min?: LocationMinAggregateInputType
    _max?: LocationMaxAggregateInputType
  }

  export type LocationGroupByOutputType = {
    id: number
    code: string
    name: string
    type: $Enums.LocationType
    building: string | null
    enabled: boolean
    sortOrder: number
    mapX: number | null
    mapY: number | null
    createdAt: Date
    updatedAt: Date
    _count: LocationCountAggregateOutputType | null
    _avg: LocationAvgAggregateOutputType | null
    _sum: LocationSumAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  type GetLocationGroupByPayload<T extends LocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LocationGroupByOutputType[P]>
            : GetScalarType<T[P], LocationGroupByOutputType[P]>
        }
      >
    >


  export type LocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    type?: boolean
    building?: boolean
    enabled?: boolean
    sortOrder?: boolean
    mapX?: boolean
    mapY?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["location"]>

  export type LocationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    type?: boolean
    building?: boolean
    enabled?: boolean
    sortOrder?: boolean
    mapX?: boolean
    mapY?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["location"]>

  export type LocationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    type?: boolean
    building?: boolean
    enabled?: boolean
    sortOrder?: boolean
    mapX?: boolean
    mapY?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["location"]>

  export type LocationSelectScalar = {
    id?: boolean
    code?: boolean
    name?: boolean
    type?: boolean
    building?: boolean
    enabled?: boolean
    sortOrder?: boolean
    mapX?: boolean
    mapY?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "name" | "type" | "building" | "enabled" | "sortOrder" | "mapX" | "mapY" | "createdAt" | "updatedAt", ExtArgs["result"]["location"]>

  export type $LocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Location"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      code: string
      name: string
      type: $Enums.LocationType
      building: string | null
      enabled: boolean
      sortOrder: number
      mapX: number | null
      mapY: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["location"]>
    composites: {}
  }

  type LocationGetPayload<S extends boolean | null | undefined | LocationDefaultArgs> = $Result.GetResult<Prisma.$LocationPayload, S>

  type LocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LocationCountAggregateInputType | true
    }

  export interface LocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Location'], meta: { name: 'Location' } }
    /**
     * Find zero or one Location that matches the filter.
     * @param {LocationFindUniqueArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LocationFindUniqueArgs>(args: SelectSubset<T, LocationFindUniqueArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Location that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LocationFindUniqueOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LocationFindUniqueOrThrowArgs>(args: SelectSubset<T, LocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Location that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindFirstArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LocationFindFirstArgs>(args?: SelectSubset<T, LocationFindFirstArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Location that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindFirstOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LocationFindFirstOrThrowArgs>(args?: SelectSubset<T, LocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Locations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Locations
     * const locations = await prisma.location.findMany()
     * 
     * // Get first 10 Locations
     * const locations = await prisma.location.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const locationWithIdOnly = await prisma.location.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LocationFindManyArgs>(args?: SelectSubset<T, LocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Location.
     * @param {LocationCreateArgs} args - Arguments to create a Location.
     * @example
     * // Create one Location
     * const Location = await prisma.location.create({
     *   data: {
     *     // ... data to create a Location
     *   }
     * })
     * 
     */
    create<T extends LocationCreateArgs>(args: SelectSubset<T, LocationCreateArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Locations.
     * @param {LocationCreateManyArgs} args - Arguments to create many Locations.
     * @example
     * // Create many Locations
     * const location = await prisma.location.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LocationCreateManyArgs>(args?: SelectSubset<T, LocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Locations and returns the data saved in the database.
     * @param {LocationCreateManyAndReturnArgs} args - Arguments to create many Locations.
     * @example
     * // Create many Locations
     * const location = await prisma.location.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Locations and only return the `id`
     * const locationWithIdOnly = await prisma.location.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LocationCreateManyAndReturnArgs>(args?: SelectSubset<T, LocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Location.
     * @param {LocationDeleteArgs} args - Arguments to delete one Location.
     * @example
     * // Delete one Location
     * const Location = await prisma.location.delete({
     *   where: {
     *     // ... filter to delete one Location
     *   }
     * })
     * 
     */
    delete<T extends LocationDeleteArgs>(args: SelectSubset<T, LocationDeleteArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Location.
     * @param {LocationUpdateArgs} args - Arguments to update one Location.
     * @example
     * // Update one Location
     * const location = await prisma.location.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LocationUpdateArgs>(args: SelectSubset<T, LocationUpdateArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Locations.
     * @param {LocationDeleteManyArgs} args - Arguments to filter Locations to delete.
     * @example
     * // Delete a few Locations
     * const { count } = await prisma.location.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LocationDeleteManyArgs>(args?: SelectSubset<T, LocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Locations
     * const location = await prisma.location.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LocationUpdateManyArgs>(args: SelectSubset<T, LocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locations and returns the data updated in the database.
     * @param {LocationUpdateManyAndReturnArgs} args - Arguments to update many Locations.
     * @example
     * // Update many Locations
     * const location = await prisma.location.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Locations and only return the `id`
     * const locationWithIdOnly = await prisma.location.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LocationUpdateManyAndReturnArgs>(args: SelectSubset<T, LocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Location.
     * @param {LocationUpsertArgs} args - Arguments to update or create a Location.
     * @example
     * // Update or create a Location
     * const location = await prisma.location.upsert({
     *   create: {
     *     // ... data to create a Location
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Location we want to update
     *   }
     * })
     */
    upsert<T extends LocationUpsertArgs>(args: SelectSubset<T, LocationUpsertArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationCountArgs} args - Arguments to filter Locations to count.
     * @example
     * // Count the number of Locations
     * const count = await prisma.location.count({
     *   where: {
     *     // ... the filter for the Locations we want to count
     *   }
     * })
    **/
    count<T extends LocationCountArgs>(
      args?: Subset<T, LocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LocationAggregateArgs>(args: Subset<T, LocationAggregateArgs>): Prisma.PrismaPromise<GetLocationAggregateType<T>>

    /**
     * Group by Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LocationGroupByArgs['orderBy'] }
        : { orderBy?: LocationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Location model
   */
  readonly fields: LocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Location.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Location model
   */
  interface LocationFieldRefs {
    readonly id: FieldRef<"Location", 'Int'>
    readonly code: FieldRef<"Location", 'String'>
    readonly name: FieldRef<"Location", 'String'>
    readonly type: FieldRef<"Location", 'LocationType'>
    readonly building: FieldRef<"Location", 'String'>
    readonly enabled: FieldRef<"Location", 'Boolean'>
    readonly sortOrder: FieldRef<"Location", 'Int'>
    readonly mapX: FieldRef<"Location", 'Float'>
    readonly mapY: FieldRef<"Location", 'Float'>
    readonly createdAt: FieldRef<"Location", 'DateTime'>
    readonly updatedAt: FieldRef<"Location", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Location findUnique
   */
  export type LocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location findUniqueOrThrow
   */
  export type LocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location findFirst
   */
  export type LocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location findFirstOrThrow
   */
  export type LocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location findMany
   */
  export type LocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Filter, which Locations to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location create
   */
  export type LocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * The data needed to create a Location.
     */
    data: XOR<LocationCreateInput, LocationUncheckedCreateInput>
  }

  /**
   * Location createMany
   */
  export type LocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Locations.
     */
    data: LocationCreateManyInput | LocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Location createManyAndReturn
   */
  export type LocationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * The data used to create many Locations.
     */
    data: LocationCreateManyInput | LocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Location update
   */
  export type LocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * The data needed to update a Location.
     */
    data: XOR<LocationUpdateInput, LocationUncheckedUpdateInput>
    /**
     * Choose, which Location to update.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location updateMany
   */
  export type LocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Locations.
     */
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyInput>
    /**
     * Filter which Locations to update
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to update.
     */
    limit?: number
  }

  /**
   * Location updateManyAndReturn
   */
  export type LocationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * The data used to update Locations.
     */
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyInput>
    /**
     * Filter which Locations to update
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to update.
     */
    limit?: number
  }

  /**
   * Location upsert
   */
  export type LocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * The filter to search for the Location to update in case it exists.
     */
    where: LocationWhereUniqueInput
    /**
     * In case the Location found by the `where` argument doesn't exist, create a new Location with this data.
     */
    create: XOR<LocationCreateInput, LocationUncheckedCreateInput>
    /**
     * In case the Location was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LocationUpdateInput, LocationUncheckedUpdateInput>
  }

  /**
   * Location delete
   */
  export type LocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Filter which Location to delete.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location deleteMany
   */
  export type LocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Locations to delete
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to delete.
     */
    limit?: number
  }

  /**
   * Location without action
   */
  export type LocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
  }


  /**
   * Model CampusMap
   */

  export type AggregateCampusMap = {
    _count: CampusMapCountAggregateOutputType | null
    _avg: CampusMapAvgAggregateOutputType | null
    _sum: CampusMapSumAggregateOutputType | null
    _min: CampusMapMinAggregateOutputType | null
    _max: CampusMapMaxAggregateOutputType | null
  }

  export type CampusMapAvgAggregateOutputType = {
    id: number | null
    uploadedById: number | null
  }

  export type CampusMapSumAggregateOutputType = {
    id: number | null
    uploadedById: number | null
  }

  export type CampusMapMinAggregateOutputType = {
    id: number | null
    imageData: string | null
    imageName: string | null
    imageSize: string | null
    uploadedById: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CampusMapMaxAggregateOutputType = {
    id: number | null
    imageData: string | null
    imageName: string | null
    imageSize: string | null
    uploadedById: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CampusMapCountAggregateOutputType = {
    id: number
    imageData: number
    imageName: number
    imageSize: number
    uploadedById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CampusMapAvgAggregateInputType = {
    id?: true
    uploadedById?: true
  }

  export type CampusMapSumAggregateInputType = {
    id?: true
    uploadedById?: true
  }

  export type CampusMapMinAggregateInputType = {
    id?: true
    imageData?: true
    imageName?: true
    imageSize?: true
    uploadedById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CampusMapMaxAggregateInputType = {
    id?: true
    imageData?: true
    imageName?: true
    imageSize?: true
    uploadedById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CampusMapCountAggregateInputType = {
    id?: true
    imageData?: true
    imageName?: true
    imageSize?: true
    uploadedById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CampusMapAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CampusMap to aggregate.
     */
    where?: CampusMapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampusMaps to fetch.
     */
    orderBy?: CampusMapOrderByWithRelationInput | CampusMapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CampusMapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampusMaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampusMaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CampusMaps
    **/
    _count?: true | CampusMapCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CampusMapAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CampusMapSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CampusMapMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CampusMapMaxAggregateInputType
  }

  export type GetCampusMapAggregateType<T extends CampusMapAggregateArgs> = {
        [P in keyof T & keyof AggregateCampusMap]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCampusMap[P]>
      : GetScalarType<T[P], AggregateCampusMap[P]>
  }




  export type CampusMapGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampusMapWhereInput
    orderBy?: CampusMapOrderByWithAggregationInput | CampusMapOrderByWithAggregationInput[]
    by: CampusMapScalarFieldEnum[] | CampusMapScalarFieldEnum
    having?: CampusMapScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CampusMapCountAggregateInputType | true
    _avg?: CampusMapAvgAggregateInputType
    _sum?: CampusMapSumAggregateInputType
    _min?: CampusMapMinAggregateInputType
    _max?: CampusMapMaxAggregateInputType
  }

  export type CampusMapGroupByOutputType = {
    id: number
    imageData: string
    imageName: string | null
    imageSize: string | null
    uploadedById: number | null
    createdAt: Date
    updatedAt: Date
    _count: CampusMapCountAggregateOutputType | null
    _avg: CampusMapAvgAggregateOutputType | null
    _sum: CampusMapSumAggregateOutputType | null
    _min: CampusMapMinAggregateOutputType | null
    _max: CampusMapMaxAggregateOutputType | null
  }

  type GetCampusMapGroupByPayload<T extends CampusMapGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CampusMapGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CampusMapGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CampusMapGroupByOutputType[P]>
            : GetScalarType<T[P], CampusMapGroupByOutputType[P]>
        }
      >
    >


  export type CampusMapSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    imageData?: boolean
    imageName?: boolean
    imageSize?: boolean
    uploadedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["campusMap"]>

  export type CampusMapSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    imageData?: boolean
    imageName?: boolean
    imageSize?: boolean
    uploadedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["campusMap"]>

  export type CampusMapSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    imageData?: boolean
    imageName?: boolean
    imageSize?: boolean
    uploadedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["campusMap"]>

  export type CampusMapSelectScalar = {
    id?: boolean
    imageData?: boolean
    imageName?: boolean
    imageSize?: boolean
    uploadedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CampusMapOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "imageData" | "imageName" | "imageSize" | "uploadedById" | "createdAt" | "updatedAt", ExtArgs["result"]["campusMap"]>

  export type $CampusMapPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CampusMap"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      imageData: string
      imageName: string | null
      imageSize: string | null
      uploadedById: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["campusMap"]>
    composites: {}
  }

  type CampusMapGetPayload<S extends boolean | null | undefined | CampusMapDefaultArgs> = $Result.GetResult<Prisma.$CampusMapPayload, S>

  type CampusMapCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CampusMapFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CampusMapCountAggregateInputType | true
    }

  export interface CampusMapDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CampusMap'], meta: { name: 'CampusMap' } }
    /**
     * Find zero or one CampusMap that matches the filter.
     * @param {CampusMapFindUniqueArgs} args - Arguments to find a CampusMap
     * @example
     * // Get one CampusMap
     * const campusMap = await prisma.campusMap.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CampusMapFindUniqueArgs>(args: SelectSubset<T, CampusMapFindUniqueArgs<ExtArgs>>): Prisma__CampusMapClient<$Result.GetResult<Prisma.$CampusMapPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CampusMap that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CampusMapFindUniqueOrThrowArgs} args - Arguments to find a CampusMap
     * @example
     * // Get one CampusMap
     * const campusMap = await prisma.campusMap.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CampusMapFindUniqueOrThrowArgs>(args: SelectSubset<T, CampusMapFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CampusMapClient<$Result.GetResult<Prisma.$CampusMapPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CampusMap that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampusMapFindFirstArgs} args - Arguments to find a CampusMap
     * @example
     * // Get one CampusMap
     * const campusMap = await prisma.campusMap.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CampusMapFindFirstArgs>(args?: SelectSubset<T, CampusMapFindFirstArgs<ExtArgs>>): Prisma__CampusMapClient<$Result.GetResult<Prisma.$CampusMapPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CampusMap that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampusMapFindFirstOrThrowArgs} args - Arguments to find a CampusMap
     * @example
     * // Get one CampusMap
     * const campusMap = await prisma.campusMap.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CampusMapFindFirstOrThrowArgs>(args?: SelectSubset<T, CampusMapFindFirstOrThrowArgs<ExtArgs>>): Prisma__CampusMapClient<$Result.GetResult<Prisma.$CampusMapPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CampusMaps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampusMapFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CampusMaps
     * const campusMaps = await prisma.campusMap.findMany()
     * 
     * // Get first 10 CampusMaps
     * const campusMaps = await prisma.campusMap.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const campusMapWithIdOnly = await prisma.campusMap.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CampusMapFindManyArgs>(args?: SelectSubset<T, CampusMapFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampusMapPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CampusMap.
     * @param {CampusMapCreateArgs} args - Arguments to create a CampusMap.
     * @example
     * // Create one CampusMap
     * const CampusMap = await prisma.campusMap.create({
     *   data: {
     *     // ... data to create a CampusMap
     *   }
     * })
     * 
     */
    create<T extends CampusMapCreateArgs>(args: SelectSubset<T, CampusMapCreateArgs<ExtArgs>>): Prisma__CampusMapClient<$Result.GetResult<Prisma.$CampusMapPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CampusMaps.
     * @param {CampusMapCreateManyArgs} args - Arguments to create many CampusMaps.
     * @example
     * // Create many CampusMaps
     * const campusMap = await prisma.campusMap.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CampusMapCreateManyArgs>(args?: SelectSubset<T, CampusMapCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CampusMaps and returns the data saved in the database.
     * @param {CampusMapCreateManyAndReturnArgs} args - Arguments to create many CampusMaps.
     * @example
     * // Create many CampusMaps
     * const campusMap = await prisma.campusMap.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CampusMaps and only return the `id`
     * const campusMapWithIdOnly = await prisma.campusMap.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CampusMapCreateManyAndReturnArgs>(args?: SelectSubset<T, CampusMapCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampusMapPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CampusMap.
     * @param {CampusMapDeleteArgs} args - Arguments to delete one CampusMap.
     * @example
     * // Delete one CampusMap
     * const CampusMap = await prisma.campusMap.delete({
     *   where: {
     *     // ... filter to delete one CampusMap
     *   }
     * })
     * 
     */
    delete<T extends CampusMapDeleteArgs>(args: SelectSubset<T, CampusMapDeleteArgs<ExtArgs>>): Prisma__CampusMapClient<$Result.GetResult<Prisma.$CampusMapPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CampusMap.
     * @param {CampusMapUpdateArgs} args - Arguments to update one CampusMap.
     * @example
     * // Update one CampusMap
     * const campusMap = await prisma.campusMap.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CampusMapUpdateArgs>(args: SelectSubset<T, CampusMapUpdateArgs<ExtArgs>>): Prisma__CampusMapClient<$Result.GetResult<Prisma.$CampusMapPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CampusMaps.
     * @param {CampusMapDeleteManyArgs} args - Arguments to filter CampusMaps to delete.
     * @example
     * // Delete a few CampusMaps
     * const { count } = await prisma.campusMap.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CampusMapDeleteManyArgs>(args?: SelectSubset<T, CampusMapDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CampusMaps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampusMapUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CampusMaps
     * const campusMap = await prisma.campusMap.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CampusMapUpdateManyArgs>(args: SelectSubset<T, CampusMapUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CampusMaps and returns the data updated in the database.
     * @param {CampusMapUpdateManyAndReturnArgs} args - Arguments to update many CampusMaps.
     * @example
     * // Update many CampusMaps
     * const campusMap = await prisma.campusMap.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CampusMaps and only return the `id`
     * const campusMapWithIdOnly = await prisma.campusMap.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CampusMapUpdateManyAndReturnArgs>(args: SelectSubset<T, CampusMapUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampusMapPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CampusMap.
     * @param {CampusMapUpsertArgs} args - Arguments to update or create a CampusMap.
     * @example
     * // Update or create a CampusMap
     * const campusMap = await prisma.campusMap.upsert({
     *   create: {
     *     // ... data to create a CampusMap
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CampusMap we want to update
     *   }
     * })
     */
    upsert<T extends CampusMapUpsertArgs>(args: SelectSubset<T, CampusMapUpsertArgs<ExtArgs>>): Prisma__CampusMapClient<$Result.GetResult<Prisma.$CampusMapPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CampusMaps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampusMapCountArgs} args - Arguments to filter CampusMaps to count.
     * @example
     * // Count the number of CampusMaps
     * const count = await prisma.campusMap.count({
     *   where: {
     *     // ... the filter for the CampusMaps we want to count
     *   }
     * })
    **/
    count<T extends CampusMapCountArgs>(
      args?: Subset<T, CampusMapCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CampusMapCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CampusMap.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampusMapAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CampusMapAggregateArgs>(args: Subset<T, CampusMapAggregateArgs>): Prisma.PrismaPromise<GetCampusMapAggregateType<T>>

    /**
     * Group by CampusMap.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampusMapGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CampusMapGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CampusMapGroupByArgs['orderBy'] }
        : { orderBy?: CampusMapGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CampusMapGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCampusMapGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CampusMap model
   */
  readonly fields: CampusMapFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CampusMap.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CampusMapClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CampusMap model
   */
  interface CampusMapFieldRefs {
    readonly id: FieldRef<"CampusMap", 'Int'>
    readonly imageData: FieldRef<"CampusMap", 'String'>
    readonly imageName: FieldRef<"CampusMap", 'String'>
    readonly imageSize: FieldRef<"CampusMap", 'String'>
    readonly uploadedById: FieldRef<"CampusMap", 'Int'>
    readonly createdAt: FieldRef<"CampusMap", 'DateTime'>
    readonly updatedAt: FieldRef<"CampusMap", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CampusMap findUnique
   */
  export type CampusMapFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampusMap
     */
    select?: CampusMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampusMap
     */
    omit?: CampusMapOmit<ExtArgs> | null
    /**
     * Filter, which CampusMap to fetch.
     */
    where: CampusMapWhereUniqueInput
  }

  /**
   * CampusMap findUniqueOrThrow
   */
  export type CampusMapFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampusMap
     */
    select?: CampusMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampusMap
     */
    omit?: CampusMapOmit<ExtArgs> | null
    /**
     * Filter, which CampusMap to fetch.
     */
    where: CampusMapWhereUniqueInput
  }

  /**
   * CampusMap findFirst
   */
  export type CampusMapFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampusMap
     */
    select?: CampusMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampusMap
     */
    omit?: CampusMapOmit<ExtArgs> | null
    /**
     * Filter, which CampusMap to fetch.
     */
    where?: CampusMapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampusMaps to fetch.
     */
    orderBy?: CampusMapOrderByWithRelationInput | CampusMapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CampusMaps.
     */
    cursor?: CampusMapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampusMaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampusMaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CampusMaps.
     */
    distinct?: CampusMapScalarFieldEnum | CampusMapScalarFieldEnum[]
  }

  /**
   * CampusMap findFirstOrThrow
   */
  export type CampusMapFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampusMap
     */
    select?: CampusMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampusMap
     */
    omit?: CampusMapOmit<ExtArgs> | null
    /**
     * Filter, which CampusMap to fetch.
     */
    where?: CampusMapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampusMaps to fetch.
     */
    orderBy?: CampusMapOrderByWithRelationInput | CampusMapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CampusMaps.
     */
    cursor?: CampusMapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampusMaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampusMaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CampusMaps.
     */
    distinct?: CampusMapScalarFieldEnum | CampusMapScalarFieldEnum[]
  }

  /**
   * CampusMap findMany
   */
  export type CampusMapFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampusMap
     */
    select?: CampusMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampusMap
     */
    omit?: CampusMapOmit<ExtArgs> | null
    /**
     * Filter, which CampusMaps to fetch.
     */
    where?: CampusMapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CampusMaps to fetch.
     */
    orderBy?: CampusMapOrderByWithRelationInput | CampusMapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CampusMaps.
     */
    cursor?: CampusMapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CampusMaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CampusMaps.
     */
    skip?: number
    distinct?: CampusMapScalarFieldEnum | CampusMapScalarFieldEnum[]
  }

  /**
   * CampusMap create
   */
  export type CampusMapCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampusMap
     */
    select?: CampusMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampusMap
     */
    omit?: CampusMapOmit<ExtArgs> | null
    /**
     * The data needed to create a CampusMap.
     */
    data: XOR<CampusMapCreateInput, CampusMapUncheckedCreateInput>
  }

  /**
   * CampusMap createMany
   */
  export type CampusMapCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CampusMaps.
     */
    data: CampusMapCreateManyInput | CampusMapCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CampusMap createManyAndReturn
   */
  export type CampusMapCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampusMap
     */
    select?: CampusMapSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CampusMap
     */
    omit?: CampusMapOmit<ExtArgs> | null
    /**
     * The data used to create many CampusMaps.
     */
    data: CampusMapCreateManyInput | CampusMapCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CampusMap update
   */
  export type CampusMapUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampusMap
     */
    select?: CampusMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampusMap
     */
    omit?: CampusMapOmit<ExtArgs> | null
    /**
     * The data needed to update a CampusMap.
     */
    data: XOR<CampusMapUpdateInput, CampusMapUncheckedUpdateInput>
    /**
     * Choose, which CampusMap to update.
     */
    where: CampusMapWhereUniqueInput
  }

  /**
   * CampusMap updateMany
   */
  export type CampusMapUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CampusMaps.
     */
    data: XOR<CampusMapUpdateManyMutationInput, CampusMapUncheckedUpdateManyInput>
    /**
     * Filter which CampusMaps to update
     */
    where?: CampusMapWhereInput
    /**
     * Limit how many CampusMaps to update.
     */
    limit?: number
  }

  /**
   * CampusMap updateManyAndReturn
   */
  export type CampusMapUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampusMap
     */
    select?: CampusMapSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CampusMap
     */
    omit?: CampusMapOmit<ExtArgs> | null
    /**
     * The data used to update CampusMaps.
     */
    data: XOR<CampusMapUpdateManyMutationInput, CampusMapUncheckedUpdateManyInput>
    /**
     * Filter which CampusMaps to update
     */
    where?: CampusMapWhereInput
    /**
     * Limit how many CampusMaps to update.
     */
    limit?: number
  }

  /**
   * CampusMap upsert
   */
  export type CampusMapUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampusMap
     */
    select?: CampusMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampusMap
     */
    omit?: CampusMapOmit<ExtArgs> | null
    /**
     * The filter to search for the CampusMap to update in case it exists.
     */
    where: CampusMapWhereUniqueInput
    /**
     * In case the CampusMap found by the `where` argument doesn't exist, create a new CampusMap with this data.
     */
    create: XOR<CampusMapCreateInput, CampusMapUncheckedCreateInput>
    /**
     * In case the CampusMap was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CampusMapUpdateInput, CampusMapUncheckedUpdateInput>
  }

  /**
   * CampusMap delete
   */
  export type CampusMapDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampusMap
     */
    select?: CampusMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampusMap
     */
    omit?: CampusMapOmit<ExtArgs> | null
    /**
     * Filter which CampusMap to delete.
     */
    where: CampusMapWhereUniqueInput
  }

  /**
   * CampusMap deleteMany
   */
  export type CampusMapDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CampusMaps to delete
     */
    where?: CampusMapWhereInput
    /**
     * Limit how many CampusMaps to delete.
     */
    limit?: number
  }

  /**
   * CampusMap without action
   */
  export type CampusMapDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CampusMap
     */
    select?: CampusMapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CampusMap
     */
    omit?: CampusMapOmit<ExtArgs> | null
  }


  /**
   * Model BinStatus
   */

  export type AggregateBinStatus = {
    _count: BinStatusCountAggregateOutputType | null
    _avg: BinStatusAvgAggregateOutputType | null
    _sum: BinStatusSumAggregateOutputType | null
    _min: BinStatusMinAggregateOutputType | null
    _max: BinStatusMaxAggregateOutputType | null
  }

  export type BinStatusAvgAggregateOutputType = {
    id: number | null
    locationId: number | null
    updatedBy: number | null
  }

  export type BinStatusSumAggregateOutputType = {
    id: number | null
    locationId: number | null
    updatedBy: number | null
  }

  export type BinStatusMinAggregateOutputType = {
    id: number | null
    locationId: number | null
    fillStatus: string | null
    lastUpdated: Date | null
    updatedBy: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BinStatusMaxAggregateOutputType = {
    id: number | null
    locationId: number | null
    fillStatus: string | null
    lastUpdated: Date | null
    updatedBy: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BinStatusCountAggregateOutputType = {
    id: number
    locationId: number
    fillStatus: number
    lastUpdated: number
    updatedBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BinStatusAvgAggregateInputType = {
    id?: true
    locationId?: true
    updatedBy?: true
  }

  export type BinStatusSumAggregateInputType = {
    id?: true
    locationId?: true
    updatedBy?: true
  }

  export type BinStatusMinAggregateInputType = {
    id?: true
    locationId?: true
    fillStatus?: true
    lastUpdated?: true
    updatedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BinStatusMaxAggregateInputType = {
    id?: true
    locationId?: true
    fillStatus?: true
    lastUpdated?: true
    updatedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BinStatusCountAggregateInputType = {
    id?: true
    locationId?: true
    fillStatus?: true
    lastUpdated?: true
    updatedBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BinStatusAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BinStatus to aggregate.
     */
    where?: BinStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BinStatuses to fetch.
     */
    orderBy?: BinStatusOrderByWithRelationInput | BinStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BinStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BinStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BinStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BinStatuses
    **/
    _count?: true | BinStatusCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BinStatusAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BinStatusSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BinStatusMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BinStatusMaxAggregateInputType
  }

  export type GetBinStatusAggregateType<T extends BinStatusAggregateArgs> = {
        [P in keyof T & keyof AggregateBinStatus]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBinStatus[P]>
      : GetScalarType<T[P], AggregateBinStatus[P]>
  }




  export type BinStatusGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BinStatusWhereInput
    orderBy?: BinStatusOrderByWithAggregationInput | BinStatusOrderByWithAggregationInput[]
    by: BinStatusScalarFieldEnum[] | BinStatusScalarFieldEnum
    having?: BinStatusScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BinStatusCountAggregateInputType | true
    _avg?: BinStatusAvgAggregateInputType
    _sum?: BinStatusSumAggregateInputType
    _min?: BinStatusMinAggregateInputType
    _max?: BinStatusMaxAggregateInputType
  }

  export type BinStatusGroupByOutputType = {
    id: number
    locationId: number
    fillStatus: string
    lastUpdated: Date
    updatedBy: number | null
    createdAt: Date
    updatedAt: Date
    _count: BinStatusCountAggregateOutputType | null
    _avg: BinStatusAvgAggregateOutputType | null
    _sum: BinStatusSumAggregateOutputType | null
    _min: BinStatusMinAggregateOutputType | null
    _max: BinStatusMaxAggregateOutputType | null
  }

  type GetBinStatusGroupByPayload<T extends BinStatusGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BinStatusGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BinStatusGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BinStatusGroupByOutputType[P]>
            : GetScalarType<T[P], BinStatusGroupByOutputType[P]>
        }
      >
    >


  export type BinStatusSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    locationId?: boolean
    fillStatus?: boolean
    lastUpdated?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["binStatus"]>

  export type BinStatusSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    locationId?: boolean
    fillStatus?: boolean
    lastUpdated?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["binStatus"]>

  export type BinStatusSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    locationId?: boolean
    fillStatus?: boolean
    lastUpdated?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["binStatus"]>

  export type BinStatusSelectScalar = {
    id?: boolean
    locationId?: boolean
    fillStatus?: boolean
    lastUpdated?: boolean
    updatedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BinStatusOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "locationId" | "fillStatus" | "lastUpdated" | "updatedBy" | "createdAt" | "updatedAt", ExtArgs["result"]["binStatus"]>

  export type $BinStatusPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BinStatus"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      locationId: number
      fillStatus: string
      lastUpdated: Date
      updatedBy: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["binStatus"]>
    composites: {}
  }

  type BinStatusGetPayload<S extends boolean | null | undefined | BinStatusDefaultArgs> = $Result.GetResult<Prisma.$BinStatusPayload, S>

  type BinStatusCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BinStatusFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BinStatusCountAggregateInputType | true
    }

  export interface BinStatusDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BinStatus'], meta: { name: 'BinStatus' } }
    /**
     * Find zero or one BinStatus that matches the filter.
     * @param {BinStatusFindUniqueArgs} args - Arguments to find a BinStatus
     * @example
     * // Get one BinStatus
     * const binStatus = await prisma.binStatus.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BinStatusFindUniqueArgs>(args: SelectSubset<T, BinStatusFindUniqueArgs<ExtArgs>>): Prisma__BinStatusClient<$Result.GetResult<Prisma.$BinStatusPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BinStatus that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BinStatusFindUniqueOrThrowArgs} args - Arguments to find a BinStatus
     * @example
     * // Get one BinStatus
     * const binStatus = await prisma.binStatus.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BinStatusFindUniqueOrThrowArgs>(args: SelectSubset<T, BinStatusFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BinStatusClient<$Result.GetResult<Prisma.$BinStatusPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BinStatus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BinStatusFindFirstArgs} args - Arguments to find a BinStatus
     * @example
     * // Get one BinStatus
     * const binStatus = await prisma.binStatus.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BinStatusFindFirstArgs>(args?: SelectSubset<T, BinStatusFindFirstArgs<ExtArgs>>): Prisma__BinStatusClient<$Result.GetResult<Prisma.$BinStatusPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BinStatus that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BinStatusFindFirstOrThrowArgs} args - Arguments to find a BinStatus
     * @example
     * // Get one BinStatus
     * const binStatus = await prisma.binStatus.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BinStatusFindFirstOrThrowArgs>(args?: SelectSubset<T, BinStatusFindFirstOrThrowArgs<ExtArgs>>): Prisma__BinStatusClient<$Result.GetResult<Prisma.$BinStatusPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BinStatuses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BinStatusFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BinStatuses
     * const binStatuses = await prisma.binStatus.findMany()
     * 
     * // Get first 10 BinStatuses
     * const binStatuses = await prisma.binStatus.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const binStatusWithIdOnly = await prisma.binStatus.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BinStatusFindManyArgs>(args?: SelectSubset<T, BinStatusFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BinStatusPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BinStatus.
     * @param {BinStatusCreateArgs} args - Arguments to create a BinStatus.
     * @example
     * // Create one BinStatus
     * const BinStatus = await prisma.binStatus.create({
     *   data: {
     *     // ... data to create a BinStatus
     *   }
     * })
     * 
     */
    create<T extends BinStatusCreateArgs>(args: SelectSubset<T, BinStatusCreateArgs<ExtArgs>>): Prisma__BinStatusClient<$Result.GetResult<Prisma.$BinStatusPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BinStatuses.
     * @param {BinStatusCreateManyArgs} args - Arguments to create many BinStatuses.
     * @example
     * // Create many BinStatuses
     * const binStatus = await prisma.binStatus.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BinStatusCreateManyArgs>(args?: SelectSubset<T, BinStatusCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BinStatuses and returns the data saved in the database.
     * @param {BinStatusCreateManyAndReturnArgs} args - Arguments to create many BinStatuses.
     * @example
     * // Create many BinStatuses
     * const binStatus = await prisma.binStatus.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BinStatuses and only return the `id`
     * const binStatusWithIdOnly = await prisma.binStatus.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BinStatusCreateManyAndReturnArgs>(args?: SelectSubset<T, BinStatusCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BinStatusPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BinStatus.
     * @param {BinStatusDeleteArgs} args - Arguments to delete one BinStatus.
     * @example
     * // Delete one BinStatus
     * const BinStatus = await prisma.binStatus.delete({
     *   where: {
     *     // ... filter to delete one BinStatus
     *   }
     * })
     * 
     */
    delete<T extends BinStatusDeleteArgs>(args: SelectSubset<T, BinStatusDeleteArgs<ExtArgs>>): Prisma__BinStatusClient<$Result.GetResult<Prisma.$BinStatusPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BinStatus.
     * @param {BinStatusUpdateArgs} args - Arguments to update one BinStatus.
     * @example
     * // Update one BinStatus
     * const binStatus = await prisma.binStatus.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BinStatusUpdateArgs>(args: SelectSubset<T, BinStatusUpdateArgs<ExtArgs>>): Prisma__BinStatusClient<$Result.GetResult<Prisma.$BinStatusPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BinStatuses.
     * @param {BinStatusDeleteManyArgs} args - Arguments to filter BinStatuses to delete.
     * @example
     * // Delete a few BinStatuses
     * const { count } = await prisma.binStatus.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BinStatusDeleteManyArgs>(args?: SelectSubset<T, BinStatusDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BinStatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BinStatusUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BinStatuses
     * const binStatus = await prisma.binStatus.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BinStatusUpdateManyArgs>(args: SelectSubset<T, BinStatusUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BinStatuses and returns the data updated in the database.
     * @param {BinStatusUpdateManyAndReturnArgs} args - Arguments to update many BinStatuses.
     * @example
     * // Update many BinStatuses
     * const binStatus = await prisma.binStatus.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BinStatuses and only return the `id`
     * const binStatusWithIdOnly = await prisma.binStatus.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BinStatusUpdateManyAndReturnArgs>(args: SelectSubset<T, BinStatusUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BinStatusPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BinStatus.
     * @param {BinStatusUpsertArgs} args - Arguments to update or create a BinStatus.
     * @example
     * // Update or create a BinStatus
     * const binStatus = await prisma.binStatus.upsert({
     *   create: {
     *     // ... data to create a BinStatus
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BinStatus we want to update
     *   }
     * })
     */
    upsert<T extends BinStatusUpsertArgs>(args: SelectSubset<T, BinStatusUpsertArgs<ExtArgs>>): Prisma__BinStatusClient<$Result.GetResult<Prisma.$BinStatusPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BinStatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BinStatusCountArgs} args - Arguments to filter BinStatuses to count.
     * @example
     * // Count the number of BinStatuses
     * const count = await prisma.binStatus.count({
     *   where: {
     *     // ... the filter for the BinStatuses we want to count
     *   }
     * })
    **/
    count<T extends BinStatusCountArgs>(
      args?: Subset<T, BinStatusCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BinStatusCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BinStatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BinStatusAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BinStatusAggregateArgs>(args: Subset<T, BinStatusAggregateArgs>): Prisma.PrismaPromise<GetBinStatusAggregateType<T>>

    /**
     * Group by BinStatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BinStatusGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BinStatusGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BinStatusGroupByArgs['orderBy'] }
        : { orderBy?: BinStatusGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BinStatusGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBinStatusGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BinStatus model
   */
  readonly fields: BinStatusFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BinStatus.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BinStatusClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BinStatus model
   */
  interface BinStatusFieldRefs {
    readonly id: FieldRef<"BinStatus", 'Int'>
    readonly locationId: FieldRef<"BinStatus", 'Int'>
    readonly fillStatus: FieldRef<"BinStatus", 'String'>
    readonly lastUpdated: FieldRef<"BinStatus", 'DateTime'>
    readonly updatedBy: FieldRef<"BinStatus", 'Int'>
    readonly createdAt: FieldRef<"BinStatus", 'DateTime'>
    readonly updatedAt: FieldRef<"BinStatus", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BinStatus findUnique
   */
  export type BinStatusFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BinStatus
     */
    select?: BinStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BinStatus
     */
    omit?: BinStatusOmit<ExtArgs> | null
    /**
     * Filter, which BinStatus to fetch.
     */
    where: BinStatusWhereUniqueInput
  }

  /**
   * BinStatus findUniqueOrThrow
   */
  export type BinStatusFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BinStatus
     */
    select?: BinStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BinStatus
     */
    omit?: BinStatusOmit<ExtArgs> | null
    /**
     * Filter, which BinStatus to fetch.
     */
    where: BinStatusWhereUniqueInput
  }

  /**
   * BinStatus findFirst
   */
  export type BinStatusFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BinStatus
     */
    select?: BinStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BinStatus
     */
    omit?: BinStatusOmit<ExtArgs> | null
    /**
     * Filter, which BinStatus to fetch.
     */
    where?: BinStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BinStatuses to fetch.
     */
    orderBy?: BinStatusOrderByWithRelationInput | BinStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BinStatuses.
     */
    cursor?: BinStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BinStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BinStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BinStatuses.
     */
    distinct?: BinStatusScalarFieldEnum | BinStatusScalarFieldEnum[]
  }

  /**
   * BinStatus findFirstOrThrow
   */
  export type BinStatusFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BinStatus
     */
    select?: BinStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BinStatus
     */
    omit?: BinStatusOmit<ExtArgs> | null
    /**
     * Filter, which BinStatus to fetch.
     */
    where?: BinStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BinStatuses to fetch.
     */
    orderBy?: BinStatusOrderByWithRelationInput | BinStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BinStatuses.
     */
    cursor?: BinStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BinStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BinStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BinStatuses.
     */
    distinct?: BinStatusScalarFieldEnum | BinStatusScalarFieldEnum[]
  }

  /**
   * BinStatus findMany
   */
  export type BinStatusFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BinStatus
     */
    select?: BinStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BinStatus
     */
    omit?: BinStatusOmit<ExtArgs> | null
    /**
     * Filter, which BinStatuses to fetch.
     */
    where?: BinStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BinStatuses to fetch.
     */
    orderBy?: BinStatusOrderByWithRelationInput | BinStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BinStatuses.
     */
    cursor?: BinStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BinStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BinStatuses.
     */
    skip?: number
    distinct?: BinStatusScalarFieldEnum | BinStatusScalarFieldEnum[]
  }

  /**
   * BinStatus create
   */
  export type BinStatusCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BinStatus
     */
    select?: BinStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BinStatus
     */
    omit?: BinStatusOmit<ExtArgs> | null
    /**
     * The data needed to create a BinStatus.
     */
    data: XOR<BinStatusCreateInput, BinStatusUncheckedCreateInput>
  }

  /**
   * BinStatus createMany
   */
  export type BinStatusCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BinStatuses.
     */
    data: BinStatusCreateManyInput | BinStatusCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BinStatus createManyAndReturn
   */
  export type BinStatusCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BinStatus
     */
    select?: BinStatusSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BinStatus
     */
    omit?: BinStatusOmit<ExtArgs> | null
    /**
     * The data used to create many BinStatuses.
     */
    data: BinStatusCreateManyInput | BinStatusCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BinStatus update
   */
  export type BinStatusUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BinStatus
     */
    select?: BinStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BinStatus
     */
    omit?: BinStatusOmit<ExtArgs> | null
    /**
     * The data needed to update a BinStatus.
     */
    data: XOR<BinStatusUpdateInput, BinStatusUncheckedUpdateInput>
    /**
     * Choose, which BinStatus to update.
     */
    where: BinStatusWhereUniqueInput
  }

  /**
   * BinStatus updateMany
   */
  export type BinStatusUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BinStatuses.
     */
    data: XOR<BinStatusUpdateManyMutationInput, BinStatusUncheckedUpdateManyInput>
    /**
     * Filter which BinStatuses to update
     */
    where?: BinStatusWhereInput
    /**
     * Limit how many BinStatuses to update.
     */
    limit?: number
  }

  /**
   * BinStatus updateManyAndReturn
   */
  export type BinStatusUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BinStatus
     */
    select?: BinStatusSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BinStatus
     */
    omit?: BinStatusOmit<ExtArgs> | null
    /**
     * The data used to update BinStatuses.
     */
    data: XOR<BinStatusUpdateManyMutationInput, BinStatusUncheckedUpdateManyInput>
    /**
     * Filter which BinStatuses to update
     */
    where?: BinStatusWhereInput
    /**
     * Limit how many BinStatuses to update.
     */
    limit?: number
  }

  /**
   * BinStatus upsert
   */
  export type BinStatusUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BinStatus
     */
    select?: BinStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BinStatus
     */
    omit?: BinStatusOmit<ExtArgs> | null
    /**
     * The filter to search for the BinStatus to update in case it exists.
     */
    where: BinStatusWhereUniqueInput
    /**
     * In case the BinStatus found by the `where` argument doesn't exist, create a new BinStatus with this data.
     */
    create: XOR<BinStatusCreateInput, BinStatusUncheckedCreateInput>
    /**
     * In case the BinStatus was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BinStatusUpdateInput, BinStatusUncheckedUpdateInput>
  }

  /**
   * BinStatus delete
   */
  export type BinStatusDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BinStatus
     */
    select?: BinStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BinStatus
     */
    omit?: BinStatusOmit<ExtArgs> | null
    /**
     * Filter which BinStatus to delete.
     */
    where: BinStatusWhereUniqueInput
  }

  /**
   * BinStatus deleteMany
   */
  export type BinStatusDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BinStatuses to delete
     */
    where?: BinStatusWhereInput
    /**
     * Limit how many BinStatuses to delete.
     */
    limit?: number
  }

  /**
   * BinStatus without action
   */
  export type BinStatusDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BinStatus
     */
    select?: BinStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BinStatus
     */
    omit?: BinStatusOmit<ExtArgs> | null
  }


  /**
   * Model SystemSettings
   */

  export type AggregateSystemSettings = {
    _count: SystemSettingsCountAggregateOutputType | null
    _avg: SystemSettingsAvgAggregateOutputType | null
    _sum: SystemSettingsSumAggregateOutputType | null
    _min: SystemSettingsMinAggregateOutputType | null
    _max: SystemSettingsMaxAggregateOutputType | null
  }

  export type SystemSettingsAvgAggregateOutputType = {
    id: number | null
    updatedById: number | null
  }

  export type SystemSettingsSumAggregateOutputType = {
    id: number | null
    updatedById: number | null
  }

  export type SystemSettingsMinAggregateOutputType = {
    id: number | null
    key: string | null
    value: string | null
    label: string | null
    updatedById: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SystemSettingsMaxAggregateOutputType = {
    id: number | null
    key: string | null
    value: string | null
    label: string | null
    updatedById: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SystemSettingsCountAggregateOutputType = {
    id: number
    key: number
    value: number
    label: number
    updatedById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SystemSettingsAvgAggregateInputType = {
    id?: true
    updatedById?: true
  }

  export type SystemSettingsSumAggregateInputType = {
    id?: true
    updatedById?: true
  }

  export type SystemSettingsMinAggregateInputType = {
    id?: true
    key?: true
    value?: true
    label?: true
    updatedById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SystemSettingsMaxAggregateInputType = {
    id?: true
    key?: true
    value?: true
    label?: true
    updatedById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SystemSettingsCountAggregateInputType = {
    id?: true
    key?: true
    value?: true
    label?: true
    updatedById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SystemSettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemSettings to aggregate.
     */
    where?: SystemSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemSettings to fetch.
     */
    orderBy?: SystemSettingsOrderByWithRelationInput | SystemSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SystemSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SystemSettings
    **/
    _count?: true | SystemSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SystemSettingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SystemSettingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SystemSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SystemSettingsMaxAggregateInputType
  }

  export type GetSystemSettingsAggregateType<T extends SystemSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateSystemSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSystemSettings[P]>
      : GetScalarType<T[P], AggregateSystemSettings[P]>
  }




  export type SystemSettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SystemSettingsWhereInput
    orderBy?: SystemSettingsOrderByWithAggregationInput | SystemSettingsOrderByWithAggregationInput[]
    by: SystemSettingsScalarFieldEnum[] | SystemSettingsScalarFieldEnum
    having?: SystemSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SystemSettingsCountAggregateInputType | true
    _avg?: SystemSettingsAvgAggregateInputType
    _sum?: SystemSettingsSumAggregateInputType
    _min?: SystemSettingsMinAggregateInputType
    _max?: SystemSettingsMaxAggregateInputType
  }

  export type SystemSettingsGroupByOutputType = {
    id: number
    key: string
    value: string
    label: string | null
    updatedById: number | null
    createdAt: Date
    updatedAt: Date
    _count: SystemSettingsCountAggregateOutputType | null
    _avg: SystemSettingsAvgAggregateOutputType | null
    _sum: SystemSettingsSumAggregateOutputType | null
    _min: SystemSettingsMinAggregateOutputType | null
    _max: SystemSettingsMaxAggregateOutputType | null
  }

  type GetSystemSettingsGroupByPayload<T extends SystemSettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SystemSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SystemSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SystemSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], SystemSettingsGroupByOutputType[P]>
        }
      >
    >


  export type SystemSettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    label?: boolean
    updatedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["systemSettings"]>

  export type SystemSettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    label?: boolean
    updatedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["systemSettings"]>

  export type SystemSettingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    label?: boolean
    updatedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["systemSettings"]>

  export type SystemSettingsSelectScalar = {
    id?: boolean
    key?: boolean
    value?: boolean
    label?: boolean
    updatedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SystemSettingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "key" | "value" | "label" | "updatedById" | "createdAt" | "updatedAt", ExtArgs["result"]["systemSettings"]>

  export type $SystemSettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SystemSettings"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      key: string
      value: string
      label: string | null
      updatedById: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["systemSettings"]>
    composites: {}
  }

  type SystemSettingsGetPayload<S extends boolean | null | undefined | SystemSettingsDefaultArgs> = $Result.GetResult<Prisma.$SystemSettingsPayload, S>

  type SystemSettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SystemSettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SystemSettingsCountAggregateInputType | true
    }

  export interface SystemSettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SystemSettings'], meta: { name: 'SystemSettings' } }
    /**
     * Find zero or one SystemSettings that matches the filter.
     * @param {SystemSettingsFindUniqueArgs} args - Arguments to find a SystemSettings
     * @example
     * // Get one SystemSettings
     * const systemSettings = await prisma.systemSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SystemSettingsFindUniqueArgs>(args: SelectSubset<T, SystemSettingsFindUniqueArgs<ExtArgs>>): Prisma__SystemSettingsClient<$Result.GetResult<Prisma.$SystemSettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SystemSettings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SystemSettingsFindUniqueOrThrowArgs} args - Arguments to find a SystemSettings
     * @example
     * // Get one SystemSettings
     * const systemSettings = await prisma.systemSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SystemSettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, SystemSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SystemSettingsClient<$Result.GetResult<Prisma.$SystemSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SystemSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingsFindFirstArgs} args - Arguments to find a SystemSettings
     * @example
     * // Get one SystemSettings
     * const systemSettings = await prisma.systemSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SystemSettingsFindFirstArgs>(args?: SelectSubset<T, SystemSettingsFindFirstArgs<ExtArgs>>): Prisma__SystemSettingsClient<$Result.GetResult<Prisma.$SystemSettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SystemSettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingsFindFirstOrThrowArgs} args - Arguments to find a SystemSettings
     * @example
     * // Get one SystemSettings
     * const systemSettings = await prisma.systemSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SystemSettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, SystemSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__SystemSettingsClient<$Result.GetResult<Prisma.$SystemSettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SystemSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SystemSettings
     * const systemSettings = await prisma.systemSettings.findMany()
     * 
     * // Get first 10 SystemSettings
     * const systemSettings = await prisma.systemSettings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const systemSettingsWithIdOnly = await prisma.systemSettings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SystemSettingsFindManyArgs>(args?: SelectSubset<T, SystemSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemSettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SystemSettings.
     * @param {SystemSettingsCreateArgs} args - Arguments to create a SystemSettings.
     * @example
     * // Create one SystemSettings
     * const SystemSettings = await prisma.systemSettings.create({
     *   data: {
     *     // ... data to create a SystemSettings
     *   }
     * })
     * 
     */
    create<T extends SystemSettingsCreateArgs>(args: SelectSubset<T, SystemSettingsCreateArgs<ExtArgs>>): Prisma__SystemSettingsClient<$Result.GetResult<Prisma.$SystemSettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SystemSettings.
     * @param {SystemSettingsCreateManyArgs} args - Arguments to create many SystemSettings.
     * @example
     * // Create many SystemSettings
     * const systemSettings = await prisma.systemSettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SystemSettingsCreateManyArgs>(args?: SelectSubset<T, SystemSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SystemSettings and returns the data saved in the database.
     * @param {SystemSettingsCreateManyAndReturnArgs} args - Arguments to create many SystemSettings.
     * @example
     * // Create many SystemSettings
     * const systemSettings = await prisma.systemSettings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SystemSettings and only return the `id`
     * const systemSettingsWithIdOnly = await prisma.systemSettings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SystemSettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, SystemSettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemSettingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SystemSettings.
     * @param {SystemSettingsDeleteArgs} args - Arguments to delete one SystemSettings.
     * @example
     * // Delete one SystemSettings
     * const SystemSettings = await prisma.systemSettings.delete({
     *   where: {
     *     // ... filter to delete one SystemSettings
     *   }
     * })
     * 
     */
    delete<T extends SystemSettingsDeleteArgs>(args: SelectSubset<T, SystemSettingsDeleteArgs<ExtArgs>>): Prisma__SystemSettingsClient<$Result.GetResult<Prisma.$SystemSettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SystemSettings.
     * @param {SystemSettingsUpdateArgs} args - Arguments to update one SystemSettings.
     * @example
     * // Update one SystemSettings
     * const systemSettings = await prisma.systemSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SystemSettingsUpdateArgs>(args: SelectSubset<T, SystemSettingsUpdateArgs<ExtArgs>>): Prisma__SystemSettingsClient<$Result.GetResult<Prisma.$SystemSettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SystemSettings.
     * @param {SystemSettingsDeleteManyArgs} args - Arguments to filter SystemSettings to delete.
     * @example
     * // Delete a few SystemSettings
     * const { count } = await prisma.systemSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SystemSettingsDeleteManyArgs>(args?: SelectSubset<T, SystemSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SystemSettings
     * const systemSettings = await prisma.systemSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SystemSettingsUpdateManyArgs>(args: SelectSubset<T, SystemSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemSettings and returns the data updated in the database.
     * @param {SystemSettingsUpdateManyAndReturnArgs} args - Arguments to update many SystemSettings.
     * @example
     * // Update many SystemSettings
     * const systemSettings = await prisma.systemSettings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SystemSettings and only return the `id`
     * const systemSettingsWithIdOnly = await prisma.systemSettings.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SystemSettingsUpdateManyAndReturnArgs>(args: SelectSubset<T, SystemSettingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemSettingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SystemSettings.
     * @param {SystemSettingsUpsertArgs} args - Arguments to update or create a SystemSettings.
     * @example
     * // Update or create a SystemSettings
     * const systemSettings = await prisma.systemSettings.upsert({
     *   create: {
     *     // ... data to create a SystemSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SystemSettings we want to update
     *   }
     * })
     */
    upsert<T extends SystemSettingsUpsertArgs>(args: SelectSubset<T, SystemSettingsUpsertArgs<ExtArgs>>): Prisma__SystemSettingsClient<$Result.GetResult<Prisma.$SystemSettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SystemSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingsCountArgs} args - Arguments to filter SystemSettings to count.
     * @example
     * // Count the number of SystemSettings
     * const count = await prisma.systemSettings.count({
     *   where: {
     *     // ... the filter for the SystemSettings we want to count
     *   }
     * })
    **/
    count<T extends SystemSettingsCountArgs>(
      args?: Subset<T, SystemSettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SystemSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SystemSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SystemSettingsAggregateArgs>(args: Subset<T, SystemSettingsAggregateArgs>): Prisma.PrismaPromise<GetSystemSettingsAggregateType<T>>

    /**
     * Group by SystemSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SystemSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SystemSettingsGroupByArgs['orderBy'] }
        : { orderBy?: SystemSettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SystemSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSystemSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SystemSettings model
   */
  readonly fields: SystemSettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SystemSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SystemSettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SystemSettings model
   */
  interface SystemSettingsFieldRefs {
    readonly id: FieldRef<"SystemSettings", 'Int'>
    readonly key: FieldRef<"SystemSettings", 'String'>
    readonly value: FieldRef<"SystemSettings", 'String'>
    readonly label: FieldRef<"SystemSettings", 'String'>
    readonly updatedById: FieldRef<"SystemSettings", 'Int'>
    readonly createdAt: FieldRef<"SystemSettings", 'DateTime'>
    readonly updatedAt: FieldRef<"SystemSettings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SystemSettings findUnique
   */
  export type SystemSettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSettings
     */
    select?: SystemSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSettings
     */
    omit?: SystemSettingsOmit<ExtArgs> | null
    /**
     * Filter, which SystemSettings to fetch.
     */
    where: SystemSettingsWhereUniqueInput
  }

  /**
   * SystemSettings findUniqueOrThrow
   */
  export type SystemSettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSettings
     */
    select?: SystemSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSettings
     */
    omit?: SystemSettingsOmit<ExtArgs> | null
    /**
     * Filter, which SystemSettings to fetch.
     */
    where: SystemSettingsWhereUniqueInput
  }

  /**
   * SystemSettings findFirst
   */
  export type SystemSettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSettings
     */
    select?: SystemSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSettings
     */
    omit?: SystemSettingsOmit<ExtArgs> | null
    /**
     * Filter, which SystemSettings to fetch.
     */
    where?: SystemSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemSettings to fetch.
     */
    orderBy?: SystemSettingsOrderByWithRelationInput | SystemSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemSettings.
     */
    cursor?: SystemSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemSettings.
     */
    distinct?: SystemSettingsScalarFieldEnum | SystemSettingsScalarFieldEnum[]
  }

  /**
   * SystemSettings findFirstOrThrow
   */
  export type SystemSettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSettings
     */
    select?: SystemSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSettings
     */
    omit?: SystemSettingsOmit<ExtArgs> | null
    /**
     * Filter, which SystemSettings to fetch.
     */
    where?: SystemSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemSettings to fetch.
     */
    orderBy?: SystemSettingsOrderByWithRelationInput | SystemSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemSettings.
     */
    cursor?: SystemSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemSettings.
     */
    distinct?: SystemSettingsScalarFieldEnum | SystemSettingsScalarFieldEnum[]
  }

  /**
   * SystemSettings findMany
   */
  export type SystemSettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSettings
     */
    select?: SystemSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSettings
     */
    omit?: SystemSettingsOmit<ExtArgs> | null
    /**
     * Filter, which SystemSettings to fetch.
     */
    where?: SystemSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemSettings to fetch.
     */
    orderBy?: SystemSettingsOrderByWithRelationInput | SystemSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SystemSettings.
     */
    cursor?: SystemSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemSettings.
     */
    skip?: number
    distinct?: SystemSettingsScalarFieldEnum | SystemSettingsScalarFieldEnum[]
  }

  /**
   * SystemSettings create
   */
  export type SystemSettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSettings
     */
    select?: SystemSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSettings
     */
    omit?: SystemSettingsOmit<ExtArgs> | null
    /**
     * The data needed to create a SystemSettings.
     */
    data: XOR<SystemSettingsCreateInput, SystemSettingsUncheckedCreateInput>
  }

  /**
   * SystemSettings createMany
   */
  export type SystemSettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SystemSettings.
     */
    data: SystemSettingsCreateManyInput | SystemSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemSettings createManyAndReturn
   */
  export type SystemSettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSettings
     */
    select?: SystemSettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSettings
     */
    omit?: SystemSettingsOmit<ExtArgs> | null
    /**
     * The data used to create many SystemSettings.
     */
    data: SystemSettingsCreateManyInput | SystemSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemSettings update
   */
  export type SystemSettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSettings
     */
    select?: SystemSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSettings
     */
    omit?: SystemSettingsOmit<ExtArgs> | null
    /**
     * The data needed to update a SystemSettings.
     */
    data: XOR<SystemSettingsUpdateInput, SystemSettingsUncheckedUpdateInput>
    /**
     * Choose, which SystemSettings to update.
     */
    where: SystemSettingsWhereUniqueInput
  }

  /**
   * SystemSettings updateMany
   */
  export type SystemSettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SystemSettings.
     */
    data: XOR<SystemSettingsUpdateManyMutationInput, SystemSettingsUncheckedUpdateManyInput>
    /**
     * Filter which SystemSettings to update
     */
    where?: SystemSettingsWhereInput
    /**
     * Limit how many SystemSettings to update.
     */
    limit?: number
  }

  /**
   * SystemSettings updateManyAndReturn
   */
  export type SystemSettingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSettings
     */
    select?: SystemSettingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSettings
     */
    omit?: SystemSettingsOmit<ExtArgs> | null
    /**
     * The data used to update SystemSettings.
     */
    data: XOR<SystemSettingsUpdateManyMutationInput, SystemSettingsUncheckedUpdateManyInput>
    /**
     * Filter which SystemSettings to update
     */
    where?: SystemSettingsWhereInput
    /**
     * Limit how many SystemSettings to update.
     */
    limit?: number
  }

  /**
   * SystemSettings upsert
   */
  export type SystemSettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSettings
     */
    select?: SystemSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSettings
     */
    omit?: SystemSettingsOmit<ExtArgs> | null
    /**
     * The filter to search for the SystemSettings to update in case it exists.
     */
    where: SystemSettingsWhereUniqueInput
    /**
     * In case the SystemSettings found by the `where` argument doesn't exist, create a new SystemSettings with this data.
     */
    create: XOR<SystemSettingsCreateInput, SystemSettingsUncheckedCreateInput>
    /**
     * In case the SystemSettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SystemSettingsUpdateInput, SystemSettingsUncheckedUpdateInput>
  }

  /**
   * SystemSettings delete
   */
  export type SystemSettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSettings
     */
    select?: SystemSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSettings
     */
    omit?: SystemSettingsOmit<ExtArgs> | null
    /**
     * Filter which SystemSettings to delete.
     */
    where: SystemSettingsWhereUniqueInput
  }

  /**
   * SystemSettings deleteMany
   */
  export type SystemSettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemSettings to delete
     */
    where?: SystemSettingsWhereInput
    /**
     * Limit how many SystemSettings to delete.
     */
    limit?: number
  }

  /**
   * SystemSettings without action
   */
  export type SystemSettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSettings
     */
    select?: SystemSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSettings
     */
    omit?: SystemSettingsOmit<ExtArgs> | null
  }


  /**
   * Model WasteType
   */

  export type AggregateWasteType = {
    _count: WasteTypeCountAggregateOutputType | null
    _avg: WasteTypeAvgAggregateOutputType | null
    _sum: WasteTypeSumAggregateOutputType | null
    _min: WasteTypeMinAggregateOutputType | null
    _max: WasteTypeMaxAggregateOutputType | null
  }

  export type WasteTypeAvgAggregateOutputType = {
    id: number | null
    sortOrder: number | null
  }

  export type WasteTypeSumAggregateOutputType = {
    id: number | null
    sortOrder: number | null
  }

  export type WasteTypeMinAggregateOutputType = {
    id: number | null
    key: string | null
    label: string | null
    emoji: string | null
    enabled: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WasteTypeMaxAggregateOutputType = {
    id: number | null
    key: string | null
    label: string | null
    emoji: string | null
    enabled: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WasteTypeCountAggregateOutputType = {
    id: number
    key: number
    label: number
    emoji: number
    enabled: number
    sortOrder: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WasteTypeAvgAggregateInputType = {
    id?: true
    sortOrder?: true
  }

  export type WasteTypeSumAggregateInputType = {
    id?: true
    sortOrder?: true
  }

  export type WasteTypeMinAggregateInputType = {
    id?: true
    key?: true
    label?: true
    emoji?: true
    enabled?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WasteTypeMaxAggregateInputType = {
    id?: true
    key?: true
    label?: true
    emoji?: true
    enabled?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WasteTypeCountAggregateInputType = {
    id?: true
    key?: true
    label?: true
    emoji?: true
    enabled?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WasteTypeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WasteType to aggregate.
     */
    where?: WasteTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WasteTypes to fetch.
     */
    orderBy?: WasteTypeOrderByWithRelationInput | WasteTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WasteTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WasteTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WasteTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WasteTypes
    **/
    _count?: true | WasteTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WasteTypeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WasteTypeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WasteTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WasteTypeMaxAggregateInputType
  }

  export type GetWasteTypeAggregateType<T extends WasteTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateWasteType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWasteType[P]>
      : GetScalarType<T[P], AggregateWasteType[P]>
  }




  export type WasteTypeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WasteTypeWhereInput
    orderBy?: WasteTypeOrderByWithAggregationInput | WasteTypeOrderByWithAggregationInput[]
    by: WasteTypeScalarFieldEnum[] | WasteTypeScalarFieldEnum
    having?: WasteTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WasteTypeCountAggregateInputType | true
    _avg?: WasteTypeAvgAggregateInputType
    _sum?: WasteTypeSumAggregateInputType
    _min?: WasteTypeMinAggregateInputType
    _max?: WasteTypeMaxAggregateInputType
  }

  export type WasteTypeGroupByOutputType = {
    id: number
    key: string
    label: string
    emoji: string
    enabled: boolean
    sortOrder: number
    createdAt: Date
    updatedAt: Date
    _count: WasteTypeCountAggregateOutputType | null
    _avg: WasteTypeAvgAggregateOutputType | null
    _sum: WasteTypeSumAggregateOutputType | null
    _min: WasteTypeMinAggregateOutputType | null
    _max: WasteTypeMaxAggregateOutputType | null
  }

  type GetWasteTypeGroupByPayload<T extends WasteTypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WasteTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WasteTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WasteTypeGroupByOutputType[P]>
            : GetScalarType<T[P], WasteTypeGroupByOutputType[P]>
        }
      >
    >


  export type WasteTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    label?: boolean
    emoji?: boolean
    enabled?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["wasteType"]>

  export type WasteTypeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    label?: boolean
    emoji?: boolean
    enabled?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["wasteType"]>

  export type WasteTypeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    label?: boolean
    emoji?: boolean
    enabled?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["wasteType"]>

  export type WasteTypeSelectScalar = {
    id?: boolean
    key?: boolean
    label?: boolean
    emoji?: boolean
    enabled?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WasteTypeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "key" | "label" | "emoji" | "enabled" | "sortOrder" | "createdAt" | "updatedAt", ExtArgs["result"]["wasteType"]>

  export type $WasteTypePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WasteType"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      key: string
      label: string
      emoji: string
      enabled: boolean
      sortOrder: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["wasteType"]>
    composites: {}
  }

  type WasteTypeGetPayload<S extends boolean | null | undefined | WasteTypeDefaultArgs> = $Result.GetResult<Prisma.$WasteTypePayload, S>

  type WasteTypeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WasteTypeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WasteTypeCountAggregateInputType | true
    }

  export interface WasteTypeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WasteType'], meta: { name: 'WasteType' } }
    /**
     * Find zero or one WasteType that matches the filter.
     * @param {WasteTypeFindUniqueArgs} args - Arguments to find a WasteType
     * @example
     * // Get one WasteType
     * const wasteType = await prisma.wasteType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WasteTypeFindUniqueArgs>(args: SelectSubset<T, WasteTypeFindUniqueArgs<ExtArgs>>): Prisma__WasteTypeClient<$Result.GetResult<Prisma.$WasteTypePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WasteType that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WasteTypeFindUniqueOrThrowArgs} args - Arguments to find a WasteType
     * @example
     * // Get one WasteType
     * const wasteType = await prisma.wasteType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WasteTypeFindUniqueOrThrowArgs>(args: SelectSubset<T, WasteTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WasteTypeClient<$Result.GetResult<Prisma.$WasteTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WasteType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WasteTypeFindFirstArgs} args - Arguments to find a WasteType
     * @example
     * // Get one WasteType
     * const wasteType = await prisma.wasteType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WasteTypeFindFirstArgs>(args?: SelectSubset<T, WasteTypeFindFirstArgs<ExtArgs>>): Prisma__WasteTypeClient<$Result.GetResult<Prisma.$WasteTypePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WasteType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WasteTypeFindFirstOrThrowArgs} args - Arguments to find a WasteType
     * @example
     * // Get one WasteType
     * const wasteType = await prisma.wasteType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WasteTypeFindFirstOrThrowArgs>(args?: SelectSubset<T, WasteTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma__WasteTypeClient<$Result.GetResult<Prisma.$WasteTypePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WasteTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WasteTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WasteTypes
     * const wasteTypes = await prisma.wasteType.findMany()
     * 
     * // Get first 10 WasteTypes
     * const wasteTypes = await prisma.wasteType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const wasteTypeWithIdOnly = await prisma.wasteType.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WasteTypeFindManyArgs>(args?: SelectSubset<T, WasteTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WasteTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WasteType.
     * @param {WasteTypeCreateArgs} args - Arguments to create a WasteType.
     * @example
     * // Create one WasteType
     * const WasteType = await prisma.wasteType.create({
     *   data: {
     *     // ... data to create a WasteType
     *   }
     * })
     * 
     */
    create<T extends WasteTypeCreateArgs>(args: SelectSubset<T, WasteTypeCreateArgs<ExtArgs>>): Prisma__WasteTypeClient<$Result.GetResult<Prisma.$WasteTypePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WasteTypes.
     * @param {WasteTypeCreateManyArgs} args - Arguments to create many WasteTypes.
     * @example
     * // Create many WasteTypes
     * const wasteType = await prisma.wasteType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WasteTypeCreateManyArgs>(args?: SelectSubset<T, WasteTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WasteTypes and returns the data saved in the database.
     * @param {WasteTypeCreateManyAndReturnArgs} args - Arguments to create many WasteTypes.
     * @example
     * // Create many WasteTypes
     * const wasteType = await prisma.wasteType.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WasteTypes and only return the `id`
     * const wasteTypeWithIdOnly = await prisma.wasteType.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WasteTypeCreateManyAndReturnArgs>(args?: SelectSubset<T, WasteTypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WasteTypePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WasteType.
     * @param {WasteTypeDeleteArgs} args - Arguments to delete one WasteType.
     * @example
     * // Delete one WasteType
     * const WasteType = await prisma.wasteType.delete({
     *   where: {
     *     // ... filter to delete one WasteType
     *   }
     * })
     * 
     */
    delete<T extends WasteTypeDeleteArgs>(args: SelectSubset<T, WasteTypeDeleteArgs<ExtArgs>>): Prisma__WasteTypeClient<$Result.GetResult<Prisma.$WasteTypePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WasteType.
     * @param {WasteTypeUpdateArgs} args - Arguments to update one WasteType.
     * @example
     * // Update one WasteType
     * const wasteType = await prisma.wasteType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WasteTypeUpdateArgs>(args: SelectSubset<T, WasteTypeUpdateArgs<ExtArgs>>): Prisma__WasteTypeClient<$Result.GetResult<Prisma.$WasteTypePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WasteTypes.
     * @param {WasteTypeDeleteManyArgs} args - Arguments to filter WasteTypes to delete.
     * @example
     * // Delete a few WasteTypes
     * const { count } = await prisma.wasteType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WasteTypeDeleteManyArgs>(args?: SelectSubset<T, WasteTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WasteTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WasteTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WasteTypes
     * const wasteType = await prisma.wasteType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WasteTypeUpdateManyArgs>(args: SelectSubset<T, WasteTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WasteTypes and returns the data updated in the database.
     * @param {WasteTypeUpdateManyAndReturnArgs} args - Arguments to update many WasteTypes.
     * @example
     * // Update many WasteTypes
     * const wasteType = await prisma.wasteType.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WasteTypes and only return the `id`
     * const wasteTypeWithIdOnly = await prisma.wasteType.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WasteTypeUpdateManyAndReturnArgs>(args: SelectSubset<T, WasteTypeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WasteTypePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WasteType.
     * @param {WasteTypeUpsertArgs} args - Arguments to update or create a WasteType.
     * @example
     * // Update or create a WasteType
     * const wasteType = await prisma.wasteType.upsert({
     *   create: {
     *     // ... data to create a WasteType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WasteType we want to update
     *   }
     * })
     */
    upsert<T extends WasteTypeUpsertArgs>(args: SelectSubset<T, WasteTypeUpsertArgs<ExtArgs>>): Prisma__WasteTypeClient<$Result.GetResult<Prisma.$WasteTypePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WasteTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WasteTypeCountArgs} args - Arguments to filter WasteTypes to count.
     * @example
     * // Count the number of WasteTypes
     * const count = await prisma.wasteType.count({
     *   where: {
     *     // ... the filter for the WasteTypes we want to count
     *   }
     * })
    **/
    count<T extends WasteTypeCountArgs>(
      args?: Subset<T, WasteTypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WasteTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WasteType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WasteTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WasteTypeAggregateArgs>(args: Subset<T, WasteTypeAggregateArgs>): Prisma.PrismaPromise<GetWasteTypeAggregateType<T>>

    /**
     * Group by WasteType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WasteTypeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WasteTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WasteTypeGroupByArgs['orderBy'] }
        : { orderBy?: WasteTypeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WasteTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWasteTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WasteType model
   */
  readonly fields: WasteTypeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WasteType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WasteTypeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WasteType model
   */
  interface WasteTypeFieldRefs {
    readonly id: FieldRef<"WasteType", 'Int'>
    readonly key: FieldRef<"WasteType", 'String'>
    readonly label: FieldRef<"WasteType", 'String'>
    readonly emoji: FieldRef<"WasteType", 'String'>
    readonly enabled: FieldRef<"WasteType", 'Boolean'>
    readonly sortOrder: FieldRef<"WasteType", 'Int'>
    readonly createdAt: FieldRef<"WasteType", 'DateTime'>
    readonly updatedAt: FieldRef<"WasteType", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WasteType findUnique
   */
  export type WasteTypeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WasteType
     */
    select?: WasteTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WasteType
     */
    omit?: WasteTypeOmit<ExtArgs> | null
    /**
     * Filter, which WasteType to fetch.
     */
    where: WasteTypeWhereUniqueInput
  }

  /**
   * WasteType findUniqueOrThrow
   */
  export type WasteTypeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WasteType
     */
    select?: WasteTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WasteType
     */
    omit?: WasteTypeOmit<ExtArgs> | null
    /**
     * Filter, which WasteType to fetch.
     */
    where: WasteTypeWhereUniqueInput
  }

  /**
   * WasteType findFirst
   */
  export type WasteTypeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WasteType
     */
    select?: WasteTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WasteType
     */
    omit?: WasteTypeOmit<ExtArgs> | null
    /**
     * Filter, which WasteType to fetch.
     */
    where?: WasteTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WasteTypes to fetch.
     */
    orderBy?: WasteTypeOrderByWithRelationInput | WasteTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WasteTypes.
     */
    cursor?: WasteTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WasteTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WasteTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WasteTypes.
     */
    distinct?: WasteTypeScalarFieldEnum | WasteTypeScalarFieldEnum[]
  }

  /**
   * WasteType findFirstOrThrow
   */
  export type WasteTypeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WasteType
     */
    select?: WasteTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WasteType
     */
    omit?: WasteTypeOmit<ExtArgs> | null
    /**
     * Filter, which WasteType to fetch.
     */
    where?: WasteTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WasteTypes to fetch.
     */
    orderBy?: WasteTypeOrderByWithRelationInput | WasteTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WasteTypes.
     */
    cursor?: WasteTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WasteTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WasteTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WasteTypes.
     */
    distinct?: WasteTypeScalarFieldEnum | WasteTypeScalarFieldEnum[]
  }

  /**
   * WasteType findMany
   */
  export type WasteTypeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WasteType
     */
    select?: WasteTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WasteType
     */
    omit?: WasteTypeOmit<ExtArgs> | null
    /**
     * Filter, which WasteTypes to fetch.
     */
    where?: WasteTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WasteTypes to fetch.
     */
    orderBy?: WasteTypeOrderByWithRelationInput | WasteTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WasteTypes.
     */
    cursor?: WasteTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WasteTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WasteTypes.
     */
    skip?: number
    distinct?: WasteTypeScalarFieldEnum | WasteTypeScalarFieldEnum[]
  }

  /**
   * WasteType create
   */
  export type WasteTypeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WasteType
     */
    select?: WasteTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WasteType
     */
    omit?: WasteTypeOmit<ExtArgs> | null
    /**
     * The data needed to create a WasteType.
     */
    data: XOR<WasteTypeCreateInput, WasteTypeUncheckedCreateInput>
  }

  /**
   * WasteType createMany
   */
  export type WasteTypeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WasteTypes.
     */
    data: WasteTypeCreateManyInput | WasteTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WasteType createManyAndReturn
   */
  export type WasteTypeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WasteType
     */
    select?: WasteTypeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WasteType
     */
    omit?: WasteTypeOmit<ExtArgs> | null
    /**
     * The data used to create many WasteTypes.
     */
    data: WasteTypeCreateManyInput | WasteTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WasteType update
   */
  export type WasteTypeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WasteType
     */
    select?: WasteTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WasteType
     */
    omit?: WasteTypeOmit<ExtArgs> | null
    /**
     * The data needed to update a WasteType.
     */
    data: XOR<WasteTypeUpdateInput, WasteTypeUncheckedUpdateInput>
    /**
     * Choose, which WasteType to update.
     */
    where: WasteTypeWhereUniqueInput
  }

  /**
   * WasteType updateMany
   */
  export type WasteTypeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WasteTypes.
     */
    data: XOR<WasteTypeUpdateManyMutationInput, WasteTypeUncheckedUpdateManyInput>
    /**
     * Filter which WasteTypes to update
     */
    where?: WasteTypeWhereInput
    /**
     * Limit how many WasteTypes to update.
     */
    limit?: number
  }

  /**
   * WasteType updateManyAndReturn
   */
  export type WasteTypeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WasteType
     */
    select?: WasteTypeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WasteType
     */
    omit?: WasteTypeOmit<ExtArgs> | null
    /**
     * The data used to update WasteTypes.
     */
    data: XOR<WasteTypeUpdateManyMutationInput, WasteTypeUncheckedUpdateManyInput>
    /**
     * Filter which WasteTypes to update
     */
    where?: WasteTypeWhereInput
    /**
     * Limit how many WasteTypes to update.
     */
    limit?: number
  }

  /**
   * WasteType upsert
   */
  export type WasteTypeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WasteType
     */
    select?: WasteTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WasteType
     */
    omit?: WasteTypeOmit<ExtArgs> | null
    /**
     * The filter to search for the WasteType to update in case it exists.
     */
    where: WasteTypeWhereUniqueInput
    /**
     * In case the WasteType found by the `where` argument doesn't exist, create a new WasteType with this data.
     */
    create: XOR<WasteTypeCreateInput, WasteTypeUncheckedCreateInput>
    /**
     * In case the WasteType was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WasteTypeUpdateInput, WasteTypeUncheckedUpdateInput>
  }

  /**
   * WasteType delete
   */
  export type WasteTypeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WasteType
     */
    select?: WasteTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WasteType
     */
    omit?: WasteTypeOmit<ExtArgs> | null
    /**
     * Filter which WasteType to delete.
     */
    where: WasteTypeWhereUniqueInput
  }

  /**
   * WasteType deleteMany
   */
  export type WasteTypeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WasteTypes to delete
     */
    where?: WasteTypeWhereInput
    /**
     * Limit how many WasteTypes to delete.
     */
    limit?: number
  }

  /**
   * WasteType without action
   */
  export type WasteTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WasteType
     */
    select?: WasteTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WasteType
     */
    omit?: WasteTypeOmit<ExtArgs> | null
  }


  /**
   * Model UrgencyLevel
   */

  export type AggregateUrgencyLevel = {
    _count: UrgencyLevelCountAggregateOutputType | null
    _avg: UrgencyLevelAvgAggregateOutputType | null
    _sum: UrgencyLevelSumAggregateOutputType | null
    _min: UrgencyLevelMinAggregateOutputType | null
    _max: UrgencyLevelMaxAggregateOutputType | null
  }

  export type UrgencyLevelAvgAggregateOutputType = {
    id: number | null
    sortOrder: number | null
  }

  export type UrgencyLevelSumAggregateOutputType = {
    id: number | null
    sortOrder: number | null
  }

  export type UrgencyLevelMinAggregateOutputType = {
    id: number | null
    key: string | null
    label: string | null
    description: string | null
    color: string | null
    enabled: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UrgencyLevelMaxAggregateOutputType = {
    id: number | null
    key: string | null
    label: string | null
    description: string | null
    color: string | null
    enabled: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UrgencyLevelCountAggregateOutputType = {
    id: number
    key: number
    label: number
    description: number
    color: number
    enabled: number
    sortOrder: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UrgencyLevelAvgAggregateInputType = {
    id?: true
    sortOrder?: true
  }

  export type UrgencyLevelSumAggregateInputType = {
    id?: true
    sortOrder?: true
  }

  export type UrgencyLevelMinAggregateInputType = {
    id?: true
    key?: true
    label?: true
    description?: true
    color?: true
    enabled?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UrgencyLevelMaxAggregateInputType = {
    id?: true
    key?: true
    label?: true
    description?: true
    color?: true
    enabled?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UrgencyLevelCountAggregateInputType = {
    id?: true
    key?: true
    label?: true
    description?: true
    color?: true
    enabled?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UrgencyLevelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UrgencyLevel to aggregate.
     */
    where?: UrgencyLevelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UrgencyLevels to fetch.
     */
    orderBy?: UrgencyLevelOrderByWithRelationInput | UrgencyLevelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UrgencyLevelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UrgencyLevels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UrgencyLevels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UrgencyLevels
    **/
    _count?: true | UrgencyLevelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UrgencyLevelAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UrgencyLevelSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UrgencyLevelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UrgencyLevelMaxAggregateInputType
  }

  export type GetUrgencyLevelAggregateType<T extends UrgencyLevelAggregateArgs> = {
        [P in keyof T & keyof AggregateUrgencyLevel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUrgencyLevel[P]>
      : GetScalarType<T[P], AggregateUrgencyLevel[P]>
  }




  export type UrgencyLevelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UrgencyLevelWhereInput
    orderBy?: UrgencyLevelOrderByWithAggregationInput | UrgencyLevelOrderByWithAggregationInput[]
    by: UrgencyLevelScalarFieldEnum[] | UrgencyLevelScalarFieldEnum
    having?: UrgencyLevelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UrgencyLevelCountAggregateInputType | true
    _avg?: UrgencyLevelAvgAggregateInputType
    _sum?: UrgencyLevelSumAggregateInputType
    _min?: UrgencyLevelMinAggregateInputType
    _max?: UrgencyLevelMaxAggregateInputType
  }

  export type UrgencyLevelGroupByOutputType = {
    id: number
    key: string
    label: string
    description: string | null
    color: string | null
    enabled: boolean
    sortOrder: number
    createdAt: Date
    updatedAt: Date
    _count: UrgencyLevelCountAggregateOutputType | null
    _avg: UrgencyLevelAvgAggregateOutputType | null
    _sum: UrgencyLevelSumAggregateOutputType | null
    _min: UrgencyLevelMinAggregateOutputType | null
    _max: UrgencyLevelMaxAggregateOutputType | null
  }

  type GetUrgencyLevelGroupByPayload<T extends UrgencyLevelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UrgencyLevelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UrgencyLevelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UrgencyLevelGroupByOutputType[P]>
            : GetScalarType<T[P], UrgencyLevelGroupByOutputType[P]>
        }
      >
    >


  export type UrgencyLevelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    label?: boolean
    description?: boolean
    color?: boolean
    enabled?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["urgencyLevel"]>

  export type UrgencyLevelSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    label?: boolean
    description?: boolean
    color?: boolean
    enabled?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["urgencyLevel"]>

  export type UrgencyLevelSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    label?: boolean
    description?: boolean
    color?: boolean
    enabled?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["urgencyLevel"]>

  export type UrgencyLevelSelectScalar = {
    id?: boolean
    key?: boolean
    label?: boolean
    description?: boolean
    color?: boolean
    enabled?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UrgencyLevelOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "key" | "label" | "description" | "color" | "enabled" | "sortOrder" | "createdAt" | "updatedAt", ExtArgs["result"]["urgencyLevel"]>

  export type $UrgencyLevelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UrgencyLevel"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      key: string
      label: string
      description: string | null
      color: string | null
      enabled: boolean
      sortOrder: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["urgencyLevel"]>
    composites: {}
  }

  type UrgencyLevelGetPayload<S extends boolean | null | undefined | UrgencyLevelDefaultArgs> = $Result.GetResult<Prisma.$UrgencyLevelPayload, S>

  type UrgencyLevelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UrgencyLevelFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UrgencyLevelCountAggregateInputType | true
    }

  export interface UrgencyLevelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UrgencyLevel'], meta: { name: 'UrgencyLevel' } }
    /**
     * Find zero or one UrgencyLevel that matches the filter.
     * @param {UrgencyLevelFindUniqueArgs} args - Arguments to find a UrgencyLevel
     * @example
     * // Get one UrgencyLevel
     * const urgencyLevel = await prisma.urgencyLevel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UrgencyLevelFindUniqueArgs>(args: SelectSubset<T, UrgencyLevelFindUniqueArgs<ExtArgs>>): Prisma__UrgencyLevelClient<$Result.GetResult<Prisma.$UrgencyLevelPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UrgencyLevel that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UrgencyLevelFindUniqueOrThrowArgs} args - Arguments to find a UrgencyLevel
     * @example
     * // Get one UrgencyLevel
     * const urgencyLevel = await prisma.urgencyLevel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UrgencyLevelFindUniqueOrThrowArgs>(args: SelectSubset<T, UrgencyLevelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UrgencyLevelClient<$Result.GetResult<Prisma.$UrgencyLevelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UrgencyLevel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UrgencyLevelFindFirstArgs} args - Arguments to find a UrgencyLevel
     * @example
     * // Get one UrgencyLevel
     * const urgencyLevel = await prisma.urgencyLevel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UrgencyLevelFindFirstArgs>(args?: SelectSubset<T, UrgencyLevelFindFirstArgs<ExtArgs>>): Prisma__UrgencyLevelClient<$Result.GetResult<Prisma.$UrgencyLevelPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UrgencyLevel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UrgencyLevelFindFirstOrThrowArgs} args - Arguments to find a UrgencyLevel
     * @example
     * // Get one UrgencyLevel
     * const urgencyLevel = await prisma.urgencyLevel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UrgencyLevelFindFirstOrThrowArgs>(args?: SelectSubset<T, UrgencyLevelFindFirstOrThrowArgs<ExtArgs>>): Prisma__UrgencyLevelClient<$Result.GetResult<Prisma.$UrgencyLevelPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UrgencyLevels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UrgencyLevelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UrgencyLevels
     * const urgencyLevels = await prisma.urgencyLevel.findMany()
     * 
     * // Get first 10 UrgencyLevels
     * const urgencyLevels = await prisma.urgencyLevel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const urgencyLevelWithIdOnly = await prisma.urgencyLevel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UrgencyLevelFindManyArgs>(args?: SelectSubset<T, UrgencyLevelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UrgencyLevelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UrgencyLevel.
     * @param {UrgencyLevelCreateArgs} args - Arguments to create a UrgencyLevel.
     * @example
     * // Create one UrgencyLevel
     * const UrgencyLevel = await prisma.urgencyLevel.create({
     *   data: {
     *     // ... data to create a UrgencyLevel
     *   }
     * })
     * 
     */
    create<T extends UrgencyLevelCreateArgs>(args: SelectSubset<T, UrgencyLevelCreateArgs<ExtArgs>>): Prisma__UrgencyLevelClient<$Result.GetResult<Prisma.$UrgencyLevelPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UrgencyLevels.
     * @param {UrgencyLevelCreateManyArgs} args - Arguments to create many UrgencyLevels.
     * @example
     * // Create many UrgencyLevels
     * const urgencyLevel = await prisma.urgencyLevel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UrgencyLevelCreateManyArgs>(args?: SelectSubset<T, UrgencyLevelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UrgencyLevels and returns the data saved in the database.
     * @param {UrgencyLevelCreateManyAndReturnArgs} args - Arguments to create many UrgencyLevels.
     * @example
     * // Create many UrgencyLevels
     * const urgencyLevel = await prisma.urgencyLevel.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UrgencyLevels and only return the `id`
     * const urgencyLevelWithIdOnly = await prisma.urgencyLevel.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UrgencyLevelCreateManyAndReturnArgs>(args?: SelectSubset<T, UrgencyLevelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UrgencyLevelPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UrgencyLevel.
     * @param {UrgencyLevelDeleteArgs} args - Arguments to delete one UrgencyLevel.
     * @example
     * // Delete one UrgencyLevel
     * const UrgencyLevel = await prisma.urgencyLevel.delete({
     *   where: {
     *     // ... filter to delete one UrgencyLevel
     *   }
     * })
     * 
     */
    delete<T extends UrgencyLevelDeleteArgs>(args: SelectSubset<T, UrgencyLevelDeleteArgs<ExtArgs>>): Prisma__UrgencyLevelClient<$Result.GetResult<Prisma.$UrgencyLevelPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UrgencyLevel.
     * @param {UrgencyLevelUpdateArgs} args - Arguments to update one UrgencyLevel.
     * @example
     * // Update one UrgencyLevel
     * const urgencyLevel = await prisma.urgencyLevel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UrgencyLevelUpdateArgs>(args: SelectSubset<T, UrgencyLevelUpdateArgs<ExtArgs>>): Prisma__UrgencyLevelClient<$Result.GetResult<Prisma.$UrgencyLevelPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UrgencyLevels.
     * @param {UrgencyLevelDeleteManyArgs} args - Arguments to filter UrgencyLevels to delete.
     * @example
     * // Delete a few UrgencyLevels
     * const { count } = await prisma.urgencyLevel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UrgencyLevelDeleteManyArgs>(args?: SelectSubset<T, UrgencyLevelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UrgencyLevels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UrgencyLevelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UrgencyLevels
     * const urgencyLevel = await prisma.urgencyLevel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UrgencyLevelUpdateManyArgs>(args: SelectSubset<T, UrgencyLevelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UrgencyLevels and returns the data updated in the database.
     * @param {UrgencyLevelUpdateManyAndReturnArgs} args - Arguments to update many UrgencyLevels.
     * @example
     * // Update many UrgencyLevels
     * const urgencyLevel = await prisma.urgencyLevel.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UrgencyLevels and only return the `id`
     * const urgencyLevelWithIdOnly = await prisma.urgencyLevel.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UrgencyLevelUpdateManyAndReturnArgs>(args: SelectSubset<T, UrgencyLevelUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UrgencyLevelPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UrgencyLevel.
     * @param {UrgencyLevelUpsertArgs} args - Arguments to update or create a UrgencyLevel.
     * @example
     * // Update or create a UrgencyLevel
     * const urgencyLevel = await prisma.urgencyLevel.upsert({
     *   create: {
     *     // ... data to create a UrgencyLevel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UrgencyLevel we want to update
     *   }
     * })
     */
    upsert<T extends UrgencyLevelUpsertArgs>(args: SelectSubset<T, UrgencyLevelUpsertArgs<ExtArgs>>): Prisma__UrgencyLevelClient<$Result.GetResult<Prisma.$UrgencyLevelPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UrgencyLevels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UrgencyLevelCountArgs} args - Arguments to filter UrgencyLevels to count.
     * @example
     * // Count the number of UrgencyLevels
     * const count = await prisma.urgencyLevel.count({
     *   where: {
     *     // ... the filter for the UrgencyLevels we want to count
     *   }
     * })
    **/
    count<T extends UrgencyLevelCountArgs>(
      args?: Subset<T, UrgencyLevelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UrgencyLevelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UrgencyLevel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UrgencyLevelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UrgencyLevelAggregateArgs>(args: Subset<T, UrgencyLevelAggregateArgs>): Prisma.PrismaPromise<GetUrgencyLevelAggregateType<T>>

    /**
     * Group by UrgencyLevel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UrgencyLevelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UrgencyLevelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UrgencyLevelGroupByArgs['orderBy'] }
        : { orderBy?: UrgencyLevelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UrgencyLevelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUrgencyLevelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UrgencyLevel model
   */
  readonly fields: UrgencyLevelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UrgencyLevel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UrgencyLevelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UrgencyLevel model
   */
  interface UrgencyLevelFieldRefs {
    readonly id: FieldRef<"UrgencyLevel", 'Int'>
    readonly key: FieldRef<"UrgencyLevel", 'String'>
    readonly label: FieldRef<"UrgencyLevel", 'String'>
    readonly description: FieldRef<"UrgencyLevel", 'String'>
    readonly color: FieldRef<"UrgencyLevel", 'String'>
    readonly enabled: FieldRef<"UrgencyLevel", 'Boolean'>
    readonly sortOrder: FieldRef<"UrgencyLevel", 'Int'>
    readonly createdAt: FieldRef<"UrgencyLevel", 'DateTime'>
    readonly updatedAt: FieldRef<"UrgencyLevel", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UrgencyLevel findUnique
   */
  export type UrgencyLevelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UrgencyLevel
     */
    select?: UrgencyLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UrgencyLevel
     */
    omit?: UrgencyLevelOmit<ExtArgs> | null
    /**
     * Filter, which UrgencyLevel to fetch.
     */
    where: UrgencyLevelWhereUniqueInput
  }

  /**
   * UrgencyLevel findUniqueOrThrow
   */
  export type UrgencyLevelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UrgencyLevel
     */
    select?: UrgencyLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UrgencyLevel
     */
    omit?: UrgencyLevelOmit<ExtArgs> | null
    /**
     * Filter, which UrgencyLevel to fetch.
     */
    where: UrgencyLevelWhereUniqueInput
  }

  /**
   * UrgencyLevel findFirst
   */
  export type UrgencyLevelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UrgencyLevel
     */
    select?: UrgencyLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UrgencyLevel
     */
    omit?: UrgencyLevelOmit<ExtArgs> | null
    /**
     * Filter, which UrgencyLevel to fetch.
     */
    where?: UrgencyLevelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UrgencyLevels to fetch.
     */
    orderBy?: UrgencyLevelOrderByWithRelationInput | UrgencyLevelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UrgencyLevels.
     */
    cursor?: UrgencyLevelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UrgencyLevels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UrgencyLevels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UrgencyLevels.
     */
    distinct?: UrgencyLevelScalarFieldEnum | UrgencyLevelScalarFieldEnum[]
  }

  /**
   * UrgencyLevel findFirstOrThrow
   */
  export type UrgencyLevelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UrgencyLevel
     */
    select?: UrgencyLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UrgencyLevel
     */
    omit?: UrgencyLevelOmit<ExtArgs> | null
    /**
     * Filter, which UrgencyLevel to fetch.
     */
    where?: UrgencyLevelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UrgencyLevels to fetch.
     */
    orderBy?: UrgencyLevelOrderByWithRelationInput | UrgencyLevelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UrgencyLevels.
     */
    cursor?: UrgencyLevelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UrgencyLevels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UrgencyLevels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UrgencyLevels.
     */
    distinct?: UrgencyLevelScalarFieldEnum | UrgencyLevelScalarFieldEnum[]
  }

  /**
   * UrgencyLevel findMany
   */
  export type UrgencyLevelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UrgencyLevel
     */
    select?: UrgencyLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UrgencyLevel
     */
    omit?: UrgencyLevelOmit<ExtArgs> | null
    /**
     * Filter, which UrgencyLevels to fetch.
     */
    where?: UrgencyLevelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UrgencyLevels to fetch.
     */
    orderBy?: UrgencyLevelOrderByWithRelationInput | UrgencyLevelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UrgencyLevels.
     */
    cursor?: UrgencyLevelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UrgencyLevels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UrgencyLevels.
     */
    skip?: number
    distinct?: UrgencyLevelScalarFieldEnum | UrgencyLevelScalarFieldEnum[]
  }

  /**
   * UrgencyLevel create
   */
  export type UrgencyLevelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UrgencyLevel
     */
    select?: UrgencyLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UrgencyLevel
     */
    omit?: UrgencyLevelOmit<ExtArgs> | null
    /**
     * The data needed to create a UrgencyLevel.
     */
    data: XOR<UrgencyLevelCreateInput, UrgencyLevelUncheckedCreateInput>
  }

  /**
   * UrgencyLevel createMany
   */
  export type UrgencyLevelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UrgencyLevels.
     */
    data: UrgencyLevelCreateManyInput | UrgencyLevelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UrgencyLevel createManyAndReturn
   */
  export type UrgencyLevelCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UrgencyLevel
     */
    select?: UrgencyLevelSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UrgencyLevel
     */
    omit?: UrgencyLevelOmit<ExtArgs> | null
    /**
     * The data used to create many UrgencyLevels.
     */
    data: UrgencyLevelCreateManyInput | UrgencyLevelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UrgencyLevel update
   */
  export type UrgencyLevelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UrgencyLevel
     */
    select?: UrgencyLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UrgencyLevel
     */
    omit?: UrgencyLevelOmit<ExtArgs> | null
    /**
     * The data needed to update a UrgencyLevel.
     */
    data: XOR<UrgencyLevelUpdateInput, UrgencyLevelUncheckedUpdateInput>
    /**
     * Choose, which UrgencyLevel to update.
     */
    where: UrgencyLevelWhereUniqueInput
  }

  /**
   * UrgencyLevel updateMany
   */
  export type UrgencyLevelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UrgencyLevels.
     */
    data: XOR<UrgencyLevelUpdateManyMutationInput, UrgencyLevelUncheckedUpdateManyInput>
    /**
     * Filter which UrgencyLevels to update
     */
    where?: UrgencyLevelWhereInput
    /**
     * Limit how many UrgencyLevels to update.
     */
    limit?: number
  }

  /**
   * UrgencyLevel updateManyAndReturn
   */
  export type UrgencyLevelUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UrgencyLevel
     */
    select?: UrgencyLevelSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UrgencyLevel
     */
    omit?: UrgencyLevelOmit<ExtArgs> | null
    /**
     * The data used to update UrgencyLevels.
     */
    data: XOR<UrgencyLevelUpdateManyMutationInput, UrgencyLevelUncheckedUpdateManyInput>
    /**
     * Filter which UrgencyLevels to update
     */
    where?: UrgencyLevelWhereInput
    /**
     * Limit how many UrgencyLevels to update.
     */
    limit?: number
  }

  /**
   * UrgencyLevel upsert
   */
  export type UrgencyLevelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UrgencyLevel
     */
    select?: UrgencyLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UrgencyLevel
     */
    omit?: UrgencyLevelOmit<ExtArgs> | null
    /**
     * The filter to search for the UrgencyLevel to update in case it exists.
     */
    where: UrgencyLevelWhereUniqueInput
    /**
     * In case the UrgencyLevel found by the `where` argument doesn't exist, create a new UrgencyLevel with this data.
     */
    create: XOR<UrgencyLevelCreateInput, UrgencyLevelUncheckedCreateInput>
    /**
     * In case the UrgencyLevel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UrgencyLevelUpdateInput, UrgencyLevelUncheckedUpdateInput>
  }

  /**
   * UrgencyLevel delete
   */
  export type UrgencyLevelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UrgencyLevel
     */
    select?: UrgencyLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UrgencyLevel
     */
    omit?: UrgencyLevelOmit<ExtArgs> | null
    /**
     * Filter which UrgencyLevel to delete.
     */
    where: UrgencyLevelWhereUniqueInput
  }

  /**
   * UrgencyLevel deleteMany
   */
  export type UrgencyLevelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UrgencyLevels to delete
     */
    where?: UrgencyLevelWhereInput
    /**
     * Limit how many UrgencyLevels to delete.
     */
    limit?: number
  }

  /**
   * UrgencyLevel without action
   */
  export type UrgencyLevelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UrgencyLevel
     */
    select?: UrgencyLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UrgencyLevel
     */
    omit?: UrgencyLevelOmit<ExtArgs> | null
  }


  /**
   * Model AssetCondition
   */

  export type AggregateAssetCondition = {
    _count: AssetConditionCountAggregateOutputType | null
    _avg: AssetConditionAvgAggregateOutputType | null
    _sum: AssetConditionSumAggregateOutputType | null
    _min: AssetConditionMinAggregateOutputType | null
    _max: AssetConditionMaxAggregateOutputType | null
  }

  export type AssetConditionAvgAggregateOutputType = {
    id: number | null
    sortOrder: number | null
  }

  export type AssetConditionSumAggregateOutputType = {
    id: number | null
    sortOrder: number | null
  }

  export type AssetConditionMinAggregateOutputType = {
    id: number | null
    key: string | null
    label: string | null
    description: string | null
    enabled: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AssetConditionMaxAggregateOutputType = {
    id: number | null
    key: string | null
    label: string | null
    description: string | null
    enabled: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AssetConditionCountAggregateOutputType = {
    id: number
    key: number
    label: number
    description: number
    enabled: number
    sortOrder: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AssetConditionAvgAggregateInputType = {
    id?: true
    sortOrder?: true
  }

  export type AssetConditionSumAggregateInputType = {
    id?: true
    sortOrder?: true
  }

  export type AssetConditionMinAggregateInputType = {
    id?: true
    key?: true
    label?: true
    description?: true
    enabled?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AssetConditionMaxAggregateInputType = {
    id?: true
    key?: true
    label?: true
    description?: true
    enabled?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AssetConditionCountAggregateInputType = {
    id?: true
    key?: true
    label?: true
    description?: true
    enabled?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AssetConditionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AssetCondition to aggregate.
     */
    where?: AssetConditionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssetConditions to fetch.
     */
    orderBy?: AssetConditionOrderByWithRelationInput | AssetConditionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssetConditionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssetConditions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssetConditions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AssetConditions
    **/
    _count?: true | AssetConditionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AssetConditionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AssetConditionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssetConditionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssetConditionMaxAggregateInputType
  }

  export type GetAssetConditionAggregateType<T extends AssetConditionAggregateArgs> = {
        [P in keyof T & keyof AggregateAssetCondition]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssetCondition[P]>
      : GetScalarType<T[P], AggregateAssetCondition[P]>
  }




  export type AssetConditionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssetConditionWhereInput
    orderBy?: AssetConditionOrderByWithAggregationInput | AssetConditionOrderByWithAggregationInput[]
    by: AssetConditionScalarFieldEnum[] | AssetConditionScalarFieldEnum
    having?: AssetConditionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssetConditionCountAggregateInputType | true
    _avg?: AssetConditionAvgAggregateInputType
    _sum?: AssetConditionSumAggregateInputType
    _min?: AssetConditionMinAggregateInputType
    _max?: AssetConditionMaxAggregateInputType
  }

  export type AssetConditionGroupByOutputType = {
    id: number
    key: string
    label: string
    description: string | null
    enabled: boolean
    sortOrder: number
    createdAt: Date
    updatedAt: Date
    _count: AssetConditionCountAggregateOutputType | null
    _avg: AssetConditionAvgAggregateOutputType | null
    _sum: AssetConditionSumAggregateOutputType | null
    _min: AssetConditionMinAggregateOutputType | null
    _max: AssetConditionMaxAggregateOutputType | null
  }

  type GetAssetConditionGroupByPayload<T extends AssetConditionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssetConditionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssetConditionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssetConditionGroupByOutputType[P]>
            : GetScalarType<T[P], AssetConditionGroupByOutputType[P]>
        }
      >
    >


  export type AssetConditionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    label?: boolean
    description?: boolean
    enabled?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["assetCondition"]>

  export type AssetConditionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    label?: boolean
    description?: boolean
    enabled?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["assetCondition"]>

  export type AssetConditionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    label?: boolean
    description?: boolean
    enabled?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["assetCondition"]>

  export type AssetConditionSelectScalar = {
    id?: boolean
    key?: boolean
    label?: boolean
    description?: boolean
    enabled?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AssetConditionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "key" | "label" | "description" | "enabled" | "sortOrder" | "createdAt" | "updatedAt", ExtArgs["result"]["assetCondition"]>

  export type $AssetConditionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AssetCondition"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      key: string
      label: string
      description: string | null
      enabled: boolean
      sortOrder: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["assetCondition"]>
    composites: {}
  }

  type AssetConditionGetPayload<S extends boolean | null | undefined | AssetConditionDefaultArgs> = $Result.GetResult<Prisma.$AssetConditionPayload, S>

  type AssetConditionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AssetConditionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AssetConditionCountAggregateInputType | true
    }

  export interface AssetConditionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AssetCondition'], meta: { name: 'AssetCondition' } }
    /**
     * Find zero or one AssetCondition that matches the filter.
     * @param {AssetConditionFindUniqueArgs} args - Arguments to find a AssetCondition
     * @example
     * // Get one AssetCondition
     * const assetCondition = await prisma.assetCondition.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssetConditionFindUniqueArgs>(args: SelectSubset<T, AssetConditionFindUniqueArgs<ExtArgs>>): Prisma__AssetConditionClient<$Result.GetResult<Prisma.$AssetConditionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AssetCondition that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssetConditionFindUniqueOrThrowArgs} args - Arguments to find a AssetCondition
     * @example
     * // Get one AssetCondition
     * const assetCondition = await prisma.assetCondition.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssetConditionFindUniqueOrThrowArgs>(args: SelectSubset<T, AssetConditionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssetConditionClient<$Result.GetResult<Prisma.$AssetConditionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AssetCondition that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetConditionFindFirstArgs} args - Arguments to find a AssetCondition
     * @example
     * // Get one AssetCondition
     * const assetCondition = await prisma.assetCondition.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssetConditionFindFirstArgs>(args?: SelectSubset<T, AssetConditionFindFirstArgs<ExtArgs>>): Prisma__AssetConditionClient<$Result.GetResult<Prisma.$AssetConditionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AssetCondition that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetConditionFindFirstOrThrowArgs} args - Arguments to find a AssetCondition
     * @example
     * // Get one AssetCondition
     * const assetCondition = await prisma.assetCondition.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssetConditionFindFirstOrThrowArgs>(args?: SelectSubset<T, AssetConditionFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssetConditionClient<$Result.GetResult<Prisma.$AssetConditionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AssetConditions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetConditionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AssetConditions
     * const assetConditions = await prisma.assetCondition.findMany()
     * 
     * // Get first 10 AssetConditions
     * const assetConditions = await prisma.assetCondition.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assetConditionWithIdOnly = await prisma.assetCondition.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssetConditionFindManyArgs>(args?: SelectSubset<T, AssetConditionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssetConditionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AssetCondition.
     * @param {AssetConditionCreateArgs} args - Arguments to create a AssetCondition.
     * @example
     * // Create one AssetCondition
     * const AssetCondition = await prisma.assetCondition.create({
     *   data: {
     *     // ... data to create a AssetCondition
     *   }
     * })
     * 
     */
    create<T extends AssetConditionCreateArgs>(args: SelectSubset<T, AssetConditionCreateArgs<ExtArgs>>): Prisma__AssetConditionClient<$Result.GetResult<Prisma.$AssetConditionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AssetConditions.
     * @param {AssetConditionCreateManyArgs} args - Arguments to create many AssetConditions.
     * @example
     * // Create many AssetConditions
     * const assetCondition = await prisma.assetCondition.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssetConditionCreateManyArgs>(args?: SelectSubset<T, AssetConditionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AssetConditions and returns the data saved in the database.
     * @param {AssetConditionCreateManyAndReturnArgs} args - Arguments to create many AssetConditions.
     * @example
     * // Create many AssetConditions
     * const assetCondition = await prisma.assetCondition.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AssetConditions and only return the `id`
     * const assetConditionWithIdOnly = await prisma.assetCondition.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AssetConditionCreateManyAndReturnArgs>(args?: SelectSubset<T, AssetConditionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssetConditionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AssetCondition.
     * @param {AssetConditionDeleteArgs} args - Arguments to delete one AssetCondition.
     * @example
     * // Delete one AssetCondition
     * const AssetCondition = await prisma.assetCondition.delete({
     *   where: {
     *     // ... filter to delete one AssetCondition
     *   }
     * })
     * 
     */
    delete<T extends AssetConditionDeleteArgs>(args: SelectSubset<T, AssetConditionDeleteArgs<ExtArgs>>): Prisma__AssetConditionClient<$Result.GetResult<Prisma.$AssetConditionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AssetCondition.
     * @param {AssetConditionUpdateArgs} args - Arguments to update one AssetCondition.
     * @example
     * // Update one AssetCondition
     * const assetCondition = await prisma.assetCondition.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssetConditionUpdateArgs>(args: SelectSubset<T, AssetConditionUpdateArgs<ExtArgs>>): Prisma__AssetConditionClient<$Result.GetResult<Prisma.$AssetConditionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AssetConditions.
     * @param {AssetConditionDeleteManyArgs} args - Arguments to filter AssetConditions to delete.
     * @example
     * // Delete a few AssetConditions
     * const { count } = await prisma.assetCondition.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssetConditionDeleteManyArgs>(args?: SelectSubset<T, AssetConditionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AssetConditions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetConditionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AssetConditions
     * const assetCondition = await prisma.assetCondition.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssetConditionUpdateManyArgs>(args: SelectSubset<T, AssetConditionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AssetConditions and returns the data updated in the database.
     * @param {AssetConditionUpdateManyAndReturnArgs} args - Arguments to update many AssetConditions.
     * @example
     * // Update many AssetConditions
     * const assetCondition = await prisma.assetCondition.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AssetConditions and only return the `id`
     * const assetConditionWithIdOnly = await prisma.assetCondition.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AssetConditionUpdateManyAndReturnArgs>(args: SelectSubset<T, AssetConditionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssetConditionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AssetCondition.
     * @param {AssetConditionUpsertArgs} args - Arguments to update or create a AssetCondition.
     * @example
     * // Update or create a AssetCondition
     * const assetCondition = await prisma.assetCondition.upsert({
     *   create: {
     *     // ... data to create a AssetCondition
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AssetCondition we want to update
     *   }
     * })
     */
    upsert<T extends AssetConditionUpsertArgs>(args: SelectSubset<T, AssetConditionUpsertArgs<ExtArgs>>): Prisma__AssetConditionClient<$Result.GetResult<Prisma.$AssetConditionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AssetConditions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetConditionCountArgs} args - Arguments to filter AssetConditions to count.
     * @example
     * // Count the number of AssetConditions
     * const count = await prisma.assetCondition.count({
     *   where: {
     *     // ... the filter for the AssetConditions we want to count
     *   }
     * })
    **/
    count<T extends AssetConditionCountArgs>(
      args?: Subset<T, AssetConditionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssetConditionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AssetCondition.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetConditionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AssetConditionAggregateArgs>(args: Subset<T, AssetConditionAggregateArgs>): Prisma.PrismaPromise<GetAssetConditionAggregateType<T>>

    /**
     * Group by AssetCondition.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetConditionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AssetConditionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssetConditionGroupByArgs['orderBy'] }
        : { orderBy?: AssetConditionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AssetConditionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssetConditionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AssetCondition model
   */
  readonly fields: AssetConditionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AssetCondition.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssetConditionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AssetCondition model
   */
  interface AssetConditionFieldRefs {
    readonly id: FieldRef<"AssetCondition", 'Int'>
    readonly key: FieldRef<"AssetCondition", 'String'>
    readonly label: FieldRef<"AssetCondition", 'String'>
    readonly description: FieldRef<"AssetCondition", 'String'>
    readonly enabled: FieldRef<"AssetCondition", 'Boolean'>
    readonly sortOrder: FieldRef<"AssetCondition", 'Int'>
    readonly createdAt: FieldRef<"AssetCondition", 'DateTime'>
    readonly updatedAt: FieldRef<"AssetCondition", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AssetCondition findUnique
   */
  export type AssetConditionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCondition
     */
    select?: AssetConditionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssetCondition
     */
    omit?: AssetConditionOmit<ExtArgs> | null
    /**
     * Filter, which AssetCondition to fetch.
     */
    where: AssetConditionWhereUniqueInput
  }

  /**
   * AssetCondition findUniqueOrThrow
   */
  export type AssetConditionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCondition
     */
    select?: AssetConditionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssetCondition
     */
    omit?: AssetConditionOmit<ExtArgs> | null
    /**
     * Filter, which AssetCondition to fetch.
     */
    where: AssetConditionWhereUniqueInput
  }

  /**
   * AssetCondition findFirst
   */
  export type AssetConditionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCondition
     */
    select?: AssetConditionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssetCondition
     */
    omit?: AssetConditionOmit<ExtArgs> | null
    /**
     * Filter, which AssetCondition to fetch.
     */
    where?: AssetConditionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssetConditions to fetch.
     */
    orderBy?: AssetConditionOrderByWithRelationInput | AssetConditionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AssetConditions.
     */
    cursor?: AssetConditionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssetConditions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssetConditions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssetConditions.
     */
    distinct?: AssetConditionScalarFieldEnum | AssetConditionScalarFieldEnum[]
  }

  /**
   * AssetCondition findFirstOrThrow
   */
  export type AssetConditionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCondition
     */
    select?: AssetConditionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssetCondition
     */
    omit?: AssetConditionOmit<ExtArgs> | null
    /**
     * Filter, which AssetCondition to fetch.
     */
    where?: AssetConditionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssetConditions to fetch.
     */
    orderBy?: AssetConditionOrderByWithRelationInput | AssetConditionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AssetConditions.
     */
    cursor?: AssetConditionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssetConditions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssetConditions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssetConditions.
     */
    distinct?: AssetConditionScalarFieldEnum | AssetConditionScalarFieldEnum[]
  }

  /**
   * AssetCondition findMany
   */
  export type AssetConditionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCondition
     */
    select?: AssetConditionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssetCondition
     */
    omit?: AssetConditionOmit<ExtArgs> | null
    /**
     * Filter, which AssetConditions to fetch.
     */
    where?: AssetConditionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssetConditions to fetch.
     */
    orderBy?: AssetConditionOrderByWithRelationInput | AssetConditionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AssetConditions.
     */
    cursor?: AssetConditionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssetConditions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssetConditions.
     */
    skip?: number
    distinct?: AssetConditionScalarFieldEnum | AssetConditionScalarFieldEnum[]
  }

  /**
   * AssetCondition create
   */
  export type AssetConditionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCondition
     */
    select?: AssetConditionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssetCondition
     */
    omit?: AssetConditionOmit<ExtArgs> | null
    /**
     * The data needed to create a AssetCondition.
     */
    data: XOR<AssetConditionCreateInput, AssetConditionUncheckedCreateInput>
  }

  /**
   * AssetCondition createMany
   */
  export type AssetConditionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AssetConditions.
     */
    data: AssetConditionCreateManyInput | AssetConditionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AssetCondition createManyAndReturn
   */
  export type AssetConditionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCondition
     */
    select?: AssetConditionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AssetCondition
     */
    omit?: AssetConditionOmit<ExtArgs> | null
    /**
     * The data used to create many AssetConditions.
     */
    data: AssetConditionCreateManyInput | AssetConditionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AssetCondition update
   */
  export type AssetConditionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCondition
     */
    select?: AssetConditionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssetCondition
     */
    omit?: AssetConditionOmit<ExtArgs> | null
    /**
     * The data needed to update a AssetCondition.
     */
    data: XOR<AssetConditionUpdateInput, AssetConditionUncheckedUpdateInput>
    /**
     * Choose, which AssetCondition to update.
     */
    where: AssetConditionWhereUniqueInput
  }

  /**
   * AssetCondition updateMany
   */
  export type AssetConditionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AssetConditions.
     */
    data: XOR<AssetConditionUpdateManyMutationInput, AssetConditionUncheckedUpdateManyInput>
    /**
     * Filter which AssetConditions to update
     */
    where?: AssetConditionWhereInput
    /**
     * Limit how many AssetConditions to update.
     */
    limit?: number
  }

  /**
   * AssetCondition updateManyAndReturn
   */
  export type AssetConditionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCondition
     */
    select?: AssetConditionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AssetCondition
     */
    omit?: AssetConditionOmit<ExtArgs> | null
    /**
     * The data used to update AssetConditions.
     */
    data: XOR<AssetConditionUpdateManyMutationInput, AssetConditionUncheckedUpdateManyInput>
    /**
     * Filter which AssetConditions to update
     */
    where?: AssetConditionWhereInput
    /**
     * Limit how many AssetConditions to update.
     */
    limit?: number
  }

  /**
   * AssetCondition upsert
   */
  export type AssetConditionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCondition
     */
    select?: AssetConditionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssetCondition
     */
    omit?: AssetConditionOmit<ExtArgs> | null
    /**
     * The filter to search for the AssetCondition to update in case it exists.
     */
    where: AssetConditionWhereUniqueInput
    /**
     * In case the AssetCondition found by the `where` argument doesn't exist, create a new AssetCondition with this data.
     */
    create: XOR<AssetConditionCreateInput, AssetConditionUncheckedCreateInput>
    /**
     * In case the AssetCondition was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssetConditionUpdateInput, AssetConditionUncheckedUpdateInput>
  }

  /**
   * AssetCondition delete
   */
  export type AssetConditionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCondition
     */
    select?: AssetConditionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssetCondition
     */
    omit?: AssetConditionOmit<ExtArgs> | null
    /**
     * Filter which AssetCondition to delete.
     */
    where: AssetConditionWhereUniqueInput
  }

  /**
   * AssetCondition deleteMany
   */
  export type AssetConditionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AssetConditions to delete
     */
    where?: AssetConditionWhereInput
    /**
     * Limit how many AssetConditions to delete.
     */
    limit?: number
  }

  /**
   * AssetCondition without action
   */
  export type AssetConditionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCondition
     */
    select?: AssetConditionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssetCondition
     */
    omit?: AssetConditionOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    password: 'password',
    role: 'role',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    studentId: 'studentId',
    lrn: 'lrn',
    course: 'course',
    section: 'section',
    department: 'department',
    points: 'points',
    reports: 'reports',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ReportScalarFieldEnum: {
    id: 'id',
    location: 'location',
    notes: 'notes',
    photoUrl: 'photoUrl',
    urgency: 'urgency',
    wasteType: 'wasteType',
    type: 'type',
    status: 'status',
    assignedStaffId: 'assignedStaffId',
    kilosCollected: 'kilosCollected',
    assetAction: 'assetAction',
    collectionDate: 'collectionDate',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ReportScalarFieldEnum = (typeof ReportScalarFieldEnum)[keyof typeof ReportScalarFieldEnum]


  export const CampusNewsScalarFieldEnum: {
    id: 'id',
    tag: 'tag',
    date: 'date',
    title: 'title',
    desc: 'desc',
    publishedById: 'publishedById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CampusNewsScalarFieldEnum = (typeof CampusNewsScalarFieldEnum)[keyof typeof CampusNewsScalarFieldEnum]


  export const AssetCategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    label: 'label',
    enabled: 'enabled',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AssetCategoryScalarFieldEnum = (typeof AssetCategoryScalarFieldEnum)[keyof typeof AssetCategoryScalarFieldEnum]


  export const ItemPresetScalarFieldEnum: {
    id: 'id',
    name: 'name',
    icon: 'icon',
    categoryId: 'categoryId',
    enabled: 'enabled',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ItemPresetScalarFieldEnum = (typeof ItemPresetScalarFieldEnum)[keyof typeof ItemPresetScalarFieldEnum]


  export const LocationScalarFieldEnum: {
    id: 'id',
    code: 'code',
    name: 'name',
    type: 'type',
    building: 'building',
    enabled: 'enabled',
    sortOrder: 'sortOrder',
    mapX: 'mapX',
    mapY: 'mapY',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LocationScalarFieldEnum = (typeof LocationScalarFieldEnum)[keyof typeof LocationScalarFieldEnum]


  export const CampusMapScalarFieldEnum: {
    id: 'id',
    imageData: 'imageData',
    imageName: 'imageName',
    imageSize: 'imageSize',
    uploadedById: 'uploadedById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CampusMapScalarFieldEnum = (typeof CampusMapScalarFieldEnum)[keyof typeof CampusMapScalarFieldEnum]


  export const BinStatusScalarFieldEnum: {
    id: 'id',
    locationId: 'locationId',
    fillStatus: 'fillStatus',
    lastUpdated: 'lastUpdated',
    updatedBy: 'updatedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BinStatusScalarFieldEnum = (typeof BinStatusScalarFieldEnum)[keyof typeof BinStatusScalarFieldEnum]


  export const SystemSettingsScalarFieldEnum: {
    id: 'id',
    key: 'key',
    value: 'value',
    label: 'label',
    updatedById: 'updatedById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SystemSettingsScalarFieldEnum = (typeof SystemSettingsScalarFieldEnum)[keyof typeof SystemSettingsScalarFieldEnum]


  export const WasteTypeScalarFieldEnum: {
    id: 'id',
    key: 'key',
    label: 'label',
    emoji: 'emoji',
    enabled: 'enabled',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WasteTypeScalarFieldEnum = (typeof WasteTypeScalarFieldEnum)[keyof typeof WasteTypeScalarFieldEnum]


  export const UrgencyLevelScalarFieldEnum: {
    id: 'id',
    key: 'key',
    label: 'label',
    description: 'description',
    color: 'color',
    enabled: 'enabled',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UrgencyLevelScalarFieldEnum = (typeof UrgencyLevelScalarFieldEnum)[keyof typeof UrgencyLevelScalarFieldEnum]


  export const AssetConditionScalarFieldEnum: {
    id: 'id',
    key: 'key',
    label: 'label',
    description: 'description',
    enabled: 'enabled',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AssetConditionScalarFieldEnum = (typeof AssetConditionScalarFieldEnum)[keyof typeof AssetConditionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ReportType'
   */
  export type EnumReportTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReportType'>
    


  /**
   * Reference to a field of type 'ReportType[]'
   */
  export type ListEnumReportTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReportType[]'>
    


  /**
   * Reference to a field of type 'ReportStatus'
   */
  export type EnumReportStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReportStatus'>
    


  /**
   * Reference to a field of type 'ReportStatus[]'
   */
  export type ListEnumReportStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReportStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'AssetAction'
   */
  export type EnumAssetActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssetAction'>
    


  /**
   * Reference to a field of type 'AssetAction[]'
   */
  export type ListEnumAssetActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssetAction[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'LocationType'
   */
  export type EnumLocationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LocationType'>
    


  /**
   * Reference to a field of type 'LocationType[]'
   */
  export type ListEnumLocationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LocationType[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    studentId?: StringNullableFilter<"User"> | string | null
    lrn?: StringNullableFilter<"User"> | string | null
    course?: StringNullableFilter<"User"> | string | null
    section?: StringNullableFilter<"User"> | string | null
    department?: StringNullableFilter<"User"> | string | null
    points?: IntFilter<"User"> | number
    reports?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    submittedReports?: ReportListRelationFilter
    assignedReports?: ReportListRelationFilter
    newsPosts?: CampusNewsListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    studentId?: SortOrderInput | SortOrder
    lrn?: SortOrderInput | SortOrder
    course?: SortOrderInput | SortOrder
    section?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    points?: SortOrder
    reports?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    submittedReports?: ReportOrderByRelationAggregateInput
    assignedReports?: ReportOrderByRelationAggregateInput
    newsPosts?: CampusNewsOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    email?: string
    studentId?: string
    lrn?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    course?: StringNullableFilter<"User"> | string | null
    section?: StringNullableFilter<"User"> | string | null
    department?: StringNullableFilter<"User"> | string | null
    points?: IntFilter<"User"> | number
    reports?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    submittedReports?: ReportListRelationFilter
    assignedReports?: ReportListRelationFilter
    newsPosts?: CampusNewsListRelationFilter
  }, "id" | "username" | "email" | "studentId" | "lrn">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    studentId?: SortOrderInput | SortOrder
    lrn?: SortOrderInput | SortOrder
    course?: SortOrderInput | SortOrder
    section?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    points?: SortOrder
    reports?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    username?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    firstName?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    studentId?: StringNullableWithAggregatesFilter<"User"> | string | null
    lrn?: StringNullableWithAggregatesFilter<"User"> | string | null
    course?: StringNullableWithAggregatesFilter<"User"> | string | null
    section?: StringNullableWithAggregatesFilter<"User"> | string | null
    department?: StringNullableWithAggregatesFilter<"User"> | string | null
    points?: IntWithAggregatesFilter<"User"> | number
    reports?: IntWithAggregatesFilter<"User"> | number
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ReportWhereInput = {
    AND?: ReportWhereInput | ReportWhereInput[]
    OR?: ReportWhereInput[]
    NOT?: ReportWhereInput | ReportWhereInput[]
    id?: IntFilter<"Report"> | number
    location?: StringFilter<"Report"> | string
    notes?: StringNullableFilter<"Report"> | string | null
    photoUrl?: StringNullableFilter<"Report"> | string | null
    urgency?: StringFilter<"Report"> | string
    wasteType?: StringFilter<"Report"> | string
    type?: EnumReportTypeFilter<"Report"> | $Enums.ReportType
    status?: EnumReportStatusFilter<"Report"> | $Enums.ReportStatus
    assignedStaffId?: IntNullableFilter<"Report"> | number | null
    kilosCollected?: FloatNullableFilter<"Report"> | number | null
    assetAction?: EnumAssetActionNullableFilter<"Report"> | $Enums.AssetAction | null
    collectionDate?: DateTimeNullableFilter<"Report"> | Date | string | null
    userId?: IntFilter<"Report"> | number
    createdAt?: DateTimeFilter<"Report"> | Date | string
    updatedAt?: DateTimeFilter<"Report"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    assignedStaff?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type ReportOrderByWithRelationInput = {
    id?: SortOrder
    location?: SortOrder
    notes?: SortOrderInput | SortOrder
    photoUrl?: SortOrderInput | SortOrder
    urgency?: SortOrder
    wasteType?: SortOrder
    type?: SortOrder
    status?: SortOrder
    assignedStaffId?: SortOrderInput | SortOrder
    kilosCollected?: SortOrderInput | SortOrder
    assetAction?: SortOrderInput | SortOrder
    collectionDate?: SortOrderInput | SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    assignedStaff?: UserOrderByWithRelationInput
  }

  export type ReportWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ReportWhereInput | ReportWhereInput[]
    OR?: ReportWhereInput[]
    NOT?: ReportWhereInput | ReportWhereInput[]
    location?: StringFilter<"Report"> | string
    notes?: StringNullableFilter<"Report"> | string | null
    photoUrl?: StringNullableFilter<"Report"> | string | null
    urgency?: StringFilter<"Report"> | string
    wasteType?: StringFilter<"Report"> | string
    type?: EnumReportTypeFilter<"Report"> | $Enums.ReportType
    status?: EnumReportStatusFilter<"Report"> | $Enums.ReportStatus
    assignedStaffId?: IntNullableFilter<"Report"> | number | null
    kilosCollected?: FloatNullableFilter<"Report"> | number | null
    assetAction?: EnumAssetActionNullableFilter<"Report"> | $Enums.AssetAction | null
    collectionDate?: DateTimeNullableFilter<"Report"> | Date | string | null
    userId?: IntFilter<"Report"> | number
    createdAt?: DateTimeFilter<"Report"> | Date | string
    updatedAt?: DateTimeFilter<"Report"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    assignedStaff?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type ReportOrderByWithAggregationInput = {
    id?: SortOrder
    location?: SortOrder
    notes?: SortOrderInput | SortOrder
    photoUrl?: SortOrderInput | SortOrder
    urgency?: SortOrder
    wasteType?: SortOrder
    type?: SortOrder
    status?: SortOrder
    assignedStaffId?: SortOrderInput | SortOrder
    kilosCollected?: SortOrderInput | SortOrder
    assetAction?: SortOrderInput | SortOrder
    collectionDate?: SortOrderInput | SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ReportCountOrderByAggregateInput
    _avg?: ReportAvgOrderByAggregateInput
    _max?: ReportMaxOrderByAggregateInput
    _min?: ReportMinOrderByAggregateInput
    _sum?: ReportSumOrderByAggregateInput
  }

  export type ReportScalarWhereWithAggregatesInput = {
    AND?: ReportScalarWhereWithAggregatesInput | ReportScalarWhereWithAggregatesInput[]
    OR?: ReportScalarWhereWithAggregatesInput[]
    NOT?: ReportScalarWhereWithAggregatesInput | ReportScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Report"> | number
    location?: StringWithAggregatesFilter<"Report"> | string
    notes?: StringNullableWithAggregatesFilter<"Report"> | string | null
    photoUrl?: StringNullableWithAggregatesFilter<"Report"> | string | null
    urgency?: StringWithAggregatesFilter<"Report"> | string
    wasteType?: StringWithAggregatesFilter<"Report"> | string
    type?: EnumReportTypeWithAggregatesFilter<"Report"> | $Enums.ReportType
    status?: EnumReportStatusWithAggregatesFilter<"Report"> | $Enums.ReportStatus
    assignedStaffId?: IntNullableWithAggregatesFilter<"Report"> | number | null
    kilosCollected?: FloatNullableWithAggregatesFilter<"Report"> | number | null
    assetAction?: EnumAssetActionNullableWithAggregatesFilter<"Report"> | $Enums.AssetAction | null
    collectionDate?: DateTimeNullableWithAggregatesFilter<"Report"> | Date | string | null
    userId?: IntWithAggregatesFilter<"Report"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Report"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Report"> | Date | string
  }

  export type CampusNewsWhereInput = {
    AND?: CampusNewsWhereInput | CampusNewsWhereInput[]
    OR?: CampusNewsWhereInput[]
    NOT?: CampusNewsWhereInput | CampusNewsWhereInput[]
    id?: IntFilter<"CampusNews"> | number
    tag?: StringFilter<"CampusNews"> | string
    date?: StringFilter<"CampusNews"> | string
    title?: StringFilter<"CampusNews"> | string
    desc?: StringFilter<"CampusNews"> | string
    publishedById?: IntNullableFilter<"CampusNews"> | number | null
    createdAt?: DateTimeFilter<"CampusNews"> | Date | string
    updatedAt?: DateTimeFilter<"CampusNews"> | Date | string
    publishedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type CampusNewsOrderByWithRelationInput = {
    id?: SortOrder
    tag?: SortOrder
    date?: SortOrder
    title?: SortOrder
    desc?: SortOrder
    publishedById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    publishedBy?: UserOrderByWithRelationInput
  }

  export type CampusNewsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CampusNewsWhereInput | CampusNewsWhereInput[]
    OR?: CampusNewsWhereInput[]
    NOT?: CampusNewsWhereInput | CampusNewsWhereInput[]
    tag?: StringFilter<"CampusNews"> | string
    date?: StringFilter<"CampusNews"> | string
    title?: StringFilter<"CampusNews"> | string
    desc?: StringFilter<"CampusNews"> | string
    publishedById?: IntNullableFilter<"CampusNews"> | number | null
    createdAt?: DateTimeFilter<"CampusNews"> | Date | string
    updatedAt?: DateTimeFilter<"CampusNews"> | Date | string
    publishedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type CampusNewsOrderByWithAggregationInput = {
    id?: SortOrder
    tag?: SortOrder
    date?: SortOrder
    title?: SortOrder
    desc?: SortOrder
    publishedById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CampusNewsCountOrderByAggregateInput
    _avg?: CampusNewsAvgOrderByAggregateInput
    _max?: CampusNewsMaxOrderByAggregateInput
    _min?: CampusNewsMinOrderByAggregateInput
    _sum?: CampusNewsSumOrderByAggregateInput
  }

  export type CampusNewsScalarWhereWithAggregatesInput = {
    AND?: CampusNewsScalarWhereWithAggregatesInput | CampusNewsScalarWhereWithAggregatesInput[]
    OR?: CampusNewsScalarWhereWithAggregatesInput[]
    NOT?: CampusNewsScalarWhereWithAggregatesInput | CampusNewsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CampusNews"> | number
    tag?: StringWithAggregatesFilter<"CampusNews"> | string
    date?: StringWithAggregatesFilter<"CampusNews"> | string
    title?: StringWithAggregatesFilter<"CampusNews"> | string
    desc?: StringWithAggregatesFilter<"CampusNews"> | string
    publishedById?: IntNullableWithAggregatesFilter<"CampusNews"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"CampusNews"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CampusNews"> | Date | string
  }

  export type AssetCategoryWhereInput = {
    AND?: AssetCategoryWhereInput | AssetCategoryWhereInput[]
    OR?: AssetCategoryWhereInput[]
    NOT?: AssetCategoryWhereInput | AssetCategoryWhereInput[]
    id?: IntFilter<"AssetCategory"> | number
    name?: StringFilter<"AssetCategory"> | string
    label?: StringFilter<"AssetCategory"> | string
    enabled?: BoolFilter<"AssetCategory"> | boolean
    sortOrder?: IntFilter<"AssetCategory"> | number
    createdAt?: DateTimeFilter<"AssetCategory"> | Date | string
    updatedAt?: DateTimeFilter<"AssetCategory"> | Date | string
    itemPresets?: ItemPresetListRelationFilter
  }

  export type AssetCategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    label?: SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    itemPresets?: ItemPresetOrderByRelationAggregateInput
  }

  export type AssetCategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: AssetCategoryWhereInput | AssetCategoryWhereInput[]
    OR?: AssetCategoryWhereInput[]
    NOT?: AssetCategoryWhereInput | AssetCategoryWhereInput[]
    label?: StringFilter<"AssetCategory"> | string
    enabled?: BoolFilter<"AssetCategory"> | boolean
    sortOrder?: IntFilter<"AssetCategory"> | number
    createdAt?: DateTimeFilter<"AssetCategory"> | Date | string
    updatedAt?: DateTimeFilter<"AssetCategory"> | Date | string
    itemPresets?: ItemPresetListRelationFilter
  }, "id" | "name">

  export type AssetCategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    label?: SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AssetCategoryCountOrderByAggregateInput
    _avg?: AssetCategoryAvgOrderByAggregateInput
    _max?: AssetCategoryMaxOrderByAggregateInput
    _min?: AssetCategoryMinOrderByAggregateInput
    _sum?: AssetCategorySumOrderByAggregateInput
  }

  export type AssetCategoryScalarWhereWithAggregatesInput = {
    AND?: AssetCategoryScalarWhereWithAggregatesInput | AssetCategoryScalarWhereWithAggregatesInput[]
    OR?: AssetCategoryScalarWhereWithAggregatesInput[]
    NOT?: AssetCategoryScalarWhereWithAggregatesInput | AssetCategoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AssetCategory"> | number
    name?: StringWithAggregatesFilter<"AssetCategory"> | string
    label?: StringWithAggregatesFilter<"AssetCategory"> | string
    enabled?: BoolWithAggregatesFilter<"AssetCategory"> | boolean
    sortOrder?: IntWithAggregatesFilter<"AssetCategory"> | number
    createdAt?: DateTimeWithAggregatesFilter<"AssetCategory"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AssetCategory"> | Date | string
  }

  export type ItemPresetWhereInput = {
    AND?: ItemPresetWhereInput | ItemPresetWhereInput[]
    OR?: ItemPresetWhereInput[]
    NOT?: ItemPresetWhereInput | ItemPresetWhereInput[]
    id?: IntFilter<"ItemPreset"> | number
    name?: StringFilter<"ItemPreset"> | string
    icon?: StringFilter<"ItemPreset"> | string
    categoryId?: IntFilter<"ItemPreset"> | number
    enabled?: BoolFilter<"ItemPreset"> | boolean
    sortOrder?: IntFilter<"ItemPreset"> | number
    createdAt?: DateTimeFilter<"ItemPreset"> | Date | string
    updatedAt?: DateTimeFilter<"ItemPreset"> | Date | string
    category?: XOR<AssetCategoryScalarRelationFilter, AssetCategoryWhereInput>
  }

  export type ItemPresetOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    icon?: SortOrder
    categoryId?: SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    category?: AssetCategoryOrderByWithRelationInput
  }

  export type ItemPresetWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ItemPresetWhereInput | ItemPresetWhereInput[]
    OR?: ItemPresetWhereInput[]
    NOT?: ItemPresetWhereInput | ItemPresetWhereInput[]
    name?: StringFilter<"ItemPreset"> | string
    icon?: StringFilter<"ItemPreset"> | string
    categoryId?: IntFilter<"ItemPreset"> | number
    enabled?: BoolFilter<"ItemPreset"> | boolean
    sortOrder?: IntFilter<"ItemPreset"> | number
    createdAt?: DateTimeFilter<"ItemPreset"> | Date | string
    updatedAt?: DateTimeFilter<"ItemPreset"> | Date | string
    category?: XOR<AssetCategoryScalarRelationFilter, AssetCategoryWhereInput>
  }, "id">

  export type ItemPresetOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    icon?: SortOrder
    categoryId?: SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ItemPresetCountOrderByAggregateInput
    _avg?: ItemPresetAvgOrderByAggregateInput
    _max?: ItemPresetMaxOrderByAggregateInput
    _min?: ItemPresetMinOrderByAggregateInput
    _sum?: ItemPresetSumOrderByAggregateInput
  }

  export type ItemPresetScalarWhereWithAggregatesInput = {
    AND?: ItemPresetScalarWhereWithAggregatesInput | ItemPresetScalarWhereWithAggregatesInput[]
    OR?: ItemPresetScalarWhereWithAggregatesInput[]
    NOT?: ItemPresetScalarWhereWithAggregatesInput | ItemPresetScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ItemPreset"> | number
    name?: StringWithAggregatesFilter<"ItemPreset"> | string
    icon?: StringWithAggregatesFilter<"ItemPreset"> | string
    categoryId?: IntWithAggregatesFilter<"ItemPreset"> | number
    enabled?: BoolWithAggregatesFilter<"ItemPreset"> | boolean
    sortOrder?: IntWithAggregatesFilter<"ItemPreset"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ItemPreset"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ItemPreset"> | Date | string
  }

  export type LocationWhereInput = {
    AND?: LocationWhereInput | LocationWhereInput[]
    OR?: LocationWhereInput[]
    NOT?: LocationWhereInput | LocationWhereInput[]
    id?: IntFilter<"Location"> | number
    code?: StringFilter<"Location"> | string
    name?: StringFilter<"Location"> | string
    type?: EnumLocationTypeFilter<"Location"> | $Enums.LocationType
    building?: StringNullableFilter<"Location"> | string | null
    enabled?: BoolFilter<"Location"> | boolean
    sortOrder?: IntFilter<"Location"> | number
    mapX?: FloatNullableFilter<"Location"> | number | null
    mapY?: FloatNullableFilter<"Location"> | number | null
    createdAt?: DateTimeFilter<"Location"> | Date | string
    updatedAt?: DateTimeFilter<"Location"> | Date | string
  }

  export type LocationOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    type?: SortOrder
    building?: SortOrderInput | SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    mapX?: SortOrderInput | SortOrder
    mapY?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LocationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    code?: string
    AND?: LocationWhereInput | LocationWhereInput[]
    OR?: LocationWhereInput[]
    NOT?: LocationWhereInput | LocationWhereInput[]
    name?: StringFilter<"Location"> | string
    type?: EnumLocationTypeFilter<"Location"> | $Enums.LocationType
    building?: StringNullableFilter<"Location"> | string | null
    enabled?: BoolFilter<"Location"> | boolean
    sortOrder?: IntFilter<"Location"> | number
    mapX?: FloatNullableFilter<"Location"> | number | null
    mapY?: FloatNullableFilter<"Location"> | number | null
    createdAt?: DateTimeFilter<"Location"> | Date | string
    updatedAt?: DateTimeFilter<"Location"> | Date | string
  }, "id" | "code">

  export type LocationOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    type?: SortOrder
    building?: SortOrderInput | SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    mapX?: SortOrderInput | SortOrder
    mapY?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LocationCountOrderByAggregateInput
    _avg?: LocationAvgOrderByAggregateInput
    _max?: LocationMaxOrderByAggregateInput
    _min?: LocationMinOrderByAggregateInput
    _sum?: LocationSumOrderByAggregateInput
  }

  export type LocationScalarWhereWithAggregatesInput = {
    AND?: LocationScalarWhereWithAggregatesInput | LocationScalarWhereWithAggregatesInput[]
    OR?: LocationScalarWhereWithAggregatesInput[]
    NOT?: LocationScalarWhereWithAggregatesInput | LocationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Location"> | number
    code?: StringWithAggregatesFilter<"Location"> | string
    name?: StringWithAggregatesFilter<"Location"> | string
    type?: EnumLocationTypeWithAggregatesFilter<"Location"> | $Enums.LocationType
    building?: StringNullableWithAggregatesFilter<"Location"> | string | null
    enabled?: BoolWithAggregatesFilter<"Location"> | boolean
    sortOrder?: IntWithAggregatesFilter<"Location"> | number
    mapX?: FloatNullableWithAggregatesFilter<"Location"> | number | null
    mapY?: FloatNullableWithAggregatesFilter<"Location"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Location"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Location"> | Date | string
  }

  export type CampusMapWhereInput = {
    AND?: CampusMapWhereInput | CampusMapWhereInput[]
    OR?: CampusMapWhereInput[]
    NOT?: CampusMapWhereInput | CampusMapWhereInput[]
    id?: IntFilter<"CampusMap"> | number
    imageData?: StringFilter<"CampusMap"> | string
    imageName?: StringNullableFilter<"CampusMap"> | string | null
    imageSize?: StringNullableFilter<"CampusMap"> | string | null
    uploadedById?: IntNullableFilter<"CampusMap"> | number | null
    createdAt?: DateTimeFilter<"CampusMap"> | Date | string
    updatedAt?: DateTimeFilter<"CampusMap"> | Date | string
  }

  export type CampusMapOrderByWithRelationInput = {
    id?: SortOrder
    imageData?: SortOrder
    imageName?: SortOrderInput | SortOrder
    imageSize?: SortOrderInput | SortOrder
    uploadedById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampusMapWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CampusMapWhereInput | CampusMapWhereInput[]
    OR?: CampusMapWhereInput[]
    NOT?: CampusMapWhereInput | CampusMapWhereInput[]
    imageData?: StringFilter<"CampusMap"> | string
    imageName?: StringNullableFilter<"CampusMap"> | string | null
    imageSize?: StringNullableFilter<"CampusMap"> | string | null
    uploadedById?: IntNullableFilter<"CampusMap"> | number | null
    createdAt?: DateTimeFilter<"CampusMap"> | Date | string
    updatedAt?: DateTimeFilter<"CampusMap"> | Date | string
  }, "id">

  export type CampusMapOrderByWithAggregationInput = {
    id?: SortOrder
    imageData?: SortOrder
    imageName?: SortOrderInput | SortOrder
    imageSize?: SortOrderInput | SortOrder
    uploadedById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CampusMapCountOrderByAggregateInput
    _avg?: CampusMapAvgOrderByAggregateInput
    _max?: CampusMapMaxOrderByAggregateInput
    _min?: CampusMapMinOrderByAggregateInput
    _sum?: CampusMapSumOrderByAggregateInput
  }

  export type CampusMapScalarWhereWithAggregatesInput = {
    AND?: CampusMapScalarWhereWithAggregatesInput | CampusMapScalarWhereWithAggregatesInput[]
    OR?: CampusMapScalarWhereWithAggregatesInput[]
    NOT?: CampusMapScalarWhereWithAggregatesInput | CampusMapScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CampusMap"> | number
    imageData?: StringWithAggregatesFilter<"CampusMap"> | string
    imageName?: StringNullableWithAggregatesFilter<"CampusMap"> | string | null
    imageSize?: StringNullableWithAggregatesFilter<"CampusMap"> | string | null
    uploadedById?: IntNullableWithAggregatesFilter<"CampusMap"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"CampusMap"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CampusMap"> | Date | string
  }

  export type BinStatusWhereInput = {
    AND?: BinStatusWhereInput | BinStatusWhereInput[]
    OR?: BinStatusWhereInput[]
    NOT?: BinStatusWhereInput | BinStatusWhereInput[]
    id?: IntFilter<"BinStatus"> | number
    locationId?: IntFilter<"BinStatus"> | number
    fillStatus?: StringFilter<"BinStatus"> | string
    lastUpdated?: DateTimeFilter<"BinStatus"> | Date | string
    updatedBy?: IntNullableFilter<"BinStatus"> | number | null
    createdAt?: DateTimeFilter<"BinStatus"> | Date | string
    updatedAt?: DateTimeFilter<"BinStatus"> | Date | string
  }

  export type BinStatusOrderByWithRelationInput = {
    id?: SortOrder
    locationId?: SortOrder
    fillStatus?: SortOrder
    lastUpdated?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BinStatusWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    locationId?: number
    AND?: BinStatusWhereInput | BinStatusWhereInput[]
    OR?: BinStatusWhereInput[]
    NOT?: BinStatusWhereInput | BinStatusWhereInput[]
    fillStatus?: StringFilter<"BinStatus"> | string
    lastUpdated?: DateTimeFilter<"BinStatus"> | Date | string
    updatedBy?: IntNullableFilter<"BinStatus"> | number | null
    createdAt?: DateTimeFilter<"BinStatus"> | Date | string
    updatedAt?: DateTimeFilter<"BinStatus"> | Date | string
  }, "id" | "locationId">

  export type BinStatusOrderByWithAggregationInput = {
    id?: SortOrder
    locationId?: SortOrder
    fillStatus?: SortOrder
    lastUpdated?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BinStatusCountOrderByAggregateInput
    _avg?: BinStatusAvgOrderByAggregateInput
    _max?: BinStatusMaxOrderByAggregateInput
    _min?: BinStatusMinOrderByAggregateInput
    _sum?: BinStatusSumOrderByAggregateInput
  }

  export type BinStatusScalarWhereWithAggregatesInput = {
    AND?: BinStatusScalarWhereWithAggregatesInput | BinStatusScalarWhereWithAggregatesInput[]
    OR?: BinStatusScalarWhereWithAggregatesInput[]
    NOT?: BinStatusScalarWhereWithAggregatesInput | BinStatusScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"BinStatus"> | number
    locationId?: IntWithAggregatesFilter<"BinStatus"> | number
    fillStatus?: StringWithAggregatesFilter<"BinStatus"> | string
    lastUpdated?: DateTimeWithAggregatesFilter<"BinStatus"> | Date | string
    updatedBy?: IntNullableWithAggregatesFilter<"BinStatus"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"BinStatus"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BinStatus"> | Date | string
  }

  export type SystemSettingsWhereInput = {
    AND?: SystemSettingsWhereInput | SystemSettingsWhereInput[]
    OR?: SystemSettingsWhereInput[]
    NOT?: SystemSettingsWhereInput | SystemSettingsWhereInput[]
    id?: IntFilter<"SystemSettings"> | number
    key?: StringFilter<"SystemSettings"> | string
    value?: StringFilter<"SystemSettings"> | string
    label?: StringNullableFilter<"SystemSettings"> | string | null
    updatedById?: IntNullableFilter<"SystemSettings"> | number | null
    createdAt?: DateTimeFilter<"SystemSettings"> | Date | string
    updatedAt?: DateTimeFilter<"SystemSettings"> | Date | string
  }

  export type SystemSettingsOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    label?: SortOrderInput | SortOrder
    updatedById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemSettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    key?: string
    AND?: SystemSettingsWhereInput | SystemSettingsWhereInput[]
    OR?: SystemSettingsWhereInput[]
    NOT?: SystemSettingsWhereInput | SystemSettingsWhereInput[]
    value?: StringFilter<"SystemSettings"> | string
    label?: StringNullableFilter<"SystemSettings"> | string | null
    updatedById?: IntNullableFilter<"SystemSettings"> | number | null
    createdAt?: DateTimeFilter<"SystemSettings"> | Date | string
    updatedAt?: DateTimeFilter<"SystemSettings"> | Date | string
  }, "id" | "key">

  export type SystemSettingsOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    label?: SortOrderInput | SortOrder
    updatedById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SystemSettingsCountOrderByAggregateInput
    _avg?: SystemSettingsAvgOrderByAggregateInput
    _max?: SystemSettingsMaxOrderByAggregateInput
    _min?: SystemSettingsMinOrderByAggregateInput
    _sum?: SystemSettingsSumOrderByAggregateInput
  }

  export type SystemSettingsScalarWhereWithAggregatesInput = {
    AND?: SystemSettingsScalarWhereWithAggregatesInput | SystemSettingsScalarWhereWithAggregatesInput[]
    OR?: SystemSettingsScalarWhereWithAggregatesInput[]
    NOT?: SystemSettingsScalarWhereWithAggregatesInput | SystemSettingsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SystemSettings"> | number
    key?: StringWithAggregatesFilter<"SystemSettings"> | string
    value?: StringWithAggregatesFilter<"SystemSettings"> | string
    label?: StringNullableWithAggregatesFilter<"SystemSettings"> | string | null
    updatedById?: IntNullableWithAggregatesFilter<"SystemSettings"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"SystemSettings"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SystemSettings"> | Date | string
  }

  export type WasteTypeWhereInput = {
    AND?: WasteTypeWhereInput | WasteTypeWhereInput[]
    OR?: WasteTypeWhereInput[]
    NOT?: WasteTypeWhereInput | WasteTypeWhereInput[]
    id?: IntFilter<"WasteType"> | number
    key?: StringFilter<"WasteType"> | string
    label?: StringFilter<"WasteType"> | string
    emoji?: StringFilter<"WasteType"> | string
    enabled?: BoolFilter<"WasteType"> | boolean
    sortOrder?: IntFilter<"WasteType"> | number
    createdAt?: DateTimeFilter<"WasteType"> | Date | string
    updatedAt?: DateTimeFilter<"WasteType"> | Date | string
  }

  export type WasteTypeOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    label?: SortOrder
    emoji?: SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WasteTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    key?: string
    AND?: WasteTypeWhereInput | WasteTypeWhereInput[]
    OR?: WasteTypeWhereInput[]
    NOT?: WasteTypeWhereInput | WasteTypeWhereInput[]
    label?: StringFilter<"WasteType"> | string
    emoji?: StringFilter<"WasteType"> | string
    enabled?: BoolFilter<"WasteType"> | boolean
    sortOrder?: IntFilter<"WasteType"> | number
    createdAt?: DateTimeFilter<"WasteType"> | Date | string
    updatedAt?: DateTimeFilter<"WasteType"> | Date | string
  }, "id" | "key">

  export type WasteTypeOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    label?: SortOrder
    emoji?: SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WasteTypeCountOrderByAggregateInput
    _avg?: WasteTypeAvgOrderByAggregateInput
    _max?: WasteTypeMaxOrderByAggregateInput
    _min?: WasteTypeMinOrderByAggregateInput
    _sum?: WasteTypeSumOrderByAggregateInput
  }

  export type WasteTypeScalarWhereWithAggregatesInput = {
    AND?: WasteTypeScalarWhereWithAggregatesInput | WasteTypeScalarWhereWithAggregatesInput[]
    OR?: WasteTypeScalarWhereWithAggregatesInput[]
    NOT?: WasteTypeScalarWhereWithAggregatesInput | WasteTypeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"WasteType"> | number
    key?: StringWithAggregatesFilter<"WasteType"> | string
    label?: StringWithAggregatesFilter<"WasteType"> | string
    emoji?: StringWithAggregatesFilter<"WasteType"> | string
    enabled?: BoolWithAggregatesFilter<"WasteType"> | boolean
    sortOrder?: IntWithAggregatesFilter<"WasteType"> | number
    createdAt?: DateTimeWithAggregatesFilter<"WasteType"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WasteType"> | Date | string
  }

  export type UrgencyLevelWhereInput = {
    AND?: UrgencyLevelWhereInput | UrgencyLevelWhereInput[]
    OR?: UrgencyLevelWhereInput[]
    NOT?: UrgencyLevelWhereInput | UrgencyLevelWhereInput[]
    id?: IntFilter<"UrgencyLevel"> | number
    key?: StringFilter<"UrgencyLevel"> | string
    label?: StringFilter<"UrgencyLevel"> | string
    description?: StringNullableFilter<"UrgencyLevel"> | string | null
    color?: StringNullableFilter<"UrgencyLevel"> | string | null
    enabled?: BoolFilter<"UrgencyLevel"> | boolean
    sortOrder?: IntFilter<"UrgencyLevel"> | number
    createdAt?: DateTimeFilter<"UrgencyLevel"> | Date | string
    updatedAt?: DateTimeFilter<"UrgencyLevel"> | Date | string
  }

  export type UrgencyLevelOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    label?: SortOrder
    description?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UrgencyLevelWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    key?: string
    AND?: UrgencyLevelWhereInput | UrgencyLevelWhereInput[]
    OR?: UrgencyLevelWhereInput[]
    NOT?: UrgencyLevelWhereInput | UrgencyLevelWhereInput[]
    label?: StringFilter<"UrgencyLevel"> | string
    description?: StringNullableFilter<"UrgencyLevel"> | string | null
    color?: StringNullableFilter<"UrgencyLevel"> | string | null
    enabled?: BoolFilter<"UrgencyLevel"> | boolean
    sortOrder?: IntFilter<"UrgencyLevel"> | number
    createdAt?: DateTimeFilter<"UrgencyLevel"> | Date | string
    updatedAt?: DateTimeFilter<"UrgencyLevel"> | Date | string
  }, "id" | "key">

  export type UrgencyLevelOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    label?: SortOrder
    description?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UrgencyLevelCountOrderByAggregateInput
    _avg?: UrgencyLevelAvgOrderByAggregateInput
    _max?: UrgencyLevelMaxOrderByAggregateInput
    _min?: UrgencyLevelMinOrderByAggregateInput
    _sum?: UrgencyLevelSumOrderByAggregateInput
  }

  export type UrgencyLevelScalarWhereWithAggregatesInput = {
    AND?: UrgencyLevelScalarWhereWithAggregatesInput | UrgencyLevelScalarWhereWithAggregatesInput[]
    OR?: UrgencyLevelScalarWhereWithAggregatesInput[]
    NOT?: UrgencyLevelScalarWhereWithAggregatesInput | UrgencyLevelScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UrgencyLevel"> | number
    key?: StringWithAggregatesFilter<"UrgencyLevel"> | string
    label?: StringWithAggregatesFilter<"UrgencyLevel"> | string
    description?: StringNullableWithAggregatesFilter<"UrgencyLevel"> | string | null
    color?: StringNullableWithAggregatesFilter<"UrgencyLevel"> | string | null
    enabled?: BoolWithAggregatesFilter<"UrgencyLevel"> | boolean
    sortOrder?: IntWithAggregatesFilter<"UrgencyLevel"> | number
    createdAt?: DateTimeWithAggregatesFilter<"UrgencyLevel"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UrgencyLevel"> | Date | string
  }

  export type AssetConditionWhereInput = {
    AND?: AssetConditionWhereInput | AssetConditionWhereInput[]
    OR?: AssetConditionWhereInput[]
    NOT?: AssetConditionWhereInput | AssetConditionWhereInput[]
    id?: IntFilter<"AssetCondition"> | number
    key?: StringFilter<"AssetCondition"> | string
    label?: StringFilter<"AssetCondition"> | string
    description?: StringNullableFilter<"AssetCondition"> | string | null
    enabled?: BoolFilter<"AssetCondition"> | boolean
    sortOrder?: IntFilter<"AssetCondition"> | number
    createdAt?: DateTimeFilter<"AssetCondition"> | Date | string
    updatedAt?: DateTimeFilter<"AssetCondition"> | Date | string
  }

  export type AssetConditionOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    label?: SortOrder
    description?: SortOrderInput | SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssetConditionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    key?: string
    AND?: AssetConditionWhereInput | AssetConditionWhereInput[]
    OR?: AssetConditionWhereInput[]
    NOT?: AssetConditionWhereInput | AssetConditionWhereInput[]
    label?: StringFilter<"AssetCondition"> | string
    description?: StringNullableFilter<"AssetCondition"> | string | null
    enabled?: BoolFilter<"AssetCondition"> | boolean
    sortOrder?: IntFilter<"AssetCondition"> | number
    createdAt?: DateTimeFilter<"AssetCondition"> | Date | string
    updatedAt?: DateTimeFilter<"AssetCondition"> | Date | string
  }, "id" | "key">

  export type AssetConditionOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    label?: SortOrder
    description?: SortOrderInput | SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AssetConditionCountOrderByAggregateInput
    _avg?: AssetConditionAvgOrderByAggregateInput
    _max?: AssetConditionMaxOrderByAggregateInput
    _min?: AssetConditionMinOrderByAggregateInput
    _sum?: AssetConditionSumOrderByAggregateInput
  }

  export type AssetConditionScalarWhereWithAggregatesInput = {
    AND?: AssetConditionScalarWhereWithAggregatesInput | AssetConditionScalarWhereWithAggregatesInput[]
    OR?: AssetConditionScalarWhereWithAggregatesInput[]
    NOT?: AssetConditionScalarWhereWithAggregatesInput | AssetConditionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AssetCondition"> | number
    key?: StringWithAggregatesFilter<"AssetCondition"> | string
    label?: StringWithAggregatesFilter<"AssetCondition"> | string
    description?: StringNullableWithAggregatesFilter<"AssetCondition"> | string | null
    enabled?: BoolWithAggregatesFilter<"AssetCondition"> | boolean
    sortOrder?: IntWithAggregatesFilter<"AssetCondition"> | number
    createdAt?: DateTimeWithAggregatesFilter<"AssetCondition"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AssetCondition"> | Date | string
  }

  export type UserCreateInput = {
    username: string
    password: string
    role?: $Enums.Role
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    studentId?: string | null
    lrn?: string | null
    course?: string | null
    section?: string | null
    department?: string | null
    points?: number
    reports?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedReports?: ReportCreateNestedManyWithoutUserInput
    assignedReports?: ReportCreateNestedManyWithoutAssignedStaffInput
    newsPosts?: CampusNewsCreateNestedManyWithoutPublishedByInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    username: string
    password: string
    role?: $Enums.Role
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    studentId?: string | null
    lrn?: string | null
    course?: string | null
    section?: string | null
    department?: string | null
    points?: number
    reports?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedReports?: ReportUncheckedCreateNestedManyWithoutUserInput
    assignedReports?: ReportUncheckedCreateNestedManyWithoutAssignedStaffInput
    newsPosts?: CampusNewsUncheckedCreateNestedManyWithoutPublishedByInput
  }

  export type UserUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    lrn?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    reports?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedReports?: ReportUpdateManyWithoutUserNestedInput
    assignedReports?: ReportUpdateManyWithoutAssignedStaffNestedInput
    newsPosts?: CampusNewsUpdateManyWithoutPublishedByNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    lrn?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    reports?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedReports?: ReportUncheckedUpdateManyWithoutUserNestedInput
    assignedReports?: ReportUncheckedUpdateManyWithoutAssignedStaffNestedInput
    newsPosts?: CampusNewsUncheckedUpdateManyWithoutPublishedByNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    username: string
    password: string
    role?: $Enums.Role
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    studentId?: string | null
    lrn?: string | null
    course?: string | null
    section?: string | null
    department?: string | null
    points?: number
    reports?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    lrn?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    reports?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    lrn?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    reports?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportCreateInput = {
    location: string
    notes?: string | null
    photoUrl?: string | null
    urgency?: string
    wasteType?: string
    type?: $Enums.ReportType
    status?: $Enums.ReportStatus
    kilosCollected?: number | null
    assetAction?: $Enums.AssetAction | null
    collectionDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSubmittedReportsInput
    assignedStaff?: UserCreateNestedOneWithoutAssignedReportsInput
  }

  export type ReportUncheckedCreateInput = {
    id?: number
    location: string
    notes?: string | null
    photoUrl?: string | null
    urgency?: string
    wasteType?: string
    type?: $Enums.ReportType
    status?: $Enums.ReportStatus
    assignedStaffId?: number | null
    kilosCollected?: number | null
    assetAction?: $Enums.AssetAction | null
    collectionDate?: Date | string | null
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReportUpdateInput = {
    location?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: StringFieldUpdateOperationsInput | string
    wasteType?: StringFieldUpdateOperationsInput | string
    type?: EnumReportTypeFieldUpdateOperationsInput | $Enums.ReportType
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    kilosCollected?: NullableFloatFieldUpdateOperationsInput | number | null
    assetAction?: NullableEnumAssetActionFieldUpdateOperationsInput | $Enums.AssetAction | null
    collectionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSubmittedReportsNestedInput
    assignedStaff?: UserUpdateOneWithoutAssignedReportsNestedInput
  }

  export type ReportUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    location?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: StringFieldUpdateOperationsInput | string
    wasteType?: StringFieldUpdateOperationsInput | string
    type?: EnumReportTypeFieldUpdateOperationsInput | $Enums.ReportType
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    assignedStaffId?: NullableIntFieldUpdateOperationsInput | number | null
    kilosCollected?: NullableFloatFieldUpdateOperationsInput | number | null
    assetAction?: NullableEnumAssetActionFieldUpdateOperationsInput | $Enums.AssetAction | null
    collectionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportCreateManyInput = {
    id?: number
    location: string
    notes?: string | null
    photoUrl?: string | null
    urgency?: string
    wasteType?: string
    type?: $Enums.ReportType
    status?: $Enums.ReportStatus
    assignedStaffId?: number | null
    kilosCollected?: number | null
    assetAction?: $Enums.AssetAction | null
    collectionDate?: Date | string | null
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReportUpdateManyMutationInput = {
    location?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: StringFieldUpdateOperationsInput | string
    wasteType?: StringFieldUpdateOperationsInput | string
    type?: EnumReportTypeFieldUpdateOperationsInput | $Enums.ReportType
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    kilosCollected?: NullableFloatFieldUpdateOperationsInput | number | null
    assetAction?: NullableEnumAssetActionFieldUpdateOperationsInput | $Enums.AssetAction | null
    collectionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    location?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: StringFieldUpdateOperationsInput | string
    wasteType?: StringFieldUpdateOperationsInput | string
    type?: EnumReportTypeFieldUpdateOperationsInput | $Enums.ReportType
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    assignedStaffId?: NullableIntFieldUpdateOperationsInput | number | null
    kilosCollected?: NullableFloatFieldUpdateOperationsInput | number | null
    assetAction?: NullableEnumAssetActionFieldUpdateOperationsInput | $Enums.AssetAction | null
    collectionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampusNewsCreateInput = {
    tag: string
    date: string
    title: string
    desc: string
    createdAt?: Date | string
    updatedAt?: Date | string
    publishedBy?: UserCreateNestedOneWithoutNewsPostsInput
  }

  export type CampusNewsUncheckedCreateInput = {
    id?: number
    tag: string
    date: string
    title: string
    desc: string
    publishedById?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampusNewsUpdateInput = {
    tag?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedBy?: UserUpdateOneWithoutNewsPostsNestedInput
  }

  export type CampusNewsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    tag?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    publishedById?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampusNewsCreateManyInput = {
    id?: number
    tag: string
    date: string
    title: string
    desc: string
    publishedById?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampusNewsUpdateManyMutationInput = {
    tag?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampusNewsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    tag?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    publishedById?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssetCategoryCreateInput = {
    name: string
    label: string
    enabled?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    itemPresets?: ItemPresetCreateNestedManyWithoutCategoryInput
  }

  export type AssetCategoryUncheckedCreateInput = {
    id?: number
    name: string
    label: string
    enabled?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    itemPresets?: ItemPresetUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type AssetCategoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    itemPresets?: ItemPresetUpdateManyWithoutCategoryNestedInput
  }

  export type AssetCategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    itemPresets?: ItemPresetUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type AssetCategoryCreateManyInput = {
    id?: number
    name: string
    label: string
    enabled?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssetCategoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssetCategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemPresetCreateInput = {
    name: string
    icon?: string
    enabled?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    category: AssetCategoryCreateNestedOneWithoutItemPresetsInput
  }

  export type ItemPresetUncheckedCreateInput = {
    id?: number
    name: string
    icon?: string
    categoryId: number
    enabled?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemPresetUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: AssetCategoryUpdateOneRequiredWithoutItemPresetsNestedInput
  }

  export type ItemPresetUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    categoryId?: IntFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemPresetCreateManyInput = {
    id?: number
    name: string
    icon?: string
    categoryId: number
    enabled?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemPresetUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemPresetUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    categoryId?: IntFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationCreateInput = {
    code: string
    name: string
    type: $Enums.LocationType
    building?: string | null
    enabled?: boolean
    sortOrder?: number
    mapX?: number | null
    mapY?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LocationUncheckedCreateInput = {
    id?: number
    code: string
    name: string
    type: $Enums.LocationType
    building?: string | null
    enabled?: boolean
    sortOrder?: number
    mapX?: number | null
    mapY?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LocationUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumLocationTypeFieldUpdateOperationsInput | $Enums.LocationType
    building?: NullableStringFieldUpdateOperationsInput | string | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    mapX?: NullableFloatFieldUpdateOperationsInput | number | null
    mapY?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumLocationTypeFieldUpdateOperationsInput | $Enums.LocationType
    building?: NullableStringFieldUpdateOperationsInput | string | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    mapX?: NullableFloatFieldUpdateOperationsInput | number | null
    mapY?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationCreateManyInput = {
    id?: number
    code: string
    name: string
    type: $Enums.LocationType
    building?: string | null
    enabled?: boolean
    sortOrder?: number
    mapX?: number | null
    mapY?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LocationUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumLocationTypeFieldUpdateOperationsInput | $Enums.LocationType
    building?: NullableStringFieldUpdateOperationsInput | string | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    mapX?: NullableFloatFieldUpdateOperationsInput | number | null
    mapY?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumLocationTypeFieldUpdateOperationsInput | $Enums.LocationType
    building?: NullableStringFieldUpdateOperationsInput | string | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    mapX?: NullableFloatFieldUpdateOperationsInput | number | null
    mapY?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampusMapCreateInput = {
    imageData: string
    imageName?: string | null
    imageSize?: string | null
    uploadedById?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampusMapUncheckedCreateInput = {
    id?: number
    imageData: string
    imageName?: string | null
    imageSize?: string | null
    uploadedById?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampusMapUpdateInput = {
    imageData?: StringFieldUpdateOperationsInput | string
    imageName?: NullableStringFieldUpdateOperationsInput | string | null
    imageSize?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedById?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampusMapUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    imageData?: StringFieldUpdateOperationsInput | string
    imageName?: NullableStringFieldUpdateOperationsInput | string | null
    imageSize?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedById?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampusMapCreateManyInput = {
    id?: number
    imageData: string
    imageName?: string | null
    imageSize?: string | null
    uploadedById?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampusMapUpdateManyMutationInput = {
    imageData?: StringFieldUpdateOperationsInput | string
    imageName?: NullableStringFieldUpdateOperationsInput | string | null
    imageSize?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedById?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampusMapUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    imageData?: StringFieldUpdateOperationsInput | string
    imageName?: NullableStringFieldUpdateOperationsInput | string | null
    imageSize?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedById?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BinStatusCreateInput = {
    locationId: number
    fillStatus?: string
    lastUpdated?: Date | string
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BinStatusUncheckedCreateInput = {
    id?: number
    locationId: number
    fillStatus?: string
    lastUpdated?: Date | string
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BinStatusUpdateInput = {
    locationId?: IntFieldUpdateOperationsInput | number
    fillStatus?: StringFieldUpdateOperationsInput | string
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BinStatusUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    locationId?: IntFieldUpdateOperationsInput | number
    fillStatus?: StringFieldUpdateOperationsInput | string
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BinStatusCreateManyInput = {
    id?: number
    locationId: number
    fillStatus?: string
    lastUpdated?: Date | string
    updatedBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BinStatusUpdateManyMutationInput = {
    locationId?: IntFieldUpdateOperationsInput | number
    fillStatus?: StringFieldUpdateOperationsInput | string
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BinStatusUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    locationId?: IntFieldUpdateOperationsInput | number
    fillStatus?: StringFieldUpdateOperationsInput | string
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemSettingsCreateInput = {
    key: string
    value: string
    label?: string | null
    updatedById?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SystemSettingsUncheckedCreateInput = {
    id?: number
    key: string
    value: string
    label?: string | null
    updatedById?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SystemSettingsUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    label?: NullableStringFieldUpdateOperationsInput | string | null
    updatedById?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemSettingsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    label?: NullableStringFieldUpdateOperationsInput | string | null
    updatedById?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemSettingsCreateManyInput = {
    id?: number
    key: string
    value: string
    label?: string | null
    updatedById?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SystemSettingsUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    label?: NullableStringFieldUpdateOperationsInput | string | null
    updatedById?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemSettingsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    label?: NullableStringFieldUpdateOperationsInput | string | null
    updatedById?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WasteTypeCreateInput = {
    key: string
    label: string
    emoji?: string
    enabled?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WasteTypeUncheckedCreateInput = {
    id?: number
    key: string
    label: string
    emoji?: string
    enabled?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WasteTypeUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WasteTypeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WasteTypeCreateManyInput = {
    id?: number
    key: string
    label: string
    emoji?: string
    enabled?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WasteTypeUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WasteTypeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UrgencyLevelCreateInput = {
    key: string
    label: string
    description?: string | null
    color?: string | null
    enabled?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UrgencyLevelUncheckedCreateInput = {
    id?: number
    key: string
    label: string
    description?: string | null
    color?: string | null
    enabled?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UrgencyLevelUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UrgencyLevelUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UrgencyLevelCreateManyInput = {
    id?: number
    key: string
    label: string
    description?: string | null
    color?: string | null
    enabled?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UrgencyLevelUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UrgencyLevelUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssetConditionCreateInput = {
    key: string
    label: string
    description?: string | null
    enabled?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssetConditionUncheckedCreateInput = {
    id?: number
    key: string
    label: string
    description?: string | null
    enabled?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssetConditionUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssetConditionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssetConditionCreateManyInput = {
    id?: number
    key: string
    label: string
    description?: string | null
    enabled?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssetConditionUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssetConditionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ReportListRelationFilter = {
    every?: ReportWhereInput
    some?: ReportWhereInput
    none?: ReportWhereInput
  }

  export type CampusNewsListRelationFilter = {
    every?: CampusNewsWhereInput
    some?: CampusNewsWhereInput
    none?: CampusNewsWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ReportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CampusNewsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    studentId?: SortOrder
    lrn?: SortOrder
    course?: SortOrder
    section?: SortOrder
    department?: SortOrder
    points?: SortOrder
    reports?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    points?: SortOrder
    reports?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    studentId?: SortOrder
    lrn?: SortOrder
    course?: SortOrder
    section?: SortOrder
    department?: SortOrder
    points?: SortOrder
    reports?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    studentId?: SortOrder
    lrn?: SortOrder
    course?: SortOrder
    section?: SortOrder
    department?: SortOrder
    points?: SortOrder
    reports?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    points?: SortOrder
    reports?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumReportTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportType | EnumReportTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ReportType[] | ListEnumReportTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReportType[] | ListEnumReportTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumReportTypeFilter<$PrismaModel> | $Enums.ReportType
  }

  export type EnumReportStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | EnumReportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReportStatusFilter<$PrismaModel> | $Enums.ReportStatus
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type EnumAssetActionNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetAction | EnumAssetActionFieldRefInput<$PrismaModel> | null
    in?: $Enums.AssetAction[] | ListEnumAssetActionFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AssetAction[] | ListEnumAssetActionFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAssetActionNullableFilter<$PrismaModel> | $Enums.AssetAction | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type ReportCountOrderByAggregateInput = {
    id?: SortOrder
    location?: SortOrder
    notes?: SortOrder
    photoUrl?: SortOrder
    urgency?: SortOrder
    wasteType?: SortOrder
    type?: SortOrder
    status?: SortOrder
    assignedStaffId?: SortOrder
    kilosCollected?: SortOrder
    assetAction?: SortOrder
    collectionDate?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReportAvgOrderByAggregateInput = {
    id?: SortOrder
    assignedStaffId?: SortOrder
    kilosCollected?: SortOrder
    userId?: SortOrder
  }

  export type ReportMaxOrderByAggregateInput = {
    id?: SortOrder
    location?: SortOrder
    notes?: SortOrder
    photoUrl?: SortOrder
    urgency?: SortOrder
    wasteType?: SortOrder
    type?: SortOrder
    status?: SortOrder
    assignedStaffId?: SortOrder
    kilosCollected?: SortOrder
    assetAction?: SortOrder
    collectionDate?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReportMinOrderByAggregateInput = {
    id?: SortOrder
    location?: SortOrder
    notes?: SortOrder
    photoUrl?: SortOrder
    urgency?: SortOrder
    wasteType?: SortOrder
    type?: SortOrder
    status?: SortOrder
    assignedStaffId?: SortOrder
    kilosCollected?: SortOrder
    assetAction?: SortOrder
    collectionDate?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReportSumOrderByAggregateInput = {
    id?: SortOrder
    assignedStaffId?: SortOrder
    kilosCollected?: SortOrder
    userId?: SortOrder
  }

  export type EnumReportTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportType | EnumReportTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ReportType[] | ListEnumReportTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReportType[] | ListEnumReportTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumReportTypeWithAggregatesFilter<$PrismaModel> | $Enums.ReportType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReportTypeFilter<$PrismaModel>
    _max?: NestedEnumReportTypeFilter<$PrismaModel>
  }

  export type EnumReportStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | EnumReportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReportStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReportStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReportStatusFilter<$PrismaModel>
    _max?: NestedEnumReportStatusFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumAssetActionNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetAction | EnumAssetActionFieldRefInput<$PrismaModel> | null
    in?: $Enums.AssetAction[] | ListEnumAssetActionFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AssetAction[] | ListEnumAssetActionFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAssetActionNullableWithAggregatesFilter<$PrismaModel> | $Enums.AssetAction | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumAssetActionNullableFilter<$PrismaModel>
    _max?: NestedEnumAssetActionNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type CampusNewsCountOrderByAggregateInput = {
    id?: SortOrder
    tag?: SortOrder
    date?: SortOrder
    title?: SortOrder
    desc?: SortOrder
    publishedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampusNewsAvgOrderByAggregateInput = {
    id?: SortOrder
    publishedById?: SortOrder
  }

  export type CampusNewsMaxOrderByAggregateInput = {
    id?: SortOrder
    tag?: SortOrder
    date?: SortOrder
    title?: SortOrder
    desc?: SortOrder
    publishedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampusNewsMinOrderByAggregateInput = {
    id?: SortOrder
    tag?: SortOrder
    date?: SortOrder
    title?: SortOrder
    desc?: SortOrder
    publishedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampusNewsSumOrderByAggregateInput = {
    id?: SortOrder
    publishedById?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ItemPresetListRelationFilter = {
    every?: ItemPresetWhereInput
    some?: ItemPresetWhereInput
    none?: ItemPresetWhereInput
  }

  export type ItemPresetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AssetCategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    label?: SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssetCategoryAvgOrderByAggregateInput = {
    id?: SortOrder
    sortOrder?: SortOrder
  }

  export type AssetCategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    label?: SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssetCategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    label?: SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssetCategorySumOrderByAggregateInput = {
    id?: SortOrder
    sortOrder?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type AssetCategoryScalarRelationFilter = {
    is?: AssetCategoryWhereInput
    isNot?: AssetCategoryWhereInput
  }

  export type ItemPresetCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    icon?: SortOrder
    categoryId?: SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ItemPresetAvgOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    sortOrder?: SortOrder
  }

  export type ItemPresetMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    icon?: SortOrder
    categoryId?: SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ItemPresetMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    icon?: SortOrder
    categoryId?: SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ItemPresetSumOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    sortOrder?: SortOrder
  }

  export type EnumLocationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.LocationType | EnumLocationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LocationType[] | ListEnumLocationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LocationType[] | ListEnumLocationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLocationTypeFilter<$PrismaModel> | $Enums.LocationType
  }

  export type LocationCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    type?: SortOrder
    building?: SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    mapX?: SortOrder
    mapY?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LocationAvgOrderByAggregateInput = {
    id?: SortOrder
    sortOrder?: SortOrder
    mapX?: SortOrder
    mapY?: SortOrder
  }

  export type LocationMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    type?: SortOrder
    building?: SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    mapX?: SortOrder
    mapY?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LocationMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    type?: SortOrder
    building?: SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    mapX?: SortOrder
    mapY?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LocationSumOrderByAggregateInput = {
    id?: SortOrder
    sortOrder?: SortOrder
    mapX?: SortOrder
    mapY?: SortOrder
  }

  export type EnumLocationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LocationType | EnumLocationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LocationType[] | ListEnumLocationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LocationType[] | ListEnumLocationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLocationTypeWithAggregatesFilter<$PrismaModel> | $Enums.LocationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLocationTypeFilter<$PrismaModel>
    _max?: NestedEnumLocationTypeFilter<$PrismaModel>
  }

  export type CampusMapCountOrderByAggregateInput = {
    id?: SortOrder
    imageData?: SortOrder
    imageName?: SortOrder
    imageSize?: SortOrder
    uploadedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampusMapAvgOrderByAggregateInput = {
    id?: SortOrder
    uploadedById?: SortOrder
  }

  export type CampusMapMaxOrderByAggregateInput = {
    id?: SortOrder
    imageData?: SortOrder
    imageName?: SortOrder
    imageSize?: SortOrder
    uploadedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampusMapMinOrderByAggregateInput = {
    id?: SortOrder
    imageData?: SortOrder
    imageName?: SortOrder
    imageSize?: SortOrder
    uploadedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampusMapSumOrderByAggregateInput = {
    id?: SortOrder
    uploadedById?: SortOrder
  }

  export type BinStatusCountOrderByAggregateInput = {
    id?: SortOrder
    locationId?: SortOrder
    fillStatus?: SortOrder
    lastUpdated?: SortOrder
    updatedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BinStatusAvgOrderByAggregateInput = {
    id?: SortOrder
    locationId?: SortOrder
    updatedBy?: SortOrder
  }

  export type BinStatusMaxOrderByAggregateInput = {
    id?: SortOrder
    locationId?: SortOrder
    fillStatus?: SortOrder
    lastUpdated?: SortOrder
    updatedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BinStatusMinOrderByAggregateInput = {
    id?: SortOrder
    locationId?: SortOrder
    fillStatus?: SortOrder
    lastUpdated?: SortOrder
    updatedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BinStatusSumOrderByAggregateInput = {
    id?: SortOrder
    locationId?: SortOrder
    updatedBy?: SortOrder
  }

  export type SystemSettingsCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    label?: SortOrder
    updatedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemSettingsAvgOrderByAggregateInput = {
    id?: SortOrder
    updatedById?: SortOrder
  }

  export type SystemSettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    label?: SortOrder
    updatedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemSettingsMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    label?: SortOrder
    updatedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemSettingsSumOrderByAggregateInput = {
    id?: SortOrder
    updatedById?: SortOrder
  }

  export type WasteTypeCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    label?: SortOrder
    emoji?: SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WasteTypeAvgOrderByAggregateInput = {
    id?: SortOrder
    sortOrder?: SortOrder
  }

  export type WasteTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    label?: SortOrder
    emoji?: SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WasteTypeMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    label?: SortOrder
    emoji?: SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WasteTypeSumOrderByAggregateInput = {
    id?: SortOrder
    sortOrder?: SortOrder
  }

  export type UrgencyLevelCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    label?: SortOrder
    description?: SortOrder
    color?: SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UrgencyLevelAvgOrderByAggregateInput = {
    id?: SortOrder
    sortOrder?: SortOrder
  }

  export type UrgencyLevelMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    label?: SortOrder
    description?: SortOrder
    color?: SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UrgencyLevelMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    label?: SortOrder
    description?: SortOrder
    color?: SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UrgencyLevelSumOrderByAggregateInput = {
    id?: SortOrder
    sortOrder?: SortOrder
  }

  export type AssetConditionCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    label?: SortOrder
    description?: SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssetConditionAvgOrderByAggregateInput = {
    id?: SortOrder
    sortOrder?: SortOrder
  }

  export type AssetConditionMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    label?: SortOrder
    description?: SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssetConditionMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    label?: SortOrder
    description?: SortOrder
    enabled?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssetConditionSumOrderByAggregateInput = {
    id?: SortOrder
    sortOrder?: SortOrder
  }

  export type ReportCreateNestedManyWithoutUserInput = {
    create?: XOR<ReportCreateWithoutUserInput, ReportUncheckedCreateWithoutUserInput> | ReportCreateWithoutUserInput[] | ReportUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutUserInput | ReportCreateOrConnectWithoutUserInput[]
    createMany?: ReportCreateManyUserInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type ReportCreateNestedManyWithoutAssignedStaffInput = {
    create?: XOR<ReportCreateWithoutAssignedStaffInput, ReportUncheckedCreateWithoutAssignedStaffInput> | ReportCreateWithoutAssignedStaffInput[] | ReportUncheckedCreateWithoutAssignedStaffInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutAssignedStaffInput | ReportCreateOrConnectWithoutAssignedStaffInput[]
    createMany?: ReportCreateManyAssignedStaffInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type CampusNewsCreateNestedManyWithoutPublishedByInput = {
    create?: XOR<CampusNewsCreateWithoutPublishedByInput, CampusNewsUncheckedCreateWithoutPublishedByInput> | CampusNewsCreateWithoutPublishedByInput[] | CampusNewsUncheckedCreateWithoutPublishedByInput[]
    connectOrCreate?: CampusNewsCreateOrConnectWithoutPublishedByInput | CampusNewsCreateOrConnectWithoutPublishedByInput[]
    createMany?: CampusNewsCreateManyPublishedByInputEnvelope
    connect?: CampusNewsWhereUniqueInput | CampusNewsWhereUniqueInput[]
  }

  export type ReportUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ReportCreateWithoutUserInput, ReportUncheckedCreateWithoutUserInput> | ReportCreateWithoutUserInput[] | ReportUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutUserInput | ReportCreateOrConnectWithoutUserInput[]
    createMany?: ReportCreateManyUserInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type ReportUncheckedCreateNestedManyWithoutAssignedStaffInput = {
    create?: XOR<ReportCreateWithoutAssignedStaffInput, ReportUncheckedCreateWithoutAssignedStaffInput> | ReportCreateWithoutAssignedStaffInput[] | ReportUncheckedCreateWithoutAssignedStaffInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutAssignedStaffInput | ReportCreateOrConnectWithoutAssignedStaffInput[]
    createMany?: ReportCreateManyAssignedStaffInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type CampusNewsUncheckedCreateNestedManyWithoutPublishedByInput = {
    create?: XOR<CampusNewsCreateWithoutPublishedByInput, CampusNewsUncheckedCreateWithoutPublishedByInput> | CampusNewsCreateWithoutPublishedByInput[] | CampusNewsUncheckedCreateWithoutPublishedByInput[]
    connectOrCreate?: CampusNewsCreateOrConnectWithoutPublishedByInput | CampusNewsCreateOrConnectWithoutPublishedByInput[]
    createMany?: CampusNewsCreateManyPublishedByInputEnvelope
    connect?: CampusNewsWhereUniqueInput | CampusNewsWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ReportUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReportCreateWithoutUserInput, ReportUncheckedCreateWithoutUserInput> | ReportCreateWithoutUserInput[] | ReportUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutUserInput | ReportCreateOrConnectWithoutUserInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutUserInput | ReportUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReportCreateManyUserInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutUserInput | ReportUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutUserInput | ReportUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type ReportUpdateManyWithoutAssignedStaffNestedInput = {
    create?: XOR<ReportCreateWithoutAssignedStaffInput, ReportUncheckedCreateWithoutAssignedStaffInput> | ReportCreateWithoutAssignedStaffInput[] | ReportUncheckedCreateWithoutAssignedStaffInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutAssignedStaffInput | ReportCreateOrConnectWithoutAssignedStaffInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutAssignedStaffInput | ReportUpsertWithWhereUniqueWithoutAssignedStaffInput[]
    createMany?: ReportCreateManyAssignedStaffInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutAssignedStaffInput | ReportUpdateWithWhereUniqueWithoutAssignedStaffInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutAssignedStaffInput | ReportUpdateManyWithWhereWithoutAssignedStaffInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type CampusNewsUpdateManyWithoutPublishedByNestedInput = {
    create?: XOR<CampusNewsCreateWithoutPublishedByInput, CampusNewsUncheckedCreateWithoutPublishedByInput> | CampusNewsCreateWithoutPublishedByInput[] | CampusNewsUncheckedCreateWithoutPublishedByInput[]
    connectOrCreate?: CampusNewsCreateOrConnectWithoutPublishedByInput | CampusNewsCreateOrConnectWithoutPublishedByInput[]
    upsert?: CampusNewsUpsertWithWhereUniqueWithoutPublishedByInput | CampusNewsUpsertWithWhereUniqueWithoutPublishedByInput[]
    createMany?: CampusNewsCreateManyPublishedByInputEnvelope
    set?: CampusNewsWhereUniqueInput | CampusNewsWhereUniqueInput[]
    disconnect?: CampusNewsWhereUniqueInput | CampusNewsWhereUniqueInput[]
    delete?: CampusNewsWhereUniqueInput | CampusNewsWhereUniqueInput[]
    connect?: CampusNewsWhereUniqueInput | CampusNewsWhereUniqueInput[]
    update?: CampusNewsUpdateWithWhereUniqueWithoutPublishedByInput | CampusNewsUpdateWithWhereUniqueWithoutPublishedByInput[]
    updateMany?: CampusNewsUpdateManyWithWhereWithoutPublishedByInput | CampusNewsUpdateManyWithWhereWithoutPublishedByInput[]
    deleteMany?: CampusNewsScalarWhereInput | CampusNewsScalarWhereInput[]
  }

  export type ReportUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReportCreateWithoutUserInput, ReportUncheckedCreateWithoutUserInput> | ReportCreateWithoutUserInput[] | ReportUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutUserInput | ReportCreateOrConnectWithoutUserInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutUserInput | ReportUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReportCreateManyUserInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutUserInput | ReportUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutUserInput | ReportUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type ReportUncheckedUpdateManyWithoutAssignedStaffNestedInput = {
    create?: XOR<ReportCreateWithoutAssignedStaffInput, ReportUncheckedCreateWithoutAssignedStaffInput> | ReportCreateWithoutAssignedStaffInput[] | ReportUncheckedCreateWithoutAssignedStaffInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutAssignedStaffInput | ReportCreateOrConnectWithoutAssignedStaffInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutAssignedStaffInput | ReportUpsertWithWhereUniqueWithoutAssignedStaffInput[]
    createMany?: ReportCreateManyAssignedStaffInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutAssignedStaffInput | ReportUpdateWithWhereUniqueWithoutAssignedStaffInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutAssignedStaffInput | ReportUpdateManyWithWhereWithoutAssignedStaffInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type CampusNewsUncheckedUpdateManyWithoutPublishedByNestedInput = {
    create?: XOR<CampusNewsCreateWithoutPublishedByInput, CampusNewsUncheckedCreateWithoutPublishedByInput> | CampusNewsCreateWithoutPublishedByInput[] | CampusNewsUncheckedCreateWithoutPublishedByInput[]
    connectOrCreate?: CampusNewsCreateOrConnectWithoutPublishedByInput | CampusNewsCreateOrConnectWithoutPublishedByInput[]
    upsert?: CampusNewsUpsertWithWhereUniqueWithoutPublishedByInput | CampusNewsUpsertWithWhereUniqueWithoutPublishedByInput[]
    createMany?: CampusNewsCreateManyPublishedByInputEnvelope
    set?: CampusNewsWhereUniqueInput | CampusNewsWhereUniqueInput[]
    disconnect?: CampusNewsWhereUniqueInput | CampusNewsWhereUniqueInput[]
    delete?: CampusNewsWhereUniqueInput | CampusNewsWhereUniqueInput[]
    connect?: CampusNewsWhereUniqueInput | CampusNewsWhereUniqueInput[]
    update?: CampusNewsUpdateWithWhereUniqueWithoutPublishedByInput | CampusNewsUpdateWithWhereUniqueWithoutPublishedByInput[]
    updateMany?: CampusNewsUpdateManyWithWhereWithoutPublishedByInput | CampusNewsUpdateManyWithWhereWithoutPublishedByInput[]
    deleteMany?: CampusNewsScalarWhereInput | CampusNewsScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSubmittedReportsInput = {
    create?: XOR<UserCreateWithoutSubmittedReportsInput, UserUncheckedCreateWithoutSubmittedReportsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubmittedReportsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAssignedReportsInput = {
    create?: XOR<UserCreateWithoutAssignedReportsInput, UserUncheckedCreateWithoutAssignedReportsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssignedReportsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumReportTypeFieldUpdateOperationsInput = {
    set?: $Enums.ReportType
  }

  export type EnumReportStatusFieldUpdateOperationsInput = {
    set?: $Enums.ReportStatus
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableEnumAssetActionFieldUpdateOperationsInput = {
    set?: $Enums.AssetAction | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutSubmittedReportsNestedInput = {
    create?: XOR<UserCreateWithoutSubmittedReportsInput, UserUncheckedCreateWithoutSubmittedReportsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubmittedReportsInput
    upsert?: UserUpsertWithoutSubmittedReportsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSubmittedReportsInput, UserUpdateWithoutSubmittedReportsInput>, UserUncheckedUpdateWithoutSubmittedReportsInput>
  }

  export type UserUpdateOneWithoutAssignedReportsNestedInput = {
    create?: XOR<UserCreateWithoutAssignedReportsInput, UserUncheckedCreateWithoutAssignedReportsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssignedReportsInput
    upsert?: UserUpsertWithoutAssignedReportsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAssignedReportsInput, UserUpdateWithoutAssignedReportsInput>, UserUncheckedUpdateWithoutAssignedReportsInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserCreateNestedOneWithoutNewsPostsInput = {
    create?: XOR<UserCreateWithoutNewsPostsInput, UserUncheckedCreateWithoutNewsPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNewsPostsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutNewsPostsNestedInput = {
    create?: XOR<UserCreateWithoutNewsPostsInput, UserUncheckedCreateWithoutNewsPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNewsPostsInput
    upsert?: UserUpsertWithoutNewsPostsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNewsPostsInput, UserUpdateWithoutNewsPostsInput>, UserUncheckedUpdateWithoutNewsPostsInput>
  }

  export type ItemPresetCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ItemPresetCreateWithoutCategoryInput, ItemPresetUncheckedCreateWithoutCategoryInput> | ItemPresetCreateWithoutCategoryInput[] | ItemPresetUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ItemPresetCreateOrConnectWithoutCategoryInput | ItemPresetCreateOrConnectWithoutCategoryInput[]
    createMany?: ItemPresetCreateManyCategoryInputEnvelope
    connect?: ItemPresetWhereUniqueInput | ItemPresetWhereUniqueInput[]
  }

  export type ItemPresetUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ItemPresetCreateWithoutCategoryInput, ItemPresetUncheckedCreateWithoutCategoryInput> | ItemPresetCreateWithoutCategoryInput[] | ItemPresetUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ItemPresetCreateOrConnectWithoutCategoryInput | ItemPresetCreateOrConnectWithoutCategoryInput[]
    createMany?: ItemPresetCreateManyCategoryInputEnvelope
    connect?: ItemPresetWhereUniqueInput | ItemPresetWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ItemPresetUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ItemPresetCreateWithoutCategoryInput, ItemPresetUncheckedCreateWithoutCategoryInput> | ItemPresetCreateWithoutCategoryInput[] | ItemPresetUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ItemPresetCreateOrConnectWithoutCategoryInput | ItemPresetCreateOrConnectWithoutCategoryInput[]
    upsert?: ItemPresetUpsertWithWhereUniqueWithoutCategoryInput | ItemPresetUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ItemPresetCreateManyCategoryInputEnvelope
    set?: ItemPresetWhereUniqueInput | ItemPresetWhereUniqueInput[]
    disconnect?: ItemPresetWhereUniqueInput | ItemPresetWhereUniqueInput[]
    delete?: ItemPresetWhereUniqueInput | ItemPresetWhereUniqueInput[]
    connect?: ItemPresetWhereUniqueInput | ItemPresetWhereUniqueInput[]
    update?: ItemPresetUpdateWithWhereUniqueWithoutCategoryInput | ItemPresetUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ItemPresetUpdateManyWithWhereWithoutCategoryInput | ItemPresetUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ItemPresetScalarWhereInput | ItemPresetScalarWhereInput[]
  }

  export type ItemPresetUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ItemPresetCreateWithoutCategoryInput, ItemPresetUncheckedCreateWithoutCategoryInput> | ItemPresetCreateWithoutCategoryInput[] | ItemPresetUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ItemPresetCreateOrConnectWithoutCategoryInput | ItemPresetCreateOrConnectWithoutCategoryInput[]
    upsert?: ItemPresetUpsertWithWhereUniqueWithoutCategoryInput | ItemPresetUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ItemPresetCreateManyCategoryInputEnvelope
    set?: ItemPresetWhereUniqueInput | ItemPresetWhereUniqueInput[]
    disconnect?: ItemPresetWhereUniqueInput | ItemPresetWhereUniqueInput[]
    delete?: ItemPresetWhereUniqueInput | ItemPresetWhereUniqueInput[]
    connect?: ItemPresetWhereUniqueInput | ItemPresetWhereUniqueInput[]
    update?: ItemPresetUpdateWithWhereUniqueWithoutCategoryInput | ItemPresetUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ItemPresetUpdateManyWithWhereWithoutCategoryInput | ItemPresetUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ItemPresetScalarWhereInput | ItemPresetScalarWhereInput[]
  }

  export type AssetCategoryCreateNestedOneWithoutItemPresetsInput = {
    create?: XOR<AssetCategoryCreateWithoutItemPresetsInput, AssetCategoryUncheckedCreateWithoutItemPresetsInput>
    connectOrCreate?: AssetCategoryCreateOrConnectWithoutItemPresetsInput
    connect?: AssetCategoryWhereUniqueInput
  }

  export type AssetCategoryUpdateOneRequiredWithoutItemPresetsNestedInput = {
    create?: XOR<AssetCategoryCreateWithoutItemPresetsInput, AssetCategoryUncheckedCreateWithoutItemPresetsInput>
    connectOrCreate?: AssetCategoryCreateOrConnectWithoutItemPresetsInput
    upsert?: AssetCategoryUpsertWithoutItemPresetsInput
    connect?: AssetCategoryWhereUniqueInput
    update?: XOR<XOR<AssetCategoryUpdateToOneWithWhereWithoutItemPresetsInput, AssetCategoryUpdateWithoutItemPresetsInput>, AssetCategoryUncheckedUpdateWithoutItemPresetsInput>
  }

  export type EnumLocationTypeFieldUpdateOperationsInput = {
    set?: $Enums.LocationType
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumReportTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportType | EnumReportTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ReportType[] | ListEnumReportTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReportType[] | ListEnumReportTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumReportTypeFilter<$PrismaModel> | $Enums.ReportType
  }

  export type NestedEnumReportStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | EnumReportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReportStatusFilter<$PrismaModel> | $Enums.ReportStatus
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumAssetActionNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetAction | EnumAssetActionFieldRefInput<$PrismaModel> | null
    in?: $Enums.AssetAction[] | ListEnumAssetActionFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AssetAction[] | ListEnumAssetActionFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAssetActionNullableFilter<$PrismaModel> | $Enums.AssetAction | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumReportTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportType | EnumReportTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ReportType[] | ListEnumReportTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReportType[] | ListEnumReportTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumReportTypeWithAggregatesFilter<$PrismaModel> | $Enums.ReportType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReportTypeFilter<$PrismaModel>
    _max?: NestedEnumReportTypeFilter<$PrismaModel>
  }

  export type NestedEnumReportStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | EnumReportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReportStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReportStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReportStatusFilter<$PrismaModel>
    _max?: NestedEnumReportStatusFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumAssetActionNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetAction | EnumAssetActionFieldRefInput<$PrismaModel> | null
    in?: $Enums.AssetAction[] | ListEnumAssetActionFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AssetAction[] | ListEnumAssetActionFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAssetActionNullableWithAggregatesFilter<$PrismaModel> | $Enums.AssetAction | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumAssetActionNullableFilter<$PrismaModel>
    _max?: NestedEnumAssetActionNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumLocationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.LocationType | EnumLocationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LocationType[] | ListEnumLocationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LocationType[] | ListEnumLocationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLocationTypeFilter<$PrismaModel> | $Enums.LocationType
  }

  export type NestedEnumLocationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LocationType | EnumLocationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LocationType[] | ListEnumLocationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LocationType[] | ListEnumLocationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLocationTypeWithAggregatesFilter<$PrismaModel> | $Enums.LocationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLocationTypeFilter<$PrismaModel>
    _max?: NestedEnumLocationTypeFilter<$PrismaModel>
  }

  export type ReportCreateWithoutUserInput = {
    location: string
    notes?: string | null
    photoUrl?: string | null
    urgency?: string
    wasteType?: string
    type?: $Enums.ReportType
    status?: $Enums.ReportStatus
    kilosCollected?: number | null
    assetAction?: $Enums.AssetAction | null
    collectionDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedStaff?: UserCreateNestedOneWithoutAssignedReportsInput
  }

  export type ReportUncheckedCreateWithoutUserInput = {
    id?: number
    location: string
    notes?: string | null
    photoUrl?: string | null
    urgency?: string
    wasteType?: string
    type?: $Enums.ReportType
    status?: $Enums.ReportStatus
    assignedStaffId?: number | null
    kilosCollected?: number | null
    assetAction?: $Enums.AssetAction | null
    collectionDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReportCreateOrConnectWithoutUserInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutUserInput, ReportUncheckedCreateWithoutUserInput>
  }

  export type ReportCreateManyUserInputEnvelope = {
    data: ReportCreateManyUserInput | ReportCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ReportCreateWithoutAssignedStaffInput = {
    location: string
    notes?: string | null
    photoUrl?: string | null
    urgency?: string
    wasteType?: string
    type?: $Enums.ReportType
    status?: $Enums.ReportStatus
    kilosCollected?: number | null
    assetAction?: $Enums.AssetAction | null
    collectionDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSubmittedReportsInput
  }

  export type ReportUncheckedCreateWithoutAssignedStaffInput = {
    id?: number
    location: string
    notes?: string | null
    photoUrl?: string | null
    urgency?: string
    wasteType?: string
    type?: $Enums.ReportType
    status?: $Enums.ReportStatus
    kilosCollected?: number | null
    assetAction?: $Enums.AssetAction | null
    collectionDate?: Date | string | null
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReportCreateOrConnectWithoutAssignedStaffInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutAssignedStaffInput, ReportUncheckedCreateWithoutAssignedStaffInput>
  }

  export type ReportCreateManyAssignedStaffInputEnvelope = {
    data: ReportCreateManyAssignedStaffInput | ReportCreateManyAssignedStaffInput[]
    skipDuplicates?: boolean
  }

  export type CampusNewsCreateWithoutPublishedByInput = {
    tag: string
    date: string
    title: string
    desc: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampusNewsUncheckedCreateWithoutPublishedByInput = {
    id?: number
    tag: string
    date: string
    title: string
    desc: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampusNewsCreateOrConnectWithoutPublishedByInput = {
    where: CampusNewsWhereUniqueInput
    create: XOR<CampusNewsCreateWithoutPublishedByInput, CampusNewsUncheckedCreateWithoutPublishedByInput>
  }

  export type CampusNewsCreateManyPublishedByInputEnvelope = {
    data: CampusNewsCreateManyPublishedByInput | CampusNewsCreateManyPublishedByInput[]
    skipDuplicates?: boolean
  }

  export type ReportUpsertWithWhereUniqueWithoutUserInput = {
    where: ReportWhereUniqueInput
    update: XOR<ReportUpdateWithoutUserInput, ReportUncheckedUpdateWithoutUserInput>
    create: XOR<ReportCreateWithoutUserInput, ReportUncheckedCreateWithoutUserInput>
  }

  export type ReportUpdateWithWhereUniqueWithoutUserInput = {
    where: ReportWhereUniqueInput
    data: XOR<ReportUpdateWithoutUserInput, ReportUncheckedUpdateWithoutUserInput>
  }

  export type ReportUpdateManyWithWhereWithoutUserInput = {
    where: ReportScalarWhereInput
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyWithoutUserInput>
  }

  export type ReportScalarWhereInput = {
    AND?: ReportScalarWhereInput | ReportScalarWhereInput[]
    OR?: ReportScalarWhereInput[]
    NOT?: ReportScalarWhereInput | ReportScalarWhereInput[]
    id?: IntFilter<"Report"> | number
    location?: StringFilter<"Report"> | string
    notes?: StringNullableFilter<"Report"> | string | null
    photoUrl?: StringNullableFilter<"Report"> | string | null
    urgency?: StringFilter<"Report"> | string
    wasteType?: StringFilter<"Report"> | string
    type?: EnumReportTypeFilter<"Report"> | $Enums.ReportType
    status?: EnumReportStatusFilter<"Report"> | $Enums.ReportStatus
    assignedStaffId?: IntNullableFilter<"Report"> | number | null
    kilosCollected?: FloatNullableFilter<"Report"> | number | null
    assetAction?: EnumAssetActionNullableFilter<"Report"> | $Enums.AssetAction | null
    collectionDate?: DateTimeNullableFilter<"Report"> | Date | string | null
    userId?: IntFilter<"Report"> | number
    createdAt?: DateTimeFilter<"Report"> | Date | string
    updatedAt?: DateTimeFilter<"Report"> | Date | string
  }

  export type ReportUpsertWithWhereUniqueWithoutAssignedStaffInput = {
    where: ReportWhereUniqueInput
    update: XOR<ReportUpdateWithoutAssignedStaffInput, ReportUncheckedUpdateWithoutAssignedStaffInput>
    create: XOR<ReportCreateWithoutAssignedStaffInput, ReportUncheckedCreateWithoutAssignedStaffInput>
  }

  export type ReportUpdateWithWhereUniqueWithoutAssignedStaffInput = {
    where: ReportWhereUniqueInput
    data: XOR<ReportUpdateWithoutAssignedStaffInput, ReportUncheckedUpdateWithoutAssignedStaffInput>
  }

  export type ReportUpdateManyWithWhereWithoutAssignedStaffInput = {
    where: ReportScalarWhereInput
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyWithoutAssignedStaffInput>
  }

  export type CampusNewsUpsertWithWhereUniqueWithoutPublishedByInput = {
    where: CampusNewsWhereUniqueInput
    update: XOR<CampusNewsUpdateWithoutPublishedByInput, CampusNewsUncheckedUpdateWithoutPublishedByInput>
    create: XOR<CampusNewsCreateWithoutPublishedByInput, CampusNewsUncheckedCreateWithoutPublishedByInput>
  }

  export type CampusNewsUpdateWithWhereUniqueWithoutPublishedByInput = {
    where: CampusNewsWhereUniqueInput
    data: XOR<CampusNewsUpdateWithoutPublishedByInput, CampusNewsUncheckedUpdateWithoutPublishedByInput>
  }

  export type CampusNewsUpdateManyWithWhereWithoutPublishedByInput = {
    where: CampusNewsScalarWhereInput
    data: XOR<CampusNewsUpdateManyMutationInput, CampusNewsUncheckedUpdateManyWithoutPublishedByInput>
  }

  export type CampusNewsScalarWhereInput = {
    AND?: CampusNewsScalarWhereInput | CampusNewsScalarWhereInput[]
    OR?: CampusNewsScalarWhereInput[]
    NOT?: CampusNewsScalarWhereInput | CampusNewsScalarWhereInput[]
    id?: IntFilter<"CampusNews"> | number
    tag?: StringFilter<"CampusNews"> | string
    date?: StringFilter<"CampusNews"> | string
    title?: StringFilter<"CampusNews"> | string
    desc?: StringFilter<"CampusNews"> | string
    publishedById?: IntNullableFilter<"CampusNews"> | number | null
    createdAt?: DateTimeFilter<"CampusNews"> | Date | string
    updatedAt?: DateTimeFilter<"CampusNews"> | Date | string
  }

  export type UserCreateWithoutSubmittedReportsInput = {
    username: string
    password: string
    role?: $Enums.Role
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    studentId?: string | null
    lrn?: string | null
    course?: string | null
    section?: string | null
    department?: string | null
    points?: number
    reports?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedReports?: ReportCreateNestedManyWithoutAssignedStaffInput
    newsPosts?: CampusNewsCreateNestedManyWithoutPublishedByInput
  }

  export type UserUncheckedCreateWithoutSubmittedReportsInput = {
    id?: number
    username: string
    password: string
    role?: $Enums.Role
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    studentId?: string | null
    lrn?: string | null
    course?: string | null
    section?: string | null
    department?: string | null
    points?: number
    reports?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedReports?: ReportUncheckedCreateNestedManyWithoutAssignedStaffInput
    newsPosts?: CampusNewsUncheckedCreateNestedManyWithoutPublishedByInput
  }

  export type UserCreateOrConnectWithoutSubmittedReportsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSubmittedReportsInput, UserUncheckedCreateWithoutSubmittedReportsInput>
  }

  export type UserCreateWithoutAssignedReportsInput = {
    username: string
    password: string
    role?: $Enums.Role
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    studentId?: string | null
    lrn?: string | null
    course?: string | null
    section?: string | null
    department?: string | null
    points?: number
    reports?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedReports?: ReportCreateNestedManyWithoutUserInput
    newsPosts?: CampusNewsCreateNestedManyWithoutPublishedByInput
  }

  export type UserUncheckedCreateWithoutAssignedReportsInput = {
    id?: number
    username: string
    password: string
    role?: $Enums.Role
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    studentId?: string | null
    lrn?: string | null
    course?: string | null
    section?: string | null
    department?: string | null
    points?: number
    reports?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedReports?: ReportUncheckedCreateNestedManyWithoutUserInput
    newsPosts?: CampusNewsUncheckedCreateNestedManyWithoutPublishedByInput
  }

  export type UserCreateOrConnectWithoutAssignedReportsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAssignedReportsInput, UserUncheckedCreateWithoutAssignedReportsInput>
  }

  export type UserUpsertWithoutSubmittedReportsInput = {
    update: XOR<UserUpdateWithoutSubmittedReportsInput, UserUncheckedUpdateWithoutSubmittedReportsInput>
    create: XOR<UserCreateWithoutSubmittedReportsInput, UserUncheckedCreateWithoutSubmittedReportsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSubmittedReportsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSubmittedReportsInput, UserUncheckedUpdateWithoutSubmittedReportsInput>
  }

  export type UserUpdateWithoutSubmittedReportsInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    lrn?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    reports?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedReports?: ReportUpdateManyWithoutAssignedStaffNestedInput
    newsPosts?: CampusNewsUpdateManyWithoutPublishedByNestedInput
  }

  export type UserUncheckedUpdateWithoutSubmittedReportsInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    lrn?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    reports?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedReports?: ReportUncheckedUpdateManyWithoutAssignedStaffNestedInput
    newsPosts?: CampusNewsUncheckedUpdateManyWithoutPublishedByNestedInput
  }

  export type UserUpsertWithoutAssignedReportsInput = {
    update: XOR<UserUpdateWithoutAssignedReportsInput, UserUncheckedUpdateWithoutAssignedReportsInput>
    create: XOR<UserCreateWithoutAssignedReportsInput, UserUncheckedCreateWithoutAssignedReportsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAssignedReportsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAssignedReportsInput, UserUncheckedUpdateWithoutAssignedReportsInput>
  }

  export type UserUpdateWithoutAssignedReportsInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    lrn?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    reports?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedReports?: ReportUpdateManyWithoutUserNestedInput
    newsPosts?: CampusNewsUpdateManyWithoutPublishedByNestedInput
  }

  export type UserUncheckedUpdateWithoutAssignedReportsInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    lrn?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    reports?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedReports?: ReportUncheckedUpdateManyWithoutUserNestedInput
    newsPosts?: CampusNewsUncheckedUpdateManyWithoutPublishedByNestedInput
  }

  export type UserCreateWithoutNewsPostsInput = {
    username: string
    password: string
    role?: $Enums.Role
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    studentId?: string | null
    lrn?: string | null
    course?: string | null
    section?: string | null
    department?: string | null
    points?: number
    reports?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedReports?: ReportCreateNestedManyWithoutUserInput
    assignedReports?: ReportCreateNestedManyWithoutAssignedStaffInput
  }

  export type UserUncheckedCreateWithoutNewsPostsInput = {
    id?: number
    username: string
    password: string
    role?: $Enums.Role
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    studentId?: string | null
    lrn?: string | null
    course?: string | null
    section?: string | null
    department?: string | null
    points?: number
    reports?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedReports?: ReportUncheckedCreateNestedManyWithoutUserInput
    assignedReports?: ReportUncheckedCreateNestedManyWithoutAssignedStaffInput
  }

  export type UserCreateOrConnectWithoutNewsPostsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNewsPostsInput, UserUncheckedCreateWithoutNewsPostsInput>
  }

  export type UserUpsertWithoutNewsPostsInput = {
    update: XOR<UserUpdateWithoutNewsPostsInput, UserUncheckedUpdateWithoutNewsPostsInput>
    create: XOR<UserCreateWithoutNewsPostsInput, UserUncheckedCreateWithoutNewsPostsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNewsPostsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNewsPostsInput, UserUncheckedUpdateWithoutNewsPostsInput>
  }

  export type UserUpdateWithoutNewsPostsInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    lrn?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    reports?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedReports?: ReportUpdateManyWithoutUserNestedInput
    assignedReports?: ReportUpdateManyWithoutAssignedStaffNestedInput
  }

  export type UserUncheckedUpdateWithoutNewsPostsInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    lrn?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    reports?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedReports?: ReportUncheckedUpdateManyWithoutUserNestedInput
    assignedReports?: ReportUncheckedUpdateManyWithoutAssignedStaffNestedInput
  }

  export type ItemPresetCreateWithoutCategoryInput = {
    name: string
    icon?: string
    enabled?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemPresetUncheckedCreateWithoutCategoryInput = {
    id?: number
    name: string
    icon?: string
    enabled?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemPresetCreateOrConnectWithoutCategoryInput = {
    where: ItemPresetWhereUniqueInput
    create: XOR<ItemPresetCreateWithoutCategoryInput, ItemPresetUncheckedCreateWithoutCategoryInput>
  }

  export type ItemPresetCreateManyCategoryInputEnvelope = {
    data: ItemPresetCreateManyCategoryInput | ItemPresetCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type ItemPresetUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ItemPresetWhereUniqueInput
    update: XOR<ItemPresetUpdateWithoutCategoryInput, ItemPresetUncheckedUpdateWithoutCategoryInput>
    create: XOR<ItemPresetCreateWithoutCategoryInput, ItemPresetUncheckedCreateWithoutCategoryInput>
  }

  export type ItemPresetUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ItemPresetWhereUniqueInput
    data: XOR<ItemPresetUpdateWithoutCategoryInput, ItemPresetUncheckedUpdateWithoutCategoryInput>
  }

  export type ItemPresetUpdateManyWithWhereWithoutCategoryInput = {
    where: ItemPresetScalarWhereInput
    data: XOR<ItemPresetUpdateManyMutationInput, ItemPresetUncheckedUpdateManyWithoutCategoryInput>
  }

  export type ItemPresetScalarWhereInput = {
    AND?: ItemPresetScalarWhereInput | ItemPresetScalarWhereInput[]
    OR?: ItemPresetScalarWhereInput[]
    NOT?: ItemPresetScalarWhereInput | ItemPresetScalarWhereInput[]
    id?: IntFilter<"ItemPreset"> | number
    name?: StringFilter<"ItemPreset"> | string
    icon?: StringFilter<"ItemPreset"> | string
    categoryId?: IntFilter<"ItemPreset"> | number
    enabled?: BoolFilter<"ItemPreset"> | boolean
    sortOrder?: IntFilter<"ItemPreset"> | number
    createdAt?: DateTimeFilter<"ItemPreset"> | Date | string
    updatedAt?: DateTimeFilter<"ItemPreset"> | Date | string
  }

  export type AssetCategoryCreateWithoutItemPresetsInput = {
    name: string
    label: string
    enabled?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssetCategoryUncheckedCreateWithoutItemPresetsInput = {
    id?: number
    name: string
    label: string
    enabled?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssetCategoryCreateOrConnectWithoutItemPresetsInput = {
    where: AssetCategoryWhereUniqueInput
    create: XOR<AssetCategoryCreateWithoutItemPresetsInput, AssetCategoryUncheckedCreateWithoutItemPresetsInput>
  }

  export type AssetCategoryUpsertWithoutItemPresetsInput = {
    update: XOR<AssetCategoryUpdateWithoutItemPresetsInput, AssetCategoryUncheckedUpdateWithoutItemPresetsInput>
    create: XOR<AssetCategoryCreateWithoutItemPresetsInput, AssetCategoryUncheckedCreateWithoutItemPresetsInput>
    where?: AssetCategoryWhereInput
  }

  export type AssetCategoryUpdateToOneWithWhereWithoutItemPresetsInput = {
    where?: AssetCategoryWhereInput
    data: XOR<AssetCategoryUpdateWithoutItemPresetsInput, AssetCategoryUncheckedUpdateWithoutItemPresetsInput>
  }

  export type AssetCategoryUpdateWithoutItemPresetsInput = {
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssetCategoryUncheckedUpdateWithoutItemPresetsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportCreateManyUserInput = {
    id?: number
    location: string
    notes?: string | null
    photoUrl?: string | null
    urgency?: string
    wasteType?: string
    type?: $Enums.ReportType
    status?: $Enums.ReportStatus
    assignedStaffId?: number | null
    kilosCollected?: number | null
    assetAction?: $Enums.AssetAction | null
    collectionDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReportCreateManyAssignedStaffInput = {
    id?: number
    location: string
    notes?: string | null
    photoUrl?: string | null
    urgency?: string
    wasteType?: string
    type?: $Enums.ReportType
    status?: $Enums.ReportStatus
    kilosCollected?: number | null
    assetAction?: $Enums.AssetAction | null
    collectionDate?: Date | string | null
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampusNewsCreateManyPublishedByInput = {
    id?: number
    tag: string
    date: string
    title: string
    desc: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReportUpdateWithoutUserInput = {
    location?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: StringFieldUpdateOperationsInput | string
    wasteType?: StringFieldUpdateOperationsInput | string
    type?: EnumReportTypeFieldUpdateOperationsInput | $Enums.ReportType
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    kilosCollected?: NullableFloatFieldUpdateOperationsInput | number | null
    assetAction?: NullableEnumAssetActionFieldUpdateOperationsInput | $Enums.AssetAction | null
    collectionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedStaff?: UserUpdateOneWithoutAssignedReportsNestedInput
  }

  export type ReportUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    location?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: StringFieldUpdateOperationsInput | string
    wasteType?: StringFieldUpdateOperationsInput | string
    type?: EnumReportTypeFieldUpdateOperationsInput | $Enums.ReportType
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    assignedStaffId?: NullableIntFieldUpdateOperationsInput | number | null
    kilosCollected?: NullableFloatFieldUpdateOperationsInput | number | null
    assetAction?: NullableEnumAssetActionFieldUpdateOperationsInput | $Enums.AssetAction | null
    collectionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    location?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: StringFieldUpdateOperationsInput | string
    wasteType?: StringFieldUpdateOperationsInput | string
    type?: EnumReportTypeFieldUpdateOperationsInput | $Enums.ReportType
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    assignedStaffId?: NullableIntFieldUpdateOperationsInput | number | null
    kilosCollected?: NullableFloatFieldUpdateOperationsInput | number | null
    assetAction?: NullableEnumAssetActionFieldUpdateOperationsInput | $Enums.AssetAction | null
    collectionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUpdateWithoutAssignedStaffInput = {
    location?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: StringFieldUpdateOperationsInput | string
    wasteType?: StringFieldUpdateOperationsInput | string
    type?: EnumReportTypeFieldUpdateOperationsInput | $Enums.ReportType
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    kilosCollected?: NullableFloatFieldUpdateOperationsInput | number | null
    assetAction?: NullableEnumAssetActionFieldUpdateOperationsInput | $Enums.AssetAction | null
    collectionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSubmittedReportsNestedInput
  }

  export type ReportUncheckedUpdateWithoutAssignedStaffInput = {
    id?: IntFieldUpdateOperationsInput | number
    location?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: StringFieldUpdateOperationsInput | string
    wasteType?: StringFieldUpdateOperationsInput | string
    type?: EnumReportTypeFieldUpdateOperationsInput | $Enums.ReportType
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    kilosCollected?: NullableFloatFieldUpdateOperationsInput | number | null
    assetAction?: NullableEnumAssetActionFieldUpdateOperationsInput | $Enums.AssetAction | null
    collectionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUncheckedUpdateManyWithoutAssignedStaffInput = {
    id?: IntFieldUpdateOperationsInput | number
    location?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: StringFieldUpdateOperationsInput | string
    wasteType?: StringFieldUpdateOperationsInput | string
    type?: EnumReportTypeFieldUpdateOperationsInput | $Enums.ReportType
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    kilosCollected?: NullableFloatFieldUpdateOperationsInput | number | null
    assetAction?: NullableEnumAssetActionFieldUpdateOperationsInput | $Enums.AssetAction | null
    collectionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampusNewsUpdateWithoutPublishedByInput = {
    tag?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampusNewsUncheckedUpdateWithoutPublishedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    tag?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampusNewsUncheckedUpdateManyWithoutPublishedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    tag?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemPresetCreateManyCategoryInput = {
    id?: number
    name: string
    icon?: string
    enabled?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemPresetUpdateWithoutCategoryInput = {
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemPresetUncheckedUpdateWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemPresetUncheckedUpdateManyWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}