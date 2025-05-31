[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / StageMappingService

# Class: StageMappingService

Defined in: [src/lib/stage/application/services/stateService.ts:40](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/services/stateService.ts#L40)

## Extends

- `StageStateService`\<[`MappingConfig`](../interfaces/MappingConfig.md)\>

## Constructors

### Constructor

> **new StageMappingService**(`schemaState`, `helper`): `StageMappingService`

Defined in: [src/lib/stage/application/services/stateService.ts:7](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/services/stateService.ts#L7)

#### Parameters

##### schemaState

[`SchemaState`](SchemaState.md)

##### helper

[`OrmH3lp`](OrmH3lp.md)

#### Returns

`StageMappingService`

#### Inherited from

`StageStateService<MappingConfig>.constructor`

## Accessors

### schemaDirPath

#### Get Signature

> **get** **schemaDirPath**(): `string`

Defined in: [src/lib/stage/application/services/stateService.ts:9](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/services/stateService.ts#L9)

##### Returns

`string`

#### Inherited from

`StageStateService.schemaDirPath`

## Methods

### get()

> **get**(`name`): `Promise`\<[`MappingConfig`](../interfaces/MappingConfig.md)\>

Defined in: [src/lib/stage/application/services/stateService.ts:13](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/services/stateService.ts#L13)

#### Parameters

##### name

`string`

#### Returns

`Promise`\<[`MappingConfig`](../interfaces/MappingConfig.md)\>

#### Inherited from

`StageStateService.get`

***

### getFile()

> **getFile**(`name`): `string`

Defined in: [src/lib/stage/application/services/stateService.ts:45](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/services/stateService.ts#L45)

#### Parameters

##### name

`string`

#### Returns

`string`

#### Overrides

`StageStateService.getFile`

***

### remove()

> **remove**(`name`): `Promise`\<`any`\>

Defined in: [src/lib/stage/application/services/stateService.ts:30](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/services/stateService.ts#L30)

#### Parameters

##### name

`string`

#### Returns

`Promise`\<`any`\>

#### Inherited from

`StageStateService.remove`

***

### update()

> **update**(`name`, `data`): `Promise`\<`void`\>

Defined in: [src/lib/stage/application/services/stateService.ts:25](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/services/stateService.ts#L25)

#### Parameters

##### name

`string`

##### data

[`MappingConfig`](../interfaces/MappingConfig.md)

#### Returns

`Promise`\<`void`\>

#### Inherited from

`StageStateService.update`
