[Lambda ORM](../README.md) / [manager](../modules/manager.md) / Helper

# Class: Helper

[manager](../modules/manager.md).Helper

## Table of contents

### Constructors

- [constructor](manager.Helper.md#constructor)

### Methods

- [getBase64](manager.Helper.md#getBase64)
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
- [sentenceToArray](manager.Helper.md#sentencetoarray)
- [singular](manager.Helper.md#singular)
- [solveEnvironmentVariables](manager.Helper.md#solveenvironmentvariables)
- [toBase64](manager.Helper.md#toBase64)
- [transformParameter](manager.Helper.md#transformparameter)
- [tryParse](manager.Helper.md#tryparse)
- [tsType](manager.Helper.md#tstype)
- [writeFile](manager.Helper.md#writefile)

## Constructors

### constructor

• **new Helper**()

## Methods

### getBase64

▸ `Static` **getBase64**(`value`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/manager/helper.ts:60](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/helper.ts#L60)

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

[src/lib/manager/helper.ts:143](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/helper.ts#L143)

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

[src/lib/manager/helper.ts:31](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/helper.ts#L31)

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

[src/lib/manager/helper.ts:35](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/helper.ts#L35)

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

[src/lib/manager/helper.ts:109](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/helper.ts#L109)

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

[src/lib/manager/helper.ts:88](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/helper.ts#L88)

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

[src/lib/manager/helper.ts:287](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/helper.ts#L287)

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

[src/lib/manager/helper.ts:51](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/helper.ts#L51)

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

[src/lib/manager/helper.ts:194](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/helper.ts#L194)

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

[src/lib/manager/helper.ts:47](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/helper.ts#L47)

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

[src/lib/manager/helper.ts:296](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/helper.ts#L296)

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

[src/lib/manager/helper.ts:76](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/helper.ts#L76)

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

[src/lib/manager/helper.ts:149](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/helper.ts#L149)

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

[src/lib/manager/helper.ts:263](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/helper.ts#L263)

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

[src/lib/manager/helper.ts:275](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/helper.ts#L275)

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

[src/lib/manager/helper.ts:68](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/helper.ts#L68)

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

[src/lib/manager/helper.ts:64](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/helper.ts#L64)

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

[src/lib/manager/helper.ts:134](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/helper.ts#L134)

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

[src/lib/manager/helper.ts:128](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/helper.ts#L128)

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

[src/lib/manager/helper.ts:72](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/helper.ts#L72)

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

[src/lib/manager/helper.ts:323](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/helper.ts#L323)

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

[src/lib/manager/helper.ts:95](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/helper.ts#L95)

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

[src/lib/manager/helper.ts:102](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/helper.ts#L102)

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

[src/lib/manager/helper.ts:19](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/helper.ts#L19)

___

### sentenceToArray

▸ `Static` **sentenceToArray**(`sentence`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `sentence` | [`MetadataSentence`](../interfaces/model.MetadataSentence.md) |

#### Returns

`string`[]

#### Defined in

[src/lib/manager/helper.ts:10](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/helper.ts#L10)

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

[src/lib/manager/helper.ts:449](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/helper.ts#L449)

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

[src/lib/manager/helper.ts:161](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/helper.ts#L161)

___

### toBase64

▸ `Static` **toBase64**(`value`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/manager/helper.ts:56](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/helper.ts#L56)

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

[src/lib/manager/helper.ts:25](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/helper.ts#L25)

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

[src/lib/manager/helper.ts:279](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/helper.ts#L279)

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

[src/lib/manager/helper.ts:300](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/helper.ts#L300)

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

[src/lib/manager/helper.ts:118](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/helper.ts#L118)
