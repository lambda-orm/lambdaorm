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

• **new Respository**<`TEntity`, `TQuery`\>(`name`, `stage`, `Orm?`)

#### Type parameters

| Name |
| :------ |
| `TEntity` |
| `TQuery` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `stage` | `string` |
| `Orm?` | [`IOrm`](../interfaces/model.IOrm.md) |

#### Defined in

[src/lib/repository/repository.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/repository.ts#L9)

## Properties

### name

• **name**: `string`

#### Defined in

[src/lib/repository/repository.ts:6](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/repository.ts#L6)

___

### stage

• **stage**: `string`

#### Defined in

[src/lib/repository/repository.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/repository.ts#L7)

## Methods

### bulkInsert

▸ **bulkInsert**(`entity`, `context`): `Promise`<`number`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `context` | `any` |

#### Returns

`Promise`<`number`[]\>

#### Defined in

[src/lib/repository/repository.ts:28](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/repository.ts#L28)

▸ **bulkInsert**(`entity`, `include`, `context`): `Promise`<`number`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `include` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |
| `context` | `any` |

#### Returns

`Promise`<`number`[]\>

#### Defined in

[src/lib/repository/repository.ts:30](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/repository.ts#L30)

___

### delete

▸ **delete**(`entity`, `context`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `context` | `any` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/repository/repository.ts:80](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/repository.ts#L80)

▸ **delete**(`entity`, `include`, `context`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `include` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |
| `context` | `any` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/repository/repository.ts:82](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/repository.ts#L82)

___

### deleteAll

▸ **deleteAll**(`data`, `map`, `filter?`, `include?`, `context?`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `map` | (`value`: `TEntity`) => `unknown` |
| `filter?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |
| `include?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |
| `context` | `any` |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/lib/repository/repository.ts:91](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/repository.ts#L91)

___

### distinct

▸ **distinct**(`data`, `filter?`, `include?`, `context?`): `Promise`<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `filter?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |
| `include?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |
| `context` | `any` |

#### Returns

`Promise`<`any`[]\>

#### Defined in

[src/lib/repository/repository.ts:126](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/repository.ts#L126)

___

### execute

▸ **execute**(`expresion`, `data?`, `context?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expresion` | `string` |
| `data?` | `any` |
| `context` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/repository/repository.ts:107](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/repository.ts#L107)

___

### first

▸ **first**(`data`, `filter?`, `include?`, `context?`): `Promise`<``null`` \| `TEntity`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `filter?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |
| `include?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |
| `context` | `any` |

#### Returns

`Promise`<``null`` \| `TEntity`\>

#### Defined in

[src/lib/repository/repository.ts:141](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/repository.ts#L141)

___

### insert

▸ **insert**(`entity`, `context`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `context` | `any` |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/lib/repository/repository.ts:16](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/repository.ts#L16)

▸ **insert**(`entity`, `include`, `context`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `include` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |
| `context` | `any` |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/lib/repository/repository.ts:18](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/repository.ts#L18)

___

### last

▸ **last**(`data`, `filter?`, `include?`, `context?`): `Promise`<``null`` \| `TEntity`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `filter?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |
| `include?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |
| `context` | `any` |

#### Returns

`Promise`<``null`` \| `TEntity`\>

#### Defined in

[src/lib/repository/repository.ts:161](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/repository.ts#L161)

___

### list

▸ **list**(`data`, `filter?`, `include?`, `context?`): `Promise`<`TEntity`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `filter?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |
| `include?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |
| `context` | `any` |

#### Returns

`Promise`<`TEntity`[]\>

#### Defined in

[src/lib/repository/repository.ts:111](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/repository.ts#L111)

___

### merge

▸ **merge**(`entity`, `context`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `context` | `any` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/repository/repository.ts:68](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/repository.ts#L68)

▸ **merge**(`entity`, `include`, `context`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `include` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |
| `context` | `any` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/repository/repository.ts:70](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/repository.ts#L70)

___

### query

▸ **query**(): [`Queryable`](repository.Queryable.md)<`TQuery`\>

#### Returns

[`Queryable`](repository.Queryable.md)<`TQuery`\>

#### Defined in

[src/lib/repository/repository.ts:231](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/repository.ts#L231)

___

### take

▸ **take**(`data`, `filter?`, `include?`, `context?`): `Promise`<``null`` \| `TEntity`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `filter?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |
| `include?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |
| `context` | `any` |

#### Returns

`Promise`<``null`` \| `TEntity`\>

#### Defined in

[src/lib/repository/repository.ts:181](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/repository.ts#L181)

___

### update

▸ **update**(`entity`, `context`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `context` | `any` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/repository/repository.ts:40](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/repository.ts#L40)

▸ **update**(`entity`, `include`, `context`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `include` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |
| `context` | `any` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/repository/repository.ts:42](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/repository.ts#L42)

___

### updateAll

▸ **updateAll**(`data`, `map`, `filter?`, `include?`, `context?`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `map` | (`value`: `TEntity`) => `unknown` |
| `filter?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |
| `include?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |
| `context` | `any` |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/lib/repository/repository.ts:51](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/repository.ts#L51)
