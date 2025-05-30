[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / Field

# Class: Field

Defined in: node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:8

## Extends

- `Operand`

## Constructors

### Constructor

> **new Field**(`pos`, `entity`, `name`, `returnType?`, `alias?`, `isRoot?`): `Field`

Defined in: node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:13

#### Parameters

##### pos

`Position`

##### entity

`string`

##### name

`string`

##### returnType?

`Type`

##### alias?

`string`

##### isRoot?

`boolean`

#### Returns

`Field`

#### Overrides

`Operand.constructor`

## Properties

### alias?

> `optional` **alias**: `string`

Defined in: node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:10

***

### children

> **children**: `Operand`[]

Defined in: node\_modules/3xpr/shared/domain/operand.d.ts:44

#### Inherited from

`Operand.children`

***

### entity

> **entity**: `string`

Defined in: node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:9

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

### isRoot?

> `optional` **isRoot**: `boolean`

Defined in: node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:11

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

### prefix?

> `optional` **prefix**: `string`

Defined in: node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:12

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

### clone()

> **clone**(): `Field`

Defined in: node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:15

#### Returns

`Field`

***

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

### fieldName()

> **fieldName**(): `any`

Defined in: node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:14

#### Returns

`any`

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
