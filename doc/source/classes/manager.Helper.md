[Lambda ORM](../README.md) / [manager](../modules/manager.md) / Helper

# Class: Helper

[manager](../modules/manager.md).Helper

## Table of contents

### Constructors

- [constructor](manager.Helper.md#constructor)

### Methods

- [base64ToText](manager.Helper.md#base64totext)
- [clearLambda](manager.Helper.md#clearlambda)
- [clone](manager.Helper.md#clone)
- [cloneOperand](manager.Helper.md#cloneoperand)
- [copyFile](manager.Helper.md#copyfile)
- [createIfNotExists](manager.Helper.md#createifnotexists)
- [dateFormat](manager.Helper.md#dateformat)
- [decrypt](manager.Helper.md#decrypt)
- [deltaWithSimpleArrays](manager.Helper.md#deltawithsimplearrays)
- [encrypt](manager.Helper.md#encrypt)
- [escape](manager.Helper.md#escape)
- [existsPath](manager.Helper.md#existspath)
- [getEnvironmentVariable](manager.Helper.md#getenvironmentvariable)
- [getType](manager.Helper.md#gettype)
- [isDate](manager.Helper.md#isdate)
- [isEmpty](manager.Helper.md#isempty)
- [isObject](manager.Helper.md#isobject)
- [lstat](manager.Helper.md#lstat)
- [mkdir](manager.Helper.md#mkdir)
- [nvl](manager.Helper.md#nvl)
- [plural](manager.Helper.md#plural)
- [readFile](manager.Helper.md#readfile)
- [removeFile](manager.Helper.md#removefile)
- [replace](manager.Helper.md#replace)
- [singular](manager.Helper.md#singular)
- [solveEnvironmentVariables](manager.Helper.md#solveenvironmentvariables)
- [textToBase64](manager.Helper.md#texttobase64)
- [transformParameter](manager.Helper.md#transformparameter)
- [tryParse](manager.Helper.md#tryparse)
- [tsType](manager.Helper.md#tstype)
- [writeFile](manager.Helper.md#writefile)

## Constructors

### constructor

• **new Helper**()

## Methods

### base64ToText

▸ `Static` **base64ToText**(`value`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/manager/helper.ts:51](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/helper.ts#L51)

___

### clearLambda

▸ `Static` **clearLambda**(`func`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `func` | `Function` |

#### Returns

`string`

#### Defined in

[src/lib/manager/helper.ts:134](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/helper.ts#L134)

___

### clone

▸ `Static` **clone**(`obj`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `any` |

#### Returns

`any`

#### Defined in

[src/lib/manager/helper.ts:22](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/helper.ts#L22)

___

### cloneOperand

▸ `Static` **cloneOperand**(`obj`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `any` |

#### Returns

`any`

#### Defined in

[src/lib/manager/helper.ts:26](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/helper.ts#L26)

___

### copyFile

▸ `Static` **copyFile**(`src`, `dest`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | `string` |
| `dest` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/manager/helper.ts:100](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/helper.ts#L100)

___

### createIfNotExists

▸ `Static` **createIfNotExists**(`fullPath`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fullPath` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/manager/helper.ts:79](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/helper.ts#L79)

___

### dateFormat

▸ `Static` **dateFormat**(`value`, `format`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |
| `format` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/manager/helper.ts:278](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/helper.ts#L278)

___

### decrypt

▸ `Static` **decrypt**(`value`, `key`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |
| `key` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/manager/helper.ts:42](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/helper.ts#L42)

___

### deltaWithSimpleArrays

▸ `Static` **deltaWithSimpleArrays**(`current`, `old?`): [`Delta`](model.Delta.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `current` | `any` |
| `old?` | `any` |

#### Returns

[`Delta`](model.Delta.md)

#### Defined in

[src/lib/manager/helper.ts:185](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/helper.ts#L185)

___

### encrypt

▸ `Static` **encrypt**(`value`, `key`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |
| `key` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/manager/helper.ts:38](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/helper.ts#L38)

___

### escape

▸ `Static` **escape**(`value`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/manager/helper.ts:287](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/helper.ts#L287)

___

### existsPath

▸ `Static` **existsPath**(`fullPath`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fullPath` | `string` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/lib/manager/helper.ts:67](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/helper.ts#L67)

___

### getEnvironmentVariable

▸ `Static` **getEnvironmentVariable**(`text`): `undefined` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |

#### Returns

`undefined` \| `string`

#### Defined in

[src/lib/manager/helper.ts:140](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/helper.ts#L140)

___

### getType

▸ `Static` **getType**(`value`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`string`

#### Defined in

[src/lib/manager/helper.ts:254](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/helper.ts#L254)

___

### isDate

▸ `Static` **isDate**(`value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`boolean`

#### Defined in

[src/lib/manager/helper.ts:266](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/helper.ts#L266)

___

### isEmpty

▸ `Static` **isEmpty**(`value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`boolean`

#### Defined in

[src/lib/manager/helper.ts:59](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/helper.ts#L59)

___

### isObject

▸ `Static` **isObject**(`obj`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `any` |

#### Returns

`boolean`

#### Defined in

[src/lib/manager/helper.ts:55](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/helper.ts#L55)

___

### lstat

▸ `Static` **lstat**(`fullPath`): `Promise`<`Stats`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fullPath` | `string` |

#### Returns

`Promise`<`Stats`\>

#### Defined in

[src/lib/manager/helper.ts:125](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/helper.ts#L125)

___

### mkdir

▸ `Static` **mkdir**(`fullPath`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fullPath` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/manager/helper.ts:119](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/helper.ts#L119)

___

### nvl

▸ `Static` **nvl**(`value`, `_default`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |
| `_default` | `any` |

#### Returns

`any`

#### Defined in

[src/lib/manager/helper.ts:63](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/helper.ts#L63)

___

### plural

▸ `Static` **plural**(`word`, `amount?`): `string`

Returns the plural of an English word.

**`export`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `word` | `string` |
| `amount?` | `number` |

#### Returns

`string`

#### Defined in

[src/lib/manager/helper.ts:314](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/helper.ts#L314)

___

### readFile

▸ `Static` **readFile**(`filePath`): `Promise`<``null`` \| `string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `filePath` | `string` |

#### Returns

`Promise`<``null`` \| `string`\>

#### Defined in

[src/lib/manager/helper.ts:86](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/helper.ts#L86)

___

### removeFile

▸ `Static` **removeFile**(`fullPath`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fullPath` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/manager/helper.ts:93](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/helper.ts#L93)

___

### replace

▸ `Static` **replace**(`string`, `search`, `replace`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `string` | `string` |
| `search` | `string` |
| `replace` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/manager/helper.ts:10](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/helper.ts#L10)

___

### singular

▸ `Static` **singular**(`word`, `amount?`): `string`

Returns the singular of an English word.

**`export`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `word` | `string` |
| `amount?` | `number` |

#### Returns

`string`

#### Defined in

[src/lib/manager/helper.ts:440](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/helper.ts#L440)

___

### solveEnvironmentVariables

▸ `Static` **solveEnvironmentVariables**(`source`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `any` |

#### Returns

`void`

#### Defined in

[src/lib/manager/helper.ts:152](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/helper.ts#L152)

___

### textToBase64

▸ `Static` **textToBase64**(`value`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/manager/helper.ts:47](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/helper.ts#L47)

___

### transformParameter

▸ `Static` **transformParameter**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/manager/helper.ts:16](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/helper.ts#L16)

___

### tryParse

▸ `Static` **tryParse**(`value`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`any`

#### Defined in

[src/lib/manager/helper.ts:270](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/helper.ts#L270)

___

### tsType

▸ `Static` **tsType**(`value`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/manager/helper.ts:291](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/helper.ts#L291)

___

### writeFile

▸ `Static` **writeFile**(`filePath`, `content`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `filePath` | `string` |
| `content` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/manager/helper.ts:109](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/helper.ts#L109)
