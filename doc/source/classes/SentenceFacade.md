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
| `schemaFacade` | [`SchemaFacade`](SchemaFacade.md) |
| `operandFacade` | [`OperandFacade`](OperandFacade.md) |
| `expressions` | `Expressions` |
| `cache` | `ICache`\<`string`, `string`\> |
| `serializer` | [`SentenceSerializer`](../interfaces/SentenceSerializer.md) |
| `helper` | [`Helper`](Helper.md) |

#### Returns

[`SentenceFacade`](SentenceFacade.md)

#### Defined in

[src/lib/sentence/application/facade.ts:26](https://github.com/FlavioLionelRita/lambdaorm/blob/c9705c45/src/lib/sentence/application/facade.ts#L26)

## Methods

### build

▸ **build**(`expression`, `view`, `stage`): [`Sentence`](Sentence.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `view` | [`ViewConfigService`](ViewConfigService.md) |
| `stage` | `string` |

#### Returns

[`Sentence`](Sentence.md)

#### Defined in

[src/lib/sentence/application/facade.ts:43](https://github.com/FlavioLionelRita/lambdaorm/blob/c9705c45/src/lib/sentence/application/facade.ts#L43)

___

### constraints

▸ **constraints**(`expression`): [`MetadataConstraint`](../interfaces/MetadataConstraint.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

[`MetadataConstraint`](../interfaces/MetadataConstraint.md)

#### Defined in

[src/lib/sentence/application/facade.ts:47](https://github.com/FlavioLionelRita/lambdaorm/blob/c9705c45/src/lib/sentence/application/facade.ts#L47)

___

### getSource

▸ **getSource**(`sentence`, `stage`): [`Source`](../interfaces/Source.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sentence` | [`Sentence`](Sentence.md) |
| `stage` | `string` |

#### Returns

[`Source`](../interfaces/Source.md)

#### Defined in

[src/lib/sentence/application/facade.ts:63](https://github.com/FlavioLionelRita/lambdaorm/blob/c9705c45/src/lib/sentence/application/facade.ts#L63)

___

### metadata

▸ **metadata**(`expression`): [`Metadata`](../interfaces/Metadata.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

[`Metadata`](../interfaces/Metadata.md)

#### Defined in

[src/lib/sentence/application/facade.ts:51](https://github.com/FlavioLionelRita/lambdaorm/blob/c9705c45/src/lib/sentence/application/facade.ts#L51)

___

### model

▸ **model**(`expression`): [`MetadataModel`](../interfaces/MetadataModel.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

[`MetadataModel`](../interfaces/MetadataModel.md)[]

#### Defined in

[src/lib/sentence/application/facade.ts:55](https://github.com/FlavioLionelRita/lambdaorm/blob/c9705c45/src/lib/sentence/application/facade.ts#L55)

___

### parameters

▸ **parameters**(`expression`): [`MetadataParameter`](../interfaces/MetadataParameter.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

[`MetadataParameter`](../interfaces/MetadataParameter.md)[]

#### Defined in

[src/lib/sentence/application/facade.ts:59](https://github.com/FlavioLionelRita/lambdaorm/blob/c9705c45/src/lib/sentence/application/facade.ts#L59)
