[Lambda ORM](../README.md) / [parser](../modules/parser.md) / ParserManager

# Class: ParserManager

[parser](../modules/parser.md).ParserManager

## Table of contents

### Constructors

- [constructor](parser.ParserManager.md#constructor)

### Properties

- [assigmentOperators](parser.ParserManager.md#assigmentoperators)
- [doubleOperators](parser.ParserManager.md#doubleoperators)
- [tripleOperators](parser.ParserManager.md#tripleoperators)

### Methods

- [deserialize](parser.ParserManager.md#deserialize)
- [getEnum](parser.ParserManager.md#getenum)
- [getEnumValue](parser.ParserManager.md#getenumvalue)
- [isEnum](parser.ParserManager.md#isenum)
- [minify](parser.ParserManager.md#minify)
- [parse](parser.ParserManager.md#parse)
- [priority](parser.ParserManager.md#priority)
- [refresh](parser.ParserManager.md#refresh)
- [serialize](parser.ParserManager.md#serialize)
- [setParent](parser.ParserManager.md#setparent)
- [toExpression](parser.ParserManager.md#toexpression)

## Constructors

### constructor

• **new ParserManager**(`model`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | [`Model`](parser.Model.md) |

#### Defined in

[parser/parserManager.ts:11](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/parser/parserManager.ts#L11)

## Properties

### assigmentOperators

• **assigmentOperators**: `string`[]

#### Defined in

[parser/parserManager.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/parser/parserManager.ts#L8)

___

### doubleOperators

• **doubleOperators**: `string`[]

#### Defined in

[parser/parserManager.ts:6](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/parser/parserManager.ts#L6)

___

### tripleOperators

• **tripleOperators**: `string`[]

#### Defined in

[parser/parserManager.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/parser/parserManager.ts#L7)

## Methods

### deserialize

▸ **deserialize**(`json`): [`Node`](parser.Node.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `any` |

#### Returns

[`Node`](parser.Node.md)

#### Defined in

[parser/parserManager.ts:145](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/parser/parserManager.ts#L145)

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

[parser/parserManager.ts:48](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/parser/parserManager.ts#L48)

___

### getEnumValue

▸ **getEnumValue**(`name`, `option`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `option` | `any` |

#### Returns

`any`

#### Defined in

[parser/parserManager.ts:44](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/parser/parserManager.ts#L44)

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

[parser/parserManager.ts:40](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/parser/parserManager.ts#L40)

___

### minify

▸ **minify**(`expression`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`string`[]

#### Defined in

[parser/parserManager.ts:170](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/parser/parserManager.ts#L170)

___

### parse

▸ **parse**(`expression`): [`Node`](parser.Node.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

[`Node`](parser.Node.md)

#### Defined in

[parser/parserManager.ts:52](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/parser/parserManager.ts#L52)

___

### priority

▸ **priority**(`name`, `cardinality?`): `any`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `cardinality` | `number` | `2` |

#### Returns

`any`

#### Defined in

[parser/parserManager.ts:31](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/parser/parserManager.ts#L31)

___

### refresh

▸ **refresh**(): `void`

#### Returns

`void`

#### Defined in

[parser/parserManager.ts:21](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/parser/parserManager.ts#L21)

___

### serialize

▸ **serialize**(`value`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Node`](parser.Node.md) |

#### Returns

`any`

#### Defined in

[parser/parserManager.ts:141](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/parser/parserManager.ts#L141)

___

### setParent

▸ **setParent**(`node`, `parent?`, `index?`): [`Node`](parser.Node.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `node` | [`Node`](parser.Node.md) | `undefined` |
| `parent?` | [`Node`](parser.Node.md) | `undefined` |
| `index` | `number` | `0` |

#### Returns

[`Node`](parser.Node.md)

#### Defined in

[parser/parserManager.ts:150](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/parser/parserManager.ts#L150)

___

### toExpression

▸ **toExpression**(`node`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Node`](parser.Node.md) |

#### Returns

`string`

#### Defined in

[parser/parserManager.ts:65](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/parser/parserManager.ts#L65)
