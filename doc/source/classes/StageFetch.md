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

[src/lib/stage/application/useCases/fetch.ts:8](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/stage/application/useCases/fetch.ts#L8)

## Methods

### execute()

> **execute**(): `Promise`\<[`Mapping`](../interfaces/Mapping.md)[]\>

#### Returns

`Promise`\<[`Mapping`](../interfaces/Mapping.md)[]\>

#### Source

[src/lib/stage/application/useCases/fetch.ts:16](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/stage/application/useCases/fetch.ts#L16)
