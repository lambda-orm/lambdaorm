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

node_modules/lambdaorm-base/schema/application/useCases/get.d.ts:5

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

node_modules/lambdaorm-base/schema/application/useCases/get.d.ts:6
