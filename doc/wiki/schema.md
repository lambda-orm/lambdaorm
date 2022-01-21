# Schema Configuration

It is the nexus between the business model and the persistence of the data.

The classes that represent the business model are completely clean, without any attributes that link them to persistence.

All the configuration necessary to resolve the relationship between the business model and persistence is done in the schema, which is configuration.

This configuration can be done in a yaml, json file or passed as a parameter when initializing the ORM.

## Config

When the orm.init () method is invoked, the initialization of the orm will be executed from the configuration.

This configuration contains the main sections, paths, databases and schemas.

- In the app section, the general configuration of the application is set, such as the main paths, default database, etc.
- In the databases section the databases to which we are going to connect and which is the corresponding schema are defined
- In the section of diagrams, the entities, their relationships and their mapping with the database are defined.

Example:

```json
{
  "app:": { "src": "src", "data": "data" ,"models":"models","defaulStage": "stage1" },
	"enums": [],
	"entities": [
		{
			"name": "Countries",
			"primaryKey": [ "id"  ],
			"uniqueKey": [ "name" ],
			"properties": [
				{ "name": "id", "type": "integer","nullable": false },
				{ "name": "name", "nullable": false, "type": "string" },
				{ "name": "alpha2", "nullable": false,"type": "string","length": 2 },
				{ "name": "alpha3", "nullable": false, "type": "string", "length": 3 }
			]
		}
	],		
	"dataSources": [
    {
      "name": "dataSource1",
			"mapping": "mapping1",
      "dialect": "mysql",
      "connection": "$CNN_MYSQL"
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
						{ "name": "id", "mapping": "ID" },
						{ "name": "name","mapping": "NAME" },
						{ "name": "alpha2","mapping": "ALPHA_2" },
						{ "name": "alpha3", "mapping": "ALPHA_3" }
					]
				}
			]
		}
	],
	"stages":[
		{"name":"stage1", "defaultDataSource":"dataSource1" }
	]
}
```

There are the following options to define the settings.

- Invoke the orm.init () method without the first argument and write this configuration in a file called lambdaorm.json or lambdaorm.yaml in the root of the project.
according to the lambdaorm extension you will know how to read it.

- Invoke the orm.init () method, pass as an argument the path where the configuration file is located.
This path must include the extension .yaml or .json since this way we will know how to read it.

- Invoke the orm.init () method passing the configuration as a json object as an argument

Example passing the path of the configuration file:

```ts
import { orm } from 'lambdaorm'
(async () => {
	await orm.init('/home/my/db/book.yaml')
	try {
		const result = await orm.expression('Loan.map(p=>{user:p.reader.name,book:p.book.title,date:p.date})').execute('mydb')
		console.log(result)	
	} catch (error) {
		console.log(error)
	} finally {
		await orm.end()
	}
})()
```

## Define

``` yaml
name: string
enums:
 - name: string
   values:
    - name: string
      value: any
entities:	
 - name: string
   _extends: string[]
   mapping: string
   primaryKey: string[]
   uniqueKey: string[]
   properties:
    - name: string		
      mapping: string
      type: string | integer | decimal | boolean | datetime | date | time
      length: number 
      nullable: boolean
      autoincrement: boolean
      default: any
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
```

**Schema:**

| Property 				|      Description					 								|	required	|
|-----------------|-------------------------------------------|:---------:|
| app 	 				  |  app configuration            						|						|
| enums 	 				|  definitions of enum  of model						|						|
| entities 				|  definitions of entity of model						| yes				|
| dataSources 		|  definitions of dataSource								| yes				|
| mappins				  |  definitions of mappings									|      			|
| stages 				  |  definitions of stages 										|      			|

### Model

**Enum:**
| Property 				|      Description					 								|	required	|
|-----------------|-------------------------------------------|:---------:|
| name 		 				|  name of enum 														| yes				|
| values 		 			|  values of enum														| yes				|

**Entity:**

| Property 				|      Description					 								|	required	|
|-----------------|-------------------------------------------|:---------:|
| name 		 				| name of entity  													| yes				|
| _extends 	 			| extension  																| 					|
| primaryKey 			| primary key 															| 					|
| uniqueKey 			| unique key 																| 					|
| properties 			| entity properties 												| yes				|
| indexes 				| indexes 																	| 					|
| relations 			| relations 																| 					|

**Property:**

| Property 				|      Description					 								|	required	|
|-----------------|-------------------------------------------|:---------:|
| name 		 				| name of property  												| yes				|
| type 		 				| type of property													| yes				|
| length 		 			| length of property type										| 					|
| nullable 		 		| if the field is nullable									| 					|
| autoincrement		| if the field is self-incrementing					| 					|
| default 		 		| field default value												| 					|

**Relation:**

| Property 				|      Description					 								|	required	|
|-----------------|-------------------------------------------|:---------:|
| name 		 				| name of property  												| yes				|
| type 		 				| type of relationship  										| 					|
| from 		 				| relationship field 												| 					|
| entity 		 			| entity with which it relates  						| 					|
| to 		 					| field of the entity to which it relates  	| 					|
| composite 		 	| if the relationship is composite 					|						|

### Data Sources

**Data Source:**

| Property 				|      Description					 								|	required	|
|-----------------|-------------------------------------------|:---------:|
| name 		 				| name of datasource												| yes				|
| mapping 				| name of reference to mapping 							| yes				|
| dialect 				| dialect of data source				    				| yes				|
| connection 			| string connection 				    				    | yes				|

### Mappings

**Mapping:**

| Property 				|      Description					 								|	required	|
|-----------------|-------------------------------------------|:---------:|
| name 		 				| name of mapping  													| yes				|
| entities 				| list of entity mapping 				    				| yes				|

**Entity Mapping:**

| Property 				|      Description					 								|	required	|
|-----------------|-------------------------------------------|:---------:|
| name 		 				| name of entity  													| yes				|
| mapping 				| table name in the database 								| yes				|
| properties			| list of property mapping  								|   				|

**Property Mapping:**

| Property 				|      Description					 								|	required	|
|-----------------|-------------------------------------------|:---------:|
| name 		 				| name of property 													| yes				|
| mapping 				| table name in the database 								| yes				|

### Stages

**Stage:**

| Property 					|      Description					 								|	required	|
|-------------------|-------------------------------------------|:---------:|
| name 		 					| name of stage															| yes				|
| dataSources   		| list of dataSources rules			    				| yes				|

**DataSource Rule:**

| Property 					|      Description					 								|	required	|
|-------------------|-------------------------------------------|:---------:|
| name 		 					| name of dataSource												| yes				|
| condition     		| boolean expression to evaluate    				|   				|

## Model generated from the schema

``` ts
declare global {
	interface Category {
		id: number
		name: string
		description: string
	}
	interface Customer {
		id: string
		name: string
		contact: string
		phone: string
		address: string
		city: string
		region: string
		postalCode: string
		country: string
		orders: ManyToOne<Order>
	}
	interface Employee {
		id: number
		lastName: string
		firstName: string
		title: string
		titleOfCourtesy: string
		birthDate: Date
		hireDate: Date
		phone: string
		reportsToId: number
		address: string
		city: string
		region: string
		postalCode: string
		country: string
		reportsTo: Employee & OneToMany<Employee>
	}
 ...	
```
