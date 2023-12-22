[Lambda ORM](../README.md) / OperandFacade

# Class: OperandFacade

## Table of contents

### Constructors

- [constructor](OperandFacade.md#constructor)

### Methods

- [build](OperandFacade.md#build)
- [getClauses](OperandFacade.md#getclauses)
- [normalize](OperandFacade.md#normalize)

## Constructors

### constructor

• **new OperandFacade**(`expressions`, `schema`, `cache`, `operandSerializer`, `operandHelper`, `helper`): [`OperandFacade`](OperandFacade.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expressions` | `Expressions` |
| `schema` | [`SchemaFacade`](SchemaFacade.md) |
| `cache` | `ICache`\<`string`, `string`\> |
| `operandSerializer` | `OperandSerializer` |
| `operandHelper` | [`OrmOperandHelper`](OrmOperandHelper.md) |
| `helper` | [`Helper`](Helper.md) |

#### Returns

[`OperandFacade`](OperandFacade.md)

#### Defined in

[src/lib/operand/application/facade.ts:13](https://github.com/FlavioLionelRita/lambdaorm/blob/27a00d30/src/lib/operand/application/facade.ts#L13)

## Methods

### build

▸ **build**(`expression`): `Operand`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Operand`

#### Defined in

[src/lib/operand/application/facade.ts:27](https://github.com/FlavioLionelRita/lambdaorm/blob/27a00d30/src/lib/operand/application/facade.ts#L27)

___

### getClauses

▸ **getClauses**(`operand`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | `Operand` |

#### Returns

`any`

#### Defined in

[src/lib/operand/application/facade.ts:35](https://github.com/FlavioLionelRita/lambdaorm/blob/27a00d30/src/lib/operand/application/facade.ts#L35)

___

### normalize

▸ **normalize**(`expression`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/operand/application/facade.ts:31](https://github.com/FlavioLionelRita/lambdaorm/blob/27a00d30/src/lib/operand/application/facade.ts#L31)
