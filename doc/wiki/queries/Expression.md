# Lambda expressions

The [lambda expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) are written based on the programming language itself, referring to the business model, completely abstracting from the database language and its structure.

**Lambda:**

```Typescript
// Select states where the first character of the name is 'A'
States.filter(p => upper(substring(p.name, 0, 1)) == "A")
// Map each selected state to an object with country and state properties
.map(p => { country: p.country.name, state: p.name })
// Sort the results first by country in ascending order and then by state in descending order
.sort(p => [p.country, desc(p.state)])
// Paginate the results to show the first page of 10 records
.page(1, 10)
```

**SQL Result:**

``` sql
-- Select the country name and state name
SELECT c.NAME AS country, s.NAME AS "state" 
-- From the states table with alias 's'
FROM TBL_STATES s 
-- Inner join with the countries table with alias 'c' on the country ID
INNER JOIN TBL_COUNTRIES c ON c.ID = o.CountryID 
-- Filter states where the first character of the name is 'A'
WHERE UPPER(SUBSTR(s.NAME, 0, 1)) = 'A'  
-- Order the results first by country name in ascending order and then by state name in descending order
ORDER BY country, "state" DESC
-- Apply pagination to skip the first row and fetch the next 10 rows
OFFSET 1 ROWS FETCH NEXT 10 ROWS ONLY
```

## Advantage:

 - Use of the same programming language.
 - It is not necessary to learn a new language.
 - Easy to write and understand expressions.
 - Use of the intellisense offered by the IDE to write the expressions.
 - Avoid syntax errors.

## Query Expressions:

|Method    		|Description                                   										| SQL Equivalent								|																																								|
|:-----------|:-----------------------------------------------------------------|:------------------------------|:-----------------------------------------------------------------------------:|
|filter			 | To filter the records.																						| WHERE 												|[examples](https://github.com/lambda-orm/lambdaorm/wiki/Select)		|
|having 		 | To filter on groupings.																					|	HAVING 												|[examples](https://github.com/lambda-orm/lambdaorm/wiki/Select)		|
|map				 | To specify the fields to return. 																| SELECT 												|[examples](https://github.com/lambda-orm/lambdaorm/wiki/Select)		|
|distinct		 | to specify the fields to return by sending duplicate records.		|																|[examples](https://github.com/lambda-orm/lambdaorm/wiki/Select)		|
|first			 | returns the first record																					| SELECT + ORDER BY + LIMIT 		|[examples](https://github.com/lambda-orm/lambdaorm/wiki/Select)		|
|last 		 	 | returns the last record																					|	SELECT + ORDER BY DESC + LIMIT|[examples](https://github.com/lambda-orm/lambdaorm/wiki/Select)		|
|sort				 | To specify the order in which the records are returned.					| ORDER BY 											|[examples](https://github.com/lambda-orm/lambdaorm/wiki/Select)		|
|page				 | To paginate.																											| LIMIT  (MySQL)								|[examples](https://github.com/lambda-orm/lambdaorm/wiki/Select)		|
|include		 | To get records of related entities																|																|[examples](https://github.com/lambda-orm/lambdaorm/wiki/Include)	|
|insert			 | To insert records																								| INSERT												|[examples](https://github.com/lambda-orm/lambdaorm/wiki/Update)		|
|update			 | To update records always including a filter											| UPDATE with WHERE							|[examples](https://github.com/lambda-orm/lambdaorm/wiki/Update)		|
|updateAll	 | to be able to update all the records of an entity								| UPDATE without WHERE					|[examples](https://github.com/lambda-orm/lambdaorm/wiki/Update)		|
|delete			 | To delete records always including a filter											| DELETE with WHERE							|[examples](https://github.com/lambda-orm/lambdaorm/wiki/Delete)		|
|deleteAll	 | To be able to delete all records of an entity										| DELETE without WHERE					|[examples](https://github.com/lambda-orm/lambdaorm/wiki/Delete)		|
|bulkInsert	 | to insert records in bulk																				| INSERT												|[examples](https://github.com/lambda-orm/lambdaorm/wiki/BulkInsert)|

- There are no methods for the INNER JOIN clause since it is deduced when navigating through the relations of a property.
- There are no methods for the GROUP BY clause since this is deduced when grouping methods are used.

### Operators

The operators used are the same as those of javascript.

|Category    	|Operators                				|																																							|
|:------------|:-------------------------------:|:---------------------------------------------------------------------------:|
|Arithmetic 	| -, +, *, /, **, //, % 					| [more info](https://github.com/lambda-orm/lambdaorm/wiki/Arithmectic) |
|Bitwise 			| ~,&,^,<<,>> 										| [more info](https://github.com/lambda-orm/lambdaorm/wiki/Bitwise)			|
|Comparison 	| ==, ===, !=, !==, >, <, >=, <= 	| [more info](https://github.com/lambda-orm/lambdaorm/wiki/Comparison)	|
|Logical 			| !, && 													| [more info](https://github.com/lambda-orm/lambdaorm/wiki/Logical) 		|
|Array 				| [] 															| [more info](https://github.com/lambda-orm/lambdaorm/wiki/Array) 			|

### Functions

|Category    	|functions                																						|																																												|
|:------------|:--------------------------------------------------------------------|--------------------------------------------------------------------------------------:|
|Numeric			|abs, ceil, cos, exp, ln, log, remainder, round, sign, sin, tan, trunc...				|[more info](https://github.com/lambda-orm/lambdaorm/wiki/Numeric)			|
|String				|chr, lower, lpad, ltrim, replace, rpad, rtrim, substr, trim, upper, concat...	|[more info](https://github.com/lambda-orm/lambdaorm/wiki/String)				|
|Datetime			|curtime, today, now, time, date, dateTime, year, month, day, weekday, hours...	|[more info](https://github.com/lambda-orm/lambdaorm/wiki/Datetime)			|
|Convert			|toString, toJson, toNumber																											|[more info](https://github.com/lambda-orm/lambdaorm/wiki/String)				|
|Nullable			|nvl, nvl2, isNull, isNotNull																										|[more info](https://github.com/lambda-orm/lambdaorm/wiki/Nullable)			|
|General			|as, distinct																																		|[more info](https://github.com/lambda-orm/lambdaorm/wiki/General)			|
|Sort					|asc, desc																																			|[more info](https://github.com/lambda-orm/lambdaorm/wiki/Sort)					|
|Condition		|between, includes																															|[more info](https://github.com/lambda-orm/lambdaorm/wiki/Condition)		|
|Group				|avg, count, first, last, max, min, sum																					|[more info](https://github.com/lambda-orm/lambdaorm/wiki/Group)				|
|Metadata			|user, source																																		|[more info](https://github.com/lambda-orm/lambdaorm/wiki/Metadata)			|
