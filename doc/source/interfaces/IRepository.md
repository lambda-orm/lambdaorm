[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / IRepository

# Interface: IRepository\<TEntity, TQuery\>

Defined in: node\_modules/lambdaorm-base/repository/application/repository.d.ts:2

## Type Parameters

### TEntity

`TEntity`

### TQuery

`TQuery`

## Methods

### bulkDelete()

#### Call Signature

> **bulkDelete**(`entities`): `Promise`\<`any`[]\>

Defined in: node\_modules/lambdaorm-base/repository/application/repository.d.ts:26

##### Parameters

###### entities

`TEntity`[]

##### Returns

`Promise`\<`any`[]\>

#### Call Signature

> **bulkDelete**(`entities`, `include`): `Promise`\<`any`[]\>

Defined in: node\_modules/lambdaorm-base/repository/application/repository.d.ts:27

##### Parameters

###### entities

`TEntity`[]

###### include

(`value`, `index`, `array`) => `unknown`

##### Returns

`Promise`\<`any`[]\>

#### Call Signature

> **bulkDelete**(`entities`, `include?`): `Promise`\<`any`[]\>

Defined in: node\_modules/lambdaorm-base/repository/application/repository.d.ts:28

##### Parameters

###### entities

`TEntity`[]

###### include?

(`value`, `index`, `array`) => `unknown`

##### Returns

`Promise`\<`any`[]\>

***

### bulkInsert()

#### Call Signature

> **bulkInsert**(`entities`): `Promise`\<`any`[]\>

Defined in: node\_modules/lambdaorm-base/repository/application/repository.d.ts:7

##### Parameters

###### entities

`TEntity`[]

##### Returns

`Promise`\<`any`[]\>

#### Call Signature

> **bulkInsert**(`entities`, `include`): `Promise`\<`any`[]\>

Defined in: node\_modules/lambdaorm-base/repository/application/repository.d.ts:8

##### Parameters

###### entities

`TEntity`[]

###### include

(`value`, `index`, `array`) => `unknown`

##### Returns

`Promise`\<`any`[]\>

#### Call Signature

> **bulkInsert**(`entities`, `include?`): `Promise`\<`any`[]\>

Defined in: node\_modules/lambdaorm-base/repository/application/repository.d.ts:9

##### Parameters

###### entities

`TEntity`[]

###### include?

(`value`, `index`, `array`) => `unknown`

##### Returns

`Promise`\<`any`[]\>

***

### bulkMerge()

#### Call Signature

> **bulkMerge**(`entities`): `Promise`\<`any`[]\>

Defined in: node\_modules/lambdaorm-base/repository/application/repository.d.ts:20

##### Parameters

###### entities

`TEntity`[]

##### Returns

`Promise`\<`any`[]\>

#### Call Signature

> **bulkMerge**(`entities`, `include`): `Promise`\<`any`[]\>

Defined in: node\_modules/lambdaorm-base/repository/application/repository.d.ts:21

##### Parameters

###### entities

`TEntity`[]

###### include

(`value`, `index`, `array`) => `unknown`

##### Returns

`Promise`\<`any`[]\>

#### Call Signature

> **bulkMerge**(`entities`, `include?`): `Promise`\<`any`[]\>

Defined in: node\_modules/lambdaorm-base/repository/application/repository.d.ts:22

##### Parameters

###### entities

`TEntity`[]

###### include?

(`value`, `index`, `array`) => `unknown`

##### Returns

`Promise`\<`any`[]\>

***

### delete()

#### Call Signature

> **delete**(`entity`): `Promise`\<`number`\>

Defined in: node\_modules/lambdaorm-base/repository/application/repository.d.ts:23

##### Parameters

###### entity

`TEntity`

##### Returns

`Promise`\<`number`\>

#### Call Signature

> **delete**(`entity`, `include`): `Promise`\<`number`\>

Defined in: node\_modules/lambdaorm-base/repository/application/repository.d.ts:24

##### Parameters

###### entity

`TEntity`

###### include

(`value`, `index`, `array`) => `unknown`

##### Returns

`Promise`\<`number`\>

#### Call Signature

> **delete**(`entity`, `include?`): `Promise`\<`number`\>

Defined in: node\_modules/lambdaorm-base/repository/application/repository.d.ts:25

##### Parameters

###### entity

`TEntity`

###### include?

(`value`, `index`, `array`) => `unknown`

##### Returns

`Promise`\<`number`\>

***

### deleteAll()

> **deleteAll**(`data`, `filter?`, `include?`): `Promise`\<`number`\>

Defined in: node\_modules/lambdaorm-base/repository/application/repository.d.ts:29

#### Parameters

##### data

`any`

##### filter?

(`value`, `index`, `array`) => `unknown`

##### include?

(`value`, `index`, `array`) => `unknown`

#### Returns

`Promise`\<`number`\>

***

### distinct()

> **distinct**(`data`, `filter?`, `include?`): `Promise`\<`any`[]\>

Defined in: node\_modules/lambdaorm-base/repository/application/repository.d.ts:31

#### Parameters

##### data

`any`

##### filter?

(`value`, `index`, `array`) => `unknown`

##### include?

(`value`, `index`, `array`) => `unknown`

#### Returns

`Promise`\<`any`[]\>

***

### execute()

> **execute**(`query`, `data?`): `Promise`\<`any`\>

Defined in: node\_modules/lambdaorm-base/repository/application/repository.d.ts:3

#### Parameters

##### query

`string`

##### data?

`any`

#### Returns

`Promise`\<`any`\>

***

### first()

> **first**(`data`, `filter?`, `include?`): `Promise`\<`null` \| `TEntity`\>

Defined in: node\_modules/lambdaorm-base/repository/application/repository.d.ts:32

#### Parameters

##### data

`any`

##### filter?

(`value`, `index`, `array`) => `unknown`

##### include?

(`value`, `index`, `array`) => `unknown`

#### Returns

`Promise`\<`null` \| `TEntity`\>

***

### insert()

#### Call Signature

> **insert**(`entity`): `Promise`\<`any`\>

Defined in: node\_modules/lambdaorm-base/repository/application/repository.d.ts:4

##### Parameters

###### entity

`TEntity`

##### Returns

`Promise`\<`any`\>

#### Call Signature

> **insert**(`entity`, `include`): `Promise`\<`any`\>

Defined in: node\_modules/lambdaorm-base/repository/application/repository.d.ts:5

##### Parameters

###### entity

`TEntity`

###### include

(`value`, `index`, `array`) => `unknown`

##### Returns

`Promise`\<`any`\>

#### Call Signature

> **insert**(`entity`, `include?`): `Promise`\<`any`\>

Defined in: node\_modules/lambdaorm-base/repository/application/repository.d.ts:6

##### Parameters

###### entity

`TEntity`

###### include?

(`value`, `index`, `array`) => `unknown`

##### Returns

`Promise`\<`any`\>

***

### last()

> **last**(`data`, `filter?`, `include?`): `Promise`\<`null` \| `TEntity`\>

Defined in: node\_modules/lambdaorm-base/repository/application/repository.d.ts:33

#### Parameters

##### data

`any`

##### filter?

(`value`, `index`, `array`) => `unknown`

##### include?

(`value`, `index`, `array`) => `unknown`

#### Returns

`Promise`\<`null` \| `TEntity`\>

***

### list()

> **list**(`data`, `filter?`, `include?`): `Promise`\<`TEntity`[]\>

Defined in: node\_modules/lambdaorm-base/repository/application/repository.d.ts:30

#### Parameters

##### data

`any`

##### filter?

(`value`, `index`, `array`) => `unknown`

##### include?

(`value`, `index`, `array`) => `unknown`

#### Returns

`Promise`\<`TEntity`[]\>

***

### merge()

#### Call Signature

> **merge**(`entity`): `Promise`\<`number`\>

Defined in: node\_modules/lambdaorm-base/repository/application/repository.d.ts:17

##### Parameters

###### entity

`TEntity`

##### Returns

`Promise`\<`number`\>

#### Call Signature

> **merge**(`entity`, `include`): `Promise`\<`number`\>

Defined in: node\_modules/lambdaorm-base/repository/application/repository.d.ts:18

##### Parameters

###### entity

`TEntity`

###### include

(`value`, `index`, `array`) => `unknown`

##### Returns

`Promise`\<`number`\>

#### Call Signature

> **merge**(`entity`, `include?`): `Promise`\<`number`\>

Defined in: node\_modules/lambdaorm-base/repository/application/repository.d.ts:19

##### Parameters

###### entity

`TEntity`

###### include?

(`value`, `index`, `array`) => `unknown`

##### Returns

`Promise`\<`number`\>

***

### query()

> **query**(): [`Queryable`](../classes/Queryable.md)\<`TQuery`\>

Defined in: node\_modules/lambdaorm-base/repository/application/repository.d.ts:34

#### Returns

[`Queryable`](../classes/Queryable.md)\<`TQuery`\>

***

### update()

#### Call Signature

> **update**(`entity`): `Promise`\<`number`\>

Defined in: node\_modules/lambdaorm-base/repository/application/repository.d.ts:10

##### Parameters

###### entity

`TEntity`

##### Returns

`Promise`\<`number`\>

#### Call Signature

> **update**(`entity`, `include`): `Promise`\<`number`\>

Defined in: node\_modules/lambdaorm-base/repository/application/repository.d.ts:11

##### Parameters

###### entity

`TEntity`

###### include

(`value`, `index`, `array`) => `unknown`

##### Returns

`Promise`\<`number`\>

#### Call Signature

> **update**(`entity`, `include?`): `Promise`\<`number`\>

Defined in: node\_modules/lambdaorm-base/repository/application/repository.d.ts:12

##### Parameters

###### entity

`TEntity`

###### include?

(`value`, `index`, `array`) => `unknown`

##### Returns

`Promise`\<`number`\>

***

### updateAll()

> **updateAll**(`data`, `map`, `filter?`, `include?`): `Promise`\<`number`\>

Defined in: node\_modules/lambdaorm-base/repository/application/repository.d.ts:16

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

***

### upsert()

#### Call Signature

> **upsert**(`entity`): `Promise`\<`number`\>

Defined in: node\_modules/lambdaorm-base/repository/application/repository.d.ts:13

##### Parameters

###### entity

`TEntity`

##### Returns

`Promise`\<`number`\>

#### Call Signature

> **upsert**(`entity`, `include`): `Promise`\<`number`\>

Defined in: node\_modules/lambdaorm-base/repository/application/repository.d.ts:14

##### Parameters

###### entity

`TEntity`

###### include

(`value`, `index`, `array`) => `unknown`

##### Returns

`Promise`\<`number`\>

#### Call Signature

> **upsert**(`entity`, `include?`): `Promise`\<`number`\>

Defined in: node\_modules/lambdaorm-base/repository/application/repository.d.ts:15

##### Parameters

###### entity

`TEntity`

###### include?

(`value`, `index`, `array`) => `unknown`

##### Returns

`Promise`\<`number`\>
