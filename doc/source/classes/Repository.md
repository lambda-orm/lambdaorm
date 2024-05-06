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

- [bulkDelete](Repository.md#bulkdelete)
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
- [upsert](Repository.md#upsert)

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

[src/lib/repository/infrastructure/repository.ts:10](https://github.com/lambda-orm/lambdaorm/blob/efd15f74cf775a1cca0ba4f4c4fabcb10e923ec0/src/lib/repository/infrastructure/repository.ts#L10)

## Properties

### name

• `Readonly` **name**: `string`

#### Defined in

[src/lib/repository/infrastructure/repository.ts:10](https://github.com/lambda-orm/lambdaorm/blob/efd15f74cf775a1cca0ba4f4c4fabcb10e923ec0/src/lib/repository/infrastructure/repository.ts#L10)

___

### stage

• `Optional` **stage**: `string`

#### Defined in

[src/lib/repository/infrastructure/repository.ts:10](https://github.com/lambda-orm/lambdaorm/blob/efd15f74cf775a1cca0ba4f4c4fabcb10e923ec0/src/lib/repository/infrastructure/repository.ts#L10)

## Methods

### bulkDelete

▸ **bulkDelete**(`entities`): `Promise`\<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entities` | `TEntity`[] |

#### Returns

`Promise`\<`any`[]\>

#### Implementation of

[IRepository](../interfaces/IRepository.md).[bulkDelete](../interfaces/IRepository.md#bulkdelete)

#### Defined in

[src/lib/repository/infrastructure/repository.ts:17](https://github.com/lambda-orm/lambdaorm/blob/efd15f74cf775a1cca0ba4f4c4fabcb10e923ec0/src/lib/repository/infrastructure/repository.ts#L17)

▸ **bulkDelete**(`entities`, `include`): `Promise`\<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entities` | `TEntity`[] |
| `include` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`\<`any`[]\>

#### Implementation of

[IRepository](../interfaces/IRepository.md).[bulkDelete](../interfaces/IRepository.md#bulkdelete)

#### Defined in

[src/lib/repository/infrastructure/repository.ts:18](https://github.com/lambda-orm/lambdaorm/blob/efd15f74cf775a1cca0ba4f4c4fabcb10e923ec0/src/lib/repository/infrastructure/repository.ts#L18)

___

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

[src/lib/repository/infrastructure/repository.ts:58](https://github.com/lambda-orm/lambdaorm/blob/efd15f74cf775a1cca0ba4f4c4fabcb10e923ec0/src/lib/repository/infrastructure/repository.ts#L58)

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

[src/lib/repository/infrastructure/repository.ts:60](https://github.com/lambda-orm/lambdaorm/blob/efd15f74cf775a1cca0ba4f4c4fabcb10e923ec0/src/lib/repository/infrastructure/repository.ts#L60)

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

[src/lib/repository/infrastructure/repository.ts:23](https://github.com/lambda-orm/lambdaorm/blob/efd15f74cf775a1cca0ba4f4c4fabcb10e923ec0/src/lib/repository/infrastructure/repository.ts#L23)

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

[src/lib/repository/infrastructure/repository.ts:24](https://github.com/lambda-orm/lambdaorm/blob/efd15f74cf775a1cca0ba4f4c4fabcb10e923ec0/src/lib/repository/infrastructure/repository.ts#L24)

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

[src/lib/repository/infrastructure/repository.ts:90](https://github.com/lambda-orm/lambdaorm/blob/efd15f74cf775a1cca0ba4f4c4fabcb10e923ec0/src/lib/repository/infrastructure/repository.ts#L90)

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

[src/lib/repository/infrastructure/repository.ts:92](https://github.com/lambda-orm/lambdaorm/blob/efd15f74cf775a1cca0ba4f4c4fabcb10e923ec0/src/lib/repository/infrastructure/repository.ts#L92)

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

[src/lib/repository/infrastructure/repository.ts:97](https://github.com/lambda-orm/lambdaorm/blob/efd15f74cf775a1cca0ba4f4c4fabcb10e923ec0/src/lib/repository/infrastructure/repository.ts#L97)

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

[src/lib/repository/infrastructure/repository.ts:111](https://github.com/lambda-orm/lambdaorm/blob/efd15f74cf775a1cca0ba4f4c4fabcb10e923ec0/src/lib/repository/infrastructure/repository.ts#L111)

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

[src/lib/repository/infrastructure/repository.ts:45](https://github.com/lambda-orm/lambdaorm/blob/efd15f74cf775a1cca0ba4f4c4fabcb10e923ec0/src/lib/repository/infrastructure/repository.ts#L45)

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

[src/lib/repository/infrastructure/repository.ts:118](https://github.com/lambda-orm/lambdaorm/blob/efd15f74cf775a1cca0ba4f4c4fabcb10e923ec0/src/lib/repository/infrastructure/repository.ts#L118)

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

[src/lib/repository/infrastructure/repository.ts:50](https://github.com/lambda-orm/lambdaorm/blob/efd15f74cf775a1cca0ba4f4c4fabcb10e923ec0/src/lib/repository/infrastructure/repository.ts#L50)

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

[src/lib/repository/infrastructure/repository.ts:52](https://github.com/lambda-orm/lambdaorm/blob/efd15f74cf775a1cca0ba4f4c4fabcb10e923ec0/src/lib/repository/infrastructure/repository.ts#L52)

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

[src/lib/repository/infrastructure/repository.ts:130](https://github.com/lambda-orm/lambdaorm/blob/efd15f74cf775a1cca0ba4f4c4fabcb10e923ec0/src/lib/repository/infrastructure/repository.ts#L130)

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

[src/lib/repository/infrastructure/repository.ts:104](https://github.com/lambda-orm/lambdaorm/blob/efd15f74cf775a1cca0ba4f4c4fabcb10e923ec0/src/lib/repository/infrastructure/repository.ts#L104)

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

[src/lib/repository/infrastructure/repository.ts:82](https://github.com/lambda-orm/lambdaorm/blob/efd15f74cf775a1cca0ba4f4c4fabcb10e923ec0/src/lib/repository/infrastructure/repository.ts#L82)

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

[src/lib/repository/infrastructure/repository.ts:84](https://github.com/lambda-orm/lambdaorm/blob/efd15f74cf775a1cca0ba4f4c4fabcb10e923ec0/src/lib/repository/infrastructure/repository.ts#L84)

___

### query

▸ **query**(): [`Queryable`](Queryable.md)\<`TQuery`\>

#### Returns

[`Queryable`](Queryable.md)\<`TQuery`\>

#### Implementation of

[IRepository](../interfaces/IRepository.md).[query](../interfaces/IRepository.md#query)

#### Defined in

[src/lib/repository/infrastructure/repository.ts:142](https://github.com/lambda-orm/lambdaorm/blob/efd15f74cf775a1cca0ba4f4c4fabcb10e923ec0/src/lib/repository/infrastructure/repository.ts#L142)

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

[src/lib/repository/infrastructure/repository.ts:66](https://github.com/lambda-orm/lambdaorm/blob/efd15f74cf775a1cca0ba4f4c4fabcb10e923ec0/src/lib/repository/infrastructure/repository.ts#L66)

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

[src/lib/repository/infrastructure/repository.ts:68](https://github.com/lambda-orm/lambdaorm/blob/efd15f74cf775a1cca0ba4f4c4fabcb10e923ec0/src/lib/repository/infrastructure/repository.ts#L68)

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

[src/lib/repository/infrastructure/repository.ts:73](https://github.com/lambda-orm/lambdaorm/blob/efd15f74cf775a1cca0ba4f4c4fabcb10e923ec0/src/lib/repository/infrastructure/repository.ts#L73)

___

### upsert

▸ **upsert**(`entity`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |

#### Returns

`Promise`\<`number`\>

#### Implementation of

[IRepository](../interfaces/IRepository.md).[upsert](../interfaces/IRepository.md#upsert)

#### Defined in

[src/lib/repository/infrastructure/repository.ts:11](https://github.com/lambda-orm/lambdaorm/blob/efd15f74cf775a1cca0ba4f4c4fabcb10e923ec0/src/lib/repository/infrastructure/repository.ts#L11)

▸ **upsert**(`entity`, `include`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `include` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`\<`number`\>

#### Implementation of

[IRepository](../interfaces/IRepository.md).[upsert](../interfaces/IRepository.md#upsert)

#### Defined in

[src/lib/repository/infrastructure/repository.ts:12](https://github.com/lambda-orm/lambdaorm/blob/efd15f74cf775a1cca0ba4f4c4fabcb10e923ec0/src/lib/repository/infrastructure/repository.ts#L12)
