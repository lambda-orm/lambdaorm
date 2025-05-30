[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / Clause

# Class: Clause

Defined in: node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:17

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

### Constructor

> **new Clause**(`pos`, `name`, `children`, `entity`, `alias`): `Clause`

Defined in: node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:20

#### Parameters

##### pos

`Position`

##### name

`string`

##### children

`Operand`[]

##### entity

`string`

##### alias

`string`

#### Returns

`Clause`

#### Overrides

`Operand.constructor`

## Properties

### alias

> **alias**: `string`

Defined in: node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:18

***

### children

> **children**: `Operand`[]

Defined in: node\_modules/3xpr/shared/domain/operand.d.ts:44

#### Inherited from

`Operand.children`

***

### entity

> **entity**: `string`

Defined in: node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:19

***

### evaluator?

> `optional` **evaluator**: `IEvaluator`

Defined in: node\_modules/3xpr/shared/domain/operand.d.ts:46

#### Inherited from

`Operand.evaluator`

***

### id?

> `optional` **id**: `string`

Defined in: node\_modules/3xpr/shared/domain/operand.d.ts:48

#### Inherited from

`Operand.id`

***

### name

> **name**: `any`

Defined in: node\_modules/3xpr/shared/domain/operand.d.ts:42

#### Inherited from

`Operand.name`

***

### number?

> `optional` **number**: `number`

Defined in: node\_modules/3xpr/shared/domain/operand.d.ts:47

#### Inherited from

`Operand.number`

***

### pos

> `readonly` **pos**: `Position`

Defined in: node\_modules/3xpr/shared/domain/operand.d.ts:41

#### Inherited from

`Operand.pos`

***

### returnType?

> `optional` **returnType**: `Type`

Defined in: node\_modules/3xpr/shared/domain/operand.d.ts:45

#### Inherited from

`Operand.returnType`

***

### type

> `readonly` **type**: `OperandType`

Defined in: node\_modules/3xpr/shared/domain/operand.d.ts:43

#### Inherited from

`Operand.type`

## Methods

### eval()

> **eval**(`context`): `any`

Defined in: node\_modules/3xpr/shared/domain/operand.d.ts:50

#### Parameters

##### context

`Context`

#### Returns

`any`

#### Inherited from

`Operand.eval`

***

### evalAsync()

> **evalAsync**(`context`): `Promise`\<`any`\>

Defined in: node\_modules/3xpr/shared/domain/operand.d.ts:51

#### Parameters

##### context

`Context`

#### Returns

`Promise`\<`any`\>

#### Inherited from

`Operand.evalAsync`

***

### isAsync()

> **isAsync**(): `boolean`

Defined in: node\_modules/3xpr/shared/domain/operand.d.ts:52

#### Returns

`boolean`

#### Inherited from

`Operand.isAsync`

***

### solve()

> **solve**(`context`): `Promise`\<`any`\>

Defined in: node\_modules/3xpr/shared/domain/operand.d.ts:53

#### Parameters

##### context

`Context`

#### Returns

`Promise`\<`any`\>

#### Inherited from

`Operand.solve`
