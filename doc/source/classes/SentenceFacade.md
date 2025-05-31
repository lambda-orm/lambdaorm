[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / SentenceFacade

# Class: SentenceFacade

Defined in: [src/lib/sentence/application/facade.ts:18](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/sentence/application/facade.ts#L18)

## Constructors

### Constructor

> **new SentenceFacade**(`schemaState`, `operandFacade`, `expressions`, `cache`, `serializer`, `helper`): `SentenceFacade`

Defined in: [src/lib/sentence/application/facade.ts:27](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/sentence/application/facade.ts#L27)

#### Parameters

##### schemaState

[`SchemaState`](SchemaState.md)

##### operandFacade

[`OperandFacade`](OperandFacade.md)

##### expressions

`Expressions`

##### cache

`ICache`\<`string`, `string`\>

##### serializer

[`SentenceSerializer`](../interfaces/SentenceSerializer.md)

##### helper

[`OrmH3lp`](OrmH3lp.md)

#### Returns

`SentenceFacade`

## Methods

### build()

> **build**(`expression`, `view`, `stage`): [`Sentence`](Sentence.md)

Defined in: [src/lib/sentence/application/facade.ts:44](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/sentence/application/facade.ts#L44)

#### Parameters

##### expression

`string`

##### view

[`ViewConfigService`](ViewConfigService.md)

##### stage

`string`

#### Returns

[`Sentence`](Sentence.md)

***

### constraints()

> **constraints**(`expression`): [`MetadataConstraint`](../interfaces/MetadataConstraint.md)

Defined in: [src/lib/sentence/application/facade.ts:48](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/sentence/application/facade.ts#L48)

#### Parameters

##### expression

`string`

#### Returns

[`MetadataConstraint`](../interfaces/MetadataConstraint.md)

***

### getSource()

> **getSource**(`sentence`, `stage`): [`Source`](../interfaces/Source.md)

Defined in: [src/lib/sentence/application/facade.ts:64](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/sentence/application/facade.ts#L64)

#### Parameters

##### sentence

[`Sentence`](Sentence.md)

##### stage

`string`

#### Returns

[`Source`](../interfaces/Source.md)

***

### metadata()

> **metadata**(`expression`): [`Metadata`](../interfaces/Metadata.md)

Defined in: [src/lib/sentence/application/facade.ts:52](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/sentence/application/facade.ts#L52)

#### Parameters

##### expression

`string`

#### Returns

[`Metadata`](../interfaces/Metadata.md)

***

### model()

> **model**(`expression`): [`MetadataModel`](../interfaces/MetadataModel.md)[]

Defined in: [src/lib/sentence/application/facade.ts:56](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/sentence/application/facade.ts#L56)

#### Parameters

##### expression

`string`

#### Returns

[`MetadataModel`](../interfaces/MetadataModel.md)[]

***

### parameters()

> **parameters**(`expression`): [`MetadataParameter`](../interfaces/MetadataParameter.md)[]

Defined in: [src/lib/sentence/application/facade.ts:60](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/sentence/application/facade.ts#L60)

#### Parameters

##### expression

`string`

#### Returns

[`MetadataParameter`](../interfaces/MetadataParameter.md)[]
