# Definition

The schema includes all the configuration that the ORM needs.

The schema separates the definition of the business model (Domain) from the persistence of the data (Infrastructure).

In the domain, the entities and enumerators that represent the business model are completely clean, without any attributes that couple them to persistence.

All queries are made according to the business model, so all queries are decoupled from the physical model of the data.

In the infrastructure, all the necessary configuration is defined to be able to persist and obtain the data from the different sources.

The schema configuration can be done in a yaml, json file or passed as a parameter when initializing the ORM.

All the queries that are used for the definition of conditions and for the execution of actions are based on the expression engine [3xpr](https://www.npmjs.com/package/3xpr)

## Structure

``` yaml
domain:
  enums:
  - name: string
    values:
      - name: string
        value: any
  entities:	
  - name: string
    abstract: boolean
    extends: string[]
    view: boolean
    mapping: string
    primaryKey: string[]
    uniqueKey: string[]
    properties:
      - name: string		
        mapping: string
        type: string | integer | decimal | boolean | dateTime | date | time
        length: number 
        required: boolean
        autoIncrement: boolean
        view: boolean
        key: string
        default: expression
        readExp: expression
        readValue: expression
        writeValue: expression      
    indexes:
      - name: string
        fields: string[]
    relations:    
      - name: string
        type: oneToMany | manyToOne | oneToOne  
        from: string
        entity: string
        to: string
        composite: boolean
    constraints:
      - message: string
        condition: expression
application:  
  start:
    - name: string
      condition: expression
      expression: expression
  end:
    - name: string
      condition: expression
      expression: expression
  errors:
    - name: string
      condition: expression
      expression: expression    
  listeners:
    - name: string
      on: [select|insert|bulkInsert|update|delete]
      condition: expression
      before:  expression
      after:  expression
      error:  expression                    
infrastructure:
  mappings:
    - name: string
      entities:
        - name: string
          mapping: string
          abstract: boolean
          filter: expression
          properties:
            - name: string
              mapping: string
              readMappingExp: expression
  sources:
    - name: string
      dialect: [MySQL|MariaDB|PostgreSQL|Oracle|SqlServer|MongoDB|SQLjs] 
      mapping: string
      connection: object | EnvironmentVariable
  stages:
    - name: string
      sources:
        - name: string
          condition: expression
  views:
    - name: string
      entities:
        - name: string
          exclude: boolean
          properties:
            - name: string
              exclude: boolean
              readExp: expression        
  paths:
    src: string
    state: string
    domain: string              								  		 
```

## Main Definition

| Property 				| Description					 								          |
|:----------------|:----------------------------------------------|
| domain		      | definition of the business model              |
| application		  | implementation of events and listeners        |
| infrastructure	| concrete implementation of the data model     |

## Domain

| Property 				|      Description					 								  |
|-----------------|---------------------------------------------|
| enums 	 				|  definitions of enum  of model						  |
| entities 				|  definitions of entity of model						  |

- In the enums section, enumerations are defined that can then be used as the data type of a property.
- In the entities section, the entities are defined with their properties, relationships and constraints

### Enum

They define an enumeration which can then be used as the data type of a property.

| Property 				|      Description					 								|	required	|
|-----------------|-------------------------------------------|:---------:|
| name 		 				|  name of enum 														| yes				|
| values 		 			|  values of enum														| yes				|

#### Enum Example

In this example, the **DeviceType** enum is defined, which is used in the **type** property of the **Devices** entity.

Example:

```yaml
domain:
  enums:
    - name: DeviceType
      values:
        - name: phone
          value: phone
        - name: computer
          value: computer
        - name: robot
          value: robot
  entities:
    ...
    - name: Devices
      extends: Products
      primaryKey: ["id"]
      uniqueKey: ["name"]
      properties:
        - name: id
          length: 32
          required: true
          default: 'concat(type,"-",switch(type){case"phone":imei;default:mac;})'
        - name: type
          length: 16
          required: true
          enum: DeviceType
        - name: name
          length: 32
          required: true  
    ...       
```

### Entity

The entity is defined with its properties, relationships and constraints

| Property 				|      Description					 								|	required	|	default		|
|-----------------|-------------------------------------------|:---------:|:---------:|
| name 		 				| name of entity  													| yes				|						|
| abstract 	 			| if the entity is abstract									| 					|						|
| extends 	 			| extension  																| 					|						|
| view 	 			    | if the entity is a view  									| 					|						|
| primaryKey 			| primary key 															| 					|						|
| uniqueKey 			| unique key 																| 					|						|
| properties 			| entity properties 												| yes				|						|
| indexes 				| indexes 																	| 					|						|
| relations 			| relations 																| 					|						|
| constraints 		| constraints 															| 					|						|

#### Abstract and extends in Entity

In this example the abstract entity **positions** is defined which extends the entity **Countries**

Example:

```yaml
domain:
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
          required: true
        - name: iso3
          length: 3
          required: true
```

#### Set Entity as view

This example defines the **Users** entity as a view. \

Since this entity is managed by an external system and only select queries are allowed.

Example:

```yaml
domain:
  entities:
    ...
    - name: Users
      view: true
      extends: Basics
      primaryKey: ["username"]
      uniqueKey: ["email"]
      properties:
        - name: username
          length: 32
          required: true
        - name: firstname
          required: true
        - name: lastname
    ...
```

#### Property

| Property 				|      Description					 								|	required	|	default		|
|-----------------|-------------------------------------------|:---------:|:---------:|
| name 		 				| name of property  												| yes				|						|
| type 		 				| type of property													| yes				|	 string		|
| length 		 			| length of property type										| 					|		80			|
| required 		 		| if the field is required									| 					|		false		|
| autoIncrement		| if the field is self-incrementing					| 					|		false		|
| view 		 		    | if the field is a view										| 					|						|
| default 		 		| expression default resolved on server	    | 					|						|
| readExp 		 		| read expression resolved in source		    | 					|						|
| readValue 		 	| read expression resolved on server	      | 					|						|
| writeValue 		 	| write expression resolved in server	      | 					|						|
| key 		 		    | key to filter or insert										| 					|						|

##### Set Property as view and readExp

A property set to view is a property that will be returned in read queries. \
The value of this property is defined in **readExp** using the expression language.

Example:

```yaml
domain:
  entities:
    ...
    - name: Users
      view: true
      extends: Basics
      primaryKey: ["username"]
      uniqueKey: ["email"]
      properties:
        - name: username
          length: 32
          required: true
        - name: firstname
          required: true
        - name: lastname
          required: true
        - name: fullmane
          view: true
          readExp: concat(lastname,", ",firstname)
    ...    
```

**ReadExp** can be used as a view, in this case the read expression will be applied at the time of reading. \
But no modification will be applied at the time of writing.

##### Default value in Property

When a record is inserted, the expression defined in **default** will be evaluated on the server. \
This expression will be executed by the expression engine [3xpr](https://www.npmjs.com/package/3xpr)

Example:

```yaml
domain:
  entities:
    - name: Groups
      extends: Basics
      primaryKey: ["id"]
      uniqueKey: ["name"]
      properties:
        - name: id
          length: 32
          default: lower(substring(replace(name," ","-"),0,32))
          required: true
        - name: name
          length: 32
          required: true
```

##### Read and write value in Property

Both **readValue** and **writeValue** are executed on the server.
When reading, **readValue** will be applied and in the writing actions, **writeValue** will be executed.
These expressions will be executed by the expression engine [3xpr](https://www.npmjs.com/package/3xpr)

Example:

```yaml
domain:
  entities:
    ...
    - name: Users
      view: true
      extends: Basics
      primaryKey: ["username"]
      uniqueKey: ["email"]
      properties:
        - name: username
          length: 32
          required: true
        - name: firstname
          required: true
        - name: lastname
          required: true
        - name: fullmane
          view: true
          readExp: concat(lastname,", ",firstname)
        - name: email
          required: true
          length: 255
          writeValue: encrypt(lower(email),"${USERS_SECRET_KEY}")
          readValue: decrypt(email,"${USERS_SECRET_KEY}")
    ...      
```

##### Key value in Property

The key defined in **keyValue** will be used as a filter in the read and update queries. \
When a record is inserted this key is assigned to the field. \

This behavior is useful when we want to define different entities on the same table or collection. \
Let's imagine we have a **Locations** table where Countries, States and Cities are stored. \
but we want to work with the entities separately.

Example:

```yaml
domain:
  entities:
    - name: Locations
      abstract: true
      primaryKey: ["type","code"]
      uniqueKey: ["type","name"]    
      properties:
        - name: code
          required: true
          length: 16
        - name: type
          required: true
          length: 16 
        - name: name
          required: true
    - name: Country
      extends: Locations
      properties:
        - name: type
          key: 'country'  
    - name: States
      extends: Locations
      properties:
        - name: type
          key: 'state'
    - name: Cities
      extends: Locations
      properties:
        - name: type
          key: 'city'
infrastructure:        
  mappings:
    - name: default
      entities:
        - name: Locations
          abstract: true
          mapping: TBL_LOCATIONS
          properties:
            - name: code
              mapping: CODE
            - name: type
              mapping: TYPE
            - name: name
              mapping: NAME
        - name: Country
          extends: Locations
        - name: States
          extends: Locations
        - name: Cities
          extends: Locations
```

#### Relation

| Property 				|      Description					 								|	required	|	default		|
|-----------------|-------------------------------------------|:---------:|:---------:|
| name 		 				| name of property  												| yes				|						|
| type 		 				| type of relationship  										| 					|	oneToMany	|
| from 		 				| relationship field 												| 					|						|
| entity 		 			| entity with which it relates  						| 					|						|
| to 		 					| field of the entity to which it relates  	| 					|						|
| composite 		 	| if the relationship is composite 					|						|	  false		|
| target 		 	    | Name of the relation in the related entity|						|	  		    |

##### Target relation

When defining **target** the corresponding relationship will be created in the target entity.
For example, if in the entity **DeviceStatuses** a relationship with **Devices** is created and in this relationship target = "statuses" is set. \
A relationship called **statuses** will be created in the entity **Devices** which will be manyToOne. \
Types of target relation according to the source relation:

| source				  |    target     |
|-----------------|---------------|
| oneToMany				|    manyToOne  |
| manyToOne				|    oneToMany  |
| oneToOne				|    oneToOne   |

Example:

```yaml
domain:
  entities:
    - name: DeviceStatuses
        extends: Basics
        primaryKey: ["id"]
        indexes:
          - name: time
            fields: ["time"]
        properties:
          - name: id
            type: integer
            required: true
            autoIncrement: true
          - name: deviceId
            length: 32
            required: true
          - name: time
            type: dateTime
        relations:
          - name: device
            from: deviceId
            entity: Devices
            to: id
            target: statuses
```

#### Constraint

| Property 				|      Description					 								|	required	|
|-----------------|-------------------------------------------|:---------:|
| message 		 		| message to display 												| yes				|
| condition 		 	| boolean expression to evaluate   					| yes				|

Constraints are validated on the server using expressions.
These expressions will be executed by the expression engine [3xpr](https://www.npmjs.com/package/3xpr)

All constraints are validated when inserting or updating a record. \
The ORM will create various constraints based on other definitions, for example:

- When you define a property as required, a constraint will be created that will validate that this property is not null.
- When defining that a property is of an **Enum** type, a constraint is created that validates that the value is within this enum.

It is also possible to add a constraint for which the **message** and the **condition** must be defined. \
The defined message will be sent if the condition is not met.

Example:

```yaml
domain:
  entities:
    - name: Users
      properties:
        ...
        - name: email
          required: true
          length: 255
          readExp: mask(email)
          writeValue: encrypt(lower(email),"${USERS_SECRET_KEY}")
          readValue: decrypt(email,"${USERS_SECRET_KEY}")
      constraints:
        - message: invalid email
          condition: test(email,"^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$")
    - name: Files
      properties:
        - name: id
          length: 255
          required: true
        - name: type
          length: 16
          required: true
          enum: FileType
        - name: deviceId
          length: 32
          required: true
        - name: startDate
          type: dateTime
          required: true
        - name: endDate
          type: dateTime
          required: true
      constraints:
        - message: endDate cannot be less than startDate
          condition: startDate<=endDate
```

## Application

| Property 	| Description					 								                      |
|:----------|:----------------------------------------------------------|
| start		  | commands to execute when starting the application         |
| end		    | commands to execute when the application is terminated    |
| errors		| commands to execute when an error occurs                  |
| listeners	| definition of the listeners and the action to be executed |

## Infrastructure

| Property 				|      Description					 								  |
|-----------------|---------------------------------------------|
| mappings			  |  definitions of mappings									  |
| sources 		    |  definitions of source								      |
| stages 				  |  definitions of stages 										  |
| views 				  |  definitions of views					              |
| paths 				  |  					                                  |

- In the mappings section, the mapping between the entities in the tables or collections in the databases is defined.
- In the sources section the databases are defined
- In the stages section different scenarios are defined in which the rules that associate an entity with a source are determined
- In the views section, different views are defined that can restrict or modify the results of the queries.
- In the paths section, the configuration of the routes where configuration files or execution results will be generated is established.

### Mapping

The mapping between entities in tables or collections in databases is defined.

| Property 				|      Description					 								|	required	|	default		|
|-----------------|-------------------------------------------|:---------:|:---------:|
| name 		 				| name of mapping  													| yes				|						|
| entities 				| list of entity mapping 				    				| yes				|						|

#### Entity Mapping

| Property 				|      Description					 								|	required	|	default		|
|-----------------|-------------------------------------------|:---------:|:---------:|
| name 		 				| name of entity  													| yes				|						|
| abstract 	 			| if the entity is abstract									| 					|						|
| extends 	 			| extension  																| 					|						|
| mapping 				| table name in the database 								| yes				|equal name |
| filter 	 			  | filter expression									        | 					|						|
| properties			| list of property mapping  								|   				|						|

##### Abstract and extends in Entity Mapping

Abstract mapping entities are useful for use in extensions. \
This example defines the abstract mapping entity **Locations** which extends concrete entities.

```yaml
...
infrastructure:
  mappings:
    - name: default
      entities:
        - name: Locations
          abstract: true
          mapping: TBL_LOCATIONS
          properties:
            - name: code
              mapping: CODE
            - name: type
              mapping: TYPE
            - name: name
              mapping: NAME
        - name: Country
          extends: Locations
        - name: States
          extends: Locations
        - name: Cities
          extends: Locations
...        
```

##### Filter in Entity Mapping

The filter defined in a Mapping entity is used to filter the records.
This example filters records from the **user_entity** table where users are from a certain **realmId**.

```yaml
...
infrastructure:
  mappings:
    - name: default
    - name: keycloak
      entities:
        - name: Users
          mapping: user_entity
          filter: realmId == "${REALM_ID}"
          properties:
            - name: username
              mapping: username
            - name: firstname
              mapping: first_name
            - name: lastname
              mapping: last_name
            - name: email
              mapping: email
            - name: created
              mapping: created_timestamp
              readMappingExp: millisecondToDate(created/1000)
            - name: realmId
              length: 255
              mapping: realm_id
...
```

#### Property Mapping

| Property 				|      Description					 								|	required	|	default		|
|-----------------|-------------------------------------------|:---------:|:---------:|
| name 		 				| name of property 													| yes				|						|
| mapping 				| table name in the database 								| yes				|equal name |
| readMappingExp	| read expression resolved in source				| 				  |           |

##### Read expression in Property Mapping

The result of the expression defined in **readMappingExp** using the expression language, will be returned in the read queries.

```yaml
infrastructure:
  mappings:
    - name: default
    - name: keycloak
      entities:
        - name: Users
          mapping: user_entity
          filter: realmId == "${REALM_ID}"
          properties:
            ...
            - name: created
              mapping: created_timestamp
              readMappingExp: millisecondToDate(created/1000)
            - name: realmId
              length: 255
              mapping: realm_id
...
```

### Source

Databases are defined with their connection

| Property 				|      Description					 								|	required	|	default		|
|-----------------|-------------------------------------------|:---------:|:---------:|
| name 		 				| name of source												    | yes				|						|
| mapping 				| name of reference to mapping 							|   				|	first 		|
| dialect 				| dialect of data source				    				| yes				|						|
| connection 			| string connection 				    				    | yes				|						|

#### Set connection in Source

Although it is possible to define the connection both using environment variables and directly in the configuration. \
This second option is not recommended due to security and different configurations that may exist by environment. \
The ability to define the connection by configuration should only be used for a temporary local test.

Using environment variable:

```yaml
...
infrastructure:
  sources:
    - name: test
      dialect: MySQL
      mapping: test
      connection: ${CNN_MYSQL}
...    
```

In configuration:

```yaml
...
infrastructure:
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
...      
```

### Stage

The stage is defined in which the rules that relate an entity to a source are determined

| Property 					|      Description					 								|	required	|	default		|
|-------------------|-------------------------------------------|:---------:|:---------:|
| name 		 					| name of stage															| yes				|						|
| sources   		    | list of sources rules			    				    | yes				|						|

#### Source Rule

| Property 					|      Description					 								|	required	|	default		|
|-------------------|-------------------------------------------|:---------:|:---------:|
| name 		 					| name of source												    | yes				|						|
| condition     		| boolean expression to evaluate    				|   				|	 true			|

#### Condition on Source Rule

En **condition** se define la regla para determinar en que source se aplicaran las consultas.
Las variables de contexto son las siguientes:

| Variable|      Description			|	value                                           |
|---------|-----------------------|-------------------------------------------------|
| entity  | query entity					| name of entity                                  |
| action  | query action	    		| select, insert, bulkInsert, update, delete, ddl |
| read    | it is a read action 	| boolean                                         |
| write   | it is a write action 	| boolean                                         |
| dml   	| it is a dml action		| boolean                                         |
| ddl   	| it is a ddl action		| boolean                                         |

The **conditions** are validated on the server using expressions. \
These expressions will be executed by the expression engine [3xpr](https://www.npmjs.com/package/3xpr) \
In the event that more than one condition is met, the source will be determined according to the order in which it was defined.

In the following example, all entities except **Users** will use the source **main**. \
And in the case of the entity **Users** it will use the source **keycloak**.

Example:

```yaml
...
infrastructure:
  stages:
    - name: default
      sources:
        - name: main
          condition: entity != "Users"
        - name: keycloak
          condition: entity == "Users"
```

### View

The view that can restrict or modify the results of the queries is defined.

| Property 				|      Description					 								|	required	|
|-----------------|-------------------------------------------|:---------:|
| name 		 		    | name that identifies a view  							| yes				|
| entities 		 	  | entity view list   					              |    				|

**Entities** not included in the view will not be subject to any restrictions.

In the following example, the **admin** view can access all entities.

Example:

```yaml
infrastructure:
  views:
    - name: default
      entities:
        - name: Devices
          properties:
            - name: apiKey
              readExp: '"***"'
        - name: Users
          properties:
            - name: created
              readExp: date(created)
            - name: email
              exclude: true
    - name: collector
      entities:
        - name: Users
          exclude: true
        - name: Groups
          exclude: true
        - name: GroupUsers
          exclude: true
    - name: admin
      entities: []
```

#### Entity View

| Property 				|      Description					 								|	required	|
|-----------------|-------------------------------------------|:---------:|
| name 		 		    | entity name 							                | yes				|
| exclude 		 	  | determines whether the entity is excluded |    				|
| properties	 	  | property view list   					            |    				|

#### Exclude in Entity View

**Entities** set to **exclude** will not be accessible when using this view.

```yaml
infrastructure:
  views:
    ...
    - name: collector
      entities:
        - name: Users
          exclude: true
        - name: Groups
          exclude: true
        - name: GroupUsers
          exclude: true
    ...
```

#### Property View

| Property 				|      Description					 								  |	required	|
|-----------------|---------------------------------------------|:---------:|
| name 		 		    | property name 							                | yes				|
| exclude 		 	  | determines whether the property is excluded |    				|
| readExp	 	      | read expression resolved in source   				|    				|

##### Exclude in Property View

**Properties** set to **exclude** will not be accessible when using this view.

```yaml
infrastructure:
  views:
    - name: default
      entities:
        ...
        - name: Users
          properties:
            - name: created
              readExp: date(created)
            - name: email
              exclude: true
      ...        
```

##### Read expression in Property View

The result of the expression defined in **readExp** using the expression language, will be returned in the read queries.

Example:

```yaml
infrastructure:
  views:
    - name: default
      entities:
        ...
        - name: Users
          properties:
            - name: created
              readExp: date(created)
            - name: email
              exclude: true
      ...        
```

### Paths

In this app section, the configuration of the routes where the configuration files or execution results will be generated is established.

| Property 				|      Description					 								|	required	|	default		|
|-----------------|-------------------------------------------|:---------:|:---------:|
| src 		 				|  set path of source code									|   				|		src			|
| state		 				|  define path of orm state 								|   				| orm_state	|
| model 		 			|  define path of	model to generate					|   				|		model		|

Example:

```yaml
app:
  src: src
  state: orm_state
  domain: domain
```
