[Lambda ORM](../README.md) / SchemaService

# Class: SchemaService

## Table of contents

### Constructors

- [constructor](SchemaService.md#constructor)

### Methods

- [addEntityTypes](SchemaService.md#addentitytypes)
- [newApplication](SchemaService.md#newapplication)
- [newDomain](SchemaService.md#newdomain)
- [newInfrastructure](SchemaService.md#newinfrastructure)
- [newPathsApp](SchemaService.md#newpathsapp)
- [newSchema](SchemaService.md#newschema)

## Constructors

### constructor

• **new SchemaService**(`helper`): [`SchemaService`](SchemaService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `helper` | `H3lp` |

#### Returns

[`SchemaService`](SchemaService.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/services/schemaService.d.ts:5

## Methods

### addEntityTypes

▸ **addEntityTypes**(`schema`, `types`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | [`Schema`](../interfaces/Schema.md) |
| `types` | [`EntityType`](../interfaces/EntityType.md)[] |

#### Returns

`void`

#### Defined in

node_modules/lambdaorm-base/schema/application/services/schemaService.d.ts:11

___

### newApplication

▸ **newApplication**(): [`ApplicationSchema`](../interfaces/ApplicationSchema.md)

#### Returns

[`ApplicationSchema`](../interfaces/ApplicationSchema.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/services/schemaService.d.ts:9

___

### newDomain

▸ **newDomain**(): [`DomainSchema`](../interfaces/DomainSchema.md)

#### Returns

[`DomainSchema`](../interfaces/DomainSchema.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/services/schemaService.d.ts:8

___

### newInfrastructure

▸ **newInfrastructure**(): [`InfrastructureSchema`](../interfaces/InfrastructureSchema.md)

#### Returns

[`InfrastructureSchema`](../interfaces/InfrastructureSchema.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/services/schemaService.d.ts:7

___

### newPathsApp

▸ **newPathsApp**(): [`AppPathsConfig`](../interfaces/AppPathsConfig.md)

#### Returns

[`AppPathsConfig`](../interfaces/AppPathsConfig.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/services/schemaService.d.ts:10

___

### newSchema

▸ **newSchema**(): [`Schema`](../interfaces/Schema.md)

#### Returns

[`Schema`](../interfaces/Schema.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/services/schemaService.d.ts:6
