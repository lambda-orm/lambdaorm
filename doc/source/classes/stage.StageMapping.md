[Lambda ORM](../README.md) / [stage](../modules/stage.md) / StageMapping

# Class: StageMapping

[stage](../modules/stage.md).StageMapping

## Hierarchy

- `StageState`<[`SchemaMapping`](../interfaces/model.SchemaMapping.md)\>

  ↳ **`StageMapping`**

## Table of contents

### Constructors

- [constructor](stage.StageMapping.md#constructor)

### Methods

- [get](stage.StageMapping.md#get)
- [getFile](stage.StageMapping.md#getfile)
- [remove](stage.StageMapping.md#remove)
- [update](stage.StageMapping.md#update)

## Constructors

### constructor

• **new StageMapping**(`schema`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | [`SchemaManager`](manager.SchemaManager.md) |

#### Inherited from

StageState<SchemaMapping\>.constructor

#### Defined in

[src/lib/stage/stageState.ts:9](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/stage/stageState.ts#L9)

## Methods

### get

▸ **get**(`name`): `Promise`<[`SchemaMapping`](../interfaces/model.SchemaMapping.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`<[`SchemaMapping`](../interfaces/model.SchemaMapping.md)\>

#### Inherited from

StageState.get

#### Defined in

[src/lib/stage/stageState.ts:13](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/stage/stageState.ts#L13)

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

[src/lib/stage/stageState.ts:45](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/stage/stageState.ts#L45)

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

[src/lib/stage/stageState.ts:30](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/stage/stageState.ts#L30)

___

### update

▸ **update**(`name`, `data`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `data` | [`SchemaMapping`](../interfaces/model.SchemaMapping.md) |

#### Returns

`Promise`<`void`\>

#### Inherited from

StageState.update

#### Defined in

[src/lib/stage/stageState.ts:25](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/stage/stageState.ts#L25)
