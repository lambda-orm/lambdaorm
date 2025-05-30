[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / IFileSchemaService

# Interface: IFileSchemaService

Defined in: node\_modules/lambdaorm-base/schema/domain/ports/fileSchemaService.d.ts:2

## Methods

### read()

> **read**(`source`): `Promise`\<`null` \| [`SchemaInfo`](SchemaInfo.md)\>

Defined in: node\_modules/lambdaorm-base/schema/domain/ports/fileSchemaService.d.ts:3

#### Parameters

##### source

`string`

#### Returns

`Promise`\<`null` \| [`SchemaInfo`](SchemaInfo.md)\>

***

### write()

> **write**(`schema`, `fullPath`): `Promise`\<`void`\>

Defined in: node\_modules/lambdaorm-base/schema/domain/ports/fileSchemaService.d.ts:4

#### Parameters

##### schema

[`Schema`](Schema.md)

##### fullPath

`string`

#### Returns

`Promise`\<`void`\>
