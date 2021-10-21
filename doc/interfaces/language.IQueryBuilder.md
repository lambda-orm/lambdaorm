[Lambda ORM](../README.md) / [language](../modules/language.md) / IQueryBuilder

# Interface: IQueryBuilder

[language](../modules/language.md).IQueryBuilder

## Table of contents

### Methods

- [build](language.IQueryBuilder.md#build)
- [deserialize](language.IQueryBuilder.md#deserialize)
- [sentence](language.IQueryBuilder.md#sentence)
- [serialize](language.IQueryBuilder.md#serialize)

## Methods

### build

▸ **build**(`sentence`, `dialect`): [`Query`](../classes/language.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sentence` | [`Sentence`](../classes/language.Sentence.md) |
| `dialect` | `string` |

#### Returns

[`Query`](../classes/language.Query.md)

#### Defined in

[language/iQueryBuilder.ts:4](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/language/iQueryBuilder.ts#L4)

___

### deserialize

▸ **deserialize**(`serialized`): [`Operand`](../classes/language.Operand.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `serialized` | `any` |

#### Returns

[`Operand`](../classes/language.Operand.md)

#### Defined in

[language/iQueryBuilder.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/language/iQueryBuilder.ts#L7)

___

### sentence

▸ **sentence**(`query`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Query`](../classes/language.Query.md) |

#### Returns

`any`

#### Defined in

[language/iQueryBuilder.ts:5](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/language/iQueryBuilder.ts#L5)

___

### serialize

▸ **serialize**(`operand`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | [`Operand`](../classes/language.Operand.md) |

#### Returns

`any`

#### Defined in

[language/iQueryBuilder.ts:6](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/language/iQueryBuilder.ts#L6)
