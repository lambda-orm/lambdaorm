[Lambda ORM](../README.md) / [repository](../modules/repository.md) / Respository

# Class: Respository<TEntity, TQuery\>

[repository](../modules/repository.md).Respository

## Type parameters

| Name |
| :------ |
| `TEntity` |
| `TQuery` |

## Table of contents

### Constructors

- [constructor](repository.Respository.md#constructor)

### Properties

- [name](repository.Respository.md#name)
- [stage](repository.Respository.md#stage)

### Methods

- [bulkInsert](repository.Respository.md#bulkinsert)
- [delete](repository.Respository.md#delete)
- [deleteAll](repository.Respository.md#deleteall)
- [distinct](repository.Respository.md#distinct)
- [execute](repository.Respository.md#execute)
- [first](repository.Respository.md#first)
- [insert](repository.Respository.md#insert)
- [last](repository.Respository.md#last)
- [list](repository.Respository.md#list)
- [merge](repository.Respository.md#merge)
- [query](repository.Respository.md#query)
- [take](repository.Respository.md#take)
- [update](repository.Respository.md#update)
- [updateAll](repository.Respository.md#updateall)

## Constructors

### constructor

• **new Respository**<`TEntity`, `TQuery`\>(`name`, `stage?`, `Orm?`)

#### Type parameters

| Name |
| :------ |
| `TEntity` |
| `TQuery` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `stage?` | `string` |
| `Orm?` | [`IOrm`](../interfaces/model.IOrm.md) |

#### Defined in

[src/lib/repository/repository.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/repository.ts#L9)

## Properties

### name

• **name**: `string`

#### Defined in

[src/lib/repository/repository.ts:6](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/repository.ts#L6)

___

### stage

• **stage**: `undefined` \| `string`

#### Defined in

[src/lib/repository/repository.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/repository.ts#L7)

## Methods

### bulkInsert

▸ **bulkInsert**(`entity`): `Promise`<`number`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |

#### Returns

`Promise`<`number`[]\>

#### Defined in

[src/lib/repository/repository.ts:28](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/repository.ts#L28)

▸ **bulkInsert**(`entity`, `include`): `Promise`<`number`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `include` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`<`number`[]\>

#### Defined in

[src/lib/repository/repository.ts:30](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/repository.ts#L30)

___

### delete

▸ **delete**(`entity`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/repository/repository.ts:79](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/repository.ts#L79)

▸ **delete**(`entity`, `include`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `include` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/repository/repository.ts:81](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/repository.ts#L81)

___

### deleteAll

▸ **deleteAll**(`data`, `map`, `filter?`, `include?`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `map` | (`value`: `TEntity`) => `unknown` |
| `filter?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |
| `include?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/lib/repository/repository.ts:90](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/repository.ts#L90)

___

### distinct

▸ **distinct**(`data`, `filter?`, `include?`): `Promise`<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `filter?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |
| `include?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`<`any`[]\>

#### Defined in

[src/lib/repository/repository.ts:123](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/repository.ts#L123)

___

### execute

▸ **execute**(`expresion`, `data?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expresion` | `string` |
| `data?` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/repository/repository.ts:105](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/repository.ts#L105)

___

### first

▸ **first**(`data`, `filter?`, `include?`): `Promise`<``null`` \| `TEntity`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `filter?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |
| `include?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`<``null`` \| `TEntity`\>

#### Defined in

[src/lib/repository/repository.ts:137](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/repository.ts#L137)

___

### insert

▸ **insert**(`entity`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/lib/repository/repository.ts:16](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/repository.ts#L16)

▸ **insert**(`entity`, `include`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `include` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/lib/repository/repository.ts:18](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/repository.ts#L18)

___

### last

▸ **last**(`data`, `filter?`, `include?`): `Promise`<``null`` \| `TEntity`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `filter?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |
| `include?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`<``null`` \| `TEntity`\>

#### Defined in

[src/lib/repository/repository.ts:156](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/repository.ts#L156)

___

### list

▸ **list**(`data`, `filter?`, `include?`): `Promise`<`TEntity`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `filter?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |
| `include?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`<`TEntity`[]\>

#### Defined in

[src/lib/repository/repository.ts:109](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/repository.ts#L109)

___

### merge

▸ **merge**(`entity`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/repository/repository.ts:67](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/repository.ts#L67)

▸ **merge**(`entity`, `include`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `include` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/repository/repository.ts:69](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/repository.ts#L69)

___

### query

▸ **query**(): [`Queryable`](repository.Queryable.md)<`TQuery`\>

#### Returns

[`Queryable`](repository.Queryable.md)<`TQuery`\>

#### Defined in

[src/lib/repository/repository.ts:194](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/repository.ts#L194)

___

### take

▸ **take**(`data`, `filter?`, `include?`): `Promise`<``null`` \| `TEntity`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `filter?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |
| `include?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`<``null`` \| `TEntity`\>

#### Defined in

[src/lib/repository/repository.ts:175](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/repository.ts#L175)

___

### update

▸ **update**(`entity`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/repository/repository.ts:40](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/repository.ts#L40)

▸ **update**(`entity`, `include`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `include` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/repository/repository.ts:42](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/repository.ts#L42)

___

### updateAll

▸ **updateAll**(`data`, `map`, `filter?`, `include?`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `map` | (`value`: `TEntity`) => `unknown` |
| `filter?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |
| `include?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/lib/repository/repository.ts:51](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/repository.ts#L51)
