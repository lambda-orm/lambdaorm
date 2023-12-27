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

<<<<<<< HEAD
[src/lib/language/application/ports/languagePort.ts:7](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/language/application/ports/languagePort.ts#L7)
=======
[src/lib/language/application/ports/languagePort.ts:7](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/language/application/ports/languagePort.ts#L7)
>>>>>>> release/1.2.0

___

### name

• **name**: `string`

#### Defined in

<<<<<<< HEAD
[src/lib/language/application/ports/languagePort.ts:8](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/language/application/ports/languagePort.ts#L8)
=======
[src/lib/language/application/ports/languagePort.ts:8](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/language/application/ports/languagePort.ts#L8)
>>>>>>> release/1.2.0

___

### solveComposite

• `Optional` **solveComposite**: `boolean`

#### Defined in

<<<<<<< HEAD
[src/lib/language/application/ports/languagePort.ts:9](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/language/application/ports/languagePort.ts#L9)
=======
[src/lib/language/application/ports/languagePort.ts:9](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/language/application/ports/languagePort.ts#L9)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/language/application/ports/languagePort.ts:11](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/language/application/ports/languagePort.ts#L11)
=======
[src/lib/language/application/ports/languagePort.ts:11](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/language/application/ports/languagePort.ts#L11)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/language/application/ports/languagePort.ts:12](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/language/application/ports/languagePort.ts#L12)
=======
[src/lib/language/application/ports/languagePort.ts:12](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/language/application/ports/languagePort.ts#L12)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/language/application/ports/languagePort.ts:10](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/language/application/ports/languagePort.ts#L10)
=======
[src/lib/language/application/ports/languagePort.ts:10](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/language/application/ports/languagePort.ts#L10)
>>>>>>> release/1.2.0
