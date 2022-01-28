[Lambda ORM](../README.md) / [repository](../modules/repository.md) / ExpressionActions

# Class: ExpressionActions

[repository](../modules/repository.md).ExpressionActions

## Table of contents

### Constructors

- [constructor](repository.ExpressionActions.md#constructor)

### Methods

- [complete](repository.ExpressionActions.md#complete)
- [execute](repository.ExpressionActions.md#execute)
- [metadata](repository.ExpressionActions.md#metadata)
- [model](repository.ExpressionActions.md#model)
- [parameters](repository.ExpressionActions.md#parameters)
- [sentence](repository.ExpressionActions.md#sentence)

## Constructors

### constructor

• **new ExpressionActions**(`name`, `orm`, `stage?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `orm` | [`IOrm`](../interfaces/model.IOrm.md) |
| `stage?` | `string` |

#### Defined in

[src/lib/repository/expressionActions.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/expressionActions.ts#L7)

## Methods

### complete

▸ **complete**(`expresion`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expresion` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/repository/expressionActions.ts:17](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/expressionActions.ts#L17)

___

### execute

▸ **execute**(`expresion`, `data`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expresion` | `string` |
| `data` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/repository/expressionActions.ts:13](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/expressionActions.ts#L13)

___

### metadata

▸ **metadata**(`expresion`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expresion` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/repository/expressionActions.ts:29](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/expressionActions.ts#L29)

___

### model

▸ **model**(`expresion`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expresion` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/repository/expressionActions.ts:21](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/expressionActions.ts#L21)

___

### parameters

▸ **parameters**(`expresion`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expresion` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/repository/expressionActions.ts:25](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/expressionActions.ts#L25)

___

### sentence

▸ **sentence**(`expresion`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expresion` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/lib/repository/expressionActions.ts:33](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/expressionActions.ts#L33)
