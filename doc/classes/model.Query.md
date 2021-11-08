[Lambda ORM](../README.md) / [model](../modules/model.md) / Query

# Class: Query

[model](../modules/model.md).Query

## Table of contents

### Constructors

- [constructor](model.Query.md#constructor)

### Properties

- [children](model.Query.md#children)
- [columns](model.Query.md#columns)
- [database](model.Query.md#database)
- [dialect](model.Query.md#dialect)
- [entity](model.Query.md#entity)
- [name](model.Query.md#name)
- [parameters](model.Query.md#parameters)
- [sentence](model.Query.md#sentence)

## Constructors

### constructor

• **new Query**(`name`, `database`, `dialect`, `sentence`, `entity`, `columns?`, `parameters?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `database` | `string` | `undefined` |
| `dialect` | `string` | `undefined` |
| `sentence` | `string` | `undefined` |
| `entity` | `string` | `undefined` |
| `columns` | [`Property`](../interfaces/model.Property.md)[] | `[]` |
| `parameters` | [`Parameter`](../interfaces/model.Parameter.md)[] | `[]` |

#### Defined in

[model/query.ts:15](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/query.ts#L15)

## Properties

### children

• **children**: [`Include`](model.Include.md)[]

#### Defined in

[model/query.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/query.ts#L7)

___

### columns

• **columns**: [`Property`](../interfaces/model.Property.md)[]

#### Defined in

[model/query.ts:13](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/query.ts#L13)

___

### database

• **database**: `string`

#### Defined in

[model/query.ts:10](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/query.ts#L10)

___

### dialect

• **dialect**: `string`

#### Defined in

[model/query.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/query.ts#L9)

___

### entity

• **entity**: `string`

#### Defined in

[model/query.ts:11](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/query.ts#L11)

___

### name

• **name**: `string`

#### Defined in

[model/query.ts:5](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/query.ts#L5)

___

### parameters

• **parameters**: [`Parameter`](../interfaces/model.Parameter.md)[]

#### Defined in

[model/query.ts:14](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/query.ts#L14)

___

### sentence

• **sentence**: `string`

#### Defined in

[model/query.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/query.ts#L8)
