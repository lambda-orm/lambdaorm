[Lambda ORM](../README.md) / [parser](../modules/parser.md) / Model

# Class: Model

[parser](../modules/parser.md).Model

## Table of contents

### Constructors

- [constructor](parser.Model.md#constructor)

### Properties

- [enums](parser.Model.md#enums)
- [functions](parser.Model.md#functions)
- [operators](parser.Model.md#operators)

### Methods

- [addEnum](parser.Model.md#addenum)
- [addFunction](parser.Model.md#addfunction)
- [addOperator](parser.Model.md#addoperator)
- [getEnum](parser.Model.md#getenum)
- [getEnumValue](parser.Model.md#getenumvalue)
- [getFunction](parser.Model.md#getfunction)
- [getOperator](parser.Model.md#getoperator)
- [isEnum](parser.Model.md#isenum)
- [load](parser.Model.md#load)

## Constructors

### constructor

• **new Model**()

#### Defined in

[parser/model.ts:5](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/parser/model.ts#L5)

## Properties

### enums

• **enums**: `any`

#### Defined in

[parser/model.ts:3](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/parser/model.ts#L3)

___

### functions

• **functions**: `any`

#### Defined in

[parser/model.ts:4](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/parser/model.ts#L4)

___

### operators

• **operators**: `any`

#### Defined in

[parser/model.ts:2](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/parser/model.ts#L2)

## Methods

### addEnum

▸ **addEnum**(`key`, `source`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `source` | `any` |

#### Returns

`void`

#### Defined in

[parser/model.ts:11](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/parser/model.ts#L11)

___

### addFunction

▸ **addFunction**(`name`, `metadata`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `metadata` | `any` |

#### Returns

`void`

#### Defined in

[parser/model.ts:50](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/parser/model.ts#L50)

___

### addOperator

▸ **addOperator**(`name`, `operands`, `metadata`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `operands` | `number` |
| `metadata` | `any` |

#### Returns

`void`

#### Defined in

[parser/model.ts:28](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/parser/model.ts#L28)

___

### getEnum

▸ **getEnum**(`name`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`any`

#### Defined in

[parser/model.ts:24](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/parser/model.ts#L24)

___

### getEnumValue

▸ **getEnumValue**(`name`, `option`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `option` | `string` |

#### Returns

`any`

#### Defined in

[parser/model.ts:20](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/parser/model.ts#L20)

___

### getFunction

▸ **getFunction**(`name`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`any`

#### Defined in

[parser/model.ts:66](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/parser/model.ts#L66)

___

### getOperator

▸ **getOperator**(`name`, `operands`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `operands` | `number` |

#### Returns

`any`

#### Defined in

[parser/model.ts:54](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/parser/model.ts#L54)

___

### isEnum

▸ **isEnum**(`name`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`boolean`

#### Defined in

[parser/model.ts:15](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/parser/model.ts#L15)

___

### load

▸ **load**(`data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |

#### Returns

`void`

#### Defined in

[parser/model.ts:33](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/parser/model.ts#L33)
