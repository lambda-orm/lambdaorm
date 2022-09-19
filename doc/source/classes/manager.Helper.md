[Lambda ORM](../README.md) / [manager](../modules/manager.md) / Helper

# Class: Helper

[manager](../modules/manager.md).Helper

## Table of contents

### Constructors

- [constructor](manager.Helper.md#constructor)

### Methods

- [clearLambda](manager.Helper.md#clearlambda)
- [clone](manager.Helper.md#clone)
- [cloneOperand](manager.Helper.md#cloneoperand)
- [copyFile](manager.Helper.md#copyfile)
- [createIfNotExists](manager.Helper.md#createifnotexists)
- [dateFormat](manager.Helper.md#dateformat)
- [deltaWithSimpleArrays](manager.Helper.md#deltawithsimplearrays)
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
- [resolvePath](manager.Helper.md#resolvepath)
- [sentenceToArray](manager.Helper.md#sentencetoarray)
- [singular](manager.Helper.md#singular)
- [solveEnvironmentVariables](manager.Helper.md#solveenvironmentvariables)
- [transformParameter](manager.Helper.md#transformparameter)
- [tryParse](manager.Helper.md#tryparse)
- [tsType](manager.Helper.md#tstype)
- [writeFile](manager.Helper.md#writefile)

## Constructors

### constructor

• **new Helper**()

## Methods

### clearLambda

▸ `Static` **clearLambda**(`func`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `func` | `Function` |

#### Returns

`string`

#### Defined in

[src/lib/manager/helper.ts:145](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/helper.ts#L145)

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

[src/lib/manager/helper.ts:30](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/helper.ts#L30)

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

[src/lib/manager/helper.ts:34](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/helper.ts#L34)

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

[src/lib/manager/helper.ts:106](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/helper.ts#L106)

___

### createIfNotExists

▸ `Static` **createIfNotExists**(`_path`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_path` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/manager/helper.ts:82](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/helper.ts#L82)

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

[src/lib/manager/helper.ts:289](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/helper.ts#L289)

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

[src/lib/manager/helper.ts:196](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/helper.ts#L196)

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

[src/lib/manager/helper.ts:298](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/helper.ts#L298)

___

### existsPath

▸ `Static` **existsPath**(`_path`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_path` | `string` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/lib/manager/helper.ts:69](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/helper.ts#L69)

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

[src/lib/manager/helper.ts:151](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/helper.ts#L151)

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

[src/lib/manager/helper.ts:265](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/helper.ts#L265)

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

[src/lib/manager/helper.ts:277](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/helper.ts#L277)

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

[src/lib/manager/helper.ts:50](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/helper.ts#L50)

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

[src/lib/manager/helper.ts:46](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/helper.ts#L46)

___

### lstat

▸ `Static` **lstat**(`_path`): `Promise`<`Stats`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_path` | `string` |

#### Returns

`Promise`<`Stats`\>

#### Defined in

[src/lib/manager/helper.ts:135](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/helper.ts#L135)

___

### mkdir

▸ `Static` **mkdir**(`_path`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_path` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/manager/helper.ts:128](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/helper.ts#L128)

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

[src/lib/manager/helper.ts:54](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/helper.ts#L54)

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

[src/lib/manager/helper.ts:325](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/helper.ts#L325)

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

[src/lib/manager/helper.ts:90](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/helper.ts#L90)

___

### removeFile

▸ `Static` **removeFile**(`filePath`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `filePath` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/manager/helper.ts:98](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/helper.ts#L98)

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

[src/lib/manager/helper.ts:18](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/helper.ts#L18)

___

### resolvePath

▸ `Static` **resolvePath**(`source`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/manager/helper.ts:58](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/helper.ts#L58)

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

[src/lib/manager/helper.ts:9](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/helper.ts#L9)

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

[src/lib/manager/helper.ts:451](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/helper.ts#L451)

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

[src/lib/manager/helper.ts:163](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/helper.ts#L163)

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

[src/lib/manager/helper.ts:24](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/helper.ts#L24)

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

[src/lib/manager/helper.ts:281](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/helper.ts#L281)

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

[src/lib/manager/helper.ts:302](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/helper.ts#L302)

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

[src/lib/manager/helper.ts:117](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/helper.ts#L117)
