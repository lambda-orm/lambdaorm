[Lambda ORM](../README.md) / Transaction

# Class: Transaction

## Table of contents

### Constructors

- [constructor](Transaction.md#constructor)

### Accessors

- [options](Transaction.md#options)

### Methods

- [execute](Transaction.md#execute)

## Constructors

### constructor

• **new Transaction**(`queryExecutor`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `queryExecutor` | [`QueryExecutor`](QueryExecutor.md) |

#### Defined in

[src/lib/execution/domain/transaction.ts:6](https://github.com/FlavioLionelRita/lambdaorm/blob/f313d751/src/lib/execution/domain/transaction.ts#L6)

## Accessors

### options

• `get` **options**(): [`QueryOptions`](../interfaces/QueryOptions.md)

#### Returns

[`QueryOptions`](../interfaces/QueryOptions.md)

#### Defined in

[src/lib/execution/domain/transaction.ts:14](https://github.com/FlavioLionelRita/lambdaorm/blob/f313d751/src/lib/execution/domain/transaction.ts#L14)

## Methods

### execute

▸ **execute**(`query`, `data?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Query`](Query.md) |
| `data` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/execution/domain/transaction.ts:10](https://github.com/FlavioLionelRita/lambdaorm/blob/f313d751/src/lib/execution/domain/transaction.ts#L10)
