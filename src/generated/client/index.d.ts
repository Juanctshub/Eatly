
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
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = $Result.DefaultSelection<Prisma.$VerificationTokenPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model UserPreferences
 * 
 */
export type UserPreferences = $Result.DefaultSelection<Prisma.$UserPreferencesPayload>
/**
 * Model DietaryRestriction
 * 
 */
export type DietaryRestriction = $Result.DefaultSelection<Prisma.$DietaryRestrictionPayload>
/**
 * Model AvailableFood
 * 
 */
export type AvailableFood = $Result.DefaultSelection<Prisma.$AvailableFoodPayload>
/**
 * Model MealSuggestion
 * 
 */
export type MealSuggestion = $Result.DefaultSelection<Prisma.$MealSuggestionPayload>
/**
 * Model PreloadedSuggestion
 * 
 */
export type PreloadedSuggestion = $Result.DefaultSelection<Prisma.$PreloadedSuggestionPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Accounts
 * const accounts = await prisma.account.findMany()
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
   * // Fetch zero or more Accounts
   * const accounts = await prisma.account.findMany()
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
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<ExtArgs, ClientOptions>;

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
   * `prisma.userPreferences`: Exposes CRUD operations for the **UserPreferences** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserPreferences
    * const userPreferences = await prisma.userPreferences.findMany()
    * ```
    */
  get userPreferences(): Prisma.UserPreferencesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dietaryRestriction`: Exposes CRUD operations for the **DietaryRestriction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DietaryRestrictions
    * const dietaryRestrictions = await prisma.dietaryRestriction.findMany()
    * ```
    */
  get dietaryRestriction(): Prisma.DietaryRestrictionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.availableFood`: Exposes CRUD operations for the **AvailableFood** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AvailableFoods
    * const availableFoods = await prisma.availableFood.findMany()
    * ```
    */
  get availableFood(): Prisma.AvailableFoodDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mealSuggestion`: Exposes CRUD operations for the **MealSuggestion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MealSuggestions
    * const mealSuggestions = await prisma.mealSuggestion.findMany()
    * ```
    */
  get mealSuggestion(): Prisma.MealSuggestionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.preloadedSuggestion`: Exposes CRUD operations for the **PreloadedSuggestion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PreloadedSuggestions
    * const preloadedSuggestions = await prisma.preloadedSuggestion.findMany()
    * ```
    */
  get preloadedSuggestion(): Prisma.PreloadedSuggestionDelegate<ExtArgs, ClientOptions>;
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
    Account: 'Account',
    Session: 'Session',
    VerificationToken: 'VerificationToken',
    User: 'User',
    UserPreferences: 'UserPreferences',
    DietaryRestriction: 'DietaryRestriction',
    AvailableFood: 'AvailableFood',
    MealSuggestion: 'MealSuggestion',
    PreloadedSuggestion: 'PreloadedSuggestion'
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
      modelProps: "account" | "session" | "verificationToken" | "user" | "userPreferences" | "dietaryRestriction" | "availableFood" | "mealSuggestion" | "preloadedSuggestion"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      VerificationToken: {
        payload: Prisma.$VerificationTokenPayload<ExtArgs>
        fields: Prisma.VerificationTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerificationToken>
          }
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenCountAggregateOutputType> | number
          }
        }
      }
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
      UserPreferences: {
        payload: Prisma.$UserPreferencesPayload<ExtArgs>
        fields: Prisma.UserPreferencesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserPreferencesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPreferencesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserPreferencesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPreferencesPayload>
          }
          findFirst: {
            args: Prisma.UserPreferencesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPreferencesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserPreferencesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPreferencesPayload>
          }
          findMany: {
            args: Prisma.UserPreferencesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPreferencesPayload>[]
          }
          create: {
            args: Prisma.UserPreferencesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPreferencesPayload>
          }
          createMany: {
            args: Prisma.UserPreferencesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserPreferencesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPreferencesPayload>[]
          }
          delete: {
            args: Prisma.UserPreferencesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPreferencesPayload>
          }
          update: {
            args: Prisma.UserPreferencesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPreferencesPayload>
          }
          deleteMany: {
            args: Prisma.UserPreferencesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserPreferencesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserPreferencesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPreferencesPayload>[]
          }
          upsert: {
            args: Prisma.UserPreferencesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPreferencesPayload>
          }
          aggregate: {
            args: Prisma.UserPreferencesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserPreferences>
          }
          groupBy: {
            args: Prisma.UserPreferencesGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserPreferencesGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserPreferencesCountArgs<ExtArgs>
            result: $Utils.Optional<UserPreferencesCountAggregateOutputType> | number
          }
        }
      }
      DietaryRestriction: {
        payload: Prisma.$DietaryRestrictionPayload<ExtArgs>
        fields: Prisma.DietaryRestrictionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DietaryRestrictionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DietaryRestrictionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DietaryRestrictionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DietaryRestrictionPayload>
          }
          findFirst: {
            args: Prisma.DietaryRestrictionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DietaryRestrictionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DietaryRestrictionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DietaryRestrictionPayload>
          }
          findMany: {
            args: Prisma.DietaryRestrictionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DietaryRestrictionPayload>[]
          }
          create: {
            args: Prisma.DietaryRestrictionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DietaryRestrictionPayload>
          }
          createMany: {
            args: Prisma.DietaryRestrictionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DietaryRestrictionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DietaryRestrictionPayload>[]
          }
          delete: {
            args: Prisma.DietaryRestrictionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DietaryRestrictionPayload>
          }
          update: {
            args: Prisma.DietaryRestrictionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DietaryRestrictionPayload>
          }
          deleteMany: {
            args: Prisma.DietaryRestrictionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DietaryRestrictionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DietaryRestrictionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DietaryRestrictionPayload>[]
          }
          upsert: {
            args: Prisma.DietaryRestrictionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DietaryRestrictionPayload>
          }
          aggregate: {
            args: Prisma.DietaryRestrictionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDietaryRestriction>
          }
          groupBy: {
            args: Prisma.DietaryRestrictionGroupByArgs<ExtArgs>
            result: $Utils.Optional<DietaryRestrictionGroupByOutputType>[]
          }
          count: {
            args: Prisma.DietaryRestrictionCountArgs<ExtArgs>
            result: $Utils.Optional<DietaryRestrictionCountAggregateOutputType> | number
          }
        }
      }
      AvailableFood: {
        payload: Prisma.$AvailableFoodPayload<ExtArgs>
        fields: Prisma.AvailableFoodFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AvailableFoodFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailableFoodPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AvailableFoodFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailableFoodPayload>
          }
          findFirst: {
            args: Prisma.AvailableFoodFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailableFoodPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AvailableFoodFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailableFoodPayload>
          }
          findMany: {
            args: Prisma.AvailableFoodFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailableFoodPayload>[]
          }
          create: {
            args: Prisma.AvailableFoodCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailableFoodPayload>
          }
          createMany: {
            args: Prisma.AvailableFoodCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AvailableFoodCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailableFoodPayload>[]
          }
          delete: {
            args: Prisma.AvailableFoodDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailableFoodPayload>
          }
          update: {
            args: Prisma.AvailableFoodUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailableFoodPayload>
          }
          deleteMany: {
            args: Prisma.AvailableFoodDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AvailableFoodUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AvailableFoodUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailableFoodPayload>[]
          }
          upsert: {
            args: Prisma.AvailableFoodUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailableFoodPayload>
          }
          aggregate: {
            args: Prisma.AvailableFoodAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAvailableFood>
          }
          groupBy: {
            args: Prisma.AvailableFoodGroupByArgs<ExtArgs>
            result: $Utils.Optional<AvailableFoodGroupByOutputType>[]
          }
          count: {
            args: Prisma.AvailableFoodCountArgs<ExtArgs>
            result: $Utils.Optional<AvailableFoodCountAggregateOutputType> | number
          }
        }
      }
      MealSuggestion: {
        payload: Prisma.$MealSuggestionPayload<ExtArgs>
        fields: Prisma.MealSuggestionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MealSuggestionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealSuggestionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MealSuggestionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealSuggestionPayload>
          }
          findFirst: {
            args: Prisma.MealSuggestionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealSuggestionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MealSuggestionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealSuggestionPayload>
          }
          findMany: {
            args: Prisma.MealSuggestionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealSuggestionPayload>[]
          }
          create: {
            args: Prisma.MealSuggestionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealSuggestionPayload>
          }
          createMany: {
            args: Prisma.MealSuggestionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MealSuggestionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealSuggestionPayload>[]
          }
          delete: {
            args: Prisma.MealSuggestionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealSuggestionPayload>
          }
          update: {
            args: Prisma.MealSuggestionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealSuggestionPayload>
          }
          deleteMany: {
            args: Prisma.MealSuggestionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MealSuggestionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MealSuggestionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealSuggestionPayload>[]
          }
          upsert: {
            args: Prisma.MealSuggestionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealSuggestionPayload>
          }
          aggregate: {
            args: Prisma.MealSuggestionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMealSuggestion>
          }
          groupBy: {
            args: Prisma.MealSuggestionGroupByArgs<ExtArgs>
            result: $Utils.Optional<MealSuggestionGroupByOutputType>[]
          }
          count: {
            args: Prisma.MealSuggestionCountArgs<ExtArgs>
            result: $Utils.Optional<MealSuggestionCountAggregateOutputType> | number
          }
        }
      }
      PreloadedSuggestion: {
        payload: Prisma.$PreloadedSuggestionPayload<ExtArgs>
        fields: Prisma.PreloadedSuggestionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PreloadedSuggestionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreloadedSuggestionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PreloadedSuggestionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreloadedSuggestionPayload>
          }
          findFirst: {
            args: Prisma.PreloadedSuggestionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreloadedSuggestionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PreloadedSuggestionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreloadedSuggestionPayload>
          }
          findMany: {
            args: Prisma.PreloadedSuggestionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreloadedSuggestionPayload>[]
          }
          create: {
            args: Prisma.PreloadedSuggestionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreloadedSuggestionPayload>
          }
          createMany: {
            args: Prisma.PreloadedSuggestionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PreloadedSuggestionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreloadedSuggestionPayload>[]
          }
          delete: {
            args: Prisma.PreloadedSuggestionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreloadedSuggestionPayload>
          }
          update: {
            args: Prisma.PreloadedSuggestionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreloadedSuggestionPayload>
          }
          deleteMany: {
            args: Prisma.PreloadedSuggestionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PreloadedSuggestionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PreloadedSuggestionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreloadedSuggestionPayload>[]
          }
          upsert: {
            args: Prisma.PreloadedSuggestionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreloadedSuggestionPayload>
          }
          aggregate: {
            args: Prisma.PreloadedSuggestionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePreloadedSuggestion>
          }
          groupBy: {
            args: Prisma.PreloadedSuggestionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PreloadedSuggestionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PreloadedSuggestionCountArgs<ExtArgs>
            result: $Utils.Optional<PreloadedSuggestionCountAggregateOutputType> | number
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
    account?: AccountOmit
    session?: SessionOmit
    verificationToken?: VerificationTokenOmit
    user?: UserOmit
    userPreferences?: UserPreferencesOmit
    dietaryRestriction?: DietaryRestrictionOmit
    availableFood?: AvailableFoodOmit
    mealSuggestion?: MealSuggestionOmit
    preloadedSuggestion?: PreloadedSuggestionOmit
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
    accounts: number
    sessions: number
    restrictions: number
    foods: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    restrictions?: boolean | UserCountOutputTypeCountRestrictionsArgs
    foods?: boolean | UserCountOutputTypeCountFoodsArgs
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
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRestrictionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DietaryRestrictionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFoodsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AvailableFoodWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    provider: number
    providerAccountId: number
    refresh_token: number
    access_token: number
    expires_at: number
    token_type: number
    scope: number
    id_token: number
    session_state: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "provider" | "providerAccountId" | "refresh_token" | "access_token" | "expires_at" | "token_type" | "scope" | "id_token" | "session_state", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      provider: string
      providerAccountId: string
      refresh_token: string | null
      access_token: string | null
      expires_at: number | null
      token_type: string | null
      scope: string | null
      id_token: string | null
      session_state: string | null
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
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
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
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
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'String'>
    readonly provider: FieldRef<"Account", 'String'>
    readonly providerAccountId: FieldRef<"Account", 'String'>
    readonly refresh_token: FieldRef<"Account", 'String'>
    readonly access_token: FieldRef<"Account", 'String'>
    readonly expires_at: FieldRef<"Account", 'Int'>
    readonly token_type: FieldRef<"Account", 'String'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly id_token: FieldRef<"Account", 'String'>
    readonly session_state: FieldRef<"Account", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    sessionToken: number
    userId: number
    expires: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    sessionToken: string
    userId: string
    expires: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionToken" | "userId" | "expires", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionToken: string
      userId: string
      expires: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
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
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
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
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly sessionToken: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly expires: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model VerificationToken
   */

  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    identifier: number
    token: number
    expires: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationTokenWhereInput
    orderBy?: VerificationTokenOrderByWithAggregationInput | VerificationTokenOrderByWithAggregationInput[]
    by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type VerificationTokenGroupByOutputType = {
    identifier: string
    token: string
    expires: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectScalar = {
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }

  export type VerificationTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"identifier" | "token" | "expires", ExtArgs["result"]["verificationToken"]>

  export type $VerificationTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VerificationToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      identifier: string
      token: string
      expires: Date
    }, ExtArgs["result"]["verificationToken"]>
    composites: {}
  }

  type VerificationTokenGetPayload<S extends boolean | null | undefined | VerificationTokenDefaultArgs> = $Result.GetResult<Prisma.$VerificationTokenPayload, S>

  type VerificationTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }

  export interface VerificationTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationToken'], meta: { name: 'VerificationToken' } }
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationTokenFindUniqueArgs>(args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VerificationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationTokenFindFirstArgs>(args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.findMany({ select: { identifier: true } })
     * 
     */
    findMany<T extends VerificationTokenFindManyArgs>(args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
     */
    create<T extends VerificationTokenCreateArgs>(args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VerificationTokens.
     * @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationTokenCreateManyArgs>(args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VerificationTokens and returns the data saved in the database.
     * @param {VerificationTokenCreateManyAndReturnArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.createManyAndReturn({
     *   select: { identifier: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
     */
    delete<T extends VerificationTokenDeleteArgs>(args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationTokenUpdateArgs>(args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationTokenDeleteManyArgs>(args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationTokenUpdateManyArgs>(args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens and returns the data updated in the database.
     * @param {VerificationTokenUpdateManyAndReturnArgs} args - Arguments to update many VerificationTokens.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.updateManyAndReturn({
     *   select: { identifier: true },
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
    updateManyAndReturn<T extends VerificationTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends VerificationTokenUpsertArgs>(args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
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
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationToken model
   */
  readonly fields: VerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the VerificationToken model
   */
  interface VerificationTokenFieldRefs {
    readonly identifier: FieldRef<"VerificationToken", 'String'>
    readonly token: FieldRef<"VerificationToken", 'String'>
    readonly expires: FieldRef<"VerificationToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VerificationToken findUnique
   */
  export type VerificationTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findFirst
   */
  export type VerificationTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }

  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
  }

  /**
   * VerificationToken createManyAndReturn
   */
  export type VerificationTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
  }

  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken updateManyAndReturn
   */
  export type VerificationTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }

  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to delete.
     */
    limit?: number
  }

  /**
   * VerificationToken without action
   */
  export type VerificationTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    password: string | null
    goal: string | null
    activityLevel: string | null
    recentLogs: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    password: string | null
    goal: string | null
    activityLevel: string | null
    recentLogs: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    password: number
    goal: number
    activityLevel: number
    recentLogs: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    password?: true
    goal?: true
    activityLevel?: true
    recentLogs?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    password?: true
    goal?: true
    activityLevel?: true
    recentLogs?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    password?: true
    goal?: true
    activityLevel?: true
    recentLogs?: true
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
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    password: string | null
    goal: string | null
    activityLevel: string | null
    recentLogs: string | null
    _count: UserCountAggregateOutputType | null
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
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    password?: boolean
    goal?: boolean
    activityLevel?: boolean
    recentLogs?: boolean
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    restrictions?: boolean | User$restrictionsArgs<ExtArgs>
    foods?: boolean | User$foodsArgs<ExtArgs>
    preferences?: boolean | User$preferencesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    password?: boolean
    goal?: boolean
    activityLevel?: boolean
    recentLogs?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    password?: boolean
    goal?: boolean
    activityLevel?: boolean
    recentLogs?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    password?: boolean
    goal?: boolean
    activityLevel?: boolean
    recentLogs?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "emailVerified" | "image" | "password" | "goal" | "activityLevel" | "recentLogs", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    restrictions?: boolean | User$restrictionsArgs<ExtArgs>
    foods?: boolean | User$foodsArgs<ExtArgs>
    preferences?: boolean | User$preferencesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      restrictions: Prisma.$DietaryRestrictionPayload<ExtArgs>[]
      foods: Prisma.$AvailableFoodPayload<ExtArgs>[]
      preferences: Prisma.$UserPreferencesPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      email: string | null
      emailVerified: Date | null
      image: string | null
      password: string | null
      goal: string | null
      activityLevel: string | null
      recentLogs: string | null
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
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    restrictions<T extends User$restrictionsArgs<ExtArgs> = {}>(args?: Subset<T, User$restrictionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DietaryRestrictionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    foods<T extends User$foodsArgs<ExtArgs> = {}>(args?: Subset<T, User$foodsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvailableFoodPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    preferences<T extends User$preferencesArgs<ExtArgs> = {}>(args?: Subset<T, User$preferencesArgs<ExtArgs>>): Prisma__UserPreferencesClient<$Result.GetResult<Prisma.$UserPreferencesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'DateTime'>
    readonly image: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly goal: FieldRef<"User", 'String'>
    readonly activityLevel: FieldRef<"User", 'String'>
    readonly recentLogs: FieldRef<"User", 'String'>
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
    data?: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
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
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.restrictions
   */
  export type User$restrictionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietaryRestriction
     */
    select?: DietaryRestrictionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DietaryRestriction
     */
    omit?: DietaryRestrictionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DietaryRestrictionInclude<ExtArgs> | null
    where?: DietaryRestrictionWhereInput
    orderBy?: DietaryRestrictionOrderByWithRelationInput | DietaryRestrictionOrderByWithRelationInput[]
    cursor?: DietaryRestrictionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DietaryRestrictionScalarFieldEnum | DietaryRestrictionScalarFieldEnum[]
  }

  /**
   * User.foods
   */
  export type User$foodsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableFood
     */
    select?: AvailableFoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableFood
     */
    omit?: AvailableFoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailableFoodInclude<ExtArgs> | null
    where?: AvailableFoodWhereInput
    orderBy?: AvailableFoodOrderByWithRelationInput | AvailableFoodOrderByWithRelationInput[]
    cursor?: AvailableFoodWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AvailableFoodScalarFieldEnum | AvailableFoodScalarFieldEnum[]
  }

  /**
   * User.preferences
   */
  export type User$preferencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreferences
     */
    select?: UserPreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreferences
     */
    omit?: UserPreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferencesInclude<ExtArgs> | null
    where?: UserPreferencesWhereInput
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
   * Model UserPreferences
   */

  export type AggregateUserPreferences = {
    _count: UserPreferencesCountAggregateOutputType | null
    _min: UserPreferencesMinAggregateOutputType | null
    _max: UserPreferencesMaxAggregateOutputType | null
  }

  export type UserPreferencesMinAggregateOutputType = {
    id: string | null
    userId: string | null
    onboarding: boolean | null
    theme: string | null
    notifications: boolean | null
    avatar: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserPreferencesMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    onboarding: boolean | null
    theme: string | null
    notifications: boolean | null
    avatar: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserPreferencesCountAggregateOutputType = {
    id: number
    userId: number
    onboarding: number
    theme: number
    notifications: number
    avatar: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserPreferencesMinAggregateInputType = {
    id?: true
    userId?: true
    onboarding?: true
    theme?: true
    notifications?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserPreferencesMaxAggregateInputType = {
    id?: true
    userId?: true
    onboarding?: true
    theme?: true
    notifications?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserPreferencesCountAggregateInputType = {
    id?: true
    userId?: true
    onboarding?: true
    theme?: true
    notifications?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserPreferencesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserPreferences to aggregate.
     */
    where?: UserPreferencesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserPreferences to fetch.
     */
    orderBy?: UserPreferencesOrderByWithRelationInput | UserPreferencesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserPreferencesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserPreferences
    **/
    _count?: true | UserPreferencesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserPreferencesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserPreferencesMaxAggregateInputType
  }

  export type GetUserPreferencesAggregateType<T extends UserPreferencesAggregateArgs> = {
        [P in keyof T & keyof AggregateUserPreferences]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserPreferences[P]>
      : GetScalarType<T[P], AggregateUserPreferences[P]>
  }




  export type UserPreferencesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserPreferencesWhereInput
    orderBy?: UserPreferencesOrderByWithAggregationInput | UserPreferencesOrderByWithAggregationInput[]
    by: UserPreferencesScalarFieldEnum[] | UserPreferencesScalarFieldEnum
    having?: UserPreferencesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserPreferencesCountAggregateInputType | true
    _min?: UserPreferencesMinAggregateInputType
    _max?: UserPreferencesMaxAggregateInputType
  }

  export type UserPreferencesGroupByOutputType = {
    id: string
    userId: string
    onboarding: boolean
    theme: string
    notifications: boolean
    avatar: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserPreferencesCountAggregateOutputType | null
    _min: UserPreferencesMinAggregateOutputType | null
    _max: UserPreferencesMaxAggregateOutputType | null
  }

  type GetUserPreferencesGroupByPayload<T extends UserPreferencesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserPreferencesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserPreferencesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserPreferencesGroupByOutputType[P]>
            : GetScalarType<T[P], UserPreferencesGroupByOutputType[P]>
        }
      >
    >


  export type UserPreferencesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    onboarding?: boolean
    theme?: boolean
    notifications?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userPreferences"]>

  export type UserPreferencesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    onboarding?: boolean
    theme?: boolean
    notifications?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userPreferences"]>

  export type UserPreferencesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    onboarding?: boolean
    theme?: boolean
    notifications?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userPreferences"]>

  export type UserPreferencesSelectScalar = {
    id?: boolean
    userId?: boolean
    onboarding?: boolean
    theme?: boolean
    notifications?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserPreferencesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "onboarding" | "theme" | "notifications" | "avatar" | "createdAt" | "updatedAt", ExtArgs["result"]["userPreferences"]>
  export type UserPreferencesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserPreferencesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserPreferencesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserPreferencesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserPreferences"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      onboarding: boolean
      theme: string
      notifications: boolean
      avatar: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userPreferences"]>
    composites: {}
  }

  type UserPreferencesGetPayload<S extends boolean | null | undefined | UserPreferencesDefaultArgs> = $Result.GetResult<Prisma.$UserPreferencesPayload, S>

  type UserPreferencesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserPreferencesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserPreferencesCountAggregateInputType | true
    }

  export interface UserPreferencesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserPreferences'], meta: { name: 'UserPreferences' } }
    /**
     * Find zero or one UserPreferences that matches the filter.
     * @param {UserPreferencesFindUniqueArgs} args - Arguments to find a UserPreferences
     * @example
     * // Get one UserPreferences
     * const userPreferences = await prisma.userPreferences.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserPreferencesFindUniqueArgs>(args: SelectSubset<T, UserPreferencesFindUniqueArgs<ExtArgs>>): Prisma__UserPreferencesClient<$Result.GetResult<Prisma.$UserPreferencesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserPreferences that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserPreferencesFindUniqueOrThrowArgs} args - Arguments to find a UserPreferences
     * @example
     * // Get one UserPreferences
     * const userPreferences = await prisma.userPreferences.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserPreferencesFindUniqueOrThrowArgs>(args: SelectSubset<T, UserPreferencesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserPreferencesClient<$Result.GetResult<Prisma.$UserPreferencesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserPreferences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPreferencesFindFirstArgs} args - Arguments to find a UserPreferences
     * @example
     * // Get one UserPreferences
     * const userPreferences = await prisma.userPreferences.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserPreferencesFindFirstArgs>(args?: SelectSubset<T, UserPreferencesFindFirstArgs<ExtArgs>>): Prisma__UserPreferencesClient<$Result.GetResult<Prisma.$UserPreferencesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserPreferences that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPreferencesFindFirstOrThrowArgs} args - Arguments to find a UserPreferences
     * @example
     * // Get one UserPreferences
     * const userPreferences = await prisma.userPreferences.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserPreferencesFindFirstOrThrowArgs>(args?: SelectSubset<T, UserPreferencesFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserPreferencesClient<$Result.GetResult<Prisma.$UserPreferencesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserPreferences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPreferencesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserPreferences
     * const userPreferences = await prisma.userPreferences.findMany()
     * 
     * // Get first 10 UserPreferences
     * const userPreferences = await prisma.userPreferences.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userPreferencesWithIdOnly = await prisma.userPreferences.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserPreferencesFindManyArgs>(args?: SelectSubset<T, UserPreferencesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPreferencesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserPreferences.
     * @param {UserPreferencesCreateArgs} args - Arguments to create a UserPreferences.
     * @example
     * // Create one UserPreferences
     * const UserPreferences = await prisma.userPreferences.create({
     *   data: {
     *     // ... data to create a UserPreferences
     *   }
     * })
     * 
     */
    create<T extends UserPreferencesCreateArgs>(args: SelectSubset<T, UserPreferencesCreateArgs<ExtArgs>>): Prisma__UserPreferencesClient<$Result.GetResult<Prisma.$UserPreferencesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserPreferences.
     * @param {UserPreferencesCreateManyArgs} args - Arguments to create many UserPreferences.
     * @example
     * // Create many UserPreferences
     * const userPreferences = await prisma.userPreferences.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserPreferencesCreateManyArgs>(args?: SelectSubset<T, UserPreferencesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserPreferences and returns the data saved in the database.
     * @param {UserPreferencesCreateManyAndReturnArgs} args - Arguments to create many UserPreferences.
     * @example
     * // Create many UserPreferences
     * const userPreferences = await prisma.userPreferences.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserPreferences and only return the `id`
     * const userPreferencesWithIdOnly = await prisma.userPreferences.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserPreferencesCreateManyAndReturnArgs>(args?: SelectSubset<T, UserPreferencesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPreferencesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserPreferences.
     * @param {UserPreferencesDeleteArgs} args - Arguments to delete one UserPreferences.
     * @example
     * // Delete one UserPreferences
     * const UserPreferences = await prisma.userPreferences.delete({
     *   where: {
     *     // ... filter to delete one UserPreferences
     *   }
     * })
     * 
     */
    delete<T extends UserPreferencesDeleteArgs>(args: SelectSubset<T, UserPreferencesDeleteArgs<ExtArgs>>): Prisma__UserPreferencesClient<$Result.GetResult<Prisma.$UserPreferencesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserPreferences.
     * @param {UserPreferencesUpdateArgs} args - Arguments to update one UserPreferences.
     * @example
     * // Update one UserPreferences
     * const userPreferences = await prisma.userPreferences.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserPreferencesUpdateArgs>(args: SelectSubset<T, UserPreferencesUpdateArgs<ExtArgs>>): Prisma__UserPreferencesClient<$Result.GetResult<Prisma.$UserPreferencesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserPreferences.
     * @param {UserPreferencesDeleteManyArgs} args - Arguments to filter UserPreferences to delete.
     * @example
     * // Delete a few UserPreferences
     * const { count } = await prisma.userPreferences.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserPreferencesDeleteManyArgs>(args?: SelectSubset<T, UserPreferencesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPreferencesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserPreferences
     * const userPreferences = await prisma.userPreferences.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserPreferencesUpdateManyArgs>(args: SelectSubset<T, UserPreferencesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserPreferences and returns the data updated in the database.
     * @param {UserPreferencesUpdateManyAndReturnArgs} args - Arguments to update many UserPreferences.
     * @example
     * // Update many UserPreferences
     * const userPreferences = await prisma.userPreferences.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserPreferences and only return the `id`
     * const userPreferencesWithIdOnly = await prisma.userPreferences.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserPreferencesUpdateManyAndReturnArgs>(args: SelectSubset<T, UserPreferencesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPreferencesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserPreferences.
     * @param {UserPreferencesUpsertArgs} args - Arguments to update or create a UserPreferences.
     * @example
     * // Update or create a UserPreferences
     * const userPreferences = await prisma.userPreferences.upsert({
     *   create: {
     *     // ... data to create a UserPreferences
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserPreferences we want to update
     *   }
     * })
     */
    upsert<T extends UserPreferencesUpsertArgs>(args: SelectSubset<T, UserPreferencesUpsertArgs<ExtArgs>>): Prisma__UserPreferencesClient<$Result.GetResult<Prisma.$UserPreferencesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPreferencesCountArgs} args - Arguments to filter UserPreferences to count.
     * @example
     * // Count the number of UserPreferences
     * const count = await prisma.userPreferences.count({
     *   where: {
     *     // ... the filter for the UserPreferences we want to count
     *   }
     * })
    **/
    count<T extends UserPreferencesCountArgs>(
      args?: Subset<T, UserPreferencesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserPreferencesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPreferencesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserPreferencesAggregateArgs>(args: Subset<T, UserPreferencesAggregateArgs>): Prisma.PrismaPromise<GetUserPreferencesAggregateType<T>>

    /**
     * Group by UserPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPreferencesGroupByArgs} args - Group by arguments.
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
      T extends UserPreferencesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserPreferencesGroupByArgs['orderBy'] }
        : { orderBy?: UserPreferencesGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserPreferencesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserPreferencesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserPreferences model
   */
  readonly fields: UserPreferencesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserPreferences.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserPreferencesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the UserPreferences model
   */
  interface UserPreferencesFieldRefs {
    readonly id: FieldRef<"UserPreferences", 'String'>
    readonly userId: FieldRef<"UserPreferences", 'String'>
    readonly onboarding: FieldRef<"UserPreferences", 'Boolean'>
    readonly theme: FieldRef<"UserPreferences", 'String'>
    readonly notifications: FieldRef<"UserPreferences", 'Boolean'>
    readonly avatar: FieldRef<"UserPreferences", 'String'>
    readonly createdAt: FieldRef<"UserPreferences", 'DateTime'>
    readonly updatedAt: FieldRef<"UserPreferences", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserPreferences findUnique
   */
  export type UserPreferencesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreferences
     */
    select?: UserPreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreferences
     */
    omit?: UserPreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferencesInclude<ExtArgs> | null
    /**
     * Filter, which UserPreferences to fetch.
     */
    where: UserPreferencesWhereUniqueInput
  }

  /**
   * UserPreferences findUniqueOrThrow
   */
  export type UserPreferencesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreferences
     */
    select?: UserPreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreferences
     */
    omit?: UserPreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferencesInclude<ExtArgs> | null
    /**
     * Filter, which UserPreferences to fetch.
     */
    where: UserPreferencesWhereUniqueInput
  }

  /**
   * UserPreferences findFirst
   */
  export type UserPreferencesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreferences
     */
    select?: UserPreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreferences
     */
    omit?: UserPreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferencesInclude<ExtArgs> | null
    /**
     * Filter, which UserPreferences to fetch.
     */
    where?: UserPreferencesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserPreferences to fetch.
     */
    orderBy?: UserPreferencesOrderByWithRelationInput | UserPreferencesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserPreferences.
     */
    cursor?: UserPreferencesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserPreferences.
     */
    distinct?: UserPreferencesScalarFieldEnum | UserPreferencesScalarFieldEnum[]
  }

  /**
   * UserPreferences findFirstOrThrow
   */
  export type UserPreferencesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreferences
     */
    select?: UserPreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreferences
     */
    omit?: UserPreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferencesInclude<ExtArgs> | null
    /**
     * Filter, which UserPreferences to fetch.
     */
    where?: UserPreferencesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserPreferences to fetch.
     */
    orderBy?: UserPreferencesOrderByWithRelationInput | UserPreferencesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserPreferences.
     */
    cursor?: UserPreferencesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserPreferences.
     */
    distinct?: UserPreferencesScalarFieldEnum | UserPreferencesScalarFieldEnum[]
  }

  /**
   * UserPreferences findMany
   */
  export type UserPreferencesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreferences
     */
    select?: UserPreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreferences
     */
    omit?: UserPreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferencesInclude<ExtArgs> | null
    /**
     * Filter, which UserPreferences to fetch.
     */
    where?: UserPreferencesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserPreferences to fetch.
     */
    orderBy?: UserPreferencesOrderByWithRelationInput | UserPreferencesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserPreferences.
     */
    cursor?: UserPreferencesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserPreferences.
     */
    skip?: number
    distinct?: UserPreferencesScalarFieldEnum | UserPreferencesScalarFieldEnum[]
  }

  /**
   * UserPreferences create
   */
  export type UserPreferencesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreferences
     */
    select?: UserPreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreferences
     */
    omit?: UserPreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferencesInclude<ExtArgs> | null
    /**
     * The data needed to create a UserPreferences.
     */
    data: XOR<UserPreferencesCreateInput, UserPreferencesUncheckedCreateInput>
  }

  /**
   * UserPreferences createMany
   */
  export type UserPreferencesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserPreferences.
     */
    data: UserPreferencesCreateManyInput | UserPreferencesCreateManyInput[]
  }

  /**
   * UserPreferences createManyAndReturn
   */
  export type UserPreferencesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreferences
     */
    select?: UserPreferencesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreferences
     */
    omit?: UserPreferencesOmit<ExtArgs> | null
    /**
     * The data used to create many UserPreferences.
     */
    data: UserPreferencesCreateManyInput | UserPreferencesCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferencesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserPreferences update
   */
  export type UserPreferencesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreferences
     */
    select?: UserPreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreferences
     */
    omit?: UserPreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferencesInclude<ExtArgs> | null
    /**
     * The data needed to update a UserPreferences.
     */
    data: XOR<UserPreferencesUpdateInput, UserPreferencesUncheckedUpdateInput>
    /**
     * Choose, which UserPreferences to update.
     */
    where: UserPreferencesWhereUniqueInput
  }

  /**
   * UserPreferences updateMany
   */
  export type UserPreferencesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserPreferences.
     */
    data: XOR<UserPreferencesUpdateManyMutationInput, UserPreferencesUncheckedUpdateManyInput>
    /**
     * Filter which UserPreferences to update
     */
    where?: UserPreferencesWhereInput
    /**
     * Limit how many UserPreferences to update.
     */
    limit?: number
  }

  /**
   * UserPreferences updateManyAndReturn
   */
  export type UserPreferencesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreferences
     */
    select?: UserPreferencesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreferences
     */
    omit?: UserPreferencesOmit<ExtArgs> | null
    /**
     * The data used to update UserPreferences.
     */
    data: XOR<UserPreferencesUpdateManyMutationInput, UserPreferencesUncheckedUpdateManyInput>
    /**
     * Filter which UserPreferences to update
     */
    where?: UserPreferencesWhereInput
    /**
     * Limit how many UserPreferences to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferencesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserPreferences upsert
   */
  export type UserPreferencesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreferences
     */
    select?: UserPreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreferences
     */
    omit?: UserPreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferencesInclude<ExtArgs> | null
    /**
     * The filter to search for the UserPreferences to update in case it exists.
     */
    where: UserPreferencesWhereUniqueInput
    /**
     * In case the UserPreferences found by the `where` argument doesn't exist, create a new UserPreferences with this data.
     */
    create: XOR<UserPreferencesCreateInput, UserPreferencesUncheckedCreateInput>
    /**
     * In case the UserPreferences was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserPreferencesUpdateInput, UserPreferencesUncheckedUpdateInput>
  }

  /**
   * UserPreferences delete
   */
  export type UserPreferencesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreferences
     */
    select?: UserPreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreferences
     */
    omit?: UserPreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferencesInclude<ExtArgs> | null
    /**
     * Filter which UserPreferences to delete.
     */
    where: UserPreferencesWhereUniqueInput
  }

  /**
   * UserPreferences deleteMany
   */
  export type UserPreferencesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserPreferences to delete
     */
    where?: UserPreferencesWhereInput
    /**
     * Limit how many UserPreferences to delete.
     */
    limit?: number
  }

  /**
   * UserPreferences without action
   */
  export type UserPreferencesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreferences
     */
    select?: UserPreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreferences
     */
    omit?: UserPreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferencesInclude<ExtArgs> | null
  }


  /**
   * Model DietaryRestriction
   */

  export type AggregateDietaryRestriction = {
    _count: DietaryRestrictionCountAggregateOutputType | null
    _min: DietaryRestrictionMinAggregateOutputType | null
    _max: DietaryRestrictionMaxAggregateOutputType | null
  }

  export type DietaryRestrictionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    foodItem: string | null
    reason: string | null
    severity: string | null
    category: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DietaryRestrictionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    foodItem: string | null
    reason: string | null
    severity: string | null
    category: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DietaryRestrictionCountAggregateOutputType = {
    id: number
    userId: number
    foodItem: number
    reason: number
    severity: number
    category: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DietaryRestrictionMinAggregateInputType = {
    id?: true
    userId?: true
    foodItem?: true
    reason?: true
    severity?: true
    category?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DietaryRestrictionMaxAggregateInputType = {
    id?: true
    userId?: true
    foodItem?: true
    reason?: true
    severity?: true
    category?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DietaryRestrictionCountAggregateInputType = {
    id?: true
    userId?: true
    foodItem?: true
    reason?: true
    severity?: true
    category?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DietaryRestrictionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DietaryRestriction to aggregate.
     */
    where?: DietaryRestrictionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DietaryRestrictions to fetch.
     */
    orderBy?: DietaryRestrictionOrderByWithRelationInput | DietaryRestrictionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DietaryRestrictionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DietaryRestrictions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DietaryRestrictions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DietaryRestrictions
    **/
    _count?: true | DietaryRestrictionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DietaryRestrictionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DietaryRestrictionMaxAggregateInputType
  }

  export type GetDietaryRestrictionAggregateType<T extends DietaryRestrictionAggregateArgs> = {
        [P in keyof T & keyof AggregateDietaryRestriction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDietaryRestriction[P]>
      : GetScalarType<T[P], AggregateDietaryRestriction[P]>
  }




  export type DietaryRestrictionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DietaryRestrictionWhereInput
    orderBy?: DietaryRestrictionOrderByWithAggregationInput | DietaryRestrictionOrderByWithAggregationInput[]
    by: DietaryRestrictionScalarFieldEnum[] | DietaryRestrictionScalarFieldEnum
    having?: DietaryRestrictionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DietaryRestrictionCountAggregateInputType | true
    _min?: DietaryRestrictionMinAggregateInputType
    _max?: DietaryRestrictionMaxAggregateInputType
  }

  export type DietaryRestrictionGroupByOutputType = {
    id: string
    userId: string | null
    foodItem: string
    reason: string
    severity: string
    category: string | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: DietaryRestrictionCountAggregateOutputType | null
    _min: DietaryRestrictionMinAggregateOutputType | null
    _max: DietaryRestrictionMaxAggregateOutputType | null
  }

  type GetDietaryRestrictionGroupByPayload<T extends DietaryRestrictionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DietaryRestrictionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DietaryRestrictionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DietaryRestrictionGroupByOutputType[P]>
            : GetScalarType<T[P], DietaryRestrictionGroupByOutputType[P]>
        }
      >
    >


  export type DietaryRestrictionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    foodItem?: boolean
    reason?: boolean
    severity?: boolean
    category?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | DietaryRestriction$userArgs<ExtArgs>
  }, ExtArgs["result"]["dietaryRestriction"]>

  export type DietaryRestrictionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    foodItem?: boolean
    reason?: boolean
    severity?: boolean
    category?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | DietaryRestriction$userArgs<ExtArgs>
  }, ExtArgs["result"]["dietaryRestriction"]>

  export type DietaryRestrictionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    foodItem?: boolean
    reason?: boolean
    severity?: boolean
    category?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | DietaryRestriction$userArgs<ExtArgs>
  }, ExtArgs["result"]["dietaryRestriction"]>

  export type DietaryRestrictionSelectScalar = {
    id?: boolean
    userId?: boolean
    foodItem?: boolean
    reason?: boolean
    severity?: boolean
    category?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DietaryRestrictionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "foodItem" | "reason" | "severity" | "category" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["dietaryRestriction"]>
  export type DietaryRestrictionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | DietaryRestriction$userArgs<ExtArgs>
  }
  export type DietaryRestrictionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | DietaryRestriction$userArgs<ExtArgs>
  }
  export type DietaryRestrictionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | DietaryRestriction$userArgs<ExtArgs>
  }

  export type $DietaryRestrictionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DietaryRestriction"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      foodItem: string
      reason: string
      severity: string
      category: string | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["dietaryRestriction"]>
    composites: {}
  }

  type DietaryRestrictionGetPayload<S extends boolean | null | undefined | DietaryRestrictionDefaultArgs> = $Result.GetResult<Prisma.$DietaryRestrictionPayload, S>

  type DietaryRestrictionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DietaryRestrictionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DietaryRestrictionCountAggregateInputType | true
    }

  export interface DietaryRestrictionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DietaryRestriction'], meta: { name: 'DietaryRestriction' } }
    /**
     * Find zero or one DietaryRestriction that matches the filter.
     * @param {DietaryRestrictionFindUniqueArgs} args - Arguments to find a DietaryRestriction
     * @example
     * // Get one DietaryRestriction
     * const dietaryRestriction = await prisma.dietaryRestriction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DietaryRestrictionFindUniqueArgs>(args: SelectSubset<T, DietaryRestrictionFindUniqueArgs<ExtArgs>>): Prisma__DietaryRestrictionClient<$Result.GetResult<Prisma.$DietaryRestrictionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DietaryRestriction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DietaryRestrictionFindUniqueOrThrowArgs} args - Arguments to find a DietaryRestriction
     * @example
     * // Get one DietaryRestriction
     * const dietaryRestriction = await prisma.dietaryRestriction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DietaryRestrictionFindUniqueOrThrowArgs>(args: SelectSubset<T, DietaryRestrictionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DietaryRestrictionClient<$Result.GetResult<Prisma.$DietaryRestrictionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DietaryRestriction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DietaryRestrictionFindFirstArgs} args - Arguments to find a DietaryRestriction
     * @example
     * // Get one DietaryRestriction
     * const dietaryRestriction = await prisma.dietaryRestriction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DietaryRestrictionFindFirstArgs>(args?: SelectSubset<T, DietaryRestrictionFindFirstArgs<ExtArgs>>): Prisma__DietaryRestrictionClient<$Result.GetResult<Prisma.$DietaryRestrictionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DietaryRestriction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DietaryRestrictionFindFirstOrThrowArgs} args - Arguments to find a DietaryRestriction
     * @example
     * // Get one DietaryRestriction
     * const dietaryRestriction = await prisma.dietaryRestriction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DietaryRestrictionFindFirstOrThrowArgs>(args?: SelectSubset<T, DietaryRestrictionFindFirstOrThrowArgs<ExtArgs>>): Prisma__DietaryRestrictionClient<$Result.GetResult<Prisma.$DietaryRestrictionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DietaryRestrictions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DietaryRestrictionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DietaryRestrictions
     * const dietaryRestrictions = await prisma.dietaryRestriction.findMany()
     * 
     * // Get first 10 DietaryRestrictions
     * const dietaryRestrictions = await prisma.dietaryRestriction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dietaryRestrictionWithIdOnly = await prisma.dietaryRestriction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DietaryRestrictionFindManyArgs>(args?: SelectSubset<T, DietaryRestrictionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DietaryRestrictionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DietaryRestriction.
     * @param {DietaryRestrictionCreateArgs} args - Arguments to create a DietaryRestriction.
     * @example
     * // Create one DietaryRestriction
     * const DietaryRestriction = await prisma.dietaryRestriction.create({
     *   data: {
     *     // ... data to create a DietaryRestriction
     *   }
     * })
     * 
     */
    create<T extends DietaryRestrictionCreateArgs>(args: SelectSubset<T, DietaryRestrictionCreateArgs<ExtArgs>>): Prisma__DietaryRestrictionClient<$Result.GetResult<Prisma.$DietaryRestrictionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DietaryRestrictions.
     * @param {DietaryRestrictionCreateManyArgs} args - Arguments to create many DietaryRestrictions.
     * @example
     * // Create many DietaryRestrictions
     * const dietaryRestriction = await prisma.dietaryRestriction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DietaryRestrictionCreateManyArgs>(args?: SelectSubset<T, DietaryRestrictionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DietaryRestrictions and returns the data saved in the database.
     * @param {DietaryRestrictionCreateManyAndReturnArgs} args - Arguments to create many DietaryRestrictions.
     * @example
     * // Create many DietaryRestrictions
     * const dietaryRestriction = await prisma.dietaryRestriction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DietaryRestrictions and only return the `id`
     * const dietaryRestrictionWithIdOnly = await prisma.dietaryRestriction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DietaryRestrictionCreateManyAndReturnArgs>(args?: SelectSubset<T, DietaryRestrictionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DietaryRestrictionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DietaryRestriction.
     * @param {DietaryRestrictionDeleteArgs} args - Arguments to delete one DietaryRestriction.
     * @example
     * // Delete one DietaryRestriction
     * const DietaryRestriction = await prisma.dietaryRestriction.delete({
     *   where: {
     *     // ... filter to delete one DietaryRestriction
     *   }
     * })
     * 
     */
    delete<T extends DietaryRestrictionDeleteArgs>(args: SelectSubset<T, DietaryRestrictionDeleteArgs<ExtArgs>>): Prisma__DietaryRestrictionClient<$Result.GetResult<Prisma.$DietaryRestrictionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DietaryRestriction.
     * @param {DietaryRestrictionUpdateArgs} args - Arguments to update one DietaryRestriction.
     * @example
     * // Update one DietaryRestriction
     * const dietaryRestriction = await prisma.dietaryRestriction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DietaryRestrictionUpdateArgs>(args: SelectSubset<T, DietaryRestrictionUpdateArgs<ExtArgs>>): Prisma__DietaryRestrictionClient<$Result.GetResult<Prisma.$DietaryRestrictionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DietaryRestrictions.
     * @param {DietaryRestrictionDeleteManyArgs} args - Arguments to filter DietaryRestrictions to delete.
     * @example
     * // Delete a few DietaryRestrictions
     * const { count } = await prisma.dietaryRestriction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DietaryRestrictionDeleteManyArgs>(args?: SelectSubset<T, DietaryRestrictionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DietaryRestrictions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DietaryRestrictionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DietaryRestrictions
     * const dietaryRestriction = await prisma.dietaryRestriction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DietaryRestrictionUpdateManyArgs>(args: SelectSubset<T, DietaryRestrictionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DietaryRestrictions and returns the data updated in the database.
     * @param {DietaryRestrictionUpdateManyAndReturnArgs} args - Arguments to update many DietaryRestrictions.
     * @example
     * // Update many DietaryRestrictions
     * const dietaryRestriction = await prisma.dietaryRestriction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DietaryRestrictions and only return the `id`
     * const dietaryRestrictionWithIdOnly = await prisma.dietaryRestriction.updateManyAndReturn({
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
    updateManyAndReturn<T extends DietaryRestrictionUpdateManyAndReturnArgs>(args: SelectSubset<T, DietaryRestrictionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DietaryRestrictionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DietaryRestriction.
     * @param {DietaryRestrictionUpsertArgs} args - Arguments to update or create a DietaryRestriction.
     * @example
     * // Update or create a DietaryRestriction
     * const dietaryRestriction = await prisma.dietaryRestriction.upsert({
     *   create: {
     *     // ... data to create a DietaryRestriction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DietaryRestriction we want to update
     *   }
     * })
     */
    upsert<T extends DietaryRestrictionUpsertArgs>(args: SelectSubset<T, DietaryRestrictionUpsertArgs<ExtArgs>>): Prisma__DietaryRestrictionClient<$Result.GetResult<Prisma.$DietaryRestrictionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DietaryRestrictions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DietaryRestrictionCountArgs} args - Arguments to filter DietaryRestrictions to count.
     * @example
     * // Count the number of DietaryRestrictions
     * const count = await prisma.dietaryRestriction.count({
     *   where: {
     *     // ... the filter for the DietaryRestrictions we want to count
     *   }
     * })
    **/
    count<T extends DietaryRestrictionCountArgs>(
      args?: Subset<T, DietaryRestrictionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DietaryRestrictionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DietaryRestriction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DietaryRestrictionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DietaryRestrictionAggregateArgs>(args: Subset<T, DietaryRestrictionAggregateArgs>): Prisma.PrismaPromise<GetDietaryRestrictionAggregateType<T>>

    /**
     * Group by DietaryRestriction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DietaryRestrictionGroupByArgs} args - Group by arguments.
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
      T extends DietaryRestrictionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DietaryRestrictionGroupByArgs['orderBy'] }
        : { orderBy?: DietaryRestrictionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DietaryRestrictionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDietaryRestrictionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DietaryRestriction model
   */
  readonly fields: DietaryRestrictionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DietaryRestriction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DietaryRestrictionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends DietaryRestriction$userArgs<ExtArgs> = {}>(args?: Subset<T, DietaryRestriction$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the DietaryRestriction model
   */
  interface DietaryRestrictionFieldRefs {
    readonly id: FieldRef<"DietaryRestriction", 'String'>
    readonly userId: FieldRef<"DietaryRestriction", 'String'>
    readonly foodItem: FieldRef<"DietaryRestriction", 'String'>
    readonly reason: FieldRef<"DietaryRestriction", 'String'>
    readonly severity: FieldRef<"DietaryRestriction", 'String'>
    readonly category: FieldRef<"DietaryRestriction", 'String'>
    readonly notes: FieldRef<"DietaryRestriction", 'String'>
    readonly createdAt: FieldRef<"DietaryRestriction", 'DateTime'>
    readonly updatedAt: FieldRef<"DietaryRestriction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DietaryRestriction findUnique
   */
  export type DietaryRestrictionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietaryRestriction
     */
    select?: DietaryRestrictionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DietaryRestriction
     */
    omit?: DietaryRestrictionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DietaryRestrictionInclude<ExtArgs> | null
    /**
     * Filter, which DietaryRestriction to fetch.
     */
    where: DietaryRestrictionWhereUniqueInput
  }

  /**
   * DietaryRestriction findUniqueOrThrow
   */
  export type DietaryRestrictionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietaryRestriction
     */
    select?: DietaryRestrictionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DietaryRestriction
     */
    omit?: DietaryRestrictionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DietaryRestrictionInclude<ExtArgs> | null
    /**
     * Filter, which DietaryRestriction to fetch.
     */
    where: DietaryRestrictionWhereUniqueInput
  }

  /**
   * DietaryRestriction findFirst
   */
  export type DietaryRestrictionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietaryRestriction
     */
    select?: DietaryRestrictionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DietaryRestriction
     */
    omit?: DietaryRestrictionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DietaryRestrictionInclude<ExtArgs> | null
    /**
     * Filter, which DietaryRestriction to fetch.
     */
    where?: DietaryRestrictionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DietaryRestrictions to fetch.
     */
    orderBy?: DietaryRestrictionOrderByWithRelationInput | DietaryRestrictionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DietaryRestrictions.
     */
    cursor?: DietaryRestrictionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DietaryRestrictions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DietaryRestrictions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DietaryRestrictions.
     */
    distinct?: DietaryRestrictionScalarFieldEnum | DietaryRestrictionScalarFieldEnum[]
  }

  /**
   * DietaryRestriction findFirstOrThrow
   */
  export type DietaryRestrictionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietaryRestriction
     */
    select?: DietaryRestrictionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DietaryRestriction
     */
    omit?: DietaryRestrictionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DietaryRestrictionInclude<ExtArgs> | null
    /**
     * Filter, which DietaryRestriction to fetch.
     */
    where?: DietaryRestrictionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DietaryRestrictions to fetch.
     */
    orderBy?: DietaryRestrictionOrderByWithRelationInput | DietaryRestrictionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DietaryRestrictions.
     */
    cursor?: DietaryRestrictionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DietaryRestrictions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DietaryRestrictions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DietaryRestrictions.
     */
    distinct?: DietaryRestrictionScalarFieldEnum | DietaryRestrictionScalarFieldEnum[]
  }

  /**
   * DietaryRestriction findMany
   */
  export type DietaryRestrictionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietaryRestriction
     */
    select?: DietaryRestrictionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DietaryRestriction
     */
    omit?: DietaryRestrictionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DietaryRestrictionInclude<ExtArgs> | null
    /**
     * Filter, which DietaryRestrictions to fetch.
     */
    where?: DietaryRestrictionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DietaryRestrictions to fetch.
     */
    orderBy?: DietaryRestrictionOrderByWithRelationInput | DietaryRestrictionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DietaryRestrictions.
     */
    cursor?: DietaryRestrictionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DietaryRestrictions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DietaryRestrictions.
     */
    skip?: number
    distinct?: DietaryRestrictionScalarFieldEnum | DietaryRestrictionScalarFieldEnum[]
  }

  /**
   * DietaryRestriction create
   */
  export type DietaryRestrictionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietaryRestriction
     */
    select?: DietaryRestrictionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DietaryRestriction
     */
    omit?: DietaryRestrictionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DietaryRestrictionInclude<ExtArgs> | null
    /**
     * The data needed to create a DietaryRestriction.
     */
    data: XOR<DietaryRestrictionCreateInput, DietaryRestrictionUncheckedCreateInput>
  }

  /**
   * DietaryRestriction createMany
   */
  export type DietaryRestrictionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DietaryRestrictions.
     */
    data: DietaryRestrictionCreateManyInput | DietaryRestrictionCreateManyInput[]
  }

  /**
   * DietaryRestriction createManyAndReturn
   */
  export type DietaryRestrictionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietaryRestriction
     */
    select?: DietaryRestrictionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DietaryRestriction
     */
    omit?: DietaryRestrictionOmit<ExtArgs> | null
    /**
     * The data used to create many DietaryRestrictions.
     */
    data: DietaryRestrictionCreateManyInput | DietaryRestrictionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DietaryRestrictionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DietaryRestriction update
   */
  export type DietaryRestrictionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietaryRestriction
     */
    select?: DietaryRestrictionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DietaryRestriction
     */
    omit?: DietaryRestrictionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DietaryRestrictionInclude<ExtArgs> | null
    /**
     * The data needed to update a DietaryRestriction.
     */
    data: XOR<DietaryRestrictionUpdateInput, DietaryRestrictionUncheckedUpdateInput>
    /**
     * Choose, which DietaryRestriction to update.
     */
    where: DietaryRestrictionWhereUniqueInput
  }

  /**
   * DietaryRestriction updateMany
   */
  export type DietaryRestrictionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DietaryRestrictions.
     */
    data: XOR<DietaryRestrictionUpdateManyMutationInput, DietaryRestrictionUncheckedUpdateManyInput>
    /**
     * Filter which DietaryRestrictions to update
     */
    where?: DietaryRestrictionWhereInput
    /**
     * Limit how many DietaryRestrictions to update.
     */
    limit?: number
  }

  /**
   * DietaryRestriction updateManyAndReturn
   */
  export type DietaryRestrictionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietaryRestriction
     */
    select?: DietaryRestrictionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DietaryRestriction
     */
    omit?: DietaryRestrictionOmit<ExtArgs> | null
    /**
     * The data used to update DietaryRestrictions.
     */
    data: XOR<DietaryRestrictionUpdateManyMutationInput, DietaryRestrictionUncheckedUpdateManyInput>
    /**
     * Filter which DietaryRestrictions to update
     */
    where?: DietaryRestrictionWhereInput
    /**
     * Limit how many DietaryRestrictions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DietaryRestrictionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DietaryRestriction upsert
   */
  export type DietaryRestrictionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietaryRestriction
     */
    select?: DietaryRestrictionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DietaryRestriction
     */
    omit?: DietaryRestrictionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DietaryRestrictionInclude<ExtArgs> | null
    /**
     * The filter to search for the DietaryRestriction to update in case it exists.
     */
    where: DietaryRestrictionWhereUniqueInput
    /**
     * In case the DietaryRestriction found by the `where` argument doesn't exist, create a new DietaryRestriction with this data.
     */
    create: XOR<DietaryRestrictionCreateInput, DietaryRestrictionUncheckedCreateInput>
    /**
     * In case the DietaryRestriction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DietaryRestrictionUpdateInput, DietaryRestrictionUncheckedUpdateInput>
  }

  /**
   * DietaryRestriction delete
   */
  export type DietaryRestrictionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietaryRestriction
     */
    select?: DietaryRestrictionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DietaryRestriction
     */
    omit?: DietaryRestrictionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DietaryRestrictionInclude<ExtArgs> | null
    /**
     * Filter which DietaryRestriction to delete.
     */
    where: DietaryRestrictionWhereUniqueInput
  }

  /**
   * DietaryRestriction deleteMany
   */
  export type DietaryRestrictionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DietaryRestrictions to delete
     */
    where?: DietaryRestrictionWhereInput
    /**
     * Limit how many DietaryRestrictions to delete.
     */
    limit?: number
  }

  /**
   * DietaryRestriction.user
   */
  export type DietaryRestriction$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * DietaryRestriction without action
   */
  export type DietaryRestrictionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietaryRestriction
     */
    select?: DietaryRestrictionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DietaryRestriction
     */
    omit?: DietaryRestrictionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DietaryRestrictionInclude<ExtArgs> | null
  }


  /**
   * Model AvailableFood
   */

  export type AggregateAvailableFood = {
    _count: AvailableFoodCountAggregateOutputType | null
    _min: AvailableFoodMinAggregateOutputType | null
    _max: AvailableFoodMaxAggregateOutputType | null
  }

  export type AvailableFoodMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    category: string | null
    mealType: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AvailableFoodMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    category: string | null
    mealType: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AvailableFoodCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    category: number
    mealType: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AvailableFoodMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    category?: true
    mealType?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AvailableFoodMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    category?: true
    mealType?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AvailableFoodCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    category?: true
    mealType?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AvailableFoodAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AvailableFood to aggregate.
     */
    where?: AvailableFoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvailableFoods to fetch.
     */
    orderBy?: AvailableFoodOrderByWithRelationInput | AvailableFoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AvailableFoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvailableFoods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvailableFoods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AvailableFoods
    **/
    _count?: true | AvailableFoodCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AvailableFoodMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AvailableFoodMaxAggregateInputType
  }

  export type GetAvailableFoodAggregateType<T extends AvailableFoodAggregateArgs> = {
        [P in keyof T & keyof AggregateAvailableFood]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAvailableFood[P]>
      : GetScalarType<T[P], AggregateAvailableFood[P]>
  }




  export type AvailableFoodGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AvailableFoodWhereInput
    orderBy?: AvailableFoodOrderByWithAggregationInput | AvailableFoodOrderByWithAggregationInput[]
    by: AvailableFoodScalarFieldEnum[] | AvailableFoodScalarFieldEnum
    having?: AvailableFoodScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AvailableFoodCountAggregateInputType | true
    _min?: AvailableFoodMinAggregateInputType
    _max?: AvailableFoodMaxAggregateInputType
  }

  export type AvailableFoodGroupByOutputType = {
    id: string
    userId: string | null
    name: string
    category: string | null
    mealType: string | null
    createdAt: Date
    updatedAt: Date
    _count: AvailableFoodCountAggregateOutputType | null
    _min: AvailableFoodMinAggregateOutputType | null
    _max: AvailableFoodMaxAggregateOutputType | null
  }

  type GetAvailableFoodGroupByPayload<T extends AvailableFoodGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AvailableFoodGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AvailableFoodGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AvailableFoodGroupByOutputType[P]>
            : GetScalarType<T[P], AvailableFoodGroupByOutputType[P]>
        }
      >
    >


  export type AvailableFoodSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    category?: boolean
    mealType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | AvailableFood$userArgs<ExtArgs>
  }, ExtArgs["result"]["availableFood"]>

  export type AvailableFoodSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    category?: boolean
    mealType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | AvailableFood$userArgs<ExtArgs>
  }, ExtArgs["result"]["availableFood"]>

  export type AvailableFoodSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    category?: boolean
    mealType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | AvailableFood$userArgs<ExtArgs>
  }, ExtArgs["result"]["availableFood"]>

  export type AvailableFoodSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    category?: boolean
    mealType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AvailableFoodOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "category" | "mealType" | "createdAt" | "updatedAt", ExtArgs["result"]["availableFood"]>
  export type AvailableFoodInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AvailableFood$userArgs<ExtArgs>
  }
  export type AvailableFoodIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AvailableFood$userArgs<ExtArgs>
  }
  export type AvailableFoodIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AvailableFood$userArgs<ExtArgs>
  }

  export type $AvailableFoodPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AvailableFood"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      name: string
      category: string | null
      mealType: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["availableFood"]>
    composites: {}
  }

  type AvailableFoodGetPayload<S extends boolean | null | undefined | AvailableFoodDefaultArgs> = $Result.GetResult<Prisma.$AvailableFoodPayload, S>

  type AvailableFoodCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AvailableFoodFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AvailableFoodCountAggregateInputType | true
    }

  export interface AvailableFoodDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AvailableFood'], meta: { name: 'AvailableFood' } }
    /**
     * Find zero or one AvailableFood that matches the filter.
     * @param {AvailableFoodFindUniqueArgs} args - Arguments to find a AvailableFood
     * @example
     * // Get one AvailableFood
     * const availableFood = await prisma.availableFood.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AvailableFoodFindUniqueArgs>(args: SelectSubset<T, AvailableFoodFindUniqueArgs<ExtArgs>>): Prisma__AvailableFoodClient<$Result.GetResult<Prisma.$AvailableFoodPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AvailableFood that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AvailableFoodFindUniqueOrThrowArgs} args - Arguments to find a AvailableFood
     * @example
     * // Get one AvailableFood
     * const availableFood = await prisma.availableFood.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AvailableFoodFindUniqueOrThrowArgs>(args: SelectSubset<T, AvailableFoodFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AvailableFoodClient<$Result.GetResult<Prisma.$AvailableFoodPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AvailableFood that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailableFoodFindFirstArgs} args - Arguments to find a AvailableFood
     * @example
     * // Get one AvailableFood
     * const availableFood = await prisma.availableFood.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AvailableFoodFindFirstArgs>(args?: SelectSubset<T, AvailableFoodFindFirstArgs<ExtArgs>>): Prisma__AvailableFoodClient<$Result.GetResult<Prisma.$AvailableFoodPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AvailableFood that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailableFoodFindFirstOrThrowArgs} args - Arguments to find a AvailableFood
     * @example
     * // Get one AvailableFood
     * const availableFood = await prisma.availableFood.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AvailableFoodFindFirstOrThrowArgs>(args?: SelectSubset<T, AvailableFoodFindFirstOrThrowArgs<ExtArgs>>): Prisma__AvailableFoodClient<$Result.GetResult<Prisma.$AvailableFoodPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AvailableFoods that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailableFoodFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AvailableFoods
     * const availableFoods = await prisma.availableFood.findMany()
     * 
     * // Get first 10 AvailableFoods
     * const availableFoods = await prisma.availableFood.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const availableFoodWithIdOnly = await prisma.availableFood.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AvailableFoodFindManyArgs>(args?: SelectSubset<T, AvailableFoodFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvailableFoodPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AvailableFood.
     * @param {AvailableFoodCreateArgs} args - Arguments to create a AvailableFood.
     * @example
     * // Create one AvailableFood
     * const AvailableFood = await prisma.availableFood.create({
     *   data: {
     *     // ... data to create a AvailableFood
     *   }
     * })
     * 
     */
    create<T extends AvailableFoodCreateArgs>(args: SelectSubset<T, AvailableFoodCreateArgs<ExtArgs>>): Prisma__AvailableFoodClient<$Result.GetResult<Prisma.$AvailableFoodPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AvailableFoods.
     * @param {AvailableFoodCreateManyArgs} args - Arguments to create many AvailableFoods.
     * @example
     * // Create many AvailableFoods
     * const availableFood = await prisma.availableFood.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AvailableFoodCreateManyArgs>(args?: SelectSubset<T, AvailableFoodCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AvailableFoods and returns the data saved in the database.
     * @param {AvailableFoodCreateManyAndReturnArgs} args - Arguments to create many AvailableFoods.
     * @example
     * // Create many AvailableFoods
     * const availableFood = await prisma.availableFood.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AvailableFoods and only return the `id`
     * const availableFoodWithIdOnly = await prisma.availableFood.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AvailableFoodCreateManyAndReturnArgs>(args?: SelectSubset<T, AvailableFoodCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvailableFoodPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AvailableFood.
     * @param {AvailableFoodDeleteArgs} args - Arguments to delete one AvailableFood.
     * @example
     * // Delete one AvailableFood
     * const AvailableFood = await prisma.availableFood.delete({
     *   where: {
     *     // ... filter to delete one AvailableFood
     *   }
     * })
     * 
     */
    delete<T extends AvailableFoodDeleteArgs>(args: SelectSubset<T, AvailableFoodDeleteArgs<ExtArgs>>): Prisma__AvailableFoodClient<$Result.GetResult<Prisma.$AvailableFoodPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AvailableFood.
     * @param {AvailableFoodUpdateArgs} args - Arguments to update one AvailableFood.
     * @example
     * // Update one AvailableFood
     * const availableFood = await prisma.availableFood.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AvailableFoodUpdateArgs>(args: SelectSubset<T, AvailableFoodUpdateArgs<ExtArgs>>): Prisma__AvailableFoodClient<$Result.GetResult<Prisma.$AvailableFoodPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AvailableFoods.
     * @param {AvailableFoodDeleteManyArgs} args - Arguments to filter AvailableFoods to delete.
     * @example
     * // Delete a few AvailableFoods
     * const { count } = await prisma.availableFood.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AvailableFoodDeleteManyArgs>(args?: SelectSubset<T, AvailableFoodDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AvailableFoods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailableFoodUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AvailableFoods
     * const availableFood = await prisma.availableFood.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AvailableFoodUpdateManyArgs>(args: SelectSubset<T, AvailableFoodUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AvailableFoods and returns the data updated in the database.
     * @param {AvailableFoodUpdateManyAndReturnArgs} args - Arguments to update many AvailableFoods.
     * @example
     * // Update many AvailableFoods
     * const availableFood = await prisma.availableFood.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AvailableFoods and only return the `id`
     * const availableFoodWithIdOnly = await prisma.availableFood.updateManyAndReturn({
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
    updateManyAndReturn<T extends AvailableFoodUpdateManyAndReturnArgs>(args: SelectSubset<T, AvailableFoodUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvailableFoodPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AvailableFood.
     * @param {AvailableFoodUpsertArgs} args - Arguments to update or create a AvailableFood.
     * @example
     * // Update or create a AvailableFood
     * const availableFood = await prisma.availableFood.upsert({
     *   create: {
     *     // ... data to create a AvailableFood
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AvailableFood we want to update
     *   }
     * })
     */
    upsert<T extends AvailableFoodUpsertArgs>(args: SelectSubset<T, AvailableFoodUpsertArgs<ExtArgs>>): Prisma__AvailableFoodClient<$Result.GetResult<Prisma.$AvailableFoodPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AvailableFoods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailableFoodCountArgs} args - Arguments to filter AvailableFoods to count.
     * @example
     * // Count the number of AvailableFoods
     * const count = await prisma.availableFood.count({
     *   where: {
     *     // ... the filter for the AvailableFoods we want to count
     *   }
     * })
    **/
    count<T extends AvailableFoodCountArgs>(
      args?: Subset<T, AvailableFoodCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AvailableFoodCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AvailableFood.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailableFoodAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AvailableFoodAggregateArgs>(args: Subset<T, AvailableFoodAggregateArgs>): Prisma.PrismaPromise<GetAvailableFoodAggregateType<T>>

    /**
     * Group by AvailableFood.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailableFoodGroupByArgs} args - Group by arguments.
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
      T extends AvailableFoodGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AvailableFoodGroupByArgs['orderBy'] }
        : { orderBy?: AvailableFoodGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AvailableFoodGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAvailableFoodGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AvailableFood model
   */
  readonly fields: AvailableFoodFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AvailableFood.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AvailableFoodClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends AvailableFood$userArgs<ExtArgs> = {}>(args?: Subset<T, AvailableFood$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the AvailableFood model
   */
  interface AvailableFoodFieldRefs {
    readonly id: FieldRef<"AvailableFood", 'String'>
    readonly userId: FieldRef<"AvailableFood", 'String'>
    readonly name: FieldRef<"AvailableFood", 'String'>
    readonly category: FieldRef<"AvailableFood", 'String'>
    readonly mealType: FieldRef<"AvailableFood", 'String'>
    readonly createdAt: FieldRef<"AvailableFood", 'DateTime'>
    readonly updatedAt: FieldRef<"AvailableFood", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AvailableFood findUnique
   */
  export type AvailableFoodFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableFood
     */
    select?: AvailableFoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableFood
     */
    omit?: AvailableFoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailableFoodInclude<ExtArgs> | null
    /**
     * Filter, which AvailableFood to fetch.
     */
    where: AvailableFoodWhereUniqueInput
  }

  /**
   * AvailableFood findUniqueOrThrow
   */
  export type AvailableFoodFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableFood
     */
    select?: AvailableFoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableFood
     */
    omit?: AvailableFoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailableFoodInclude<ExtArgs> | null
    /**
     * Filter, which AvailableFood to fetch.
     */
    where: AvailableFoodWhereUniqueInput
  }

  /**
   * AvailableFood findFirst
   */
  export type AvailableFoodFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableFood
     */
    select?: AvailableFoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableFood
     */
    omit?: AvailableFoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailableFoodInclude<ExtArgs> | null
    /**
     * Filter, which AvailableFood to fetch.
     */
    where?: AvailableFoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvailableFoods to fetch.
     */
    orderBy?: AvailableFoodOrderByWithRelationInput | AvailableFoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AvailableFoods.
     */
    cursor?: AvailableFoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvailableFoods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvailableFoods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AvailableFoods.
     */
    distinct?: AvailableFoodScalarFieldEnum | AvailableFoodScalarFieldEnum[]
  }

  /**
   * AvailableFood findFirstOrThrow
   */
  export type AvailableFoodFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableFood
     */
    select?: AvailableFoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableFood
     */
    omit?: AvailableFoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailableFoodInclude<ExtArgs> | null
    /**
     * Filter, which AvailableFood to fetch.
     */
    where?: AvailableFoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvailableFoods to fetch.
     */
    orderBy?: AvailableFoodOrderByWithRelationInput | AvailableFoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AvailableFoods.
     */
    cursor?: AvailableFoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvailableFoods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvailableFoods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AvailableFoods.
     */
    distinct?: AvailableFoodScalarFieldEnum | AvailableFoodScalarFieldEnum[]
  }

  /**
   * AvailableFood findMany
   */
  export type AvailableFoodFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableFood
     */
    select?: AvailableFoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableFood
     */
    omit?: AvailableFoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailableFoodInclude<ExtArgs> | null
    /**
     * Filter, which AvailableFoods to fetch.
     */
    where?: AvailableFoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvailableFoods to fetch.
     */
    orderBy?: AvailableFoodOrderByWithRelationInput | AvailableFoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AvailableFoods.
     */
    cursor?: AvailableFoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvailableFoods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvailableFoods.
     */
    skip?: number
    distinct?: AvailableFoodScalarFieldEnum | AvailableFoodScalarFieldEnum[]
  }

  /**
   * AvailableFood create
   */
  export type AvailableFoodCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableFood
     */
    select?: AvailableFoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableFood
     */
    omit?: AvailableFoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailableFoodInclude<ExtArgs> | null
    /**
     * The data needed to create a AvailableFood.
     */
    data: XOR<AvailableFoodCreateInput, AvailableFoodUncheckedCreateInput>
  }

  /**
   * AvailableFood createMany
   */
  export type AvailableFoodCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AvailableFoods.
     */
    data: AvailableFoodCreateManyInput | AvailableFoodCreateManyInput[]
  }

  /**
   * AvailableFood createManyAndReturn
   */
  export type AvailableFoodCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableFood
     */
    select?: AvailableFoodSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableFood
     */
    omit?: AvailableFoodOmit<ExtArgs> | null
    /**
     * The data used to create many AvailableFoods.
     */
    data: AvailableFoodCreateManyInput | AvailableFoodCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailableFoodIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AvailableFood update
   */
  export type AvailableFoodUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableFood
     */
    select?: AvailableFoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableFood
     */
    omit?: AvailableFoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailableFoodInclude<ExtArgs> | null
    /**
     * The data needed to update a AvailableFood.
     */
    data: XOR<AvailableFoodUpdateInput, AvailableFoodUncheckedUpdateInput>
    /**
     * Choose, which AvailableFood to update.
     */
    where: AvailableFoodWhereUniqueInput
  }

  /**
   * AvailableFood updateMany
   */
  export type AvailableFoodUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AvailableFoods.
     */
    data: XOR<AvailableFoodUpdateManyMutationInput, AvailableFoodUncheckedUpdateManyInput>
    /**
     * Filter which AvailableFoods to update
     */
    where?: AvailableFoodWhereInput
    /**
     * Limit how many AvailableFoods to update.
     */
    limit?: number
  }

  /**
   * AvailableFood updateManyAndReturn
   */
  export type AvailableFoodUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableFood
     */
    select?: AvailableFoodSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableFood
     */
    omit?: AvailableFoodOmit<ExtArgs> | null
    /**
     * The data used to update AvailableFoods.
     */
    data: XOR<AvailableFoodUpdateManyMutationInput, AvailableFoodUncheckedUpdateManyInput>
    /**
     * Filter which AvailableFoods to update
     */
    where?: AvailableFoodWhereInput
    /**
     * Limit how many AvailableFoods to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailableFoodIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AvailableFood upsert
   */
  export type AvailableFoodUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableFood
     */
    select?: AvailableFoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableFood
     */
    omit?: AvailableFoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailableFoodInclude<ExtArgs> | null
    /**
     * The filter to search for the AvailableFood to update in case it exists.
     */
    where: AvailableFoodWhereUniqueInput
    /**
     * In case the AvailableFood found by the `where` argument doesn't exist, create a new AvailableFood with this data.
     */
    create: XOR<AvailableFoodCreateInput, AvailableFoodUncheckedCreateInput>
    /**
     * In case the AvailableFood was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AvailableFoodUpdateInput, AvailableFoodUncheckedUpdateInput>
  }

  /**
   * AvailableFood delete
   */
  export type AvailableFoodDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableFood
     */
    select?: AvailableFoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableFood
     */
    omit?: AvailableFoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailableFoodInclude<ExtArgs> | null
    /**
     * Filter which AvailableFood to delete.
     */
    where: AvailableFoodWhereUniqueInput
  }

  /**
   * AvailableFood deleteMany
   */
  export type AvailableFoodDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AvailableFoods to delete
     */
    where?: AvailableFoodWhereInput
    /**
     * Limit how many AvailableFoods to delete.
     */
    limit?: number
  }

  /**
   * AvailableFood.user
   */
  export type AvailableFood$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * AvailableFood without action
   */
  export type AvailableFoodDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableFood
     */
    select?: AvailableFoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableFood
     */
    omit?: AvailableFoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailableFoodInclude<ExtArgs> | null
  }


  /**
   * Model MealSuggestion
   */

  export type AggregateMealSuggestion = {
    _count: MealSuggestionCountAggregateOutputType | null
    _min: MealSuggestionMinAggregateOutputType | null
    _max: MealSuggestionMaxAggregateOutputType | null
  }

  export type MealSuggestionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    mealType: string | null
    suggestion: string | null
    explanation: string | null
    compatibleFoods: string | null
    createdAt: Date | null
  }

  export type MealSuggestionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    mealType: string | null
    suggestion: string | null
    explanation: string | null
    compatibleFoods: string | null
    createdAt: Date | null
  }

  export type MealSuggestionCountAggregateOutputType = {
    id: number
    userId: number
    mealType: number
    suggestion: number
    explanation: number
    compatibleFoods: number
    createdAt: number
    _all: number
  }


  export type MealSuggestionMinAggregateInputType = {
    id?: true
    userId?: true
    mealType?: true
    suggestion?: true
    explanation?: true
    compatibleFoods?: true
    createdAt?: true
  }

  export type MealSuggestionMaxAggregateInputType = {
    id?: true
    userId?: true
    mealType?: true
    suggestion?: true
    explanation?: true
    compatibleFoods?: true
    createdAt?: true
  }

  export type MealSuggestionCountAggregateInputType = {
    id?: true
    userId?: true
    mealType?: true
    suggestion?: true
    explanation?: true
    compatibleFoods?: true
    createdAt?: true
    _all?: true
  }

  export type MealSuggestionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MealSuggestion to aggregate.
     */
    where?: MealSuggestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MealSuggestions to fetch.
     */
    orderBy?: MealSuggestionOrderByWithRelationInput | MealSuggestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MealSuggestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MealSuggestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MealSuggestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MealSuggestions
    **/
    _count?: true | MealSuggestionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MealSuggestionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MealSuggestionMaxAggregateInputType
  }

  export type GetMealSuggestionAggregateType<T extends MealSuggestionAggregateArgs> = {
        [P in keyof T & keyof AggregateMealSuggestion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMealSuggestion[P]>
      : GetScalarType<T[P], AggregateMealSuggestion[P]>
  }




  export type MealSuggestionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MealSuggestionWhereInput
    orderBy?: MealSuggestionOrderByWithAggregationInput | MealSuggestionOrderByWithAggregationInput[]
    by: MealSuggestionScalarFieldEnum[] | MealSuggestionScalarFieldEnum
    having?: MealSuggestionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MealSuggestionCountAggregateInputType | true
    _min?: MealSuggestionMinAggregateInputType
    _max?: MealSuggestionMaxAggregateInputType
  }

  export type MealSuggestionGroupByOutputType = {
    id: string
    userId: string | null
    mealType: string
    suggestion: string
    explanation: string | null
    compatibleFoods: string | null
    createdAt: Date
    _count: MealSuggestionCountAggregateOutputType | null
    _min: MealSuggestionMinAggregateOutputType | null
    _max: MealSuggestionMaxAggregateOutputType | null
  }

  type GetMealSuggestionGroupByPayload<T extends MealSuggestionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MealSuggestionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MealSuggestionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MealSuggestionGroupByOutputType[P]>
            : GetScalarType<T[P], MealSuggestionGroupByOutputType[P]>
        }
      >
    >


  export type MealSuggestionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    mealType?: boolean
    suggestion?: boolean
    explanation?: boolean
    compatibleFoods?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["mealSuggestion"]>

  export type MealSuggestionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    mealType?: boolean
    suggestion?: boolean
    explanation?: boolean
    compatibleFoods?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["mealSuggestion"]>

  export type MealSuggestionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    mealType?: boolean
    suggestion?: boolean
    explanation?: boolean
    compatibleFoods?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["mealSuggestion"]>

  export type MealSuggestionSelectScalar = {
    id?: boolean
    userId?: boolean
    mealType?: boolean
    suggestion?: boolean
    explanation?: boolean
    compatibleFoods?: boolean
    createdAt?: boolean
  }

  export type MealSuggestionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "mealType" | "suggestion" | "explanation" | "compatibleFoods" | "createdAt", ExtArgs["result"]["mealSuggestion"]>

  export type $MealSuggestionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MealSuggestion"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      mealType: string
      suggestion: string
      explanation: string | null
      compatibleFoods: string | null
      createdAt: Date
    }, ExtArgs["result"]["mealSuggestion"]>
    composites: {}
  }

  type MealSuggestionGetPayload<S extends boolean | null | undefined | MealSuggestionDefaultArgs> = $Result.GetResult<Prisma.$MealSuggestionPayload, S>

  type MealSuggestionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MealSuggestionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MealSuggestionCountAggregateInputType | true
    }

  export interface MealSuggestionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MealSuggestion'], meta: { name: 'MealSuggestion' } }
    /**
     * Find zero or one MealSuggestion that matches the filter.
     * @param {MealSuggestionFindUniqueArgs} args - Arguments to find a MealSuggestion
     * @example
     * // Get one MealSuggestion
     * const mealSuggestion = await prisma.mealSuggestion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MealSuggestionFindUniqueArgs>(args: SelectSubset<T, MealSuggestionFindUniqueArgs<ExtArgs>>): Prisma__MealSuggestionClient<$Result.GetResult<Prisma.$MealSuggestionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MealSuggestion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MealSuggestionFindUniqueOrThrowArgs} args - Arguments to find a MealSuggestion
     * @example
     * // Get one MealSuggestion
     * const mealSuggestion = await prisma.mealSuggestion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MealSuggestionFindUniqueOrThrowArgs>(args: SelectSubset<T, MealSuggestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MealSuggestionClient<$Result.GetResult<Prisma.$MealSuggestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MealSuggestion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealSuggestionFindFirstArgs} args - Arguments to find a MealSuggestion
     * @example
     * // Get one MealSuggestion
     * const mealSuggestion = await prisma.mealSuggestion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MealSuggestionFindFirstArgs>(args?: SelectSubset<T, MealSuggestionFindFirstArgs<ExtArgs>>): Prisma__MealSuggestionClient<$Result.GetResult<Prisma.$MealSuggestionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MealSuggestion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealSuggestionFindFirstOrThrowArgs} args - Arguments to find a MealSuggestion
     * @example
     * // Get one MealSuggestion
     * const mealSuggestion = await prisma.mealSuggestion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MealSuggestionFindFirstOrThrowArgs>(args?: SelectSubset<T, MealSuggestionFindFirstOrThrowArgs<ExtArgs>>): Prisma__MealSuggestionClient<$Result.GetResult<Prisma.$MealSuggestionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MealSuggestions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealSuggestionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MealSuggestions
     * const mealSuggestions = await prisma.mealSuggestion.findMany()
     * 
     * // Get first 10 MealSuggestions
     * const mealSuggestions = await prisma.mealSuggestion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mealSuggestionWithIdOnly = await prisma.mealSuggestion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MealSuggestionFindManyArgs>(args?: SelectSubset<T, MealSuggestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MealSuggestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MealSuggestion.
     * @param {MealSuggestionCreateArgs} args - Arguments to create a MealSuggestion.
     * @example
     * // Create one MealSuggestion
     * const MealSuggestion = await prisma.mealSuggestion.create({
     *   data: {
     *     // ... data to create a MealSuggestion
     *   }
     * })
     * 
     */
    create<T extends MealSuggestionCreateArgs>(args: SelectSubset<T, MealSuggestionCreateArgs<ExtArgs>>): Prisma__MealSuggestionClient<$Result.GetResult<Prisma.$MealSuggestionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MealSuggestions.
     * @param {MealSuggestionCreateManyArgs} args - Arguments to create many MealSuggestions.
     * @example
     * // Create many MealSuggestions
     * const mealSuggestion = await prisma.mealSuggestion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MealSuggestionCreateManyArgs>(args?: SelectSubset<T, MealSuggestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MealSuggestions and returns the data saved in the database.
     * @param {MealSuggestionCreateManyAndReturnArgs} args - Arguments to create many MealSuggestions.
     * @example
     * // Create many MealSuggestions
     * const mealSuggestion = await prisma.mealSuggestion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MealSuggestions and only return the `id`
     * const mealSuggestionWithIdOnly = await prisma.mealSuggestion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MealSuggestionCreateManyAndReturnArgs>(args?: SelectSubset<T, MealSuggestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MealSuggestionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MealSuggestion.
     * @param {MealSuggestionDeleteArgs} args - Arguments to delete one MealSuggestion.
     * @example
     * // Delete one MealSuggestion
     * const MealSuggestion = await prisma.mealSuggestion.delete({
     *   where: {
     *     // ... filter to delete one MealSuggestion
     *   }
     * })
     * 
     */
    delete<T extends MealSuggestionDeleteArgs>(args: SelectSubset<T, MealSuggestionDeleteArgs<ExtArgs>>): Prisma__MealSuggestionClient<$Result.GetResult<Prisma.$MealSuggestionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MealSuggestion.
     * @param {MealSuggestionUpdateArgs} args - Arguments to update one MealSuggestion.
     * @example
     * // Update one MealSuggestion
     * const mealSuggestion = await prisma.mealSuggestion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MealSuggestionUpdateArgs>(args: SelectSubset<T, MealSuggestionUpdateArgs<ExtArgs>>): Prisma__MealSuggestionClient<$Result.GetResult<Prisma.$MealSuggestionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MealSuggestions.
     * @param {MealSuggestionDeleteManyArgs} args - Arguments to filter MealSuggestions to delete.
     * @example
     * // Delete a few MealSuggestions
     * const { count } = await prisma.mealSuggestion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MealSuggestionDeleteManyArgs>(args?: SelectSubset<T, MealSuggestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MealSuggestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealSuggestionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MealSuggestions
     * const mealSuggestion = await prisma.mealSuggestion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MealSuggestionUpdateManyArgs>(args: SelectSubset<T, MealSuggestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MealSuggestions and returns the data updated in the database.
     * @param {MealSuggestionUpdateManyAndReturnArgs} args - Arguments to update many MealSuggestions.
     * @example
     * // Update many MealSuggestions
     * const mealSuggestion = await prisma.mealSuggestion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MealSuggestions and only return the `id`
     * const mealSuggestionWithIdOnly = await prisma.mealSuggestion.updateManyAndReturn({
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
    updateManyAndReturn<T extends MealSuggestionUpdateManyAndReturnArgs>(args: SelectSubset<T, MealSuggestionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MealSuggestionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MealSuggestion.
     * @param {MealSuggestionUpsertArgs} args - Arguments to update or create a MealSuggestion.
     * @example
     * // Update or create a MealSuggestion
     * const mealSuggestion = await prisma.mealSuggestion.upsert({
     *   create: {
     *     // ... data to create a MealSuggestion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MealSuggestion we want to update
     *   }
     * })
     */
    upsert<T extends MealSuggestionUpsertArgs>(args: SelectSubset<T, MealSuggestionUpsertArgs<ExtArgs>>): Prisma__MealSuggestionClient<$Result.GetResult<Prisma.$MealSuggestionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MealSuggestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealSuggestionCountArgs} args - Arguments to filter MealSuggestions to count.
     * @example
     * // Count the number of MealSuggestions
     * const count = await prisma.mealSuggestion.count({
     *   where: {
     *     // ... the filter for the MealSuggestions we want to count
     *   }
     * })
    **/
    count<T extends MealSuggestionCountArgs>(
      args?: Subset<T, MealSuggestionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MealSuggestionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MealSuggestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealSuggestionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MealSuggestionAggregateArgs>(args: Subset<T, MealSuggestionAggregateArgs>): Prisma.PrismaPromise<GetMealSuggestionAggregateType<T>>

    /**
     * Group by MealSuggestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealSuggestionGroupByArgs} args - Group by arguments.
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
      T extends MealSuggestionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MealSuggestionGroupByArgs['orderBy'] }
        : { orderBy?: MealSuggestionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MealSuggestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMealSuggestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MealSuggestion model
   */
  readonly fields: MealSuggestionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MealSuggestion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MealSuggestionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the MealSuggestion model
   */
  interface MealSuggestionFieldRefs {
    readonly id: FieldRef<"MealSuggestion", 'String'>
    readonly userId: FieldRef<"MealSuggestion", 'String'>
    readonly mealType: FieldRef<"MealSuggestion", 'String'>
    readonly suggestion: FieldRef<"MealSuggestion", 'String'>
    readonly explanation: FieldRef<"MealSuggestion", 'String'>
    readonly compatibleFoods: FieldRef<"MealSuggestion", 'String'>
    readonly createdAt: FieldRef<"MealSuggestion", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MealSuggestion findUnique
   */
  export type MealSuggestionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealSuggestion
     */
    select?: MealSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealSuggestion
     */
    omit?: MealSuggestionOmit<ExtArgs> | null
    /**
     * Filter, which MealSuggestion to fetch.
     */
    where: MealSuggestionWhereUniqueInput
  }

  /**
   * MealSuggestion findUniqueOrThrow
   */
  export type MealSuggestionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealSuggestion
     */
    select?: MealSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealSuggestion
     */
    omit?: MealSuggestionOmit<ExtArgs> | null
    /**
     * Filter, which MealSuggestion to fetch.
     */
    where: MealSuggestionWhereUniqueInput
  }

  /**
   * MealSuggestion findFirst
   */
  export type MealSuggestionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealSuggestion
     */
    select?: MealSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealSuggestion
     */
    omit?: MealSuggestionOmit<ExtArgs> | null
    /**
     * Filter, which MealSuggestion to fetch.
     */
    where?: MealSuggestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MealSuggestions to fetch.
     */
    orderBy?: MealSuggestionOrderByWithRelationInput | MealSuggestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MealSuggestions.
     */
    cursor?: MealSuggestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MealSuggestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MealSuggestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MealSuggestions.
     */
    distinct?: MealSuggestionScalarFieldEnum | MealSuggestionScalarFieldEnum[]
  }

  /**
   * MealSuggestion findFirstOrThrow
   */
  export type MealSuggestionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealSuggestion
     */
    select?: MealSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealSuggestion
     */
    omit?: MealSuggestionOmit<ExtArgs> | null
    /**
     * Filter, which MealSuggestion to fetch.
     */
    where?: MealSuggestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MealSuggestions to fetch.
     */
    orderBy?: MealSuggestionOrderByWithRelationInput | MealSuggestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MealSuggestions.
     */
    cursor?: MealSuggestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MealSuggestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MealSuggestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MealSuggestions.
     */
    distinct?: MealSuggestionScalarFieldEnum | MealSuggestionScalarFieldEnum[]
  }

  /**
   * MealSuggestion findMany
   */
  export type MealSuggestionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealSuggestion
     */
    select?: MealSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealSuggestion
     */
    omit?: MealSuggestionOmit<ExtArgs> | null
    /**
     * Filter, which MealSuggestions to fetch.
     */
    where?: MealSuggestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MealSuggestions to fetch.
     */
    orderBy?: MealSuggestionOrderByWithRelationInput | MealSuggestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MealSuggestions.
     */
    cursor?: MealSuggestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MealSuggestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MealSuggestions.
     */
    skip?: number
    distinct?: MealSuggestionScalarFieldEnum | MealSuggestionScalarFieldEnum[]
  }

  /**
   * MealSuggestion create
   */
  export type MealSuggestionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealSuggestion
     */
    select?: MealSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealSuggestion
     */
    omit?: MealSuggestionOmit<ExtArgs> | null
    /**
     * The data needed to create a MealSuggestion.
     */
    data: XOR<MealSuggestionCreateInput, MealSuggestionUncheckedCreateInput>
  }

  /**
   * MealSuggestion createMany
   */
  export type MealSuggestionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MealSuggestions.
     */
    data: MealSuggestionCreateManyInput | MealSuggestionCreateManyInput[]
  }

  /**
   * MealSuggestion createManyAndReturn
   */
  export type MealSuggestionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealSuggestion
     */
    select?: MealSuggestionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MealSuggestion
     */
    omit?: MealSuggestionOmit<ExtArgs> | null
    /**
     * The data used to create many MealSuggestions.
     */
    data: MealSuggestionCreateManyInput | MealSuggestionCreateManyInput[]
  }

  /**
   * MealSuggestion update
   */
  export type MealSuggestionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealSuggestion
     */
    select?: MealSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealSuggestion
     */
    omit?: MealSuggestionOmit<ExtArgs> | null
    /**
     * The data needed to update a MealSuggestion.
     */
    data: XOR<MealSuggestionUpdateInput, MealSuggestionUncheckedUpdateInput>
    /**
     * Choose, which MealSuggestion to update.
     */
    where: MealSuggestionWhereUniqueInput
  }

  /**
   * MealSuggestion updateMany
   */
  export type MealSuggestionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MealSuggestions.
     */
    data: XOR<MealSuggestionUpdateManyMutationInput, MealSuggestionUncheckedUpdateManyInput>
    /**
     * Filter which MealSuggestions to update
     */
    where?: MealSuggestionWhereInput
    /**
     * Limit how many MealSuggestions to update.
     */
    limit?: number
  }

  /**
   * MealSuggestion updateManyAndReturn
   */
  export type MealSuggestionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealSuggestion
     */
    select?: MealSuggestionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MealSuggestion
     */
    omit?: MealSuggestionOmit<ExtArgs> | null
    /**
     * The data used to update MealSuggestions.
     */
    data: XOR<MealSuggestionUpdateManyMutationInput, MealSuggestionUncheckedUpdateManyInput>
    /**
     * Filter which MealSuggestions to update
     */
    where?: MealSuggestionWhereInput
    /**
     * Limit how many MealSuggestions to update.
     */
    limit?: number
  }

  /**
   * MealSuggestion upsert
   */
  export type MealSuggestionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealSuggestion
     */
    select?: MealSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealSuggestion
     */
    omit?: MealSuggestionOmit<ExtArgs> | null
    /**
     * The filter to search for the MealSuggestion to update in case it exists.
     */
    where: MealSuggestionWhereUniqueInput
    /**
     * In case the MealSuggestion found by the `where` argument doesn't exist, create a new MealSuggestion with this data.
     */
    create: XOR<MealSuggestionCreateInput, MealSuggestionUncheckedCreateInput>
    /**
     * In case the MealSuggestion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MealSuggestionUpdateInput, MealSuggestionUncheckedUpdateInput>
  }

  /**
   * MealSuggestion delete
   */
  export type MealSuggestionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealSuggestion
     */
    select?: MealSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealSuggestion
     */
    omit?: MealSuggestionOmit<ExtArgs> | null
    /**
     * Filter which MealSuggestion to delete.
     */
    where: MealSuggestionWhereUniqueInput
  }

  /**
   * MealSuggestion deleteMany
   */
  export type MealSuggestionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MealSuggestions to delete
     */
    where?: MealSuggestionWhereInput
    /**
     * Limit how many MealSuggestions to delete.
     */
    limit?: number
  }

  /**
   * MealSuggestion without action
   */
  export type MealSuggestionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealSuggestion
     */
    select?: MealSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealSuggestion
     */
    omit?: MealSuggestionOmit<ExtArgs> | null
  }


  /**
   * Model PreloadedSuggestion
   */

  export type AggregatePreloadedSuggestion = {
    _count: PreloadedSuggestionCountAggregateOutputType | null
    _avg: PreloadedSuggestionAvgAggregateOutputType | null
    _sum: PreloadedSuggestionSumAggregateOutputType | null
    _min: PreloadedSuggestionMinAggregateOutputType | null
    _max: PreloadedSuggestionMaxAggregateOutputType | null
  }

  export type PreloadedSuggestionAvgAggregateOutputType = {
    calories: number | null
    prepTime: number | null
  }

  export type PreloadedSuggestionSumAggregateOutputType = {
    calories: number | null
    prepTime: number | null
  }

  export type PreloadedSuggestionMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    ingredients: string | null
    mealType: string | null
    tags: string | null
    calories: number | null
    prepTime: number | null
    imageUrl: string | null
    createdAt: Date | null
  }

  export type PreloadedSuggestionMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    ingredients: string | null
    mealType: string | null
    tags: string | null
    calories: number | null
    prepTime: number | null
    imageUrl: string | null
    createdAt: Date | null
  }

  export type PreloadedSuggestionCountAggregateOutputType = {
    id: number
    name: number
    description: number
    ingredients: number
    mealType: number
    tags: number
    calories: number
    prepTime: number
    imageUrl: number
    createdAt: number
    _all: number
  }


  export type PreloadedSuggestionAvgAggregateInputType = {
    calories?: true
    prepTime?: true
  }

  export type PreloadedSuggestionSumAggregateInputType = {
    calories?: true
    prepTime?: true
  }

  export type PreloadedSuggestionMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    ingredients?: true
    mealType?: true
    tags?: true
    calories?: true
    prepTime?: true
    imageUrl?: true
    createdAt?: true
  }

  export type PreloadedSuggestionMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    ingredients?: true
    mealType?: true
    tags?: true
    calories?: true
    prepTime?: true
    imageUrl?: true
    createdAt?: true
  }

  export type PreloadedSuggestionCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    ingredients?: true
    mealType?: true
    tags?: true
    calories?: true
    prepTime?: true
    imageUrl?: true
    createdAt?: true
    _all?: true
  }

  export type PreloadedSuggestionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PreloadedSuggestion to aggregate.
     */
    where?: PreloadedSuggestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreloadedSuggestions to fetch.
     */
    orderBy?: PreloadedSuggestionOrderByWithRelationInput | PreloadedSuggestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PreloadedSuggestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreloadedSuggestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreloadedSuggestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PreloadedSuggestions
    **/
    _count?: true | PreloadedSuggestionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PreloadedSuggestionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PreloadedSuggestionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PreloadedSuggestionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PreloadedSuggestionMaxAggregateInputType
  }

  export type GetPreloadedSuggestionAggregateType<T extends PreloadedSuggestionAggregateArgs> = {
        [P in keyof T & keyof AggregatePreloadedSuggestion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePreloadedSuggestion[P]>
      : GetScalarType<T[P], AggregatePreloadedSuggestion[P]>
  }




  export type PreloadedSuggestionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PreloadedSuggestionWhereInput
    orderBy?: PreloadedSuggestionOrderByWithAggregationInput | PreloadedSuggestionOrderByWithAggregationInput[]
    by: PreloadedSuggestionScalarFieldEnum[] | PreloadedSuggestionScalarFieldEnum
    having?: PreloadedSuggestionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PreloadedSuggestionCountAggregateInputType | true
    _avg?: PreloadedSuggestionAvgAggregateInputType
    _sum?: PreloadedSuggestionSumAggregateInputType
    _min?: PreloadedSuggestionMinAggregateInputType
    _max?: PreloadedSuggestionMaxAggregateInputType
  }

  export type PreloadedSuggestionGroupByOutputType = {
    id: string
    name: string
    description: string
    ingredients: string
    mealType: string
    tags: string | null
    calories: number | null
    prepTime: number | null
    imageUrl: string | null
    createdAt: Date
    _count: PreloadedSuggestionCountAggregateOutputType | null
    _avg: PreloadedSuggestionAvgAggregateOutputType | null
    _sum: PreloadedSuggestionSumAggregateOutputType | null
    _min: PreloadedSuggestionMinAggregateOutputType | null
    _max: PreloadedSuggestionMaxAggregateOutputType | null
  }

  type GetPreloadedSuggestionGroupByPayload<T extends PreloadedSuggestionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PreloadedSuggestionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PreloadedSuggestionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PreloadedSuggestionGroupByOutputType[P]>
            : GetScalarType<T[P], PreloadedSuggestionGroupByOutputType[P]>
        }
      >
    >


  export type PreloadedSuggestionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    ingredients?: boolean
    mealType?: boolean
    tags?: boolean
    calories?: boolean
    prepTime?: boolean
    imageUrl?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["preloadedSuggestion"]>

  export type PreloadedSuggestionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    ingredients?: boolean
    mealType?: boolean
    tags?: boolean
    calories?: boolean
    prepTime?: boolean
    imageUrl?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["preloadedSuggestion"]>

  export type PreloadedSuggestionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    ingredients?: boolean
    mealType?: boolean
    tags?: boolean
    calories?: boolean
    prepTime?: boolean
    imageUrl?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["preloadedSuggestion"]>

  export type PreloadedSuggestionSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    ingredients?: boolean
    mealType?: boolean
    tags?: boolean
    calories?: boolean
    prepTime?: boolean
    imageUrl?: boolean
    createdAt?: boolean
  }

  export type PreloadedSuggestionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "ingredients" | "mealType" | "tags" | "calories" | "prepTime" | "imageUrl" | "createdAt", ExtArgs["result"]["preloadedSuggestion"]>

  export type $PreloadedSuggestionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PreloadedSuggestion"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
      ingredients: string
      mealType: string
      tags: string | null
      calories: number | null
      prepTime: number | null
      imageUrl: string | null
      createdAt: Date
    }, ExtArgs["result"]["preloadedSuggestion"]>
    composites: {}
  }

  type PreloadedSuggestionGetPayload<S extends boolean | null | undefined | PreloadedSuggestionDefaultArgs> = $Result.GetResult<Prisma.$PreloadedSuggestionPayload, S>

  type PreloadedSuggestionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PreloadedSuggestionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PreloadedSuggestionCountAggregateInputType | true
    }

  export interface PreloadedSuggestionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PreloadedSuggestion'], meta: { name: 'PreloadedSuggestion' } }
    /**
     * Find zero or one PreloadedSuggestion that matches the filter.
     * @param {PreloadedSuggestionFindUniqueArgs} args - Arguments to find a PreloadedSuggestion
     * @example
     * // Get one PreloadedSuggestion
     * const preloadedSuggestion = await prisma.preloadedSuggestion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PreloadedSuggestionFindUniqueArgs>(args: SelectSubset<T, PreloadedSuggestionFindUniqueArgs<ExtArgs>>): Prisma__PreloadedSuggestionClient<$Result.GetResult<Prisma.$PreloadedSuggestionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PreloadedSuggestion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PreloadedSuggestionFindUniqueOrThrowArgs} args - Arguments to find a PreloadedSuggestion
     * @example
     * // Get one PreloadedSuggestion
     * const preloadedSuggestion = await prisma.preloadedSuggestion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PreloadedSuggestionFindUniqueOrThrowArgs>(args: SelectSubset<T, PreloadedSuggestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PreloadedSuggestionClient<$Result.GetResult<Prisma.$PreloadedSuggestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PreloadedSuggestion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreloadedSuggestionFindFirstArgs} args - Arguments to find a PreloadedSuggestion
     * @example
     * // Get one PreloadedSuggestion
     * const preloadedSuggestion = await prisma.preloadedSuggestion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PreloadedSuggestionFindFirstArgs>(args?: SelectSubset<T, PreloadedSuggestionFindFirstArgs<ExtArgs>>): Prisma__PreloadedSuggestionClient<$Result.GetResult<Prisma.$PreloadedSuggestionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PreloadedSuggestion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreloadedSuggestionFindFirstOrThrowArgs} args - Arguments to find a PreloadedSuggestion
     * @example
     * // Get one PreloadedSuggestion
     * const preloadedSuggestion = await prisma.preloadedSuggestion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PreloadedSuggestionFindFirstOrThrowArgs>(args?: SelectSubset<T, PreloadedSuggestionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PreloadedSuggestionClient<$Result.GetResult<Prisma.$PreloadedSuggestionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PreloadedSuggestions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreloadedSuggestionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PreloadedSuggestions
     * const preloadedSuggestions = await prisma.preloadedSuggestion.findMany()
     * 
     * // Get first 10 PreloadedSuggestions
     * const preloadedSuggestions = await prisma.preloadedSuggestion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const preloadedSuggestionWithIdOnly = await prisma.preloadedSuggestion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PreloadedSuggestionFindManyArgs>(args?: SelectSubset<T, PreloadedSuggestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreloadedSuggestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PreloadedSuggestion.
     * @param {PreloadedSuggestionCreateArgs} args - Arguments to create a PreloadedSuggestion.
     * @example
     * // Create one PreloadedSuggestion
     * const PreloadedSuggestion = await prisma.preloadedSuggestion.create({
     *   data: {
     *     // ... data to create a PreloadedSuggestion
     *   }
     * })
     * 
     */
    create<T extends PreloadedSuggestionCreateArgs>(args: SelectSubset<T, PreloadedSuggestionCreateArgs<ExtArgs>>): Prisma__PreloadedSuggestionClient<$Result.GetResult<Prisma.$PreloadedSuggestionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PreloadedSuggestions.
     * @param {PreloadedSuggestionCreateManyArgs} args - Arguments to create many PreloadedSuggestions.
     * @example
     * // Create many PreloadedSuggestions
     * const preloadedSuggestion = await prisma.preloadedSuggestion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PreloadedSuggestionCreateManyArgs>(args?: SelectSubset<T, PreloadedSuggestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PreloadedSuggestions and returns the data saved in the database.
     * @param {PreloadedSuggestionCreateManyAndReturnArgs} args - Arguments to create many PreloadedSuggestions.
     * @example
     * // Create many PreloadedSuggestions
     * const preloadedSuggestion = await prisma.preloadedSuggestion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PreloadedSuggestions and only return the `id`
     * const preloadedSuggestionWithIdOnly = await prisma.preloadedSuggestion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PreloadedSuggestionCreateManyAndReturnArgs>(args?: SelectSubset<T, PreloadedSuggestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreloadedSuggestionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PreloadedSuggestion.
     * @param {PreloadedSuggestionDeleteArgs} args - Arguments to delete one PreloadedSuggestion.
     * @example
     * // Delete one PreloadedSuggestion
     * const PreloadedSuggestion = await prisma.preloadedSuggestion.delete({
     *   where: {
     *     // ... filter to delete one PreloadedSuggestion
     *   }
     * })
     * 
     */
    delete<T extends PreloadedSuggestionDeleteArgs>(args: SelectSubset<T, PreloadedSuggestionDeleteArgs<ExtArgs>>): Prisma__PreloadedSuggestionClient<$Result.GetResult<Prisma.$PreloadedSuggestionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PreloadedSuggestion.
     * @param {PreloadedSuggestionUpdateArgs} args - Arguments to update one PreloadedSuggestion.
     * @example
     * // Update one PreloadedSuggestion
     * const preloadedSuggestion = await prisma.preloadedSuggestion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PreloadedSuggestionUpdateArgs>(args: SelectSubset<T, PreloadedSuggestionUpdateArgs<ExtArgs>>): Prisma__PreloadedSuggestionClient<$Result.GetResult<Prisma.$PreloadedSuggestionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PreloadedSuggestions.
     * @param {PreloadedSuggestionDeleteManyArgs} args - Arguments to filter PreloadedSuggestions to delete.
     * @example
     * // Delete a few PreloadedSuggestions
     * const { count } = await prisma.preloadedSuggestion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PreloadedSuggestionDeleteManyArgs>(args?: SelectSubset<T, PreloadedSuggestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PreloadedSuggestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreloadedSuggestionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PreloadedSuggestions
     * const preloadedSuggestion = await prisma.preloadedSuggestion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PreloadedSuggestionUpdateManyArgs>(args: SelectSubset<T, PreloadedSuggestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PreloadedSuggestions and returns the data updated in the database.
     * @param {PreloadedSuggestionUpdateManyAndReturnArgs} args - Arguments to update many PreloadedSuggestions.
     * @example
     * // Update many PreloadedSuggestions
     * const preloadedSuggestion = await prisma.preloadedSuggestion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PreloadedSuggestions and only return the `id`
     * const preloadedSuggestionWithIdOnly = await prisma.preloadedSuggestion.updateManyAndReturn({
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
    updateManyAndReturn<T extends PreloadedSuggestionUpdateManyAndReturnArgs>(args: SelectSubset<T, PreloadedSuggestionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreloadedSuggestionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PreloadedSuggestion.
     * @param {PreloadedSuggestionUpsertArgs} args - Arguments to update or create a PreloadedSuggestion.
     * @example
     * // Update or create a PreloadedSuggestion
     * const preloadedSuggestion = await prisma.preloadedSuggestion.upsert({
     *   create: {
     *     // ... data to create a PreloadedSuggestion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PreloadedSuggestion we want to update
     *   }
     * })
     */
    upsert<T extends PreloadedSuggestionUpsertArgs>(args: SelectSubset<T, PreloadedSuggestionUpsertArgs<ExtArgs>>): Prisma__PreloadedSuggestionClient<$Result.GetResult<Prisma.$PreloadedSuggestionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PreloadedSuggestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreloadedSuggestionCountArgs} args - Arguments to filter PreloadedSuggestions to count.
     * @example
     * // Count the number of PreloadedSuggestions
     * const count = await prisma.preloadedSuggestion.count({
     *   where: {
     *     // ... the filter for the PreloadedSuggestions we want to count
     *   }
     * })
    **/
    count<T extends PreloadedSuggestionCountArgs>(
      args?: Subset<T, PreloadedSuggestionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PreloadedSuggestionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PreloadedSuggestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreloadedSuggestionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PreloadedSuggestionAggregateArgs>(args: Subset<T, PreloadedSuggestionAggregateArgs>): Prisma.PrismaPromise<GetPreloadedSuggestionAggregateType<T>>

    /**
     * Group by PreloadedSuggestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreloadedSuggestionGroupByArgs} args - Group by arguments.
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
      T extends PreloadedSuggestionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PreloadedSuggestionGroupByArgs['orderBy'] }
        : { orderBy?: PreloadedSuggestionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PreloadedSuggestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPreloadedSuggestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PreloadedSuggestion model
   */
  readonly fields: PreloadedSuggestionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PreloadedSuggestion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PreloadedSuggestionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the PreloadedSuggestion model
   */
  interface PreloadedSuggestionFieldRefs {
    readonly id: FieldRef<"PreloadedSuggestion", 'String'>
    readonly name: FieldRef<"PreloadedSuggestion", 'String'>
    readonly description: FieldRef<"PreloadedSuggestion", 'String'>
    readonly ingredients: FieldRef<"PreloadedSuggestion", 'String'>
    readonly mealType: FieldRef<"PreloadedSuggestion", 'String'>
    readonly tags: FieldRef<"PreloadedSuggestion", 'String'>
    readonly calories: FieldRef<"PreloadedSuggestion", 'Int'>
    readonly prepTime: FieldRef<"PreloadedSuggestion", 'Int'>
    readonly imageUrl: FieldRef<"PreloadedSuggestion", 'String'>
    readonly createdAt: FieldRef<"PreloadedSuggestion", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PreloadedSuggestion findUnique
   */
  export type PreloadedSuggestionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreloadedSuggestion
     */
    select?: PreloadedSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreloadedSuggestion
     */
    omit?: PreloadedSuggestionOmit<ExtArgs> | null
    /**
     * Filter, which PreloadedSuggestion to fetch.
     */
    where: PreloadedSuggestionWhereUniqueInput
  }

  /**
   * PreloadedSuggestion findUniqueOrThrow
   */
  export type PreloadedSuggestionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreloadedSuggestion
     */
    select?: PreloadedSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreloadedSuggestion
     */
    omit?: PreloadedSuggestionOmit<ExtArgs> | null
    /**
     * Filter, which PreloadedSuggestion to fetch.
     */
    where: PreloadedSuggestionWhereUniqueInput
  }

  /**
   * PreloadedSuggestion findFirst
   */
  export type PreloadedSuggestionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreloadedSuggestion
     */
    select?: PreloadedSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreloadedSuggestion
     */
    omit?: PreloadedSuggestionOmit<ExtArgs> | null
    /**
     * Filter, which PreloadedSuggestion to fetch.
     */
    where?: PreloadedSuggestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreloadedSuggestions to fetch.
     */
    orderBy?: PreloadedSuggestionOrderByWithRelationInput | PreloadedSuggestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PreloadedSuggestions.
     */
    cursor?: PreloadedSuggestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreloadedSuggestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreloadedSuggestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PreloadedSuggestions.
     */
    distinct?: PreloadedSuggestionScalarFieldEnum | PreloadedSuggestionScalarFieldEnum[]
  }

  /**
   * PreloadedSuggestion findFirstOrThrow
   */
  export type PreloadedSuggestionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreloadedSuggestion
     */
    select?: PreloadedSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreloadedSuggestion
     */
    omit?: PreloadedSuggestionOmit<ExtArgs> | null
    /**
     * Filter, which PreloadedSuggestion to fetch.
     */
    where?: PreloadedSuggestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreloadedSuggestions to fetch.
     */
    orderBy?: PreloadedSuggestionOrderByWithRelationInput | PreloadedSuggestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PreloadedSuggestions.
     */
    cursor?: PreloadedSuggestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreloadedSuggestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreloadedSuggestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PreloadedSuggestions.
     */
    distinct?: PreloadedSuggestionScalarFieldEnum | PreloadedSuggestionScalarFieldEnum[]
  }

  /**
   * PreloadedSuggestion findMany
   */
  export type PreloadedSuggestionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreloadedSuggestion
     */
    select?: PreloadedSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreloadedSuggestion
     */
    omit?: PreloadedSuggestionOmit<ExtArgs> | null
    /**
     * Filter, which PreloadedSuggestions to fetch.
     */
    where?: PreloadedSuggestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreloadedSuggestions to fetch.
     */
    orderBy?: PreloadedSuggestionOrderByWithRelationInput | PreloadedSuggestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PreloadedSuggestions.
     */
    cursor?: PreloadedSuggestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreloadedSuggestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreloadedSuggestions.
     */
    skip?: number
    distinct?: PreloadedSuggestionScalarFieldEnum | PreloadedSuggestionScalarFieldEnum[]
  }

  /**
   * PreloadedSuggestion create
   */
  export type PreloadedSuggestionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreloadedSuggestion
     */
    select?: PreloadedSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreloadedSuggestion
     */
    omit?: PreloadedSuggestionOmit<ExtArgs> | null
    /**
     * The data needed to create a PreloadedSuggestion.
     */
    data: XOR<PreloadedSuggestionCreateInput, PreloadedSuggestionUncheckedCreateInput>
  }

  /**
   * PreloadedSuggestion createMany
   */
  export type PreloadedSuggestionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PreloadedSuggestions.
     */
    data: PreloadedSuggestionCreateManyInput | PreloadedSuggestionCreateManyInput[]
  }

  /**
   * PreloadedSuggestion createManyAndReturn
   */
  export type PreloadedSuggestionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreloadedSuggestion
     */
    select?: PreloadedSuggestionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PreloadedSuggestion
     */
    omit?: PreloadedSuggestionOmit<ExtArgs> | null
    /**
     * The data used to create many PreloadedSuggestions.
     */
    data: PreloadedSuggestionCreateManyInput | PreloadedSuggestionCreateManyInput[]
  }

  /**
   * PreloadedSuggestion update
   */
  export type PreloadedSuggestionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreloadedSuggestion
     */
    select?: PreloadedSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreloadedSuggestion
     */
    omit?: PreloadedSuggestionOmit<ExtArgs> | null
    /**
     * The data needed to update a PreloadedSuggestion.
     */
    data: XOR<PreloadedSuggestionUpdateInput, PreloadedSuggestionUncheckedUpdateInput>
    /**
     * Choose, which PreloadedSuggestion to update.
     */
    where: PreloadedSuggestionWhereUniqueInput
  }

  /**
   * PreloadedSuggestion updateMany
   */
  export type PreloadedSuggestionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PreloadedSuggestions.
     */
    data: XOR<PreloadedSuggestionUpdateManyMutationInput, PreloadedSuggestionUncheckedUpdateManyInput>
    /**
     * Filter which PreloadedSuggestions to update
     */
    where?: PreloadedSuggestionWhereInput
    /**
     * Limit how many PreloadedSuggestions to update.
     */
    limit?: number
  }

  /**
   * PreloadedSuggestion updateManyAndReturn
   */
  export type PreloadedSuggestionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreloadedSuggestion
     */
    select?: PreloadedSuggestionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PreloadedSuggestion
     */
    omit?: PreloadedSuggestionOmit<ExtArgs> | null
    /**
     * The data used to update PreloadedSuggestions.
     */
    data: XOR<PreloadedSuggestionUpdateManyMutationInput, PreloadedSuggestionUncheckedUpdateManyInput>
    /**
     * Filter which PreloadedSuggestions to update
     */
    where?: PreloadedSuggestionWhereInput
    /**
     * Limit how many PreloadedSuggestions to update.
     */
    limit?: number
  }

  /**
   * PreloadedSuggestion upsert
   */
  export type PreloadedSuggestionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreloadedSuggestion
     */
    select?: PreloadedSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreloadedSuggestion
     */
    omit?: PreloadedSuggestionOmit<ExtArgs> | null
    /**
     * The filter to search for the PreloadedSuggestion to update in case it exists.
     */
    where: PreloadedSuggestionWhereUniqueInput
    /**
     * In case the PreloadedSuggestion found by the `where` argument doesn't exist, create a new PreloadedSuggestion with this data.
     */
    create: XOR<PreloadedSuggestionCreateInput, PreloadedSuggestionUncheckedCreateInput>
    /**
     * In case the PreloadedSuggestion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PreloadedSuggestionUpdateInput, PreloadedSuggestionUncheckedUpdateInput>
  }

  /**
   * PreloadedSuggestion delete
   */
  export type PreloadedSuggestionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreloadedSuggestion
     */
    select?: PreloadedSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreloadedSuggestion
     */
    omit?: PreloadedSuggestionOmit<ExtArgs> | null
    /**
     * Filter which PreloadedSuggestion to delete.
     */
    where: PreloadedSuggestionWhereUniqueInput
  }

  /**
   * PreloadedSuggestion deleteMany
   */
  export type PreloadedSuggestionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PreloadedSuggestions to delete
     */
    where?: PreloadedSuggestionWhereInput
    /**
     * Limit how many PreloadedSuggestions to delete.
     */
    limit?: number
  }

  /**
   * PreloadedSuggestion without action
   */
  export type PreloadedSuggestionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreloadedSuggestion
     */
    select?: PreloadedSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreloadedSuggestion
     */
    omit?: PreloadedSuggestionOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    refresh_token: 'refresh_token',
    access_token: 'access_token',
    expires_at: 'expires_at',
    token_type: 'token_type',
    scope: 'scope',
    id_token: 'id_token',
    session_state: 'session_state'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    sessionToken: 'sessionToken',
    userId: 'userId',
    expires: 'expires'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    identifier: 'identifier',
    token: 'token',
    expires: 'expires'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    password: 'password',
    goal: 'goal',
    activityLevel: 'activityLevel',
    recentLogs: 'recentLogs'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserPreferencesScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    onboarding: 'onboarding',
    theme: 'theme',
    notifications: 'notifications',
    avatar: 'avatar',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserPreferencesScalarFieldEnum = (typeof UserPreferencesScalarFieldEnum)[keyof typeof UserPreferencesScalarFieldEnum]


  export const DietaryRestrictionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    foodItem: 'foodItem',
    reason: 'reason',
    severity: 'severity',
    category: 'category',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DietaryRestrictionScalarFieldEnum = (typeof DietaryRestrictionScalarFieldEnum)[keyof typeof DietaryRestrictionScalarFieldEnum]


  export const AvailableFoodScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    category: 'category',
    mealType: 'mealType',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AvailableFoodScalarFieldEnum = (typeof AvailableFoodScalarFieldEnum)[keyof typeof AvailableFoodScalarFieldEnum]


  export const MealSuggestionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    mealType: 'mealType',
    suggestion: 'suggestion',
    explanation: 'explanation',
    compatibleFoods: 'compatibleFoods',
    createdAt: 'createdAt'
  };

  export type MealSuggestionScalarFieldEnum = (typeof MealSuggestionScalarFieldEnum)[keyof typeof MealSuggestionScalarFieldEnum]


  export const PreloadedSuggestionScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    ingredients: 'ingredients',
    mealType: 'mealType',
    tags: 'tags',
    calories: 'calories',
    prepTime: 'prepTime',
    imageUrl: 'imageUrl',
    createdAt: 'createdAt'
  };

  export type PreloadedSuggestionScalarFieldEnum = (typeof PreloadedSuggestionScalarFieldEnum)[keyof typeof PreloadedSuggestionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "provider_providerAccountId">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    type?: StringWithAggregatesFilter<"Account"> | string
    provider?: StringWithAggregatesFilter<"Account"> | string
    providerAccountId?: StringWithAggregatesFilter<"Account"> | string
    refresh_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    access_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    expires_at?: IntNullableWithAggregatesFilter<"Account"> | number | null
    token_type?: StringNullableWithAggregatesFilter<"Account"> | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    id_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    session_state?: StringNullableWithAggregatesFilter<"Account"> | string | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionToken?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "sessionToken">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    sessionToken?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    expires?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type VerificationTokenWhereInput = {
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<{
    token?: string
    identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }, "token" | "identifier_token">

  export type VerificationTokenOrderByWithAggregationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    OR?: VerificationTokenScalarWhereWithAggregatesInput[]
    NOT?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    identifier?: StringWithAggregatesFilter<"VerificationToken"> | string
    token?: StringWithAggregatesFilter<"VerificationToken"> | string
    expires?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    goal?: StringNullableFilter<"User"> | string | null
    activityLevel?: StringNullableFilter<"User"> | string | null
    recentLogs?: StringNullableFilter<"User"> | string | null
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    restrictions?: DietaryRestrictionListRelationFilter
    foods?: AvailableFoodListRelationFilter
    preferences?: XOR<UserPreferencesNullableScalarRelationFilter, UserPreferencesWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    goal?: SortOrderInput | SortOrder
    activityLevel?: SortOrderInput | SortOrder
    recentLogs?: SortOrderInput | SortOrder
    accounts?: AccountOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    restrictions?: DietaryRestrictionOrderByRelationAggregateInput
    foods?: AvailableFoodOrderByRelationAggregateInput
    preferences?: UserPreferencesOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    goal?: StringNullableFilter<"User"> | string | null
    activityLevel?: StringNullableFilter<"User"> | string | null
    recentLogs?: StringNullableFilter<"User"> | string | null
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    restrictions?: DietaryRestrictionListRelationFilter
    foods?: AvailableFoodListRelationFilter
    preferences?: XOR<UserPreferencesNullableScalarRelationFilter, UserPreferencesWhereInput> | null
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    goal?: SortOrderInput | SortOrder
    activityLevel?: SortOrderInput | SortOrder
    recentLogs?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    emailVerified?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    goal?: StringNullableWithAggregatesFilter<"User"> | string | null
    activityLevel?: StringNullableWithAggregatesFilter<"User"> | string | null
    recentLogs?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type UserPreferencesWhereInput = {
    AND?: UserPreferencesWhereInput | UserPreferencesWhereInput[]
    OR?: UserPreferencesWhereInput[]
    NOT?: UserPreferencesWhereInput | UserPreferencesWhereInput[]
    id?: StringFilter<"UserPreferences"> | string
    userId?: StringFilter<"UserPreferences"> | string
    onboarding?: BoolFilter<"UserPreferences"> | boolean
    theme?: StringFilter<"UserPreferences"> | string
    notifications?: BoolFilter<"UserPreferences"> | boolean
    avatar?: StringNullableFilter<"UserPreferences"> | string | null
    createdAt?: DateTimeFilter<"UserPreferences"> | Date | string
    updatedAt?: DateTimeFilter<"UserPreferences"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserPreferencesOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    onboarding?: SortOrder
    theme?: SortOrder
    notifications?: SortOrder
    avatar?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserPreferencesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: UserPreferencesWhereInput | UserPreferencesWhereInput[]
    OR?: UserPreferencesWhereInput[]
    NOT?: UserPreferencesWhereInput | UserPreferencesWhereInput[]
    onboarding?: BoolFilter<"UserPreferences"> | boolean
    theme?: StringFilter<"UserPreferences"> | string
    notifications?: BoolFilter<"UserPreferences"> | boolean
    avatar?: StringNullableFilter<"UserPreferences"> | string | null
    createdAt?: DateTimeFilter<"UserPreferences"> | Date | string
    updatedAt?: DateTimeFilter<"UserPreferences"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type UserPreferencesOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    onboarding?: SortOrder
    theme?: SortOrder
    notifications?: SortOrder
    avatar?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserPreferencesCountOrderByAggregateInput
    _max?: UserPreferencesMaxOrderByAggregateInput
    _min?: UserPreferencesMinOrderByAggregateInput
  }

  export type UserPreferencesScalarWhereWithAggregatesInput = {
    AND?: UserPreferencesScalarWhereWithAggregatesInput | UserPreferencesScalarWhereWithAggregatesInput[]
    OR?: UserPreferencesScalarWhereWithAggregatesInput[]
    NOT?: UserPreferencesScalarWhereWithAggregatesInput | UserPreferencesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserPreferences"> | string
    userId?: StringWithAggregatesFilter<"UserPreferences"> | string
    onboarding?: BoolWithAggregatesFilter<"UserPreferences"> | boolean
    theme?: StringWithAggregatesFilter<"UserPreferences"> | string
    notifications?: BoolWithAggregatesFilter<"UserPreferences"> | boolean
    avatar?: StringNullableWithAggregatesFilter<"UserPreferences"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"UserPreferences"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserPreferences"> | Date | string
  }

  export type DietaryRestrictionWhereInput = {
    AND?: DietaryRestrictionWhereInput | DietaryRestrictionWhereInput[]
    OR?: DietaryRestrictionWhereInput[]
    NOT?: DietaryRestrictionWhereInput | DietaryRestrictionWhereInput[]
    id?: StringFilter<"DietaryRestriction"> | string
    userId?: StringNullableFilter<"DietaryRestriction"> | string | null
    foodItem?: StringFilter<"DietaryRestriction"> | string
    reason?: StringFilter<"DietaryRestriction"> | string
    severity?: StringFilter<"DietaryRestriction"> | string
    category?: StringNullableFilter<"DietaryRestriction"> | string | null
    notes?: StringNullableFilter<"DietaryRestriction"> | string | null
    createdAt?: DateTimeFilter<"DietaryRestriction"> | Date | string
    updatedAt?: DateTimeFilter<"DietaryRestriction"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type DietaryRestrictionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    foodItem?: SortOrder
    reason?: SortOrder
    severity?: SortOrder
    category?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type DietaryRestrictionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DietaryRestrictionWhereInput | DietaryRestrictionWhereInput[]
    OR?: DietaryRestrictionWhereInput[]
    NOT?: DietaryRestrictionWhereInput | DietaryRestrictionWhereInput[]
    userId?: StringNullableFilter<"DietaryRestriction"> | string | null
    foodItem?: StringFilter<"DietaryRestriction"> | string
    reason?: StringFilter<"DietaryRestriction"> | string
    severity?: StringFilter<"DietaryRestriction"> | string
    category?: StringNullableFilter<"DietaryRestriction"> | string | null
    notes?: StringNullableFilter<"DietaryRestriction"> | string | null
    createdAt?: DateTimeFilter<"DietaryRestriction"> | Date | string
    updatedAt?: DateTimeFilter<"DietaryRestriction"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type DietaryRestrictionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    foodItem?: SortOrder
    reason?: SortOrder
    severity?: SortOrder
    category?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DietaryRestrictionCountOrderByAggregateInput
    _max?: DietaryRestrictionMaxOrderByAggregateInput
    _min?: DietaryRestrictionMinOrderByAggregateInput
  }

  export type DietaryRestrictionScalarWhereWithAggregatesInput = {
    AND?: DietaryRestrictionScalarWhereWithAggregatesInput | DietaryRestrictionScalarWhereWithAggregatesInput[]
    OR?: DietaryRestrictionScalarWhereWithAggregatesInput[]
    NOT?: DietaryRestrictionScalarWhereWithAggregatesInput | DietaryRestrictionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DietaryRestriction"> | string
    userId?: StringNullableWithAggregatesFilter<"DietaryRestriction"> | string | null
    foodItem?: StringWithAggregatesFilter<"DietaryRestriction"> | string
    reason?: StringWithAggregatesFilter<"DietaryRestriction"> | string
    severity?: StringWithAggregatesFilter<"DietaryRestriction"> | string
    category?: StringNullableWithAggregatesFilter<"DietaryRestriction"> | string | null
    notes?: StringNullableWithAggregatesFilter<"DietaryRestriction"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DietaryRestriction"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DietaryRestriction"> | Date | string
  }

  export type AvailableFoodWhereInput = {
    AND?: AvailableFoodWhereInput | AvailableFoodWhereInput[]
    OR?: AvailableFoodWhereInput[]
    NOT?: AvailableFoodWhereInput | AvailableFoodWhereInput[]
    id?: StringFilter<"AvailableFood"> | string
    userId?: StringNullableFilter<"AvailableFood"> | string | null
    name?: StringFilter<"AvailableFood"> | string
    category?: StringNullableFilter<"AvailableFood"> | string | null
    mealType?: StringNullableFilter<"AvailableFood"> | string | null
    createdAt?: DateTimeFilter<"AvailableFood"> | Date | string
    updatedAt?: DateTimeFilter<"AvailableFood"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type AvailableFoodOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    name?: SortOrder
    category?: SortOrderInput | SortOrder
    mealType?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AvailableFoodWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AvailableFoodWhereInput | AvailableFoodWhereInput[]
    OR?: AvailableFoodWhereInput[]
    NOT?: AvailableFoodWhereInput | AvailableFoodWhereInput[]
    userId?: StringNullableFilter<"AvailableFood"> | string | null
    name?: StringFilter<"AvailableFood"> | string
    category?: StringNullableFilter<"AvailableFood"> | string | null
    mealType?: StringNullableFilter<"AvailableFood"> | string | null
    createdAt?: DateTimeFilter<"AvailableFood"> | Date | string
    updatedAt?: DateTimeFilter<"AvailableFood"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type AvailableFoodOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    name?: SortOrder
    category?: SortOrderInput | SortOrder
    mealType?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AvailableFoodCountOrderByAggregateInput
    _max?: AvailableFoodMaxOrderByAggregateInput
    _min?: AvailableFoodMinOrderByAggregateInput
  }

  export type AvailableFoodScalarWhereWithAggregatesInput = {
    AND?: AvailableFoodScalarWhereWithAggregatesInput | AvailableFoodScalarWhereWithAggregatesInput[]
    OR?: AvailableFoodScalarWhereWithAggregatesInput[]
    NOT?: AvailableFoodScalarWhereWithAggregatesInput | AvailableFoodScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AvailableFood"> | string
    userId?: StringNullableWithAggregatesFilter<"AvailableFood"> | string | null
    name?: StringWithAggregatesFilter<"AvailableFood"> | string
    category?: StringNullableWithAggregatesFilter<"AvailableFood"> | string | null
    mealType?: StringNullableWithAggregatesFilter<"AvailableFood"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AvailableFood"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AvailableFood"> | Date | string
  }

  export type MealSuggestionWhereInput = {
    AND?: MealSuggestionWhereInput | MealSuggestionWhereInput[]
    OR?: MealSuggestionWhereInput[]
    NOT?: MealSuggestionWhereInput | MealSuggestionWhereInput[]
    id?: StringFilter<"MealSuggestion"> | string
    userId?: StringNullableFilter<"MealSuggestion"> | string | null
    mealType?: StringFilter<"MealSuggestion"> | string
    suggestion?: StringFilter<"MealSuggestion"> | string
    explanation?: StringNullableFilter<"MealSuggestion"> | string | null
    compatibleFoods?: StringNullableFilter<"MealSuggestion"> | string | null
    createdAt?: DateTimeFilter<"MealSuggestion"> | Date | string
  }

  export type MealSuggestionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    mealType?: SortOrder
    suggestion?: SortOrder
    explanation?: SortOrderInput | SortOrder
    compatibleFoods?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type MealSuggestionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MealSuggestionWhereInput | MealSuggestionWhereInput[]
    OR?: MealSuggestionWhereInput[]
    NOT?: MealSuggestionWhereInput | MealSuggestionWhereInput[]
    userId?: StringNullableFilter<"MealSuggestion"> | string | null
    mealType?: StringFilter<"MealSuggestion"> | string
    suggestion?: StringFilter<"MealSuggestion"> | string
    explanation?: StringNullableFilter<"MealSuggestion"> | string | null
    compatibleFoods?: StringNullableFilter<"MealSuggestion"> | string | null
    createdAt?: DateTimeFilter<"MealSuggestion"> | Date | string
  }, "id">

  export type MealSuggestionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    mealType?: SortOrder
    suggestion?: SortOrder
    explanation?: SortOrderInput | SortOrder
    compatibleFoods?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: MealSuggestionCountOrderByAggregateInput
    _max?: MealSuggestionMaxOrderByAggregateInput
    _min?: MealSuggestionMinOrderByAggregateInput
  }

  export type MealSuggestionScalarWhereWithAggregatesInput = {
    AND?: MealSuggestionScalarWhereWithAggregatesInput | MealSuggestionScalarWhereWithAggregatesInput[]
    OR?: MealSuggestionScalarWhereWithAggregatesInput[]
    NOT?: MealSuggestionScalarWhereWithAggregatesInput | MealSuggestionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MealSuggestion"> | string
    userId?: StringNullableWithAggregatesFilter<"MealSuggestion"> | string | null
    mealType?: StringWithAggregatesFilter<"MealSuggestion"> | string
    suggestion?: StringWithAggregatesFilter<"MealSuggestion"> | string
    explanation?: StringNullableWithAggregatesFilter<"MealSuggestion"> | string | null
    compatibleFoods?: StringNullableWithAggregatesFilter<"MealSuggestion"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MealSuggestion"> | Date | string
  }

  export type PreloadedSuggestionWhereInput = {
    AND?: PreloadedSuggestionWhereInput | PreloadedSuggestionWhereInput[]
    OR?: PreloadedSuggestionWhereInput[]
    NOT?: PreloadedSuggestionWhereInput | PreloadedSuggestionWhereInput[]
    id?: StringFilter<"PreloadedSuggestion"> | string
    name?: StringFilter<"PreloadedSuggestion"> | string
    description?: StringFilter<"PreloadedSuggestion"> | string
    ingredients?: StringFilter<"PreloadedSuggestion"> | string
    mealType?: StringFilter<"PreloadedSuggestion"> | string
    tags?: StringNullableFilter<"PreloadedSuggestion"> | string | null
    calories?: IntNullableFilter<"PreloadedSuggestion"> | number | null
    prepTime?: IntNullableFilter<"PreloadedSuggestion"> | number | null
    imageUrl?: StringNullableFilter<"PreloadedSuggestion"> | string | null
    createdAt?: DateTimeFilter<"PreloadedSuggestion"> | Date | string
  }

  export type PreloadedSuggestionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    ingredients?: SortOrder
    mealType?: SortOrder
    tags?: SortOrderInput | SortOrder
    calories?: SortOrderInput | SortOrder
    prepTime?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type PreloadedSuggestionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PreloadedSuggestionWhereInput | PreloadedSuggestionWhereInput[]
    OR?: PreloadedSuggestionWhereInput[]
    NOT?: PreloadedSuggestionWhereInput | PreloadedSuggestionWhereInput[]
    name?: StringFilter<"PreloadedSuggestion"> | string
    description?: StringFilter<"PreloadedSuggestion"> | string
    ingredients?: StringFilter<"PreloadedSuggestion"> | string
    mealType?: StringFilter<"PreloadedSuggestion"> | string
    tags?: StringNullableFilter<"PreloadedSuggestion"> | string | null
    calories?: IntNullableFilter<"PreloadedSuggestion"> | number | null
    prepTime?: IntNullableFilter<"PreloadedSuggestion"> | number | null
    imageUrl?: StringNullableFilter<"PreloadedSuggestion"> | string | null
    createdAt?: DateTimeFilter<"PreloadedSuggestion"> | Date | string
  }, "id">

  export type PreloadedSuggestionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    ingredients?: SortOrder
    mealType?: SortOrder
    tags?: SortOrderInput | SortOrder
    calories?: SortOrderInput | SortOrder
    prepTime?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: PreloadedSuggestionCountOrderByAggregateInput
    _avg?: PreloadedSuggestionAvgOrderByAggregateInput
    _max?: PreloadedSuggestionMaxOrderByAggregateInput
    _min?: PreloadedSuggestionMinOrderByAggregateInput
    _sum?: PreloadedSuggestionSumOrderByAggregateInput
  }

  export type PreloadedSuggestionScalarWhereWithAggregatesInput = {
    AND?: PreloadedSuggestionScalarWhereWithAggregatesInput | PreloadedSuggestionScalarWhereWithAggregatesInput[]
    OR?: PreloadedSuggestionScalarWhereWithAggregatesInput[]
    NOT?: PreloadedSuggestionScalarWhereWithAggregatesInput | PreloadedSuggestionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PreloadedSuggestion"> | string
    name?: StringWithAggregatesFilter<"PreloadedSuggestion"> | string
    description?: StringWithAggregatesFilter<"PreloadedSuggestion"> | string
    ingredients?: StringWithAggregatesFilter<"PreloadedSuggestion"> | string
    mealType?: StringWithAggregatesFilter<"PreloadedSuggestion"> | string
    tags?: StringNullableWithAggregatesFilter<"PreloadedSuggestion"> | string | null
    calories?: IntNullableWithAggregatesFilter<"PreloadedSuggestion"> | number | null
    prepTime?: IntNullableWithAggregatesFilter<"PreloadedSuggestion"> | number | null
    imageUrl?: StringNullableWithAggregatesFilter<"PreloadedSuggestion"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PreloadedSuggestion"> | Date | string
  }

  export type AccountCreateInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountCreateManyInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionCreateInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUncheckedCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    goal?: string | null
    activityLevel?: string | null
    recentLogs?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    restrictions?: DietaryRestrictionCreateNestedManyWithoutUserInput
    foods?: AvailableFoodCreateNestedManyWithoutUserInput
    preferences?: UserPreferencesCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    goal?: string | null
    activityLevel?: string | null
    recentLogs?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    restrictions?: DietaryRestrictionUncheckedCreateNestedManyWithoutUserInput
    foods?: AvailableFoodUncheckedCreateNestedManyWithoutUserInput
    preferences?: UserPreferencesUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    recentLogs?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    restrictions?: DietaryRestrictionUpdateManyWithoutUserNestedInput
    foods?: AvailableFoodUpdateManyWithoutUserNestedInput
    preferences?: UserPreferencesUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    recentLogs?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    restrictions?: DietaryRestrictionUncheckedUpdateManyWithoutUserNestedInput
    foods?: AvailableFoodUncheckedUpdateManyWithoutUserNestedInput
    preferences?: UserPreferencesUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    goal?: string | null
    activityLevel?: string | null
    recentLogs?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    recentLogs?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    recentLogs?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserPreferencesCreateInput = {
    id?: string
    onboarding?: boolean
    theme?: string
    notifications?: boolean
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPreferencesInput
  }

  export type UserPreferencesUncheckedCreateInput = {
    id?: string
    userId: string
    onboarding?: boolean
    theme?: string
    notifications?: boolean
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserPreferencesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    onboarding?: BoolFieldUpdateOperationsInput | boolean
    theme?: StringFieldUpdateOperationsInput | string
    notifications?: BoolFieldUpdateOperationsInput | boolean
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPreferencesNestedInput
  }

  export type UserPreferencesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    onboarding?: BoolFieldUpdateOperationsInput | boolean
    theme?: StringFieldUpdateOperationsInput | string
    notifications?: BoolFieldUpdateOperationsInput | boolean
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserPreferencesCreateManyInput = {
    id?: string
    userId: string
    onboarding?: boolean
    theme?: string
    notifications?: boolean
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserPreferencesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    onboarding?: BoolFieldUpdateOperationsInput | boolean
    theme?: StringFieldUpdateOperationsInput | string
    notifications?: BoolFieldUpdateOperationsInput | boolean
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserPreferencesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    onboarding?: BoolFieldUpdateOperationsInput | boolean
    theme?: StringFieldUpdateOperationsInput | string
    notifications?: BoolFieldUpdateOperationsInput | boolean
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DietaryRestrictionCreateInput = {
    id?: string
    foodItem: string
    reason: string
    severity: string
    category?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutRestrictionsInput
  }

  export type DietaryRestrictionUncheckedCreateInput = {
    id?: string
    userId?: string | null
    foodItem: string
    reason: string
    severity: string
    category?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DietaryRestrictionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    foodItem?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutRestrictionsNestedInput
  }

  export type DietaryRestrictionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    foodItem?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DietaryRestrictionCreateManyInput = {
    id?: string
    userId?: string | null
    foodItem: string
    reason: string
    severity: string
    category?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DietaryRestrictionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    foodItem?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DietaryRestrictionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    foodItem?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvailableFoodCreateInput = {
    id?: string
    name: string
    category?: string | null
    mealType?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutFoodsInput
  }

  export type AvailableFoodUncheckedCreateInput = {
    id?: string
    userId?: string | null
    name: string
    category?: string | null
    mealType?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AvailableFoodUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    mealType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutFoodsNestedInput
  }

  export type AvailableFoodUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    mealType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvailableFoodCreateManyInput = {
    id?: string
    userId?: string | null
    name: string
    category?: string | null
    mealType?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AvailableFoodUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    mealType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvailableFoodUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    mealType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MealSuggestionCreateInput = {
    id?: string
    userId?: string | null
    mealType: string
    suggestion: string
    explanation?: string | null
    compatibleFoods?: string | null
    createdAt?: Date | string
  }

  export type MealSuggestionUncheckedCreateInput = {
    id?: string
    userId?: string | null
    mealType: string
    suggestion: string
    explanation?: string | null
    compatibleFoods?: string | null
    createdAt?: Date | string
  }

  export type MealSuggestionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    mealType?: StringFieldUpdateOperationsInput | string
    suggestion?: StringFieldUpdateOperationsInput | string
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    compatibleFoods?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MealSuggestionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    mealType?: StringFieldUpdateOperationsInput | string
    suggestion?: StringFieldUpdateOperationsInput | string
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    compatibleFoods?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MealSuggestionCreateManyInput = {
    id?: string
    userId?: string | null
    mealType: string
    suggestion: string
    explanation?: string | null
    compatibleFoods?: string | null
    createdAt?: Date | string
  }

  export type MealSuggestionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    mealType?: StringFieldUpdateOperationsInput | string
    suggestion?: StringFieldUpdateOperationsInput | string
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    compatibleFoods?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MealSuggestionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    mealType?: StringFieldUpdateOperationsInput | string
    suggestion?: StringFieldUpdateOperationsInput | string
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    compatibleFoods?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PreloadedSuggestionCreateInput = {
    id?: string
    name: string
    description: string
    ingredients: string
    mealType: string
    tags?: string | null
    calories?: number | null
    prepTime?: number | null
    imageUrl?: string | null
    createdAt?: Date | string
  }

  export type PreloadedSuggestionUncheckedCreateInput = {
    id?: string
    name: string
    description: string
    ingredients: string
    mealType: string
    tags?: string | null
    calories?: number | null
    prepTime?: number | null
    imageUrl?: string | null
    createdAt?: Date | string
  }

  export type PreloadedSuggestionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    ingredients?: StringFieldUpdateOperationsInput | string
    mealType?: StringFieldUpdateOperationsInput | string
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    prepTime?: NullableIntFieldUpdateOperationsInput | number | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PreloadedSuggestionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    ingredients?: StringFieldUpdateOperationsInput | string
    mealType?: StringFieldUpdateOperationsInput | string
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    prepTime?: NullableIntFieldUpdateOperationsInput | number | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PreloadedSuggestionCreateManyInput = {
    id?: string
    name: string
    description: string
    ingredients: string
    mealType: string
    tags?: string | null
    calories?: number | null
    prepTime?: number | null
    imageUrl?: string | null
    createdAt?: Date | string
  }

  export type PreloadedSuggestionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    ingredients?: StringFieldUpdateOperationsInput | string
    mealType?: StringFieldUpdateOperationsInput | string
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    prepTime?: NullableIntFieldUpdateOperationsInput | number | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PreloadedSuggestionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    ingredients?: StringFieldUpdateOperationsInput | string
    mealType?: StringFieldUpdateOperationsInput | string
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    prepTime?: NullableIntFieldUpdateOperationsInput | number | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
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

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
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

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string
    token: string
  }

  export type VerificationTokenCountOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type DietaryRestrictionListRelationFilter = {
    every?: DietaryRestrictionWhereInput
    some?: DietaryRestrictionWhereInput
    none?: DietaryRestrictionWhereInput
  }

  export type AvailableFoodListRelationFilter = {
    every?: AvailableFoodWhereInput
    some?: AvailableFoodWhereInput
    none?: AvailableFoodWhereInput
  }

  export type UserPreferencesNullableScalarRelationFilter = {
    is?: UserPreferencesWhereInput | null
    isNot?: UserPreferencesWhereInput | null
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DietaryRestrictionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AvailableFoodOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    password?: SortOrder
    goal?: SortOrder
    activityLevel?: SortOrder
    recentLogs?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    password?: SortOrder
    goal?: SortOrder
    activityLevel?: SortOrder
    recentLogs?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    password?: SortOrder
    goal?: SortOrder
    activityLevel?: SortOrder
    recentLogs?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserPreferencesCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    onboarding?: SortOrder
    theme?: SortOrder
    notifications?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserPreferencesMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    onboarding?: SortOrder
    theme?: SortOrder
    notifications?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserPreferencesMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    onboarding?: SortOrder
    theme?: SortOrder
    notifications?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type DietaryRestrictionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    foodItem?: SortOrder
    reason?: SortOrder
    severity?: SortOrder
    category?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DietaryRestrictionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    foodItem?: SortOrder
    reason?: SortOrder
    severity?: SortOrder
    category?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DietaryRestrictionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    foodItem?: SortOrder
    reason?: SortOrder
    severity?: SortOrder
    category?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AvailableFoodCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    category?: SortOrder
    mealType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AvailableFoodMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    category?: SortOrder
    mealType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AvailableFoodMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    category?: SortOrder
    mealType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MealSuggestionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    mealType?: SortOrder
    suggestion?: SortOrder
    explanation?: SortOrder
    compatibleFoods?: SortOrder
    createdAt?: SortOrder
  }

  export type MealSuggestionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    mealType?: SortOrder
    suggestion?: SortOrder
    explanation?: SortOrder
    compatibleFoods?: SortOrder
    createdAt?: SortOrder
  }

  export type MealSuggestionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    mealType?: SortOrder
    suggestion?: SortOrder
    explanation?: SortOrder
    compatibleFoods?: SortOrder
    createdAt?: SortOrder
  }

  export type PreloadedSuggestionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    ingredients?: SortOrder
    mealType?: SortOrder
    tags?: SortOrder
    calories?: SortOrder
    prepTime?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type PreloadedSuggestionAvgOrderByAggregateInput = {
    calories?: SortOrder
    prepTime?: SortOrder
  }

  export type PreloadedSuggestionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    ingredients?: SortOrder
    mealType?: SortOrder
    tags?: SortOrder
    calories?: SortOrder
    prepTime?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type PreloadedSuggestionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    ingredients?: SortOrder
    mealType?: SortOrder
    tags?: SortOrder
    calories?: SortOrder
    prepTime?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type PreloadedSuggestionSumOrderByAggregateInput = {
    calories?: SortOrder
    prepTime?: SortOrder
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type DietaryRestrictionCreateNestedManyWithoutUserInput = {
    create?: XOR<DietaryRestrictionCreateWithoutUserInput, DietaryRestrictionUncheckedCreateWithoutUserInput> | DietaryRestrictionCreateWithoutUserInput[] | DietaryRestrictionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DietaryRestrictionCreateOrConnectWithoutUserInput | DietaryRestrictionCreateOrConnectWithoutUserInput[]
    createMany?: DietaryRestrictionCreateManyUserInputEnvelope
    connect?: DietaryRestrictionWhereUniqueInput | DietaryRestrictionWhereUniqueInput[]
  }

  export type AvailableFoodCreateNestedManyWithoutUserInput = {
    create?: XOR<AvailableFoodCreateWithoutUserInput, AvailableFoodUncheckedCreateWithoutUserInput> | AvailableFoodCreateWithoutUserInput[] | AvailableFoodUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AvailableFoodCreateOrConnectWithoutUserInput | AvailableFoodCreateOrConnectWithoutUserInput[]
    createMany?: AvailableFoodCreateManyUserInputEnvelope
    connect?: AvailableFoodWhereUniqueInput | AvailableFoodWhereUniqueInput[]
  }

  export type UserPreferencesCreateNestedOneWithoutUserInput = {
    create?: XOR<UserPreferencesCreateWithoutUserInput, UserPreferencesUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserPreferencesCreateOrConnectWithoutUserInput
    connect?: UserPreferencesWhereUniqueInput
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type DietaryRestrictionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<DietaryRestrictionCreateWithoutUserInput, DietaryRestrictionUncheckedCreateWithoutUserInput> | DietaryRestrictionCreateWithoutUserInput[] | DietaryRestrictionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DietaryRestrictionCreateOrConnectWithoutUserInput | DietaryRestrictionCreateOrConnectWithoutUserInput[]
    createMany?: DietaryRestrictionCreateManyUserInputEnvelope
    connect?: DietaryRestrictionWhereUniqueInput | DietaryRestrictionWhereUniqueInput[]
  }

  export type AvailableFoodUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AvailableFoodCreateWithoutUserInput, AvailableFoodUncheckedCreateWithoutUserInput> | AvailableFoodCreateWithoutUserInput[] | AvailableFoodUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AvailableFoodCreateOrConnectWithoutUserInput | AvailableFoodCreateOrConnectWithoutUserInput[]
    createMany?: AvailableFoodCreateManyUserInputEnvelope
    connect?: AvailableFoodWhereUniqueInput | AvailableFoodWhereUniqueInput[]
  }

  export type UserPreferencesUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<UserPreferencesCreateWithoutUserInput, UserPreferencesUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserPreferencesCreateOrConnectWithoutUserInput
    connect?: UserPreferencesWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type DietaryRestrictionUpdateManyWithoutUserNestedInput = {
    create?: XOR<DietaryRestrictionCreateWithoutUserInput, DietaryRestrictionUncheckedCreateWithoutUserInput> | DietaryRestrictionCreateWithoutUserInput[] | DietaryRestrictionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DietaryRestrictionCreateOrConnectWithoutUserInput | DietaryRestrictionCreateOrConnectWithoutUserInput[]
    upsert?: DietaryRestrictionUpsertWithWhereUniqueWithoutUserInput | DietaryRestrictionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DietaryRestrictionCreateManyUserInputEnvelope
    set?: DietaryRestrictionWhereUniqueInput | DietaryRestrictionWhereUniqueInput[]
    disconnect?: DietaryRestrictionWhereUniqueInput | DietaryRestrictionWhereUniqueInput[]
    delete?: DietaryRestrictionWhereUniqueInput | DietaryRestrictionWhereUniqueInput[]
    connect?: DietaryRestrictionWhereUniqueInput | DietaryRestrictionWhereUniqueInput[]
    update?: DietaryRestrictionUpdateWithWhereUniqueWithoutUserInput | DietaryRestrictionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DietaryRestrictionUpdateManyWithWhereWithoutUserInput | DietaryRestrictionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DietaryRestrictionScalarWhereInput | DietaryRestrictionScalarWhereInput[]
  }

  export type AvailableFoodUpdateManyWithoutUserNestedInput = {
    create?: XOR<AvailableFoodCreateWithoutUserInput, AvailableFoodUncheckedCreateWithoutUserInput> | AvailableFoodCreateWithoutUserInput[] | AvailableFoodUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AvailableFoodCreateOrConnectWithoutUserInput | AvailableFoodCreateOrConnectWithoutUserInput[]
    upsert?: AvailableFoodUpsertWithWhereUniqueWithoutUserInput | AvailableFoodUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AvailableFoodCreateManyUserInputEnvelope
    set?: AvailableFoodWhereUniqueInput | AvailableFoodWhereUniqueInput[]
    disconnect?: AvailableFoodWhereUniqueInput | AvailableFoodWhereUniqueInput[]
    delete?: AvailableFoodWhereUniqueInput | AvailableFoodWhereUniqueInput[]
    connect?: AvailableFoodWhereUniqueInput | AvailableFoodWhereUniqueInput[]
    update?: AvailableFoodUpdateWithWhereUniqueWithoutUserInput | AvailableFoodUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AvailableFoodUpdateManyWithWhereWithoutUserInput | AvailableFoodUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AvailableFoodScalarWhereInput | AvailableFoodScalarWhereInput[]
  }

  export type UserPreferencesUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserPreferencesCreateWithoutUserInput, UserPreferencesUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserPreferencesCreateOrConnectWithoutUserInput
    upsert?: UserPreferencesUpsertWithoutUserInput
    disconnect?: UserPreferencesWhereInput | boolean
    delete?: UserPreferencesWhereInput | boolean
    connect?: UserPreferencesWhereUniqueInput
    update?: XOR<XOR<UserPreferencesUpdateToOneWithWhereWithoutUserInput, UserPreferencesUpdateWithoutUserInput>, UserPreferencesUncheckedUpdateWithoutUserInput>
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type DietaryRestrictionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<DietaryRestrictionCreateWithoutUserInput, DietaryRestrictionUncheckedCreateWithoutUserInput> | DietaryRestrictionCreateWithoutUserInput[] | DietaryRestrictionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DietaryRestrictionCreateOrConnectWithoutUserInput | DietaryRestrictionCreateOrConnectWithoutUserInput[]
    upsert?: DietaryRestrictionUpsertWithWhereUniqueWithoutUserInput | DietaryRestrictionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DietaryRestrictionCreateManyUserInputEnvelope
    set?: DietaryRestrictionWhereUniqueInput | DietaryRestrictionWhereUniqueInput[]
    disconnect?: DietaryRestrictionWhereUniqueInput | DietaryRestrictionWhereUniqueInput[]
    delete?: DietaryRestrictionWhereUniqueInput | DietaryRestrictionWhereUniqueInput[]
    connect?: DietaryRestrictionWhereUniqueInput | DietaryRestrictionWhereUniqueInput[]
    update?: DietaryRestrictionUpdateWithWhereUniqueWithoutUserInput | DietaryRestrictionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DietaryRestrictionUpdateManyWithWhereWithoutUserInput | DietaryRestrictionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DietaryRestrictionScalarWhereInput | DietaryRestrictionScalarWhereInput[]
  }

  export type AvailableFoodUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AvailableFoodCreateWithoutUserInput, AvailableFoodUncheckedCreateWithoutUserInput> | AvailableFoodCreateWithoutUserInput[] | AvailableFoodUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AvailableFoodCreateOrConnectWithoutUserInput | AvailableFoodCreateOrConnectWithoutUserInput[]
    upsert?: AvailableFoodUpsertWithWhereUniqueWithoutUserInput | AvailableFoodUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AvailableFoodCreateManyUserInputEnvelope
    set?: AvailableFoodWhereUniqueInput | AvailableFoodWhereUniqueInput[]
    disconnect?: AvailableFoodWhereUniqueInput | AvailableFoodWhereUniqueInput[]
    delete?: AvailableFoodWhereUniqueInput | AvailableFoodWhereUniqueInput[]
    connect?: AvailableFoodWhereUniqueInput | AvailableFoodWhereUniqueInput[]
    update?: AvailableFoodUpdateWithWhereUniqueWithoutUserInput | AvailableFoodUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AvailableFoodUpdateManyWithWhereWithoutUserInput | AvailableFoodUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AvailableFoodScalarWhereInput | AvailableFoodScalarWhereInput[]
  }

  export type UserPreferencesUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserPreferencesCreateWithoutUserInput, UserPreferencesUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserPreferencesCreateOrConnectWithoutUserInput
    upsert?: UserPreferencesUpsertWithoutUserInput
    disconnect?: UserPreferencesWhereInput | boolean
    delete?: UserPreferencesWhereInput | boolean
    connect?: UserPreferencesWhereUniqueInput
    update?: XOR<XOR<UserPreferencesUpdateToOneWithWhereWithoutUserInput, UserPreferencesUpdateWithoutUserInput>, UserPreferencesUncheckedUpdateWithoutUserInput>
  }

  export type UserCreateNestedOneWithoutPreferencesInput = {
    create?: XOR<UserCreateWithoutPreferencesInput, UserUncheckedCreateWithoutPreferencesInput>
    connectOrCreate?: UserCreateOrConnectWithoutPreferencesInput
    connect?: UserWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutPreferencesNestedInput = {
    create?: XOR<UserCreateWithoutPreferencesInput, UserUncheckedCreateWithoutPreferencesInput>
    connectOrCreate?: UserCreateOrConnectWithoutPreferencesInput
    upsert?: UserUpsertWithoutPreferencesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPreferencesInput, UserUpdateWithoutPreferencesInput>, UserUncheckedUpdateWithoutPreferencesInput>
  }

  export type UserCreateNestedOneWithoutRestrictionsInput = {
    create?: XOR<UserCreateWithoutRestrictionsInput, UserUncheckedCreateWithoutRestrictionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRestrictionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutRestrictionsNestedInput = {
    create?: XOR<UserCreateWithoutRestrictionsInput, UserUncheckedCreateWithoutRestrictionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRestrictionsInput
    upsert?: UserUpsertWithoutRestrictionsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRestrictionsInput, UserUpdateWithoutRestrictionsInput>, UserUncheckedUpdateWithoutRestrictionsInput>
  }

  export type UserCreateNestedOneWithoutFoodsInput = {
    create?: XOR<UserCreateWithoutFoodsInput, UserUncheckedCreateWithoutFoodsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFoodsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutFoodsNestedInput = {
    create?: XOR<UserCreateWithoutFoodsInput, UserUncheckedCreateWithoutFoodsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFoodsInput
    upsert?: UserUpsertWithoutFoodsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFoodsInput, UserUpdateWithoutFoodsInput>, UserUncheckedUpdateWithoutFoodsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
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

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
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

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
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

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    goal?: string | null
    activityLevel?: string | null
    recentLogs?: string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
    restrictions?: DietaryRestrictionCreateNestedManyWithoutUserInput
    foods?: AvailableFoodCreateNestedManyWithoutUserInput
    preferences?: UserPreferencesCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    goal?: string | null
    activityLevel?: string | null
    recentLogs?: string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    restrictions?: DietaryRestrictionUncheckedCreateNestedManyWithoutUserInput
    foods?: AvailableFoodUncheckedCreateNestedManyWithoutUserInput
    preferences?: UserPreferencesUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    recentLogs?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
    restrictions?: DietaryRestrictionUpdateManyWithoutUserNestedInput
    foods?: AvailableFoodUpdateManyWithoutUserNestedInput
    preferences?: UserPreferencesUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    recentLogs?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    restrictions?: DietaryRestrictionUncheckedUpdateManyWithoutUserNestedInput
    foods?: AvailableFoodUncheckedUpdateManyWithoutUserNestedInput
    preferences?: UserPreferencesUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    goal?: string | null
    activityLevel?: string | null
    recentLogs?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    restrictions?: DietaryRestrictionCreateNestedManyWithoutUserInput
    foods?: AvailableFoodCreateNestedManyWithoutUserInput
    preferences?: UserPreferencesCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    goal?: string | null
    activityLevel?: string | null
    recentLogs?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    restrictions?: DietaryRestrictionUncheckedCreateNestedManyWithoutUserInput
    foods?: AvailableFoodUncheckedCreateNestedManyWithoutUserInput
    preferences?: UserPreferencesUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    recentLogs?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    restrictions?: DietaryRestrictionUpdateManyWithoutUserNestedInput
    foods?: AvailableFoodUpdateManyWithoutUserNestedInput
    preferences?: UserPreferencesUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    recentLogs?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    restrictions?: DietaryRestrictionUncheckedUpdateManyWithoutUserNestedInput
    foods?: AvailableFoodUncheckedUpdateManyWithoutUserNestedInput
    preferences?: UserPreferencesUncheckedUpdateOneWithoutUserNestedInput
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
  }

  export type DietaryRestrictionCreateWithoutUserInput = {
    id?: string
    foodItem: string
    reason: string
    severity: string
    category?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DietaryRestrictionUncheckedCreateWithoutUserInput = {
    id?: string
    foodItem: string
    reason: string
    severity: string
    category?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DietaryRestrictionCreateOrConnectWithoutUserInput = {
    where: DietaryRestrictionWhereUniqueInput
    create: XOR<DietaryRestrictionCreateWithoutUserInput, DietaryRestrictionUncheckedCreateWithoutUserInput>
  }

  export type DietaryRestrictionCreateManyUserInputEnvelope = {
    data: DietaryRestrictionCreateManyUserInput | DietaryRestrictionCreateManyUserInput[]
  }

  export type AvailableFoodCreateWithoutUserInput = {
    id?: string
    name: string
    category?: string | null
    mealType?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AvailableFoodUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    category?: string | null
    mealType?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AvailableFoodCreateOrConnectWithoutUserInput = {
    where: AvailableFoodWhereUniqueInput
    create: XOR<AvailableFoodCreateWithoutUserInput, AvailableFoodUncheckedCreateWithoutUserInput>
  }

  export type AvailableFoodCreateManyUserInputEnvelope = {
    data: AvailableFoodCreateManyUserInput | AvailableFoodCreateManyUserInput[]
  }

  export type UserPreferencesCreateWithoutUserInput = {
    id?: string
    onboarding?: boolean
    theme?: string
    notifications?: boolean
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserPreferencesUncheckedCreateWithoutUserInput = {
    id?: string
    onboarding?: boolean
    theme?: string
    notifications?: boolean
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserPreferencesCreateOrConnectWithoutUserInput = {
    where: UserPreferencesWhereUniqueInput
    create: XOR<UserPreferencesCreateWithoutUserInput, UserPreferencesUncheckedCreateWithoutUserInput>
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
  }

  export type DietaryRestrictionUpsertWithWhereUniqueWithoutUserInput = {
    where: DietaryRestrictionWhereUniqueInput
    update: XOR<DietaryRestrictionUpdateWithoutUserInput, DietaryRestrictionUncheckedUpdateWithoutUserInput>
    create: XOR<DietaryRestrictionCreateWithoutUserInput, DietaryRestrictionUncheckedCreateWithoutUserInput>
  }

  export type DietaryRestrictionUpdateWithWhereUniqueWithoutUserInput = {
    where: DietaryRestrictionWhereUniqueInput
    data: XOR<DietaryRestrictionUpdateWithoutUserInput, DietaryRestrictionUncheckedUpdateWithoutUserInput>
  }

  export type DietaryRestrictionUpdateManyWithWhereWithoutUserInput = {
    where: DietaryRestrictionScalarWhereInput
    data: XOR<DietaryRestrictionUpdateManyMutationInput, DietaryRestrictionUncheckedUpdateManyWithoutUserInput>
  }

  export type DietaryRestrictionScalarWhereInput = {
    AND?: DietaryRestrictionScalarWhereInput | DietaryRestrictionScalarWhereInput[]
    OR?: DietaryRestrictionScalarWhereInput[]
    NOT?: DietaryRestrictionScalarWhereInput | DietaryRestrictionScalarWhereInput[]
    id?: StringFilter<"DietaryRestriction"> | string
    userId?: StringNullableFilter<"DietaryRestriction"> | string | null
    foodItem?: StringFilter<"DietaryRestriction"> | string
    reason?: StringFilter<"DietaryRestriction"> | string
    severity?: StringFilter<"DietaryRestriction"> | string
    category?: StringNullableFilter<"DietaryRestriction"> | string | null
    notes?: StringNullableFilter<"DietaryRestriction"> | string | null
    createdAt?: DateTimeFilter<"DietaryRestriction"> | Date | string
    updatedAt?: DateTimeFilter<"DietaryRestriction"> | Date | string
  }

  export type AvailableFoodUpsertWithWhereUniqueWithoutUserInput = {
    where: AvailableFoodWhereUniqueInput
    update: XOR<AvailableFoodUpdateWithoutUserInput, AvailableFoodUncheckedUpdateWithoutUserInput>
    create: XOR<AvailableFoodCreateWithoutUserInput, AvailableFoodUncheckedCreateWithoutUserInput>
  }

  export type AvailableFoodUpdateWithWhereUniqueWithoutUserInput = {
    where: AvailableFoodWhereUniqueInput
    data: XOR<AvailableFoodUpdateWithoutUserInput, AvailableFoodUncheckedUpdateWithoutUserInput>
  }

  export type AvailableFoodUpdateManyWithWhereWithoutUserInput = {
    where: AvailableFoodScalarWhereInput
    data: XOR<AvailableFoodUpdateManyMutationInput, AvailableFoodUncheckedUpdateManyWithoutUserInput>
  }

  export type AvailableFoodScalarWhereInput = {
    AND?: AvailableFoodScalarWhereInput | AvailableFoodScalarWhereInput[]
    OR?: AvailableFoodScalarWhereInput[]
    NOT?: AvailableFoodScalarWhereInput | AvailableFoodScalarWhereInput[]
    id?: StringFilter<"AvailableFood"> | string
    userId?: StringNullableFilter<"AvailableFood"> | string | null
    name?: StringFilter<"AvailableFood"> | string
    category?: StringNullableFilter<"AvailableFood"> | string | null
    mealType?: StringNullableFilter<"AvailableFood"> | string | null
    createdAt?: DateTimeFilter<"AvailableFood"> | Date | string
    updatedAt?: DateTimeFilter<"AvailableFood"> | Date | string
  }

  export type UserPreferencesUpsertWithoutUserInput = {
    update: XOR<UserPreferencesUpdateWithoutUserInput, UserPreferencesUncheckedUpdateWithoutUserInput>
    create: XOR<UserPreferencesCreateWithoutUserInput, UserPreferencesUncheckedCreateWithoutUserInput>
    where?: UserPreferencesWhereInput
  }

  export type UserPreferencesUpdateToOneWithWhereWithoutUserInput = {
    where?: UserPreferencesWhereInput
    data: XOR<UserPreferencesUpdateWithoutUserInput, UserPreferencesUncheckedUpdateWithoutUserInput>
  }

  export type UserPreferencesUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    onboarding?: BoolFieldUpdateOperationsInput | boolean
    theme?: StringFieldUpdateOperationsInput | string
    notifications?: BoolFieldUpdateOperationsInput | boolean
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserPreferencesUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    onboarding?: BoolFieldUpdateOperationsInput | boolean
    theme?: StringFieldUpdateOperationsInput | string
    notifications?: BoolFieldUpdateOperationsInput | boolean
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutPreferencesInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    goal?: string | null
    activityLevel?: string | null
    recentLogs?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    restrictions?: DietaryRestrictionCreateNestedManyWithoutUserInput
    foods?: AvailableFoodCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPreferencesInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    goal?: string | null
    activityLevel?: string | null
    recentLogs?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    restrictions?: DietaryRestrictionUncheckedCreateNestedManyWithoutUserInput
    foods?: AvailableFoodUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPreferencesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPreferencesInput, UserUncheckedCreateWithoutPreferencesInput>
  }

  export type UserUpsertWithoutPreferencesInput = {
    update: XOR<UserUpdateWithoutPreferencesInput, UserUncheckedUpdateWithoutPreferencesInput>
    create: XOR<UserCreateWithoutPreferencesInput, UserUncheckedCreateWithoutPreferencesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPreferencesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPreferencesInput, UserUncheckedUpdateWithoutPreferencesInput>
  }

  export type UserUpdateWithoutPreferencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    recentLogs?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    restrictions?: DietaryRestrictionUpdateManyWithoutUserNestedInput
    foods?: AvailableFoodUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPreferencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    recentLogs?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    restrictions?: DietaryRestrictionUncheckedUpdateManyWithoutUserNestedInput
    foods?: AvailableFoodUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutRestrictionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    goal?: string | null
    activityLevel?: string | null
    recentLogs?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    foods?: AvailableFoodCreateNestedManyWithoutUserInput
    preferences?: UserPreferencesCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRestrictionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    goal?: string | null
    activityLevel?: string | null
    recentLogs?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    foods?: AvailableFoodUncheckedCreateNestedManyWithoutUserInput
    preferences?: UserPreferencesUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRestrictionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRestrictionsInput, UserUncheckedCreateWithoutRestrictionsInput>
  }

  export type UserUpsertWithoutRestrictionsInput = {
    update: XOR<UserUpdateWithoutRestrictionsInput, UserUncheckedUpdateWithoutRestrictionsInput>
    create: XOR<UserCreateWithoutRestrictionsInput, UserUncheckedCreateWithoutRestrictionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRestrictionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRestrictionsInput, UserUncheckedUpdateWithoutRestrictionsInput>
  }

  export type UserUpdateWithoutRestrictionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    recentLogs?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    foods?: AvailableFoodUpdateManyWithoutUserNestedInput
    preferences?: UserPreferencesUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRestrictionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    recentLogs?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    foods?: AvailableFoodUncheckedUpdateManyWithoutUserNestedInput
    preferences?: UserPreferencesUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutFoodsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    goal?: string | null
    activityLevel?: string | null
    recentLogs?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    restrictions?: DietaryRestrictionCreateNestedManyWithoutUserInput
    preferences?: UserPreferencesCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFoodsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    goal?: string | null
    activityLevel?: string | null
    recentLogs?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    restrictions?: DietaryRestrictionUncheckedCreateNestedManyWithoutUserInput
    preferences?: UserPreferencesUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFoodsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFoodsInput, UserUncheckedCreateWithoutFoodsInput>
  }

  export type UserUpsertWithoutFoodsInput = {
    update: XOR<UserUpdateWithoutFoodsInput, UserUncheckedUpdateWithoutFoodsInput>
    create: XOR<UserCreateWithoutFoodsInput, UserUncheckedCreateWithoutFoodsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFoodsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFoodsInput, UserUncheckedUpdateWithoutFoodsInput>
  }

  export type UserUpdateWithoutFoodsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    recentLogs?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    restrictions?: DietaryRestrictionUpdateManyWithoutUserNestedInput
    preferences?: UserPreferencesUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFoodsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    goal?: NullableStringFieldUpdateOperationsInput | string | null
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    recentLogs?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    restrictions?: DietaryRestrictionUncheckedUpdateManyWithoutUserNestedInput
    preferences?: UserPreferencesUncheckedUpdateOneWithoutUserNestedInput
  }

  export type AccountCreateManyUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type SessionCreateManyUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type DietaryRestrictionCreateManyUserInput = {
    id?: string
    foodItem: string
    reason: string
    severity: string
    category?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AvailableFoodCreateManyUserInput = {
    id?: string
    name: string
    category?: string | null
    mealType?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DietaryRestrictionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    foodItem?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DietaryRestrictionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    foodItem?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DietaryRestrictionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    foodItem?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvailableFoodUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    mealType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvailableFoodUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    mealType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvailableFoodUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    mealType?: NullableStringFieldUpdateOperationsInput | string | null
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