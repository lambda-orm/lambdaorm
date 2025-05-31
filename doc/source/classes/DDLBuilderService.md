[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / DDLBuilderService

# Class: DDLBuilderService

Defined in: [src/lib/language/application/services/ddlBuilder.ts:11](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/application/services/ddlBuilder.ts#L11)

## Constructors

### Constructor

> **new DDLBuilderService**(`schemaState`, `languages`, `stage`, `helper`): `DDLBuilderService`

Defined in: [src/lib/language/application/services/ddlBuilder.ts:13](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/application/services/ddlBuilder.ts#L13)

#### Parameters

##### schemaState

[`SchemaState`](SchemaState.md)

##### languages

[`LanguagesService`](LanguagesService.md)

##### stage

`string`

##### helper

[`OrmH3lp`](OrmH3lp.md)

#### Returns

`DDLBuilderService`

## Properties

### stage

> `readonly` **stage**: `string`

Defined in: [src/lib/language/application/services/ddlBuilder.ts:15](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/application/services/ddlBuilder.ts#L15)

## Methods

### drop()

> **drop**(`mappings`): [`Query`](Query.md)[]

Defined in: [src/lib/language/application/services/ddlBuilder.ts:21](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/application/services/ddlBuilder.ts#L21)

#### Parameters

##### mappings

[`Mapping`](../interfaces/Mapping.md)[]

#### Returns

[`Query`](Query.md)[]

***

### sync()

> **sync**(`mappings`): [`Query`](Query.md)[]

Defined in: [src/lib/language/application/services/ddlBuilder.ts:47](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/application/services/ddlBuilder.ts#L47)

#### Parameters

##### mappings

[`Mapping`](../interfaces/Mapping.md)[]

#### Returns

[`Query`](Query.md)[]

***

### truncate()

> **truncate**(`mappings`): [`Query`](Query.md)[]

Defined in: [src/lib/language/application/services/ddlBuilder.ts:34](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/application/services/ddlBuilder.ts#L34)

#### Parameters

##### mappings

[`Mapping`](../interfaces/Mapping.md)[]

#### Returns

[`Query`](Query.md)[]
