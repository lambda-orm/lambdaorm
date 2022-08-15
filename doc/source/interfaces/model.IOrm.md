[Lambda ORM](../README.md) / [model](../modules/model.md) / IOrm

# Interface: IOrm

[model](../modules/model.md).IOrm

## Implemented by

- [`Orm`](../classes/orm.Orm.md)

## Table of contents

### Accessors

- [expressions](model.IOrm.md#expressions)
- [schema](model.IOrm.md#schema)
- [stage](model.IOrm.md#stage)
- [workspace](model.IOrm.md#workspace)

### Methods

- [constraints](model.IOrm.md#constraints)
- [dialect](model.IOrm.md#dialect)
- [end](model.IOrm.md#end)
- [execute](model.IOrm.md#execute)
- [init](model.IOrm.md#init)
- [metadata](model.IOrm.md#metadata)
- [model](model.IOrm.md#model)
- [normalize](model.IOrm.md#normalize)
- [parameters](model.IOrm.md#parameters)
- [sentence](model.IOrm.md#sentence)
- [setCache](model.IOrm.md#setcache)
- [transaction](model.IOrm.md#transaction)

## Accessors

### expressions

• `get` **expressions**(): `Expressions`

#### Returns

`Expressions`

#### Defined in

[src/lib/model/orm.ts:19](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/orm.ts#L19)

___

### schema

• `get` **schema**(): [`SchemaManager`](../classes/manager.SchemaManager.md)

#### Returns

[`SchemaManager`](../classes/manager.SchemaManager.md)

#### Defined in

[src/lib/model/orm.ts:18](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/orm.ts#L18)

___

### stage

• `get` **stage**(): [`StageFacade`](../classes/manager.StageFacade.md)

#### Returns

[`StageFacade`](../classes/manager.StageFacade.md)

#### Defined in

[src/lib/model/orm.ts:17](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/orm.ts#L17)

___

### workspace

• `get` **workspace**(): `string`

#### Returns

`string`

#### Defined in

[src/lib/model/orm.ts:15](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/orm.ts#L15)

## Methods

### constraints

▸ **constraints**(`expression`): [`MetadataConstraint`](model.MetadataConstraint.md)

Get constraints of expression

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `Function` |

#### Returns

[`MetadataConstraint`](model.MetadataConstraint.md)

Constraints of expression

#### Defined in

[src/lib/model/orm.ts:49](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/orm.ts#L49)

▸ **constraints**(`expression`): [`MetadataConstraint`](model.MetadataConstraint.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

[`MetadataConstraint`](model.MetadataConstraint.md)

#### Defined in

[src/lib/model/orm.ts:50](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/orm.ts#L50)

___

### dialect

▸ **dialect**(`dataSource`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataSource` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/model/orm.ts:16](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/orm.ts#L16)

___

### end

▸ **end**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/model/orm.ts:23](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/orm.ts#L23)

___

### execute

▸ **execute**(`expression`, `data?`, `options?`): `Promise`<`any`\>

Execute expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `Function` | - |
| `data?` | `any` | Data with variables |
| `options?` | [`OrmOptions`](model.OrmOptions.md) | - |

#### Returns

`Promise`<`any`\>

Result of execution

#### Defined in

[src/lib/model/orm.ts:74](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/orm.ts#L74)

▸ **execute**(`expression`, `data?`, `options?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `data?` | `any` |
| `options?` | [`OrmOptions`](model.OrmOptions.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/model/orm.ts:75](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/orm.ts#L75)

___

### init

▸ **init**(`configPath?`, `connect?`): `Promise`<[`Schema`](model.Schema.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `configPath?` | `string` |
| `connect?` | `boolean` |

#### Returns

`Promise`<[`Schema`](model.Schema.md)\>

#### Defined in

[src/lib/model/orm.ts:22](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/orm.ts#L22)

___

### metadata

▸ **metadata**(`expression`): [`Metadata`](model.Metadata.md)

Get metadata of expression

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `Function` |

#### Returns

[`Metadata`](model.Metadata.md)

metadata of expression

#### Defined in

[src/lib/model/orm.ts:56](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/orm.ts#L56)

▸ **metadata**(`expression`): [`Metadata`](model.Metadata.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

[`Metadata`](model.Metadata.md)

#### Defined in

[src/lib/model/orm.ts:57](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/orm.ts#L57)

___

### model

▸ **model**(`expression`): [`MetadataModel`](model.MetadataModel.md)[]

Get model of expression

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `Function` |

#### Returns

[`MetadataModel`](model.MetadataModel.md)[]

Model of expression

#### Defined in

[src/lib/model/orm.ts:35](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/orm.ts#L35)

▸ **model**(`expression`): [`MetadataModel`](model.MetadataModel.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

[`MetadataModel`](model.MetadataModel.md)[]

#### Defined in

[src/lib/model/orm.ts:36](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/orm.ts#L36)

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

[src/lib/model/orm.ts:28](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/orm.ts#L28)

▸ **normalize**(`expression`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/model/orm.ts:29](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/orm.ts#L29)

___

### parameters

▸ **parameters**(`expression`): [`MetadataParameter`](model.MetadataParameter.md)[]

Get parameters of expression

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `Function` |

#### Returns

[`MetadataParameter`](model.MetadataParameter.md)[]

Parameters of expression

#### Defined in

[src/lib/model/orm.ts:42](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/orm.ts#L42)

▸ **parameters**(`expression`): [`MetadataParameter`](model.MetadataParameter.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

[`MetadataParameter`](model.MetadataParameter.md)[]

#### Defined in

[src/lib/model/orm.ts:43](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/orm.ts#L43)

___

### sentence

▸ **sentence**(`expression`, `options?`): [`MetadataSentence`](model.MetadataSentence.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `Function` |
| `options?` | [`OrmOptions`](model.OrmOptions.md) |

#### Returns

[`MetadataSentence`](model.MetadataSentence.md)

#### Defined in

[src/lib/model/orm.ts:64](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/orm.ts#L64)

▸ **sentence**(`expression`, `options?`): [`MetadataSentence`](model.MetadataSentence.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `options?` | [`OrmOptions`](model.OrmOptions.md) |

#### Returns

[`MetadataSentence`](model.MetadataSentence.md)

#### Defined in

[src/lib/model/orm.ts:65](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/orm.ts#L65)

___

### setCache

▸ **setCache**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Cache` |

#### Returns

`void`

#### Defined in

[src/lib/model/orm.ts:21](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/orm.ts#L21)

___

### transaction

▸ **transaction**(`options`, `callback`): `Promise`<`void`\>

transaction

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `undefined` \| [`OrmOptions`](model.OrmOptions.md) |
| `callback` | (`tr`: [`Transaction`](../classes/manager.Transaction.md)) => `Promise`<`void`\> |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/model/orm.ts:82](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/orm.ts#L82)
