[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / Repository

# Class: Repository\<TEntity, TQuery\>

Defined in: [src/lib/repository/infrastructure/repository.ts:8](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/infrastructure/repository.ts#L8)

## Type Parameters

### TEntity

`TEntity`

### TQuery

`TQuery`

## Implements

- [`IRepository`](../interfaces/IRepository.md)\<`TEntity`, `TQuery`\>

## Constructors

### Constructor

> **new Repository**\<`TEntity`, `TQuery`\>(`name`, `stage?`, `orm?`): `Repository`\<`TEntity`, `TQuery`\>

Defined in: [src/lib/repository/infrastructure/repository.ts:10](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/infrastructure/repository.ts#L10)

#### Parameters

##### name

`string`

##### stage?

`string`

##### orm?

[`IOrm`](../interfaces/IOrm.md) = `_orm`

#### Returns

`Repository`\<`TEntity`, `TQuery`\>

## Properties

### name

> `readonly` **name**: `string`

Defined in: [src/lib/repository/infrastructure/repository.ts:10](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/infrastructure/repository.ts#L10)

***

### stage?

> `optional` **stage**: `string`

Defined in: [src/lib/repository/infrastructure/repository.ts:10](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/infrastructure/repository.ts#L10)

## Methods

### bulkDelete()

#### Call Signature

> **bulkDelete**(`entities`): `Promise`\<`any`[]\>

Defined in: [src/lib/repository/infrastructure/repository.ts:17](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/infrastructure/repository.ts#L17)

##### Parameters

###### entities

`TEntity`[]

##### Returns

`Promise`\<`any`[]\>

##### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`bulkDelete`](../interfaces/IRepository.md#bulkdelete)

#### Call Signature

> **bulkDelete**(`entities`, `include`): `Promise`\<`any`[]\>

Defined in: [src/lib/repository/infrastructure/repository.ts:18](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/infrastructure/repository.ts#L18)

##### Parameters

###### entities

`TEntity`[]

###### include

(`value`, `index`, `array`) => `unknown`

##### Returns

`Promise`\<`any`[]\>

##### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`bulkDelete`](../interfaces/IRepository.md#bulkdelete)

***

### bulkInsert()

#### Call Signature

> **bulkInsert**(`entities`): `Promise`\<`any`[]\>

Defined in: [src/lib/repository/infrastructure/repository.ts:58](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/infrastructure/repository.ts#L58)

##### Parameters

###### entities

`TEntity`[]

##### Returns

`Promise`\<`any`[]\>

##### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`bulkInsert`](../interfaces/IRepository.md#bulkinsert)

#### Call Signature

> **bulkInsert**(`entities`, `include`): `Promise`\<`any`[]\>

Defined in: [src/lib/repository/infrastructure/repository.ts:60](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/infrastructure/repository.ts#L60)

##### Parameters

###### entities

`TEntity`[]

###### include

(`value`, `index`, `array`) => `unknown`

##### Returns

`Promise`\<`any`[]\>

##### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`bulkInsert`](../interfaces/IRepository.md#bulkinsert)

***

### bulkMerge()

#### Call Signature

> **bulkMerge**(`entities`): `Promise`\<`any`[]\>

Defined in: [src/lib/repository/infrastructure/repository.ts:23](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/infrastructure/repository.ts#L23)

##### Parameters

###### entities

`TEntity`[]

##### Returns

`Promise`\<`any`[]\>

##### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`bulkMerge`](../interfaces/IRepository.md#bulkmerge)

#### Call Signature

> **bulkMerge**(`entities`, `include`): `Promise`\<`any`[]\>

Defined in: [src/lib/repository/infrastructure/repository.ts:24](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/infrastructure/repository.ts#L24)

##### Parameters

###### entities

`TEntity`[]

###### include

(`value`, `index`, `array`) => `unknown`

##### Returns

`Promise`\<`any`[]\>

##### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`bulkMerge`](../interfaces/IRepository.md#bulkmerge)

***

### delete()

#### Call Signature

> **delete**(`entity`): `Promise`\<`number`\>

Defined in: [src/lib/repository/infrastructure/repository.ts:90](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/infrastructure/repository.ts#L90)

##### Parameters

###### entity

`TEntity`

##### Returns

`Promise`\<`number`\>

##### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`delete`](../interfaces/IRepository.md#delete)

#### Call Signature

> **delete**(`entity`, `include`): `Promise`\<`number`\>

Defined in: [src/lib/repository/infrastructure/repository.ts:92](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/infrastructure/repository.ts#L92)

##### Parameters

###### entity

`TEntity`

###### include

(`value`, `index`, `array`) => `unknown`

##### Returns

`Promise`\<`number`\>

##### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`delete`](../interfaces/IRepository.md#delete)

***

### deleteAll()

> **deleteAll**(`data`, `filter?`, `include?`): `Promise`\<`number`\>

Defined in: [src/lib/repository/infrastructure/repository.ts:97](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/infrastructure/repository.ts#L97)

#### Parameters

##### data

`any`

##### filter?

(`value`, `index`, `array`) => `unknown`

##### include?

(`value`, `index`, `array`) => `unknown`

#### Returns

`Promise`\<`number`\>

#### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`deleteAll`](../interfaces/IRepository.md#deleteall)

***

### distinct()

> **distinct**(`data`, `filter?`, `include?`): `Promise`\<`any`[]\>

Defined in: [src/lib/repository/infrastructure/repository.ts:111](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/infrastructure/repository.ts#L111)

#### Parameters

##### data

`any`

##### filter?

(`value`, `index`, `array`) => `unknown`

##### include?

(`value`, `index`, `array`) => `unknown`

#### Returns

`Promise`\<`any`[]\>

#### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`distinct`](../interfaces/IRepository.md#distinct)

***

### execute()

> **execute**(`query`, `data?`): `Promise`\<`any`\>

Defined in: [src/lib/repository/infrastructure/repository.ts:45](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/infrastructure/repository.ts#L45)

#### Parameters

##### query

`string`

##### data?

`any`

#### Returns

`Promise`\<`any`\>

#### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`execute`](../interfaces/IRepository.md#execute)

***

### first()

> **first**(`data`, `filter?`, `include?`): `Promise`\<`null` \| `TEntity`\>

Defined in: [src/lib/repository/infrastructure/repository.ts:118](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/infrastructure/repository.ts#L118)

#### Parameters

##### data

`any`

##### filter?

(`value`, `index`, `array`) => `unknown`

##### include?

(`value`, `index`, `array`) => `unknown`

#### Returns

`Promise`\<`null` \| `TEntity`\>

#### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`first`](../interfaces/IRepository.md#first)

***

### insert()

#### Call Signature

> **insert**(`entity`): `Promise`\<`any`\>

Defined in: [src/lib/repository/infrastructure/repository.ts:50](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/infrastructure/repository.ts#L50)

##### Parameters

###### entity

`TEntity`

##### Returns

`Promise`\<`any`\>

##### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`insert`](../interfaces/IRepository.md#insert)

#### Call Signature

> **insert**(`entity`, `include`): `Promise`\<`any`\>

Defined in: [src/lib/repository/infrastructure/repository.ts:52](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/infrastructure/repository.ts#L52)

##### Parameters

###### entity

`TEntity`

###### include

(`value`, `index`, `array`) => `unknown`

##### Returns

`Promise`\<`any`\>

##### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`insert`](../interfaces/IRepository.md#insert)

***

### last()

> **last**(`data`, `filter?`, `include?`): `Promise`\<`null` \| `TEntity`\>

Defined in: [src/lib/repository/infrastructure/repository.ts:130](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/infrastructure/repository.ts#L130)

#### Parameters

##### data

`any`

##### filter?

(`value`, `index`, `array`) => `unknown`

##### include?

(`value`, `index`, `array`) => `unknown`

#### Returns

`Promise`\<`null` \| `TEntity`\>

#### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`last`](../interfaces/IRepository.md#last)

***

### list()

> **list**(`data`, `filter?`, `include?`): `Promise`\<`TEntity`[]\>

Defined in: [src/lib/repository/infrastructure/repository.ts:104](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/infrastructure/repository.ts#L104)

#### Parameters

##### data

`any`

##### filter?

(`value`, `index`, `array`) => `unknown`

##### include?

(`value`, `index`, `array`) => `unknown`

#### Returns

`Promise`\<`TEntity`[]\>

#### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`list`](../interfaces/IRepository.md#list)

***

### merge()

#### Call Signature

> **merge**(`entity`): `Promise`\<`number`\>

Defined in: [src/lib/repository/infrastructure/repository.ts:82](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/infrastructure/repository.ts#L82)

##### Parameters

###### entity

`TEntity`

##### Returns

`Promise`\<`number`\>

##### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`merge`](../interfaces/IRepository.md#merge)

#### Call Signature

> **merge**(`entity`, `include`): `Promise`\<`number`\>

Defined in: [src/lib/repository/infrastructure/repository.ts:84](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/infrastructure/repository.ts#L84)

##### Parameters

###### entity

`TEntity`

###### include

(`value`, `index`, `array`) => `unknown`

##### Returns

`Promise`\<`number`\>

##### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`merge`](../interfaces/IRepository.md#merge)

***

### query()

> **query**(): [`Queryable`](Queryable.md)\<`TQuery`\>

Defined in: [src/lib/repository/infrastructure/repository.ts:142](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/infrastructure/repository.ts#L142)

#### Returns

[`Queryable`](Queryable.md)\<`TQuery`\>

#### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`query`](../interfaces/IRepository.md#query)

***

### update()

#### Call Signature

> **update**(`entity`): `Promise`\<`number`\>

Defined in: [src/lib/repository/infrastructure/repository.ts:66](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/infrastructure/repository.ts#L66)

##### Parameters

###### entity

`TEntity`

##### Returns

`Promise`\<`number`\>

##### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`update`](../interfaces/IRepository.md#update)

#### Call Signature

> **update**(`entity`, `include`): `Promise`\<`number`\>

Defined in: [src/lib/repository/infrastructure/repository.ts:68](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/infrastructure/repository.ts#L68)

##### Parameters

###### entity

`TEntity`

###### include

(`value`, `index`, `array`) => `unknown`

##### Returns

`Promise`\<`number`\>

##### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`update`](../interfaces/IRepository.md#update)

***

### updateAll()

> **updateAll**(`data`, `map`, `filter?`, `include?`): `Promise`\<`number`\>

Defined in: [src/lib/repository/infrastructure/repository.ts:73](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/infrastructure/repository.ts#L73)

#### Parameters

##### data

`any`

##### map

(`value`) => `unknown`

##### filter?

(`value`, `index`, `array`) => `unknown`

##### include?

(`value`, `index`, `array`) => `unknown`

#### Returns

`Promise`\<`number`\>

#### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`updateAll`](../interfaces/IRepository.md#updateall)

***

### upsert()

#### Call Signature

> **upsert**(`entity`): `Promise`\<`number`\>

Defined in: [src/lib/repository/infrastructure/repository.ts:11](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/infrastructure/repository.ts#L11)

##### Parameters

###### entity

`TEntity`

##### Returns

`Promise`\<`number`\>

##### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`upsert`](../interfaces/IRepository.md#upsert)

#### Call Signature

> **upsert**(`entity`, `include`): `Promise`\<`number`\>

Defined in: [src/lib/repository/infrastructure/repository.ts:12](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/infrastructure/repository.ts#L12)

##### Parameters

###### entity

`TEntity`

###### include

(`value`, `index`, `array`) => `unknown`

##### Returns

`Promise`\<`number`\>

##### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`upsert`](../interfaces/IRepository.md#upsert)
