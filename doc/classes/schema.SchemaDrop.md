[Lambda ORM](../README.md) / [schema](../modules/schema.md) / SchemaDrop

# Class: SchemaDrop

[schema](../modules/schema.md).SchemaDrop

## Hierarchy

- `SchemaActionDDL`

  ↳ **`SchemaDrop`**

## Table of contents

### Constructors

- [constructor](schema.SchemaDrop.md#constructor)

### Methods

- [execute](schema.SchemaDrop.md#execute)
- [sentence](schema.SchemaDrop.md#sentence)

## Constructors

### constructor

• **new SchemaDrop**(`orm`, `schema`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `orm` | [`IOrm`](../interfaces/model.IOrm.md) |
| `schema` | [`SchemaHelper`](schema.SchemaHelper.md) |

#### Inherited from

SchemaActionDDL.constructor

#### Defined in

[schema/schemaActionDDL.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/schema/schemaActionDDL.ts#L8)

## Methods

### execute

▸ **execute**(`database`, `tryAllCan?`): `Promise`<[`ExecutionResult`](../interfaces/connection.ExecutionResult.md)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `database` | `string` | `undefined` |
| `tryAllCan` | `boolean` | `false` |

#### Returns

`Promise`<[`ExecutionResult`](../interfaces/connection.ExecutionResult.md)\>

#### Inherited from

SchemaActionDDL.execute

#### Defined in

[schema/schemaActionDDL.ts:14](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/schema/schemaActionDDL.ts#L14)

___

### sentence

▸ **sentence**(`dialect`): `any`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `dialect` | `string` |

#### Returns

`any`[]

#### Overrides

SchemaActionDDL.sentence

#### Defined in

[schema/schemaDrop.ts:4](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/schema/schemaDrop.ts#L4)
