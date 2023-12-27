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

• **new StageModelService**(`workspace`, `schemaFacade`, `helper`): [`StageModelService`](StageModelService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `workspace` | `string` |
| `schemaFacade` | [`SchemaFacade`](SchemaFacade.md) |
| `helper` | [`Helper`](Helper.md) |

#### Returns

[`StageModelService`](StageModelService.md)

#### Inherited from

StageStateService\<ModelConfig\>.constructor

#### Defined in

<<<<<<< HEAD
[src/lib/stage/application/services/stateService.ts:8](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/stage/application/services/stateService.ts#L8)
=======
[src/lib/stage/application/services/stateService.ts:8](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/stage/application/services/stateService.ts#L8)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/stage/application/services/stateService.ts:56](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/stage/application/services/stateService.ts#L56)
=======
[src/lib/stage/application/services/stateService.ts:56](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/stage/application/services/stateService.ts#L56)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/stage/application/services/stateService.ts:10](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/stage/application/services/stateService.ts#L10)
=======
[src/lib/stage/application/services/stateService.ts:10](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/stage/application/services/stateService.ts#L10)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/stage/application/services/stateService.ts:52](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/stage/application/services/stateService.ts#L52)
=======
[src/lib/stage/application/services/stateService.ts:52](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/stage/application/services/stateService.ts#L52)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/stage/application/services/stateService.ts:27](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/stage/application/services/stateService.ts#L27)
=======
[src/lib/stage/application/services/stateService.ts:27](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/stage/application/services/stateService.ts#L27)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/stage/application/services/stateService.ts:22](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/stage/application/services/stateService.ts#L22)
=======
[src/lib/stage/application/services/stateService.ts:22](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/stage/application/services/stateService.ts#L22)
>>>>>>> release/1.2.0
