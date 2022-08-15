# Schema Examples

## Simple

The schema defines how the entities of the model are mapped with the database tables.

![schema](https://raw.githubusercontent.com/FlavioLionelRita/lambdaorm/HEAD/images/schema.svg)

```yaml
entities:
  - name: Countries
    primaryKey: ["iso3"]
    uniqueKey: ["name"]
    properties:
      - name: name
        nullable: false
      - name: iso3
        length: 3
        nullable: false
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
        nullable: false
      - name: name
        nullable: false
      - name: countryCode
        nullable: false
        length: 3
    relations:
      - name: country
        from: countryCode
        entity: Countries
        to: iso3
dataSources:
  - name: dataSource1
    dialect: mysql
    connection:
      host: localhost
      port: 3306
      user: test
      password: test
      database: test
```

[example lab](https://github.com/FlavioLionelRita/lambdaorm-lab01)

## Extend entities

In this scheme we can see how to extend entities.

![schema](https://raw.githubusercontent.com/FlavioLionelRita/lambdaorm/HEAD/images/schema2.svg)

To understand an entity we use the extends attribute in the definition of the entity

```yaml
entities:
  - name: Positions
    abstract: true
    properties:
      - name: latitude
        length: 16
      - name: longitude
        length: 16
  - name: Countries
    extends: Positions
    primaryKey: ["iso3"]
    uniqueKey: ["name"]
    properties:
      - name: name
        nullable: false
      - name: iso3
        length: 3
        nullable: false
    relations:
      - name: states
        type: manyToOne
        composite: true
        from: iso3
        entity: States
        to: countryCode
  - name: States
    extends: Positions
    primaryKey: ["id"]
    uniqueKey: ["countryCode", "name"]
    properties:
      - name: id
        type: integer
        nullable: false
      - name: name
        nullable: false
      - name: countryCode
        nullable: false
        length: 3
    relations:
      - name: country
        from: countryCode
        entity: Countries
        to: iso3
dataSources:
  - name: dataSource1
    dialect: mysql
    connection:
      host: localhost
      port: 3306
      user: test
      password: test
      database: test
```

[example lab](https://github.com/FlavioLionelRita/lambdaorm-lab02)

## Extend schemas

In this scheme we can see how to extend the schema.

![schema](https://raw.githubusercontent.com/FlavioLionelRita/lambdaorm/HEAD/images/schema3.svg)

We use the extends attribute in the definition of the schema to extend it.

```yaml
entities:
  - name: Countries
    primaryKey: ["iso3"]
    uniqueKey: ["name"]
    properties:
      - name: name
        nullable: false
      - name: iso3
        length: 3
        nullable: false
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
        nullable: false
      - name: name
        nullable: false
      - name: countryCode
        nullable: false
        length: 3
    relations:
      - name: country
        from: countryCode
        entity: Countries
        to: iso3
mappings:
  - name: mapping1
  - name: mapping2
    entities:
      - name: Countries
        mapping: TBL_COUNTRIES
        properties:
          - name: iso3
            mapping: ISO3
          - name: name
            mapping: NAME
      - name: States
        mapping: TBL_STATES
        properties:
          - name: id
            mapping: ID
          - name: name
            mapping: NAME
          - name: countryCode
            mapping: COUNTRY_CODE
dataSources:
  - name: dataSource1
    dialect: mysql
    mapping: mapping1
    connection:
      host: localhost
      port: 3306
      user: test
      password: test
      database: test
  - name: dataSource2
    dialect: postgres
    mapping: mapping2
    connection:
      host: localhost
      port: 5432
      user: test
      password: test
      database: test
stages:
  - name: stage1
    dataSources:
      - name: dataSource1
  - name: stage2
    dataSources:
      - name: dataSource2
```

[example lab](https://github.com/FlavioLionelRita/lambdaorm-lab03)

## One schema related multiples databases

This schema has two entities that are in different databases.

![schema](https://raw.githubusercontent.com/FlavioLionelRita/lambdaorm/HEAD/images/schema4.svg)

The database attribute is used in the entity to be able to specify that an entity is in a database other than the default of the schema.

```yaml
entities:
  - name: Countries
    primaryKey: ["iso3"]
    uniqueKey: ["name"]
    properties:
      - name: name
        nullable: false
      - name: iso3
        length: 3
        nullable: false
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
        nullable: false
      - name: name
        nullable: false
      - name: countryCode
        nullable: false
        length: 3
    relations:
      - name: country
        from: countryCode
        entity: Countries
        to: iso3
dataSources:
  - name: dataSource1
    dialect: mysql
    connection:
      host: localhost
      port: 3306
      user: test
      password: test
      database: test
  - name: dataSource2
    dialect: postgres
    connection:
      host: localhost
      port: 5432
      user: test
      password: test
      database: test
stages:
  - name: stage1
    dataSources:
      - name: dataSource2
        condition: entity == "States"
      - name: dataSource1
```

[example lab](https://github.com/FlavioLionelRita/lambdaorm-lab04)

## One schema related multiples databases II

This example poses a stage where two dataSources are accessed.
Data source 1 is mysql and contains the Countries table and dataSource 2 is postgres contains the States table.

In the case of the Countries entity, both the name of the table and the fields coincide with the name of the entity and the name of the properties, so the mapping is transparent.

But in the case of the States entity, the name of the table and its fields differ, so the mapping defines the mapping.

![schema](https://raw.githubusercontent.com/FlavioLionelRita/lambdaorm/HEAD/images/schema5.svg)

```yaml
entities:
  - name: Positions
    abstract: true
    properties:
      - name: latitude
        length: 16
      - name: longitude
        length: 16
  - name: Countries
    extends: Positions
    primaryKey: ["iso3"]
    uniqueKey: ["name"]
    properties:
      - name: name
        nullable: false
      - name: iso3
        length: 3
        nullable: false
      - name: region
      - name: subregion
    relations:
      - name: states
        type: manyToOne
        composite: true
        from: iso3
        entity: States
        to: countryCode
  - name: States
    extends: Positions
    primaryKey: ["id"]
    uniqueKey: ["countryCode", "name"]
    properties:
      - name: id
        type: integer
        nullable: false
      - name: name
        nullable: false
      - name: countryCode
        nullable: false
        length: 3
    relations:
      - name: country
        from: countryCode
        entity: Countries
        to: iso3
dataSources:
  - name: dataSource1
    dialect: mysql
    mapping: mapping1
    connection: $CNN_MYDB
  - name: dataSource2
    dialect: postgres
    mapping: mapping2
    connection: $CNN_MYDB2
mappings:
  - name: mapping1
  - name: mapping2
    entities:
      - name: States
        mapping: TBL_STATES
        properties:
          - name: id
            mapping: ID
          - name: name
            mapping: NAME
          - name: countryCode
            mapping: COUNTRY_CODE
          - name: latitude
            mapping: LATITUDE
          - name: longitude
            mapping: LONGITUDE
stages:
  - name: stage1
    dataSources:
      - name: dataSource2
        condition: entity == "States"
      - name: dataSource1
```
