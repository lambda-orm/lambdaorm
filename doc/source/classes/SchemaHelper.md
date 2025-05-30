[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / SchemaHelper

# Class: SchemaHelper

Defined in: node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:3

## Constructors

### Constructor

> **new SchemaHelper**(`str`): `SchemaHelper`

Defined in: node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:7

#### Parameters

##### str

`IStringHelper`

#### Returns

`SchemaHelper`

## Properties

### DEFAULT\_LENGTH

> `readonly` **DEFAULT\_LENGTH**: `80` = `80`

Defined in: node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:6

***

### DEFAULT\_TYPE

> `readonly` **DEFAULT\_TYPE**: `"string"` = `"string"`

Defined in: node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:5

## Methods

### capitalize()

> **capitalize**(`name`): `string`

Defined in: node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:13

#### Parameters

##### name

`string`

#### Returns

`string`

***

### entityName()

> **entityName**(`name`): `string`

Defined in: node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:10

#### Parameters

##### name

`string`

#### Returns

`string`

***

### equalName()

> **equalName**(`name1?`, `name2?`): `boolean`

Defined in: node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:9

#### Parameters

##### name1?

`string`

##### name2?

`string`

#### Returns

`boolean`

***

### getFk()

> **getFk**(`objType`): `undefined` \| `PropertyType`

Defined in: node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:18

#### Parameters

##### objType

`ObjType`

#### Returns

`undefined` \| `PropertyType`

***

### getKey()

> **getKey**(`uniques`): `undefined` \| `PropertyType`

Defined in: node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:19

#### Parameters

##### uniques

`PropertyType`[]

#### Returns

`undefined` \| `PropertyType`

***

### getPk()

> **getPk**(`objType`): `undefined` \| `PropertyType`

Defined in: node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:16

#### Parameters

##### objType

`ObjType`

#### Returns

`undefined` \| `PropertyType`

***

### getPkName()

> **getPkName**(`objType`): `string`

Defined in: node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:17

#### Parameters

##### objType

`ObjType`

#### Returns

`string`

***

### indexName()

> **indexName**(`name`): `string`

Defined in: node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:14

#### Parameters

##### name

`string`

#### Returns

`string`

***

### length()

> **length**(`length?`): `undefined` \| `number`

Defined in: node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:21

#### Parameters

##### length?

`number`

#### Returns

`undefined` \| `number`

***

### lengthFromType()

> **lengthFromType**(`type`): `undefined` \| `number`

Defined in: node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:22

#### Parameters

##### type

`Type`

#### Returns

`undefined` \| `number`

***

### newId()

> **newId**(): `string`

Defined in: node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:8

#### Returns

`string`

***

### propertyName()

> **propertyName**(`name`): `string`

Defined in: node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:11

#### Parameters

##### name

`string`

#### Returns

`string`

***

### refPropertyName()

> **refPropertyName**(`entityName`, `propertyName`): `string`

Defined in: node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:12

#### Parameters

##### entityName

`string`

##### propertyName

`string`

#### Returns

`string`

***

### relationName()

> **relationName**(`name`): `string`

Defined in: node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:15

#### Parameters

##### name

`string`

#### Returns

`string`

***

### type()

> **type**(`type?`, `length?`): `undefined` \| `string`

Defined in: node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:20

#### Parameters

##### type?

`string`

##### length?

`number`

#### Returns

`undefined` \| `string`
