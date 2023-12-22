Lambda ORM

# Lambda ORM

## Table of contents

### Enumerations

- [Dialect](enums/Dialect.md)
- [ObservableAction](enums/ObservableAction.md)
- [RelationType](enums/RelationType.md)
- [SentenceAction](enums/SentenceAction.md)
- [SentenceCrudAction](enums/SentenceCrudAction.md)

### Classes

- [AcquireConnection](classes/AcquireConnection.md)
- [ActionObserver](classes/ActionObserver.md)
- [BulkInsert](classes/BulkInsert.md)
- [Clause](classes/Clause.md)
- [CompleteSchema](classes/CompleteSchema.md)
- [ConnectionError](classes/ConnectionError.md)
- [ConnectionFacade](classes/ConnectionFacade.md)
- [ConnectionPoolService](classes/ConnectionPoolService.md)
- [Constant](classes/Constant.md)
- [CreateSchema](classes/CreateSchema.md)
- [DDLBuilderService](classes/DDLBuilderService.md)
- [Data](classes/Data.md)
- [DataSourceConfigService](classes/DataSourceConfigService.md)
- [Delete](classes/Delete.md)
- [DialectPoolService](classes/DialectPoolService.md)
- [DialectService](classes/DialectService.md)
- [DomainConfigService](classes/DomainConfigService.md)
- [ExecutionActionObserver](classes/ExecutionActionObserver.md)
- [ExecutionError](classes/ExecutionError.md)
- [ExecutorImpl](classes/ExecutorImpl.md)
- [ExpressionActionsImpl](classes/ExpressionActionsImpl.md)
- [ExpressionFacade](classes/ExpressionFacade.md)
- [ExpressionTransaction](classes/ExpressionTransaction.md)
- [Field](classes/Field.md)
- [Filter](classes/Filter.md)
- [FilterAction](classes/FilterAction.md)
- [FilterClauses](classes/FilterClauses.md)
- [FilterIncludeClauses](classes/FilterIncludeClauses.md)
- [From](classes/From.md)
- [GetSchema](classes/GetSchema.md)
- [GroupBy](classes/GroupBy.md)
- [Having](classes/Having.md)
- [HavingClauses](classes/HavingClauses.md)
- [Helper](classes/Helper.md)
- [Include](classes/Include.md)
- [IncludeAction](classes/IncludeAction.md)
- [IncludeClauses](classes/IncludeClauses.md)
- [Insert](classes/Insert.md)
- [Join](classes/Join.md)
- [LanguageError](classes/LanguageError.md)
- [LanguagesService](classes/LanguagesService.md)
- [LoadSchema](classes/LoadSchema.md)
- [Map](classes/Map.md)
- [Map2Clauses](classes/Map2Clauses.md)
- [MapClauses](classes/MapClauses.md)
- [MappingConfigService](classes/MappingConfigService.md)
- [MappingsConfigService](classes/MappingsConfigService.md)
- [MethodNotImplemented](classes/MethodNotImplemented.md)
- [ModificableClauses](classes/ModificableClauses.md)
- [NotImplemented](classes/NotImplemented.md)
- [OperandFacade](classes/OperandFacade.md)
- [Orm](classes/Orm.md)
- [OrmOperandHelper](classes/OrmOperandHelper.md)
- [Page](classes/Page.md)
- [PageClauses](classes/PageClauses.md)
- [Query](classes/Query.md)
- [QueryAction](classes/QueryAction.md)
- [QueryExecutorImpl](classes/QueryExecutorImpl.md)
- [QueryHelper](classes/QueryHelper.md)
- [Queryable](classes/Queryable.md)
- [ReleaseConnection](classes/ReleaseConnection.md)
- [Repository](classes/Repository.md)
- [RouteService](classes/RouteService.md)
- [SchemaError](classes/SchemaError.md)
- [SchemaExtender](classes/SchemaExtender.md)
- [SchemaFacade](classes/SchemaFacade.md)
- [SchemaFacadeBuilder](classes/SchemaFacadeBuilder.md)
- [SchemaService](classes/SchemaService.md)
- [Sentence](classes/Sentence.md)
- [SentenceFacade](classes/SentenceFacade.md)
- [SentenceInclude](classes/SentenceInclude.md)
- [SentenceSerializerImp](classes/SentenceSerializerImp.md)
- [SintaxisError](classes/SintaxisError.md)
- [Sort](classes/Sort.md)
- [StageActionDDL](classes/StageActionDDL.md)
- [StageActionDML](classes/StageActionDML.md)
- [StageConfigService](classes/StageConfigService.md)
- [StageDelete](classes/StageDelete.md)
- [StageDrop](classes/StageDrop.md)
- [StageExport](classes/StageExport.md)
- [StageFacade](classes/StageFacade.md)
- [StageImport](classes/StageImport.md)
- [StageMappingService](classes/StageMappingService.md)
- [StageModelService](classes/StageModelService.md)
- [StageSync](classes/StageSync.md)
- [StageTruncate](classes/StageTruncate.md)
- [Transaction](classes/Transaction.md)
- [Update](classes/Update.md)
- [ValidationError](classes/ValidationError.md)
- [ViewConfigService](classes/ViewConfigService.md)
- [ViewsConfigService](classes/ViewsConfigService.md)

### Interfaces

- [ActionObserverArgs](interfaces/ActionObserverArgs.md)
- [AppPathsConfig](interfaces/AppPathsConfig.md)
- [ApplicationSchema](interfaces/ApplicationSchema.md)
- [Behavior](interfaces/Behavior.md)
- [ClauseInfo](interfaces/ClauseInfo.md)
- [Connection](interfaces/Connection.md)
- [ConnectionConfig](interfaces/ConnectionConfig.md)
- [ConnectionPool](interfaces/ConnectionPool.md)
- [Constraint](interfaces/Constraint.md)
- [ContextInfo](interfaces/ContextInfo.md)
- [DDLBuilderPort](interfaces/DDLBuilderPort.md)
- [DMLBuilderPort](interfaces/DMLBuilderPort.md)
- [Dependent](interfaces/Dependent.md)
- [DialectFormat](interfaces/DialectFormat.md)
- [DmlBuilderPort](interfaces/DmlBuilderPort-1.md)
- [DomainSchema](interfaces/DomainSchema.md)
- [Entity](interfaces/Entity.md)
- [EntityMapping](interfaces/EntityMapping.md)
- [EntityView](interfaces/EntityView.md)
- [Enum](interfaces/Enum.md)
- [EnumValue](interfaces/EnumValue.md)
- [ExecuteResult](interfaces/ExecuteResult.md)
- [Executor](interfaces/Executor.md)
- [ExpressionActions](interfaces/ExpressionActions.md)
- [FormatMapping](interfaces/FormatMapping.md)
- [IFileSchemaReader](interfaces/IFileSchemaReader.md)
- [IOrm](interfaces/IOrm.md)
- [IQueryBuilder](interfaces/IQueryBuilder.md)
- [IRelation](interfaces/IRelation.md)
- [IRepository](interfaces/IRepository.md)
- [IRouteService](interfaces/IRouteService.md)
- [ISentenceBuilder](interfaces/ISentenceBuilder.md)
- [ISentenceCompleteBuilder](interfaces/ISentenceCompleteBuilder.md)
- [Index](interfaces/Index.md)
- [InfrastructureSchema](interfaces/InfrastructureSchema.md)
- [LanguagePort](interfaces/LanguagePort.md)
- [ListenerConfig](interfaces/ListenerConfig.md)
- [Mapping](interfaces/Mapping.md)
- [MappingConfig](interfaces/MappingConfig.md)
- [Metadata](interfaces/Metadata.md)
- [MetadataConstraint](interfaces/MetadataConstraint.md)
- [MetadataModel](interfaces/MetadataModel.md)
- [MetadataParameter](interfaces/MetadataParameter.md)
- [ModelConfig](interfaces/ModelConfig.md)
- [ModifyAllClauses](interfaces/ModifyAllClauses.md)
- [ModifyClauses](interfaces/ModifyClauses.md)
- [ModifyFilterClauses](interfaces/ModifyFilterClauses.md)
- [ModifyIncludeClauses](interfaces/ModifyIncludeClauses.md)
- [ObservableExecutor](interfaces/ObservableExecutor.md)
- [ObservableExecutorDecorator](interfaces/ObservableExecutorDecorator.md)
- [Property](interfaces/Property.md)
- [PropertyMapping](interfaces/PropertyMapping.md)
- [PropertyView](interfaces/PropertyView.md)
- [QueryArgs](interfaces/QueryArgs.md)
- [QueryExecutor](interfaces/QueryExecutor.md)
- [QueryInternalExecutor](interfaces/QueryInternalExecutor.md)
- [QueryOptions](interfaces/QueryOptions.md)
- [QueryPlan](interfaces/QueryPlan.md)
- [Relation](interfaces/Relation.md)
- [RelationIncludeClauses](interfaces/RelationIncludeClauses.md)
- [RelationInfo](interfaces/RelationInfo.md)
- [RelationMapClauses](interfaces/RelationMapClauses.md)
- [Schema](interfaces/Schema.md)
- [SchemaConfig](interfaces/SchemaConfig.md)
- [SchemaConfigEntity](interfaces/SchemaConfigEntity.md)
- [SentenceSerializer](interfaces/SentenceSerializer.md)
- [Source](interfaces/Source.md)
- [SourceRule](interfaces/SourceRule.md)
- [Stage](interfaces/Stage.md)
- [TaskConfig](interfaces/TaskConfig.md)
- [View](interfaces/View.md)

### Type Aliases

- [ManyToOne](README.md#manytoone)
- [OneToMany](README.md#onetomany)
- [OneToOne](README.md#onetoone)

### Variables

- [DIALECT\_DEFAULT](README.md#dialect_default)
- [orm](README.md#orm)

### Functions

- [abs](README.md#abs)
- [acos](README.md#acos)
- [addDay](README.md#addday)
- [addHours](README.md#addhours)
- [addMinutes](README.md#addminutes)
- [addMonth](README.md#addmonth)
- [addSeconds](README.md#addseconds)
- [addTime](README.md#addtime)
- [addYear](README.md#addyear)
- [as](README.md#as)
- [asc](README.md#asc)
- [asin](README.md#asin)
- [atan](README.md#atan)
- [atan2](README.md#atan2)
- [avg](README.md#avg)
- [between](README.md#between)
- [ceil](README.md#ceil)
- [chr](README.md#chr)
- [concat](README.md#concat)
- [cos](README.md#cos)
- [cosh](README.md#cosh)
- [count](README.md#count)
- [curTime](README.md#curtime)
- [date](README.md#date)
- [dateDiff](README.md#datediff)
- [dateTime](README.md#datetime)
- [day](README.md#day)
- [desc](README.md#desc)
- [distinct](README.md#distinct)
- [exp](README.md#exp)
- [first](README.md#first)
- [floor](README.md#floor)
- [hours](README.md#hours)
- [includes](README.md#includes)
- [isNotNull](README.md#isnotnull)
- [isNull](README.md#isnull)
- [last](README.md#last)
- [like](README.md#like)
- [ln](README.md#ln)
- [log](README.md#log)
- [lower](README.md#lower)
- [lpad](README.md#lpad)
- [ltrim](README.md#ltrim)
- [max](README.md#max)
- [min](README.md#min)
- [minutes](README.md#minutes)
- [month](README.md#month)
- [now](README.md#now)
- [nvl](README.md#nvl)
- [nvl2](README.md#nvl2)
- [remainder](README.md#remainder)
- [replace](README.md#replace)
- [round](README.md#round)
- [rpad](README.md#rpad)
- [rtrim](README.md#rtrim)
- [seconds](README.md#seconds)
- [sign](README.md#sign)
- [sin](README.md#sin)
- [sinh](README.md#sinh)
- [source](README.md#source)
- [startsWith](README.md#startswith)
- [substr](README.md#substr)
- [substring](README.md#substring)
- [sum](README.md#sum)
- [tan](README.md#tan)
- [tanh](README.md#tanh)
- [time](README.md#time)
- [timeDiff](README.md#timediff)
- [toDate](README.md#todate)
- [toDateTime](README.md#todatetime)
- [toJson](README.md#tojson)
- [toNumber](README.md#tonumber)
- [toString](README.md#tostring)
- [toTime](README.md#totime)
- [today](README.md#today)
- [trim](README.md#trim)
- [trunc](README.md#trunc)
- [upper](README.md#upper)
- [user](README.md#user)
- [weekday](README.md#weekday)
- [year](README.md#year)

## Type Aliases

### ManyToOne

Ƭ **ManyToOne**\<`T`\>: [`IRelation`](interfaces/IRelation.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:143

___

### OneToMany

Ƭ **OneToMany**\<`T`\>: [`IRelation`](interfaces/IRelation.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:141

___

### OneToOne

Ƭ **OneToOne**\<`T`\>: [`IRelation`](interfaces/IRelation.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:142

## Variables

### DIALECT\_DEFAULT

• `Const` **DIALECT\_DEFAULT**: [`MySQL`](enums/Dialect.md#mysql) = `Dialect.MySQL`

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:3

___

### orm

• `Const` **orm**: [`Orm`](classes/Orm.md) = `Orm.instance`

#### Defined in

[src/lib/orm/infrastructure/orm.ts:262](https://github.com/FlavioLionelRita/lambdaorm/blob/27a00d30/src/lib/orm/infrastructure/orm.ts#L262)

## Functions

### abs

▸ **abs**(`value`): `number`

Get the absolute value

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`number`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:157

___

### acos

▸ **acos**(`value`): `number`

Get the arc cosine

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`number`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:159

___

### addDay

▸ **addDay**(`date`, `value`): `Date`

#### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `Date` |
| `value` | `number` |

#### Returns

`Date`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:262

___

### addHours

▸ **addHours**(`date`, `value`): `Date`

#### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `Date` |
| `value` | `number` |

#### Returns

`Date`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:264

___

### addMinutes

▸ **addMinutes**(`date`, `value`): `Date`

#### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `Date` |
| `value` | `number` |

#### Returns

`Date`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:266

___

### addMonth

▸ **addMonth**(`date`, `value`): `Date`

#### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `Date` |
| `value` | `number` |

#### Returns

`Date`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:260

___

### addSeconds

▸ **addSeconds**(`date`, `value`): `Date`

#### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `Date` |
| `value` | `number` |

#### Returns

`Date`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:268

___

### addTime

▸ **addTime**(`date`, `value`): `Date`

#### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `Date` |
| `value` | `number` |

#### Returns

`Date`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:270

___

### addYear

▸ **addYear**(`date`, `value`): `Date`

#### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `Date` |
| `value` | `number` |

#### Returns

`Date`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:258

___

### as

▸ **as**(`value`, `name`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |
| `name` | `any` |

#### Returns

`any`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:145

___

### asc

▸ **asc**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`void`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:149

___

### asin

▸ **asin**(`value`): `number`

Get the arc sine

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`number`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:161

___

### atan

▸ **atan**(`value`): `number`

Get the arc tangent

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`number`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:163

___

### atan2

▸ **atan2**(`x`, `y`): `number`

Get the arc tangent of x and y

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Returns

`number`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:165

___

### avg

▸ **avg**(`value`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`any`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:300

___

### between

▸ **between**(`value`, `from`, `to`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |
| `from` | `any` |
| `to` | `any` |

#### Returns

`boolean`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:151

___

### ceil

▸ **ceil**(`value`): `number`

Get the smallest following integer

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`number`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:167

___

### chr

▸ **chr**(`value`): `string`

Get character from ASCII code

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:197

___

### concat

▸ **concat**(`...values`): `string`

String concatenation

#### Parameters

| Name | Type |
| :------ | :------ |
| `...values` | `string`[] |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:220

___

### cos

▸ **cos**(`value`): `number`

Get the cosine

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`number`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:169

___

### cosh

▸ **cosh**(`value`): `number`

Get hyperbolic cosine

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`number`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:171

___

### count

▸ **count**(`value`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`any`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:302

___

### curTime

▸ **curTime**(): `Date`

Get the current time

#### Returns

`Date`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:232

___

### date

▸ **date**(`value`): `Date`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`Date`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:240

___

### dateDiff

▸ **dateDiff**(`date`, `date2`): `Date`

#### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `Date` |
| `date2` | `Date` |

#### Returns

`Date`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:272

___

### dateTime

▸ **dateTime**(`value`): `Date`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`Date`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:242

___

### day

▸ **day**(`value`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Date` |

#### Returns

`number`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:248

___

### desc

▸ **desc**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`void`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:147

___

### distinct

▸ **distinct**(`value`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`any`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:155

___

### exp

▸ **exp**(`value`): `number`

Raise e to the nth power

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`number`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:173

___

### first

▸ **first**(`value`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`any`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:304

___

### floor

▸ **floor**(`value`): `number`

Get the largest preceding integer

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`number`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:175

___

### hours

▸ **hours**(`value`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Date` |

#### Returns

`number`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:252

___

### includes

▸ **includes**(`value`, `list`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |
| `list` | `any`[] |

#### Returns

`boolean`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:153

▸ **includes**(`field`, `searchString`): `string`

Returns true if searchString appears as a substring of the result of converting this

#### Parameters

| Name | Type |
| :------ | :------ |
| `field` | `string` |
| `searchString` | `string` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:230

___

### isNotNull

▸ **isNotNull**(`value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`boolean`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:298

___

### isNull

▸ **isNull**(`value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`boolean`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:296

___

### last

▸ **last**(`value`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`any`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:306

___

### like

▸ **like**(`field`, `searchString`): `string`

Get the position of the first occurrence of substring

#### Parameters

| Name | Type |
| :------ | :------ |
| `field` | `string` |
| `searchString` | `string` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:222

___

### ln

▸ **ln**(`value`): `number`

Get natural logarithm of num

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`number`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:177

___

### log

▸ **log**(`num1`, `num2`): `number`

Get logarithm, base num1, of num2

#### Parameters

| Name | Type |
| :------ | :------ |
| `num1` | `number` |
| `num2` | `number` |

#### Returns

`number`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:179

___

### lower

▸ **lower**(`value`): `string`

Lowercase string

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:200

___

### lpad

▸ **lpad**(`value`, `len`, `pad`): `string`

Pad the left-side of string

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |
| `len` | `number` |
| `pad` | `string` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:202

___

### ltrim

▸ **ltrim**(`value`): `string`

Remove leading chars

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:204

___

### max

▸ **max**(`value`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`any`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:308

___

### min

▸ **min**(`value`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`any`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:310

___

### minutes

▸ **minutes**(`value`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Date` |

#### Returns

`number`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:254

___

### month

▸ **month**(`value`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Date` |

#### Returns

`number`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:246

___

### now

▸ **now**(): `Date`

Get the current dateTime

#### Returns

`Date`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:236

___

### nvl

▸ **nvl**(`value`, `_default`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |
| `_default` | `any` |

#### Returns

`any`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:292

___

### nvl2

▸ **nvl2**(`value`, `a`, `b`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |
| `a` | `any` |
| `b` | `any` |

#### Returns

`any`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:294

___

### remainder

▸ **remainder**(`n1`, `n2`): `number`

Get remainder

#### Parameters

| Name | Type |
| :------ | :------ |
| `n1` | `number` |
| `n2` | `number` |

#### Returns

`number`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:181

___

### replace

▸ **replace**(`value`, `source`, `target`): `string`

The replace() method searches a string for a specified value and returns a new string where the specified values are replaced.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |
| `source` | `string` |
| `target` | `string` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:206

___

### round

▸ **round**(`value`, `decimals`): `number`

Get rounded value

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |
| `decimals` | `number` |

#### Returns

`number`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:183

___

### rpad

▸ **rpad**(`value`, `len`, `pad`): `string`

Pad the right-side of string

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |
| `len` | `number` |
| `pad` | `string` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:208

___

### rtrim

▸ **rtrim**(`value`): `string`

Remove trailing spaces

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:210

___

### seconds

▸ **seconds**(`value`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Date` |

#### Returns

`number`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:256

___

### sign

▸ **sign**(`value`): `number`

Get sign of exp

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`number`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:185

___

### sin

▸ **sin**(`value`): `number`

Get sine

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`number`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:187

___

### sinh

▸ **sinh**(`value`): `number`

Get hyperbolic sine

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`number`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:189

___

### source

▸ **source**(): `string`

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:290

___

### startsWith

▸ **startsWith**(`field`, `searchString`): `string`

Returns true if the sequence of elements of searchString converted to a String is the
same as the corresponding elements of this object (converted to a String) starting at
position. Otherwise returns false.

#### Parameters

| Name | Type |
| :------ | :------ |
| `field` | `string` |
| `searchString` | `string` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:228

___

### substr

▸ **substr**(`value`, `from`, `count`): `string`

Get a substring of string

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |
| `from` | `number` |
| `count` | `number` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:212

___

### substring

▸ **substring**(`value`, `from`, `count`): `string`

Get a substring of string

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |
| `from` | `number` |
| `count` | `number` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:214

___

### sum

▸ **sum**(`value`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`any`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:312

___

### tan

▸ **tan**(`value`): `number`

Get tangent

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`number`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:191

___

### tanh

▸ **tanh**(`value`): `number`

Get hyperbolic tangent

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`number`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:193

___

### time

▸ **time**(`value`): `Date`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`Date`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:238

___

### timeDiff

▸ **timeDiff**(`time`, `time2`): `Date`

#### Parameters

| Name | Type |
| :------ | :------ |
| `time` | `Date` |
| `time2` | `Date` |

#### Returns

`Date`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:274

___

### toDate

▸ **toDate**(`value`): `Date`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`Date`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:278

___

### toDateTime

▸ **toDateTime**(`value`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:280

___

### toJson

▸ **toJson**(`value`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`any`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:284

___

### toNumber

▸ **toNumber**(`value`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`number`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:286

___

### toString

▸ **toString**(`value`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:276

___

### toTime

▸ **toTime**(`value`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:282

___

### today

▸ **today**(): `Date`

Get the current date

#### Returns

`Date`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:234

___

### trim

▸ **trim**(`value`): `string`

Remove characters

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:216

___

### trunc

▸ **trunc**(`value`, `decimals`): `number`

Truncate num

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |
| `decimals` | `number` |

#### Returns

`number`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:195

___

### upper

▸ **upper**(`value`): `string`

Uppercase string

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:218

___

### user

▸ **user**(): `string`

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:288

___

### weekday

▸ **weekday**(`value`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Date` |

#### Returns

`number`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:250

___

### year

▸ **year**(`value`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Date` |

#### Returns

`number`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:244
