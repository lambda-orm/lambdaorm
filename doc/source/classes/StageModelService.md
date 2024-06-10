[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / StageModelService

# Class: StageModelService

## Extends

- `StageStateService`\<[`ModelConfig`](../interfaces/ModelConfig.md)\>

## Constructors

### new StageModelService()

> **new StageModelService**(`schemaState`, `helper`): [`StageModelService`](StageModelService.md)

#### Parameters

• **schemaState**: [`SchemaState`](SchemaState.md)

• **helper**: [`OrmH3lp`](OrmH3lp.md)

#### Returns

[`StageModelService`](StageModelService.md)

#### Inherited from

`StageStateService<ModelConfig>.constructor`

#### Source

[src/lib/stage/application/services/stateService.ts:7](https://github.com/lambda-orm/lambdaorm/blob/cfdea01485e47d6bfb9f5073528259581c5e1563/src/lib/stage/application/services/stateService.ts#L7)

## Accessors

### schemaDirPath

> `get` **schemaDirPath**(): `string`

#### Returns

`string`

#### Source

[src/lib/stage/application/services/stateService.ts:9](https://github.com/lambda-orm/lambdaorm/blob/cfdea01485e47d6bfb9f5073528259581c5e1563/src/lib/stage/application/services/stateService.ts#L9)

## Methods

### ddl()

> **ddl**(`action`, `queries`): `Promise`\<`void`\>

#### Parameters

• **action**: `string`

• **queries**: [`Query`](Query.md)[]

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/stage/application/services/stateService.ts:59](https://github.com/lambda-orm/lambdaorm/blob/cfdea01485e47d6bfb9f5073528259581c5e1563/src/lib/stage/application/services/stateService.ts#L59)

***

### get()

> **get**(`name`): `Promise`\<[`ModelConfig`](../interfaces/ModelConfig.md)\>

#### Parameters

• **name**: `string`

#### Returns

`Promise`\<[`ModelConfig`](../interfaces/ModelConfig.md)\>

#### Inherited from

`StageStateService.get`

#### Source

[src/lib/stage/application/services/stateService.ts:13](https://github.com/lambda-orm/lambdaorm/blob/cfdea01485e47d6bfb9f5073528259581c5e1563/src/lib/stage/application/services/stateService.ts#L13)

***

### getFile()

> **getFile**(`name`): `string`

#### Parameters

• **name**: `string`

#### Returns

`string`

#### Overrides

`StageStateService.getFile`

#### Source

[src/lib/stage/application/services/stateService.ts:55](https://github.com/lambda-orm/lambdaorm/blob/cfdea01485e47d6bfb9f5073528259581c5e1563/src/lib/stage/application/services/stateService.ts#L55)

***

### remove()

> **remove**(`name`): `Promise`\<`any`\>

#### Parameters

• **name**: `string`

#### Returns

`Promise`\<`any`\>

#### Inherited from

`StageStateService.remove`

#### Source

[src/lib/stage/application/services/stateService.ts:30](https://github.com/lambda-orm/lambdaorm/blob/cfdea01485e47d6bfb9f5073528259581c5e1563/src/lib/stage/application/services/stateService.ts#L30)

***

### update()

> **update**(`name`, `data`): `Promise`\<`void`\>

#### Parameters

• **name**: `string`

• **data**: [`ModelConfig`](../interfaces/ModelConfig.md)

#### Returns

`Promise`\<`void`\>

#### Inherited from

`StageStateService.update`

#### Source

[src/lib/stage/application/services/stateService.ts:25](https://github.com/lambda-orm/lambdaorm/blob/cfdea01485e47d6bfb9f5073528259581c5e1563/src/lib/stage/application/services/stateService.ts#L25)
