[Lambda ORM](../README.md) / [manager](../modules/manager.md) / LibManager

# Class: LibManager

[manager](../modules/manager.md).LibManager

## Table of contents

### Constructors

- [constructor](manager.LibManager.md#constructor)

### Methods

- [addDialects](manager.LibManager.md#adddialects)
- [completeConfig](manager.LibManager.md#completeconfig)
- [createStructure](manager.LibManager.md#createstructure)
- [defaultConnection](manager.LibManager.md#defaultconnection)
- [getConfig](manager.LibManager.md#getconfig)
- [getConfigFileName](manager.LibManager.md#getconfigfilename)
- [getDatabase](manager.LibManager.md#getdatabase)
- [getGlobalPackage](manager.LibManager.md#getglobalpackage)
- [getLibs](manager.LibManager.md#getlibs)
- [getLocalPackage](manager.LibManager.md#getlocalpackage)
- [getModel](manager.LibManager.md#getmodel)
- [getTypescriptContent](manager.LibManager.md#gettypescriptcontent)
- [writeConfig](manager.LibManager.md#writeconfig)
- [writeModel](manager.LibManager.md#writemodel)

## Constructors

### constructor

• **new LibManager**(`orm`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `orm` | [`IOrm`](../interfaces/model.IOrm.md) |

#### Defined in

[manager/lib.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/lib.ts#L9)

## Methods

### addDialects

▸ **addDialects**(`config`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`Config`](../interfaces/model.Config.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[manager/lib.ts:110](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/lib.ts#L110)

___

### completeConfig

▸ **completeConfig**(`config`, `database`, `dialect?`, `connection?`): [`Database`](../interfaces/model.Database.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`Config`](../interfaces/model.Config.md) |
| `database` | `string` |
| `dialect?` | `string` |
| `connection?` | `any` |

#### Returns

[`Database`](../interfaces/model.Database.md)

#### Defined in

[manager/lib.ts:177](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/lib.ts#L177)

___

### createStructure

▸ **createStructure**(`config`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`Config`](../interfaces/model.Config.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[manager/lib.ts:73](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/lib.ts#L73)

___

### defaultConnection

▸ **defaultConnection**(`dialect`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dialect` | `string` |

#### Returns

`any`

#### Defined in

[manager/lib.ts:217](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/lib.ts#L217)

___

### getConfig

▸ **getConfig**(`source?`): `Promise`<[`Config`](../interfaces/model.Config.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `source?` | `string` |

#### Returns

`Promise`<[`Config`](../interfaces/model.Config.md)\>

#### Defined in

[manager/lib.ts:13](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/lib.ts#L13)

___

### getConfigFileName

▸ **getConfigFileName**(`workspace`): `Promise`<`undefined` \| `string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `workspace` | `string` |

#### Returns

`Promise`<`undefined` \| `string`\>

#### Defined in

[manager/lib.ts:125](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/lib.ts#L125)

___

### getDatabase

▸ **getDatabase**(`database`, `config`): [`Database`](../interfaces/model.Database.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `database` | `string` |
| `config` | [`Config`](../interfaces/model.Config.md) |

#### Returns

[`Database`](../interfaces/model.Database.md)

#### Defined in

[manager/lib.ts:154](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/lib.ts#L154)

___

### getGlobalPackage

▸ **getGlobalPackage**(`name`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[manager/lib.ts:317](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/lib.ts#L317)

___

### getLibs

▸ **getLibs**(`dialect`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `dialect` | `string` |

#### Returns

`string`[]

#### Defined in

[manager/lib.ts:286](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/lib.ts#L286)

___

### getLocalPackage

▸ **getLocalPackage**(`name`, `workspace`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `workspace` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[manager/lib.ts:310](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/lib.ts#L310)

___

### getModel

▸ **getModel**(`config`): [`Schema`](../interfaces/model.Schema.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`Config`](../interfaces/model.Config.md) |

#### Returns

[`Schema`](../interfaces/model.Schema.md)[]

#### Defined in

[manager/lib.ts:352](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/lib.ts#L352)

___

### getTypescriptContent

▸ **getTypescriptContent**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `compilerOptions` | `Object` |
| `compilerOptions.baseUrl` | `string` |
| `compilerOptions.declaration` | `boolean` |
| `compilerOptions.emitDecoratorMetadata` | `boolean` |
| `compilerOptions.esModuleInterop` | `boolean` |
| `compilerOptions.experimentalDecorators` | `boolean` |
| `compilerOptions.module` | `string` |
| `compilerOptions.moduleResolution` | `string` |
| `compilerOptions.outDir` | `string` |
| `compilerOptions.resolveJsonModule` | `boolean` |
| `compilerOptions.sourceMap` | `boolean` |
| `compilerOptions.strict` | `boolean` |
| `compilerOptions.target` | `string` |
| `compilerOptions.typeRoots` | `string`[] |
| `exclude` | `string`[] |
| `include` | `string`[] |

#### Defined in

[manager/lib.ts:324](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/lib.ts#L324)

___

### writeConfig

▸ **writeConfig**(`config`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`Config`](../interfaces/model.Config.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[manager/lib.ts:137](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/lib.ts#L137)

___

### writeModel

▸ **writeModel**(`config`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`Config`](../interfaces/model.Config.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[manager/lib.ts:370](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/lib.ts#L370)
