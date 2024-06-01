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

[src/lib/language/application/services/ddlBuilder.ts:13](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/language/application/services/ddlBuilder.ts#L13)

## Properties

### stage

> `readonly` **stage**: `string`

#### Source

[src/lib/language/application/services/ddlBuilder.ts:15](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/language/application/services/ddlBuilder.ts#L15)

## Methods

### drop()

> **drop**(`mappings`): [`Query`](Query.md)[]

#### Parameters

• **mappings**: [`Mapping`](../interfaces/Mapping.md)[]

#### Returns

[`Query`](Query.md)[]

#### Source

[src/lib/language/application/services/ddlBuilder.ts:21](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/language/application/services/ddlBuilder.ts#L21)

***

### sync()

> **sync**(`mappings`): [`Query`](Query.md)[]

#### Parameters

• **mappings**: [`Mapping`](../interfaces/Mapping.md)[]

#### Returns

[`Query`](Query.md)[]

#### Source

[src/lib/language/application/services/ddlBuilder.ts:47](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/language/application/services/ddlBuilder.ts#L47)

***

### truncate()

> **truncate**(`mappings`): [`Query`](Query.md)[]

#### Parameters

• **mappings**: [`Mapping`](../interfaces/Mapping.md)[]

#### Returns

[`Query`](Query.md)[]

#### Source

[src/lib/language/application/services/ddlBuilder.ts:34](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/language/application/services/ddlBuilder.ts#L34)
