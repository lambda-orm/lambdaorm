[Lambda ORM](../README.md) / StageMappingService

# Class: StageMappingService

## Hierarchy

- `StageStateService`\<[`MappingConfig`](../interfaces/MappingConfig.md)\>

  ↳ **`StageMappingService`**

## Table of contents

### Constructors

- [constructor](StageMappingService.md#constructor)

### Methods

- [get](StageMappingService.md#get)
- [getFile](StageMappingService.md#getfile)
- [remove](StageMappingService.md#remove)
- [update](StageMappingService.md#update)

## Constructors

### constructor

• **new StageMappingService**(`workspace`, `schemaFacade`, `helper`): [`StageMappingService`](StageMappingService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `workspace` | `string` |
| `schemaFacade` | [`SchemaFacade`](SchemaFacade.md) |
| `helper` | [`Helper`](Helper.md) |

#### Returns

[`StageMappingService`](StageMappingService.md)

#### Inherited from

StageStateService\<MappingConfig\>.constructor

#### Defined in

<<<<<<< HEAD
[src/lib/stage/application/services/stateService.ts:8](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/stage/application/services/stateService.ts#L8)
=======
[src/lib/stage/application/services/stateService.ts:8](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/stage/application/services/stateService.ts#L8)
>>>>>>> release/1.2.0

## Methods

### get

▸ **get**(`name`): `Promise`\<[`MappingConfig`](../interfaces/MappingConfig.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`\<[`MappingConfig`](../interfaces/MappingConfig.md)\>

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
[src/lib/stage/application/services/stateService.ts:42](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/stage/application/services/stateService.ts#L42)
=======
[src/lib/stage/application/services/stateService.ts:42](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/stage/application/services/stateService.ts#L42)
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
| `data` | [`MappingConfig`](../interfaces/MappingConfig.md) |

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
