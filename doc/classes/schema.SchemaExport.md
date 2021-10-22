[Lambda ORM](../README.md) / [schema](../modules/schema.md) / SchemaExport

# Class: SchemaExport

[schema](../modules/schema.md).SchemaExport

## Hierarchy

- `SchemaActionDML`

  ↳ **`SchemaExport`**

## Table of contents

### Constructors

- [constructor](schema.SchemaExport.md#constructor)

### Methods

- [execute](schema.SchemaExport.md#execute)
- [sentence](schema.SchemaExport.md#sentence)

## Constructors

### constructor

• **new SchemaExport**(`orm`, `schema`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `orm` | [`IOrm`](../interfaces/model.IOrm.md) |
| `schema` | [`SchemaHelper`](schema.SchemaHelper.md) |

#### Inherited from

SchemaActionDML.constructor

#### Defined in

[schema/schemaActionDML.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/schema/schemaActionDML.ts#L9)

## Methods

### execute

▸ **execute**(`database`): `Promise`<[`SchemaData`](../interfaces/schema.SchemaData.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `database` | `string` |

#### Returns

`Promise`<[`SchemaData`](../interfaces/schema.SchemaData.md)\>

#### Defined in

[schema/schemaExport.ts:5](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/schema/schemaExport.ts#L5)

___

### sentence

▸ **sentence**(`dialect`): `Promise`<[`SchemaSentence`](../interfaces/schema.SchemaSentence.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dialect` | `string` |

#### Returns

`Promise`<[`SchemaSentence`](../interfaces/schema.SchemaSentence.md)\>

#### Inherited from

SchemaActionDML.sentence

#### Defined in

[schema/schemaActionDML.ts:15](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/schema/schemaActionDML.ts#L15)
