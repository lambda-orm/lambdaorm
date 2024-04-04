[Lambda ORM](../README.md) / Repository

# Class: Repository\<TEntity, TQuery\>

## Type parameters

| Name |
| :------ |
| `TEntity` |
| `TQuery` |

## Implements

- [`IRepository`](../interfaces/IRepository.md)\<`TEntity`, `TQuery`\>

## Table of contents

### Constructors

- [constructor](Repository.md#constructor)

### Properties

- [name](Repository.md#name)
- [stage](Repository.md#stage)

### Methods

- [bulkInsert](Repository.md#bulkinsert)
- [bulkMerge](Repository.md#bulkmerge)
- [delete](Repository.md#delete)
- [deleteAll](Repository.md#deleteall)
- [distinct](Repository.md#distinct)
- [execute](Repository.md#execute)
- [first](Repository.md#first)
- [insert](Repository.md#insert)
- [last](Repository.md#last)
- [list](Repository.md#list)
- [merge](Repository.md#merge)
- [query](Repository.md#query)
- [update](Repository.md#update)
- [updateAll](Repository.md#updateall)

## Constructors

### constructor

• **new Repository**\<`TEntity`, `TQuery`\>(`name`, `stage?`, `orm?`): [`Repository`](Repository.md)\<`TEntity`, `TQuery`\>

#### Type parameters

| Name |
| :------ |
| `TEntity` |
| `TQuery` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `stage?` | `string` | `undefined` |
| `orm` | [`IOrm`](../interfaces/IOrm.md) | `_orm` |

#### Returns

[`Repository`](Repository.md)\<`TEntity`, `TQuery`\>

#### Defined in

[src/lib/repository/infrastructure/repository.ts:9](https://github.com/lambda-orm/lambdaorm/blob/b927db0b/src/lib/repository/infrastructure/repository.ts#L9)

## Properties

### name

• `Readonly` **name**: `string`

#### Defined in

[src/lib/repository/infrastructure/repository.ts:9](https://github.com/lambda-orm/lambdaorm/blob/b927db0b/src/lib/repository/infrastructure/repository.ts#L9)

___

### stage

• `Optional` **stage**: `string`

#### Defined in

[src/lib/repository/infrastructure/repository.ts:9](https://github.com/lambda-orm/lambdaorm/blob/b927db0b/src/lib/repository/infrastructure/repository.ts#L9)

## Methods

### bulkInsert

▸ **bulkInsert**(`entities`): `Promise`\<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entities` | `TEntity`[] |

#### Returns

`Promise`\<`any`[]\>

#### Implementation of

[IRepository](../interfaces/IRepository.md).[bulkInsert](../interfaces/IRepository.md#bulkinsert)

#### Defined in

[src/lib/repository/infrastructure/repository.ts:47](https://github.com/lambda-orm/lambdaorm/blob/b927db0b/src/lib/repository/infrastructure/repository.ts#L47)

▸ **bulkInsert**(`entities`, `include`): `Promise`\<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entities` | `TEntity`[] |
| `include` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`\<`any`[]\>

#### Implementation of

[IRepository](../interfaces/IRepository.md).[bulkInsert](../interfaces/IRepository.md#bulkinsert)

#### Defined in

[src/lib/repository/infrastructure/repository.ts:49](https://github.com/lambda-orm/lambdaorm/blob/b927db0b/src/lib/repository/infrastructure/repository.ts#L49)

___

### bulkMerge

▸ **bulkMerge**(`entities`): `Promise`\<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entities` | `TEntity`[] |

#### Returns

`Promise`\<`any`[]\>

#### Implementation of

[IRepository](../interfaces/IRepository.md).[bulkMerge](../interfaces/IRepository.md#bulkmerge)

#### Defined in

[src/lib/repository/infrastructure/repository.ts:10](https://github.com/lambda-orm/lambdaorm/blob/b927db0b/src/lib/repository/infrastructure/repository.ts#L10)

▸ **bulkMerge**(`entities`, `include`): `Promise`\<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entities` | `TEntity`[] |
| `include` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`\<`any`[]\>

#### Implementation of

[IRepository](../interfaces/IRepository.md).[bulkMerge](../interfaces/IRepository.md#bulkmerge)

#### Defined in

[src/lib/repository/infrastructure/repository.ts:11](https://github.com/lambda-orm/lambdaorm/blob/b927db0b/src/lib/repository/infrastructure/repository.ts#L11)

▸ **bulkMerge**(`entities`, `include?`): `Promise`\<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entities` | `TEntity`[] |
| `include?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`\<`any`[]\>

#### Implementation of

[IRepository](../interfaces/IRepository.md).[bulkMerge](../interfaces/IRepository.md#bulkmerge)

#### Defined in

[src/lib/repository/infrastructure/repository.ts:12](https://github.com/lambda-orm/lambdaorm/blob/b927db0b/src/lib/repository/infrastructure/repository.ts#L12)

___

### delete

▸ **delete**(`entity`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |

#### Returns

`Promise`\<`number`\>

#### Implementation of

[IRepository](../interfaces/IRepository.md).[delete](../interfaces/IRepository.md#delete)

#### Defined in

[src/lib/repository/infrastructure/repository.ts:79](https://github.com/lambda-orm/lambdaorm/blob/b927db0b/src/lib/repository/infrastructure/repository.ts#L79)

▸ **delete**(`entity`, `include`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `include` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`\<`number`\>

#### Implementation of

[IRepository](../interfaces/IRepository.md).[delete](../interfaces/IRepository.md#delete)

#### Defined in

[src/lib/repository/infrastructure/repository.ts:81](https://github.com/lambda-orm/lambdaorm/blob/b927db0b/src/lib/repository/infrastructure/repository.ts#L81)

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

#### Implementation of

[IRepository](../interfaces/IRepository.md).[deleteAll](../interfaces/IRepository.md#deleteall)

#### Defined in

[src/lib/repository/infrastructure/repository.ts:86](https://github.com/lambda-orm/lambdaorm/blob/b927db0b/src/lib/repository/infrastructure/repository.ts#L86)

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

#### Implementation of

[IRepository](../interfaces/IRepository.md).[distinct](../interfaces/IRepository.md#distinct)

#### Defined in

[src/lib/repository/infrastructure/repository.ts:100](https://github.com/lambda-orm/lambdaorm/blob/b927db0b/src/lib/repository/infrastructure/repository.ts#L100)

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

#### Implementation of

[IRepository](../interfaces/IRepository.md).[execute](../interfaces/IRepository.md#execute)

#### Defined in

[src/lib/repository/infrastructure/repository.ts:34](https://github.com/lambda-orm/lambdaorm/blob/b927db0b/src/lib/repository/infrastructure/repository.ts#L34)

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

#### Implementation of

[IRepository](../interfaces/IRepository.md).[first](../interfaces/IRepository.md#first)

#### Defined in

[src/lib/repository/infrastructure/repository.ts:107](https://github.com/lambda-orm/lambdaorm/blob/b927db0b/src/lib/repository/infrastructure/repository.ts#L107)

___

### insert

▸ **insert**(`entity`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |

#### Returns

`Promise`\<`any`\>

#### Implementation of

[IRepository](../interfaces/IRepository.md).[insert](../interfaces/IRepository.md#insert)

#### Defined in

[src/lib/repository/infrastructure/repository.ts:39](https://github.com/lambda-orm/lambdaorm/blob/b927db0b/src/lib/repository/infrastructure/repository.ts#L39)

▸ **insert**(`entity`, `include`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `include` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`\<`any`\>

#### Implementation of

[IRepository](../interfaces/IRepository.md).[insert](../interfaces/IRepository.md#insert)

#### Defined in

[src/lib/repository/infrastructure/repository.ts:41](https://github.com/lambda-orm/lambdaorm/blob/b927db0b/src/lib/repository/infrastructure/repository.ts#L41)

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

#### Implementation of

[IRepository](../interfaces/IRepository.md).[last](../interfaces/IRepository.md#last)

#### Defined in

[src/lib/repository/infrastructure/repository.ts:119](https://github.com/lambda-orm/lambdaorm/blob/b927db0b/src/lib/repository/infrastructure/repository.ts#L119)

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

#### Implementation of

[IRepository](../interfaces/IRepository.md).[list](../interfaces/IRepository.md#list)

#### Defined in

[src/lib/repository/infrastructure/repository.ts:93](https://github.com/lambda-orm/lambdaorm/blob/b927db0b/src/lib/repository/infrastructure/repository.ts#L93)

___

### merge

▸ **merge**(`entity`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |

#### Returns

`Promise`\<`number`\>

#### Implementation of

[IRepository](../interfaces/IRepository.md).[merge](../interfaces/IRepository.md#merge)

#### Defined in

[src/lib/repository/infrastructure/repository.ts:71](https://github.com/lambda-orm/lambdaorm/blob/b927db0b/src/lib/repository/infrastructure/repository.ts#L71)

▸ **merge**(`entity`, `include`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `include` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`\<`number`\>

#### Implementation of

[IRepository](../interfaces/IRepository.md).[merge](../interfaces/IRepository.md#merge)

#### Defined in

[src/lib/repository/infrastructure/repository.ts:73](https://github.com/lambda-orm/lambdaorm/blob/b927db0b/src/lib/repository/infrastructure/repository.ts#L73)

___

### query

▸ **query**(): [`Queryable`](Queryable.md)\<`TQuery`\>

#### Returns

[`Queryable`](Queryable.md)\<`TQuery`\>

#### Implementation of

[IRepository](../interfaces/IRepository.md).[query](../interfaces/IRepository.md#query)

#### Defined in

[src/lib/repository/infrastructure/repository.ts:131](https://github.com/lambda-orm/lambdaorm/blob/b927db0b/src/lib/repository/infrastructure/repository.ts#L131)

___

### update

▸ **update**(`entity`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |

#### Returns

`Promise`\<`number`\>

#### Implementation of

[IRepository](../interfaces/IRepository.md).[update](../interfaces/IRepository.md#update)

#### Defined in

[src/lib/repository/infrastructure/repository.ts:55](https://github.com/lambda-orm/lambdaorm/blob/b927db0b/src/lib/repository/infrastructure/repository.ts#L55)

▸ **update**(`entity`, `include`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `include` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`\<`number`\>

#### Implementation of

[IRepository](../interfaces/IRepository.md).[update](../interfaces/IRepository.md#update)

#### Defined in

[src/lib/repository/infrastructure/repository.ts:57](https://github.com/lambda-orm/lambdaorm/blob/b927db0b/src/lib/repository/infrastructure/repository.ts#L57)

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

#### Implementation of

[IRepository](../interfaces/IRepository.md).[updateAll](../interfaces/IRepository.md#updateall)

#### Defined in

[src/lib/repository/infrastructure/repository.ts:62](https://github.com/lambda-orm/lambdaorm/blob/b927db0b/src/lib/repository/infrastructure/repository.ts#L62)
