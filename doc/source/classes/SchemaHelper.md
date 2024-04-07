[Lambda ORM](../README.md) / SchemaHelper

# Class: SchemaHelper

## Table of contents

### Constructors

- [constructor](SchemaHelper.md#constructor)

### Properties

- [DEFAULT\_LENGTH](SchemaHelper.md#default_length)
- [DEFAULT\_TYPE](SchemaHelper.md#default_type)

### Methods

- [capitalize](SchemaHelper.md#capitalize)
- [entityName](SchemaHelper.md#entityname)
- [equalName](SchemaHelper.md#equalname)
- [getFk](SchemaHelper.md#getfk)
- [getKey](SchemaHelper.md#getkey)
- [getPk](SchemaHelper.md#getpk)
- [getPkName](SchemaHelper.md#getpkname)
- [indexName](SchemaHelper.md#indexname)
- [length](SchemaHelper.md#length)
- [lengthFromType](SchemaHelper.md#lengthfromtype)
- [propertyName](SchemaHelper.md#propertyname)
- [refPropertyName](SchemaHelper.md#refpropertyname)
- [relationName](SchemaHelper.md#relationname)
- [type](SchemaHelper.md#type)
- [uuid](SchemaHelper.md#uuid)

## Constructors

### constructor

• **new SchemaHelper**(`str`): [`SchemaHelper`](SchemaHelper.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `IStringHelper` |

#### Returns

[`SchemaHelper`](SchemaHelper.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/services/helper.d.ts:7

## Properties

### DEFAULT\_LENGTH

• `Readonly` **DEFAULT\_LENGTH**: ``80``

#### Defined in

node_modules/lambdaorm-base/schema/application/services/helper.d.ts:6

___

### DEFAULT\_TYPE

• `Readonly` **DEFAULT\_TYPE**: ``"string"``

#### Defined in

node_modules/lambdaorm-base/schema/application/services/helper.d.ts:5

## Methods

### capitalize

▸ **capitalize**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/schema/application/services/helper.d.ts:13

___

### entityName

▸ **entityName**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/schema/application/services/helper.d.ts:10

___

### equalName

▸ **equalName**(`name1?`, `name2?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name1?` | `string` |
| `name2?` | `string` |

#### Returns

`boolean`

#### Defined in

node_modules/lambdaorm-base/schema/application/services/helper.d.ts:9

___

### getFk

▸ **getFk**(`objType`): `undefined` \| `PropertyType`

#### Parameters

| Name | Type |
| :------ | :------ |
| `objType` | `ObjType` |

#### Returns

`undefined` \| `PropertyType`

#### Defined in

node_modules/lambdaorm-base/schema/application/services/helper.d.ts:18

___

### getKey

▸ **getKey**(`uniques`): `undefined` \| `PropertyType`

#### Parameters

| Name | Type |
| :------ | :------ |
| `uniques` | `PropertyType`[] |

#### Returns

`undefined` \| `PropertyType`

#### Defined in

node_modules/lambdaorm-base/schema/application/services/helper.d.ts:19

___

### getPk

▸ **getPk**(`objType`): `undefined` \| `PropertyType`

#### Parameters

| Name | Type |
| :------ | :------ |
| `objType` | `ObjType` |

#### Returns

`undefined` \| `PropertyType`

#### Defined in

node_modules/lambdaorm-base/schema/application/services/helper.d.ts:16

___

### getPkName

▸ **getPkName**(`objType`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `objType` | `ObjType` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/schema/application/services/helper.d.ts:17

___

### indexName

▸ **indexName**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/schema/application/services/helper.d.ts:14

___

### length

▸ **length**(`length?`): `undefined` \| `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `length?` | `number` |

#### Returns

`undefined` \| `number`

#### Defined in

node_modules/lambdaorm-base/schema/application/services/helper.d.ts:21

___

### lengthFromType

▸ **lengthFromType**(`type`): `undefined` \| `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `Type` |

#### Returns

`undefined` \| `number`

#### Defined in

node_modules/lambdaorm-base/schema/application/services/helper.d.ts:22

___

### propertyName

▸ **propertyName**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/schema/application/services/helper.d.ts:11

___

### refPropertyName

▸ **refPropertyName**(`entityName`, `propertyName`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityName` | `string` |
| `propertyName` | `string` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/schema/application/services/helper.d.ts:12

___

### relationName

▸ **relationName**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/schema/application/services/helper.d.ts:15

___

### type

▸ **type**(`type?`, `length?`): `undefined` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type?` | `string` |
| `length?` | `number` |

#### Returns

`undefined` \| `string`

#### Defined in

node_modules/lambdaorm-base/schema/application/services/helper.d.ts:20

___

### uuid

▸ **uuid**(): `string`

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/schema/application/services/helper.d.ts:8
