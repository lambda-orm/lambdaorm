[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / StageFetch

# Class: StageFetch

Defined in: [src/lib/stage/application/useCases/fetch.ts:6](https://github.com/lambda-orm/lambdaorm/blob/d458bba636206871821586fca1a7822cc50e2446/src/lib/stage/application/useCases/fetch.ts#L6)

## Constructors

### Constructor

> **new StageFetch**(`executor`, `schemaState`, `languages`, `helper`, `options`): `StageFetch`

Defined in: [src/lib/stage/application/useCases/fetch.ts:8](https://github.com/lambda-orm/lambdaorm/blob/d458bba636206871821586fca1a7822cc50e2446/src/lib/stage/application/useCases/fetch.ts#L8)

#### Parameters

##### executor

[`Executor`](../interfaces/Executor.md)

##### schemaState

[`SchemaState`](SchemaState.md)

##### languages

[`LanguagesService`](LanguagesService.md)

##### helper

[`SchemaHelper`](SchemaHelper.md)

##### options

[`QueryOptions`](../interfaces/QueryOptions.md)

#### Returns

`StageFetch`

## Methods

### execute()

> **execute**(): `Promise`\<[`Mapping`](../interfaces/Mapping.md)[]\>

Defined in: [src/lib/stage/application/useCases/fetch.ts:16](https://github.com/lambda-orm/lambdaorm/blob/d458bba636206871821586fca1a7822cc50e2446/src/lib/stage/application/useCases/fetch.ts#L16)

#### Returns

`Promise`\<[`Mapping`](../interfaces/Mapping.md)[]\>
