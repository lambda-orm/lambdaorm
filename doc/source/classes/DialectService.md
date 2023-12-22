[Lambda ORM](../README.md) / DialectService

# Class: DialectService

## Table of contents

### Constructors

- [constructor](DialectService.md#constructor)

### Properties

- [format](DialectService.md#format)
- [name](DialectService.md#name)

### Accessors

- [solveComposite](DialectService.md#solvecomposite)

### Methods

- [ddl](DialectService.md#ddl)
- [delimiter](DialectService.md#delimiter)
- [dml](DialectService.md#dml)
- [function](DialectService.md#function)
- [getFunctionMetadata](DialectService.md#getfunctionmetadata)
- [getOperatorMetadata](DialectService.md#getoperatormetadata)
- [operator](DialectService.md#operator)
- [other](DialectService.md#other)
- [type](DialectService.md#type)

## Constructors

### constructor

• **new DialectService**(`name`, `data`): [`DialectService`](DialectService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `data` | `any` |

#### Returns

[`DialectService`](DialectService.md)

#### Defined in

[src/lib/language/application/services/dialectService.ts:12](https://github.com/FlavioLionelRita/lambdaorm/blob/930a03b3/src/lib/language/application/services/dialectService.ts#L12)

## Properties

### format

• **format**: [`DialectFormat`](../interfaces/DialectFormat.md)

#### Defined in

[src/lib/language/application/services/dialectService.ts:5](https://github.com/FlavioLionelRita/lambdaorm/blob/930a03b3/src/lib/language/application/services/dialectService.ts#L5)

___

### name

• **name**: `string`

#### Defined in

[src/lib/language/application/services/dialectService.ts:4](https://github.com/FlavioLionelRita/lambdaorm/blob/930a03b3/src/lib/language/application/services/dialectService.ts#L4)

## Accessors

### solveComposite

• `get` **solveComposite**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/lib/language/application/services/dialectService.ts:63](https://github.com/FlavioLionelRita/lambdaorm/blob/930a03b3/src/lib/language/application/services/dialectService.ts#L63)

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

[src/lib/language/application/services/dialectService.ts:83](https://github.com/FlavioLionelRita/lambdaorm/blob/930a03b3/src/lib/language/application/services/dialectService.ts#L83)

___

### delimiter

▸ **delimiter**(`name`, `force?`, `excludeUnderscore?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `force` | `boolean` | `false` |
| `excludeUnderscore` | `boolean` | `false` |

#### Returns

`string`

#### Defined in

[src/lib/language/application/services/dialectService.ts:91](https://github.com/FlavioLionelRita/lambdaorm/blob/930a03b3/src/lib/language/application/services/dialectService.ts#L91)

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

[src/lib/language/application/services/dialectService.ts:75](https://github.com/FlavioLionelRita/lambdaorm/blob/930a03b3/src/lib/language/application/services/dialectService.ts#L75)

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

[src/lib/language/application/services/dialectService.ts:71](https://github.com/FlavioLionelRita/lambdaorm/blob/930a03b3/src/lib/language/application/services/dialectService.ts#L71)

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

[src/lib/language/application/services/dialectService.ts:111](https://github.com/FlavioLionelRita/lambdaorm/blob/930a03b3/src/lib/language/application/services/dialectService.ts#L111)

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

[src/lib/language/application/services/dialectService.ts:99](https://github.com/FlavioLionelRita/lambdaorm/blob/930a03b3/src/lib/language/application/services/dialectService.ts#L99)

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

[src/lib/language/application/services/dialectService.ts:67](https://github.com/FlavioLionelRita/lambdaorm/blob/930a03b3/src/lib/language/application/services/dialectService.ts#L67)

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

[src/lib/language/application/services/dialectService.ts:79](https://github.com/FlavioLionelRita/lambdaorm/blob/930a03b3/src/lib/language/application/services/dialectService.ts#L79)

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

[src/lib/language/application/services/dialectService.ts:87](https://github.com/FlavioLionelRita/lambdaorm/blob/930a03b3/src/lib/language/application/services/dialectService.ts#L87)
