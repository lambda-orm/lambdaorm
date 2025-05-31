[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / DialectServiceImpl

# Class: DialectServiceImpl

Defined in: [src/lib/language/application/services/dialectService.ts:3](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/application/services/dialectService.ts#L3)

## Implements

- [`DialectService`](../interfaces/DialectService.md)

## Constructors

### Constructor

> **new DialectServiceImpl**(`name`, `data`): `DialectServiceImpl`

Defined in: [src/lib/language/application/services/dialectService.ts:15](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/application/services/dialectService.ts#L15)

#### Parameters

##### name

`string`

##### data

`any`

#### Returns

`DialectServiceImpl`

## Properties

### format

> **format**: [`DialectFormat`](../interfaces/DialectFormat.md)

Defined in: [src/lib/language/application/services/dialectService.ts:5](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/application/services/dialectService.ts#L5)

#### Implementation of

[`DialectService`](../interfaces/DialectService.md).[`format`](../interfaces/DialectService.md#format)

***

### name

> **name**: `string`

Defined in: [src/lib/language/application/services/dialectService.ts:4](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/application/services/dialectService.ts#L4)

#### Implementation of

[`DialectService`](../interfaces/DialectService.md).[`name`](../interfaces/DialectService.md#name)

## Accessors

### solveComposite

#### Get Signature

> **get** **solveComposite**(): `boolean`

Defined in: [src/lib/language/application/services/dialectService.ts:77](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/application/services/dialectService.ts#L77)

##### Returns

`boolean`

#### Implementation of

[`DialectService`](../interfaces/DialectService.md).[`solveComposite`](../interfaces/DialectService.md#solvecomposite)

## Methods

### dbType()

> **dbType**(`name`): `string`

Defined in: [src/lib/language/application/services/dialectService.ts:109](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/application/services/dialectService.ts#L109)

#### Parameters

##### name

`string`

#### Returns

`string`

#### Implementation of

[`DialectService`](../interfaces/DialectService.md).[`dbType`](../interfaces/DialectService.md#dbtype)

***

### ddl()

> **ddl**(`name`): `string`

Defined in: [src/lib/language/application/services/dialectService.ts:105](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/application/services/dialectService.ts#L105)

#### Parameters

##### name

`string`

#### Returns

`string`

#### Implementation of

[`DialectService`](../interfaces/DialectService.md).[`ddl`](../interfaces/DialectService.md#ddl)

***

### delimiter()

> **delimiter**(`name`, `force`, `excludeUnderscore`): `string`

Defined in: [src/lib/language/application/services/dialectService.ts:121](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/application/services/dialectService.ts#L121)

#### Parameters

##### name

`string`

##### force

`boolean` = `false`

##### excludeUnderscore

`boolean` = `false`

#### Returns

`string`

#### Implementation of

[`DialectService`](../interfaces/DialectService.md).[`delimiter`](../interfaces/DialectService.md#delimiter)

***

### dml()

> **dml**(`name`): `string`

Defined in: [src/lib/language/application/services/dialectService.ts:97](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/application/services/dialectService.ts#L97)

#### Parameters

##### name

`string`

#### Returns

`string`

#### Implementation of

[`DialectService`](../interfaces/DialectService.md).[`dml`](../interfaces/DialectService.md#dml)

***

### function()

> **function**(`name`): `any`

Defined in: [src/lib/language/application/services/dialectService.ts:89](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/application/services/dialectService.ts#L89)

#### Parameters

##### name

`string`

#### Returns

`any`

#### Implementation of

[`DialectService`](../interfaces/DialectService.md).[`function`](../interfaces/DialectService.md#function)

***

### getFunctionMetadata()

> **getFunctionMetadata**(`name`): `null` \| `string`

Defined in: [src/lib/language/application/services/dialectService.ts:150](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/application/services/dialectService.ts#L150)

#### Parameters

##### name

`string`

#### Returns

`null` \| `string`

#### Implementation of

[`DialectService`](../interfaces/DialectService.md).[`getFunctionMetadata`](../interfaces/DialectService.md#getfunctionmetadata)

***

### getOperatorMetadata()

> **getOperatorMetadata**(`name`, `operands`): `null` \| `string`

Defined in: [src/lib/language/application/services/dialectService.ts:138](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/application/services/dialectService.ts#L138)

#### Parameters

##### name

`string`

##### operands

`number`

#### Returns

`null` \| `string`

#### Implementation of

[`DialectService`](../interfaces/DialectService.md).[`getOperatorMetadata`](../interfaces/DialectService.md#getoperatormetadata)

***

### isReservedWord()

> **isReservedWord**(`name`): `boolean`

Defined in: [src/lib/language/application/services/dialectService.ts:81](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/application/services/dialectService.ts#L81)

#### Parameters

##### name

`string`

#### Returns

`boolean`

#### Implementation of

[`DialectService`](../interfaces/DialectService.md).[`isReservedWord`](../interfaces/DialectService.md#isreservedword)

***

### operator()

> **operator**(`name`, `operands`): `string`

Defined in: [src/lib/language/application/services/dialectService.ts:85](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/application/services/dialectService.ts#L85)

#### Parameters

##### name

`string`

##### operands

`number`

#### Returns

`string`

#### Implementation of

[`DialectService`](../interfaces/DialectService.md).[`operator`](../interfaces/DialectService.md#operator)

***

### other()

> **other**(`name`): `string`

Defined in: [src/lib/language/application/services/dialectService.ts:101](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/application/services/dialectService.ts#L101)

#### Parameters

##### name

`string`

#### Returns

`string`

#### Implementation of

[`DialectService`](../interfaces/DialectService.md).[`other`](../interfaces/DialectService.md#other)

***

### string()

> **string**(`name`): `string`

Defined in: [src/lib/language/application/services/dialectService.ts:133](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/application/services/dialectService.ts#L133)

#### Parameters

##### name

`string`

#### Returns

`string`

#### Implementation of

[`DialectService`](../interfaces/DialectService.md).[`string`](../interfaces/DialectService.md#string)

***

### support()

> **support**(`name`): `string`

Defined in: [src/lib/language/application/services/dialectService.ts:93](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/application/services/dialectService.ts#L93)

#### Parameters

##### name

`string`

#### Returns

`string`

#### Implementation of

[`DialectService`](../interfaces/DialectService.md).[`support`](../interfaces/DialectService.md#support)

***

### type()

> **type**(`name`): `string`

Defined in: [src/lib/language/application/services/dialectService.ts:113](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/application/services/dialectService.ts#L113)

#### Parameters

##### name

`string`

#### Returns

`string`

#### Implementation of

[`DialectService`](../interfaces/DialectService.md).[`type`](../interfaces/DialectService.md#type)
