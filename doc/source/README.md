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
- [ExpressionActions](classes/ExpressionActions.md)
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
- [ObservableExecutorDecorator](classes/ObservableExecutorDecorator.md)
- [OperandFacade](classes/OperandFacade.md)
- [Orm](classes/Orm.md)
- [OrmOperandHelper](classes/OrmOperandHelper.md)
- [Page](classes/Page.md)
- [PageClauses](classes/PageClauses.md)
- [Query](classes/Query.md)
- [QueryAction](classes/QueryAction.md)
- [QueryExecutor](classes/QueryExecutor.md)
- [QueryHelper](classes/QueryHelper.md)
- [Queryable](classes/Queryable.md)
- [ReleaseConnection](classes/ReleaseConnection.md)
- [Repository](classes/Repository.md)
- [RouteService](classes/RouteService.md)
- [SchemaError](classes/SchemaError.md)
- [SchemaExtender](classes/SchemaExtender.md)
- [SchemaFacade](classes/SchemaFacade.md)
- [SchemaService](classes/SchemaService.md)
- [Sentence](classes/Sentence.md)
- [SentenceFacade](classes/SentenceFacade.md)
- [SentenceInclude](classes/SentenceInclude.md)
- [SentenceSerializerImp](classes/SentenceSerializerImp.md)
- [SintaxisError](classes/SintaxisError.md)
- [Sort](classes/Sort.md)
- [StageActionDDL](classes/StageActionDDL.md)
- [StageActionDML](classes/StageActionDML.md)
- [StageClean](classes/StageClean.md)
- [StageConfigService](classes/StageConfigService.md)
- [StageDelete](classes/StageDelete.md)
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
- [DataSourceRule](interfaces/DataSourceRule.md)
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
- [FormatMapping](interfaces/FormatMapping.md)
- [IFileSchemaReader](interfaces/IFileSchemaReader.md)
- [IOrm](interfaces/IOrm.md)
- [IQueryBuilder](interfaces/IQueryBuilder.md)
- [IQueryInternalExecutor](interfaces/IQueryInternalExecutor.md)
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
- [Property](interfaces/Property.md)
- [PropertyMapping](interfaces/PropertyMapping.md)
- [PropertyView](interfaces/PropertyView.md)
- [QueryArgs](interfaces/QueryArgs.md)
- [QueryInfo](interfaces/QueryInfo.md)
- [QueryOptions](interfaces/QueryOptions.md)
- [Relation](interfaces/Relation.md)
- [RelationIncludeClauses](interfaces/RelationIncludeClauses.md)
- [RelationInfo](interfaces/RelationInfo.md)
- [RelationMapClauses](interfaces/RelationMapClauses.md)
- [Schema](interfaces/Schema.md)
- [SchemaConfig](interfaces/SchemaConfig.md)
- [SchemaConfigEntity](interfaces/SchemaConfigEntity.md)
- [SentenceSerializer](interfaces/SentenceSerializer.md)
- [Source](interfaces/Source.md)
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

[src/lib/repository/domain/queryable.ts:326](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L326)

___

### OneToMany

Ƭ **OneToMany**\<`T`\>: [`IRelation`](interfaces/IRelation.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[src/lib/repository/domain/queryable.ts:324](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L324)

___

### OneToOne

Ƭ **OneToOne**\<`T`\>: [`IRelation`](interfaces/IRelation.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[src/lib/repository/domain/queryable.ts:325](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L325)

## Variables

### DIALECT\_DEFAULT

• `Const` **DIALECT\_DEFAULT**: [`MySQL`](enums/Dialect.md#mysql) = `Dialect.MySQL`

#### Defined in

[src/lib/schema/domain/schema.ts:3](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/schema/domain/schema.ts#L3)

___

### orm

• `Const` **orm**: [`Orm`](classes/Orm.md) = `Orm.instance`

#### Defined in

[src/lib/orm/infrastructure/orm.ts:256](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/orm/infrastructure/orm.ts#L256)

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

[src/lib/repository/domain/queryable.ts:343](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L343)

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

[src/lib/repository/domain/queryable.ts:345](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L345)

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

[src/lib/repository/domain/queryable.ts:447](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L447)

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

[src/lib/repository/domain/queryable.ts:449](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L449)

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

[src/lib/repository/domain/queryable.ts:451](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L451)

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

[src/lib/repository/domain/queryable.ts:445](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L445)

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

[src/lib/repository/domain/queryable.ts:453](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L453)

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

[src/lib/repository/domain/queryable.ts:455](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L455)

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

[src/lib/repository/domain/queryable.ts:443](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L443)

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

[src/lib/repository/domain/queryable.ts:330](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L330)

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

[src/lib/repository/domain/queryable.ts:334](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L334)

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

[src/lib/repository/domain/queryable.ts:347](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L347)

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

[src/lib/repository/domain/queryable.ts:349](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L349)

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

[src/lib/repository/domain/queryable.ts:351](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L351)

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

[src/lib/repository/domain/queryable.ts:489](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L489)

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

[src/lib/repository/domain/queryable.ts:336](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L336)

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

[src/lib/repository/domain/queryable.ts:353](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L353)

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

[src/lib/repository/domain/queryable.ts:384](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L384)

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

[src/lib/repository/domain/queryable.ts:412](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L412)

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

[src/lib/repository/domain/queryable.ts:355](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L355)

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

[src/lib/repository/domain/queryable.ts:357](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L357)

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

[src/lib/repository/domain/queryable.ts:491](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L491)

___

### curTime

▸ **curTime**(): `Date`

Get the current time

#### Returns

`Date`

#### Defined in

[src/lib/repository/domain/queryable.ts:417](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L417)

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

[src/lib/repository/domain/queryable.ts:425](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L425)

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

[src/lib/repository/domain/queryable.ts:457](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L457)

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

[src/lib/repository/domain/queryable.ts:427](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L427)

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

[src/lib/repository/domain/queryable.ts:433](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L433)

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

[src/lib/repository/domain/queryable.ts:332](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L332)

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

[src/lib/repository/domain/queryable.ts:340](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L340)

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

[src/lib/repository/domain/queryable.ts:359](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L359)

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

[src/lib/repository/domain/queryable.ts:493](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L493)

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

[src/lib/repository/domain/queryable.ts:361](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L361)

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

[src/lib/repository/domain/queryable.ts:437](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L437)

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

[src/lib/repository/domain/queryable.ts:338](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L338)

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

[src/lib/repository/domain/queryable.ts:486](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L486)

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

[src/lib/repository/domain/queryable.ts:484](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L484)

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

[src/lib/repository/domain/queryable.ts:495](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L495)

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

[src/lib/repository/domain/queryable.ts:363](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L363)

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

[src/lib/repository/domain/queryable.ts:365](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L365)

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

[src/lib/repository/domain/queryable.ts:388](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L388)

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

[src/lib/repository/domain/queryable.ts:390](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L390)

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

[src/lib/repository/domain/queryable.ts:392](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L392)

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

[src/lib/repository/domain/queryable.ts:497](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L497)

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

[src/lib/repository/domain/queryable.ts:499](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L499)

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

[src/lib/repository/domain/queryable.ts:439](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L439)

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

[src/lib/repository/domain/queryable.ts:431](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L431)

___

### now

▸ **now**(): `Date`

Get the current dateTime

#### Returns

`Date`

#### Defined in

[src/lib/repository/domain/queryable.ts:421](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L421)

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

[src/lib/repository/domain/queryable.ts:480](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L480)

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

[src/lib/repository/domain/queryable.ts:482](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L482)

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

[src/lib/repository/domain/queryable.ts:367](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L367)

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

[src/lib/repository/domain/queryable.ts:398](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L398)

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

[src/lib/repository/domain/queryable.ts:369](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L369)

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

[src/lib/repository/domain/queryable.ts:400](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L400)

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

[src/lib/repository/domain/queryable.ts:402](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L402)

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

[src/lib/repository/domain/queryable.ts:441](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L441)

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

[src/lib/repository/domain/queryable.ts:371](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L371)

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

[src/lib/repository/domain/queryable.ts:373](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L373)

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

[src/lib/repository/domain/queryable.ts:375](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L375)

___

### source

▸ **source**(): `string`

#### Returns

`string`

#### Defined in

[src/lib/repository/domain/queryable.ts:477](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L477)

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

[src/lib/repository/domain/queryable.ts:404](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L404)

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

[src/lib/repository/domain/queryable.ts:406](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L406)

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

[src/lib/repository/domain/queryable.ts:501](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L501)

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

[src/lib/repository/domain/queryable.ts:377](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L377)

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

[src/lib/repository/domain/queryable.ts:379](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L379)

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

[src/lib/repository/domain/queryable.ts:423](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L423)

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

[src/lib/repository/domain/queryable.ts:459](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L459)

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

[src/lib/repository/domain/queryable.ts:464](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L464)

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

[src/lib/repository/domain/queryable.ts:466](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L466)

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

[src/lib/repository/domain/queryable.ts:470](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L470)

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

[src/lib/repository/domain/queryable.ts:472](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L472)

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

[src/lib/repository/domain/queryable.ts:462](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L462)

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

[src/lib/repository/domain/queryable.ts:468](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L468)

___

### today

▸ **today**(): `Date`

Get the current date

#### Returns

`Date`

#### Defined in

[src/lib/repository/domain/queryable.ts:419](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L419)

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

[src/lib/repository/domain/queryable.ts:408](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L408)

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

[src/lib/repository/domain/queryable.ts:381](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L381)

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

[src/lib/repository/domain/queryable.ts:410](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L410)

___

### user

▸ **user**(): `string`

#### Returns

`string`

#### Defined in

[src/lib/repository/domain/queryable.ts:475](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L475)

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

[src/lib/repository/domain/queryable.ts:435](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L435)

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

[src/lib/repository/domain/queryable.ts:429](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L429)
