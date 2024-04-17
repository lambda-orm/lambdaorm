[Lambda ORM](../README.md) / SchemaFacade

# Class: SchemaFacade

## Table of contents

### Constructors

- [constructor](SchemaFacade.md#constructor)

### Properties

- [schemaService](SchemaFacade.md#schemaservice)

### Methods

- [complete](SchemaFacade.md#complete)
- [create](SchemaFacade.md#create)
- [initialize](SchemaFacade.md#initialize)
- [introspect](SchemaFacade.md#introspect)
- [match](SchemaFacade.md#match)
- [read](SchemaFacade.md#read)
- [schemaData](SchemaFacade.md#schemadata)
- [write](SchemaFacade.md#write)

## Constructors

### constructor

• **new SchemaFacade**(`schemaService`, `getSchemaData`, `extender`, `createSchema`, `initializeSchema`, `updateSchema`, `matchSchema`, `fileService`): [`SchemaFacade`](SchemaFacade.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `schemaService` | `SchemaService` |
| `getSchemaData` | [`GetSchemaSchema`](GetSchemaSchema.md) |
| `extender` | [`SchemaExtender`](SchemaExtender.md) |
| `createSchema` | [`CreateSchema`](CreateSchema.md) |
| `initializeSchema` | [`InitializeSchema`](InitializeSchema.md) |
| `updateSchema` | [`UpdateSchema`](UpdateSchema.md) |
| `matchSchema` | [`MatchSchema`](MatchSchema.md) |
| `fileService` | [`IFileSchemaService`](../interfaces/IFileSchemaService.md) |

#### Returns

[`SchemaFacade`](SchemaFacade.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/facade.d.ts:20

## Properties

### schemaService

• `Readonly` **schemaService**: `SchemaService`

#### Defined in

node_modules/lambdaorm-base/schema/application/facade.d.ts:12

## Methods

### complete

▸ **complete**(`schema`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | [`Schema`](../interfaces/Schema.md) |

#### Returns

`void`

#### Defined in

node_modules/lambdaorm-base/schema/application/facade.d.ts:26

___

### create

▸ **create**(`dialect?`, `connection?`): [`Schema`](../interfaces/Schema.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dialect?` | [`Dialect`](../enums/Dialect.md) |
| `connection?` | `any` |

#### Returns

[`Schema`](../interfaces/Schema.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/facade.d.ts:21

___

### initialize

▸ **initialize**(`schema`, `args`): [`Schema`](../interfaces/Schema.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | [`Schema`](../interfaces/Schema.md) |
| `args` | [`InitializeSchemaArgs`](../interfaces/InitializeSchemaArgs.md) |

#### Returns

[`Schema`](../interfaces/Schema.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/facade.d.ts:22

___

### introspect

▸ **introspect**(`schema`, `data`, `name`): [`SchemaData`](../interfaces/SchemaData.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | [`Schema`](../interfaces/Schema.md) |
| `data` | `any` |
| `name` | `string` |

#### Returns

[`SchemaData`](../interfaces/SchemaData.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/facade.d.ts:23

___

### match

▸ **match**(`schema`, `mappings`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | [`Schema`](../interfaces/Schema.md) |
| `mappings` | [`Mapping`](../interfaces/Mapping.md)[] |
| `options?` | [`MatchOptions`](../interfaces/MatchOptions.md) |

#### Returns

`void`

#### Defined in

node_modules/lambdaorm-base/schema/application/facade.d.ts:24

___

### read

▸ **read**(`workspace`): `Promise`\<``null`` \| [`SchemaInfo`](../interfaces/SchemaInfo.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `workspace` | `string` |

#### Returns

`Promise`\<``null`` \| [`SchemaInfo`](../interfaces/SchemaInfo.md)\>

#### Defined in

node_modules/lambdaorm-base/schema/application/facade.d.ts:27

___

### schemaData

▸ **schemaData**(`source`, `name`, `type`): [`SchemaData`](../interfaces/SchemaData.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `any` |
| `name` | `string` |
| `type` | `Type` |

#### Returns

[`SchemaData`](../interfaces/SchemaData.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/facade.d.ts:25

___

### write

▸ **write**(`schema`, `path`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | [`Schema`](../interfaces/Schema.md) |
| `path` | `string` |

#### Returns

`Promise`\<`void`\>

#### Defined in

node_modules/lambdaorm-base/schema/application/facade.d.ts:28
