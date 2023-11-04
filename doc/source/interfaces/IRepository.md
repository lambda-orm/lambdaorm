[Lambda ORM](../README.md) / IRepository

# Interface: IRepository<TEntity, TQuery\>

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

▸ **bulkInsert**(`entities`): `Promise`<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entities` | `TEntity`[] |

#### Returns

`Promise`<`any`[]\>

#### Defined in

[src/lib/repository/application/repository.ts:10](https://github.com/FlavioLionelRita/lambdaorm/blob/badcbd99/src/lib/repository/application/repository.ts#L10)

▸ **bulkInsert**(`entities`, `include`): `Promise`<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entities` | `TEntity`[] |
| `include` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`<`any`[]\>

#### Defined in

[src/lib/repository/application/repository.ts:11](https://github.com/FlavioLionelRita/lambdaorm/blob/badcbd99/src/lib/repository/application/repository.ts#L11)

▸ **bulkInsert**(`entities`, `include?`): `Promise`<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entities` | `TEntity`[] |
| `include?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`<`any`[]\>

#### Defined in

[src/lib/repository/application/repository.ts:12](https://github.com/FlavioLionelRita/lambdaorm/blob/badcbd99/src/lib/repository/application/repository.ts#L12)

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

[src/lib/repository/application/repository.ts:28](https://github.com/FlavioLionelRita/lambdaorm/blob/badcbd99/src/lib/repository/application/repository.ts#L28)

▸ **delete**(`entity`, `include`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `include` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/lib/repository/application/repository.ts:29](https://github.com/FlavioLionelRita/lambdaorm/blob/badcbd99/src/lib/repository/application/repository.ts#L29)

▸ **delete**(`entity`, `include?`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `include?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/lib/repository/application/repository.ts:30](https://github.com/FlavioLionelRita/lambdaorm/blob/badcbd99/src/lib/repository/application/repository.ts#L30)

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

[src/lib/repository/application/repository.ts:32](https://github.com/FlavioLionelRita/lambdaorm/blob/badcbd99/src/lib/repository/application/repository.ts#L32)

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

[src/lib/repository/application/repository.ts:42](https://github.com/FlavioLionelRita/lambdaorm/blob/badcbd99/src/lib/repository/application/repository.ts#L42)

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

[src/lib/repository/application/repository.ts:5](https://github.com/FlavioLionelRita/lambdaorm/blob/badcbd99/src/lib/repository/application/repository.ts#L5)

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

[src/lib/repository/application/repository.ts:47](https://github.com/FlavioLionelRita/lambdaorm/blob/badcbd99/src/lib/repository/application/repository.ts#L47)

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

[src/lib/repository/application/repository.ts:6](https://github.com/FlavioLionelRita/lambdaorm/blob/badcbd99/src/lib/repository/application/repository.ts#L6)

▸ **insert**(`entity`, `include`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `include` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/repository/application/repository.ts:7](https://github.com/FlavioLionelRita/lambdaorm/blob/badcbd99/src/lib/repository/application/repository.ts#L7)

▸ **insert**(`entity`, `include?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `include?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/repository/application/repository.ts:8](https://github.com/FlavioLionelRita/lambdaorm/blob/badcbd99/src/lib/repository/application/repository.ts#L8)

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

[src/lib/repository/application/repository.ts:52](https://github.com/FlavioLionelRita/lambdaorm/blob/badcbd99/src/lib/repository/application/repository.ts#L52)

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

[src/lib/repository/application/repository.ts:37](https://github.com/FlavioLionelRita/lambdaorm/blob/badcbd99/src/lib/repository/application/repository.ts#L37)

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

[src/lib/repository/application/repository.ts:24](https://github.com/FlavioLionelRita/lambdaorm/blob/badcbd99/src/lib/repository/application/repository.ts#L24)

▸ **merge**(`entity`, `include`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `include` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/lib/repository/application/repository.ts:25](https://github.com/FlavioLionelRita/lambdaorm/blob/badcbd99/src/lib/repository/application/repository.ts#L25)

▸ **merge**(`entity`, `include?`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `include?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/lib/repository/application/repository.ts:26](https://github.com/FlavioLionelRita/lambdaorm/blob/badcbd99/src/lib/repository/application/repository.ts#L26)

___

### query

▸ **query**(): [`Queryable`](../classes/Queryable.md)<`TQuery`\>

#### Returns

[`Queryable`](../classes/Queryable.md)<`TQuery`\>

#### Defined in

[src/lib/repository/application/repository.ts:57](https://github.com/FlavioLionelRita/lambdaorm/blob/badcbd99/src/lib/repository/application/repository.ts#L57)

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

[src/lib/repository/application/repository.ts:14](https://github.com/FlavioLionelRita/lambdaorm/blob/badcbd99/src/lib/repository/application/repository.ts#L14)

▸ **update**(`entity`, `include`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `include` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/lib/repository/application/repository.ts:15](https://github.com/FlavioLionelRita/lambdaorm/blob/badcbd99/src/lib/repository/application/repository.ts#L15)

▸ **update**(`entity`, `include?`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `TEntity` |
| `include?` | (`value`: `TQuery`, `index`: `number`, `array`: `TQuery`[]) => `unknown` |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/lib/repository/application/repository.ts:16](https://github.com/FlavioLionelRita/lambdaorm/blob/badcbd99/src/lib/repository/application/repository.ts#L16)

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

[src/lib/repository/application/repository.ts:18](https://github.com/FlavioLionelRita/lambdaorm/blob/badcbd99/src/lib/repository/application/repository.ts#L18)
