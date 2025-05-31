[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / DdlBuilder

# Interface: DdlBuilder

Defined in: [src/lib/language/domain/ports/DdlBuilder.ts:4](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/ports/DdlBuilder.ts#L4)

## Methods

### addFk()

> **addFk**(`entity`, `relation`): `undefined` \| [`Query`](../classes/Query.md)

Defined in: [src/lib/language/domain/ports/DdlBuilder.ts:24](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/ports/DdlBuilder.ts#L24)

#### Parameters

##### entity

[`EntityMapping`](EntityMapping.md)

##### relation

[`Relation`](Relation.md)

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

***

### addPk()

> **addPk**(`entity`, `primaryKey`): `undefined` \| [`Query`](../classes/Query.md)

Defined in: [src/lib/language/domain/ports/DdlBuilder.ts:22](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/ports/DdlBuilder.ts#L22)

#### Parameters

##### entity

[`EntityMapping`](EntityMapping.md)

##### primaryKey

`string`[]

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

***

### addProperty()

> **addProperty**(`entity`, `property`): `undefined` \| [`Query`](../classes/Query.md)

Defined in: [src/lib/language/domain/ports/DdlBuilder.ts:14](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/ports/DdlBuilder.ts#L14)

#### Parameters

##### entity

[`EntityMapping`](EntityMapping.md)

##### property

[`PropertyMapping`](PropertyMapping.md)

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

***

### addUk()

> **addUk**(`entity`, `uniqueKey`): `undefined` \| [`Query`](../classes/Query.md)

Defined in: [src/lib/language/domain/ports/DdlBuilder.ts:23](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/ports/DdlBuilder.ts#L23)

#### Parameters

##### entity

[`EntityMapping`](EntityMapping.md)

##### uniqueKey

`string`[]

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

***

### ~~alterProperty()~~

> **alterProperty**(`entity`, `property`): `undefined` \| [`Query`](../classes/Query.md)

Defined in: [src/lib/language/domain/ports/DdlBuilder.ts:18](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/ports/DdlBuilder.ts#L18)

#### Parameters

##### entity

[`EntityMapping`](EntityMapping.md)

##### property

[`PropertyMapping`](PropertyMapping.md)

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Deprecated

Use alterPropertyType or alterPropertyRequired

***

### alterPropertyRequired()

> **alterPropertyRequired**(`entity`, `property`): `undefined` \| [`Query`](../classes/Query.md)

Defined in: [src/lib/language/domain/ports/DdlBuilder.ts:20](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/ports/DdlBuilder.ts#L20)

#### Parameters

##### entity

[`EntityMapping`](EntityMapping.md)

##### property

[`PropertyMapping`](PropertyMapping.md)

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

***

### alterPropertyType()

> **alterPropertyType**(`entity`, `property`): `undefined` \| [`Query`](../classes/Query.md)

Defined in: [src/lib/language/domain/ports/DdlBuilder.ts:19](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/ports/DdlBuilder.ts#L19)

#### Parameters

##### entity

[`EntityMapping`](EntityMapping.md)

##### property

[`PropertyMapping`](PropertyMapping.md)

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

***

### createEntity()

> **createEntity**(`entity`): `undefined` \| [`Query`](../classes/Query.md)

Defined in: [src/lib/language/domain/ports/DdlBuilder.ts:13](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/ports/DdlBuilder.ts#L13)

#### Parameters

##### entity

[`EntityMapping`](EntityMapping.md)

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

***

### createFk()

> **createFk**(`entity`, `relation`): `undefined` \| [`Query`](../classes/Query.md)

Defined in: [src/lib/language/domain/ports/DdlBuilder.ts:25](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/ports/DdlBuilder.ts#L25)

#### Parameters

##### entity

[`EntityMapping`](EntityMapping.md)

##### relation

[`Relation`](Relation.md)

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

***

### createIndex()

> **createIndex**(`entity`, `index`): `undefined` \| [`Query`](../classes/Query.md)

Defined in: [src/lib/language/domain/ports/DdlBuilder.ts:26](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/ports/DdlBuilder.ts#L26)

#### Parameters

##### entity

[`EntityMapping`](EntityMapping.md)

##### index

[`Index`](Index.md)

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

***

### createSequence()

> **createSequence**(`entity`): `undefined` \| [`Query`](../classes/Query.md)

Defined in: [src/lib/language/domain/ports/DdlBuilder.ts:27](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/ports/DdlBuilder.ts#L27)

#### Parameters

##### entity

[`EntityMapping`](EntityMapping.md)

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

***

### dropEntity()

> **dropEntity**(`entity`): `undefined` \| [`Query`](../classes/Query.md)

Defined in: [src/lib/language/domain/ports/DdlBuilder.ts:10](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/ports/DdlBuilder.ts#L10)

#### Parameters

##### entity

[`EntityMapping`](EntityMapping.md)

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

***

### dropFk()

> **dropFk**(`entity`, `relation`): `undefined` \| [`Query`](../classes/Query.md)

Defined in: [src/lib/language/domain/ports/DdlBuilder.ts:7](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/ports/DdlBuilder.ts#L7)

#### Parameters

##### entity

[`EntityMapping`](EntityMapping.md)

##### relation

[`Relation`](Relation.md)

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

***

### dropIndex()

> **dropIndex**(`entity`, `index`): `undefined` \| [`Query`](../classes/Query.md)

Defined in: [src/lib/language/domain/ports/DdlBuilder.ts:8](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/ports/DdlBuilder.ts#L8)

#### Parameters

##### entity

[`EntityMapping`](EntityMapping.md)

##### index

[`Index`](Index.md)

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

***

### dropPk()

> **dropPk**(`entity`): `undefined` \| [`Query`](../classes/Query.md)

Defined in: [src/lib/language/domain/ports/DdlBuilder.ts:11](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/ports/DdlBuilder.ts#L11)

#### Parameters

##### entity

[`EntityMapping`](EntityMapping.md)

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

***

### dropProperty()

> **dropProperty**(`entity`, `property`): `undefined` \| [`Query`](../classes/Query.md)

Defined in: [src/lib/language/domain/ports/DdlBuilder.ts:21](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/ports/DdlBuilder.ts#L21)

#### Parameters

##### entity

[`EntityMapping`](EntityMapping.md)

##### property

[`PropertyMapping`](PropertyMapping.md)

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

***

### dropSequence()

> **dropSequence**(`entity`): `undefined` \| [`Query`](../classes/Query.md)

Defined in: [src/lib/language/domain/ports/DdlBuilder.ts:9](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/ports/DdlBuilder.ts#L9)

#### Parameters

##### entity

[`EntityMapping`](EntityMapping.md)

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

***

### dropUk()

> **dropUk**(`entity`): `undefined` \| [`Query`](../classes/Query.md)

Defined in: [src/lib/language/domain/ports/DdlBuilder.ts:12](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/ports/DdlBuilder.ts#L12)

#### Parameters

##### entity

[`EntityMapping`](EntityMapping.md)

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

***

### foreignKeys()

> **foreignKeys**(`tableNames`): [`Query`](../classes/Query.md)

Defined in: [src/lib/language/domain/ports/DdlBuilder.ts:33](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/ports/DdlBuilder.ts#L33)

#### Parameters

##### tableNames

`string`[]

#### Returns

[`Query`](../classes/Query.md)

***

### indexes()

> **indexes**(`tableNames`): [`Query`](../classes/Query.md)

Defined in: [src/lib/language/domain/ports/DdlBuilder.ts:34](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/ports/DdlBuilder.ts#L34)

#### Parameters

##### tableNames

`string`[]

#### Returns

[`Query`](../classes/Query.md)

***

### objects()

> **objects**(): [`Query`](../classes/Query.md)

Defined in: [src/lib/language/domain/ports/DdlBuilder.ts:28](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/ports/DdlBuilder.ts#L28)

#### Returns

[`Query`](../classes/Query.md)

***

### primaryKeys()

> **primaryKeys**(`tableNames`): [`Query`](../classes/Query.md)

Defined in: [src/lib/language/domain/ports/DdlBuilder.ts:31](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/ports/DdlBuilder.ts#L31)

#### Parameters

##### tableNames

`string`[]

#### Returns

[`Query`](../classes/Query.md)

***

### sequences()

> **sequences**(): [`Query`](../classes/Query.md)

Defined in: [src/lib/language/domain/ports/DdlBuilder.ts:35](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/ports/DdlBuilder.ts#L35)

#### Returns

[`Query`](../classes/Query.md)

***

### setNull()

> **setNull**(`entity`, `relation`): `undefined` \| [`Query`](../classes/Query.md)

Defined in: [src/lib/language/domain/ports/DdlBuilder.ts:6](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/ports/DdlBuilder.ts#L6)

#### Parameters

##### entity

[`EntityMapping`](EntityMapping.md)

##### relation

[`Relation`](Relation.md)

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

***

### tables()

> **tables**(`names`): [`Query`](../classes/Query.md)

Defined in: [src/lib/language/domain/ports/DdlBuilder.ts:29](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/ports/DdlBuilder.ts#L29)

#### Parameters

##### names

`string`[]

#### Returns

[`Query`](../classes/Query.md)

***

### truncateEntity()

> **truncateEntity**(`entity`): `undefined` \| [`Query`](../classes/Query.md)

Defined in: [src/lib/language/domain/ports/DdlBuilder.ts:5](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/ports/DdlBuilder.ts#L5)

#### Parameters

##### entity

[`EntityMapping`](EntityMapping.md)

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

***

### uniqueKeys()

> **uniqueKeys**(`tableNames`): [`Query`](../classes/Query.md)

Defined in: [src/lib/language/domain/ports/DdlBuilder.ts:32](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/ports/DdlBuilder.ts#L32)

#### Parameters

##### tableNames

`string`[]

#### Returns

[`Query`](../classes/Query.md)

***

### views()

> **views**(`names`): [`Query`](../classes/Query.md)

Defined in: [src/lib/language/domain/ports/DdlBuilder.ts:30](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/domain/ports/DdlBuilder.ts#L30)

#### Parameters

##### names

`string`[]

#### Returns

[`Query`](../classes/Query.md)
