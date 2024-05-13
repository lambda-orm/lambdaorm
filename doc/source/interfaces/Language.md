[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / Language

# Interface: Language

## Properties

### dialects

> **dialects**: [`DialectService`](../classes/DialectService.md)[]

#### Source

[src/lib/language/application/ports/language.ts:7](https://github.com/lambda-orm/lambdaorm/blob/46e86d864b5f4223fb0b1052cc3ab701d4af5a21/src/lib/language/application/ports/language.ts#L7)

***

### name

> **name**: `string`

#### Source

[src/lib/language/application/ports/language.ts:8](https://github.com/lambda-orm/lambdaorm/blob/46e86d864b5f4223fb0b1052cc3ab701d4af5a21/src/lib/language/application/ports/language.ts#L8)

***

### solveComposite?

> `optional` **solveComposite**: `boolean`

#### Source

[src/lib/language/application/ports/language.ts:9](https://github.com/lambda-orm/lambdaorm/blob/46e86d864b5f4223fb0b1052cc3ab701d4af5a21/src/lib/language/application/ports/language.ts#L9)

## Methods

### ddlBuilder()

> **ddlBuilder**(`source`, `mapping`): [`DdlBuilder`](DdlBuilder.md)

#### Parameters

• **source**: [`Source`](Source.md)

• **mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

#### Returns

[`DdlBuilder`](DdlBuilder.md)

#### Source

[src/lib/language/application/ports/language.ts:11](https://github.com/lambda-orm/lambdaorm/blob/46e86d864b5f4223fb0b1052cc3ab701d4af5a21/src/lib/language/application/ports/language.ts#L11)

***

### dmlBuilder()

> **dmlBuilder**(`source`, `mapping`): [`DmlBuilder`](DmlBuilder.md)

#### Parameters

• **source**: [`Source`](Source.md)

• **mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

#### Returns

[`DmlBuilder`](DmlBuilder.md)

#### Source

[src/lib/language/application/ports/language.ts:12](https://github.com/lambda-orm/lambdaorm/blob/46e86d864b5f4223fb0b1052cc3ab701d4af5a21/src/lib/language/application/ports/language.ts#L12)

***

### getDialect()

> **getDialect**(`name`): [`DialectService`](../classes/DialectService.md)

#### Parameters

• **name**: `string`

#### Returns

[`DialectService`](../classes/DialectService.md)

#### Source

[src/lib/language/application/ports/language.ts:10](https://github.com/lambda-orm/lambdaorm/blob/46e86d864b5f4223fb0b1052cc3ab701d4af5a21/src/lib/language/application/ports/language.ts#L10)
