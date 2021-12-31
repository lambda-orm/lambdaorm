[Lambda ORM](../README.md) / [stage](../modules/stage.md) / StageState

# Class: StageState

[stage](../modules/stage.md).StageState

## Table of contents

### Constructors

- [constructor](stage.StageState.md#constructor)

### Methods

- [get](stage.StageState.md#get)
- [getFile](stage.StageState.md#getfile)
- [remove](stage.StageState.md#remove)
- [updateData](stage.StageState.md#updatedata)
- [updateModel](stage.StageState.md#updatemodel)

## Constructors

### constructor

• **new StageState**(`schema`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | [`SchemaConfig`](manager.SchemaConfig.md) |

#### Defined in

[src/lib/stage/stageState.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/stage/stageState.ts#L8)

## Methods

### get

▸ **get**(`name`): `Promise`<[`ModelState`](../interfaces/model.ModelState.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`<[`ModelState`](../interfaces/model.ModelState.md)\>

#### Defined in

[src/lib/stage/stageState.ts:12](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/stage/stageState.ts#L12)

___

### getFile

▸ **getFile**(`name`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`any`

#### Defined in

[src/lib/stage/stageState.ts:44](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/stage/stageState.ts#L44)

___

### remove

▸ **remove**(`name`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/stage/stageState.ts:39](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/stage/stageState.ts#L39)

___

### updateData

▸ **updateData**(`name`, `mappingData`, `pendingData`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `mappingData` | `any` |
| `pendingData` | `any`[] |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/stage/stageState.ts:31](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/stage/stageState.ts#L31)

___

### updateModel

▸ **updateModel**(`name`, `model`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `model` | [`Model`](../interfaces/model.Model.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/stage/stageState.ts:24](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/stage/stageState.ts#L24)
