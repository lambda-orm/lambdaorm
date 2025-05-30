[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / QueryExecutor

# Interface: QueryExecutor

Defined in: [src/lib/execution/domain/executor.ts:37](https://github.com/lambda-orm/lambdaorm/blob/d458bba636206871821586fca1a7822cc50e2446/src/lib/execution/domain/executor.ts#L37)

## Accessors

### options

#### Get Signature

> **get** **options**(): [`QueryOptions`](QueryOptions.md)

Defined in: [src/lib/execution/domain/executor.ts:38](https://github.com/lambda-orm/lambdaorm/blob/d458bba636206871821586fca1a7822cc50e2446/src/lib/execution/domain/executor.ts#L38)

##### Returns

[`QueryOptions`](QueryOptions.md)

## Methods

### commit()

> **commit**(): `Promise`\<`void`\>

Defined in: [src/lib/execution/domain/executor.ts:39](https://github.com/lambda-orm/lambdaorm/blob/d458bba636206871821586fca1a7822cc50e2446/src/lib/execution/domain/executor.ts#L39)

#### Returns

`Promise`\<`void`\>

***

### execute()

> **execute**(`query`, `data`): `Promise`\<`any`\>

Defined in: [src/lib/execution/domain/executor.ts:42](https://github.com/lambda-orm/lambdaorm/blob/d458bba636206871821586fca1a7822cc50e2446/src/lib/execution/domain/executor.ts#L42)

#### Parameters

##### query

[`Query`](../classes/Query.md)

##### data

`any`

#### Returns

`Promise`\<`any`\>

***

### release()

> **release**(): `Promise`\<`void`\>

Defined in: [src/lib/execution/domain/executor.ts:41](https://github.com/lambda-orm/lambdaorm/blob/d458bba636206871821586fca1a7822cc50e2446/src/lib/execution/domain/executor.ts#L41)

#### Returns

`Promise`\<`void`\>

***

### rollback()

> **rollback**(): `Promise`\<`void`\>

Defined in: [src/lib/execution/domain/executor.ts:40](https://github.com/lambda-orm/lambdaorm/blob/d458bba636206871821586fca1a7822cc50e2446/src/lib/execution/domain/executor.ts#L40)

#### Returns

`Promise`\<`void`\>
