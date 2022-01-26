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
- [exec](manager.Helper.md#exec)
- [existsPath](manager.Helper.md#existspath)
- [getType](manager.Helper.md#gettype)
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

[src/lib/manager/helper.ts:121](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/helper.ts#L121)

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

[src/lib/manager/helper.ts:15](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/helper.ts#L15)

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

[src/lib/manager/helper.ts:19](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/helper.ts#L19)

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

[src/lib/manager/helper.ts:87](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/helper.ts#L87)

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

[src/lib/manager/helper.ts:66](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/helper.ts#L66)

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

[src/lib/manager/helper.ts:233](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/helper.ts#L233)

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

[src/lib/manager/helper.ts:151](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/helper.ts#L151)

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

[src/lib/manager/helper.ts:237](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/helper.ts#L237)

___

### exec

▸ `Static` **exec**(`command`, `cwd?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `command` | `string` |
| `cwd` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/manager/helper.ts:43](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/helper.ts#L43)

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

[src/lib/manager/helper.ts:54](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/helper.ts#L54)

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

[src/lib/manager/helper.ts:216](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/helper.ts#L216)

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

[src/lib/manager/helper.ts:35](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/helper.ts#L35)

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

[src/lib/manager/helper.ts:31](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/helper.ts#L31)

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

[src/lib/manager/helper.ts:112](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/helper.ts#L112)

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

[src/lib/manager/helper.ts:106](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/helper.ts#L106)

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

[src/lib/manager/helper.ts:39](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/helper.ts#L39)

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

[src/lib/manager/helper.ts:264](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/helper.ts#L264)

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

[src/lib/manager/helper.ts:73](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/helper.ts#L73)

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

[src/lib/manager/helper.ts:80](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/helper.ts#L80)

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

[src/lib/manager/helper.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/helper.ts#L9)

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

[src/lib/manager/helper.ts:355](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/helper.ts#L355)

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

[src/lib/manager/helper.ts:127](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/helper.ts#L127)

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

[src/lib/manager/helper.ts:225](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/helper.ts#L225)

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

[src/lib/manager/helper.ts:241](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/helper.ts#L241)

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

[src/lib/manager/helper.ts:96](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/helper.ts#L96)
