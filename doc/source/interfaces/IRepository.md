[Lambda ORM](../README.md) / IRepository

# Interface: IRepository\<TEntity, TQuery\>

## Type parameters

| Name |
| :------ |
| `TEntity` |
| `TQuery` |

## Implemented by

- [`Repository`](../classes/Repository.md)

## Table of contents

### Methods

- [bulkInsert](IRepository.md#bulkinsert)
- [bulkMerge](IRepository.md#bulkmerge)
- [delete](IRepository.md#delete)
- [deleteAll](IRepository.md#deleteall)
- [distinct](IRepository.md#distinct)
- [execute](IRepository.md#execute)
- [first](IRepository.md#first)
- [insert](IRepository.md#insert)
- [last](IRepository.md#last)
- [list](IRepository.md#list)
- [merge](IRepository.md#merge)
- [query](IRepository.md#query)
- [update](IRepository.md#update)
- [updateAll](IRepository.md#updateall)

## Methods

### bulkInsert

▸ **bulkInsert**(`entities`): `Promise`\<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entities` | `TEntity`[] |

#### Returns

`Promise`\<`any`[]\>

#### Defined in

node_modules/lambdaorm-base/repository/application/repository.d.ts:7

▸ **bulkInsert**(`entities`, `include`): `Promise`\<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entities` | `TEntity`[] |
| `include` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`\<`any`[]\>

#### Defined in

node_modules/lambdaorm-base/repository/application/repository.d.ts:8

▸ **bulkInsert**(`entities`, `include?`): `Promise`\<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entities` | `TEntity`[] |
| `include?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`\<`any`[]\>

#### Defined in

node_modules/lambdaorm-base/repository/application/repository.d.ts:9

___

### bulkMerge

▸ **bulkMerge**(`entities`): `Promise`\<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entities` | `TEntity`[] |

#### Returns

`Promise`\<`any`[]\>

#### Defined in

node_modules/lambdaorm-base/repository/application/repository.d.ts:17

▸ **bulkMerge**(`entities`, `include`): `Promise`\<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entities` | `TEntity`[] |
| `include` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`\<`any`[]\>

#### Defined in

node_modules/lambdaorm-base/repository/application/repository.d.ts:18

▸ **bulkMerge**(`entities`, `include?`): `Promise`\<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entities` | `TEntity`[] |
| `include?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`\<`any`[]\>

#### Defined in

node_modules/lambdaorm-base/repository/application/repository.d.ts:19

___

### delete

▸ **delete**(`entity`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |

#### Returns

`Promise`\<`number`\>

#### Defined in

node_modules/lambdaorm-base/repository/application/repository.d.ts:20

▸ **delete**(`entity`, `include`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `include` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`\<`number`\>

#### Defined in

node_modules/lambdaorm-base/repository/application/repository.d.ts:21

▸ **delete**(`entity`, `include?`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `include?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`\<`number`\>

#### Defined in

node_modules/lambdaorm-base/repository/application/repository.d.ts:22

___

### deleteAll

▸ **deleteAll**(`data`, `filter?`, `include?`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `filter?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |
| `include?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`\<`number`\>

#### Defined in

node_modules/lambdaorm-base/repository/application/repository.d.ts:23

___

### distinct

▸ **distinct**(`data`, `filter?`, `include?`): `Promise`\<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `filter?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |
| `include?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`\<`any`[]\>

#### Defined in

node_modules/lambdaorm-base/repository/application/repository.d.ts:25

___

### execute

▸ **execute**(`expression`, `data?`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `data?` | `any` |

#### Returns

`Promise`\<`any`\>

#### Defined in

node_modules/lambdaorm-base/repository/application/repository.d.ts:3

___

### first

▸ **first**(`data`, `filter?`, `include?`): `Promise`\<``null`` \| `TEntity`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `filter?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |
| `include?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`\<``null`` \| `TEntity`\>

#### Defined in

node_modules/lambdaorm-base/repository/application/repository.d.ts:26

___

### insert

▸ **insert**(`entity`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |

#### Returns

`Promise`\<`any`\>

#### Defined in

node_modules/lambdaorm-base/repository/application/repository.d.ts:4

▸ **insert**(`entity`, `include`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `include` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`\<`any`\>

#### Defined in

node_modules/lambdaorm-base/repository/application/repository.d.ts:5

▸ **insert**(`entity`, `include?`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `include?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`\<`any`\>

#### Defined in

node_modules/lambdaorm-base/repository/application/repository.d.ts:6

___

### last

▸ **last**(`data`, `filter?`, `include?`): `Promise`\<``null`` \| `TEntity`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `filter?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |
| `include?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`\<``null`` \| `TEntity`\>

#### Defined in

node_modules/lambdaorm-base/repository/application/repository.d.ts:27

___

### list

▸ **list**(`data`, `filter?`, `include?`): `Promise`\<`TEntity`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `filter?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |
| `include?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`\<`TEntity`[]\>

#### Defined in

node_modules/lambdaorm-base/repository/application/repository.d.ts:24

___

### merge

▸ **merge**(`entity`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |

#### Returns

`Promise`\<`number`\>

#### Defined in

node_modules/lambdaorm-base/repository/application/repository.d.ts:14

▸ **merge**(`entity`, `include`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `include` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`\<`number`\>

#### Defined in

node_modules/lambdaorm-base/repository/application/repository.d.ts:15

▸ **merge**(`entity`, `include?`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `include?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`\<`number`\>

#### Defined in

node_modules/lambdaorm-base/repository/application/repository.d.ts:16

___

### query

▸ **query**(): [`Queryable`](../classes/Queryable.md)\<`TQuery`\>

#### Returns

[`Queryable`](../classes/Queryable.md)\<`TQuery`\>

#### Defined in

node_modules/lambdaorm-base/repository/application/repository.d.ts:28

___

### update

▸ **update**(`entity`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |

#### Returns

`Promise`\<`number`\>

#### Defined in

node_modules/lambdaorm-base/repository/application/repository.d.ts:10

▸ **update**(`entity`, `include`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `include` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`\<`number`\>

#### Defined in

node_modules/lambdaorm-base/repository/application/repository.d.ts:11

▸ **update**(`entity`, `include?`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `include?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`\<`number`\>

#### Defined in

node_modules/lambdaorm-base/repository/application/repository.d.ts:12

___

### updateAll

▸ **updateAll**(`data`, `map`, `filter?`, `include?`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `map` | (`value`: `TEntity`) => `unknown` |
| `filter?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |
| `include?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`\<`number`\>

#### Defined in

node_modules/lambdaorm-base/repository/application/repository.d.ts:13
