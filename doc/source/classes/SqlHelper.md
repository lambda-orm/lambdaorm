[Lambda ORM](../README.md) / SqlHelper

# Class: SqlHelper

## Table of contents

### Constructors

- [constructor](SqlHelper.md#constructor)

### Methods

- [arrayToList](SqlHelper.md#arraytolist)
- [bufferToString](SqlHelper.md#buffertostring)
- [createInfo](SqlHelper.md#createinfo)
- [dateFormat](SqlHelper.md#dateformat)
- [dateToString](SqlHelper.md#datetostring)
- [escape](SqlHelper.md#escape)
- [escapeId](SqlHelper.md#escapeid)
- [format](SqlHelper.md#format)
- [getInfo](SqlHelper.md#getinfo)
- [raw](SqlHelper.md#raw)
- [transformParameter](SqlHelper.md#transformparameter)

## Constructors

### constructor

• **new SqlHelper**(`str`): [`SqlHelper`](SqlHelper.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `IStringHelper` |

#### Returns

[`SqlHelper`](SqlHelper.md)

#### Defined in

node_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:13

## Methods

### arrayToList

▸ **arrayToList**(`array`, `timeZone`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `array` | `any`[] |
| `timeZone` | `string` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:16

___

### bufferToString

▸ **bufferToString**(`buffer`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `buffer` | `Buffer` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:20

___

### createInfo

▸ **createInfo**(`entity`, `action`, `category`, `type`): [`SentenceInfo`](../interfaces/SentenceInfo.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `string` |
| `action` | [`SentenceAction`](../enums/SentenceAction.md) |
| `category` | [`SentenceCategory`](../enums/SentenceCategory.md) |
| `type` | [`SentenceType`](../enums/SentenceType.md) |

#### Returns

[`SentenceInfo`](../interfaces/SentenceInfo.md)

#### Defined in

node_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:24

___

### dateFormat

▸ **dateFormat**(`value`, `format?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |
| `format?` | `string` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:19

___

### dateToString

▸ **dateToString**(`date`, `timeZone?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `Date` |
| `timeZone?` | `string` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:18

___

### escape

▸ **escape**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:15

___

### escapeId

▸ **escapeId**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:14

___

### format

▸ **format**(`sql`, `values`, `stringifyObjects`, `timeZone`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sql` | `string` |
| `values` | `any`[] |
| `stringifyObjects` | `string` |
| `timeZone` | `string` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:17

___

### getInfo

▸ **getInfo**(`action`, `entity`): [`SentenceInfo`](../interfaces/SentenceInfo.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`SentenceAction`](../enums/SentenceAction.md) |
| `entity` | `string` |

#### Returns

[`SentenceInfo`](../interfaces/SentenceInfo.md)

#### Defined in

node_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:23

___

### raw

▸ **raw**(`sql`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sql` | `string` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:21

___

### transformParameter

▸ **transformParameter**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:22
