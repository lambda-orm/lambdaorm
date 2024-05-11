[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / SentenceFacade

# Class: SentenceFacade

## Constructors

### new SentenceFacade()

> **new SentenceFacade**(`schemaState`, `operandFacade`, `expressions`, `cache`, `serializer`, `helper`): [`SentenceFacade`](SentenceFacade.md)

#### Parameters

• **schemaState**: [`SchemaState`](SchemaState.md)

• **operandFacade**: [`OperandFacade`](OperandFacade.md)

• **expressions**: `Expressions`

• **cache**: `ICache`\<`string`, `string`\>

• **serializer**: [`SentenceSerializer`](../interfaces/SentenceSerializer.md)

• **helper**: [`OrmH3lp`](OrmH3lp.md)

#### Returns

[`SentenceFacade`](SentenceFacade.md)

#### Source

[src/lib/sentence/application/facade.ts:27](https://github.com/lambda-orm/lambdaorm/blob/b641a316566df55ad8177b62e40fe267b1442b03/src/lib/sentence/application/facade.ts#L27)

## Methods

### build()

> **build**(`expression`, `view`, `stage`): [`Sentence`](Sentence.md)

#### Parameters

• **expression**: `string`

• **view**: [`ViewConfigService`](ViewConfigService.md)

• **stage**: `string`

#### Returns

[`Sentence`](Sentence.md)

#### Source

[src/lib/sentence/application/facade.ts:44](https://github.com/lambda-orm/lambdaorm/blob/b641a316566df55ad8177b62e40fe267b1442b03/src/lib/sentence/application/facade.ts#L44)

***

### constraints()

> **constraints**(`expression`): [`MetadataConstraint`](../interfaces/MetadataConstraint.md)

#### Parameters

• **expression**: `string`

#### Returns

[`MetadataConstraint`](../interfaces/MetadataConstraint.md)

#### Source

[src/lib/sentence/application/facade.ts:48](https://github.com/lambda-orm/lambdaorm/blob/b641a316566df55ad8177b62e40fe267b1442b03/src/lib/sentence/application/facade.ts#L48)

***

### getSource()

> **getSource**(`sentence`, `stage`): [`Source`](../interfaces/Source.md)

#### Parameters

• **sentence**: [`Sentence`](Sentence.md)

• **stage**: `string`

#### Returns

[`Source`](../interfaces/Source.md)

#### Source

[src/lib/sentence/application/facade.ts:64](https://github.com/lambda-orm/lambdaorm/blob/b641a316566df55ad8177b62e40fe267b1442b03/src/lib/sentence/application/facade.ts#L64)

***

### metadata()

> **metadata**(`expression`): [`Metadata`](../interfaces/Metadata.md)

#### Parameters

• **expression**: `string`

#### Returns

[`Metadata`](../interfaces/Metadata.md)

#### Source

[src/lib/sentence/application/facade.ts:52](https://github.com/lambda-orm/lambdaorm/blob/b641a316566df55ad8177b62e40fe267b1442b03/src/lib/sentence/application/facade.ts#L52)

***

### model()

> **model**(`expression`): [`MetadataModel`](../interfaces/MetadataModel.md)[]

#### Parameters

• **expression**: `string`

#### Returns

[`MetadataModel`](../interfaces/MetadataModel.md)[]

#### Source

[src/lib/sentence/application/facade.ts:56](https://github.com/lambda-orm/lambdaorm/blob/b641a316566df55ad8177b62e40fe267b1442b03/src/lib/sentence/application/facade.ts#L56)

***

### parameters()

> **parameters**(`expression`): [`MetadataParameter`](../interfaces/MetadataParameter.md)[]

#### Parameters

• **expression**: `string`

#### Returns

[`MetadataParameter`](../interfaces/MetadataParameter.md)[]

#### Source

[src/lib/sentence/application/facade.ts:60](https://github.com/lambda-orm/lambdaorm/blob/b641a316566df55ad8177b62e40fe267b1442b03/src/lib/sentence/application/facade.ts#L60)
