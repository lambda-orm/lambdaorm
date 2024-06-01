[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / DialectService

# Interface: DialectService

## Properties

### format

> **format**: [`DialectFormat`](DialectFormat.md)

#### Source

[src/lib/language/domain/dialectService.ts:5](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/language/domain/dialectService.ts#L5)

***

### name

> **name**: `string`

#### Source

[src/lib/language/domain/dialectService.ts:4](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/language/domain/dialectService.ts#L4)

## Accessors

### solveComposite

> `get` **solveComposite**(): `boolean`

#### Returns

`boolean`

#### Source

[src/lib/language/domain/dialectService.ts:6](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/language/domain/dialectService.ts#L6)

## Methods

### dbType()

> **dbType**(`name`): `string`

#### Parameters

• **name**: `string`

#### Returns

`string`

#### Source

[src/lib/language/domain/dialectService.ts:14](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/language/domain/dialectService.ts#L14)

***

### ddl()

> **ddl**(`name`): `string`

#### Parameters

• **name**: `string`

#### Returns

`string`

#### Source

[src/lib/language/domain/dialectService.ts:13](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/language/domain/dialectService.ts#L13)

***

### delimiter()

> **delimiter**(`name`, `force`?, `excludeUnderscore`?): `string`

#### Parameters

• **name**: `string`

• **force?**: `boolean`

• **excludeUnderscore?**: `boolean`

#### Returns

`string`

#### Source

[src/lib/language/domain/dialectService.ts:16](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/language/domain/dialectService.ts#L16)

***

### dml()

> **dml**(`name`): `string`

#### Parameters

• **name**: `string`

#### Returns

`string`

#### Source

[src/lib/language/domain/dialectService.ts:11](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/language/domain/dialectService.ts#L11)

***

### function()

> **function**(`name`): `any`

#### Parameters

• **name**: `string`

#### Returns

`any`

#### Source

[src/lib/language/domain/dialectService.ts:9](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/language/domain/dialectService.ts#L9)

***

### getFunctionMetadata()

> **getFunctionMetadata**(`name`): `null` \| `string`

#### Parameters

• **name**: `string`

#### Returns

`null` \| `string`

#### Source

[src/lib/language/domain/dialectService.ts:19](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/language/domain/dialectService.ts#L19)

***

### getOperatorMetadata()

> **getOperatorMetadata**(`name`, `operands`): `null` \| `string`

#### Parameters

• **name**: `string`

• **operands**: `number`

#### Returns

`null` \| `string`

#### Source

[src/lib/language/domain/dialectService.ts:18](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/language/domain/dialectService.ts#L18)

***

### isReservedWord()

> **isReservedWord**(`name`): `boolean`

#### Parameters

• **name**: `string`

#### Returns

`boolean`

#### Source

[src/lib/language/domain/dialectService.ts:7](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/language/domain/dialectService.ts#L7)

***

### operator()

> **operator**(`name`, `operands`): `string`

#### Parameters

• **name**: `string`

• **operands**: `number`

#### Returns

`string`

#### Source

[src/lib/language/domain/dialectService.ts:8](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/language/domain/dialectService.ts#L8)

***

### other()

> **other**(`name`): `string`

#### Parameters

• **name**: `string`

#### Returns

`string`

#### Source

[src/lib/language/domain/dialectService.ts:12](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/language/domain/dialectService.ts#L12)

***

### string()

> **string**(`name`): `string`

#### Parameters

• **name**: `string`

#### Returns

`string`

#### Source

[src/lib/language/domain/dialectService.ts:17](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/language/domain/dialectService.ts#L17)

***

### support()

> **support**(`name`): `string`

#### Parameters

• **name**: `string`

#### Returns

`string`

#### Source

[src/lib/language/domain/dialectService.ts:10](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/language/domain/dialectService.ts#L10)

***

### type()

> **type**(`name`): `string`

#### Parameters

• **name**: `string`

#### Returns

`string`

#### Source

[src/lib/language/domain/dialectService.ts:15](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/language/domain/dialectService.ts#L15)
