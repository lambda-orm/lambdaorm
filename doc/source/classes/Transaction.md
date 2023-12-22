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

• **new Transaction**(`queryExecutor`): [`Transaction`](Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `queryExecutor` | [`QueryExecutor`](../interfaces/QueryExecutor.md) |

#### Returns

[`Transaction`](Transaction.md)

#### Defined in

[src/lib/execution/domain/transaction.ts:7](https://github.com/FlavioLionelRita/lambdaorm/blob/b5326020/src/lib/execution/domain/transaction.ts#L7)

## Accessors

### options

• `get` **options**(): [`QueryOptions`](../interfaces/QueryOptions.md)

#### Returns

[`QueryOptions`](../interfaces/QueryOptions.md)

#### Defined in

[src/lib/execution/domain/transaction.ts:15](https://github.com/FlavioLionelRita/lambdaorm/blob/b5326020/src/lib/execution/domain/transaction.ts#L15)

## Methods

### execute

▸ **execute**(`query`, `data?`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Query`](Query.md) |
| `data` | `any` |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/execution/domain/transaction.ts:11](https://github.com/FlavioLionelRita/lambdaorm/blob/b5326020/src/lib/execution/domain/transaction.ts#L11)
