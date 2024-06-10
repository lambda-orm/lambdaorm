[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / DialectServiceImpl

# Class: DialectServiceImpl

## Implements

- [`DialectService`](../interfaces/DialectService.md)

## Constructors

### new DialectServiceImpl()

> **new DialectServiceImpl**(`name`, `data`): [`DialectServiceImpl`](DialectServiceImpl.md)

#### Parameters

• **name**: `string`

• **data**: `any`

#### Returns

[`DialectServiceImpl`](DialectServiceImpl.md)

#### Source

[src/lib/language/application/services/dialectService.ts:15](https://github.com/lambda-orm/lambdaorm/blob/cfdea01485e47d6bfb9f5073528259581c5e1563/src/lib/language/application/services/dialectService.ts#L15)

## Properties

### format

> **format**: [`DialectFormat`](../interfaces/DialectFormat.md)

#### Implementation of

[`DialectService`](../interfaces/DialectService.md).[`format`](../interfaces/DialectService.md#format)

#### Source

[src/lib/language/application/services/dialectService.ts:5](https://github.com/lambda-orm/lambdaorm/blob/cfdea01485e47d6bfb9f5073528259581c5e1563/src/lib/language/application/services/dialectService.ts#L5)

***

### name

> **name**: `string`

#### Implementation of

[`DialectService`](../interfaces/DialectService.md).[`name`](../interfaces/DialectService.md#name)

#### Source

[src/lib/language/application/services/dialectService.ts:4](https://github.com/lambda-orm/lambdaorm/blob/cfdea01485e47d6bfb9f5073528259581c5e1563/src/lib/language/application/services/dialectService.ts#L4)

## Accessors

### solveComposite

> `get` **solveComposite**(): `boolean`

#### Returns

`boolean`

#### Source

[src/lib/language/application/services/dialectService.ts:77](https://github.com/lambda-orm/lambdaorm/blob/cfdea01485e47d6bfb9f5073528259581c5e1563/src/lib/language/application/services/dialectService.ts#L77)

## Methods

### dbType()

> **dbType**(`name`): `string`

#### Parameters

• **name**: `string`

#### Returns

`string`

#### Implementation of

[`DialectService`](../interfaces/DialectService.md).[`dbType`](../interfaces/DialectService.md#dbtype)

#### Source

[src/lib/language/application/services/dialectService.ts:109](https://github.com/lambda-orm/lambdaorm/blob/cfdea01485e47d6bfb9f5073528259581c5e1563/src/lib/language/application/services/dialectService.ts#L109)

***

### ddl()

> **ddl**(`name`): `string`

#### Parameters

• **name**: `string`

#### Returns

`string`

#### Implementation of

[`DialectService`](../interfaces/DialectService.md).[`ddl`](../interfaces/DialectService.md#ddl)

#### Source

[src/lib/language/application/services/dialectService.ts:105](https://github.com/lambda-orm/lambdaorm/blob/cfdea01485e47d6bfb9f5073528259581c5e1563/src/lib/language/application/services/dialectService.ts#L105)

***

### delimiter()

> **delimiter**(`name`, `force`, `excludeUnderscore`): `string`

#### Parameters

• **name**: `string`

• **force**: `boolean`= `false`

• **excludeUnderscore**: `boolean`= `false`

#### Returns

`string`

#### Implementation of

[`DialectService`](../interfaces/DialectService.md).[`delimiter`](../interfaces/DialectService.md#delimiter)

#### Source

[src/lib/language/application/services/dialectService.ts:121](https://github.com/lambda-orm/lambdaorm/blob/cfdea01485e47d6bfb9f5073528259581c5e1563/src/lib/language/application/services/dialectService.ts#L121)

***

### dml()

> **dml**(`name`): `string`

#### Parameters

• **name**: `string`

#### Returns

`string`

#### Implementation of

[`DialectService`](../interfaces/DialectService.md).[`dml`](../interfaces/DialectService.md#dml)

#### Source

[src/lib/language/application/services/dialectService.ts:97](https://github.com/lambda-orm/lambdaorm/blob/cfdea01485e47d6bfb9f5073528259581c5e1563/src/lib/language/application/services/dialectService.ts#L97)

***

### function()

> **function**(`name`): `any`

#### Parameters

• **name**: `string`

#### Returns

`any`

#### Implementation of

[`DialectService`](../interfaces/DialectService.md).[`function`](../interfaces/DialectService.md#function)

#### Source

[src/lib/language/application/services/dialectService.ts:89](https://github.com/lambda-orm/lambdaorm/blob/cfdea01485e47d6bfb9f5073528259581c5e1563/src/lib/language/application/services/dialectService.ts#L89)

***

### getFunctionMetadata()

> **getFunctionMetadata**(`name`): `null` \| `string`

#### Parameters

• **name**: `string`

#### Returns

`null` \| `string`

#### Implementation of

[`DialectService`](../interfaces/DialectService.md).[`getFunctionMetadata`](../interfaces/DialectService.md#getfunctionmetadata)

#### Source

[src/lib/language/application/services/dialectService.ts:150](https://github.com/lambda-orm/lambdaorm/blob/cfdea01485e47d6bfb9f5073528259581c5e1563/src/lib/language/application/services/dialectService.ts#L150)

***

### getOperatorMetadata()

> **getOperatorMetadata**(`name`, `operands`): `null` \| `string`

#### Parameters

• **name**: `string`

• **operands**: `number`

#### Returns

`null` \| `string`

#### Implementation of

[`DialectService`](../interfaces/DialectService.md).[`getOperatorMetadata`](../interfaces/DialectService.md#getoperatormetadata)

#### Source

[src/lib/language/application/services/dialectService.ts:138](https://github.com/lambda-orm/lambdaorm/blob/cfdea01485e47d6bfb9f5073528259581c5e1563/src/lib/language/application/services/dialectService.ts#L138)

***

### isReservedWord()

> **isReservedWord**(`name`): `boolean`

#### Parameters

• **name**: `string`

#### Returns

`boolean`

#### Implementation of

[`DialectService`](../interfaces/DialectService.md).[`isReservedWord`](../interfaces/DialectService.md#isreservedword)

#### Source

[src/lib/language/application/services/dialectService.ts:81](https://github.com/lambda-orm/lambdaorm/blob/cfdea01485e47d6bfb9f5073528259581c5e1563/src/lib/language/application/services/dialectService.ts#L81)

***

### operator()

> **operator**(`name`, `operands`): `string`

#### Parameters

• **name**: `string`

• **operands**: `number`

#### Returns

`string`

#### Implementation of

[`DialectService`](../interfaces/DialectService.md).[`operator`](../interfaces/DialectService.md#operator)

#### Source

[src/lib/language/application/services/dialectService.ts:85](https://github.com/lambda-orm/lambdaorm/blob/cfdea01485e47d6bfb9f5073528259581c5e1563/src/lib/language/application/services/dialectService.ts#L85)

***

### other()

> **other**(`name`): `string`

#### Parameters

• **name**: `string`

#### Returns

`string`

#### Implementation of

[`DialectService`](../interfaces/DialectService.md).[`other`](../interfaces/DialectService.md#other)

#### Source

[src/lib/language/application/services/dialectService.ts:101](https://github.com/lambda-orm/lambdaorm/blob/cfdea01485e47d6bfb9f5073528259581c5e1563/src/lib/language/application/services/dialectService.ts#L101)

***

### string()

> **string**(`name`): `string`

#### Parameters

• **name**: `string`

#### Returns

`string`

#### Implementation of

[`DialectService`](../interfaces/DialectService.md).[`string`](../interfaces/DialectService.md#string)

#### Source

[src/lib/language/application/services/dialectService.ts:133](https://github.com/lambda-orm/lambdaorm/blob/cfdea01485e47d6bfb9f5073528259581c5e1563/src/lib/language/application/services/dialectService.ts#L133)

***

### support()

> **support**(`name`): `string`

#### Parameters

• **name**: `string`

#### Returns

`string`

#### Implementation of

[`DialectService`](../interfaces/DialectService.md).[`support`](../interfaces/DialectService.md#support)

#### Source

[src/lib/language/application/services/dialectService.ts:93](https://github.com/lambda-orm/lambdaorm/blob/cfdea01485e47d6bfb9f5073528259581c5e1563/src/lib/language/application/services/dialectService.ts#L93)

***

### type()

> **type**(`name`): `string`

#### Parameters

• **name**: `string`

#### Returns

`string`

#### Implementation of

[`DialectService`](../interfaces/DialectService.md).[`type`](../interfaces/DialectService.md#type)

#### Source

[src/lib/language/application/services/dialectService.ts:113](https://github.com/lambda-orm/lambdaorm/blob/cfdea01485e47d6bfb9f5073528259581c5e1563/src/lib/language/application/services/dialectService.ts#L113)
