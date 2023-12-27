[Lambda ORM](../README.md) / ExpressionActionsImpl

# Class: ExpressionActionsImpl

## Implements

- [`ExpressionActions`](../interfaces/ExpressionActions.md)

## Table of contents

### Constructors

- [constructor](ExpressionActionsImpl.md#constructor)

### Methods

- [constraints](ExpressionActionsImpl.md#constraints)
- [execute](ExpressionActionsImpl.md#execute)
- [metadata](ExpressionActionsImpl.md#metadata)
- [model](ExpressionActionsImpl.md#model)
- [normalize](ExpressionActionsImpl.md#normalize)
- [parameters](ExpressionActionsImpl.md#parameters)
- [plan](ExpressionActionsImpl.md#plan)

## Constructors

### constructor

• **new ExpressionActionsImpl**(`name`, `orm`, `stage?`): [`ExpressionActionsImpl`](ExpressionActionsImpl.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `orm` | [`IOrm`](../interfaces/IOrm.md) |
| `stage?` | `string` |

#### Returns

[`ExpressionActionsImpl`](ExpressionActionsImpl.md)

#### Defined in

<<<<<<< HEAD
[src/lib/repository/domain/actions.ts:7](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/repository/domain/actions.ts#L7)
=======
[src/lib/repository/domain/actions.ts:7](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/repository/domain/actions.ts#L7)
>>>>>>> release/1.2.0

## Methods

### constraints

▸ **constraints**(`expression`): `Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Implementation of

[ExpressionActions](../interfaces/ExpressionActions.md).[constraints](../interfaces/ExpressionActions.md#constraints)

#### Defined in

<<<<<<< HEAD
[src/lib/repository/domain/actions.ts:29](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/repository/domain/actions.ts#L29)
=======
[src/lib/repository/domain/actions.ts:29](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/repository/domain/actions.ts#L29)
>>>>>>> release/1.2.0

___

### execute

▸ **execute**(`expression`, `data`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `data` | `any` |

#### Returns

`Promise`\<`any`\>

#### Implementation of

[ExpressionActions](../interfaces/ExpressionActions.md).[execute](../interfaces/ExpressionActions.md#execute)

#### Defined in

<<<<<<< HEAD
[src/lib/repository/domain/actions.ts:13](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/repository/domain/actions.ts#L13)
=======
[src/lib/repository/domain/actions.ts:13](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/repository/domain/actions.ts#L13)
>>>>>>> release/1.2.0

___

### metadata

▸ **metadata**(`expression`): `Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Implementation of

[ExpressionActions](../interfaces/ExpressionActions.md).[metadata](../interfaces/ExpressionActions.md#metadata)

#### Defined in

<<<<<<< HEAD
[src/lib/repository/domain/actions.ts:33](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/repository/domain/actions.ts#L33)
=======
[src/lib/repository/domain/actions.ts:33](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/repository/domain/actions.ts#L33)
>>>>>>> release/1.2.0

___

### model

▸ **model**(`expression`): `Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Implementation of

[ExpressionActions](../interfaces/ExpressionActions.md).[model](../interfaces/ExpressionActions.md#model)

#### Defined in

<<<<<<< HEAD
[src/lib/repository/domain/actions.ts:21](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/repository/domain/actions.ts#L21)
=======
[src/lib/repository/domain/actions.ts:21](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/repository/domain/actions.ts#L21)
>>>>>>> release/1.2.0

___

### normalize

▸ **normalize**(`expression`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`string`

#### Implementation of

[ExpressionActions](../interfaces/ExpressionActions.md).[normalize](../interfaces/ExpressionActions.md#normalize)

#### Defined in

<<<<<<< HEAD
[src/lib/repository/domain/actions.ts:17](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/repository/domain/actions.ts#L17)
=======
[src/lib/repository/domain/actions.ts:17](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/repository/domain/actions.ts#L17)
>>>>>>> release/1.2.0

___

### parameters

▸ **parameters**(`expression`): `Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Implementation of

[ExpressionActions](../interfaces/ExpressionActions.md).[parameters](../interfaces/ExpressionActions.md#parameters)

#### Defined in

<<<<<<< HEAD
[src/lib/repository/domain/actions.ts:25](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/repository/domain/actions.ts#L25)
=======
[src/lib/repository/domain/actions.ts:25](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/repository/domain/actions.ts#L25)
>>>>>>> release/1.2.0

___

### plan

▸ **plan**(`expression`): `Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

#### Implementation of

[ExpressionActions](../interfaces/ExpressionActions.md).[plan](../interfaces/ExpressionActions.md#plan)

#### Defined in

<<<<<<< HEAD
[src/lib/repository/domain/actions.ts:37](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/repository/domain/actions.ts#L37)
=======
[src/lib/repository/domain/actions.ts:37](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/repository/domain/actions.ts#L37)
>>>>>>> release/1.2.0
