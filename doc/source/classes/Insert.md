[Lambda ORM](../README.md) / Insert

# Class: Insert

## Hierarchy

- [`Clause`](Clause.md)

  ↳ **`Insert`**

## Table of contents

### Constructors

- [constructor](Insert.md#constructor)

### Properties

- [alias](Insert.md#alias)
- [children](Insert.md#children)
- [entity](Insert.md#entity)
- [evaluator](Insert.md#evaluator)
- [id](Insert.md#id)
- [name](Insert.md#name)
- [number](Insert.md#number)
- [pos](Insert.md#pos)
- [returnType](Insert.md#returntype)
- [type](Insert.md#type)

### Methods

- [eval](Insert.md#eval)
- [evalAsync](Insert.md#evalasync)
- [isAsync](Insert.md#isasync)
- [solve](Insert.md#solve)

## Constructors

### constructor

• **new Insert**(`pos`, `name`, `children`, `entity`, `alias`): [`Insert`](Insert.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pos` | `Position` |
| `name` | `string` |
| `children` | `Operand`[] |
| `entity` | `string` |
| `alias` | `string` |

#### Returns

[`Insert`](Insert.md)

#### Inherited from

[Clause](Clause.md).[constructor](Clause.md#constructor)

#### Defined in

[src/lib/sentence/domain/sentence.ts:54](https://github.com/FlavioLionelRita/lambdaorm/blob/02a3343d/src/lib/sentence/domain/sentence.ts#L54)

## Properties

### alias

• **alias**: `string`

#### Inherited from

[Clause](Clause.md).[alias](Clause.md#alias)

#### Defined in

[src/lib/sentence/domain/sentence.ts:52](https://github.com/FlavioLionelRita/lambdaorm/blob/02a3343d/src/lib/sentence/domain/sentence.ts#L52)

___

### children

• **children**: `Operand`[]

#### Inherited from

[Clause](Clause.md).[children](Clause.md#children)

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:44

___

### entity

• **entity**: `string`

#### Inherited from

[Clause](Clause.md).[entity](Clause.md#entity)

#### Defined in

[src/lib/sentence/domain/sentence.ts:53](https://github.com/FlavioLionelRita/lambdaorm/blob/02a3343d/src/lib/sentence/domain/sentence.ts#L53)

___

### evaluator

• `Optional` **evaluator**: `IEvaluator`

#### Inherited from

[Clause](Clause.md).[evaluator](Clause.md#evaluator)

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:46

___

### id

• `Optional` **id**: `string`

#### Inherited from

[Clause](Clause.md).[id](Clause.md#id)

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:48

___

### name

• **name**: `any`

#### Inherited from

[Clause](Clause.md).[name](Clause.md#name)

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:42

___

### number

• `Optional` **number**: `number`

#### Inherited from

[Clause](Clause.md).[number](Clause.md#number)

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:47

___

### pos

• `Readonly` **pos**: `Position`

#### Inherited from

[Clause](Clause.md).[pos](Clause.md#pos)

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:41

___

### returnType

• `Optional` **returnType**: `Type`

#### Inherited from

[Clause](Clause.md).[returnType](Clause.md#returntype)

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:45

___

### type

• `Readonly` **type**: `OperandType`

#### Inherited from

[Clause](Clause.md).[type](Clause.md#type)

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:43

## Methods

### eval

▸ **eval**(`context`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Context` |

#### Returns

`any`

#### Inherited from

[Clause](Clause.md).[eval](Clause.md#eval)

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:50

___

### evalAsync

▸ **evalAsync**(`context`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Context` |

#### Returns

`Promise`\<`any`\>

#### Inherited from

[Clause](Clause.md).[evalAsync](Clause.md#evalasync)

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:51

___

### isAsync

▸ **isAsync**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[Clause](Clause.md).[isAsync](Clause.md#isasync)

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:52

___

### solve

▸ **solve**(`context`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Context` |

#### Returns

`Promise`\<`any`\>

#### Inherited from

[Clause](Clause.md).[solve](Clause.md#solve)

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:53
