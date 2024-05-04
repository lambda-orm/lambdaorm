[Lambda ORM](../README.md) / Language

# Interface: Language

## Table of contents

### Properties

- [dialects](Language.md#dialects)
- [name](Language.md#name)
- [solveComposite](Language.md#solvecomposite)

### Methods

- [ddlBuilder](Language.md#ddlbuilder)
- [dmlBuilder](Language.md#dmlbuilder)
- [getDialect](Language.md#getdialect)

## Properties

### dialects

• **dialects**: [`DialectService`](../classes/DialectService.md)[]

#### Defined in

[src/lib/language/application/ports/language.ts:7](https://github.com/lambda-orm/lambdaorm/blob/ad1fa3d559707b5bcfa3c09434382228cb95f3a8/src/lib/language/application/ports/language.ts#L7)

___

### name

• **name**: `string`

#### Defined in

[src/lib/language/application/ports/language.ts:8](https://github.com/lambda-orm/lambdaorm/blob/ad1fa3d559707b5bcfa3c09434382228cb95f3a8/src/lib/language/application/ports/language.ts#L8)

___

### solveComposite

• `Optional` **solveComposite**: `boolean`

#### Defined in

[src/lib/language/application/ports/language.ts:9](https://github.com/lambda-orm/lambdaorm/blob/ad1fa3d559707b5bcfa3c09434382228cb95f3a8/src/lib/language/application/ports/language.ts#L9)

## Methods

### ddlBuilder

▸ **ddlBuilder**(`source`, `mapping`): [`DdlBuilder`](DdlBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`Source`](Source.md) |
| `mapping` | [`MappingConfigService`](../classes/MappingConfigService.md) |

#### Returns

[`DdlBuilder`](DdlBuilder.md)

#### Defined in

[src/lib/language/application/ports/language.ts:11](https://github.com/lambda-orm/lambdaorm/blob/ad1fa3d559707b5bcfa3c09434382228cb95f3a8/src/lib/language/application/ports/language.ts#L11)

___

### dmlBuilder

▸ **dmlBuilder**(`source`, `mapping`): [`DmlBuilder`](DmlBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`Source`](Source.md) |
| `mapping` | [`MappingConfigService`](../classes/MappingConfigService.md) |

#### Returns

[`DmlBuilder`](DmlBuilder.md)

#### Defined in

[src/lib/language/application/ports/language.ts:12](https://github.com/lambda-orm/lambdaorm/blob/ad1fa3d559707b5bcfa3c09434382228cb95f3a8/src/lib/language/application/ports/language.ts#L12)

___

### getDialect

▸ **getDialect**(`name`): [`DialectService`](../classes/DialectService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`DialectService`](../classes/DialectService.md)

#### Defined in

[src/lib/language/application/ports/language.ts:10](https://github.com/lambda-orm/lambdaorm/blob/ad1fa3d559707b5bcfa3c09434382228cb95f3a8/src/lib/language/application/ports/language.ts#L10)
