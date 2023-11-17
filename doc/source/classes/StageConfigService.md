[Lambda ORM](../README.md) / StageConfigService

# Class: StageConfigService

## Table of contents

### Constructors

- [constructor](StageConfigService.md#constructor)

### Properties

- [stages](StageConfigService.md#stages)

### Methods

- [get](StageConfigService.md#get)
- [load](StageConfigService.md#load)

## Constructors

### constructor

• **new StageConfigService**(): [`StageConfigService`](StageConfigService.md)

#### Returns

[`StageConfigService`](StageConfigService.md)

#### Defined in

[src/lib/schema/application/services/config/stageConfigService.ts:6](https://github.com/FlavioLionelRita/lambdaorm/blob/d21f27fe/src/lib/schema/application/services/config/stageConfigService.ts#L6)

## Properties

### stages

• **stages**: [`Stage`](../interfaces/Stage.md)[]

#### Defined in

[src/lib/schema/application/services/config/stageConfigService.ts:4](https://github.com/FlavioLionelRita/lambdaorm/blob/d21f27fe/src/lib/schema/application/services/config/stageConfigService.ts#L4)

## Methods

### get

▸ **get**(`name?`): [`Stage`](../interfaces/Stage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

#### Returns

[`Stage`](../interfaces/Stage.md)

#### Defined in

[src/lib/schema/application/services/config/stageConfigService.ts:21](https://github.com/FlavioLionelRita/lambdaorm/blob/d21f27fe/src/lib/schema/application/services/config/stageConfigService.ts#L21)

___

### load

▸ **load**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Stage`](../interfaces/Stage.md) |

#### Returns

`void`

#### Defined in

[src/lib/schema/application/services/config/stageConfigService.ts:10](https://github.com/FlavioLionelRita/lambdaorm/blob/d21f27fe/src/lib/schema/application/services/config/stageConfigService.ts#L10)
