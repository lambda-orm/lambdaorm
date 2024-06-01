[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / Clause

# Class: Clause

## Extends

- `Operand`

## Extended by

- [`Map`](Map.md)
- [`Filter`](Filter.md)
- [`GroupBy`](GroupBy.md)
- [`Having`](Having.md)
- [`Sort`](Sort.md)
- [`Page`](Page.md)
- [`From`](From.md)
- [`Join`](Join.md)
- [`Insert`](Insert.md)
- [`BulkInsert`](BulkInsert.md)
- [`Update`](Update.md)
- [`Upsert`](Upsert.md)
- [`Delete`](Delete.md)
- [`BulkDelete`](BulkDelete.md)
- [`BulkMerge`](BulkMerge.md)

## Constructors

### new Clause()

> **new Clause**(`pos`, `name`, `children`, `entity`, `alias`): [`Clause`](Clause.md)

#### Parameters

• **pos**: `Position`

• **name**: `string`

• **children**: `Operand`[]

• **entity**: `string`

• **alias**: `string`

#### Returns

[`Clause`](Clause.md)

#### Overrides

`Operand.constructor`

#### Source

node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:20

## Properties

### alias

> **alias**: `string`

#### Source

node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:18

***

### children

> **children**: `Operand`[]

#### Inherited from

`Operand.children`

#### Source

node\_modules/3xpr/shared/domain/operand.d.ts:44

***

### entity

> **entity**: `string`

#### Source

node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:19

***

### evaluator?

> `optional` **evaluator**: `IEvaluator`

#### Inherited from

`Operand.evaluator`

#### Source

node\_modules/3xpr/shared/domain/operand.d.ts:46

***

### id?

> `optional` **id**: `string`

#### Inherited from

`Operand.id`

#### Source

node\_modules/3xpr/shared/domain/operand.d.ts:48

***

### name

> **name**: `any`

#### Inherited from

`Operand.name`

#### Source

node\_modules/3xpr/shared/domain/operand.d.ts:42

***

### number?

> `optional` **number**: `number`

#### Inherited from

`Operand.number`

#### Source

node\_modules/3xpr/shared/domain/operand.d.ts:47

***

### pos

> `readonly` **pos**: `Position`

#### Inherited from

`Operand.pos`

#### Source

node\_modules/3xpr/shared/domain/operand.d.ts:41

***

### returnType?

> `optional` **returnType**: `Type`

#### Inherited from

`Operand.returnType`

#### Source

node\_modules/3xpr/shared/domain/operand.d.ts:45

***

### type

> `readonly` **type**: `OperandType`

#### Inherited from

`Operand.type`

#### Source

node\_modules/3xpr/shared/domain/operand.d.ts:43

## Methods

### eval()

> **eval**(`context`): `any`

#### Parameters

• **context**: `Context`

#### Returns

`any`

#### Inherited from

`Operand.eval`

#### Source

node\_modules/3xpr/shared/domain/operand.d.ts:50

***

### evalAsync()

> **evalAsync**(`context`): `Promise`\<`any`\>

#### Parameters

• **context**: `Context`

#### Returns

`Promise`\<`any`\>

#### Inherited from

`Operand.evalAsync`

#### Source

node\_modules/3xpr/shared/domain/operand.d.ts:51

***

### isAsync()

> **isAsync**(): `boolean`

#### Returns

`boolean`

#### Inherited from

`Operand.isAsync`

#### Source

node\_modules/3xpr/shared/domain/operand.d.ts:52

***

### solve()

> **solve**(`context`): `Promise`\<`any`\>

#### Parameters

• **context**: `Context`

#### Returns

`Promise`\<`any`\>

#### Inherited from

`Operand.solve`

#### Source

node\_modules/3xpr/shared/domain/operand.d.ts:53
