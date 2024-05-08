[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / StageModelService

# Class: StageModelService

## Extends

- `StageStateService`\<[`ModelConfig`](../interfaces/ModelConfig.md)\>

## Constructors

### new StageModelService()

> **new StageModelService**(`workspace`, `schemaState`, `helper`): [`StageModelService`](StageModelService.md)

#### Parameters

• **workspace**: `string`

• **schemaState**: [`SchemaState`](SchemaState.md)

• **helper**: [`OrmH3lp`](OrmH3lp.md)

#### Returns

[`StageModelService`](StageModelService.md)

#### Inherited from

`StageStateService<ModelConfig>.constructor`

#### Source

[src/lib/stage/application/services/stateService.ts:8](https://github.com/lambda-orm/lambdaorm/blob/15952b17a2af20fc678f913dd5cbf226a467196b/src/lib/stage/application/services/stateService.ts#L8)

## Methods

### ddl()

> **ddl**(`stage`, `action`, `queries`): `Promise`\<`void`\>

#### Parameters

• **stage**: `string`

• **action**: `string`

• **queries**: [`Query`](Query.md)[]

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/stage/application/services/stateService.ts:56](https://github.com/lambda-orm/lambdaorm/blob/15952b17a2af20fc678f913dd5cbf226a467196b/src/lib/stage/application/services/stateService.ts#L56)

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

[src/lib/stage/application/services/stateService.ts:10](https://github.com/lambda-orm/lambdaorm/blob/15952b17a2af20fc678f913dd5cbf226a467196b/src/lib/stage/application/services/stateService.ts#L10)

***

### getFile()

> **getFile**(`name`): `any`

#### Parameters

• **name**: `string`

#### Returns

`any`

#### Overrides

`StageStateService.getFile`

#### Source

[src/lib/stage/application/services/stateService.ts:52](https://github.com/lambda-orm/lambdaorm/blob/15952b17a2af20fc678f913dd5cbf226a467196b/src/lib/stage/application/services/stateService.ts#L52)

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

[src/lib/stage/application/services/stateService.ts:27](https://github.com/lambda-orm/lambdaorm/blob/15952b17a2af20fc678f913dd5cbf226a467196b/src/lib/stage/application/services/stateService.ts#L27)

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

[src/lib/stage/application/services/stateService.ts:22](https://github.com/lambda-orm/lambdaorm/blob/15952b17a2af20fc678f913dd5cbf226a467196b/src/lib/stage/application/services/stateService.ts#L22)
