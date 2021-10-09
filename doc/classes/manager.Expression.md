[Lambda ORM](../README.md) / [manager](../modules/manager.md) / Expression

# Class: Expression

[manager](../modules/manager.md).Expression

## Table of contents

### Constructors

- [constructor](manager.Expression.md#constructor)

### Properties

- [expression](manager.Expression.md#expression)

### Methods

- [complete](manager.Expression.md#complete)
- [execute](manager.Expression.md#execute)
- [metadata](manager.Expression.md#metadata)
- [model](manager.Expression.md#model)
- [parameters](manager.Expression.md#parameters)
- [sentence](manager.Expression.md#sentence)

## Constructors

### constructor

• **new Expression**(`orm`, `expression`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `orm` | [`IOrm`](../interfaces/model.IOrm.md) |
| `expression` | `string` |

#### Defined in

[manager/expression.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/manager/expression.ts#L7)

## Properties

### expression

• **expression**: `string`

#### Defined in

[manager/expression.ts:6](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/manager/expression.ts#L6)

## Methods

### complete

▸ **complete**(`schemaName`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `schemaName` | `string` |

#### Returns

`string`

#### Defined in

[manager/expression.ts:12](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/manager/expression.ts#L12)

___

### execute

▸ **execute**(`database`, `context?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `database` | `string` |
| `context` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[manager/expression.ts:41](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/manager/expression.ts#L41)

___

### metadata

▸ **metadata**(`schemaName`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `schemaName` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[manager/expression.ts:32](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/manager/expression.ts#L32)

___

### model

▸ **model**(`schemaName`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `schemaName` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[manager/expression.ts:17](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/manager/expression.ts#L17)

___

### parameters

▸ **parameters**(`schemaName`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `schemaName` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[manager/expression.ts:22](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/manager/expression.ts#L22)

___

### sentence

▸ **sentence**(`dialect`, `schemaName`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dialect` | `string` |
| `schemaName` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[manager/expression.ts:27](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/manager/expression.ts#L27)
