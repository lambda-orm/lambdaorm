[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / IRepository

# Interface: IRepository\<TEntity, TQuery\>

## Type parameters

• **TEntity**

• **TQuery**

## Methods

### bulkDelete()

#### bulkDelete(entities)

> **bulkDelete**(`entities`): `Promise`\<`any`[]\>

##### Parameters

• **entities**: `TEntity`[]

##### Returns

`Promise`\<`any`[]\>

##### Source

node\_modules/lambdaorm-base/repository/application/repository.d.ts:26

#### bulkDelete(entities, include)

> **bulkDelete**(`entities`, `include`): `Promise`\<`any`[]\>

##### Parameters

• **entities**: `TEntity`[]

• **include**

##### Returns

`Promise`\<`any`[]\>

##### Source

node\_modules/lambdaorm-base/repository/application/repository.d.ts:27

#### bulkDelete(entities, include)

> **bulkDelete**(`entities`, `include`?): `Promise`\<`any`[]\>

##### Parameters

• **entities**: `TEntity`[]

• **include?**

##### Returns

`Promise`\<`any`[]\>

##### Source

node\_modules/lambdaorm-base/repository/application/repository.d.ts:28

***

### bulkInsert()

#### bulkInsert(entities)

> **bulkInsert**(`entities`): `Promise`\<`any`[]\>

##### Parameters

• **entities**: `TEntity`[]

##### Returns

`Promise`\<`any`[]\>

##### Source

node\_modules/lambdaorm-base/repository/application/repository.d.ts:7

#### bulkInsert(entities, include)

> **bulkInsert**(`entities`, `include`): `Promise`\<`any`[]\>

##### Parameters

• **entities**: `TEntity`[]

• **include**

##### Returns

`Promise`\<`any`[]\>

##### Source

node\_modules/lambdaorm-base/repository/application/repository.d.ts:8

#### bulkInsert(entities, include)

> **bulkInsert**(`entities`, `include`?): `Promise`\<`any`[]\>

##### Parameters

• **entities**: `TEntity`[]

• **include?**

##### Returns

`Promise`\<`any`[]\>

##### Source

node\_modules/lambdaorm-base/repository/application/repository.d.ts:9

***

### bulkMerge()

#### bulkMerge(entities)

> **bulkMerge**(`entities`): `Promise`\<`any`[]\>

##### Parameters

• **entities**: `TEntity`[]

##### Returns

`Promise`\<`any`[]\>

##### Source

node\_modules/lambdaorm-base/repository/application/repository.d.ts:20

#### bulkMerge(entities, include)

> **bulkMerge**(`entities`, `include`): `Promise`\<`any`[]\>

##### Parameters

• **entities**: `TEntity`[]

• **include**

##### Returns

`Promise`\<`any`[]\>

##### Source

node\_modules/lambdaorm-base/repository/application/repository.d.ts:21

#### bulkMerge(entities, include)

> **bulkMerge**(`entities`, `include`?): `Promise`\<`any`[]\>

##### Parameters

• **entities**: `TEntity`[]

• **include?**

##### Returns

`Promise`\<`any`[]\>

##### Source

node\_modules/lambdaorm-base/repository/application/repository.d.ts:22

***

### delete()

#### delete(entity)

> **delete**(`entity`): `Promise`\<`number`\>

##### Parameters

• **entity**: `TEntity`

##### Returns

`Promise`\<`number`\>

##### Source

node\_modules/lambdaorm-base/repository/application/repository.d.ts:23

#### delete(entity, include)

> **delete**(`entity`, `include`): `Promise`\<`number`\>

##### Parameters

• **entity**: `TEntity`

• **include**

##### Returns

`Promise`\<`number`\>

##### Source

node\_modules/lambdaorm-base/repository/application/repository.d.ts:24

#### delete(entity, include)

> **delete**(`entity`, `include`?): `Promise`\<`number`\>

##### Parameters

• **entity**: `TEntity`

• **include?**

##### Returns

`Promise`\<`number`\>

##### Source

node\_modules/lambdaorm-base/repository/application/repository.d.ts:25

***

### deleteAll()

> **deleteAll**(`data`, `filter`?, `include`?): `Promise`\<`number`\>

#### Parameters

• **data**: `any`

• **filter?**

• **include?**

#### Returns

`Promise`\<`number`\>

#### Source

node\_modules/lambdaorm-base/repository/application/repository.d.ts:29

***

### distinct()

> **distinct**(`data`, `filter`?, `include`?): `Promise`\<`any`[]\>

#### Parameters

• **data**: `any`

• **filter?**

• **include?**

#### Returns

`Promise`\<`any`[]\>

#### Source

node\_modules/lambdaorm-base/repository/application/repository.d.ts:31

***

### execute()

> **execute**(`query`, `data`?): `Promise`\<`any`\>

#### Parameters

• **query**: `string`

• **data?**: `any`

#### Returns

`Promise`\<`any`\>

#### Source

node\_modules/lambdaorm-base/repository/application/repository.d.ts:3

***

### first()

> **first**(`data`, `filter`?, `include`?): `Promise`\<`null` \| `TEntity`\>

#### Parameters

• **data**: `any`

• **filter?**

• **include?**

#### Returns

`Promise`\<`null` \| `TEntity`\>

#### Source

node\_modules/lambdaorm-base/repository/application/repository.d.ts:32

***

### insert()

#### insert(entity)

> **insert**(`entity`): `Promise`\<`any`\>

##### Parameters

• **entity**: `TEntity`

##### Returns

`Promise`\<`any`\>

##### Source

node\_modules/lambdaorm-base/repository/application/repository.d.ts:4

#### insert(entity, include)

> **insert**(`entity`, `include`): `Promise`\<`any`\>

##### Parameters

• **entity**: `TEntity`

• **include**

##### Returns

`Promise`\<`any`\>

##### Source

node\_modules/lambdaorm-base/repository/application/repository.d.ts:5

#### insert(entity, include)

> **insert**(`entity`, `include`?): `Promise`\<`any`\>

##### Parameters

• **entity**: `TEntity`

• **include?**

##### Returns

`Promise`\<`any`\>

##### Source

node\_modules/lambdaorm-base/repository/application/repository.d.ts:6

***

### last()

> **last**(`data`, `filter`?, `include`?): `Promise`\<`null` \| `TEntity`\>

#### Parameters

• **data**: `any`

• **filter?**

• **include?**

#### Returns

`Promise`\<`null` \| `TEntity`\>

#### Source

node\_modules/lambdaorm-base/repository/application/repository.d.ts:33

***

### list()

> **list**(`data`, `filter`?, `include`?): `Promise`\<`TEntity`[]\>

#### Parameters

• **data**: `any`

• **filter?**

• **include?**

#### Returns

`Promise`\<`TEntity`[]\>

#### Source

node\_modules/lambdaorm-base/repository/application/repository.d.ts:30

***

### merge()

#### merge(entity)

> **merge**(`entity`): `Promise`\<`number`\>

##### Parameters

• **entity**: `TEntity`

##### Returns

`Promise`\<`number`\>

##### Source

node\_modules/lambdaorm-base/repository/application/repository.d.ts:17

#### merge(entity, include)

> **merge**(`entity`, `include`): `Promise`\<`number`\>

##### Parameters

• **entity**: `TEntity`

• **include**

##### Returns

`Promise`\<`number`\>

##### Source

node\_modules/lambdaorm-base/repository/application/repository.d.ts:18

#### merge(entity, include)

> **merge**(`entity`, `include`?): `Promise`\<`number`\>

##### Parameters

• **entity**: `TEntity`

• **include?**

##### Returns

`Promise`\<`number`\>

##### Source

node\_modules/lambdaorm-base/repository/application/repository.d.ts:19

***

### query()

> **query**(): [`Queryable`](../classes/Queryable.md)\<`TQuery`\>

#### Returns

[`Queryable`](../classes/Queryable.md)\<`TQuery`\>

#### Source

node\_modules/lambdaorm-base/repository/application/repository.d.ts:34

***

### update()

#### update(entity)

> **update**(`entity`): `Promise`\<`number`\>

##### Parameters

• **entity**: `TEntity`

##### Returns

`Promise`\<`number`\>

##### Source

node\_modules/lambdaorm-base/repository/application/repository.d.ts:10

#### update(entity, include)

> **update**(`entity`, `include`): `Promise`\<`number`\>

##### Parameters

• **entity**: `TEntity`

• **include**

##### Returns

`Promise`\<`number`\>

##### Source

node\_modules/lambdaorm-base/repository/application/repository.d.ts:11

#### update(entity, include)

> **update**(`entity`, `include`?): `Promise`\<`number`\>

##### Parameters

• **entity**: `TEntity`

• **include?**

##### Returns

`Promise`\<`number`\>

##### Source

node\_modules/lambdaorm-base/repository/application/repository.d.ts:12

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

#### Source

node\_modules/lambdaorm-base/repository/application/repository.d.ts:16

***

### upsert()

#### upsert(entity)

> **upsert**(`entity`): `Promise`\<`number`\>

##### Parameters

• **entity**: `TEntity`

##### Returns

`Promise`\<`number`\>

##### Source

node\_modules/lambdaorm-base/repository/application/repository.d.ts:13

#### upsert(entity, include)

> **upsert**(`entity`, `include`): `Promise`\<`number`\>

##### Parameters

• **entity**: `TEntity`

• **include**

##### Returns

`Promise`\<`number`\>

##### Source

node\_modules/lambdaorm-base/repository/application/repository.d.ts:14

#### upsert(entity, include)

> **upsert**(`entity`, `include`?): `Promise`\<`number`\>

##### Parameters

• **entity**: `TEntity`

• **include?**

##### Returns

`Promise`\<`number`\>

##### Source

node\_modules/lambdaorm-base/repository/application/repository.d.ts:15
