[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / StageMappingService

# Class: StageMappingService

## Extends

- `StageStateService`\<[`MappingConfig`](../interfaces/MappingConfig.md)\>

## Constructors

### new StageMappingService()

> **new StageMappingService**(`workspace`, `schemaState`, `helper`): [`StageMappingService`](StageMappingService.md)

#### Parameters

• **workspace**: `string`

• **schemaState**: [`SchemaState`](SchemaState.md)

• **helper**: [`OrmH3lp`](OrmH3lp.md)

#### Returns

[`StageMappingService`](StageMappingService.md)

#### Inherited from

`StageStateService<MappingConfig>.constructor`

#### Source

[src/lib/stage/application/services/stateService.ts:8](https://github.com/lambda-orm/lambdaorm/blob/b5545097c371addc7799ba0f29b9e8204e97d347/src/lib/stage/application/services/stateService.ts#L8)

## Methods

### get()

> **get**(`name`): `Promise`\<[`MappingConfig`](../interfaces/MappingConfig.md)\>

#### Parameters

• **name**: `string`

#### Returns

`Promise`\<[`MappingConfig`](../interfaces/MappingConfig.md)\>

#### Inherited from

`StageStateService.get`

#### Source

[src/lib/stage/application/services/stateService.ts:10](https://github.com/lambda-orm/lambdaorm/blob/b5545097c371addc7799ba0f29b9e8204e97d347/src/lib/stage/application/services/stateService.ts#L10)

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

[src/lib/stage/application/services/stateService.ts:42](https://github.com/lambda-orm/lambdaorm/blob/b5545097c371addc7799ba0f29b9e8204e97d347/src/lib/stage/application/services/stateService.ts#L42)

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

[src/lib/stage/application/services/stateService.ts:27](https://github.com/lambda-orm/lambdaorm/blob/b5545097c371addc7799ba0f29b9e8204e97d347/src/lib/stage/application/services/stateService.ts#L27)

***

### update()

> **update**(`name`, `data`): `Promise`\<`void`\>

#### Parameters

• **name**: `string`

• **data**: [`MappingConfig`](../interfaces/MappingConfig.md)

#### Returns

`Promise`\<`void`\>

#### Inherited from

`StageStateService.update`

#### Source

[src/lib/stage/application/services/stateService.ts:22](https://github.com/lambda-orm/lambdaorm/blob/b5545097c371addc7799ba0f29b9e8204e97d347/src/lib/stage/application/services/stateService.ts#L22)
