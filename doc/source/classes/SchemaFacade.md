[Lambda ORM](../README.md) / SchemaFacade

# Class: SchemaFacade

## Table of contents

### Constructors

- [constructor](SchemaFacade.md#constructor)

### Properties

- [domain](SchemaFacade.md#domain)
- [mapping](SchemaFacade.md#mapping)
- [schema](SchemaFacade.md#schema)
- [source](SchemaFacade.md#source)
- [stage](SchemaFacade.md#stage)
- [view](SchemaFacade.md#view)
- [workspace](SchemaFacade.md#workspace)

### Methods

- [complete](SchemaFacade.md#complete)
- [create](SchemaFacade.md#create)
- [evalDataSourceRule](SchemaFacade.md#evaldatasourcerule)
- [get](SchemaFacade.md#get)
- [getSource](SchemaFacade.md#getsource)
- [initialize](SchemaFacade.md#initialize)

## Constructors

### constructor

• **new SchemaFacade**(`workspace`, `source`, `domain`, `mapping`, `stage`, `view`, `schemaService`, `routeService`, `extender`, `createSchema`, `loadSchema`, `getSchema`, `completeSchema`): [`SchemaFacade`](SchemaFacade.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `workspace` | `string` |
| `source` | [`DataSourceConfigService`](DataSourceConfigService.md) |
| `domain` | [`DomainConfigService`](DomainConfigService.md) |
| `mapping` | [`MappingsConfigService`](MappingsConfigService.md) |
| `stage` | [`StageConfigService`](StageConfigService.md) |
| `view` | [`ViewsConfigService`](ViewsConfigService.md) |
| `schemaService` | [`SchemaService`](SchemaService.md) |
| `routeService` | [`RouteService`](RouteService.md) |
| `extender` | [`SchemaExtender`](SchemaExtender.md) |
| `createSchema` | [`CreateSchema`](CreateSchema.md) |
| `loadSchema` | [`LoadSchema`](LoadSchema.md) |
| `getSchema` | [`GetSchema`](GetSchema.md) |
| `completeSchema` | [`CompleteSchema`](CompleteSchema.md) |

#### Returns

[`SchemaFacade`](SchemaFacade.md)

#### Defined in

[src/lib/schema/application/facade.ts:17](https://github.com/FlavioLionelRita/lambdaorm/blob/11da7208/src/lib/schema/application/facade.ts#L17)

## Properties

### domain

• `Readonly` **domain**: [`DomainConfigService`](DomainConfigService.md)

#### Defined in

[src/lib/schema/application/facade.ts:19](https://github.com/FlavioLionelRita/lambdaorm/blob/11da7208/src/lib/schema/application/facade.ts#L19)

___

### mapping

• `Readonly` **mapping**: [`MappingsConfigService`](MappingsConfigService.md)

#### Defined in

[src/lib/schema/application/facade.ts:20](https://github.com/FlavioLionelRita/lambdaorm/blob/11da7208/src/lib/schema/application/facade.ts#L20)

___

### schema

• **schema**: [`Schema`](../interfaces/Schema.md)

#### Defined in

[src/lib/schema/application/facade.ts:16](https://github.com/FlavioLionelRita/lambdaorm/blob/11da7208/src/lib/schema/application/facade.ts#L16)

___

### source

• `Readonly` **source**: [`DataSourceConfigService`](DataSourceConfigService.md)

#### Defined in

[src/lib/schema/application/facade.ts:18](https://github.com/FlavioLionelRita/lambdaorm/blob/11da7208/src/lib/schema/application/facade.ts#L18)

___

### stage

• `Readonly` **stage**: [`StageConfigService`](StageConfigService.md)

#### Defined in

[src/lib/schema/application/facade.ts:21](https://github.com/FlavioLionelRita/lambdaorm/blob/11da7208/src/lib/schema/application/facade.ts#L21)

___

### view

• `Readonly` **view**: [`ViewsConfigService`](ViewsConfigService.md)

#### Defined in

[src/lib/schema/application/facade.ts:22](https://github.com/FlavioLionelRita/lambdaorm/blob/11da7208/src/lib/schema/application/facade.ts#L22)

___

### workspace

• **workspace**: `string`

#### Defined in

[src/lib/schema/application/facade.ts:17](https://github.com/FlavioLionelRita/lambdaorm/blob/11da7208/src/lib/schema/application/facade.ts#L17)

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

[src/lib/schema/application/facade.ts:60](https://github.com/FlavioLionelRita/lambdaorm/blob/11da7208/src/lib/schema/application/facade.ts#L60)

___

### create

▸ **create**(): `Promise`\<[`Schema`](../interfaces/Schema.md)\>

#### Returns

`Promise`\<[`Schema`](../interfaces/Schema.md)\>

#### Defined in

[src/lib/schema/application/facade.ts:42](https://github.com/FlavioLionelRita/lambdaorm/blob/11da7208/src/lib/schema/application/facade.ts#L42)

___

### evalDataSourceRule

▸ **evalDataSourceRule**(`rule`, `clauseInfo`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rule` | [`DataSourceRule`](../interfaces/DataSourceRule.md) |
| `clauseInfo` | [`ClauseInfo`](../interfaces/ClauseInfo.md) |

#### Returns

`boolean`

#### Defined in

[src/lib/schema/application/facade.ts:34](https://github.com/FlavioLionelRita/lambdaorm/blob/11da7208/src/lib/schema/application/facade.ts#L34)

___

### get

▸ **get**(`source`): `Promise`\<``null`` \| [`Schema`](../interfaces/Schema.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `string` |

#### Returns

`Promise`\<``null`` \| [`Schema`](../interfaces/Schema.md)\>

#### Defined in

[src/lib/schema/application/facade.ts:46](https://github.com/FlavioLionelRita/lambdaorm/blob/11da7208/src/lib/schema/application/facade.ts#L46)

___

### getSource

▸ **getSource**(`clauseInfo`, `stage?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `clauseInfo` | [`ClauseInfo`](../interfaces/ClauseInfo.md) |
| `stage?` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/schema/application/facade.ts:38](https://github.com/FlavioLionelRita/lambdaorm/blob/11da7208/src/lib/schema/application/facade.ts#L38)

___

### initialize

▸ **initialize**(`source`): `Promise`\<[`Schema`](../interfaces/Schema.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `string` \| [`Schema`](../interfaces/Schema.md) |

#### Returns

`Promise`\<[`Schema`](../interfaces/Schema.md)\>

#### Defined in

[src/lib/schema/application/facade.ts:50](https://github.com/FlavioLionelRita/lambdaorm/blob/11da7208/src/lib/schema/application/facade.ts#L50)
