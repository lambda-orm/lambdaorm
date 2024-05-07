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

[src/lib/language/application/services/ddlBuilder.ts:17](https://github.com/lambda-orm/lambdaorm/blob/b5545097c371addc7799ba0f29b9e8204e97d347/src/lib/language/application/services/ddlBuilder.ts#L17)

## Properties

### stage

> `readonly` **stage**: `string`

#### Source

[src/lib/language/application/services/ddlBuilder.ts:19](https://github.com/lambda-orm/lambdaorm/blob/b5545097c371addc7799ba0f29b9e8204e97d347/src/lib/language/application/services/ddlBuilder.ts#L19)

## Methods

### drop()

> **drop**(`mappings`): [`Query`](Query.md)[]

#### Parameters

• **mappings**: [`Mapping`](../interfaces/Mapping.md)[]

#### Returns

[`Query`](Query.md)[]

#### Source

[src/lib/language/application/services/ddlBuilder.ts:25](https://github.com/lambda-orm/lambdaorm/blob/b5545097c371addc7799ba0f29b9e8204e97d347/src/lib/language/application/services/ddlBuilder.ts#L25)

***

### sync()

> **sync**(`mappings`): [`Query`](Query.md)[]

#### Parameters

• **mappings**: [`Mapping`](../interfaces/Mapping.md)[]

#### Returns

[`Query`](Query.md)[]

#### Source

[src/lib/language/application/services/ddlBuilder.ts:51](https://github.com/lambda-orm/lambdaorm/blob/b5545097c371addc7799ba0f29b9e8204e97d347/src/lib/language/application/services/ddlBuilder.ts#L51)

***

### truncate()

> **truncate**(`mappings`): [`Query`](Query.md)[]

#### Parameters

• **mappings**: [`Mapping`](../interfaces/Mapping.md)[]

#### Returns

[`Query`](Query.md)[]

#### Source

[src/lib/language/application/services/ddlBuilder.ts:38](https://github.com/lambda-orm/lambdaorm/blob/b5545097c371addc7799ba0f29b9e8204e97d347/src/lib/language/application/services/ddlBuilder.ts#L38)
