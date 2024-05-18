|Operator   |Description  |
|-----------|-------------|
|!					|not					|
|&&					|and					|
|\|\|				|or						|

## Examples

| Example           																																																	| Result 				|
|---------------------------------------------------------------------------------------------------------------------|---------------|
|Countries.filter(p=> p.subregion == "South America" &&  p.longitude < -30 ).map(p=> {result:count(1)})								|[{"result":15}]|
|Countries.filter(p=> p.subregion == "South America" || p.subregion == "Central America" ).map(p=> {result:count(1)})	|[{"result":23}]|
|Countries.filter(p=> p.region == "Americas" &&  p.subregion != "Northern America" ).map(p=> {result:count(1)})				|[{"result":51}]|

## Sentences

**Lambda:**

Query to get the count of countries in the Americas region

```js
Countries.filter(p=> p.subregion == "South America" &&  p.longitude < -30 ).map(p=> {result:count(1)})
```

**SQL Result:**

```sql
SELECT COUNT(1) AS result 
FROM Countries c  
WHERE (c.subregion = 'South America' AND c.longitude < -30) 
```

**Lambda:**

Query to get the count of countries in each region

```js
Countries.filter(p=> p.subregion == "South America" || p.subregion == "Central America" ).map(p=> {result:count(1)})
```

**SQL Result:**

```sql
SELECT COUNT(1) AS result 
FROM Countries c  
WHERE (c.subregion = 'South America' OR c.subregion = 'Central America') 
```

**Lambda:**

Query to get the maximum latitude of countries in each region

```js
Countries.filter(p=> p.region == "Americas" &&  p.subregion != "Northern America" ).map(p=> {result:count(1)})
```

**SQL Result:**

```sql
SELECT COUNT(1) AS result 
FROM Countries c  
WHERE (c.region = 'Americas' AND c.subregion <> 'Northern America') 
```

## Definition

### Operator !

- description: not
- return: boolean
- params:
	- value: boolean

### Operator &&

- description: and
- return: boolean
- params:
	- a: boolean
	- b: boolean

### Operator ||

- description: or
- return: boolean
- params:
	- a: boolean
	- b: boolean
