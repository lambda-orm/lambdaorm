[Lambda ORM](../README.md) / QueryExecutor

# Class: QueryExecutor

## Implements

- [`IQueryInternalExecutor`](../interfaces/IQueryInternalExecutor.md)

## Table of contents

### Constructors

- [constructor](QueryExecutor.md#constructor)

### Properties

- [options](QueryExecutor.md#options)

### Methods

- [\_execute](QueryExecutor.md#_execute)
- [commit](QueryExecutor.md#commit)
- [execute](QueryExecutor.md#execute)
- [release](QueryExecutor.md#release)
- [rollback](QueryExecutor.md#rollback)

## Constructors

### constructor

• **new QueryExecutor**(`connectionFacade`, `languages`, `schemaFacade`, `expressions`, `options`, `helper`, `transactional?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `connectionFacade` | [`ConnectionFacade`](ConnectionFacade.md) | `undefined` |
| `languages` | [`LanguagesService`](LanguagesService.md) | `undefined` |
| `schemaFacade` | [`SchemaFacade`](SchemaFacade.md) | `undefined` |
| `expressions` | `Expressions` | `undefined` |
| `options` | [`QueryOptions`](../interfaces/QueryOptions.md) | `undefined` |
| `helper` | [`Helper`](Helper.md) | `undefined` |
| `transactional` | `boolean` | `false` |

#### Defined in

[src/lib/execution/application/services/queryExecutor/queryExecutor.ts:24](https://github.com/FlavioLionelRita/lambdaorm/blob/df242d69/src/lib/execution/application/services/queryExecutor/queryExecutor.ts#L24)

## Properties

### options

• `Readonly` **options**: [`QueryOptions`](../interfaces/QueryOptions.md)

#### Defined in

[src/lib/execution/application/services/queryExecutor/queryExecutor.ts:29](https://github.com/FlavioLionelRita/lambdaorm/blob/df242d69/src/lib/execution/application/services/queryExecutor/queryExecutor.ts#L29)

## Methods

### \_execute

▸ **_execute**(`query`, `data`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Query`](Query.md) |
| `data` | [`Data`](Data.md) |

#### Returns

`Promise`<`any`\>

#### Implementation of

[IQueryInternalExecutor](../interfaces/IQueryInternalExecutor.md).[_execute](../interfaces/IQueryInternalExecutor.md#_execute)

#### Defined in

[src/lib/execution/application/services/queryExecutor/queryExecutor.ts:85](https://github.com/FlavioLionelRita/lambdaorm/blob/df242d69/src/lib/execution/application/services/queryExecutor/queryExecutor.ts#L85)

___

### commit

▸ **commit**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/execution/application/services/queryExecutor/queryExecutor.ts:53](https://github.com/FlavioLionelRita/lambdaorm/blob/df242d69/src/lib/execution/application/services/queryExecutor/queryExecutor.ts#L53)

___

### execute

▸ **execute**(`query`, `data`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Query`](Query.md) |
| `data` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/execution/application/services/queryExecutor/queryExecutor.ts:75](https://github.com/FlavioLionelRita/lambdaorm/blob/df242d69/src/lib/execution/application/services/queryExecutor/queryExecutor.ts#L75)

___

### release

▸ **release**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/execution/application/services/queryExecutor/queryExecutor.ts:67](https://github.com/FlavioLionelRita/lambdaorm/blob/df242d69/src/lib/execution/application/services/queryExecutor/queryExecutor.ts#L67)

___

### rollback

▸ **rollback**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/execution/application/services/queryExecutor/queryExecutor.ts:60](https://github.com/FlavioLionelRita/lambdaorm/blob/df242d69/src/lib/execution/application/services/queryExecutor/queryExecutor.ts#L60)
