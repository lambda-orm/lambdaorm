[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / OperandFacade

# Class: OperandFacade

## Constructors

### new OperandFacade()

> **new OperandFacade**(`expressions`, `schemaState`, `cache`, `operandSerializer`, `operandHelper`, `helper`): [`OperandFacade`](OperandFacade.md)

#### Parameters

• **expressions**: `Expressions`

• **schemaState**: [`SchemaState`](SchemaState.md)

• **cache**: `ICache`\<`string`, `string`\>

• **operandSerializer**: `OperandSerializer`

• **operandHelper**: [`OrmOperandHelper`](OrmOperandHelper.md)

• **helper**: [`OrmH3lp`](OrmH3lp.md)

#### Returns

[`OperandFacade`](OperandFacade.md)

#### Source

[src/lib/operand/application/facade.ts:13](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/operand/application/facade.ts#L13)

## Methods

### build()

> **build**(`expression`): `Operand`

#### Parameters

• **expression**: `string`

#### Returns

`Operand`

#### Source

[src/lib/operand/application/facade.ts:27](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/operand/application/facade.ts#L27)

***

### getClauses()

> **getClauses**(`operand`): `any`

#### Parameters

• **operand**: `Operand`

#### Returns

`any`

#### Source

[src/lib/operand/application/facade.ts:35](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/operand/application/facade.ts#L35)

***

### normalize()

> **normalize**(`expression`): `string`

#### Parameters

• **expression**: `string`

#### Returns

`string`

#### Source

[src/lib/operand/application/facade.ts:31](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/operand/application/facade.ts#L31)
