[Lambda ORM](../README.md) / [model](../modules/model.md) / ActionObserver

# Class: ActionObserver

[model](../modules/model.md).ActionObserver

## Table of contents

### Constructors

- [constructor](model.ActionObserver.md#constructor)

### Properties

- [action](model.ActionObserver.md#action)
- [condition](model.ActionObserver.md#condition)

### Methods

- [after](model.ActionObserver.md#after)
- [before](model.ActionObserver.md#before)
- [error](model.ActionObserver.md#error)

## Constructors

### constructor

• **new ActionObserver**(`action`, `condition?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`ObservableAction`](../enums/model.ObservableAction.md) |
| `condition?` | `string` |

#### Defined in

[src/lib/model/orm.ts:25](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/orm.ts#L25)

## Properties

### action

• **action**: [`ObservableAction`](../enums/model.ObservableAction.md)

#### Defined in

[src/lib/model/orm.ts:23](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/orm.ts#L23)

___

### condition

• `Optional` **condition**: `string`

#### Defined in

[src/lib/model/orm.ts:24](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/orm.ts#L24)

## Methods

### after

▸ `Abstract` **after**(`query`, `data`, `options`, `result`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Query`](model.Query.md) |
| `data` | `any` |
| `options` | [`OrmOptions`](../interfaces/model.OrmOptions.md) |
| `result` | `any` |

#### Returns

`void`

#### Defined in

[src/lib/model/orm.ts:31](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/orm.ts#L31)

___

### before

▸ `Abstract` **before**(`query`, `data`, `options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Query`](model.Query.md) |
| `data` | `any` |
| `options` | [`OrmOptions`](../interfaces/model.OrmOptions.md) |

#### Returns

`void`

#### Defined in

[src/lib/model/orm.ts:30](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/orm.ts#L30)

___

### error

▸ `Abstract` **error**(`query`, `data`, `options`, `error`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Query`](model.Query.md) |
| `data` | `any` |
| `options` | [`OrmOptions`](../interfaces/model.OrmOptions.md) |
| `error` | `any` |

#### Returns

`void`

#### Defined in

[src/lib/model/orm.ts:32](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/orm.ts#L32)
