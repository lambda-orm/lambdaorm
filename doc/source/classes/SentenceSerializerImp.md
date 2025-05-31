[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / SentenceSerializerImp

# Class: SentenceSerializerImp

Defined in: [src/lib/sentence/application/services/sentenceSerializer.ts:8](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/sentence/application/services/sentenceSerializer.ts#L8)

## Implements

- [`SentenceSerializer`](../interfaces/SentenceSerializer.md)

## Constructors

### Constructor

> **new SentenceSerializerImp**(): `SentenceSerializerImp`

#### Returns

`SentenceSerializerImp`

## Methods

### clone()

> **clone**(`sentence`): [`Sentence`](Sentence.md)

Defined in: [src/lib/sentence/application/services/sentenceSerializer.ts:9](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/sentence/application/services/sentenceSerializer.ts#L9)

#### Parameters

##### sentence

[`Sentence`](Sentence.md)

#### Returns

[`Sentence`](Sentence.md)

#### Implementation of

[`SentenceSerializer`](../interfaces/SentenceSerializer.md).[`clone`](../interfaces/SentenceSerializer.md#clone)

***

### deserialize()

> **deserialize**(`value`): [`Sentence`](Sentence.md)

Defined in: [src/lib/sentence/application/services/sentenceSerializer.ts:19](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/sentence/application/services/sentenceSerializer.ts#L19)

#### Parameters

##### value

`string`

#### Returns

[`Sentence`](Sentence.md)

#### Implementation of

[`SentenceSerializer`](../interfaces/SentenceSerializer.md).[`deserialize`](../interfaces/SentenceSerializer.md#deserialize)

***

### serialize()

> **serialize**(`sentence`): `string`

Defined in: [src/lib/sentence/application/services/sentenceSerializer.ts:15](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/sentence/application/services/sentenceSerializer.ts#L15)

#### Parameters

##### sentence

[`Sentence`](Sentence.md)

#### Returns

`string`

#### Implementation of

[`SentenceSerializer`](../interfaces/SentenceSerializer.md).[`serialize`](../interfaces/SentenceSerializer.md#serialize)
