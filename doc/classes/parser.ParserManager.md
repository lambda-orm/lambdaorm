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

[parser/parserManager.ts:10](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/parser/parserManager.ts#L10)

## Properties

### assigmentOperators

• **assigmentOperators**: `string`[]

#### Defined in

[parser/parserManager.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/parser/parserManager.ts#L7)

___

### doubleOperators

• **doubleOperators**: `string`[]

#### Defined in

[parser/parserManager.ts:5](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/parser/parserManager.ts#L5)

___

### tripleOperators

• **tripleOperators**: `string`[]

#### Defined in

[parser/parserManager.ts:6](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/parser/parserManager.ts#L6)

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

[parser/parserManager.ts:144](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/parser/parserManager.ts#L144)

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

[parser/parserManager.ts:47](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/parser/parserManager.ts#L47)

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

[parser/parserManager.ts:43](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/parser/parserManager.ts#L43)

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

[parser/parserManager.ts:39](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/parser/parserManager.ts#L39)

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

[parser/parserManager.ts:169](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/parser/parserManager.ts#L169)

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

[parser/parserManager.ts:51](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/parser/parserManager.ts#L51)

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

[parser/parserManager.ts:30](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/parser/parserManager.ts#L30)

___

### refresh

▸ **refresh**(): `void`

#### Returns

`void`

#### Defined in

[parser/parserManager.ts:20](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/parser/parserManager.ts#L20)

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

[parser/parserManager.ts:140](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/parser/parserManager.ts#L140)

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

[parser/parserManager.ts:149](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/parser/parserManager.ts#L149)

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

[parser/parserManager.ts:64](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/parser/parserManager.ts#L64)
