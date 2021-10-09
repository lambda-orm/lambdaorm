[Lambda ORM](../README.md) / [language](../modules/language.md) / IOperandExecutor

# Interface: IOperandExecutor

[language](../modules/language.md).IOperandExecutor

## Table of contents

### Methods

- [execute](language.IOperandExecutor.md#execute)

## Methods

### execute

▸ **execute**(`operand`, `context`, `executor?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | [`Operand`](../classes/language.Operand.md) |
| `context` | [`Context`](../classes/model.Context.md) |
| `executor?` | [`Executor`](../classes/connection.Executor.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

[language/iOperandExecutor.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/iOperandExecutor.ts#L7)
