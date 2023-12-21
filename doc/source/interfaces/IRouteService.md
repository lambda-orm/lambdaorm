[Lambda ORM](../README.md) / IRouteService

# Interface: IRouteService

## Implemented by

- [`RouteService`](../classes/RouteService.md)

## Table of contents

### Methods

- [eval](IRouteService.md#eval)
- [getSource](IRouteService.md#getsource)

## Methods

### eval

▸ **eval**(`source`, `clauseInfo`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`DataSourceRule`](DataSourceRule.md) |
| `clauseInfo` | [`ClauseInfo`](ClauseInfo.md) |

#### Returns

`boolean`

#### Defined in

node_modules/lambdaorm-base/schema/domain/services.d.ts:4

___

### getSource

▸ **getSource**(`clauseInfo`, `stage?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `clauseInfo` | [`ClauseInfo`](ClauseInfo.md) |
| `stage?` | `string` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/schema/domain/services.d.ts:5
