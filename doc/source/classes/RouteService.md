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

• **new RouteService**(`stageConfigService`, `expressions`): [`RouteService`](RouteService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `stageConfigService` | [`StageConfigService`](StageConfigService.md) |
| `expressions` | `Expressions` |

#### Returns

[`RouteService`](RouteService.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/services/routeService.d.ts:7

## Methods

### eval

▸ **eval**(`source`, `info`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`SourceRule`](../interfaces/SourceRule.md) |
| `info` | [`SentenceInfo`](../interfaces/SentenceInfo.md) |

#### Returns

`boolean`

#### Implementation of

[IRouteService](../interfaces/IRouteService.md).[eval](../interfaces/IRouteService.md#eval)

#### Defined in

node_modules/lambdaorm-base/schema/application/services/routeService.d.ts:8

___

### getSource

▸ **getSource**(`info`, `stage?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `info` | [`SentenceInfo`](../interfaces/SentenceInfo.md) |
| `stage?` | `string` |

#### Returns

`string`

#### Implementation of

[IRouteService](../interfaces/IRouteService.md).[getSource](../interfaces/IRouteService.md#getsource)

#### Defined in

node_modules/lambdaorm-base/schema/application/services/routeService.d.ts:9
