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

- [ActionObserver](classes/ActionObserver.md)
- [CompleteSchema](classes/CompleteSchema.md)
- [CreateSchema](classes/CreateSchema.md)
- [Data](classes/Data.md)
- [DataSourceConfigService](classes/DataSourceConfigService.md)
- [DomainConfigService](classes/DomainConfigService.md)
- [ExpressionActions](classes/ExpressionActions.md)
- [GetSchema](classes/GetSchema.md)
- [Helper](classes/Helper.md)
- [Include](classes/Include.md)
- [LoadSchema](classes/LoadSchema.md)
- [MappingConfigService](classes/MappingConfigService.md)
- [MappingsConfigService](classes/MappingsConfigService.md)
- [MethodNotImplemented](classes/MethodNotImplemented.md)
- [NotImplemented](classes/NotImplemented.md)
- [Orm](classes/Orm.md)
- [Query](classes/Query.md)
- [QueryAction](classes/QueryAction.md)
- [QueryHelper](classes/QueryHelper.md)
- [Queryable](classes/Queryable.md)
- [Repository](classes/Repository.md)
- [RouteService](classes/RouteService.md)
- [SchemaError](classes/SchemaError.md)
- [SchemaExtender](classes/SchemaExtender.md)
- [SchemaFacade](classes/SchemaFacade.md)
- [SchemaService](classes/SchemaService.md)
- [SintaxisError](classes/SintaxisError.md)
- [StageConfigService](classes/StageConfigService.md)
- [StageFacade](classes/StageFacade.md)
- [Transaction](classes/Transaction.md)
- [ValidationError](classes/ValidationError.md)
- [ViewConfigService](classes/ViewConfigService.md)
- [ViewsConfigService](classes/ViewsConfigService.md)

### Interfaces

- [ActionObserverArgs](interfaces/ActionObserverArgs.md)
- [AppPathsConfig](interfaces/AppPathsConfig.md)
- [ApplicationSchema](interfaces/ApplicationSchema.md)
- [Behavior](interfaces/Behavior.md)
- [ClauseInfo](interfaces/ClauseInfo.md)
- [Constraint](interfaces/Constraint.md)
- [ContextInfo](interfaces/ContextInfo.md)
- [DataSourceRule](interfaces/DataSourceRule.md)
- [Dependent](interfaces/Dependent.md)
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
- [IRepository](interfaces/IRepository.md)
- [IRouteService](interfaces/IRouteService.md)
- [Index](interfaces/Index.md)
- [InfrastructureSchema](interfaces/InfrastructureSchema.md)
- [ListenerConfig](interfaces/ListenerConfig.md)
- [Mapping](interfaces/Mapping.md)
- [MappingConfig](interfaces/MappingConfig.md)
- [ModelConfig](interfaces/ModelConfig.md)
- [ObservableExecutor](interfaces/ObservableExecutor.md)
- [Property](interfaces/Property.md)
- [PropertyMapping](interfaces/PropertyMapping.md)
- [PropertyView](interfaces/PropertyView.md)
- [QueryArgs](interfaces/QueryArgs.md)
- [QueryInfo](interfaces/QueryInfo.md)
- [QueryOptions](interfaces/QueryOptions.md)
- [Relation](interfaces/Relation.md)
- [RelationInfo](interfaces/RelationInfo.md)
- [Schema](interfaces/Schema.md)
- [SchemaConfig](interfaces/SchemaConfig.md)
- [SchemaConfigEntity](interfaces/SchemaConfigEntity.md)
- [Source](interfaces/Source.md)
- [Stage](interfaces/Stage.md)
- [TaskConfig](interfaces/TaskConfig.md)
- [View](interfaces/View.md)

### Variables

- [DIALECT\_DEFAULT](README.md#dialect_default)
- [orm](README.md#orm)

## Variables

### DIALECT\_DEFAULT

• `Const` **DIALECT\_DEFAULT**: [`MySQL`](enums/Dialect.md#mysql) = `Dialect.MySQL`

#### Defined in

[src/lib/schema/domain/schema.ts:3](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/schema/domain/schema.ts#L3)

___

### orm

• `Const` **orm**: [`Orm`](classes/Orm.md) = `Orm.instance`

#### Defined in

[src/lib/orm/infrastructure/orm.ts:256](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/orm/infrastructure/orm.ts#L256)
