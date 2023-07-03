[Lambda ORM](../README.md) / IOrm

# Interface: IOrm

## Implemented by

- [`Orm`](../classes/Orm.md)

## Table of contents

### Properties

- [expressions](IOrm.md#expressions)
- [schema](IOrm.md#schema)
- [stage](IOrm.md#stage)

### Accessors

- [workspace](IOrm.md#workspace)

### Methods

- [constraints](IOrm.md#constraints)
- [dialect](IOrm.md#dialect)
- [end](IOrm.md#end)
- [execute](IOrm.md#execute)
- [getInfo](IOrm.md#getinfo)
- [init](IOrm.md#init)
- [metadata](IOrm.md#metadata)
- [model](IOrm.md#model)
- [normalize](IOrm.md#normalize)
- [parameters](IOrm.md#parameters)
- [transaction](IOrm.md#transaction)

## Properties

### expressions

• **expressions**: `Expressions`

#### Defined in

[src/lib/orm/application/orm.ts:14](https://github.com/FlavioLionelRita/lambdaorm/blob/b12533cf/src/lib/orm/application/orm.ts#L14)

___

### schema

• **schema**: [`SchemaFacade`](../classes/SchemaFacade.md)

#### Defined in

[src/lib/orm/application/orm.ts:13](https://github.com/FlavioLionelRita/lambdaorm/blob/b12533cf/src/lib/orm/application/orm.ts#L13)

___

### stage

• **stage**: [`StageFacade`](../classes/StageFacade.md)

#### Defined in

[src/lib/orm/application/orm.ts:12](https://github.com/FlavioLionelRita/lambdaorm/blob/b12533cf/src/lib/orm/application/orm.ts#L12)

## Accessors

### workspace

• `get` **workspace**(): `string`

#### Returns

`string`

#### Defined in

[src/lib/orm/application/orm.ts:11](https://github.com/FlavioLionelRita/lambdaorm/blob/b12533cf/src/lib/orm/application/orm.ts#L11)

## Methods

### constraints

▸ **constraints**(`expression`): `MetadataConstraint`

Get constraints of expression

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `Function` |

#### Returns

`MetadataConstraint`

Constraints of expression

#### Defined in

[src/lib/orm/application/orm.ts:46](https://github.com/FlavioLionelRita/lambdaorm/blob/b12533cf/src/lib/orm/application/orm.ts#L46)

▸ **constraints**(`expression`): `MetadataConstraint`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`MetadataConstraint`

#### Defined in

[src/lib/orm/application/orm.ts:47](https://github.com/FlavioLionelRita/lambdaorm/blob/b12533cf/src/lib/orm/application/orm.ts#L47)

___

### dialect

▸ **dialect**(`source`): [`Dialect`](../enums/Dialect.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `string` |

#### Returns

[`Dialect`](../enums/Dialect.md)

#### Defined in

[src/lib/orm/application/orm.ts:16](https://github.com/FlavioLionelRita/lambdaorm/blob/b12533cf/src/lib/orm/application/orm.ts#L16)

___

### end

▸ **end**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/orm/application/orm.ts:20](https://github.com/FlavioLionelRita/lambdaorm/blob/b12533cf/src/lib/orm/application/orm.ts#L20)

___

### execute

▸ **execute**(`expression`, `data?`, `options?`): `Promise`<`any`\>

Execute expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `Function` | - |
| `data?` | `any` | Data with variables |
| `options?` | [`QueryOptions`](QueryOptions.md) | - |

#### Returns

`Promise`<`any`\>

Result of execution

#### Defined in

[src/lib/orm/application/orm.ts:71](https://github.com/FlavioLionelRita/lambdaorm/blob/b12533cf/src/lib/orm/application/orm.ts#L71)

▸ **execute**(`expression`, `data?`, `options?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `data?` | `any` |
| `options?` | [`QueryOptions`](QueryOptions.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/orm/application/orm.ts:72](https://github.com/FlavioLionelRita/lambdaorm/blob/b12533cf/src/lib/orm/application/orm.ts#L72)

___

### getInfo

▸ **getInfo**(`expression`, `options?`): [`QueryInfo`](QueryInfo.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `Function` |
| `options?` | [`QueryOptions`](QueryOptions.md) |

#### Returns

[`QueryInfo`](QueryInfo.md)

#### Defined in

[src/lib/orm/application/orm.ts:61](https://github.com/FlavioLionelRita/lambdaorm/blob/b12533cf/src/lib/orm/application/orm.ts#L61)

▸ **getInfo**(`expression`, `options?`): [`QueryInfo`](QueryInfo.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `options?` | [`QueryOptions`](QueryOptions.md) |

#### Returns

[`QueryInfo`](QueryInfo.md)

#### Defined in

[src/lib/orm/application/orm.ts:62](https://github.com/FlavioLionelRita/lambdaorm/blob/b12533cf/src/lib/orm/application/orm.ts#L62)

___

### init

▸ **init**(`configPath?`, `connect?`): `Promise`<[`Schema`](Schema.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `configPath?` | `string` |
| `connect?` | `boolean` |

#### Returns

`Promise`<[`Schema`](Schema.md)\>

#### Defined in

[src/lib/orm/application/orm.ts:19](https://github.com/FlavioLionelRita/lambdaorm/blob/b12533cf/src/lib/orm/application/orm.ts#L19)

___

### metadata

▸ **metadata**(`expression`): `Metadata`

Get metadata of expression

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `Function` |

#### Returns

`Metadata`

metadata of expression

#### Defined in

[src/lib/orm/application/orm.ts:53](https://github.com/FlavioLionelRita/lambdaorm/blob/b12533cf/src/lib/orm/application/orm.ts#L53)

▸ **metadata**(`expression`): `Metadata`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Metadata`

#### Defined in

[src/lib/orm/application/orm.ts:54](https://github.com/FlavioLionelRita/lambdaorm/blob/b12533cf/src/lib/orm/application/orm.ts#L54)

___

### model

▸ **model**(`expression`): `MetadataModel`[]

Get model of expression

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `Function` |

#### Returns

`MetadataModel`[]

Model of expression

#### Defined in

[src/lib/orm/application/orm.ts:32](https://github.com/FlavioLionelRita/lambdaorm/blob/b12533cf/src/lib/orm/application/orm.ts#L32)

▸ **model**(`expression`): `MetadataModel`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`MetadataModel`[]

#### Defined in

[src/lib/orm/application/orm.ts:33](https://github.com/FlavioLionelRita/lambdaorm/blob/b12533cf/src/lib/orm/application/orm.ts#L33)

___

### normalize

▸ **normalize**(`expression`): `string`

Normalize expression

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `Function` |

#### Returns

`string`

Expression normalized

#### Defined in

[src/lib/orm/application/orm.ts:25](https://github.com/FlavioLionelRita/lambdaorm/blob/b12533cf/src/lib/orm/application/orm.ts#L25)

▸ **normalize**(`expression`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/orm/application/orm.ts:26](https://github.com/FlavioLionelRita/lambdaorm/blob/b12533cf/src/lib/orm/application/orm.ts#L26)

___

### parameters

▸ **parameters**(`expression`): `MetadataParameter`[]

Get parameters of expression

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `Function` |

#### Returns

`MetadataParameter`[]

Parameters of expression

#### Defined in

[src/lib/orm/application/orm.ts:39](https://github.com/FlavioLionelRita/lambdaorm/blob/b12533cf/src/lib/orm/application/orm.ts#L39)

▸ **parameters**(`expression`): `MetadataParameter`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`MetadataParameter`[]

#### Defined in

[src/lib/orm/application/orm.ts:40](https://github.com/FlavioLionelRita/lambdaorm/blob/b12533cf/src/lib/orm/application/orm.ts#L40)

___

### transaction

▸ **transaction**(`options`, `callback`): `Promise`<`void`\>

transaction

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `undefined` \| [`QueryOptions`](QueryOptions.md) |
| `callback` | (`tr`: `ExpressionTransaction`) => `Promise`<`void`\> |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/orm/application/orm.ts:79](https://github.com/FlavioLionelRita/lambdaorm/blob/b12533cf/src/lib/orm/application/orm.ts#L79)
