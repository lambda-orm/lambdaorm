[Lambda ORM](../README.md) / [language](../modules/language.md) / ILanguage

# Interface: ILanguage

[language](../modules/language.md).ILanguage

## Table of contents

### Properties

- [dialects](language.ILanguage.md#dialects)
- [name](language.ILanguage.md#name)

### Accessors

- [executor](language.ILanguage.md#executor)
- [query](language.ILanguage.md#query)
- [schema](language.ILanguage.md#schema)

## Properties

### dialects

• **dialects**: `any`

#### Defined in

[language/iLanguage.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/language/iLanguage.ts#L7)

___

### name

• **name**: `string`

#### Defined in

[language/iLanguage.ts:6](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/language/iLanguage.ts#L6)

## Accessors

### executor

• `get` **executor**(): [`IOperandExecutor`](language.IOperandExecutor.md)

#### Returns

[`IOperandExecutor`](language.IOperandExecutor.md)

#### Defined in

[language/iLanguage.ts:10](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/language/iLanguage.ts#L10)

___

### query

• `get` **query**(): [`IQueryBuilder`](language.IQueryBuilder.md)

#### Returns

[`IQueryBuilder`](language.IQueryBuilder.md)

#### Defined in

[language/iLanguage.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/language/iLanguage.ts#L9)

___

### schema

• `get` **schema**(): [`ISchemaBuilder`](language.ISchemaBuilder.md)

#### Returns

[`ISchemaBuilder`](language.ISchemaBuilder.md)

#### Defined in

[language/iLanguage.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/language/iLanguage.ts#L8)
