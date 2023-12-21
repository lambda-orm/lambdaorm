[Lambda ORM](../README.md) / SentenceFacade

# Class: SentenceFacade

## Table of contents

### Constructors

- [constructor](SentenceFacade.md#constructor)

### Methods

- [build](SentenceFacade.md#build)
- [constraints](SentenceFacade.md#constraints)
- [getSource](SentenceFacade.md#getsource)
- [metadata](SentenceFacade.md#metadata)
- [model](SentenceFacade.md#model)
- [parameters](SentenceFacade.md#parameters)

## Constructors

### constructor

• **new SentenceFacade**(`schemaFacade`, `operandFacade`, `expressions`, `cache`, `serializer`, `helper`): [`SentenceFacade`](SentenceFacade.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `schemaFacade` | `SchemaFacade` |
| `operandFacade` | [`OperandFacade`](OperandFacade.md) |
| `expressions` | `Expressions` |
| `cache` | `ICache`\<`string`, `string`\> |
| `serializer` | `SentenceSerializer` |
| `helper` | [`Helper`](Helper.md) |

#### Returns

[`SentenceFacade`](SentenceFacade.md)

#### Defined in

[src/lib/sentence/application/facade.ts:27](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/sentence/application/facade.ts#L27)

## Methods

### build

▸ **build**(`expression`, `view`, `stage`): `Sentence`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `view` | `ViewConfigService` |
| `stage` | `string` |

#### Returns

`Sentence`

#### Defined in

[src/lib/sentence/application/facade.ts:44](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/sentence/application/facade.ts#L44)

___

### constraints

▸ **constraints**(`expression`): `MetadataConstraint`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`MetadataConstraint`

#### Defined in

[src/lib/sentence/application/facade.ts:48](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/sentence/application/facade.ts#L48)

___

### getSource

▸ **getSource**(`sentence`, `stage`): `Source`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sentence` | `Sentence` |
| `stage` | `string` |

#### Returns

`Source`

#### Defined in

[src/lib/sentence/application/facade.ts:64](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/sentence/application/facade.ts#L64)

___

### metadata

▸ **metadata**(`expression`): `Metadata`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Metadata`

#### Defined in

[src/lib/sentence/application/facade.ts:52](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/sentence/application/facade.ts#L52)

___

### model

▸ **model**(`expression`): `MetadataModel`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`MetadataModel`[]

#### Defined in

[src/lib/sentence/application/facade.ts:56](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/sentence/application/facade.ts#L56)

___

### parameters

▸ **parameters**(`expression`): `MetadataParameter`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`MetadataParameter`[]

#### Defined in

[src/lib/sentence/application/facade.ts:60](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/sentence/application/facade.ts#L60)
