[Lambda ORM](../README.md) / [stage](../modules/stage.md) / StageModel

# Class: StageModel

[stage](../modules/stage.md).StageModel

## Hierarchy

- `StageState`<[`ModelConfig`](../interfaces/model.ModelConfig.md)\>

  ↳ **`StageModel`**

## Table of contents

### Constructors

- [constructor](stage.StageModel.md#constructor)

### Methods

- [ddl](stage.StageModel.md#ddl)
- [get](stage.StageModel.md#get)
- [getFile](stage.StageModel.md#getfile)
- [remove](stage.StageModel.md#remove)
- [update](stage.StageModel.md#update)

## Constructors

### constructor

• **new StageModel**(`schema`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | [`SchemaManager`](manager.SchemaManager.md) |

#### Inherited from

StageState<ModelConfig\>.constructor

#### Defined in

[src/lib/stage/stageState.ts:9](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/stage/stageState.ts#L9)

## Methods

### ddl

▸ **ddl**(`stage`, `action`, `queries`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stage` | `string` |
| `action` | `string` |
| `queries` | [`Query`](model.Query.md)[] |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/stage/stageState.ts:59](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/stage/stageState.ts#L59)

___

### get

▸ **get**(`name`): `Promise`<[`ModelConfig`](../interfaces/model.ModelConfig.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`<[`ModelConfig`](../interfaces/model.ModelConfig.md)\>

#### Inherited from

StageState.get

#### Defined in

[src/lib/stage/stageState.ts:13](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/stage/stageState.ts#L13)

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

StageState.getFile

#### Defined in

[src/lib/stage/stageState.ts:55](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/stage/stageState.ts#L55)

___

### remove

▸ **remove**(`name`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`<`any`\>

#### Inherited from

StageState.remove

#### Defined in

[src/lib/stage/stageState.ts:30](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/stage/stageState.ts#L30)

___

### update

▸ **update**(`name`, `data`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `data` | [`ModelConfig`](../interfaces/model.ModelConfig.md) |

#### Returns

`Promise`<`void`\>

#### Inherited from

StageState.update

#### Defined in

[src/lib/stage/stageState.ts:25](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/stage/stageState.ts#L25)
