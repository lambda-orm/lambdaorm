[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / OperandFacade

# Class: OperandFacade

Defined in: [src/lib/operand/application/facade.ts:10](https://github.com/lambda-orm/lambdaorm/blob/de442ee62b98645313d73b81a13e3c7cf3edad24/src/lib/operand/application/facade.ts#L10)

## Constructors

### Constructor

> **new OperandFacade**(`expressions`, `schemaState`, `cache`, `operandSerializer`, `operandHelper`, `helper`): `OperandFacade`

Defined in: [src/lib/operand/application/facade.ts:13](https://github.com/lambda-orm/lambdaorm/blob/de442ee62b98645313d73b81a13e3c7cf3edad24/src/lib/operand/application/facade.ts#L13)

#### Parameters

##### expressions

`Expressions`

##### schemaState

[`SchemaState`](SchemaState.md)

##### cache

`ICache`\<`string`, `string`\>

##### operandSerializer

`OperandSerializer`

##### operandHelper

[`OrmOperandHelper`](OrmOperandHelper.md)

##### helper

[`OrmH3lp`](OrmH3lp.md)

#### Returns

`OperandFacade`

## Methods

### build()

> **build**(`expression`): `Operand`

Defined in: [src/lib/operand/application/facade.ts:27](https://github.com/lambda-orm/lambdaorm/blob/de442ee62b98645313d73b81a13e3c7cf3edad24/src/lib/operand/application/facade.ts#L27)

#### Parameters

##### expression

`string`

#### Returns

`Operand`

***

### getClauses()

> **getClauses**(`operand`): `any`

Defined in: [src/lib/operand/application/facade.ts:35](https://github.com/lambda-orm/lambdaorm/blob/de442ee62b98645313d73b81a13e3c7cf3edad24/src/lib/operand/application/facade.ts#L35)

#### Parameters

##### operand

`Operand`

#### Returns

`any`

***

### normalize()

> **normalize**(`expression`): `string`

Defined in: [src/lib/operand/application/facade.ts:31](https://github.com/lambda-orm/lambdaorm/blob/de442ee62b98645313d73b81a13e3c7cf3edad24/src/lib/operand/application/facade.ts#L31)

#### Parameters

##### expression

`string`

#### Returns

`string`
