[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / QueryHelper

# Class: QueryHelper

## Constructors

### new QueryHelper()

> **new QueryHelper**(`str`): [`QueryHelper`](QueryHelper.md)

#### Parameters

• **str**: `IStringHelper`

#### Returns

[`QueryHelper`](QueryHelper.md)

#### Source

node\_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:13

## Methods

### arrayToList()

> **arrayToList**(`array`, `timeZone`): `string`

#### Parameters

• **array**: `any`[]

• **timeZone**: `string`

#### Returns

`string`

#### Source

node\_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:16

***

### bufferToString()

> **bufferToString**(`buffer`): `string`

#### Parameters

• **buffer**: `Buffer`

#### Returns

`string`

#### Source

node\_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:20

***

### dateFormat()

> **dateFormat**(`value`, `format`?): `string`

#### Parameters

• **value**: `any`

• **format?**: `string`

#### Returns

`string`

#### Source

node\_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:19

***

### dateToString()

> **dateToString**(`date`, `timeZone`?): `string`

#### Parameters

• **date**: `Date`

• **timeZone?**: `string`

#### Returns

`string`

#### Source

node\_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:18

***

### escape()

> **escape**(`name`): `string`

#### Parameters

• **name**: `string`

#### Returns

`string`

#### Source

node\_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:15

***

### escapeId()

> **escapeId**(`name`): `string`

#### Parameters

• **name**: `string`

#### Returns

`string`

#### Source

node\_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:14

***

### format()

> **format**(`sql`, `values`, `stringifyObjects`, `timeZone`): `string`

#### Parameters

• **sql**: `string`

• **values**: `any`[]

• **stringifyObjects**: `string`

• **timeZone**: `string`

#### Returns

`string`

#### Source

node\_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:17

***

### getInfo()

> **getInfo**(`action`, `entity`, `type`?): [`SentenceInfo`](../interfaces/SentenceInfo.md)

#### Parameters

• **action**: [`SentenceAction`](../enumerations/SentenceAction.md)

• **entity**: `string`

• **type?**: [`SentenceType`](../enumerations/SentenceType.md)

#### Returns

[`SentenceInfo`](../interfaces/SentenceInfo.md)

#### Source

node\_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:25

***

### getSentenceCategory()

> **getSentenceCategory**(`action`): [`SentenceCategory`](../enumerations/SentenceCategory.md)

#### Parameters

• **action**: [`SentenceAction`](../enumerations/SentenceAction.md)

#### Returns

[`SentenceCategory`](../enumerations/SentenceCategory.md)

#### Source

node\_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:24

***

### getSentenceType()

> **getSentenceType**(`action`): [`SentenceType`](../enumerations/SentenceType.md)

#### Parameters

• **action**: [`SentenceAction`](../enumerations/SentenceAction.md)

#### Returns

[`SentenceType`](../enumerations/SentenceType.md)

#### Source

node\_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:23

***

### raw()

> **raw**(`sql`): `string`

#### Parameters

• **sql**: `string`

#### Returns

`string`

#### Source

node\_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:21

***

### transformParameter()

> **transformParameter**(`name`): `string`

#### Parameters

• **name**: `string`

#### Returns

`string`

#### Source

node\_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:22
