[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / DialectService

# Class: DialectService

## Constructors

### new DialectService()

> **new DialectService**(`name`, `data`): [`DialectService`](DialectService.md)

#### Parameters

• **name**: `string`

• **data**: `any`

#### Returns

[`DialectService`](DialectService.md)

#### Source

[src/lib/language/application/services/dialectService.ts:15](https://github.com/lambda-orm/lambdaorm/blob/b5545097c371addc7799ba0f29b9e8204e97d347/src/lib/language/application/services/dialectService.ts#L15)

## Properties

### format

> **format**: [`DialectFormat`](../interfaces/DialectFormat.md)

#### Source

[src/lib/language/application/services/dialectService.ts:5](https://github.com/lambda-orm/lambdaorm/blob/b5545097c371addc7799ba0f29b9e8204e97d347/src/lib/language/application/services/dialectService.ts#L5)

***

### name

> **name**: `string`

#### Source

[src/lib/language/application/services/dialectService.ts:4](https://github.com/lambda-orm/lambdaorm/blob/b5545097c371addc7799ba0f29b9e8204e97d347/src/lib/language/application/services/dialectService.ts#L4)

## Accessors

### solveComposite

> `get` **solveComposite**(): `boolean`

#### Returns

`boolean`

#### Source

[src/lib/language/application/services/dialectService.ts:77](https://github.com/lambda-orm/lambdaorm/blob/b5545097c371addc7799ba0f29b9e8204e97d347/src/lib/language/application/services/dialectService.ts#L77)

## Methods

### dbType()

> **dbType**(`name`): `string`

#### Parameters

• **name**: `string`

#### Returns

`string`

#### Source

[src/lib/language/application/services/dialectService.ts:109](https://github.com/lambda-orm/lambdaorm/blob/b5545097c371addc7799ba0f29b9e8204e97d347/src/lib/language/application/services/dialectService.ts#L109)

***

### ddl()

> **ddl**(`name`): `string`

#### Parameters

• **name**: `string`

#### Returns

`string`

#### Source

[src/lib/language/application/services/dialectService.ts:105](https://github.com/lambda-orm/lambdaorm/blob/b5545097c371addc7799ba0f29b9e8204e97d347/src/lib/language/application/services/dialectService.ts#L105)

***

### delimiter()

> **delimiter**(`name`, `force`, `excludeUnderscore`): `string`

#### Parameters

• **name**: `string`

• **force**: `boolean`= `false`

• **excludeUnderscore**: `boolean`= `false`

#### Returns

`string`

#### Source

[src/lib/language/application/services/dialectService.ts:121](https://github.com/lambda-orm/lambdaorm/blob/b5545097c371addc7799ba0f29b9e8204e97d347/src/lib/language/application/services/dialectService.ts#L121)

***

### dml()

> **dml**(`name`): `string`

#### Parameters

• **name**: `string`

#### Returns

`string`

#### Source

[src/lib/language/application/services/dialectService.ts:97](https://github.com/lambda-orm/lambdaorm/blob/b5545097c371addc7799ba0f29b9e8204e97d347/src/lib/language/application/services/dialectService.ts#L97)

***

### function()

> **function**(`name`): `any`

#### Parameters

• **name**: `string`

#### Returns

`any`

#### Source

[src/lib/language/application/services/dialectService.ts:89](https://github.com/lambda-orm/lambdaorm/blob/b5545097c371addc7799ba0f29b9e8204e97d347/src/lib/language/application/services/dialectService.ts#L89)

***

### getFunctionMetadata()

> **getFunctionMetadata**(`name`): `null` \| `string`

#### Parameters

• **name**: `string`

#### Returns

`null` \| `string`

#### Source

[src/lib/language/application/services/dialectService.ts:150](https://github.com/lambda-orm/lambdaorm/blob/b5545097c371addc7799ba0f29b9e8204e97d347/src/lib/language/application/services/dialectService.ts#L150)

***

### getOperatorMetadata()

> **getOperatorMetadata**(`name`, `operands`): `null` \| `string`

#### Parameters

• **name**: `string`

• **operands**: `number`

#### Returns

`null` \| `string`

#### Source

[src/lib/language/application/services/dialectService.ts:138](https://github.com/lambda-orm/lambdaorm/blob/b5545097c371addc7799ba0f29b9e8204e97d347/src/lib/language/application/services/dialectService.ts#L138)

***

### isReservedWord()

> **isReservedWord**(`name`): `boolean`

#### Parameters

• **name**: `string`

#### Returns

`boolean`

#### Source

[src/lib/language/application/services/dialectService.ts:81](https://github.com/lambda-orm/lambdaorm/blob/b5545097c371addc7799ba0f29b9e8204e97d347/src/lib/language/application/services/dialectService.ts#L81)

***

### operator()

> **operator**(`name`, `operands`): `string`

#### Parameters

• **name**: `string`

• **operands**: `number`

#### Returns

`string`

#### Source

[src/lib/language/application/services/dialectService.ts:85](https://github.com/lambda-orm/lambdaorm/blob/b5545097c371addc7799ba0f29b9e8204e97d347/src/lib/language/application/services/dialectService.ts#L85)

***

### other()

> **other**(`name`): `string`

#### Parameters

• **name**: `string`

#### Returns

`string`

#### Source

[src/lib/language/application/services/dialectService.ts:101](https://github.com/lambda-orm/lambdaorm/blob/b5545097c371addc7799ba0f29b9e8204e97d347/src/lib/language/application/services/dialectService.ts#L101)

***

### string()

> **string**(`name`): `string`

#### Parameters

• **name**: `string`

#### Returns

`string`

#### Source

[src/lib/language/application/services/dialectService.ts:133](https://github.com/lambda-orm/lambdaorm/blob/b5545097c371addc7799ba0f29b9e8204e97d347/src/lib/language/application/services/dialectService.ts#L133)

***

### support()

> **support**(`name`): `string`

#### Parameters

• **name**: `string`

#### Returns

`string`

#### Source

[src/lib/language/application/services/dialectService.ts:93](https://github.com/lambda-orm/lambdaorm/blob/b5545097c371addc7799ba0f29b9e8204e97d347/src/lib/language/application/services/dialectService.ts#L93)

***

### type()

> **type**(`name`): `string`

#### Parameters

• **name**: `string`

#### Returns

`string`

#### Source

[src/lib/language/application/services/dialectService.ts:113](https://github.com/lambda-orm/lambdaorm/blob/b5545097c371addc7799ba0f29b9e8204e97d347/src/lib/language/application/services/dialectService.ts#L113)
