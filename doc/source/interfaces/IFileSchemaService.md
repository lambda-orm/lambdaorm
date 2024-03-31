[Lambda ORM](../README.md) / IFileSchemaService

# Interface: IFileSchemaService

## Table of contents

### Methods

- [read](IFileSchemaService.md#read)
- [write](IFileSchemaService.md#write)

## Methods

### read

▸ **read**(`source`): `Promise`\<``null`` \| [`SchemaInfo`](SchemaInfo.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `string` |

#### Returns

`Promise`\<``null`` \| [`SchemaInfo`](SchemaInfo.md)\>

#### Defined in

node_modules/lambdaorm-base/schema/application/ports/fileSchemaService.d.ts:3

___

### write

▸ **write**(`schema`, `fullPath`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | [`Schema`](Schema.md) |
| `fullPath` | `string` |

#### Returns

`Promise`\<`void`\>

#### Defined in

node_modules/lambdaorm-base/schema/application/ports/fileSchemaService.d.ts:4
