|Function   |Description                                   						|
|-----------|---------------------------------------------------------|
|nvl				|Allows you to replace null values with a default value.	|
|nvl2				|It lets you substitutes a value when a null value is encountered as well as when a non-null value is encountered.|
|isNull			|Evaluate if it is null																		|
|isNotNull	|Evaluate if it is not null																|

## Examples

| Example                             																														| Result 								|
|-------------------------------------------------------------------------------------------------|-----------------------|
|States.filter(p=> isNull(p.latitude)).map(p=> count(1))																					|[{"count":68}]					|
|States.filter(p=> isNotNull(p.latitude)).map(p=> count(1))																				|[{"count":4813}]				|
|States.filter(p=> nvl(p.latitude,-100)== -100).map(p=> count(1))																	|[{"count":68}]					|
|Countries.filter(p=> p.iso3 == "CIV" ).map(p=> {native: nvl(p.native,"???")})										|[{"native":"???"}]			|
|Countries.filter(p=> p.iso3 == "CIV" ).map(p=> {native: nvl2(p.native,"is not null","is null")})	|[{"native":"is null"}]	|

## Sentences

**Lambda:**

Query to get the count of countries in the Americas region where the latitude is null

```js
States.filter(p=> isNull(p.latitude)).map(p=> count(1))
```

**SQL Result:**

```sql
SELECT COUNT(1) 
FROM TBL_STATES s  
WHERE (s.LATITUDE IS NULL) 
```

**Lambda:**

Query to get the count of countries in the Americas region where the latitude is not null

```js
States.filter(p=> isNotNull(p.latitude)).map(p=> count(1))
```

**SQL Result:**

```sql
SELECT COUNT(1) 
FROM TBL_STATES s  
WHERE (s.LATITUDE IS NOT NULL) 
```

**Lambda:**

Query to get the count of countries in the Americas region where the latitude is null or -100

```js
States.filter(p=> nvl(p.latitude,-100)== -100).map(p=> count(1))
```

**SQL Result:**

```sql
SELECT COUNT(1) 
FROM TBL_STATES s  
WHERE (CASE WHEN s.LATITUDE IS NOT NULL THEN s.LATITUDE ELSE -100 END) = -100 
```

**Lambda:**

Query to get the native name or "???" if it is null the country with iso3 code "CIV"

```js
Countries.filter(p=> p.iso3 == "CIV" ).map(p=> {native: nvl(p.native,"???")})
```

**SQL Result:**

```sql
SELECT IFNULL(c.native,'???') AS native 
FROM Countries c  
WHERE c.iso3 = 'CIV' 
```

**Lambda:**

Query to get the native name or "is null" if it is null the country with iso3 code "CIV"

```js
Countries.filter(p=> p.iso3 == "CIV" ).map(p=> {native: nvl2(p.native,"is not null","is null")})
```

**SQL Result:**

```sql
SELECT (CASE WHEN c.native IS NOT NULL THEN 'is not null' ELSE 'is null' END) AS native 
FROM Countries c  
WHERE c.iso3 = 'CIV' 
```

## Definition

### nvl

- description: Allows you to replace null values with a default value.
- deterministic: true
- return: T
- params:
	- value: T
	- _default: T

### nvl2

- description: Extends the functionality found in the NVL function. It lets you substitutes a value when a null value is encountered as well as when a non-null value is encountered.
- deterministic: true
- return: T
- params:
	- value: T
	- a: T
	- b: T

### isNull

- description: Evaluate if it is null
- deterministic: true
- return: boolean
- params:
	- value: any

### isNotNull

- description: Evaluate if it is not null
- deterministic: true
- return: boolean
- params:
	- value: any
