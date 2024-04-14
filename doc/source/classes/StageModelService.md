[Lambda ORM](../README.md) / StageModelService

# Class: StageModelService

## Hierarchy

- `StageStateService`\<[`ModelConfig`](../interfaces/ModelConfig.md)\>

  ↳ **`StageModelService`**

## Table of contents

### Constructors

- [constructor](StageModelService.md#constructor)

### Methods

- [ddl](StageModelService.md#ddl)
- [get](StageModelService.md#get)
- [getFile](StageModelService.md#getfile)
- [remove](StageModelService.md#remove)
- [update](StageModelService.md#update)

## Constructors

### constructor

• **new StageModelService**(`workspace`, `schemaState`, `helper`): [`StageModelService`](StageModelService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `workspace` | `string` |
| `schemaState` | [`SchemaState`](SchemaState.md) |
| `helper` | [`OrmH3lp`](OrmH3lp.md) |

#### Returns

[`StageModelService`](StageModelService.md)

#### Inherited from

StageStateService\<ModelConfig\>.constructor

#### Defined in

[src/lib/stage/application/services/stateService.ts:8](https://github.com/lambda-orm/lambdaorm/blob/6a9e7c63/src/lib/stage/application/services/stateService.ts#L8)

## Methods

### ddl

▸ **ddl**(`stage`, `action`, `queries`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stage` | `string` |
| `action` | `string` |
| `queries` | [`Query`](Query.md)[] |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/lib/stage/application/services/stateService.ts:56](https://github.com/lambda-orm/lambdaorm/blob/6a9e7c63/src/lib/stage/application/services/stateService.ts#L56)

___

### get

▸ **get**(`name`): `Promise`\<[`ModelConfig`](../interfaces/ModelConfig.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`\<[`ModelConfig`](../interfaces/ModelConfig.md)\>

#### Inherited from

StageStateService.get

#### Defined in

[src/lib/stage/application/services/stateService.ts:10](https://github.com/lambda-orm/lambdaorm/blob/6a9e7c63/src/lib/stage/application/services/stateService.ts#L10)

___

### getFile

▸ **getFile**(`name`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`any`

#### Overrides

StageStateService.getFile

#### Defined in

[src/lib/stage/application/services/stateService.ts:52](https://github.com/lambda-orm/lambdaorm/blob/6a9e7c63/src/lib/stage/application/services/stateService.ts#L52)

___

### remove

▸ **remove**(`name`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`\<`any`\>

#### Inherited from

StageStateService.remove

#### Defined in

[src/lib/stage/application/services/stateService.ts:27](https://github.com/lambda-orm/lambdaorm/blob/6a9e7c63/src/lib/stage/application/services/stateService.ts#L27)

___

### update

▸ **update**(`name`, `data`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `data` | [`ModelConfig`](../interfaces/ModelConfig.md) |

#### Returns

`Promise`\<`void`\>

#### Inherited from

StageStateService.update

#### Defined in

[src/lib/stage/application/services/stateService.ts:22](https://github.com/lambda-orm/lambdaorm/blob/6a9e7c63/src/lib/stage/application/services/stateService.ts#L22)
