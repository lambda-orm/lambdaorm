[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / SchemaHelper

# Class: SchemaHelper

## Constructors

### new SchemaHelper()

> **new SchemaHelper**(`str`): [`SchemaHelper`](SchemaHelper.md)

#### Parameters

• **str**: `IStringHelper`

#### Returns

[`SchemaHelper`](SchemaHelper.md)

#### Source

node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:7

## Properties

### DEFAULT\_LENGTH

> `readonly` **DEFAULT\_LENGTH**: `80` = `80`

#### Source

node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:6

***

### DEFAULT\_TYPE

> `readonly` **DEFAULT\_TYPE**: `"string"` = `"string"`

#### Source

node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:5

## Methods

### capitalize()

> **capitalize**(`name`): `string`

#### Parameters

• **name**: `string`

#### Returns

`string`

#### Source

node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:13

***

### entityName()

> **entityName**(`name`): `string`

#### Parameters

• **name**: `string`

#### Returns

`string`

#### Source

node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:10

***

### equalName()

> **equalName**(`name1`?, `name2`?): `boolean`

#### Parameters

• **name1?**: `string`

• **name2?**: `string`

#### Returns

`boolean`

#### Source

node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:9

***

### getFk()

> **getFk**(`objType`): `undefined` \| `PropertyType`

#### Parameters

• **objType**: `ObjType`

#### Returns

`undefined` \| `PropertyType`

#### Source

node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:18

***

### getKey()

> **getKey**(`uniques`): `undefined` \| `PropertyType`

#### Parameters

• **uniques**: `PropertyType`[]

#### Returns

`undefined` \| `PropertyType`

#### Source

node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:19

***

### getPk()

> **getPk**(`objType`): `undefined` \| `PropertyType`

#### Parameters

• **objType**: `ObjType`

#### Returns

`undefined` \| `PropertyType`

#### Source

node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:16

***

### getPkName()

> **getPkName**(`objType`): `string`

#### Parameters

• **objType**: `ObjType`

#### Returns

`string`

#### Source

node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:17

***

### indexName()

> **indexName**(`name`): `string`

#### Parameters

• **name**: `string`

#### Returns

`string`

#### Source

node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:14

***

### length()

> **length**(`length`?): `undefined` \| `number`

#### Parameters

• **length?**: `number`

#### Returns

`undefined` \| `number`

#### Source

node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:21

***

### lengthFromType()

> **lengthFromType**(`type`): `undefined` \| `number`

#### Parameters

• **type**: `Type`

#### Returns

`undefined` \| `number`

#### Source

node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:22

***

### newId()

> **newId**(): `string`

#### Returns

`string`

#### Source

node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:8

***

### propertyName()

> **propertyName**(`name`): `string`

#### Parameters

• **name**: `string`

#### Returns

`string`

#### Source

node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:11

***

### refPropertyName()

> **refPropertyName**(`entityName`, `propertyName`): `string`

#### Parameters

• **entityName**: `string`

• **propertyName**: `string`

#### Returns

`string`

#### Source

node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:12

***

### relationName()

> **relationName**(`name`): `string`

#### Parameters

• **name**: `string`

#### Returns

`string`

#### Source

node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:15

***

### type()

> **type**(`type`?, `length`?): `undefined` \| `string`

#### Parameters

• **type?**: `string`

• **length?**: `number`

#### Returns

`undefined` \| `string`

#### Source

node\_modules/lambdaorm-base/schema/infrastructure/schemaHelper.d.ts:20
