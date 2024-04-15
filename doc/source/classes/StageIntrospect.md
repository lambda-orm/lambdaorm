[Lambda ORM](../README.md) / StageIntrospect

# Class: StageIntrospect

## Table of contents

### Constructors

- [constructor](StageIntrospect.md#constructor)

### Methods

- [execute](StageIntrospect.md#execute)

## Constructors

### constructor

• **new StageIntrospect**(`executor`, `schemaState`, `languages`, `helper`, `options`): [`StageIntrospect`](StageIntrospect.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `executor` | [`Executor`](../interfaces/Executor.md) |
| `schemaState` | [`SchemaState`](SchemaState.md) |
| `languages` | [`LanguagesService`](LanguagesService.md) |
| `helper` | [`SchemaHelper`](SchemaHelper.md) |
| `options` | [`QueryOptions`](../interfaces/QueryOptions.md) |

#### Returns

[`StageIntrospect`](StageIntrospect.md)

#### Defined in

[src/lib/stage/application/useCases/introspect.ts:7](https://github.com/lambda-orm/lambdaorm/blob/326b72e7/src/lib/stage/application/useCases/introspect.ts#L7)

## Methods

### execute

▸ **execute**(): `Promise`\<[`Mapping`](../interfaces/Mapping.md)[]\>

#### Returns

`Promise`\<[`Mapping`](../interfaces/Mapping.md)[]\>

#### Defined in

[src/lib/stage/application/useCases/introspect.ts:15](https://github.com/lambda-orm/lambdaorm/blob/326b72e7/src/lib/stage/application/useCases/introspect.ts#L15)
