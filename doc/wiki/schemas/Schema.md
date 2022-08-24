# Schema

It is the link between the business model and data persistence.

The classes that represent the business model are completely clean, without any attribute that binds them to persistence.

All the configuration necessary to resolve the relationship between the business model and persistence is done in the schema, which is 100% configuration.

This configuration can be done in a yaml, json file or passed as a parameter when initializing the ORM.

Certain configurations use expressions based on the expression engine [js-expressions](https://www.npmjs.com/package/js-expressions)

## Schema Structure

``` yaml
app:
  src: string
  data: string
  model: string
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
      type: string | integer | decimal | boolean | datetime | date | time
      length: number 
      nullable: boolean
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
views:
  - name: string
    entities:
      - name: string
        exclude: boolean
        properties:
          - name: string
            exclude: boolean
            readExp: expression        
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
    dialect: MariaDb | MongoDB | MySQL | Oracle | PostgreSQL | SQLjs | SqlServer
    mapping: string
    connection: object | EnvironmentVariable
stages:
  - name: string
    sources:
      - name: string
        condition: expression									  		 
```

## Schema Definition

| Property 				|      Description					 								|	required	|	default		|
|-----------------|-------------------------------------------|:---------:|:---------:|
| app 	 				  |  app configuration            						|						|	create 		|
| enums 	 				|  definitions of enum  of model						|						|						|
| entities 				|  definitions of entity of model						| yes				|						|
| views 				  |  definitions of views					            | 				  |	create One|
| mappings			  |  definitions of mappings									|      			|	create One|
| sources 		    |  definitions of source								    | yes				|						|
| stages 				  |  definitions of stages 										|      			|	create One|

- In the app section, the configuration of the routes where configuration files or execution results will be generated is established.
- In the enums section, enumerations are defined that can then be used as the data type of a property.
- In the entities section, the entities are defined with their properties, relationships and constraints
- In the views section, different views are defined that can restrict or modify the results of the queries.
- In the mappings section, the mapping between the entities in the tables or collections in the databases is defined.
- In the sources section the databases are defined
- In the stages section different scenarios are defined in which the rules that associate an entity with a source are determined

### App

In this app section, the configuration of the routes where the configuration files or execution results will be generated is established.

| Property 				|      Description					 								|	required	|	default		|
|-----------------|-------------------------------------------|:---------:|:---------:|
| src 		 				|  set path of source code									|   				|		src			|
| data 		 				|  define path of data											|   				|		data		|
| model 		 			|  define path of	model to generate					|   				|		model		|

#### App Example

Example:

```yaml
app:
  src: src
  data: data
  model: model
```

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
        nullable: false
        default: 'concat(type,"-",switch(type){case"phone":imei;default:mac;})'
      - name: type
        length: 16
        nullable: false
        enum: DeviceType
      - name: name
        length: 32
        nullable: false  
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
```

#### Set Entity as view

This example defines the **Users** entity as a view. \

Since this entity is managed by an external system and only select queries are allowed.

Example:

```yaml
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
        nullable: false
      - name: firstname
        nullable: false
      - name: lastname
  ...
```

### Property

| Property 				|      Description					 								|	required	|	default		|
|-----------------|-------------------------------------------|:---------:|:---------:|
| name 		 				| name of property  												| yes				|						|
| type 		 				| type of property													| yes				|	 string		|
| length 		 			| length of property type										| 					|		80			|
| nullable 		 		| if the field is nullable									| 					|		true		|
| autoIncrement		| if the field is self-incrementing					| 					|		false		|
| view 		 		    | if the field is a view										| 					|						|
| default 		 		| expression default resolved on server	    | 					|						|
| readExp 		 		| read expression resolved in source		    | 					|						|
| readValue 		 	| read expression resolved on server	      | 					|						|
| writeValue 		 	| write expression resolved in server	      | 					|						|
| key 		 		    | key to filter or insert										| 					|						|

#### Set Property as view and readExp

A property set to view is a property that will be returned in read queries. \
The value of this property is defined in **readExp** using the expression language.

Example:

```yaml
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
        nullable: false
      - name: firstname
        nullable: false
      - name: lastname
        nullable: false
      - name: fullmane
        view: true
        readExp: concat(lastname,", ",firstname)
  ...    
```

**ReadExp** can be used as a view, in this case the read expression will be applied at the time of reading. \
But no modification will be applied at the time of writing.

#### Default value in Property

When a record is inserted, the expression defined in **default** will be evaluated on the server. \
This expression will be executed by the expression engine [js-expressions](https://www.npmjs.com/package/js-expressions)

Example:

```yaml
entities:
  - name: Groups
    extends: Basics
    primaryKey: ["id"]
    uniqueKey: ["name"]
    properties:
      - name: id
        length: 32
        default: lower(substring(replace(name," ","-"),0,32))
        nullable: false
      - name: name
        length: 32
        nullable: false
```

#### Read and write value in Property

Both **readValue** and **writeValue** are executed on the server.
When reading, **readValue** will be applied and in the writing actions, **writeValue** will be executed.
These expressions will be executed by the expression engine [js-expressions](https://www.npmjs.com/package/js-expressions)

Example:

```yaml
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
        nullable: false
      - name: firstname
        nullable: false
      - name: lastname
        nullable: false
      - name: fullmane
        view: true
        readExp: concat(lastname,", ",firstname)
      - name: email
        nullable: false
        length: 255
        writeValue: encrypt(lower(email),"${USERS_SECRET_KEY}")
        readValue: decrypt(email,"${USERS_SECRET_KEY}")
  ...      
```

#### Key value in Property

The key defined in **keyValue** will be used as a filter in the read and update queries. \
When a record is inserted this key is assigned to the field. \

This behavior is useful when we want to define different entities on the same table or collection. \
Let's imagine we have a **Locations** table where Countries, States and Cities are stored. \
but we want to work with the entities separately.

Example:

```yaml
entities:
  - name: Locations
    abstract: true
    primaryKey: ["type","code"]
    uniqueKey: ["type","name"]    
    properties:
      - name: code
        nullable: false
        length: 16
      - name: type
        nullable: false
        length: 16 
      - name: name
        nullable: false
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

### Relation

| Property 				|      Description					 								|	required	|	default		|
|-----------------|-------------------------------------------|:---------:|:---------:|
| name 		 				| name of property  												| yes				|						|
| type 		 				| type of relationship  										| 					|	oneToMany	|
| from 		 				| relationship field 												| 					|						|
| entity 		 			| entity with which it relates  						| 					|						|
| to 		 					| field of the entity to which it relates  	| 					|						|
| composite 		 	| if the relationship is composite 					|						|	  false		|
| target 		 	    | Name of the relation in the related entity|						|	  		    |

#### Target relation

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
- name: DeviceStatuses
    extends: Basics
    primaryKey: ["id"]
    indexes:
      - name: time
        fields: ["time"]
    properties:
      - name: id
        type: integer
        nullable: false
        autoIncrement: true
      - name: deviceId
        length: 32
        nullable: false
      - name: time
        type: datetime
    relations:
      - name: device
        from: deviceId
        entity: Devices
        to: id
        target: statuses
```

#### Set relation as composite

When a relationship is set to **composite** it will be treated as part of a document. \
In the case of Non-Relational databases, the records of the relationship will be stored in the same collection. \

In the case of relational databases, although the data is stored in different tables, when executing import and export it will be treated as an object that contains the records of the relationship. \

The way to define that an entity is composite is by creating the name of the entity by putting the name of the parent in front. \
Example: **Devices.Components**

```yaml
...
entities:
  ...
  - name: Devices
    primaryKey: ["id"]
    uniqueKey: ["name"]
    properties:
      - name: id
        length: 32
        nullable: false
        default: 'concat(type,"-",switch(type){case"phone":imei;default:mac;})'
      - name: type
        length: 16
        nullable: false
        enum: DeviceType
      - name: name
        length: 32
        nullable: false
      ...
  - name: Devices.Components
    extends: Products
    primaryKey: ["id"]
    uniqueKey: ["deviceId", "name"]
    properties:
      - name: id
        length: 50
        nullable: false
        default: concat(deviceId,"-",lower(substring(replace(name," ","-"),0,16)))
      - name: deviceId
        length: 32
        nullable: false
      - name: name
        length: 16
        nullable: false
      ...
    relations:
      - name: device
        from: deviceId
        entity: Devices
        to: id
        target: components
    ...    
```

### Constraint

| Property 				|      Description					 								|	required	|
|-----------------|-------------------------------------------|:---------:|
| message 		 		| message to display 												| yes				|
| condition 		 	| boolean expression to evaluate   					| yes				|

Constraints are validated on the server using expressions.
These expressions will be executed by the expression engine [js-expressions](https://www.npmjs.com/package/js-expressions)

All constraints are validated when inserting or updating a record. \
The ORM will create various constraints based on other definitions, for example:

- When you define a property as not nullable, a constraint will be created that will validate that this property is not null.
- When defining that a property is of an **Enum** type, a constraint is created that validates that the value is within this enum.

It is also possible to add a constraint for which the **message** and the **condition** must be defined. \
The defined message will be sent if the condition is not met.

Example:

```yaml
entities:
  - name: Users
    properties:
      ...
      - name: email
        nullable: false
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
        nullable: false
      - name: type
        length: 16
        nullable: false
        enum: FileType
      - name: deviceId
        length: 32
        nullable: false
      - name: startDate
        type: datetime
        nullable: false
      - name: endDate
        type: datetime
        nullable: false
    constraints:
      - message: endDate cannot be less than startDate
        condition: startDate<=endDate
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

### Entity View

| Property 				|      Description					 								|	required	|
|-----------------|-------------------------------------------|:---------:|
| name 		 		    | entity name 							                | yes				|
| exclude 		 	  | determines whether the entity is excluded |    				|
| properties	 	  | property view list   					            |    				|

#### Exclude in Entity View

**Entities** set to **exclude** will not be accessible when using this view.

```yaml
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

### Property View

| Property 				|      Description					 								  |	required	|
|-----------------|---------------------------------------------|:---------:|
| name 		 		    | property name 							                | yes				|
| exclude 		 	  | determines whether the property is excluded |    				|
| readExp	 	      | read expression resolved in source   				|    				|

#### Exclude in Property View

**Properties** set to **exclude** will not be accessible when using this view.

```yaml
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

#### Read expression in Property View

The result of the expression defined in **readExp** using the expression language, will be returned in the read queries.

Example:

```yaml
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

### Mapping

The mapping between entities in tables or collections in databases is defined.

| Property 				|      Description					 								|	required	|	default		|
|-----------------|-------------------------------------------|:---------:|:---------:|
| name 		 				| name of mapping  													| yes				|						|
| entities 				| list of entity mapping 				    				| yes				|						|

### Entity Mapping

| Property 				|      Description					 								|	required	|	default		|
|-----------------|-------------------------------------------|:---------:|:---------:|
| name 		 				| name of entity  													| yes				|						|
| abstract 	 			| if the entity is abstract									| 					|						|
| extends 	 			| extension  																| 					|						|
| mapping 				| table name in the database 								| yes				|equal name |
| filter 	 			  | filter expression									        | 					|						|
| properties			| list of property mapping  								|   				|						|

#### Abstract and extends in Entity Mapping

Abstract mapping entities are useful for use in extensions. \
This example defines the abstract mapping entity **Locations** which extends concrete entities.

```yaml
...
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

#### Filter in Entity Mapping

The filter defined in a Mapping entity is used to filter the records.
This example filters records from the **user_entity** table where users are from a certain **realmId**.

```yaml
...
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

### Property Mapping

| Property 				|      Description					 								|	required	|	default		|
|-----------------|-------------------------------------------|:---------:|:---------:|
| name 		 				| name of property 													| yes				|						|
| mapping 				| table name in the database 								| yes				|equal name |
| readMappingExp	| read expression resolved in source				| 				  |           |

#### Read expression in Property Mapping

The result of the expression defined in **readMappingExp** using the expression language, will be returned in the read queries.

```yaml
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

### Source Rule

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
These expressions will be executed by the expression engine [js-expressions](https://www.npmjs.com/package/js-expressions) \
In the event that more than one condition is met, the source will be determined according to the order in which it was defined.

In the following example, all entities except **Users** will use the source **main**. \
And in the case of the entity **Users** it will use the source **keycloak**.

Example:

```yaml
...
stages:
  - name: default
    sources:
      - name: main
        condition: entity != "Users"
      - name: keycloak
        condition: entity == "Users"
```

## Use

### Simple configuration example

configuration using yaml

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
mappings:
  - name: mapping1
    entities:
      - name: Countries
        mapping: TBL_COUNTRIES
        properties:
          - name: iso3
            mapping: ISO3
          - name: name
            mapping: NAME
sources:
  - name: source1
    dialect: MySQL
    mapping: mapping2
    connection: ${CNN_MYSQL}
```

configuration using json

```json
{
	"entities": [
		{
			"name": "Countries",
			"primaryKey": [ "iso3"  ],
			"uniqueKey": [ "name" ],
			"properties": [
        { "name": "iso3", "nullable": false, "type": "string", "length": 3 },
				{ "name": "name", "nullable": false, "type": "string" }				
			]
		}
	],
	"mappings":[
		{
			"name":"mapping1",
		  "entities":[
				{
					"name": "Countries",
					"mapping": "TBL_COUNTRIES",
					"properties": [
						{ "name": "iso3", "mapping": "ISO_3" },
            { "name": "name","mapping": "NAME" },
					]
				}
			]
		}
	],
  	"sources": [
    {
      "name": "source1",
			"mapping": "mapping1",
      "dialect": "MySQL",
      "connection": "${CNN_MYSQL}"
    }
  ]
}
```

### Generate the model

Once the schema is configured or modified, the model can be created or modified by executing the "update" command of [CLI](https://www.npmjs.com/package/lambdaorm-cli)

```sh
lambdaorm update
```

This command generates the model file with all the entities as a repository file for each entity

model.ts:

``` ts
export class Country {
		iso3?: string
		name?: string		
}
export interface QryCountry {
	iso3: string
	name: number

}
export let Countries : Queryable<QryCountry>		
```

repositoryCountry.ts:

```ts
import { Repository, IOrm } from 'lambdaorm'
import { Country, QryCountry } from './model'
export class CountryRepository extends Repository<Country, QryCountry> {
	constructor (stage?: string, Orm?:IOrm) {
		super('Countries', stage, Orm)
	}
	// Add your code here
}
```

### Set schema

When the orm.init() method is invoked it will execute the ORM initialization according to the schema.

The following options are available to define the settings.

- Invoke the orm.init() method without the first argument and write this configuration to a file called lambdaorm.json or lambdaorm.yaml in the root of the project.
according to the lambdaorm extension you will know how to read it.

- Invoke the orm.init() method passing as an argument the path where the configuration file is located.
This route must include the .yaml or .json extension since that way we will know how to read it.

- Invoke the orm.init() method passing the configuration as a json object as argument

Example passing the configuration file path:

```ts
import { orm } from 'lambdaorm'
(async () => {
	await orm.init('/home/my/app1/lambaORM.yaml')
	try {		
		const countries = await orm.execute(`Countries.map(p=>{name:p.name,code:p.alpha3})
                                                  .sort(p=> desc(p.name))
                                                  .page(1,10)`)
		console.log(countries)	
	} catch (error) {
		console.log(error)
	} finally {
		await orm.end()
	}
})()
```
