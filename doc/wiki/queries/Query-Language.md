# Query Language

The query language is based on [javascript lambda expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).
These expressions can be written as javascript code by browsing the business model entities.

Expressions can also be sent as a string

λOrm translates the expression into the language corresponding to each database engine.

## Example:

```ts
Countries
	.filter(p=> p.region == region)	
	.map(p=> [p.name,p.subregion,p.latitude,p.longitude])
	.include(p => p.states.filter(p=> substr(p.name,1,1)=="F")
		  .map(p=> [p.name,p.latitude,p.longitude])
	)
	.page(1,3)
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
  AND s.s.COUNTRY_CODE IN (?) 
```

## Advantage

- Use of the same programming language.
- No need to learn a new language.
- Expressions easy to write and understand.
- Use of the intellisense offered by the IDE to write the expressions.
- Avoid syntax errors.
