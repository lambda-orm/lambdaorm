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
- [isReservedWord](DialectService.md#isreservedword)
- [operator](DialectService.md#operator)
- [other](DialectService.md#other)
- [string](DialectService.md#string)
- [support](DialectService.md#support)
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

[src/lib/language/application/services/dialectService.ts:15](https://github.com/lambda-orm/lambdaorm/blob/7c2a88327de4f968eecbd2fa893e92af74e120dc/src/lib/language/application/services/dialectService.ts#L15)

## Properties

### format

• **format**: [`DialectFormat`](../interfaces/DialectFormat.md)

#### Defined in

[src/lib/language/application/services/dialectService.ts:5](https://github.com/lambda-orm/lambdaorm/blob/7c2a88327de4f968eecbd2fa893e92af74e120dc/src/lib/language/application/services/dialectService.ts#L5)

___

### name

• **name**: `string`

#### Defined in

[src/lib/language/application/services/dialectService.ts:4](https://github.com/lambda-orm/lambdaorm/blob/7c2a88327de4f968eecbd2fa893e92af74e120dc/src/lib/language/application/services/dialectService.ts#L4)

## Accessors

### solveComposite

• `get` **solveComposite**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/lib/language/application/services/dialectService.ts:77](https://github.com/lambda-orm/lambdaorm/blob/7c2a88327de4f968eecbd2fa893e92af74e120dc/src/lib/language/application/services/dialectService.ts#L77)

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

[src/lib/language/application/services/dialectService.ts:109](https://github.com/lambda-orm/lambdaorm/blob/7c2a88327de4f968eecbd2fa893e92af74e120dc/src/lib/language/application/services/dialectService.ts#L109)

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

[src/lib/language/application/services/dialectService.ts:105](https://github.com/lambda-orm/lambdaorm/blob/7c2a88327de4f968eecbd2fa893e92af74e120dc/src/lib/language/application/services/dialectService.ts#L105)

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

[src/lib/language/application/services/dialectService.ts:121](https://github.com/lambda-orm/lambdaorm/blob/7c2a88327de4f968eecbd2fa893e92af74e120dc/src/lib/language/application/services/dialectService.ts#L121)

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

[src/lib/language/application/services/dialectService.ts:97](https://github.com/lambda-orm/lambdaorm/blob/7c2a88327de4f968eecbd2fa893e92af74e120dc/src/lib/language/application/services/dialectService.ts#L97)

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

[src/lib/language/application/services/dialectService.ts:89](https://github.com/lambda-orm/lambdaorm/blob/7c2a88327de4f968eecbd2fa893e92af74e120dc/src/lib/language/application/services/dialectService.ts#L89)

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

[src/lib/language/application/services/dialectService.ts:150](https://github.com/lambda-orm/lambdaorm/blob/7c2a88327de4f968eecbd2fa893e92af74e120dc/src/lib/language/application/services/dialectService.ts#L150)

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

[src/lib/language/application/services/dialectService.ts:138](https://github.com/lambda-orm/lambdaorm/blob/7c2a88327de4f968eecbd2fa893e92af74e120dc/src/lib/language/application/services/dialectService.ts#L138)

___

### isReservedWord

▸ **isReservedWord**(`name`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`boolean`

#### Defined in

[src/lib/language/application/services/dialectService.ts:81](https://github.com/lambda-orm/lambdaorm/blob/7c2a88327de4f968eecbd2fa893e92af74e120dc/src/lib/language/application/services/dialectService.ts#L81)

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

[src/lib/language/application/services/dialectService.ts:85](https://github.com/lambda-orm/lambdaorm/blob/7c2a88327de4f968eecbd2fa893e92af74e120dc/src/lib/language/application/services/dialectService.ts#L85)

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

[src/lib/language/application/services/dialectService.ts:101](https://github.com/lambda-orm/lambdaorm/blob/7c2a88327de4f968eecbd2fa893e92af74e120dc/src/lib/language/application/services/dialectService.ts#L101)

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

[src/lib/language/application/services/dialectService.ts:133](https://github.com/lambda-orm/lambdaorm/blob/7c2a88327de4f968eecbd2fa893e92af74e120dc/src/lib/language/application/services/dialectService.ts#L133)

___

### support

▸ **support**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/language/application/services/dialectService.ts:93](https://github.com/lambda-orm/lambdaorm/blob/7c2a88327de4f968eecbd2fa893e92af74e120dc/src/lib/language/application/services/dialectService.ts#L93)

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

[src/lib/language/application/services/dialectService.ts:113](https://github.com/lambda-orm/lambdaorm/blob/7c2a88327de4f968eecbd2fa893e92af74e120dc/src/lib/language/application/services/dialectService.ts#L113)
