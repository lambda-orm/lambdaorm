|Operator    		|Description        |
|---------------|-------------------|
|==  ===			 	|equal							|
|!=  !== <> 		|notEqual						|
|>							|greaterThan				|
|<							|lessThan						|
|>=							|greaterThanOrEqual	|
|<=							|lessThanOrEqual		|

|Function 		|Description                                   																|
|-------------|-----------------------------------------------------------------------------|
|between			|Specifies how to retrieve values from an expression within a specific range	|
|in/includes	|Is used to reduce the use of multiple OR conditions													|

## Examples

| Example         																																									| Result 						|
|---------------------------------------------------------------------------------------------------|-------------------|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> p.name)																							|[{"name":"Brazil"}]|
|Countries.filter(p=> p.iso3 === "BRA").map(p=> p.name)																							|[{"name":"Brazil"}]|
|Countries.filter(p=> p.latitude < -9 && p.latitude > -11 && p.longitude == -55 ).first(p=> p.name)	|[{"name":"Brazil"}]|
|Countries.filter(p=> between(p.latitude,-11,-9) && p.longitude == -55 ).first(p=> p.name)					|[{"name":"Brazil"}]|
|Countries.filter(p=> in(p.iso3,["BRA","ARG"])).map(p=> p.name)																			|[{"name":"Argentina"},{"name":"Brazil"}]|

## Sentences

**Lambda:**

Query to select the name from the Countries entity where the iso3 is equal to "BRA".

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> p.name)
```

**SQL Result:**

```sql
SELECT c.name AS name 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to select the name from the Countries entity where the iso3 is equal to "BRA".

```js
Countries.filter(p=> p.iso3 === "BRA").map(p=> p.name)
```

**SQL Result:**

```sql
SELECT c.name AS name 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to select the name from the Countries entity where the latitude is less than -9 and greater than -11 and the longitude is equal to -55.

```js
Countries.filter(p=> p.latitude < -9 && p.latitude > -11 && p.longitude == -55 ).first(p=> p.name)
```

**SQL Result:**

```sql
SELECT c.name AS name 
FROM Countries c  
WHERE (c.latitude < -9 AND (c.latitude > -11 AND c.longitude = -55))
ORDER BY c.name asc  
LIMIT 0,1 
```

**Lambda:**

Query to select the name from the Countries entity where the latitude is between -11 and -9 and the longitude is equal to -55.

```js
Countries.filter(p=> between(p.latitude,-11,-9) && p.longitude == -55 ).first(p=> p.name)
```

**SQL Result:**

```sql
SELECT c.name AS name 
FROM Countries c  
WHERE (c.latitude BETWEEN -11 AND -9 AND c.longitude = -55) 
ORDER BY c.name asc 
LIMIT 0,1 
```s

**Lambda:**

Query to select the name from the Countries entity where the iso3 is equal to "BRA" or "ARG".

```js
Countries.filter(p=> in(p.iso3,["BRA","ARG"])).map(p=> p.name)
```

**SQL Result:**

```sql
SELECT c.name AS name 
FROM Countries c 
WHERE  c.iso3 IN ('BRA', 'ARG') 
```

## Definition

### Operator ==

- description: equal
- return: boolean
- params:
	- a: T
	- b: T

### Operator ===

- description: equal
- return: boolean
- params:
	- a: T
	- b: T

### Operator !=

- description: notEqual
- return: boolean
- params:
	- a: T
	- b: T

### Operator !==

- description: notEqual
- return: boolean
- params:
	- a: T
	- b: T

### Operator <>

- description: notEqual
- return: boolean
- params:
	- a: T
	- b: T

### Operator >

- description: greaterThan
- return: boolean
- params:
	- a: T
	- b: T

### Operator <

- description: lessThan
- return: boolean
- params:
	- a: T
	- b: T

### Operator >=

- description: greaterThanOrEqual
- return: boolean
- params:
	- a: T
	- b: T

### Operator <=

- description: lessThanOrEqual
- return: boolean
- params:
	- a: T
	- b: T

### between

- description: Specifies how to retrieve values from an expression within a specific range.
- deterministic: true
- return: boolean
- params:
	- value: T
	- from: T
	- to: T

### includes

- description: Determines if an array includes a certain element
- deterministic: true
- return: boolean
- params:
	- value: T
	- list: T[]

### in

- description: Determines if an array includes a certain element
- deterministic: true
- return: boolean
- params:
	- value: T
	- list: T[]
