[Lambda ORM](../README.md) / DDLBuilderService

# Class: DDLBuilderService

## Table of contents

### Constructors

- [constructor](DDLBuilderService.md#constructor)

### Properties

- [stage](DDLBuilderService.md#stage)

### Methods

- [drop](DDLBuilderService.md#drop)
- [sync](DDLBuilderService.md#sync)
- [truncate](DDLBuilderService.md#truncate)

## Constructors

### constructor

• **new DDLBuilderService**(`schemaFacade`, `languages`, `stage`, `helper`): [`DDLBuilderService`](DDLBuilderService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `schemaFacade` | [`SchemaFacade`](SchemaFacade.md) |
| `languages` | [`LanguagesService`](LanguagesService.md) |
| `stage` | `string` |
| `helper` | [`Helper`](Helper.md) |

#### Returns

[`DDLBuilderService`](DDLBuilderService.md)

#### Defined in

<<<<<<< HEAD
[src/lib/language/application/services/ddlBuilder.ts:14](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/language/application/services/ddlBuilder.ts#L14)
=======
[src/lib/language/application/services/ddlBuilder.ts:14](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/language/application/services/ddlBuilder.ts#L14)
>>>>>>> release/1.2.0

## Properties

### stage

• `Readonly` **stage**: `string`

#### Defined in

<<<<<<< HEAD
[src/lib/language/application/services/ddlBuilder.ts:16](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/language/application/services/ddlBuilder.ts#L16)
=======
[src/lib/language/application/services/ddlBuilder.ts:16](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/language/application/services/ddlBuilder.ts#L16)
>>>>>>> release/1.2.0

## Methods

### drop

▸ **drop**(`mappings`): [`Query`](Query.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `mappings` | [`Mapping`](../interfaces/Mapping.md)[] |

#### Returns

[`Query`](Query.md)[]

#### Defined in

<<<<<<< HEAD
[src/lib/language/application/services/ddlBuilder.ts:22](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/language/application/services/ddlBuilder.ts#L22)
=======
[src/lib/language/application/services/ddlBuilder.ts:22](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/language/application/services/ddlBuilder.ts#L22)
>>>>>>> release/1.2.0

___

### sync

▸ **sync**(`mappings`): [`Query`](Query.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `mappings` | [`Mapping`](../interfaces/Mapping.md)[] |

#### Returns

[`Query`](Query.md)[]

#### Defined in

<<<<<<< HEAD
[src/lib/language/application/services/ddlBuilder.ts:48](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/language/application/services/ddlBuilder.ts#L48)
=======
[src/lib/language/application/services/ddlBuilder.ts:48](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/language/application/services/ddlBuilder.ts#L48)
>>>>>>> release/1.2.0

___

### truncate

▸ **truncate**(`mappings`): [`Query`](Query.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `mappings` | [`Mapping`](../interfaces/Mapping.md)[] |

#### Returns

[`Query`](Query.md)[]

#### Defined in

<<<<<<< HEAD
[src/lib/language/application/services/ddlBuilder.ts:35](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/language/application/services/ddlBuilder.ts#L35)
=======
[src/lib/language/application/services/ddlBuilder.ts:35](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/language/application/services/ddlBuilder.ts#L35)
>>>>>>> release/1.2.0
