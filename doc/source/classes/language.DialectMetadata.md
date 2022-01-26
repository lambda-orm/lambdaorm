[Lambda ORM](../README.md) / [language](../modules/language.md) / DialectMetadata

# Class: DialectMetadata

[language](../modules/language.md).DialectMetadata

## Table of contents

### Constructors

- [constructor](language.DialectMetadata.md#constructor)

### Properties

- [name](language.DialectMetadata.md#name)

### Methods

- [add](language.DialectMetadata.md#add)
- [ddl](language.DialectMetadata.md#ddl)
- [delimiter](language.DialectMetadata.md#delimiter)
- [dml](language.DialectMetadata.md#dml)
- [format](language.DialectMetadata.md#format)
- [function](language.DialectMetadata.md#function)
- [getFunctionMetadata](language.DialectMetadata.md#getfunctionmetadata)
- [getOperatorMetadata](language.DialectMetadata.md#getoperatormetadata)
- [operator](language.DialectMetadata.md#operator)
- [other](language.DialectMetadata.md#other)
- [solveDate](language.DialectMetadata.md#solvedate)
- [solveDateTime](language.DialectMetadata.md#solvedatetime)
- [solveTime](language.DialectMetadata.md#solvetime)
- [type](language.DialectMetadata.md#type)

## Constructors

### constructor

• **new DialectMetadata**(`name`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Defined in

[src/lib/language/dialectMetadata.ts:12](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/language/dialectMetadata.ts#L12)

## Properties

### name

• **name**: `string`

#### Defined in

[src/lib/language/dialectMetadata.ts:4](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/language/dialectMetadata.ts#L4)

## Methods

### add

▸ **add**(`dialect`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dialect` | `any` |

#### Returns

`void`

#### Defined in

[src/lib/language/dialectMetadata.ts:72](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/language/dialectMetadata.ts#L72)

___

### ddl

▸ **ddl**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/language/dialectMetadata.ts:39](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/language/dialectMetadata.ts#L39)

___

### delimiter

▸ **delimiter**(`name`, `force?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `force` | `boolean` | `false` |

#### Returns

`string`

#### Defined in

[src/lib/language/dialectMetadata.ts:51](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/language/dialectMetadata.ts#L51)

___

### dml

▸ **dml**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/language/dialectMetadata.ts:31](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/language/dialectMetadata.ts#L31)

___

### format

▸ **format**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/language/dialectMetadata.ts:47](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/language/dialectMetadata.ts#L47)

___

### function

▸ **function**(`name`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`any`

#### Defined in

[src/lib/language/dialectMetadata.ts:27](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/language/dialectMetadata.ts#L27)

___

### getFunctionMetadata

▸ **getFunctionMetadata**(`name`): ``null`` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

``null`` \| `string`

#### Defined in

[src/lib/language/dialectMetadata.ts:121](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/language/dialectMetadata.ts#L121)

___

### getOperatorMetadata

▸ **getOperatorMetadata**(`name`, `operands`): ``null`` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `operands` | `number` |

#### Returns

``null`` \| `string`

#### Defined in

[src/lib/language/dialectMetadata.ts:109](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/language/dialectMetadata.ts#L109)

___

### operator

▸ **operator**(`name`, `operands`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `operands` | `number` |

#### Returns

`string`

#### Defined in

[src/lib/language/dialectMetadata.ts:23](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/language/dialectMetadata.ts#L23)

___

### other

▸ **other**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/language/dialectMetadata.ts:35](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/language/dialectMetadata.ts#L35)

___

### solveDate

▸ **solveDate**(`value`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`string`

#### Defined in

[src/lib/language/dialectMetadata.ts:62](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/language/dialectMetadata.ts#L62)

___

### solveDateTime

▸ **solveDateTime**(`value`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`string`

#### Defined in

[src/lib/language/dialectMetadata.ts:57](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/language/dialectMetadata.ts#L57)

___

### solveTime

▸ **solveTime**(`value`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`string`

#### Defined in

[src/lib/language/dialectMetadata.ts:67](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/language/dialectMetadata.ts#L67)

___

### type

▸ **type**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/language/dialectMetadata.ts:43](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/language/dialectMetadata.ts#L43)
