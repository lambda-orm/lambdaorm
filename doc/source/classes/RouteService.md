[Lambda ORM](../README.md) / RouteService

# Class: RouteService

## Implements

- [`IRouteService`](../interfaces/IRouteService.md)

## Table of contents

### Constructors

- [constructor](RouteService.md#constructor)

### Methods

- [eval](RouteService.md#eval)
- [getSource](RouteService.md#getsource)

## Constructors

### constructor

• **new RouteService**(`stageConfigService`, `expressions`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `stageConfigService` | [`StageConfigService`](StageConfigService.md) |
| `expressions` | `Expressions` |

#### Defined in

[src/lib/schema/application/services/routeService.ts:7](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/schema/application/services/routeService.ts#L7)

## Methods

### eval

▸ **eval**(`source`, `clauseInfo`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`DataSourceRule`](../interfaces/DataSourceRule.md) |
| `clauseInfo` | [`ClauseInfo`](../interfaces/ClauseInfo.md) |

#### Returns

`boolean`

#### Implementation of

[IRouteService](../interfaces/IRouteService.md).[eval](../interfaces/IRouteService.md#eval)

#### Defined in

[src/lib/schema/application/services/routeService.ts:10](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/schema/application/services/routeService.ts#L10)

___

### getSource

▸ **getSource**(`clauseInfo`, `stage?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `clauseInfo` | [`ClauseInfo`](../interfaces/ClauseInfo.md) |
| `stage?` | `string` |

#### Returns

`string`

#### Implementation of

[IRouteService](../interfaces/IRouteService.md).[getSource](../interfaces/IRouteService.md#getsource)

#### Defined in

[src/lib/schema/application/services/routeService.ts:27](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/schema/application/services/routeService.ts#L27)
