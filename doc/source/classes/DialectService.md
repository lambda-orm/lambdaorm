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

- [dbType](DialectService.md#dbtype)
- [ddl](DialectService.md#ddl)
- [delimiter](DialectService.md#delimiter)
- [dml](DialectService.md#dml)
- [function](DialectService.md#function)
- [getFunctionMetadata](DialectService.md#getfunctionmetadata)
- [getOperatorMetadata](DialectService.md#getoperatormetadata)
- [operator](DialectService.md#operator)
- [other](DialectService.md#other)
- [string](DialectService.md#string)
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

[src/lib/language/application/services/dialectService.ts:13](https://github.com/lambda-orm/lambdaorm/blob/cce4c9e7/src/lib/language/application/services/dialectService.ts#L13)

## Properties

### format

• **format**: [`DialectFormat`](../interfaces/DialectFormat.md)

#### Defined in

[src/lib/language/application/services/dialectService.ts:5](https://github.com/lambda-orm/lambdaorm/blob/cce4c9e7/src/lib/language/application/services/dialectService.ts#L5)

___

### name

• **name**: `string`

#### Defined in

[src/lib/language/application/services/dialectService.ts:4](https://github.com/lambda-orm/lambdaorm/blob/cce4c9e7/src/lib/language/application/services/dialectService.ts#L4)

## Accessors

### solveComposite

• `get` **solveComposite**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/lib/language/application/services/dialectService.ts:68](https://github.com/lambda-orm/lambdaorm/blob/cce4c9e7/src/lib/language/application/services/dialectService.ts#L68)

## Methods

### dbType

▸ **dbType**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/language/application/services/dialectService.ts:92](https://github.com/lambda-orm/lambdaorm/blob/cce4c9e7/src/lib/language/application/services/dialectService.ts#L92)

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

[src/lib/language/application/services/dialectService.ts:88](https://github.com/lambda-orm/lambdaorm/blob/cce4c9e7/src/lib/language/application/services/dialectService.ts#L88)

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

[src/lib/language/application/services/dialectService.ts:100](https://github.com/lambda-orm/lambdaorm/blob/cce4c9e7/src/lib/language/application/services/dialectService.ts#L100)

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

[src/lib/language/application/services/dialectService.ts:80](https://github.com/lambda-orm/lambdaorm/blob/cce4c9e7/src/lib/language/application/services/dialectService.ts#L80)

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

[src/lib/language/application/services/dialectService.ts:76](https://github.com/lambda-orm/lambdaorm/blob/cce4c9e7/src/lib/language/application/services/dialectService.ts#L76)

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

[src/lib/language/application/services/dialectService.ts:125](https://github.com/lambda-orm/lambdaorm/blob/cce4c9e7/src/lib/language/application/services/dialectService.ts#L125)

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

[src/lib/language/application/services/dialectService.ts:113](https://github.com/lambda-orm/lambdaorm/blob/cce4c9e7/src/lib/language/application/services/dialectService.ts#L113)

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

[src/lib/language/application/services/dialectService.ts:72](https://github.com/lambda-orm/lambdaorm/blob/cce4c9e7/src/lib/language/application/services/dialectService.ts#L72)

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

[src/lib/language/application/services/dialectService.ts:84](https://github.com/lambda-orm/lambdaorm/blob/cce4c9e7/src/lib/language/application/services/dialectService.ts#L84)

___

### string

▸ **string**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/language/application/services/dialectService.ts:108](https://github.com/lambda-orm/lambdaorm/blob/cce4c9e7/src/lib/language/application/services/dialectService.ts#L108)

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

[src/lib/language/application/services/dialectService.ts:96](https://github.com/lambda-orm/lambdaorm/blob/cce4c9e7/src/lib/language/application/services/dialectService.ts#L96)
