# Schema

The schema includes all the configuration that the ORM needs.

The schema separates the definition of the business model (Domain) from the persistence of the data (Infrastructure).

In the domain, the entities and enumerators that represent the business model are completely clean, without any attributes that couple them to persistence.

All queries are made according to the business model, so all queries are decoupled from the physical model of the data.

In the infrastructure, all the necessary configuration is defined to be able to persist and obtain the data from the different sources.

The schema configuration can be done in a yaml, json file or passed as a parameter when initializing the ORM.

All the expressions that are used for the definition of conditions and for the execution of actions are based on the expression engine [3xpr](https://www.npmjs.com/package/3xpr)

## Example:

This example poses a stage where two sources are accessed.
Data source 1 is MySQL and contains the Countries table and source 2 is PostgreSQL contains the States table.

In the case of the Countries entity, both the name of the table and the fields coincide with the name of the entity and the name of the properties, so the mapping is transparent.

But in the case of the States entity, the name of the table and its fields differ, so the mapping defines the mapping.

![diagram](https://raw.githubusercontent.com/lambda-orm/lambdaorm/HEAD/images/schema5.svg)
