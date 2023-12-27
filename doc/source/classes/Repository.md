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

<<<<<<< HEAD
[src/lib/repository/infrastructure/repository.ts:9](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/repository/infrastructure/repository.ts#L9)
=======
[src/lib/repository/infrastructure/repository.ts:9](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/repository/infrastructure/repository.ts#L9)
>>>>>>> release/1.2.0

## Properties

### name

• `Readonly` **name**: `string`

#### Defined in

<<<<<<< HEAD
[src/lib/repository/infrastructure/repository.ts:9](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/repository/infrastructure/repository.ts#L9)
=======
[src/lib/repository/infrastructure/repository.ts:9](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/repository/infrastructure/repository.ts#L9)
>>>>>>> release/1.2.0

___

### stage

• `Optional` **stage**: `string`

#### Defined in

<<<<<<< HEAD
[src/lib/repository/infrastructure/repository.ts:9](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/repository/infrastructure/repository.ts#L9)
=======
[src/lib/repository/infrastructure/repository.ts:9](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/repository/infrastructure/repository.ts#L9)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/repository/infrastructure/repository.ts:40](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/repository/infrastructure/repository.ts#L40)
=======
[src/lib/repository/infrastructure/repository.ts:40](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/repository/infrastructure/repository.ts#L40)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/repository/infrastructure/repository.ts:42](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/repository/infrastructure/repository.ts#L42)
=======
[src/lib/repository/infrastructure/repository.ts:42](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/repository/infrastructure/repository.ts#L42)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/repository/infrastructure/repository.ts:72](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/repository/infrastructure/repository.ts#L72)
=======
[src/lib/repository/infrastructure/repository.ts:72](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/repository/infrastructure/repository.ts#L72)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/repository/infrastructure/repository.ts:74](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/repository/infrastructure/repository.ts#L74)
=======
[src/lib/repository/infrastructure/repository.ts:74](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/repository/infrastructure/repository.ts#L74)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/repository/infrastructure/repository.ts:79](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/repository/infrastructure/repository.ts#L79)
=======
[src/lib/repository/infrastructure/repository.ts:79](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/repository/infrastructure/repository.ts#L79)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/repository/infrastructure/repository.ts:93](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/repository/infrastructure/repository.ts#L93)
=======
[src/lib/repository/infrastructure/repository.ts:93](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/repository/infrastructure/repository.ts#L93)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/repository/infrastructure/repository.ts:27](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/repository/infrastructure/repository.ts#L27)
=======
[src/lib/repository/infrastructure/repository.ts:27](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/repository/infrastructure/repository.ts#L27)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/repository/infrastructure/repository.ts:100](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/repository/infrastructure/repository.ts#L100)
=======
[src/lib/repository/infrastructure/repository.ts:100](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/repository/infrastructure/repository.ts#L100)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/repository/infrastructure/repository.ts:32](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/repository/infrastructure/repository.ts#L32)
=======
[src/lib/repository/infrastructure/repository.ts:32](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/repository/infrastructure/repository.ts#L32)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/repository/infrastructure/repository.ts:34](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/repository/infrastructure/repository.ts#L34)
=======
[src/lib/repository/infrastructure/repository.ts:34](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/repository/infrastructure/repository.ts#L34)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/repository/infrastructure/repository.ts:112](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/repository/infrastructure/repository.ts#L112)
=======
[src/lib/repository/infrastructure/repository.ts:112](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/repository/infrastructure/repository.ts#L112)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/repository/infrastructure/repository.ts:86](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/repository/infrastructure/repository.ts#L86)
=======
[src/lib/repository/infrastructure/repository.ts:86](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/repository/infrastructure/repository.ts#L86)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/repository/infrastructure/repository.ts:64](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/repository/infrastructure/repository.ts#L64)
=======
[src/lib/repository/infrastructure/repository.ts:64](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/repository/infrastructure/repository.ts#L64)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/repository/infrastructure/repository.ts:66](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/repository/infrastructure/repository.ts#L66)
=======
[src/lib/repository/infrastructure/repository.ts:66](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/repository/infrastructure/repository.ts#L66)
>>>>>>> release/1.2.0

___

### query

▸ **query**(): [`Queryable`](Queryable.md)\<`TQuery`\>

#### Returns

[`Queryable`](Queryable.md)\<`TQuery`\>

#### Implementation of

[IRepository](../interfaces/IRepository.md).[query](../interfaces/IRepository.md#query)

#### Defined in

<<<<<<< HEAD
[src/lib/repository/infrastructure/repository.ts:124](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/repository/infrastructure/repository.ts#L124)
=======
[src/lib/repository/infrastructure/repository.ts:124](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/repository/infrastructure/repository.ts#L124)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/repository/infrastructure/repository.ts:48](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/repository/infrastructure/repository.ts#L48)
=======
[src/lib/repository/infrastructure/repository.ts:48](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/repository/infrastructure/repository.ts#L48)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/repository/infrastructure/repository.ts:50](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/repository/infrastructure/repository.ts#L50)
=======
[src/lib/repository/infrastructure/repository.ts:50](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/repository/infrastructure/repository.ts#L50)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/repository/infrastructure/repository.ts:55](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/repository/infrastructure/repository.ts#L55)
=======
[src/lib/repository/infrastructure/repository.ts:55](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/repository/infrastructure/repository.ts#L55)
>>>>>>> release/1.2.0
