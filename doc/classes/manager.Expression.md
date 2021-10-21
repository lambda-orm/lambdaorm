[Lambda ORM](../README.md) / [manager](../modules/manager.md) / Expression

# Class: Expression

[manager](../modules/manager.md).Expression

Expression Manager

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

[manager/expression.ts:10](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/manager/expression.ts#L10)

## Properties

### expression

• **expression**: `string`

#### Defined in

[manager/expression.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/manager/expression.ts#L9)

## Methods

### complete

▸ **complete**(`schema`): `string`

Complete expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `schema` | `string` | Schema name |

#### Returns

`string`

Expression complete

#### Defined in

[manager/expression.ts:20](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/manager/expression.ts#L20)

___

### execute

▸ **execute**(`context?`, `database?`): `Promise`<`any`\>

Execute expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context` | `any` | Context with variables |
| `database?` | `string` | Database name |

#### Returns

`Promise`<`any`\>

Result of execution

#### Defined in

[manager/expression.ts:72](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/manager/expression.ts#L72)

___

### metadata

▸ **metadata**(`schema`): `Promise`<`any`\>

Get metadata of expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `schema` | `string` | Schema name |

#### Returns

`Promise`<`any`\>

metadata of expression

#### Defined in

[manager/expression.ts:61](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/manager/expression.ts#L61)

___

### model

▸ **model**(`schema`): `Promise`<`any`\>

Get model of expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `schema` | `string` | Schema name |

#### Returns

`Promise`<`any`\>

Model of expression

#### Defined in

[manager/expression.ts:30](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/manager/expression.ts#L30)

___

### parameters

▸ **parameters**(`schema`): `Promise`<`any`\>

Get parameters of expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `schema` | `string` | Schema name |

#### Returns

`Promise`<`any`\>

Parameters of expression

#### Defined in

[manager/expression.ts:40](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/manager/expression.ts#L40)

___

### sentence

▸ **sentence**(`dialect`, `schema`): `Promise`<`string`\>

Get sentence of expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dialect` | `string` | Dialect name |
| `schema` | `string` | Schema name |

#### Returns

`Promise`<`string`\>

Sentence of expression

#### Defined in

[manager/expression.ts:51](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/manager/expression.ts#L51)
