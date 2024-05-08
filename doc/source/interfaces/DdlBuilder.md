[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / DdlBuilder

# Interface: DdlBuilder

## Methods

### addFk()

> **addFk**(`entity`, `relation`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

• **entity**: [`EntityMapping`](EntityMapping.md)

• **relation**: [`Relation`](Relation.md)

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Source

[src/lib/language/application/ports/DdlBuilder.ts:24](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/language/application/ports/DdlBuilder.ts#L24)

***

### addPk()

> **addPk**(`entity`, `primaryKey`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

• **entity**: [`EntityMapping`](EntityMapping.md)

• **primaryKey**: `string`[]

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Source

[src/lib/language/application/ports/DdlBuilder.ts:22](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/language/application/ports/DdlBuilder.ts#L22)

***

### addProperty()

> **addProperty**(`entity`, `property`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

• **entity**: [`EntityMapping`](EntityMapping.md)

• **property**: [`PropertyMapping`](PropertyMapping.md)

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Source

[src/lib/language/application/ports/DdlBuilder.ts:14](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/language/application/ports/DdlBuilder.ts#L14)

***

### addUk()

> **addUk**(`entity`, `uniqueKey`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

• **entity**: [`EntityMapping`](EntityMapping.md)

• **uniqueKey**: `string`[]

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Source

[src/lib/language/application/ports/DdlBuilder.ts:23](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/language/application/ports/DdlBuilder.ts#L23)

***

### ~~alterProperty()~~

> **alterProperty**(`entity`, `property`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

• **entity**: [`EntityMapping`](EntityMapping.md)

• **property**: [`PropertyMapping`](PropertyMapping.md)

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Deprecated

Use alterPropertyType or alterPropertyRequired

#### Source

[src/lib/language/application/ports/DdlBuilder.ts:18](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/language/application/ports/DdlBuilder.ts#L18)

***

### alterPropertyRequired()

> **alterPropertyRequired**(`entity`, `property`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

• **entity**: [`EntityMapping`](EntityMapping.md)

• **property**: [`PropertyMapping`](PropertyMapping.md)

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Source

[src/lib/language/application/ports/DdlBuilder.ts:20](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/language/application/ports/DdlBuilder.ts#L20)

***

### alterPropertyType()

> **alterPropertyType**(`entity`, `property`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

• **entity**: [`EntityMapping`](EntityMapping.md)

• **property**: [`PropertyMapping`](PropertyMapping.md)

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Source

[src/lib/language/application/ports/DdlBuilder.ts:19](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/language/application/ports/DdlBuilder.ts#L19)

***

### createEntity()

> **createEntity**(`entity`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

• **entity**: [`EntityMapping`](EntityMapping.md)

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Source

[src/lib/language/application/ports/DdlBuilder.ts:13](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/language/application/ports/DdlBuilder.ts#L13)

***

### createFk()

> **createFk**(`entity`, `relation`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

• **entity**: [`EntityMapping`](EntityMapping.md)

• **relation**: [`Relation`](Relation.md)

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Source

[src/lib/language/application/ports/DdlBuilder.ts:25](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/language/application/ports/DdlBuilder.ts#L25)

***

### createIndex()

> **createIndex**(`entity`, `index`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

• **entity**: [`EntityMapping`](EntityMapping.md)

• **index**: [`Index`](Index.md)

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Source

[src/lib/language/application/ports/DdlBuilder.ts:26](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/language/application/ports/DdlBuilder.ts#L26)

***

### createSequence()

> **createSequence**(`entity`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

• **entity**: [`EntityMapping`](EntityMapping.md)

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Source

[src/lib/language/application/ports/DdlBuilder.ts:27](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/language/application/ports/DdlBuilder.ts#L27)

***

### dropEntity()

> **dropEntity**(`entity`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

• **entity**: [`EntityMapping`](EntityMapping.md)

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Source

[src/lib/language/application/ports/DdlBuilder.ts:10](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/language/application/ports/DdlBuilder.ts#L10)

***

### dropFk()

> **dropFk**(`entity`, `relation`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

• **entity**: [`EntityMapping`](EntityMapping.md)

• **relation**: [`Relation`](Relation.md)

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Source

[src/lib/language/application/ports/DdlBuilder.ts:7](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/language/application/ports/DdlBuilder.ts#L7)

***

### dropIndex()

> **dropIndex**(`entity`, `index`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

• **entity**: [`EntityMapping`](EntityMapping.md)

• **index**: [`Index`](Index.md)

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Source

[src/lib/language/application/ports/DdlBuilder.ts:8](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/language/application/ports/DdlBuilder.ts#L8)

***

### dropPk()

> **dropPk**(`entity`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

• **entity**: [`EntityMapping`](EntityMapping.md)

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Source

[src/lib/language/application/ports/DdlBuilder.ts:11](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/language/application/ports/DdlBuilder.ts#L11)

***

### dropProperty()

> **dropProperty**(`entity`, `property`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

• **entity**: [`EntityMapping`](EntityMapping.md)

• **property**: [`PropertyMapping`](PropertyMapping.md)

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Source

[src/lib/language/application/ports/DdlBuilder.ts:21](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/language/application/ports/DdlBuilder.ts#L21)

***

### dropSequence()

> **dropSequence**(`entity`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

• **entity**: [`EntityMapping`](EntityMapping.md)

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Source

[src/lib/language/application/ports/DdlBuilder.ts:9](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/language/application/ports/DdlBuilder.ts#L9)

***

### dropUk()

> **dropUk**(`entity`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

• **entity**: [`EntityMapping`](EntityMapping.md)

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Source

[src/lib/language/application/ports/DdlBuilder.ts:12](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/language/application/ports/DdlBuilder.ts#L12)

***

### foreignKeys()

> **foreignKeys**(`tableNames`): [`Query`](../classes/Query.md)

#### Parameters

• **tableNames**: `string`[]

#### Returns

[`Query`](../classes/Query.md)

#### Source

[src/lib/language/application/ports/DdlBuilder.ts:33](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/language/application/ports/DdlBuilder.ts#L33)

***

### indexes()

> **indexes**(`tableNames`): [`Query`](../classes/Query.md)

#### Parameters

• **tableNames**: `string`[]

#### Returns

[`Query`](../classes/Query.md)

#### Source

[src/lib/language/application/ports/DdlBuilder.ts:34](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/language/application/ports/DdlBuilder.ts#L34)

***

### objects()

> **objects**(): [`Query`](../classes/Query.md)

#### Returns

[`Query`](../classes/Query.md)

#### Source

[src/lib/language/application/ports/DdlBuilder.ts:28](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/language/application/ports/DdlBuilder.ts#L28)

***

### primaryKeys()

> **primaryKeys**(`tableNames`): [`Query`](../classes/Query.md)

#### Parameters

• **tableNames**: `string`[]

#### Returns

[`Query`](../classes/Query.md)

#### Source

[src/lib/language/application/ports/DdlBuilder.ts:31](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/language/application/ports/DdlBuilder.ts#L31)

***

### sequences()

> **sequences**(): [`Query`](../classes/Query.md)

#### Returns

[`Query`](../classes/Query.md)

#### Source

[src/lib/language/application/ports/DdlBuilder.ts:35](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/language/application/ports/DdlBuilder.ts#L35)

***

### setNull()

> **setNull**(`entity`, `relation`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

• **entity**: [`EntityMapping`](EntityMapping.md)

• **relation**: [`Relation`](Relation.md)

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Source

[src/lib/language/application/ports/DdlBuilder.ts:6](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/language/application/ports/DdlBuilder.ts#L6)

***

### tables()

> **tables**(`names`): [`Query`](../classes/Query.md)

#### Parameters

• **names**: `string`[]

#### Returns

[`Query`](../classes/Query.md)

#### Source

[src/lib/language/application/ports/DdlBuilder.ts:29](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/language/application/ports/DdlBuilder.ts#L29)

***

### truncateEntity()

> **truncateEntity**(`entity`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

• **entity**: [`EntityMapping`](EntityMapping.md)

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Source

[src/lib/language/application/ports/DdlBuilder.ts:5](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/language/application/ports/DdlBuilder.ts#L5)

***

### uniqueKeys()

> **uniqueKeys**(`tableNames`): [`Query`](../classes/Query.md)

#### Parameters

• **tableNames**: `string`[]

#### Returns

[`Query`](../classes/Query.md)

#### Source

[src/lib/language/application/ports/DdlBuilder.ts:32](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/language/application/ports/DdlBuilder.ts#L32)

***

### views()

> **views**(`names`): [`Query`](../classes/Query.md)

#### Parameters

• **names**: `string`[]

#### Returns

[`Query`](../classes/Query.md)

#### Source

[src/lib/language/application/ports/DdlBuilder.ts:30](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/language/application/ports/DdlBuilder.ts#L30)
