[Lambda ORM](../README.md) / [model](../modules/model.md) / IOrm

# Interface: IOrm

[model](../modules/model.md).IOrm

## Implemented by

- [`Orm`](../classes/manager.Orm.md)

## Table of contents

### Accessors

- [stage](model.IOrm.md#stage)
- [workspace](model.IOrm.md#workspace)

### Methods

- [complete](model.IOrm.md#complete)
- [dialect](model.IOrm.md#dialect)
- [end](model.IOrm.md#end)
- [eval](model.IOrm.md#eval)
- [execute](model.IOrm.md#execute)
- [init](model.IOrm.md#init)
- [metadata](model.IOrm.md#metadata)
- [model](model.IOrm.md#model)
- [parameters](model.IOrm.md#parameters)
- [sentence](model.IOrm.md#sentence)
- [setCache](model.IOrm.md#setcache)
- [transaction](model.IOrm.md#transaction)

## Accessors

### stage

• `get` **stage**(): [`StageFacade`](../classes/manager.StageFacade.md)

#### Returns

[`StageFacade`](../classes/manager.StageFacade.md)

#### Defined in

[src/lib/model/iOrm.ts:10](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/model/iOrm.ts#L10)

___

### workspace

• `get` **workspace**(): `string`

#### Returns

`string`

#### Defined in

[src/lib/model/iOrm.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/model/iOrm.ts#L8)

## Methods

### complete

▸ **complete**(`expression`): `string`

Complete expression

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `Function` |

#### Returns

`string`

Expression complete

#### Defined in

[src/lib/model/iOrm.ts:19](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/model/iOrm.ts#L19)

▸ **complete**(`expression`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/model/iOrm.ts:20](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/model/iOrm.ts#L20)

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

[src/lib/model/iOrm.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/model/iOrm.ts#L9)

___

### end

▸ **end**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/model/iOrm.ts:13](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/model/iOrm.ts#L13)

___

### eval

▸ **eval**(`expression`, `data`): `Promise`<`any`\>

Evaluate and solve expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | string expression |
| `data` | `any` | Data with variables |

#### Returns

`Promise`<`any`\>

Result of the evaluale expression

#### Defined in

[src/lib/model/iOrm.ts:49](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/model/iOrm.ts#L49)

___

### execute

▸ **execute**(`expression`, `data?`, `context?`, `stage?`): `Promise`<`any`\>

Execute expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `Function` | - |
| `data?` | `any` | Data with variables |
| `context?` | `any` | Context |
| `stage?` | `string` | Stage name |

#### Returns

`Promise`<`any`\>

Result of execution

#### Defined in

[src/lib/model/iOrm.ts:66](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/model/iOrm.ts#L66)

▸ **execute**(`expression`, `data?`, `context?`, `dataSstageource?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `data?` | `any` |
| `context?` | `any` |
| `dataSstageource?` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/model/iOrm.ts:67](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/model/iOrm.ts#L67)

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

[src/lib/model/iOrm.ts:12](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/model/iOrm.ts#L12)

___

### metadata

▸ **metadata**(`expression`): `Promise`<`any`\>

Get metadata of expression

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `Function` |

#### Returns

`Promise`<`any`\>

metadata of expression

#### Defined in

[src/lib/model/iOrm.ts:40](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/model/iOrm.ts#L40)

▸ **metadata**(`expression`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/model/iOrm.ts:41](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/model/iOrm.ts#L41)

___

### model

▸ **model**(`expression`): `Promise`<`any`\>

Get model of expression

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `Function` |

#### Returns

`Promise`<`any`\>

Model of expression

#### Defined in

[src/lib/model/iOrm.ts:26](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/model/iOrm.ts#L26)

▸ **model**(`expression`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/model/iOrm.ts:27](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/model/iOrm.ts#L27)

___

### parameters

▸ **parameters**(`expression`): `Promise`<`any`\>

Get parameters of expression

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `Function` |

#### Returns

`Promise`<`any`\>

Parameters of expression

#### Defined in

[src/lib/model/iOrm.ts:33](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/model/iOrm.ts#L33)

▸ **parameters**(`expression`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/model/iOrm.ts:34](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/model/iOrm.ts#L34)

___

### sentence

▸ **sentence**(`expression`, `stage?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `Function` |
| `stage?` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/lib/model/iOrm.ts:56](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/model/iOrm.ts#L56)

▸ **sentence**(`expression`, `stage?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `stage?` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/lib/model/iOrm.ts:57](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/model/iOrm.ts#L57)

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

[src/lib/model/iOrm.ts:11](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/model/iOrm.ts#L11)

___

### transaction

▸ **transaction**(`context`, `stage`, `callback`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `any` |
| `stage` | `string` |
| `callback` | (`tr`: [`Transaction`](../classes/manager.Transaction.md)) => `Promise`<`void`\> |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/model/iOrm.ts:68](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/model/iOrm.ts#L68)
