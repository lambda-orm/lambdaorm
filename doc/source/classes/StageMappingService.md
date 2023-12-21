[Lambda ORM](../README.md) / StageMappingService

# Class: StageMappingService

## Hierarchy

- `StageStateService`\<`MappingConfig`\>

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

• **new StageMappingService**(`schemaFacade`, `helper`): [`StageMappingService`](StageMappingService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `schemaFacade` | `SchemaFacade` |
| `helper` | [`Helper`](Helper.md) |

#### Returns

[`StageMappingService`](StageMappingService.md)

#### Inherited from

StageStateService\<MappingConfig\>.constructor

#### Defined in

[src/lib/stage/application/services/stateService.ts:8](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/stage/application/services/stateService.ts#L8)

## Methods

### get

▸ **get**(`name`): `Promise`\<`MappingConfig`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`\<`MappingConfig`\>

#### Inherited from

StageStateService.get

#### Defined in

[src/lib/stage/application/services/stateService.ts:10](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/stage/application/services/stateService.ts#L10)

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

[src/lib/stage/application/services/stateService.ts:42](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/stage/application/services/stateService.ts#L42)

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

[src/lib/stage/application/services/stateService.ts:27](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/stage/application/services/stateService.ts#L27)

___

### update

▸ **update**(`name`, `data`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `data` | `MappingConfig` |

#### Returns

`Promise`\<`void`\>

#### Inherited from

StageStateService.update

#### Defined in

[src/lib/stage/application/services/stateService.ts:22](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/stage/application/services/stateService.ts#L22)
