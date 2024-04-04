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
- [schemaData](SchemaFacade.md#schemadata)
- [updateFromData](SchemaFacade.md#updatefromdata)
- [updateFromMapping](SchemaFacade.md#updatefrommapping)

## Constructors

### constructor

• **new SchemaFacade**(`schemaService`, `getSchemaData`, `extender`, `createSchema`, `updateSchema`, `matchSchema`): [`SchemaFacade`](SchemaFacade.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `schemaService` | `SchemaService` |
| `getSchemaData` | [`GetSchemaSchema`](GetSchemaSchema.md) |
| `extender` | [`SchemaExtender`](SchemaExtender.md) |
| `createSchema` | [`CreateSchema`](CreateSchema.md) |
| `updateSchema` | [`UpdateSchema`](UpdateSchema.md) |
| `matchSchema` | [`MatchSchema`](MatchSchema.md) |

#### Returns

[`SchemaFacade`](SchemaFacade.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/facade.d.ts:16

## Properties

### schemaService

• `Readonly` **schemaService**: `SchemaService`

#### Defined in

node_modules/lambdaorm-base/schema/application/facade.d.ts:10

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

node_modules/lambdaorm-base/schema/application/facade.d.ts:21

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

node_modules/lambdaorm-base/schema/application/facade.d.ts:17

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

node_modules/lambdaorm-base/schema/application/facade.d.ts:20

___

### updateFromData

▸ **updateFromData**(`schema`, `data`, `name`): [`SchemaData`](../interfaces/SchemaData.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | [`Schema`](../interfaces/Schema.md) |
| `data` | `any` |
| `name` | `string` |

#### Returns

[`SchemaData`](../interfaces/SchemaData.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/facade.d.ts:18

___

### updateFromMapping

▸ **updateFromMapping**(`schema`, `mappings`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | [`Schema`](../interfaces/Schema.md) |
| `mappings` | [`Mapping`](../interfaces/Mapping.md)[] |
| `options?` | [`MatchOptions`](../interfaces/MatchOptions.md) |

#### Returns

`void`

#### Defined in

node_modules/lambdaorm-base/schema/application/facade.d.ts:19
