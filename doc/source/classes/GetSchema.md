[Lambda ORM](../README.md) / GetSchema

# Class: GetSchema

## Table of contents

### Constructors

- [constructor](GetSchema.md#constructor)

### Methods

- [get](GetSchema.md#get)

## Constructors

### constructor

• **new GetSchema**(`fileReader`): [`GetSchema`](GetSchema.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileReader` | [`IFileSchemaReader`](../interfaces/IFileSchemaReader.md) |

#### Returns

[`GetSchema`](GetSchema.md)

#### Defined in

[src/lib/schema/application/useCases/get.ts:6](https://github.com/FlavioLionelRita/lambdaorm/blob/ae0d2056/src/lib/schema/application/useCases/get.ts#L6)

## Methods

### get

▸ **get**(`source?`): `Promise`\<``null`` \| [`Schema`](../interfaces/Schema.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `source?` | `string` \| [`Schema`](../interfaces/Schema.md) |

#### Returns

`Promise`\<``null`` \| [`Schema`](../interfaces/Schema.md)\>

#### Defined in

[src/lib/schema/application/useCases/get.ts:8](https://github.com/FlavioLionelRita/lambdaorm/blob/ae0d2056/src/lib/schema/application/useCases/get.ts#L8)
