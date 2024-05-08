[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / Repository

# Class: Repository\<TEntity, TQuery\>

## Type parameters

• **TEntity**

• **TQuery**

## Implements

- [`IRepository`](../interfaces/IRepository.md)\<`TEntity`, `TQuery`\>

## Constructors

### new Repository()

> **new Repository**\<`TEntity`, `TQuery`\>(`name`, `stage`?, `orm`?): [`Repository`](Repository.md)\<`TEntity`, `TQuery`\>

#### Parameters

• **name**: `string`

• **stage?**: `string`

• **orm?**: [`IOrm`](../interfaces/IOrm.md)= `_orm`

#### Returns

[`Repository`](Repository.md)\<`TEntity`, `TQuery`\>

#### Source

[src/lib/repository/infrastructure/repository.ts:10](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/repository/infrastructure/repository.ts#L10)

## Properties

### name

> `readonly` **name**: `string`

#### Source

[src/lib/repository/infrastructure/repository.ts:10](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/repository/infrastructure/repository.ts#L10)

***

### stage?

> `optional` **stage**: `string`

#### Source

[src/lib/repository/infrastructure/repository.ts:10](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/repository/infrastructure/repository.ts#L10)

## Methods

### bulkDelete()

#### bulkDelete(entities)

> **bulkDelete**(`entities`): `Promise`\<`any`[]\>

##### Parameters

• **entities**: `TEntity`[]

##### Returns

`Promise`\<`any`[]\>

##### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`bulkDelete`](../interfaces/IRepository.md#bulkdelete)

##### Source

[src/lib/repository/infrastructure/repository.ts:17](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/repository/infrastructure/repository.ts#L17)

#### bulkDelete(entities, include)

> **bulkDelete**(`entities`, `include`): `Promise`\<`any`[]\>

##### Parameters

• **entities**: `TEntity`[]

• **include**

##### Returns

`Promise`\<`any`[]\>

##### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`bulkDelete`](../interfaces/IRepository.md#bulkdelete)

##### Source

[src/lib/repository/infrastructure/repository.ts:18](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/repository/infrastructure/repository.ts#L18)

***

### bulkInsert()

#### bulkInsert(entities)

> **bulkInsert**(`entities`): `Promise`\<`any`[]\>

##### Parameters

• **entities**: `TEntity`[]

##### Returns

`Promise`\<`any`[]\>

##### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`bulkInsert`](../interfaces/IRepository.md#bulkinsert)

##### Source

[src/lib/repository/infrastructure/repository.ts:58](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/repository/infrastructure/repository.ts#L58)

#### bulkInsert(entities, include)

> **bulkInsert**(`entities`, `include`): `Promise`\<`any`[]\>

##### Parameters

• **entities**: `TEntity`[]

• **include**

##### Returns

`Promise`\<`any`[]\>

##### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`bulkInsert`](../interfaces/IRepository.md#bulkinsert)

##### Source

[src/lib/repository/infrastructure/repository.ts:60](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/repository/infrastructure/repository.ts#L60)

***

### bulkMerge()

#### bulkMerge(entities)

> **bulkMerge**(`entities`): `Promise`\<`any`[]\>

##### Parameters

• **entities**: `TEntity`[]

##### Returns

`Promise`\<`any`[]\>

##### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`bulkMerge`](../interfaces/IRepository.md#bulkmerge)

##### Source

[src/lib/repository/infrastructure/repository.ts:23](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/repository/infrastructure/repository.ts#L23)

#### bulkMerge(entities, include)

> **bulkMerge**(`entities`, `include`): `Promise`\<`any`[]\>

##### Parameters

• **entities**: `TEntity`[]

• **include**

##### Returns

`Promise`\<`any`[]\>

##### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`bulkMerge`](../interfaces/IRepository.md#bulkmerge)

##### Source

[src/lib/repository/infrastructure/repository.ts:24](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/repository/infrastructure/repository.ts#L24)

***

### delete()

#### delete(entity)

> **delete**(`entity`): `Promise`\<`number`\>

##### Parameters

• **entity**: `TEntity`

##### Returns

`Promise`\<`number`\>

##### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`delete`](../interfaces/IRepository.md#delete)

##### Source

[src/lib/repository/infrastructure/repository.ts:90](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/repository/infrastructure/repository.ts#L90)

#### delete(entity, include)

> **delete**(`entity`, `include`): `Promise`\<`number`\>

##### Parameters

• **entity**: `TEntity`

• **include**

##### Returns

`Promise`\<`number`\>

##### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`delete`](../interfaces/IRepository.md#delete)

##### Source

[src/lib/repository/infrastructure/repository.ts:92](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/repository/infrastructure/repository.ts#L92)

***

### deleteAll()

> **deleteAll**(`data`, `filter`?, `include`?): `Promise`\<`number`\>

#### Parameters

• **data**: `any`

• **filter?**

• **include?**

#### Returns

`Promise`\<`number`\>

#### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`deleteAll`](../interfaces/IRepository.md#deleteall)

#### Source

[src/lib/repository/infrastructure/repository.ts:97](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/repository/infrastructure/repository.ts#L97)

***

### distinct()

> **distinct**(`data`, `filter`?, `include`?): `Promise`\<`any`[]\>

#### Parameters

• **data**: `any`

• **filter?**

• **include?**

#### Returns

`Promise`\<`any`[]\>

#### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`distinct`](../interfaces/IRepository.md#distinct)

#### Source

[src/lib/repository/infrastructure/repository.ts:111](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/repository/infrastructure/repository.ts#L111)

***

### execute()

> **execute**(`query`, `data`?): `Promise`\<`any`\>

#### Parameters

• **query**: `string`

• **data?**: `any`

#### Returns

`Promise`\<`any`\>

#### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`execute`](../interfaces/IRepository.md#execute)

#### Source

[src/lib/repository/infrastructure/repository.ts:45](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/repository/infrastructure/repository.ts#L45)

***

### first()

> **first**(`data`, `filter`?, `include`?): `Promise`\<`null` \| `TEntity`\>

#### Parameters

• **data**: `any`

• **filter?**

• **include?**

#### Returns

`Promise`\<`null` \| `TEntity`\>

#### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`first`](../interfaces/IRepository.md#first)

#### Source

[src/lib/repository/infrastructure/repository.ts:118](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/repository/infrastructure/repository.ts#L118)

***

### insert()

#### insert(entity)

> **insert**(`entity`): `Promise`\<`any`\>

##### Parameters

• **entity**: `TEntity`

##### Returns

`Promise`\<`any`\>

##### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`insert`](../interfaces/IRepository.md#insert)

##### Source

[src/lib/repository/infrastructure/repository.ts:50](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/repository/infrastructure/repository.ts#L50)

#### insert(entity, include)

> **insert**(`entity`, `include`): `Promise`\<`any`\>

##### Parameters

• **entity**: `TEntity`

• **include**

##### Returns

`Promise`\<`any`\>

##### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`insert`](../interfaces/IRepository.md#insert)

##### Source

[src/lib/repository/infrastructure/repository.ts:52](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/repository/infrastructure/repository.ts#L52)

***

### last()

> **last**(`data`, `filter`?, `include`?): `Promise`\<`null` \| `TEntity`\>

#### Parameters

• **data**: `any`

• **filter?**

• **include?**

#### Returns

`Promise`\<`null` \| `TEntity`\>

#### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`last`](../interfaces/IRepository.md#last)

#### Source

[src/lib/repository/infrastructure/repository.ts:130](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/repository/infrastructure/repository.ts#L130)

***

### list()

> **list**(`data`, `filter`?, `include`?): `Promise`\<`TEntity`[]\>

#### Parameters

• **data**: `any`

• **filter?**

• **include?**

#### Returns

`Promise`\<`TEntity`[]\>

#### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`list`](../interfaces/IRepository.md#list)

#### Source

[src/lib/repository/infrastructure/repository.ts:104](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/repository/infrastructure/repository.ts#L104)

***

### merge()

#### merge(entity)

> **merge**(`entity`): `Promise`\<`number`\>

##### Parameters

• **entity**: `TEntity`

##### Returns

`Promise`\<`number`\>

##### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`merge`](../interfaces/IRepository.md#merge)

##### Source

[src/lib/repository/infrastructure/repository.ts:82](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/repository/infrastructure/repository.ts#L82)

#### merge(entity, include)

> **merge**(`entity`, `include`): `Promise`\<`number`\>

##### Parameters

• **entity**: `TEntity`

• **include**

##### Returns

`Promise`\<`number`\>

##### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`merge`](../interfaces/IRepository.md#merge)

##### Source

[src/lib/repository/infrastructure/repository.ts:84](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/repository/infrastructure/repository.ts#L84)

***

### query()

> **query**(): [`Queryable`](Queryable.md)\<`TQuery`\>

#### Returns

[`Queryable`](Queryable.md)\<`TQuery`\>

#### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`query`](../interfaces/IRepository.md#query)

#### Source

[src/lib/repository/infrastructure/repository.ts:142](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/repository/infrastructure/repository.ts#L142)

***

### update()

#### update(entity)

> **update**(`entity`): `Promise`\<`number`\>

##### Parameters

• **entity**: `TEntity`

##### Returns

`Promise`\<`number`\>

##### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`update`](../interfaces/IRepository.md#update)

##### Source

[src/lib/repository/infrastructure/repository.ts:66](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/repository/infrastructure/repository.ts#L66)

#### update(entity, include)

> **update**(`entity`, `include`): `Promise`\<`number`\>

##### Parameters

• **entity**: `TEntity`

• **include**

##### Returns

`Promise`\<`number`\>

##### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`update`](../interfaces/IRepository.md#update)

##### Source

[src/lib/repository/infrastructure/repository.ts:68](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/repository/infrastructure/repository.ts#L68)

***

### updateAll()

> **updateAll**(`data`, `map`, `filter`?, `include`?): `Promise`\<`number`\>

#### Parameters

• **data**: `any`

• **map**

• **filter?**

• **include?**

#### Returns

`Promise`\<`number`\>

#### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`updateAll`](../interfaces/IRepository.md#updateall)

#### Source

[src/lib/repository/infrastructure/repository.ts:73](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/repository/infrastructure/repository.ts#L73)

***

### upsert()

#### upsert(entity)

> **upsert**(`entity`): `Promise`\<`number`\>

##### Parameters

• **entity**: `TEntity`

##### Returns

`Promise`\<`number`\>

##### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`upsert`](../interfaces/IRepository.md#upsert)

##### Source

[src/lib/repository/infrastructure/repository.ts:11](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/repository/infrastructure/repository.ts#L11)

#### upsert(entity, include)

> **upsert**(`entity`, `include`): `Promise`\<`number`\>

##### Parameters

• **entity**: `TEntity`

• **include**

##### Returns

`Promise`\<`number`\>

##### Implementation of

[`IRepository`](../interfaces/IRepository.md).[`upsert`](../interfaces/IRepository.md#upsert)

##### Source

[src/lib/repository/infrastructure/repository.ts:12](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/repository/infrastructure/repository.ts#L12)
