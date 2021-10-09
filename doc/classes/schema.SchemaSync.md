[Lambda ORM](../README.md) / [schema](../modules/schema.md) / SchemaSync

# Class: SchemaSync

[schema](../modules/schema.md).SchemaSync

## Hierarchy

- `SchemaActionDDL`

  ↳ **`SchemaSync`**

## Table of contents

### Constructors

- [constructor](schema.SchemaSync.md#constructor)

### Methods

- [execute](schema.SchemaSync.md#execute)
- [sentence](schema.SchemaSync.md#sentence)
- [serialize](schema.SchemaSync.md#serialize)

## Constructors

### constructor

• **new SchemaSync**(`orm`, `schema`, `delta`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `orm` | [`IOrm`](../interfaces/model.IOrm.md) |
| `schema` | [`SchemaHelper`](schema.SchemaHelper.md) |
| `delta` | [`Delta`](model.Delta.md) |

#### Overrides

SchemaActionDDL.constructor

#### Defined in

[schema/schemaSync.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/schema/schemaSync.ts#L8)

## Methods

### execute

▸ **execute**(`database`): `Promise`<[`ExecutionSyncResult`](../interfaces/schema.ExecutionSyncResult.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `database` | `string` |

#### Returns

`Promise`<[`ExecutionSyncResult`](../interfaces/schema.ExecutionSyncResult.md)\>

#### Overrides

SchemaActionDDL.execute

#### Defined in

[schema/schemaSync.ts:21](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/schema/schemaSync.ts#L21)

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

[schema/schemaSync.ts:17](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/schema/schemaSync.ts#L17)

___

### serialize

▸ **serialize**(): [`Delta`](model.Delta.md)

#### Returns

[`Delta`](model.Delta.md)

#### Defined in

[schema/schemaSync.ts:13](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/schema/schemaSync.ts#L13)
