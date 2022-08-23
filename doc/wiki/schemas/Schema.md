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
  extends: string[]
  abstract: boolean
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

### Enum

They define an enumeration which can then be used as the data type of a property.

| Property 				|      Description					 								|	required	|	default		|
|-----------------|-------------------------------------------|:---------:|:---------:|
| name 		 				|  name of enum 														| yes				|
| values 		 			|  values of enum														| yes				|

### Entity

The entity is defined with its properties, relationships and constraints

| Property 				|      Description					 								|	required	|	default		|
|-----------------|-------------------------------------------|:---------:|:---------:|
| name 		 				| name of entity  													| yes				|						|
| extends 	 			| extension  																| 					|						|
| abstract 	 			| if the entity is abstract									| 					|						|
| view 	 			    | if the entity is a view  									| 					|						|
| primaryKey 			| primary key 															| 					|						|
| uniqueKey 			| unique key 																| 					|						|
| properties 			| entity properties 												| yes				|						|
| indexes 				| indexes 																	| 					|						|
| relations 			| relations 																| 					|						|
| constraints 		| constraints 															| 					|						|

#### Property

| Property 				|      Description					 								|	required	|	default		|
|-----------------|-------------------------------------------|:---------:|:---------:|
| name 		 				| name of property  												| yes				|						|
| type 		 				| type of property													| yes				|	 string		|
| length 		 			| length of property type										| 					|		80			|
| nullable 		 		| if the field is nullable									| 					|		true		|
| autoIncrement		| if the field is self-incrementing					| 					|		false		|
| view 		 		    | if the field is a view										| 					|						|
| key 		 		    | key to filter or insert										| 					|						|
| default 		 		| expression default resolved on server	    | 					|						|
| readExp 		 		| read expression resolved in source		    | 					|						|
| readValue 		 	| read expression resolved on server	      | 					|						|
| writeValue 		 	| write expression resolved in server	      | 					|						|

#### Relation

| Property 				|      Description					 								|	required	|	default		|
|-----------------|-------------------------------------------|:---------:|:---------:|
| name 		 				| name of property  												| yes				|						|
| type 		 				| type of relationship  										| 					|	oneToMany	|
| from 		 				| relationship field 												| 					|						|
| entity 		 			| entity with which it relates  						| 					|						|
| to 		 					| field of the entity to which it relates  	| 					|						|
| composite 		 	| if the relationship is composite 					|						|	  false		|

#### Constraint

| Property 				|      Description					 								|	required	|
|-----------------|-------------------------------------------|:---------:|
| message 		 		| message to display 												| yes				|
| condition 		 	| boolean expression to evaluate   					| yes				|

### View

The view that can restrict or modify the results of the queries is defined.

| Property 				|      Description					 								|	required	|
|-----------------|-------------------------------------------|:---------:|
| name 		 		    | name that identifies a view  							| yes				|
| entities 		 	  | entity view list   					              |    				|

#### Entity View

| Property 				|      Description					 								|	required	|
|-----------------|-------------------------------------------|:---------:|
| name 		 		    | entity name 							                | yes				|
| exclude 		 	  | determines whether the entity is excluded |    				|
| properties	 	  | property view list   					            |    				|

#### Property View

| Property 				|      Description					 								  |	required	|
|-----------------|---------------------------------------------|:---------:|
| name 		 		    | property name 							                | yes				|
| exclude 		 	  | determines whether the property is excluded |    				|
| readExp	 	      | read expression resolved in source   				|    				|

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
| mapping 				| table name in the database 								| yes				|equal name |
| abstract 	 			| if the entity is abstract									| 					|						|
| filter 	 			  | filter expression									        | 					|						|
| properties			| list of property mapping  								|   				|						|

#### Property Mapping

| Property 				|      Description					 								|	required	|	default		|
|-----------------|-------------------------------------------|:---------:|:---------:|
| name 		 				| name of property 													| yes				|						|
| mapping 				| table name in the database 								| yes				|equal name |
| readMappingExp	| read expression resolved in source				| 				  |           |

### Source

Databases are defined with their connection

| Property 				|      Description					 								|	required	|	default		|
|-----------------|-------------------------------------------|:---------:|:---------:|
| name 		 				| name of source												| yes				|						|
| mapping 				| name of reference to mapping 							|   				|	first 		|
| dialect 				| dialect of data source				    				| yes				|						|
| connection 			| string connection 				    				    | yes				|						|

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
