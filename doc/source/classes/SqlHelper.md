[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / SqlHelper

# Class: SqlHelper

## Constructors

### new SqlHelper()

> **new SqlHelper**(`str`): [`SqlHelper`](SqlHelper.md)

#### Parameters

• **str**: `IStringHelper`

#### Returns

[`SqlHelper`](SqlHelper.md)

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

### createInfo()

> **createInfo**(`entity`, `action`, `category`, `type`): [`SentenceInfo`](../interfaces/SentenceInfo.md)

#### Parameters

• **entity**: `string`

• **action**: [`SentenceAction`](../enumerations/SentenceAction.md)

• **category**: [`SentenceCategory`](../enumerations/SentenceCategory.md)

• **type**: [`SentenceType`](../enumerations/SentenceType.md)

#### Returns

[`SentenceInfo`](../interfaces/SentenceInfo.md)

#### Source

node\_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:24

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

> **getInfo**(`action`, `entity`): [`SentenceInfo`](../interfaces/SentenceInfo.md)

#### Parameters

• **action**: [`SentenceAction`](../enumerations/SentenceAction.md)

• **entity**: `string`

#### Returns

[`SentenceInfo`](../interfaces/SentenceInfo.md)

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
