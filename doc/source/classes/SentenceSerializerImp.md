[Lambda ORM](../README.md) / SentenceSerializerImp

# Class: SentenceSerializerImp

## Implements

- `SentenceSerializer`

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

▸ **clone**(`sentence`): `Sentence`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sentence` | `Sentence` |

#### Returns

`Sentence`

#### Implementation of

SentenceSerializer.clone

#### Defined in

[src/lib/sentence/application/services/sentenceSerializer.ts:9](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/sentence/application/services/sentenceSerializer.ts#L9)

___

### deserialize

▸ **deserialize**(`value`): `Sentence`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`Sentence`

#### Implementation of

SentenceSerializer.deserialize

#### Defined in

[src/lib/sentence/application/services/sentenceSerializer.ts:19](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/sentence/application/services/sentenceSerializer.ts#L19)

___

### serialize

▸ **serialize**(`sentence`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sentence` | `Sentence` |

#### Returns

`string`

#### Implementation of

SentenceSerializer.serialize

#### Defined in

[src/lib/sentence/application/services/sentenceSerializer.ts:15](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/sentence/application/services/sentenceSerializer.ts#L15)
