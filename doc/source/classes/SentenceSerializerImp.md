[Lambda ORM](../README.md) / SentenceSerializerImp

# Class: SentenceSerializerImp

## Implements

- [`SentenceSerializer`](../interfaces/SentenceSerializer.md)

## Table of contents

### Constructors

- [constructor](SentenceSerializerImp.md#constructor)

### Methods

- [clone](SentenceSerializerImp.md#clone)
- [deserialize](SentenceSerializerImp.md#deserialize)
- [serialize](SentenceSerializerImp.md#serialize)

## Constructors

### constructor

• **new SentenceSerializerImp**(): [`SentenceSerializerImp`](SentenceSerializerImp.md)

#### Returns

[`SentenceSerializerImp`](SentenceSerializerImp.md)

## Methods

### clone

▸ **clone**(`sentence`): [`Sentence`](Sentence.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sentence` | [`Sentence`](Sentence.md) |

#### Returns

[`Sentence`](Sentence.md)

#### Implementation of

[SentenceSerializer](../interfaces/SentenceSerializer.md).[clone](../interfaces/SentenceSerializer.md#clone)

#### Defined in

[src/lib/sentence/application/services/sentenceSerializer.ts:7](https://github.com/FlavioLionelRita/lambdaorm/blob/6a8043ca/src/lib/sentence/application/services/sentenceSerializer.ts#L7)

___

### deserialize

▸ **deserialize**(`value`): [`Sentence`](Sentence.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

[`Sentence`](Sentence.md)

#### Implementation of

[SentenceSerializer](../interfaces/SentenceSerializer.md).[deserialize](../interfaces/SentenceSerializer.md#deserialize)

#### Defined in

[src/lib/sentence/application/services/sentenceSerializer.ts:17](https://github.com/FlavioLionelRita/lambdaorm/blob/6a8043ca/src/lib/sentence/application/services/sentenceSerializer.ts#L17)

___

### serialize

▸ **serialize**(`sentence`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sentence` | [`Sentence`](Sentence.md) |

#### Returns

`string`

#### Implementation of

[SentenceSerializer](../interfaces/SentenceSerializer.md).[serialize](../interfaces/SentenceSerializer.md#serialize)

#### Defined in

[src/lib/sentence/application/services/sentenceSerializer.ts:13](https://github.com/FlavioLionelRita/lambdaorm/blob/6a8043ca/src/lib/sentence/application/services/sentenceSerializer.ts#L13)
