[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / QueryHelper

# Class: QueryHelper

Defined in: node\_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:10

## Constructors

### Constructor

> **new QueryHelper**(`str`): `QueryHelper`

Defined in: node\_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:12

#### Parameters

##### str

`IStringHelper`

#### Returns

`QueryHelper`

## Methods

### arrayToList()

> **arrayToList**(`array`, `timeZone`): `string`

Defined in: node\_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:15

#### Parameters

##### array

`any`[]

##### timeZone

`string`

#### Returns

`string`

***

### bufferToString()

> **bufferToString**(`buffer`): `string`

Defined in: node\_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:19

#### Parameters

##### buffer

`Buffer`

#### Returns

`string`

***

### dateFormat()

> **dateFormat**(`value`, `format?`): `string`

Defined in: node\_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:18

#### Parameters

##### value

`any`

##### format?

`string`

#### Returns

`string`

***

### dateToString()

> **dateToString**(`date`, `timeZone?`): `string`

Defined in: node\_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:17

#### Parameters

##### date

`Date`

##### timeZone?

`string`

#### Returns

`string`

***

### escape()

> **escape**(`name`): `string`

Defined in: node\_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:14

#### Parameters

##### name

`string`

#### Returns

`string`

***

### escapeId()

> **escapeId**(`name`): `string`

Defined in: node\_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:13

#### Parameters

##### name

`string`

#### Returns

`string`

***

### format()

> **format**(`sql`, `values`, `stringifyObjects`, `timeZone`): `string`

Defined in: node\_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:16

#### Parameters

##### sql

`string`

##### values

`any`[]

##### stringifyObjects

`string`

##### timeZone

`string`

#### Returns

`string`

***

### getInfo()

> **getInfo**(`action`, `entity`, `type?`): [`SentenceInfo`](../interfaces/SentenceInfo.md)

Defined in: node\_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:24

#### Parameters

##### action

[`SentenceAction`](../enumerations/SentenceAction.md)

##### entity

`string`

##### type?

[`SentenceType`](../enumerations/SentenceType.md)

#### Returns

[`SentenceInfo`](../interfaces/SentenceInfo.md)

***

### getSentenceCategory()

> **getSentenceCategory**(`action`): [`SentenceCategory`](../enumerations/SentenceCategory.md)

Defined in: node\_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:23

#### Parameters

##### action

[`SentenceAction`](../enumerations/SentenceAction.md)

#### Returns

[`SentenceCategory`](../enumerations/SentenceCategory.md)

***

### getSentenceType()

> **getSentenceType**(`action`): [`SentenceType`](../enumerations/SentenceType.md)

Defined in: node\_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:22

#### Parameters

##### action

[`SentenceAction`](../enumerations/SentenceAction.md)

#### Returns

[`SentenceType`](../enumerations/SentenceType.md)

***

### raw()

> **raw**(`sql`): `string`

Defined in: node\_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:20

#### Parameters

##### sql

`string`

#### Returns

`string`

***

### transformParameter()

> **transformParameter**(`name`): `string`

Defined in: node\_modules/lambdaorm-base/shared/infrastructure/helper.d.ts:21

#### Parameters

##### name

`string`

#### Returns

`string`
