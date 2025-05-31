[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / StageModelService

# Class: StageModelService

Defined in: [src/lib/stage/application/services/stateService.ts:50](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/services/stateService.ts#L50)

## Extends

- `StageStateService`\<[`ModelConfig`](../interfaces/ModelConfig.md)\>

## Constructors

### Constructor

> **new StageModelService**(`schemaState`, `helper`): `StageModelService`

Defined in: [src/lib/stage/application/services/stateService.ts:7](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/services/stateService.ts#L7)

#### Parameters

##### schemaState

[`SchemaState`](SchemaState.md)

##### helper

[`OrmH3lp`](OrmH3lp.md)

#### Returns

`StageModelService`

#### Inherited from

`StageStateService<ModelConfig>.constructor`

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

### ddl()

> **ddl**(`action`, `queries`): `Promise`\<`void`\>

Defined in: [src/lib/stage/application/services/stateService.ts:59](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/services/stateService.ts#L59)

#### Parameters

##### action

`string`

##### queries

[`Query`](Query.md)[]

#### Returns

`Promise`\<`void`\>

***

### get()

> **get**(`name`): `Promise`\<[`ModelConfig`](../interfaces/ModelConfig.md)\>

Defined in: [src/lib/stage/application/services/stateService.ts:13](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/services/stateService.ts#L13)

#### Parameters

##### name

`string`

#### Returns

`Promise`\<[`ModelConfig`](../interfaces/ModelConfig.md)\>

#### Inherited from

`StageStateService.get`

***

### getFile()

> **getFile**(`name`): `string`

Defined in: [src/lib/stage/application/services/stateService.ts:55](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/services/stateService.ts#L55)

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

[`ModelConfig`](../interfaces/ModelConfig.md)

#### Returns

`Promise`\<`void`\>

#### Inherited from

`StageStateService.update`
