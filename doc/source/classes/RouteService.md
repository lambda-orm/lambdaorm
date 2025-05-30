[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / RouteService

# Class: RouteService

Defined in: node\_modules/lambdaorm-base/schema/application/services/routeService.d.ts:4

## Implements

- [`IRouteService`](../interfaces/IRouteService.md)

## Constructors

### Constructor

> **new RouteService**(`stageConfigService`, `exp`): `RouteService`

Defined in: node\_modules/lambdaorm-base/schema/application/services/routeService.d.ts:7

#### Parameters

##### stageConfigService

[`StageConfigService`](StageConfigService.md)

##### exp

`Expressions`

#### Returns

`RouteService`

## Methods

### eval()

> **eval**(`source`, `info`): `boolean`

Defined in: node\_modules/lambdaorm-base/schema/application/services/routeService.d.ts:8

#### Parameters

##### source

[`SourceRule`](../interfaces/SourceRule.md)

##### info

[`SentenceInfo`](../interfaces/SentenceInfo.md)

#### Returns

`boolean`

#### Implementation of

[`IRouteService`](../interfaces/IRouteService.md).[`eval`](../interfaces/IRouteService.md#eval)

***

### getSource()

> **getSource**(`info`, `stage?`): `string`

Defined in: node\_modules/lambdaorm-base/schema/application/services/routeService.d.ts:9

#### Parameters

##### info

[`SentenceInfo`](../interfaces/SentenceInfo.md)

##### stage?

`string`

#### Returns

`string`

#### Implementation of

[`IRouteService`](../interfaces/IRouteService.md).[`getSource`](../interfaces/IRouteService.md#getsource)
