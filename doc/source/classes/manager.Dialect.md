[Lambda ORM](../README.md) / [manager](../modules/manager.md) / Dialect

# Class: Dialect

[manager](../modules/manager.md).Dialect

## Table of contents

### Constructors

- [constructor](manager.Dialect.md#constructor)

### Properties

- [format](manager.Dialect.md#format)
- [name](manager.Dialect.md#name)

### Accessors

- [solveComposite](manager.Dialect.md#solvecomposite)

### Methods

- [ddl](manager.Dialect.md#ddl)
- [delimiter](manager.Dialect.md#delimiter)
- [dml](manager.Dialect.md#dml)
- [function](manager.Dialect.md#function)
- [getFunctionMetadata](manager.Dialect.md#getfunctionmetadata)
- [getOperatorMetadata](manager.Dialect.md#getoperatormetadata)
- [operator](manager.Dialect.md#operator)
- [other](manager.Dialect.md#other)
- [type](manager.Dialect.md#type)

## Constructors

### constructor

• **new Dialect**(`name`, `data`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `data` | `any` |

#### Defined in

[src/lib/manager/dialect.ts:12](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/dialect.ts#L12)

## Properties

### format

• **format**: [`DialectFormat`](../interfaces/model.DialectFormat.md)

#### Defined in

[src/lib/manager/dialect.ts:5](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/dialect.ts#L5)

___

### name

• **name**: `string`

#### Defined in

[src/lib/manager/dialect.ts:4](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/dialect.ts#L4)

## Accessors

### solveComposite

• `get` **solveComposite**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/lib/manager/dialect.ts:63](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/dialect.ts#L63)

## Methods

### ddl

▸ **ddl**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/manager/dialect.ts:83](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/dialect.ts#L83)

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

[src/lib/manager/dialect.ts:91](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/dialect.ts#L91)

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

[src/lib/manager/dialect.ts:75](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/dialect.ts#L75)

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

[src/lib/manager/dialect.ts:71](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/dialect.ts#L71)

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

[src/lib/manager/dialect.ts:111](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/dialect.ts#L111)

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

[src/lib/manager/dialect.ts:99](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/dialect.ts#L99)

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

[src/lib/manager/dialect.ts:67](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/dialect.ts#L67)

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

[src/lib/manager/dialect.ts:79](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/dialect.ts#L79)

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

[src/lib/manager/dialect.ts:87](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/dialect.ts#L87)
