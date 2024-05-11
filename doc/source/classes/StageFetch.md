[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / StageFetch

# Class: StageFetch

## Constructors

### new StageFetch()

> **new StageFetch**(`executor`, `schemaState`, `languages`, `helper`, `options`): [`StageFetch`](StageFetch.md)

#### Parameters

• **executor**: [`Executor`](../interfaces/Executor.md)

• **schemaState**: [`SchemaState`](SchemaState.md)

• **languages**: [`LanguagesService`](LanguagesService.md)

• **helper**: [`SchemaHelper`](SchemaHelper.md)

• **options**: [`QueryOptions`](../interfaces/QueryOptions.md)

#### Returns

[`StageFetch`](StageFetch.md)

#### Source

[src/lib/stage/application/useCases/fetch.ts:7](https://github.com/lambda-orm/lambdaorm/blob/b641a316566df55ad8177b62e40fe267b1442b03/src/lib/stage/application/useCases/fetch.ts#L7)

## Methods

### execute()

> **execute**(): `Promise`\<[`Mapping`](../interfaces/Mapping.md)[]\>

#### Returns

`Promise`\<[`Mapping`](../interfaces/Mapping.md)[]\>

#### Source

[src/lib/stage/application/useCases/fetch.ts:15](https://github.com/lambda-orm/lambdaorm/blob/b641a316566df55ad8177b62e40fe267b1442b03/src/lib/stage/application/useCases/fetch.ts#L15)
