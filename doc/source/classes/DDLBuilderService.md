[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / DDLBuilderService

# Class: DDLBuilderService

## Constructors

### new DDLBuilderService()

> **new DDLBuilderService**(`schemaState`, `languages`, `stage`, `helper`): [`DDLBuilderService`](DDLBuilderService.md)

#### Parameters

• **schemaState**: [`SchemaState`](SchemaState.md)

• **languages**: [`LanguagesService`](LanguagesService.md)

• **stage**: `string`

• **helper**: [`OrmH3lp`](OrmH3lp.md)

#### Returns

[`DDLBuilderService`](DDLBuilderService.md)

#### Source

[src/lib/language/application/services/ddlBuilder.ts:14](https://github.com/lambda-orm/lambdaorm/blob/15952b17a2af20fc678f913dd5cbf226a467196b/src/lib/language/application/services/ddlBuilder.ts#L14)

## Properties

### stage

> `readonly` **stage**: `string`

#### Source

[src/lib/language/application/services/ddlBuilder.ts:16](https://github.com/lambda-orm/lambdaorm/blob/15952b17a2af20fc678f913dd5cbf226a467196b/src/lib/language/application/services/ddlBuilder.ts#L16)

## Methods

### drop()

> **drop**(`mappings`): [`Query`](Query.md)[]

#### Parameters

• **mappings**: [`Mapping`](../interfaces/Mapping.md)[]

#### Returns

[`Query`](Query.md)[]

#### Source

[src/lib/language/application/services/ddlBuilder.ts:22](https://github.com/lambda-orm/lambdaorm/blob/15952b17a2af20fc678f913dd5cbf226a467196b/src/lib/language/application/services/ddlBuilder.ts#L22)

***

### sync()

> **sync**(`mappings`): [`Query`](Query.md)[]

#### Parameters

• **mappings**: [`Mapping`](../interfaces/Mapping.md)[]

#### Returns

[`Query`](Query.md)[]

#### Source

[src/lib/language/application/services/ddlBuilder.ts:48](https://github.com/lambda-orm/lambdaorm/blob/15952b17a2af20fc678f913dd5cbf226a467196b/src/lib/language/application/services/ddlBuilder.ts#L48)

***

### truncate()

> **truncate**(`mappings`): [`Query`](Query.md)[]

#### Parameters

• **mappings**: [`Mapping`](../interfaces/Mapping.md)[]

#### Returns

[`Query`](Query.md)[]

#### Source

[src/lib/language/application/services/ddlBuilder.ts:35](https://github.com/lambda-orm/lambdaorm/blob/15952b17a2af20fc678f913dd5cbf226a467196b/src/lib/language/application/services/ddlBuilder.ts#L35)
