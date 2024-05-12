[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / StageMappingService

# Class: StageMappingService

## Extends

- `StageStateService`\<[`MappingConfig`](../interfaces/MappingConfig.md)\>

## Constructors

### new StageMappingService()

> **new StageMappingService**(`schemaState`, `helper`): [`StageMappingService`](StageMappingService.md)

#### Parameters

• **schemaState**: [`SchemaState`](SchemaState.md)

• **helper**: [`OrmH3lp`](OrmH3lp.md)

#### Returns

[`StageMappingService`](StageMappingService.md)

#### Inherited from

`StageStateService<MappingConfig>.constructor`

#### Source

[src/lib/stage/application/services/stateService.ts:7](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/stage/application/services/stateService.ts#L7)

## Accessors

### schemaDirPath

> `get` **schemaDirPath**(): `string`

#### Returns

`string`

#### Source

[src/lib/stage/application/services/stateService.ts:9](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/stage/application/services/stateService.ts#L9)

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

[src/lib/stage/application/services/stateService.ts:13](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/stage/application/services/stateService.ts#L13)

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

[src/lib/stage/application/services/stateService.ts:45](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/stage/application/services/stateService.ts#L45)

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

[src/lib/stage/application/services/stateService.ts:30](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/stage/application/services/stateService.ts#L30)

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

[src/lib/stage/application/services/stateService.ts:25](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/stage/application/services/stateService.ts#L25)
