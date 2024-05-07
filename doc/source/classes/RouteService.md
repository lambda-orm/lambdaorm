[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / RouteService

# Class: RouteService

## Implements

- [`IRouteService`](../interfaces/IRouteService.md)

## Constructors

### new RouteService()

> **new RouteService**(`stageConfigService`, `exp`): [`RouteService`](RouteService.md)

#### Parameters

• **stageConfigService**: [`StageConfigService`](StageConfigService.md)

• **exp**: `Expressions`

#### Returns

[`RouteService`](RouteService.md)

#### Source

node\_modules/lambdaorm-base/schema/application/services/routeService.d.ts:7

## Methods

### eval()

> **eval**(`source`, `info`): `boolean`

#### Parameters

• **source**: [`SourceRule`](../interfaces/SourceRule.md)

• **info**: [`SentenceInfo`](../interfaces/SentenceInfo.md)

#### Returns

`boolean`

#### Implementation of

[`IRouteService`](../interfaces/IRouteService.md).[`eval`](../interfaces/IRouteService.md#eval)

#### Source

node\_modules/lambdaorm-base/schema/application/services/routeService.d.ts:8

***

### getSource()

> **getSource**(`info`, `stage`?): `string`

#### Parameters

• **info**: [`SentenceInfo`](../interfaces/SentenceInfo.md)

• **stage?**: `string`

#### Returns

`string`

#### Implementation of

[`IRouteService`](../interfaces/IRouteService.md).[`getSource`](../interfaces/IRouteService.md#getsource)

#### Source

node\_modules/lambdaorm-base/schema/application/services/routeService.d.ts:9
