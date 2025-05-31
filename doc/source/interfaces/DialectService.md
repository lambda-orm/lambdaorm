[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / DialectService

# Interface: DialectService

Defined in: [src/lib/language/domain/dialectService.ts:3](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/dialectService.ts#L3)

## Properties

### format

> **format**: [`DialectFormat`](DialectFormat.md)

Defined in: [src/lib/language/domain/dialectService.ts:5](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/dialectService.ts#L5)

***

### name

> **name**: `string`

Defined in: [src/lib/language/domain/dialectService.ts:4](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/dialectService.ts#L4)

## Accessors

### solveComposite

#### Get Signature

> **get** **solveComposite**(): `boolean`

Defined in: [src/lib/language/domain/dialectService.ts:6](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/dialectService.ts#L6)

##### Returns

`boolean`

## Methods

### dbType()

> **dbType**(`name`): `string`

Defined in: [src/lib/language/domain/dialectService.ts:14](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/dialectService.ts#L14)

#### Parameters

##### name

`string`

#### Returns

`string`

***

### ddl()

> **ddl**(`name`): `string`

Defined in: [src/lib/language/domain/dialectService.ts:13](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/dialectService.ts#L13)

#### Parameters

##### name

`string`

#### Returns

`string`

***

### delimiter()

> **delimiter**(`name`, `force?`, `excludeUnderscore?`): `string`

Defined in: [src/lib/language/domain/dialectService.ts:16](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/dialectService.ts#L16)

#### Parameters

##### name

`string`

##### force?

`boolean`

##### excludeUnderscore?

`boolean`

#### Returns

`string`

***

### dml()

> **dml**(`name`): `string`

Defined in: [src/lib/language/domain/dialectService.ts:11](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/dialectService.ts#L11)

#### Parameters

##### name

`string`

#### Returns

`string`

***

### function()

> **function**(`name`): `any`

Defined in: [src/lib/language/domain/dialectService.ts:9](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/dialectService.ts#L9)

#### Parameters

##### name

`string`

#### Returns

`any`

***

### getFunctionMetadata()

> **getFunctionMetadata**(`name`): `null` \| `string`

Defined in: [src/lib/language/domain/dialectService.ts:19](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/dialectService.ts#L19)

#### Parameters

##### name

`string`

#### Returns

`null` \| `string`

***

### getOperatorMetadata()

> **getOperatorMetadata**(`name`, `operands`): `null` \| `string`

Defined in: [src/lib/language/domain/dialectService.ts:18](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/dialectService.ts#L18)

#### Parameters

##### name

`string`

##### operands

`number`

#### Returns

`null` \| `string`

***

### isReservedWord()

> **isReservedWord**(`name`): `boolean`

Defined in: [src/lib/language/domain/dialectService.ts:7](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/dialectService.ts#L7)

#### Parameters

##### name

`string`

#### Returns

`boolean`

***

### operator()

> **operator**(`name`, `operands`): `string`

Defined in: [src/lib/language/domain/dialectService.ts:8](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/dialectService.ts#L8)

#### Parameters

##### name

`string`

##### operands

`number`

#### Returns

`string`

***

### other()

> **other**(`name`): `string`

Defined in: [src/lib/language/domain/dialectService.ts:12](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/dialectService.ts#L12)

#### Parameters

##### name

`string`

#### Returns

`string`

***

### string()

> **string**(`name`): `string`

Defined in: [src/lib/language/domain/dialectService.ts:17](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/dialectService.ts#L17)

#### Parameters

##### name

`string`

#### Returns

`string`

***

### support()

> **support**(`name`): `string`

Defined in: [src/lib/language/domain/dialectService.ts:10](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/dialectService.ts#L10)

#### Parameters

##### name

`string`

#### Returns

`string`

***

### type()

> **type**(`name`): `string`

Defined in: [src/lib/language/domain/dialectService.ts:15](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/dialectService.ts#L15)

#### Parameters

##### name

`string`

#### Returns

`string`
