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

• **new DDLBuilderService**(`schemaState`, `languages`, `stage`, `helper`): [`DDLBuilderService`](DDLBuilderService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `schemaState` | [`SchemaState`](SchemaState.md) |
| `languages` | [`LanguagesService`](LanguagesService.md) |
| `stage` | `string` |
| `helper` | [`OrmH3lp`](OrmH3lp.md) |

#### Returns

[`DDLBuilderService`](DDLBuilderService.md)

#### Defined in

[src/lib/language/application/services/ddlBuilder.ts:17](https://github.com/lambda-orm/lambdaorm/blob/1f2197e4e78422749120d13ade98f551a6eed2cc/src/lib/language/application/services/ddlBuilder.ts#L17)

## Properties

### stage

• `Readonly` **stage**: `string`

#### Defined in

[src/lib/language/application/services/ddlBuilder.ts:19](https://github.com/lambda-orm/lambdaorm/blob/1f2197e4e78422749120d13ade98f551a6eed2cc/src/lib/language/application/services/ddlBuilder.ts#L19)

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

[src/lib/language/application/services/ddlBuilder.ts:25](https://github.com/lambda-orm/lambdaorm/blob/1f2197e4e78422749120d13ade98f551a6eed2cc/src/lib/language/application/services/ddlBuilder.ts#L25)

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

[src/lib/language/application/services/ddlBuilder.ts:51](https://github.com/lambda-orm/lambdaorm/blob/1f2197e4e78422749120d13ade98f551a6eed2cc/src/lib/language/application/services/ddlBuilder.ts#L51)

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

[src/lib/language/application/services/ddlBuilder.ts:38](https://github.com/lambda-orm/lambdaorm/blob/1f2197e4e78422749120d13ade98f551a6eed2cc/src/lib/language/application/services/ddlBuilder.ts#L38)
