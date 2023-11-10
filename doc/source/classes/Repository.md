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

[src/lib/repository/infrastructure/repository.ts:10](https://github.com/FlavioLionelRita/lambdaorm/blob/f496198b/src/lib/repository/infrastructure/repository.ts#L10)

## Properties

### name

• `Readonly` **name**: `string`

#### Defined in

[src/lib/repository/infrastructure/repository.ts:10](https://github.com/FlavioLionelRita/lambdaorm/blob/f496198b/src/lib/repository/infrastructure/repository.ts#L10)

___

### stage

• `Optional` **stage**: `string`

#### Defined in

[src/lib/repository/infrastructure/repository.ts:10](https://github.com/FlavioLionelRita/lambdaorm/blob/f496198b/src/lib/repository/infrastructure/repository.ts#L10)

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

[src/lib/repository/infrastructure/repository.ts:41](https://github.com/FlavioLionelRita/lambdaorm/blob/f496198b/src/lib/repository/infrastructure/repository.ts#L41)

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

[src/lib/repository/infrastructure/repository.ts:43](https://github.com/FlavioLionelRita/lambdaorm/blob/f496198b/src/lib/repository/infrastructure/repository.ts#L43)

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

[src/lib/repository/infrastructure/repository.ts:73](https://github.com/FlavioLionelRita/lambdaorm/blob/f496198b/src/lib/repository/infrastructure/repository.ts#L73)

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

[src/lib/repository/infrastructure/repository.ts:75](https://github.com/FlavioLionelRita/lambdaorm/blob/f496198b/src/lib/repository/infrastructure/repository.ts#L75)

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

[src/lib/repository/infrastructure/repository.ts:80](https://github.com/FlavioLionelRita/lambdaorm/blob/f496198b/src/lib/repository/infrastructure/repository.ts#L80)

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

[src/lib/repository/infrastructure/repository.ts:94](https://github.com/FlavioLionelRita/lambdaorm/blob/f496198b/src/lib/repository/infrastructure/repository.ts#L94)

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

[src/lib/repository/infrastructure/repository.ts:28](https://github.com/FlavioLionelRita/lambdaorm/blob/f496198b/src/lib/repository/infrastructure/repository.ts#L28)

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

[src/lib/repository/infrastructure/repository.ts:101](https://github.com/FlavioLionelRita/lambdaorm/blob/f496198b/src/lib/repository/infrastructure/repository.ts#L101)

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

[src/lib/repository/infrastructure/repository.ts:33](https://github.com/FlavioLionelRita/lambdaorm/blob/f496198b/src/lib/repository/infrastructure/repository.ts#L33)

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

[src/lib/repository/infrastructure/repository.ts:35](https://github.com/FlavioLionelRita/lambdaorm/blob/f496198b/src/lib/repository/infrastructure/repository.ts#L35)

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

[src/lib/repository/infrastructure/repository.ts:113](https://github.com/FlavioLionelRita/lambdaorm/blob/f496198b/src/lib/repository/infrastructure/repository.ts#L113)

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

[src/lib/repository/infrastructure/repository.ts:87](https://github.com/FlavioLionelRita/lambdaorm/blob/f496198b/src/lib/repository/infrastructure/repository.ts#L87)

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

[src/lib/repository/infrastructure/repository.ts:65](https://github.com/FlavioLionelRita/lambdaorm/blob/f496198b/src/lib/repository/infrastructure/repository.ts#L65)

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

[src/lib/repository/infrastructure/repository.ts:67](https://github.com/FlavioLionelRita/lambdaorm/blob/f496198b/src/lib/repository/infrastructure/repository.ts#L67)

___

### query

▸ **query**(): [`Queryable`](Queryable.md)\<`TQuery`\>

#### Returns

[`Queryable`](Queryable.md)\<`TQuery`\>

#### Implementation of

[IRepository](../interfaces/IRepository.md).[query](../interfaces/IRepository.md#query)

#### Defined in

[src/lib/repository/infrastructure/repository.ts:125](https://github.com/FlavioLionelRita/lambdaorm/blob/f496198b/src/lib/repository/infrastructure/repository.ts#L125)

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

[src/lib/repository/infrastructure/repository.ts:49](https://github.com/FlavioLionelRita/lambdaorm/blob/f496198b/src/lib/repository/infrastructure/repository.ts#L49)

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

[src/lib/repository/infrastructure/repository.ts:51](https://github.com/FlavioLionelRita/lambdaorm/blob/f496198b/src/lib/repository/infrastructure/repository.ts#L51)

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

[src/lib/repository/infrastructure/repository.ts:56](https://github.com/FlavioLionelRita/lambdaorm/blob/f496198b/src/lib/repository/infrastructure/repository.ts#L56)
