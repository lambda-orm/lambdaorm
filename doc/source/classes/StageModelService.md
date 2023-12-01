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

• **new StageModelService**(`schemaFacade`, `helper`): [`StageModelService`](StageModelService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `schemaFacade` | [`SchemaFacade`](SchemaFacade.md) |
| `helper` | [`Helper`](Helper.md) |

#### Returns

[`StageModelService`](StageModelService.md)

#### Inherited from

StageStateService\<ModelConfig\>.constructor

#### Defined in

[src/lib/stage/application/services/stateService.ts:9](https://github.com/FlavioLionelRita/lambdaorm/blob/b900e4c6/src/lib/stage/application/services/stateService.ts#L9)

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

[src/lib/stage/application/services/stateService.ts:57](https://github.com/FlavioLionelRita/lambdaorm/blob/b900e4c6/src/lib/stage/application/services/stateService.ts#L57)

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

[src/lib/stage/application/services/stateService.ts:11](https://github.com/FlavioLionelRita/lambdaorm/blob/b900e4c6/src/lib/stage/application/services/stateService.ts#L11)

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

[src/lib/stage/application/services/stateService.ts:53](https://github.com/FlavioLionelRita/lambdaorm/blob/b900e4c6/src/lib/stage/application/services/stateService.ts#L53)

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

[src/lib/stage/application/services/stateService.ts:28](https://github.com/FlavioLionelRita/lambdaorm/blob/b900e4c6/src/lib/stage/application/services/stateService.ts#L28)

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

[src/lib/stage/application/services/stateService.ts:23](https://github.com/FlavioLionelRita/lambdaorm/blob/b900e4c6/src/lib/stage/application/services/stateService.ts#L23)
