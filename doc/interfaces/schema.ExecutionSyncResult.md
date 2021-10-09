[Lambda ORM](../README.md) / [schema](../modules/schema.md) / ExecutionSyncResult

# Interface: ExecutionSyncResult

[schema](../modules/schema.md).ExecutionSyncResult

## Hierarchy

- [`ExecutionResult`](connection.ExecutionResult.md)

  ↳ **`ExecutionSyncResult`**

## Table of contents

### Properties

- [delta](schema.ExecutionSyncResult.md#delta)
- [error](schema.ExecutionSyncResult.md#error)
- [results](schema.ExecutionSyncResult.md#results)

## Properties

### delta

• **delta**: [`Delta`](../classes/model.Delta.md)

#### Defined in

[schema/executionSyncResult.ts:6](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/schema/executionSyncResult.ts#L6)

___

### error

• `Optional` **error**: `any`

#### Inherited from

[ExecutionResult](connection.ExecutionResult.md).[error](connection.ExecutionResult.md#error)

#### Defined in

[connection/executionResult.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/connection/executionResult.ts#L8)

___

### results

• **results**: [`ExecutionSentenceResult`](connection.ExecutionSentenceResult.md)[]

#### Inherited from

[ExecutionResult](connection.ExecutionResult.md).[results](connection.ExecutionResult.md#results)

#### Defined in

[connection/executionResult.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/connection/executionResult.ts#L7)
