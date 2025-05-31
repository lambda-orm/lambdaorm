[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / Language

# Interface: Language

Defined in: [src/lib/language/domain/ports/language.ts:6](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/ports/language.ts#L6)

## Properties

### dialects

> **dialects**: [`DialectService`](DialectService.md)[]

Defined in: [src/lib/language/domain/ports/language.ts:7](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/ports/language.ts#L7)

***

### name

> **name**: `string`

Defined in: [src/lib/language/domain/ports/language.ts:8](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/ports/language.ts#L8)

***

### solveComposite?

> `optional` **solveComposite**: `boolean`

Defined in: [src/lib/language/domain/ports/language.ts:9](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/ports/language.ts#L9)

## Methods

### ddlBuilder()

> **ddlBuilder**(`source`, `mapping`): [`DdlBuilder`](DdlBuilder.md)

Defined in: [src/lib/language/domain/ports/language.ts:11](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/ports/language.ts#L11)

#### Parameters

##### source

[`Source`](Source.md)

##### mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

#### Returns

[`DdlBuilder`](DdlBuilder.md)

***

### dmlBuilder()

> **dmlBuilder**(`source`, `mapping`): [`DmlBuilder`](DmlBuilder.md)

Defined in: [src/lib/language/domain/ports/language.ts:12](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/ports/language.ts#L12)

#### Parameters

##### source

[`Source`](Source.md)

##### mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

#### Returns

[`DmlBuilder`](DmlBuilder.md)

***

### getDialect()

> **getDialect**(`name`): [`DialectService`](DialectService.md)

Defined in: [src/lib/language/domain/ports/language.ts:10](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/ports/language.ts#L10)

#### Parameters

##### name

`string`

#### Returns

[`DialectService`](DialectService.md)
