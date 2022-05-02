
## Structure of Schema

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
      autoIncrement: boolean
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
mappings:
  - name: string
    entities:
      - name: string
        abstract: boolean
        properties:
          - name: string
            mapping: string
stages:
  - name: string
    dataSources:
      - name: string
        condition: expression									  		 
```

### Definition

Schema:

| Property 				|      Description					 								|	required	|	default		|
|-----------------|-------------------------------------------|:---------:|:---------:|
| app 	 				  |  app configuration            						|						|	create 		|
| enums 	 				|  definitions of enum  of model						|						|						|
| entities 				|  definitions of entity of model						| yes				|						|
| dataSources 		|  definitions of dataSource								| yes				|						|
| mappins				  |  definitions of mappings									|      			|	create One|
| stages 				  |  definitions of stages 										|      			|	create One|

### Model

App:
| Property 				|      Description					 								|	required	|	default		|
|-----------------|-------------------------------------------|:---------:|:---------:|
| src 		 				|  set path of source code									|   				|		src			|
| data 		 				|  define path of data											|   				|		data		|
| model 		 			|  define path of	model to generate					|   				|		model		|

Enum:
| Property 				|      Description					 								|	required	|	default		|
|-----------------|-------------------------------------------|:---------:|:---------:|
| name 		 				|  name of enum 														| yes				|
| values 		 			|  values of enum														| yes				|

Entity:

| Property 				|      Description					 								|	required	|	default		|
|-----------------|-------------------------------------------|:---------:|:---------:|
| name 		 				| name of entity  													| yes				|						|
| _extends 	 			| extension  																| 					|						|
| primaryKey 			| primary key 															| 					|						|
| uniqueKey 			| unique key 																| 					|						|
| properties 			| entity properties 												| yes				|						|
| indexes 				| indexes 																	| 					|						|
| relations 			| relations 																| 					|						|

Property:

| Property 				|      Description					 								|	required	|	default		|
|-----------------|-------------------------------------------|:---------:|:---------:|
| name 		 				| name of property  												| yes				|						|
| type 		 				| type of property													| yes				|	 string		|
| length 		 			| length of property type										| 					|		80			|
| nullable 		 		| if the field is nullable									| 					|		true		|
| autoIncrement		| if the field is self-incrementing					| 					|		false		|
| default 		 		| field default value												| 					|						|

Relation:

| Property 				|      Description					 								|	required	|	default		|
|-----------------|-------------------------------------------|:---------:|:---------:|
| name 		 				| name of property  												| yes				|						|
| type 		 				| type of relationship  										| 					|	oneToMany	|
| from 		 				| relationship field 												| 					|						|
| entity 		 			| entity with which it relates  						| 					|						|
| to 		 					| field of the entity to which it relates  	| 					|						|
| composite 		 	| if the relationship is composite 					|						|	  false		|

### Data Sources

Data Source:

| Property 				|      Description					 								|	required	|	default		|
|-----------------|-------------------------------------------|:---------:|:---------:|
| name 		 				| name of datasource												| yes				|						|
| mapping 				| name of reference to mapping 							|   				|	first 		|
| dialect 				| dialect of data source				    				| yes				|						|
| connection 			| string connection 				    				    | yes				|						|

### Mappings

Mapping:

| Property 				|      Description					 								|	required	|	default		|
|-----------------|-------------------------------------------|:---------:|:---------:|
| name 		 				| name of mapping  													| yes				|						|
| entities 				| list of entity mapping 				    				| yes				|						|

Entity Mapping:

| Property 				|      Description					 								|	required	|	default		|
|-----------------|-------------------------------------------|:---------:|:---------:|
| name 		 				| name of entity  													| yes				|						|
| mapping 				| table name in the database 								| yes				|equal name |
| properties			| list of property mapping  								|   				|						|

Property Mapping:

| Property 				|      Description					 								|	required	|	default		|
|-----------------|-------------------------------------------|:---------:|:---------:|
| name 		 				| name of property 													| yes				|						|
| mapping 				| table name in the database 								| yes				|equal name |

### Stages

Stage:

| Property 					|      Description					 								|	required	|	default		|
|-------------------|-------------------------------------------|:---------:|:---------:|
| name 		 					| name of stage															| yes				|						|
| dataSources   		| list of dataSources rules			    				| yes				|						|

DataSource Rule:

| Property 					|      Description					 								|	required	|	default		|
|-------------------|-------------------------------------------|:---------:|:---------:|
| name 		 					| name of dataSource												| yes				|						|
| condition     		| boolean expression to evaluate    				|   				|	 true			|
