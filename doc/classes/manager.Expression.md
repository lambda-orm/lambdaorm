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
- [deserialize](manager.Expression.md#deserialize)
- [execute](manager.Expression.md#execute)
- [model](manager.Expression.md#model)
- [sentence](manager.Expression.md#sentence)
- [serialize](manager.Expression.md#serialize)

## Constructors

### constructor

• **new Expression**(`orm`, `expression`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `orm` | [`IOrm`](../interfaces/model.IOrm.md) |
| `expression` | `string` |

#### Defined in

[manager/expression.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/manager/expression.ts#L7)

## Properties

### expression

• **expression**: `string`

#### Defined in

[manager/expression.ts:6](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/manager/expression.ts#L6)

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

[manager/expression.ts:12](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/manager/expression.ts#L12)

___

### deserialize

▸ **deserialize**(`serialized`): `Promise`<[`Operand`](language.Operand.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `serialized` | `any` |

#### Returns

`Promise`<[`Operand`](language.Operand.md)\>

#### Defined in

[manager/expression.ts:32](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/manager/expression.ts#L32)

___

### execute

▸ **execute**(`context`, `database`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `any` |
| `database` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[manager/expression.ts:36](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/manager/expression.ts#L36)

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

[manager/expression.ts:17](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/manager/expression.ts#L17)

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

[manager/expression.ts:22](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/manager/expression.ts#L22)

___

### serialize

▸ **serialize**(`schemaName`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `schemaName` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[manager/expression.ts:27](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/manager/expression.ts#L27)
