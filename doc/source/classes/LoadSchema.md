[Lambda ORM](../README.md) / LoadSchema

# Class: LoadSchema

## Table of contents

### Constructors

- [constructor](LoadSchema.md#constructor)

### Methods

- [load](LoadSchema.md#load)

## Constructors

### constructor

• **new LoadSchema**(`source`, `domain`, `mapping`, `stage`, `view`, `extender`, `helper`): [`LoadSchema`](LoadSchema.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`DataSourceConfigService`](DataSourceConfigService.md) |
| `domain` | [`DomainConfigService`](DomainConfigService.md) |
| `mapping` | [`MappingsConfigService`](MappingsConfigService.md) |
| `stage` | [`StageConfigService`](StageConfigService.md) |
| `view` | [`ViewsConfigService`](ViewsConfigService.md) |
| `extender` | [`SchemaExtender`](SchemaExtender.md) |
| `helper` | `H3lp` |

#### Returns

[`LoadSchema`](LoadSchema.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/useCases/load.d.ts:17

## Methods

### load

▸ **load**(`_schema`): [`Schema`](../interfaces/Schema.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_schema` | [`Schema`](../interfaces/Schema.md) |

#### Returns

[`Schema`](../interfaces/Schema.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/useCases/load.d.ts:18
