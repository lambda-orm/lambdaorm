# Lambda ORM

**IMPORTANT: the library is in an Alpha version!!!**

LambdaORM is an intermediary between the business model and the persistence of the data.
Completely decoupling the business model from the data layer.

## Features

- Schema Configuration
	- Decoupling the business model from phisical model
	- Configuration in json or yml formats
	- Definition of mappins to map the business model with the physical model
	- Extends entities
	- Environment variables
	- define index, unique key, constraints
- Query Language
	- Simple query language based on javascript lambda expressions.
	- Can write the expression as javascript code or as a string
	- Crud clauses
	- Implicit joins and group by
	- Eager loading using the Include() method.
	- Metadata from query expression
- CLI
	- Init and update commands
	- Run expressions
	- Sync and drop schema
	- Imports and exports
- Repositories
- Transactions
- Using multiple database connections

## Schema Configuration

Es el nexo entre el modelo de negocio y la persistencia de los datos.

Las clases que representan el modelo de negocio están completamente limpias, sin ningún atributo que las vincule a la persistencia.

Toda la configuración necesaria para resolver la relación entre el modelo de negocio y la persistencia se realiza en el esquema, que es configuración.

Esta configuración se puede hacer en un archivo yaml, json o pasar como parámetro al inicializar el ORM.

### Config

Cuando se invoca el método orm.init() se ejecutará la inicialización del orm desde la configuración.

Esta configuración contiene las siguientes secciones.

- En el sección app se establece la configuración general de la aplicación, como las rutas src, data y model .
- En la sección de enums se definen los enums que forman parte del modelo de negocio
- En la sección de entities se definen las entidades que forman parte del modelo de negocio
- En la sección de data sources se definen los diferentes data sources
- En la sección de mapping se definen los mapeos entre el modelo de negocio con el modelo en los data sources
- En la sección de stages se definen los stages donde se definen las reglas que relacionan el modelo de negocio con los diferentes data sources.

### Example:

Este esquema tiene dos entidades que están en diferentes bases de datos.

![schema](https://raw.githubusercontent.com/FlavioLionelRita/lambdaorm/HEAD/images/schema5.svg)

El atributo de la base de datos se usa en la entidad para poder especificar que una entidad está en una base de datos diferente a la predeterminada del esquema.

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

## Query Language

El lenguaje de consulta se basa en [javascript lambda expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).
Estas expresiones se pueden escribir como código javascript navegando por las entidades del modelo de negocio.

Las expresiones también se pueden enviar como una cadena

LambdaOrm traduce la expresión al idioma correspondiente a cada motor de base de datos.

Example:

Javascript lambda expression:

```ts
Countries.filter(p=> p.region == region).page(1,3).map(p=> [p.name,p.subregion,p.latitude,p.longitude]).include(p => p.states.filter(p=> substr(p.name,1,1)=="F").map(p=> [p.name,p.latitude,p.longitude]))
```

Javascript lambda expression as string

```ts
'Countries.filter(p=> p.region == region).page(1,3).map(p=> [p.name,p.subregion,p.latitude,p.longitude]).include(p => p.states.filter(p=> substr(p.name,1,1)=="F").map(p=> [p.name,p.latitude,p.longitude]))'
```

where the SQL equivalent of the expression is:

```sql
SELECT c.name AS `name`, c.subregion AS `subregion`, c.latitude AS `latitude`, c.longitude AS `longitude`, c.iso3 AS `__iso3` 
FROM Countries c  
WHERE c.region = ? 
LIMIT 0,3

SELECT s.NAME AS "name", s.LATITUDE AS "latitude", s.LONGITUDE AS "longitude", s.COUNTRY_CODE AS "__parentId" 
FROM TBL_STATES s  
WHERE SUBSTR(s.NAME,1,1) = 'F'
```

### Advantage:

- Uso del mismo lenguaje de programación.
- No es necesario aprender un nuevo idioma.
- Expresiones fáciles de escribir y comprender.
- Uso del intellisense que ofrece el IDE para escribir las expresiones.
- Evitar errores de sintaxis.

## Usage

Para trabajar con el orm podemos hacerlo usando el objeto singleton llamado "orm" o usando repositorios.

### Objeto __orm__

Este objeto orm actúa como fachada y desde este accedemos a todas las funcionalidades.

#### __execute method__:

Este método recibe la expresión como una función lambda de javascript o un string.

#### Use Javascript lambda expression:

La ventaja de escribir la expression como una funcion lambda de javascript es que de esta forma contaremos con la ayuda de intellisense y nos aseguraremos de que la expresión no tenga errores de sintaxis.

```ts
import { orm } from 'lambdaorm'
(async () => {
	await orm.init()	
	const query = (region:string) => Countries.filter(p=> p.region == region)
																						.page(1,3)
																						.map(p=> [p.name,p.subregion,p.latitude,p.longitude])
																						.include(p => p.states.filter(p=> substr(p.name,1,1)=="F")
																																	.map(p=> [p.name,p.latitude,p.longitude])
																								    )
	const result = await orm.execute(query, { region: 'Asia' })
	console.log(JSON.stringify(result, null, 2))
	await orm.end()
})()
```

#### Use Javascript lambda expression as string:

La ventaja de escribir la expression en un string es que podemos recibirla desde fuera, ejemplo UI, comando CLI, almacenadas , etc.

```ts
import { orm } from 'lambdaorm'
(async () => {
	await orm.init()	
	const query = 'Countries.filter(p=> p.region == region).page(1,3).map(p=> [p.name,p.subregion,p.latitude,p.longitude]).include(p => p.states.filter(p=> substr(p.name,1,1)=="F").map(p=> [p.name,p.latitude,p.longitude]))'
																								    )
	const result = await orm.execute(query, { region: 'Asia' })
	console.log(JSON.stringify(result, null, 2))
	await orm.end()
})()
```

#### Result:

```json
[
  {
    "name": "Afghanistan",
    "subregion": "Southern Asia",
    "latitude": "33.00000000",
    "longitude": "65.00000000",
    "states": [ { "name": "Farah", "latitude": "32.49532800", "longitude": "62.26266270" },
      					{ "name": "Faryab", "latitude": "36.07956130","longitude": "64.90595500" }]
  },
  {
    "name": "United Arab Emirates",
    "subregion": "Western Asia",
    "latitude": "24.00000000",
    "longitude": "54.00000000",
    "states": [ { "name": "Fujairah","latitude": "25.12880990","longitude": "56.32648490" }]
  },
  {
    "name": "Armenia",
    "subregion": "Western Asia",
    "latitude": "40.00000000",
    "longitude": "45.00000000",
    "states": []
  }
]
```

### Repositories

Los repositorios están asociados a una entidad y tienen varios métodos para interactuar con ella.

Example:

```ts
import { orm } from 'lambdaorm'
import { CountryRespository } from './models/country'

(async () => {
	await orm.init()
	const countryRespository = new CountryRespository('mydb')
	const result = await countryRespository.query().filter(p=> p.region == region)
																				  .page(1,3)
																					.map(p=> [p.name,p.subregion,p.latitude,p.longitude])
																					.include(p => p.states.filter(p=> substr(p.name,1,1)=="F")
																					      .map(p=> [p.name,p.latitude,p.longitude])
																					).execute({ region: 'Asia' })	
	console.log(JSON.stringify(result, null, 2))
	await orm.end()
})()
```

[More info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Repository)

### Includes:

LambdaORM incluye el método de inclusión para cargar entidades relacionadas, tanto para relaciones OnetoMany, manyToOne y oneToOne.

También podemos aplicar filtros o traernos algunos campos de las entidades relacionadas.

Para cada inclusión, se ejecuta una declaración que trae todos los registros necesarios, luego los objetos con relaciones se ensamblan en la memoria. De esta forma se evitan múltiples ejecuciones mejorando considerablemente el rendimiento.

Las inclusiones se pueden usar en selecciones, insertar, actualizar, eliminar y bulckinsert.

Example:

``` ts
import { orm } from 'lambdaorm'
(async () => {
	await orm.init()
	const query = (id:number) => Orders
		.filter(p => p.id === id)
		.include(p => [p.customer.map(p => ({ name: p.name, address: concat(p.address, ', ', p.city, ' (', p.postalCode, ')  ', p.country) })),
			p.details.include(p => p.product
				.include(p => p.category.map(p => p.name))
				.map(p => p.name))
				.map(p => [p.quantity, p.unitPrice])])
		.map(p => p.orderDate)

	const result = await orm.execute(query)
	console.log(JSON.stringify(result, null, 2))
	await orm.end()
})()
```

The previous sentence will bring us the following result:

```json
[[
{
	"orderDate": "1996-07-03T22:00:00.000Z",
	"customer": { "name": "Vins et alcools Chevalier", "address": "59 rue de l'Abbaye, Reims (51100)  France"
	},
	"details": [
		{
			"quantity": 12, "unitPrice": 14,
			"product": { "name": "Queso Cabrales", 	"category": { "name": "Dairy Products"}
			}
		},
		{
			"quantity": 10, "unitPrice": 9.8,
			"product": { "name": "Singaporean Hokkien Fried Mee",	"category": { "name": "Grains/Cereals" 	}}
		},
		{
			"quantity": 5, "unitPrice": 34.8,
			"product": { "name": "Mozzarella di Giovanni", "category": { "name": "Dairy Products"	}	}
		}
	]
}
]]
```

[More info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Include)

### Transactions

Para trabajar con transacciones utilice el método orm.transaction.

Este método recibe el nombre de la base de datos como primer argumento y como segundo es una función de devolución de llamada que no pasa un objeto Transacción, en el ejemplo lo llamamos tr.

Usamos el método lambda o expresión para ejecutar la oración (tal como la encontramos escrita).

Cuando lleguemos al final y devolvamos la devolución de llamada, el orm ejecutará internamente el COMMIT, si hay una excepción, internamente se ejecutará el ROLLBACK

Example

``` ts
import { orm } from 'lambdaorm'

(async () => {

const order={customerId:"VINET",employeeId:5,orderDate:"1996-07-03T22:00:00.000Z",requiredDate:"1996-07-31T22:00:00.000Z",shippedDate:"1996-07-15T22:00:00.000Z",shipViaId:3,freight:32.38,name:"Vins et alcools Chevalier",address:"59 rue de l-Abbaye",city:"Reims",region:null,postalCode:"51100",country:"France",details:[{productId:11,unitPrice:14,quantity:12,discount:!1},{productId:42,unitPrice:9.8,quantity:10,discount:!1},{productId:72,unitPrice:34.8,quantity:5,discount:!1}]};

try {
orm.transaction({}, 'stage', async (tr) => {
	// create order
	const orderId = await tr.execute(() => Orders.insert().include(p => p.details), order)
	// get order
	const result = await tr.execute((id:number) => Orders.filter(p => p.id === id).include(p => p.details), { id: orderId })
	const order2 = result[0]
	// updated order
	order2.address = 'changed 59 rue de l-Abbaye'
	order2.details[0].discount = true
	order2.details[1].unitPrice = 10
	order2.details[2].quantity = 7
	const updateCount = await tr.execute(() => Orders.update().include(p => p.details), order2)
	console.log(updateCount)
	// get order
	const order3 = await tr.execute((id:number) => Orders.filter(p => p.id === id).include(p => p.details), { id: orderId })
	console.log(JSON.stringify(order3))
	// delete
	const deleteCount = await tr.execute(() => Orders.delete().include(p => p.details), order3[0])
	console.log(deleteCount)
	// get order
	const order4 = await tr.execute((id:number) => Orders.filter(p => p.id === id).include(p => p.details), { id: orderId })
	console.log(JSON.stringify(order4))
})
} catch (error) {
	console.log(error)
}
})()
```

[More info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Transaction)

### Metadata

Lambda ORM has the following methods to extract metadata information from expressions.

To execute these methods it is not necessary to connect to the database.

|method    		|Description          															|Path                         				|
|:------------|:--------------------------------------------------|:------------------------------------|
|	parameters	| returns the list of parameters in the expression	| orm.parameters(query)								|
|	model				| returns the model of the result in an execution		| orm.model(query)										|
|	metadata		| returns the metadata of the expression						| orm.metadata(query)									|
|	sentence		| returns the sentence in the specified dialect			| orm.sentence(query)									|

- [more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/metadata)

## Installation

```sh
npm install lambdaorm
```

## CLI

Install the package globally to use the CLI commands to help you create and maintain projects

```sh
npm install lambdaorm-cli -g
```

- [CLI package](https://www.npmjs.com/package/lambdaorm-cli)

## Documentation

- [Wiki](https://github.com/FlavioLionelRita/lambdaorm/wiki)
- [Source Code](https://github.com/FlavioLionelRita/lambdaorm/blob/main/doc/source/README.md)

## Labs

### Lab northwind

In this laboratory we will see:

Creating the northwind sample database tables and loading it with sample data. This database presents several non-standard cases such as: - Name of tables and fields with spaces - Tables with composite primary keys - Tables with autonumeric ids and others with ids strings

Since this is the database that was used for many examples and unit tests, you can test the example queries that are in the documentation. We will also see some example queries to execute from CLI

[source code](https://github.com/FlavioLionelRita/lambdaorm-lab-northwind)

### Lab 01

In this laboratory we will see:

- How to use the Lambdaorm-cli commands
- how to create a project that uses lambda ORM
- How to define a schema
- how to run a bulckInsert from a file
- how to export data from a schema
- how to import data into a schema from a previously generated export file

[source code](https://github.com/FlavioLionelRita/lambdaorm-lab01)

### Lab 02

In this laboratory we will see:

- how to create a project that uses lambda ORM
- How to define a schema
- how to extend entities using abstract entities
- How to insert data from a file.
- how to run queries from cli to perform different types of queries

[source code](https://github.com/FlavioLionelRita/lambdaorm-lab02)

### Lab 03

In this laboratory we will see:

- How to insert data from a file to more than one table.
- how to extend entities using abstract entities
- how to extend a schema to create a new one, overwriting the mapping
- how to work with two schemas and databases that share the same model
- how to use imported data from one database to import it into another

[source code](https://github.com/FlavioLionelRita/lambdaorm-lab03)

### Lab 04

In this laboratory we will see:

- How to insert data from a file to more than one table.
- how to extend entities using abstract entities
- how to define a schema that works with entities in different databases
- how to run a bulkinsert on entities in different databases
- how to export and import entity data in different databases

[source code](https://github.com/FlavioLionelRita/lambdaorm-lab04)
