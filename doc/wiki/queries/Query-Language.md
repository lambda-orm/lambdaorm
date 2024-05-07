# Query Language

The query language is based on [javascript lambda expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).
These Queries can be written as javascript code by browsing the business model entities.

Queries can also be sent as a string

λOrm translates the query into the language corresponding to each database engine.

## Queries type

### DQL

Las consultas DQL (Data Query Language) son consultas utilizadas para recuperar datos de una base de datos.

Las consultas DQL pueden ser bastante simples o pueden incluir cláusulas adicionales para filtrar, ordenar o agrupar datos, así como para realizar cálculos y operaciones en los datos recuperados. Esto permite a los desarrolladores obtener los datos exactos que necesitan de una base de datos según los requisitos de la aplicación.

**View:** [Select](https://github.com/lambda-orm/lambdaorm/wiki/Select)
[Join](https://github.com/lambda-orm/lambdaorm/wiki/Join)
[Grouping](https://github.com/lambda-orm/lambdaorm/wiki/Grouping)
[Include](https://github.com/lambda-orm/lambdaorm/wiki/Include)

### DML

DML (Data Manipulation Language) queries are used to manipulate data in a database. Mainly, they include the following operations:

- INSERT: Used to add new records to a table.
- UPDATE: Used to modify existing records in a table.
- DELETE: Used to delete records from a table.

**View:** [Insert](https://github.com/lambda-orm/lambdaorm/wiki/Insert)
[BulkInsert](https://github.com/lambda-orm/lambdaorm/wiki/BulkInsert)
[Update](https://github.com/lambda-orm/lambdaorm/wiki/Update)
[Delete](https://github.com/lambda-orm/lambdaorm/wiki/Delete)

### DDL

DDL (Data Definition Language) are used to define, modify and delete database structures and related objects. Mainly, they include the following operations:

- CREATE: Used to create new objects in the database, such as tables, indexes, views and other objects.
- ALTER: Used to modify the structure of existing objects in the database, such as adding, modifying or deleting columns from a table, changing the data type of a column, renaming an object, among others.
- DROP: Used to delete database objects, such as tables, indexes, views and other objects.

These queries are created and executed when you use the schema synchronization commands.

**View:** [Push](https://github.com/lambda-orm/lambdaorm/wiki/SchemaSynchronization-Push)
[Pull](https://github.com/lambda-orm/lambdaorm/wiki/SchemaSynchronization-Pull)
[Fetch](https://github.com/lambda-orm/lambdaorm/wiki/SchemaSynchronization-Fetch)
[Introspect](https://github.com/lambda-orm/lambdaorm/wiki/SchemaSynchronization-Introspect)
[Incorporate](https://github.com/lambda-orm/lambdaorm/wiki/SchemaSynchronization-Incorporate)

## Example:

```Typescript
// Selecting countries filtering by region and including related states starting with 'F', with pagination
Countries
	.filter(p=> p.region == region)	
	.map(p=> [p.name,p.subregion,p.latitude,p.longitude]) // Selecting country fields
	.include(p => p.states.filter(p=> substr(p.name,1,1)=="F") // Including states starting with 'F'
		  .map(p=> [p.name,p.latitude,p.longitude])
	)
	.page(1,3) // Pagination for countries, 3 records per page
```

where the SQL equivalent of the query is:

```sql
-- Selecting countries based on region and limiting to 3 records
SELECT c.name AS `name`, c.subregion AS `subregion`, c.latitude AS `latitude`, c.longitude AS `longitude`, c.iso3 AS `__iso3` 
FROM Countries c  
WHERE c.region = ? 
LIMIT 0,3

-- Selecting states starting with 'F' belonging to the specified countries
SELECT s.NAME AS "name", s.LATITUDE AS "latitude", s.LONGITUDE AS "longitude", s.COUNTRY_CODE AS "__parentId" 
FROM TBL_STATES s  
WHERE SUBSTR(s.NAME,1,1) = 'F'
  AND s.s.COUNTRY_CODE IN (?) 
```

## Advantage of Query Language

- Use of the same programming language.
- No need to learn a new language.
- queries easy to write and understand.
- Use of the intellisense offered by the IDE to write the expressions.
- Avoid syntax errors.
