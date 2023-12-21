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
- [init](IOrm.md#init)
- [metadata](IOrm.md#metadata)
- [model](IOrm.md#model)
- [normalize](IOrm.md#normalize)
- [parameters](IOrm.md#parameters)
- [plan](IOrm.md#plan)
- [transaction](IOrm.md#transaction)

## Properties

### expressions

• **expressions**: `Expressions`

#### Defined in

[src/lib/orm/application/orm.ts:12](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/application/orm.ts#L12)

___

### schema

• **schema**: `SchemaFacade`

#### Defined in

[src/lib/orm/application/orm.ts:11](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/application/orm.ts#L11)

___

### stage

• **stage**: [`StageFacade`](../classes/StageFacade.md)

#### Defined in

[src/lib/orm/application/orm.ts:10](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/application/orm.ts#L10)

## Accessors

### workspace

• `get` **workspace**(): `string`

#### Returns

`string`

#### Defined in

[src/lib/orm/application/orm.ts:9](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/application/orm.ts#L9)

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

[src/lib/orm/application/orm.ts:44](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/application/orm.ts#L44)

▸ **constraints**(`expression`): `MetadataConstraint`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`MetadataConstraint`

#### Defined in

[src/lib/orm/application/orm.ts:45](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/application/orm.ts#L45)

___

### dialect

▸ **dialect**(`source`): `Dialect`

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `string` |

#### Returns

`Dialect`

#### Defined in

[src/lib/orm/application/orm.ts:14](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/application/orm.ts#L14)

___

### end

▸ **end**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/lib/orm/application/orm.ts:18](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/application/orm.ts#L18)

___

### execute

▸ **execute**(`expression`, `data?`, `options?`): `Promise`\<`any`\>

Execute expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `Function` | - |
| `data?` | `any` | Data with variables |
| `options?` | [`QueryOptions`](QueryOptions.md) | - |

#### Returns

`Promise`\<`any`\>

Result of execution

#### Defined in

[src/lib/orm/application/orm.ts:69](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/application/orm.ts#L69)

▸ **execute**(`expression`, `data?`, `options?`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `data?` | `any` |
| `options?` | [`QueryOptions`](QueryOptions.md) |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/orm/application/orm.ts:70](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/application/orm.ts#L70)

___

### init

▸ **init**(`configPath?`, `connect?`): `Promise`\<`Schema`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `configPath?` | `string` |
| `connect?` | `boolean` |

#### Returns

`Promise`\<`Schema`\>

#### Defined in

[src/lib/orm/application/orm.ts:17](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/application/orm.ts#L17)

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

[src/lib/orm/application/orm.ts:51](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/application/orm.ts#L51)

▸ **metadata**(`expression`): `Metadata`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Metadata`

#### Defined in

[src/lib/orm/application/orm.ts:52](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/application/orm.ts#L52)

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

[src/lib/orm/application/orm.ts:30](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/application/orm.ts#L30)

▸ **model**(`expression`): `MetadataModel`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`MetadataModel`[]

#### Defined in

[src/lib/orm/application/orm.ts:31](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/application/orm.ts#L31)

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

[src/lib/orm/application/orm.ts:23](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/application/orm.ts#L23)

▸ **normalize**(`expression`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/orm/application/orm.ts:24](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/application/orm.ts#L24)

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

[src/lib/orm/application/orm.ts:37](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/application/orm.ts#L37)

▸ **parameters**(`expression`): `MetadataParameter`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`MetadataParameter`[]

#### Defined in

[src/lib/orm/application/orm.ts:38](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/application/orm.ts#L38)

___

### plan

▸ **plan**(`expression`, `options?`): `QueryPlan`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `Function` |
| `options?` | [`QueryOptions`](QueryOptions.md) |

#### Returns

`QueryPlan`

#### Defined in

[src/lib/orm/application/orm.ts:59](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/application/orm.ts#L59)

▸ **plan**(`expression`, `options?`): `QueryPlan`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `options?` | [`QueryOptions`](QueryOptions.md) |

#### Returns

`QueryPlan`

#### Defined in

[src/lib/orm/application/orm.ts:60](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/application/orm.ts#L60)

___

### transaction

▸ **transaction**(`options`, `callback`): `Promise`\<`void`\>

transaction

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `undefined` \| [`QueryOptions`](QueryOptions.md) |
| `callback` | (`tr`: [`ExpressionTransaction`](../classes/ExpressionTransaction.md)) => `Promise`\<`void`\> |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/lib/orm/application/orm.ts:77](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/application/orm.ts#L77)
