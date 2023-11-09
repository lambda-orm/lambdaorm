[Lambda ORM](../README.md) / LoadSchema

# Class: LoadSchema

## Table of contents

### Constructors

- [constructor](LoadSchema.md#constructor)

### Methods

- [load](LoadSchema.md#load)

## Constructors

### constructor

• **new LoadSchema**(`source`, `domain`, `mapping`, `stage`, `view`, `extender`, `helper`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`DataSourceConfigService`](DataSourceConfigService.md) |
| `domain` | [`DomainConfigService`](DomainConfigService.md) |
| `mapping` | [`MappingsConfigService`](MappingsConfigService.md) |
| `stage` | [`StageConfigService`](StageConfigService.md) |
| `view` | [`ViewsConfigService`](ViewsConfigService.md) |
| `extender` | [`SchemaExtender`](SchemaExtender.md) |
| `helper` | [`Helper`](Helper.md) |

#### Defined in

[src/lib/schema/application/useCases/load.ts:13](https://github.com/FlavioLionelRita/lambdaorm/blob/45e3c40a/src/lib/schema/application/useCases/load.ts#L13)

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

[src/lib/schema/application/useCases/load.ts:21](https://github.com/FlavioLionelRita/lambdaorm/blob/45e3c40a/src/lib/schema/application/useCases/load.ts#L21)
