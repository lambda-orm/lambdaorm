[Lambda ORM](../README.md) / [repository](../modules/repository.md) / Repository

# Class: Repository<TEntity, TQuery\>

[repository](../modules/repository.md).Repository

## Type parameters

| Name |
| :------ |
| `TEntity` |
| `TQuery` |

## Table of contents

### Constructors

- [constructor](repository.Repository.md#constructor)

### Properties

- [name](repository.Repository.md#name)
- [stage](repository.Repository.md#stage)

### Methods

- [bulkInsert](repository.Repository.md#bulkinsert)
- [delete](repository.Repository.md#delete)
- [deleteAll](repository.Repository.md#deleteall)
- [distinct](repository.Repository.md#distinct)
- [execute](repository.Repository.md#execute)
- [first](repository.Repository.md#first)
- [insert](repository.Repository.md#insert)
- [last](repository.Repository.md#last)
- [list](repository.Repository.md#list)
- [merge](repository.Repository.md#merge)
- [query](repository.Repository.md#query)
- [update](repository.Repository.md#update)
- [updateAll](repository.Repository.md#updateall)

## Constructors

### constructor

• **new Repository**<`TEntity`, `TQuery`\>(`name`, `stage?`, `Orm?`)

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

[src/lib/repository/repository.ts:9](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/repository/repository.ts#L9)

## Properties

### name

• **name**: `any`

#### Defined in

[src/lib/repository/repository.ts:6](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/repository/repository.ts#L6)

___

### stage

• **stage**: `any`

#### Defined in

[src/lib/repository/repository.ts:7](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/repository/repository.ts#L7)

## Methods

### bulkInsert

▸ **bulkInsert**(`entities`): `Promise`<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entities` | `TEntity`[] |

#### Returns

`Promise`<`any`[]\>

#### Defined in

[src/lib/repository/repository.ts:44](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/repository/repository.ts#L44)

▸ **bulkInsert**(`entities`, `include`): `Promise`<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entities` | `TEntity`[] |
| `include` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`<`any`[]\>

#### Defined in

[src/lib/repository/repository.ts:46](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/repository/repository.ts#L46)

___

### delete

▸ **delete**(`entity`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/lib/repository/repository.ts:76](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/repository/repository.ts#L76)

▸ **delete**(`entity`, `include`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `include` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/lib/repository/repository.ts:78](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/repository/repository.ts#L78)

___

### deleteAll

▸ **deleteAll**(`data`, `filter?`, `include?`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `filter?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |
| `include?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/lib/repository/repository.ts:83](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/repository/repository.ts#L83)

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

[src/lib/repository/repository.ts:97](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/repository/repository.ts#L97)

___

### execute

▸ **execute**(`expression`, `data?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `data?` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/repository/repository.ts:31](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/repository/repository.ts#L31)

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

[src/lib/repository/repository.ts:104](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/repository/repository.ts#L104)

___

### insert

▸ **insert**(`entity`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/repository/repository.ts:36](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/repository/repository.ts#L36)

▸ **insert**(`entity`, `include`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `include` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/repository/repository.ts:38](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/repository/repository.ts#L38)

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

[src/lib/repository/repository.ts:116](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/repository/repository.ts#L116)

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

[src/lib/repository/repository.ts:90](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/repository/repository.ts#L90)

___

### merge

▸ **merge**(`entity`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/lib/repository/repository.ts:68](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/repository/repository.ts#L68)

▸ **merge**(`entity`, `include`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `include` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/lib/repository/repository.ts:70](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/repository/repository.ts#L70)

___

### query

▸ **query**(): [`Queryable`](repository.Queryable.md)<`TQuery`\>

#### Returns

[`Queryable`](repository.Queryable.md)<`TQuery`\>

#### Defined in

[src/lib/repository/repository.ts:128](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/repository/repository.ts#L128)

___

### update

▸ **update**(`entity`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/lib/repository/repository.ts:52](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/repository/repository.ts#L52)

▸ **update**(`entity`, `include`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `include` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/lib/repository/repository.ts:54](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/repository/repository.ts#L54)

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

[src/lib/repository/repository.ts:59](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/repository/repository.ts#L59)
