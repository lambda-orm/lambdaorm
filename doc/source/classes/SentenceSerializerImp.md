[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / SentenceSerializerImp

# Class: SentenceSerializerImp

## Implements

- [`SentenceSerializer`](../interfaces/SentenceSerializer.md)

## Constructors

### new SentenceSerializerImp()

> **new SentenceSerializerImp**(): [`SentenceSerializerImp`](SentenceSerializerImp.md)

#### Returns

[`SentenceSerializerImp`](SentenceSerializerImp.md)

## Methods

### clone()

> **clone**(`sentence`): [`Sentence`](Sentence.md)

#### Parameters

• **sentence**: [`Sentence`](Sentence.md)

#### Returns

[`Sentence`](Sentence.md)

#### Implementation of

[`SentenceSerializer`](../interfaces/SentenceSerializer.md).[`clone`](../interfaces/SentenceSerializer.md#clone)

#### Source

[src/lib/sentence/application/services/sentenceSerializer.ts:9](https://github.com/lambda-orm/lambdaorm/blob/15952b17a2af20fc678f913dd5cbf226a467196b/src/lib/sentence/application/services/sentenceSerializer.ts#L9)

***

### deserialize()

> **deserialize**(`value`): [`Sentence`](Sentence.md)

#### Parameters

• **value**: `string`

#### Returns

[`Sentence`](Sentence.md)

#### Implementation of

[`SentenceSerializer`](../interfaces/SentenceSerializer.md).[`deserialize`](../interfaces/SentenceSerializer.md#deserialize)

#### Source

[src/lib/sentence/application/services/sentenceSerializer.ts:19](https://github.com/lambda-orm/lambdaorm/blob/15952b17a2af20fc678f913dd5cbf226a467196b/src/lib/sentence/application/services/sentenceSerializer.ts#L19)

***

### serialize()

> **serialize**(`sentence`): `string`

#### Parameters

• **sentence**: [`Sentence`](Sentence.md)

#### Returns

`string`

#### Implementation of

[`SentenceSerializer`](../interfaces/SentenceSerializer.md).[`serialize`](../interfaces/SentenceSerializer.md#serialize)

#### Source

[src/lib/sentence/application/services/sentenceSerializer.ts:15](https://github.com/lambda-orm/lambdaorm/blob/15952b17a2af20fc678f913dd5cbf226a467196b/src/lib/sentence/application/services/sentenceSerializer.ts#L15)
