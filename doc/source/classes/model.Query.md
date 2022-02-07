[Lambda ORM](../README.md) / [model](../modules/model.md) / Query

# Class: Query

[model](../modules/model.md).Query

## Table of contents

### Constructors

- [constructor](model.Query.md#constructor)

### Properties

- [children](model.Query.md#children)
- [columns](model.Query.md#columns)
- [dataSource](model.Query.md#datasource)
- [dialect](model.Query.md#dialect)
- [entity](model.Query.md#entity)
- [name](model.Query.md#name)
- [parameters](model.Query.md#parameters)
- [sentence](model.Query.md#sentence)

## Constructors

### constructor

• **new Query**(`name`, `dialect`, `dataSource`, `sentence`, `entity`, `columns?`, `parameters?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `dialect` | `string` | `undefined` |
| `dataSource` | `string` | `undefined` |
| `sentence` | `string` | `undefined` |
| `entity` | `string` | `undefined` |
| `columns` | [`Property`](../interfaces/model.Property.md)[] | `[]` |
| `parameters` | [`Parameter`](../interfaces/model.Parameter.md)[] | `[]` |

#### Defined in

[src/lib/model/query.ts:15](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/model/query.ts#L15)

## Properties

### children

• **children**: [`Include`](model.Include.md)[]

#### Defined in

[src/lib/model/query.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/model/query.ts#L7)

___

### columns

• **columns**: [`Property`](../interfaces/model.Property.md)[]

#### Defined in

[src/lib/model/query.ts:13](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/model/query.ts#L13)

___

### dataSource

• **dataSource**: `string`

#### Defined in

[src/lib/model/query.ts:10](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/model/query.ts#L10)

___

### dialect

• **dialect**: `string`

#### Defined in

[src/lib/model/query.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/model/query.ts#L9)

___

### entity

• **entity**: `string`

#### Defined in

[src/lib/model/query.ts:11](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/model/query.ts#L11)

___

### name

• **name**: `string`

#### Defined in

[src/lib/model/query.ts:5](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/model/query.ts#L5)

___

### parameters

• **parameters**: [`Parameter`](../interfaces/model.Parameter.md)[]

#### Defined in

[src/lib/model/query.ts:14](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/model/query.ts#L14)

___

### sentence

• **sentence**: `string`

#### Defined in

[src/lib/model/query.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/model/query.ts#L8)
