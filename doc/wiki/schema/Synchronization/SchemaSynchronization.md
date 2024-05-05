# Synchronization

The synchronization is the process of updating the schema defined in yaml/json configuration file with structure in sources (Databases). The synchronization is a process that can be done in both directions, from the schema configuration to the sources (Databases) and from the source to the schema file configuration.

## Push

The push is the process of updating the sources (Databases) with the schema defined in the configuration file. The push process is done by the command `lambdaorm push`.

[more info](https://github.com/lambda-orm/lambdaorm/wiki/SchemaSynchronization-Push)

## Pull

The pull is the process of updating the schema defined in the configuration file with the structure in the sources (Databases). The pull process is done by the command `lambdaorm pull`.

[more info](https://github.com/lambda-orm/lambdaorm/wiki/SchemaSynchronization-Pull)

## Fetch

The fetch is the process show differences between sources and schema but not apply changes.The pull process is done by the command  `lambdaorm fetch`.

[more info](https://github.com/lambda-orm/lambdaorm/wiki/SchemaSynchronization-Fetch)

## Introspect

Introspection is the process of updating the schema defined in the configuration file by introspecting a data file and then applying the changes to the sources (Databases). The introspection process is performed using the `lambdaorm introspect` command.

[more info](https://github.com/lambda-orm/lambdaorm/wiki/SchemaSynchronization-Introspect)

## Incorporate

Onboarding is the process of updating the schema defined in the configuration file by introspecting a data file and then applying the changes to the sources (databases) and then importing the data into the sources (Databases). The introspection process is performed using the `lambdaorm incorporate` command.

[more info](https://github.com/lambda-orm/lambdaorm/wiki/SchemaSynchronization-Incorporate)
