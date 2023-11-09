[Lambda ORM](../README.md) / LanguagePort

# Interface: LanguagePort

## Table of contents

### Properties

- [dialects](LanguagePort.md#dialects)
- [name](LanguagePort.md#name)
- [solveComposite](LanguagePort.md#solvecomposite)

### Methods

- [ddlBuilder](LanguagePort.md#ddlbuilder)
- [dmlBuilder](LanguagePort.md#dmlbuilder)
- [getDialect](LanguagePort.md#getdialect)

## Properties

### dialects

• **dialects**: [`DialectService`](../classes/DialectService.md)[]

#### Defined in

[src/lib/language/application/ports/languagePort.ts:8](https://github.com/FlavioLionelRita/lambdaorm/blob/4b4255a5/src/lib/language/application/ports/languagePort.ts#L8)

___

### name

• **name**: `string`

#### Defined in

[src/lib/language/application/ports/languagePort.ts:9](https://github.com/FlavioLionelRita/lambdaorm/blob/4b4255a5/src/lib/language/application/ports/languagePort.ts#L9)

___

### solveComposite

• `Optional` **solveComposite**: `boolean`

#### Defined in

[src/lib/language/application/ports/languagePort.ts:10](https://github.com/FlavioLionelRita/lambdaorm/blob/4b4255a5/src/lib/language/application/ports/languagePort.ts#L10)

## Methods

### ddlBuilder

▸ **ddlBuilder**(`source`, `mapping`): [`DDLBuilderPort`](DDLBuilderPort.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`Source`](Source.md) |
| `mapping` | [`MappingConfigService`](../classes/MappingConfigService.md) |

#### Returns

[`DDLBuilderPort`](DDLBuilderPort.md)

#### Defined in

[src/lib/language/application/ports/languagePort.ts:12](https://github.com/FlavioLionelRita/lambdaorm/blob/4b4255a5/src/lib/language/application/ports/languagePort.ts#L12)

___

### dmlBuilder

▸ **dmlBuilder**(`source`, `mapping`): [`DMLBuilderPort`](DMLBuilderPort.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`Source`](Source.md) |
| `mapping` | [`MappingConfigService`](../classes/MappingConfigService.md) |

#### Returns

[`DMLBuilderPort`](DMLBuilderPort.md)

#### Defined in

[src/lib/language/application/ports/languagePort.ts:13](https://github.com/FlavioLionelRita/lambdaorm/blob/4b4255a5/src/lib/language/application/ports/languagePort.ts#L13)

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

[src/lib/language/application/ports/languagePort.ts:11](https://github.com/FlavioLionelRita/lambdaorm/blob/4b4255a5/src/lib/language/application/ports/languagePort.ts#L11)
