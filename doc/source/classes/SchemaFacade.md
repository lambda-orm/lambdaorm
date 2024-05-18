[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / SchemaFacade

# Class: SchemaFacade

## Constructors

### new SchemaFacade()

> **new SchemaFacade**(`schemaService`, `getSchemaData`, `extender`, `createSchema`, `initializeSchema`, `updateSchema`, `matchSchema`, `fileService`): [`SchemaFacade`](SchemaFacade.md)

#### Parameters

• **schemaService**: [`SchemaService`](SchemaService.md)

• **getSchemaData**: [`GetSchemaSchema`](GetSchemaSchema.md)

• **extender**: [`SchemaExtender`](SchemaExtender.md)

• **createSchema**: [`CreateSchema`](CreateSchema.md)

• **initializeSchema**: [`InitializeSchema`](InitializeSchema.md)

• **updateSchema**: [`UpdateSchema`](UpdateSchema.md)

• **matchSchema**: [`MatchSchema`](MatchSchema.md)

• **fileService**: [`IFileSchemaService`](../interfaces/IFileSchemaService.md)

#### Returns

[`SchemaFacade`](SchemaFacade.md)

#### Source

node\_modules/lambdaorm-base/schema/application/facade.d.ts:19

## Properties

### schemaService

> `readonly` **schemaService**: [`SchemaService`](SchemaService.md)

#### Source

node\_modules/lambdaorm-base/schema/application/facade.d.ts:11

## Methods

### complete()

> **complete**(`schema`): `void`

#### Parameters

• **schema**: [`Schema`](../interfaces/Schema.md)

#### Returns

`void`

#### Source

node\_modules/lambdaorm-base/schema/application/facade.d.ts:25

***

### create()

> **create**(`dialect`?, `connection`?): [`Schema`](../interfaces/Schema.md)

#### Parameters

• **dialect?**: [`Dialect`](../enumerations/Dialect.md)

• **connection?**: `any`

#### Returns

[`Schema`](../interfaces/Schema.md)

#### Source

node\_modules/lambdaorm-base/schema/application/facade.d.ts:20

***

### initialize()

> **initialize**(`schema`, `args`): [`Schema`](../interfaces/Schema.md)

#### Parameters

• **schema**: [`Schema`](../interfaces/Schema.md)

• **args**: [`InitializeSchemaArgs`](../interfaces/InitializeSchemaArgs.md)

#### Returns

[`Schema`](../interfaces/Schema.md)

#### Source

node\_modules/lambdaorm-base/schema/application/facade.d.ts:21

***

### introspect()

> **introspect**(`schema`, `data`, `name`): [`SchemaData`](../interfaces/SchemaData.md)

#### Parameters

• **schema**: [`Schema`](../interfaces/Schema.md)

• **data**: `any`

• **name**: `string`

#### Returns

[`SchemaData`](../interfaces/SchemaData.md)

#### Source

node\_modules/lambdaorm-base/schema/application/facade.d.ts:22

***

### match()

> **match**(`schema`, `mappings`, `options`?): `void`

#### Parameters

• **schema**: [`Schema`](../interfaces/Schema.md)

• **mappings**: [`Mapping`](../interfaces/Mapping.md)[]

• **options?**: [`MatchOptions`](../interfaces/MatchOptions.md)

#### Returns

`void`

#### Source

node\_modules/lambdaorm-base/schema/application/facade.d.ts:23

***

### read()

> **read**(`workspace`): `Promise`\<`null` \| [`SchemaInfo`](../interfaces/SchemaInfo.md)\>

#### Parameters

• **workspace**: `string`

#### Returns

`Promise`\<`null` \| [`SchemaInfo`](../interfaces/SchemaInfo.md)\>

#### Source

node\_modules/lambdaorm-base/schema/application/facade.d.ts:26

***

### schemaData()

> **schemaData**(`source`, `name`, `type`): [`SchemaData`](../interfaces/SchemaData.md)

#### Parameters

• **source**: `any`

• **name**: `string`

• **type**: `Type`

#### Returns

[`SchemaData`](../interfaces/SchemaData.md)

#### Source

node\_modules/lambdaorm-base/schema/application/facade.d.ts:24

***

### write()

> **write**(`schema`, `path`): `Promise`\<`void`\>

#### Parameters

• **schema**: [`Schema`](../interfaces/Schema.md)

• **path**: `string`

#### Returns

`Promise`\<`void`\>

#### Source

node\_modules/lambdaorm-base/schema/application/facade.d.ts:27
