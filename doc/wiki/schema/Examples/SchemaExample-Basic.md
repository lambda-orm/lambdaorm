# Basic Schema Example

In the basic configuration of a schema, the entities, mapping and data sources are defined.
Properties, relationships and keys are defined in entities.
In the mapping, the mappings of the entities with the database tables are defined.
In the data sources, the dialect of the data source and the connections are defined.

Many properties can be omitted since they have a default value.
For example:

- If the type of a property is not defined in an entity, it is assumed to be a string.
- If it is not specified that the property is required, it is assumed that it is not.
- If the length of a property is not defined, it is assumed to be 80.
- If the mapping information is not defined, it is assumed that the entities are called the same in the source data and that the properties are called the same as the field in the table or collection.

## Schema Example

The schema defines how the entities of the model are mapped with the database tables.

![schema](https://raw.githubusercontent.com/lambda-orm/lambdaorm/HEAD/images/schema.svg)

```yaml
domain:
  entities:
    - name: Countries
      primaryKey: ["iso3"]
      uniqueKey: ["name"]
      properties:
        - name: name
          required: true
        - name: iso3
          length: 3
          required: true
      relations:
        - name: states
          type: manyToOne
          composite: true
          from: iso3
          entity: States
          to: countryCode
    - name: States
      primaryKey: ["id"]
      uniqueKey: ["countryCode", "name"]
      properties:
        - name: id
          type: integer
          required: true
        - name: name
          required: true
        - name: countryCode
          required: true
          length: 3
      relations:
        - name: country
          from: countryCode
          entity: Countries
          to: iso3
infrastructure:
  mappings:
    - name: test          
  sources:
    - name: test
      dialect: MySQL
      mapping: test
      connection:
        host: localhost
        port: 3306
        user: test
        password: test
        database: test
  stages:
    - name: default
      sources:
        - name: test
```

## Laboratories

- [CLI - simple](https://github.com/lambda-orm/lambdaorm-labs/tree/main/labs/cli/01-simple)
