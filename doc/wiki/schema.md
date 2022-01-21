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
  "model": {
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
			]
		},
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

Model

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
| name 		 				|  name of schema  													| yes				|
| enums 	 				|  definitions of enum   										|						|
| entities 				|  definitions of entity 										| yes				|

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
| mapping 				| table name in the database 								| yes				|
| primaryKey 			| primary key 															| 					|
| uniqueKey 			| unique key 																| 					|
| properties 			| entity properties 												| yes				|
| indexes 				| indexes 																	| 					|
| relations 			| relations 																| 					|

**Property:**

| Property 				|      Description					 								|	required	|
|-----------------|-------------------------------------------|:---------:|
| name 		 				| name of property  												| yes				|
| mapping 				| field name in the database								| yes				|
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

## Example

northwind:

``` yaml
name: northwind
enums:
entities:
  - name: Categories
    mapping: Categories
    primaryKey: ['id']
    uniqueKey: ['name']
    properties:
      - name: id
        mapping: CategoryID
        type: integer
        nullable: false
        autoincrement: true
      - name: name
        mapping: CategoryName
        nullable: false
        type: string
        length: 80
      - name: description
        mapping: Description
        type: string
        length: 1000
  - name: Customers
    _extends: [abstract.address-0_0_2]
    mapping: Customers
    primaryKey: ['id']
    indexes:
      - name: name
        fields: ['name']
    properties:
      - name: id
        mapping: CustomerID
        type: string
        length: 5
        nullable: false
      - name: name
        mapping: CompanyName
        nullable: false
        type: string
        length: 80
      - name: contact 
        mapping: ContactName
        type: string
        length: 80
      - name: phone
        mapping: ContactTitle
        type: string
        length: 80
    relations:  
      - name: orders
        type: manyToOne
        composite: true 
        from: id
        entity: Orders
        to: customerId
  - name: Employees
    _extends: [abstract.address-0_0_2]       
    mapping: Employees
    primaryKey: ['id']
    uniqueKey: ['lastName','firstName']   
    properties:
      - name: id 
        mapping: EmployeeID
        type: integer
        nullable: false
        autoincrement: true
      - name: lastName 
        mapping: LastName
        nullable: false
        type: string
        length: 80
      - name: firstName
        mapping: FirstName
        nullable: false
        type: string
        length: 80
      - name: title
        mapping: Title
        type: string
        length: 80
      - name: titleOfCourtesy
        mapping: TitleOfCourtesy
        type: string
        length: 80
      - name: birthDate
        mapping: BirthDate
        type: datetime
      - name: hireDate
        mapping: HireDate
        type: datetime
      - name: phone
        mapping:  HomePhone
        type: string
        length: 80
      - name: reportsToId 
        mapping:  ReportsTo
        type: integer
    relations:
      - name: reportsTo
        type: oneToMany
        from: reportsToId
        entity: Employees
        to: id 
	...				  
```

abstract.address-0_0_2:

```yaml
properties:
  - name: address 
    mapping: Address
    type: string
    length: 80
  - name: city 
    mapping: City
    type: string
    length: 80
  - name: region 
    mapping: Region
    type: string
    length: 80
  - name: postalCode 
    mapping: PostalCode
    type: string
    length: 20
  - name: country 
    mapping: Country
    type: string
    length: 80
indexes:
  - name: postalCode
    fields: ['postalCode']
  - name: region
    fields: ['region','country']
  - name: city
    fields: ['city'] 
```

### Model generated from the schema

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
