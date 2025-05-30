[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / SchemaFacade

# Class: SchemaFacade

Defined in: node\_modules/lambdaorm-base/schema/application/facade.d.ts:10

## Constructors

### Constructor

> **new SchemaFacade**(`schemaService`, `getSchemaData`, `extender`, `createSchema`, `initializeSchema`, `updateSchema`, `matchSchema`, `fileService`): `SchemaFacade`

Defined in: node\_modules/lambdaorm-base/schema/application/facade.d.ts:19

#### Parameters

##### schemaService

[`SchemaService`](SchemaService.md)

##### getSchemaData

[`GetSchemaSchema`](GetSchemaSchema.md)

##### extender

[`SchemaExtender`](SchemaExtender.md)

##### createSchema

[`CreateSchema`](CreateSchema.md)

##### initializeSchema

[`InitializeSchema`](InitializeSchema.md)

##### updateSchema

[`UpdateSchema`](UpdateSchema.md)

##### matchSchema

[`MatchSchema`](MatchSchema.md)

##### fileService

[`IFileSchemaService`](../interfaces/IFileSchemaService.md)

#### Returns

`SchemaFacade`

## Properties

### schemaService

> `readonly` **schemaService**: [`SchemaService`](SchemaService.md)

Defined in: node\_modules/lambdaorm-base/schema/application/facade.d.ts:11

## Methods

### complete()

> **complete**(`schema`): `void`

Defined in: node\_modules/lambdaorm-base/schema/application/facade.d.ts:25

#### Parameters

##### schema

[`Schema`](../interfaces/Schema.md)

#### Returns

`void`

***

### create()

> **create**(`dialect?`, `connection?`): [`Schema`](../interfaces/Schema.md)

Defined in: node\_modules/lambdaorm-base/schema/application/facade.d.ts:20

#### Parameters

##### dialect?

[`Dialect`](../enumerations/Dialect.md)

##### connection?

`any`

#### Returns

[`Schema`](../interfaces/Schema.md)

***

### initialize()

> **initialize**(`schema`, `args`): [`Schema`](../interfaces/Schema.md)

Defined in: node\_modules/lambdaorm-base/schema/application/facade.d.ts:21

#### Parameters

##### schema

[`Schema`](../interfaces/Schema.md)

##### args

[`InitializeSchemaArgs`](../interfaces/InitializeSchemaArgs.md)

#### Returns

[`Schema`](../interfaces/Schema.md)

***

### introspect()

> **introspect**(`schema`, `data`, `name`): [`SchemaData`](../interfaces/SchemaData.md)

Defined in: node\_modules/lambdaorm-base/schema/application/facade.d.ts:22

#### Parameters

##### schema

[`Schema`](../interfaces/Schema.md)

##### data

`any`

##### name

`string`

#### Returns

[`SchemaData`](../interfaces/SchemaData.md)

***

### match()

> **match**(`schema`, `mappings`, `options?`): `void`

Defined in: node\_modules/lambdaorm-base/schema/application/facade.d.ts:23

#### Parameters

##### schema

[`Schema`](../interfaces/Schema.md)

##### mappings

[`Mapping`](../interfaces/Mapping.md)[]

##### options?

[`MatchOptions`](../interfaces/MatchOptions.md)

#### Returns

`void`

***

### read()

> **read**(`workspace`): `Promise`\<`null` \| [`SchemaInfo`](../interfaces/SchemaInfo.md)\>

Defined in: node\_modules/lambdaorm-base/schema/application/facade.d.ts:26

#### Parameters

##### workspace

`string`

#### Returns

`Promise`\<`null` \| [`SchemaInfo`](../interfaces/SchemaInfo.md)\>

***

### schemaData()

> **schemaData**(`source`, `name`, `type`): [`SchemaData`](../interfaces/SchemaData.md)

Defined in: node\_modules/lambdaorm-base/schema/application/facade.d.ts:24

#### Parameters

##### source

`any`

##### name

`string`

##### type

`Type`

#### Returns

[`SchemaData`](../interfaces/SchemaData.md)

***

### write()

> **write**(`schema`, `path`): `Promise`\<`void`\>

Defined in: node\_modules/lambdaorm-base/schema/application/facade.d.ts:27

#### Parameters

##### schema

[`Schema`](../interfaces/Schema.md)

##### path

`string`

#### Returns

`Promise`\<`void`\>
