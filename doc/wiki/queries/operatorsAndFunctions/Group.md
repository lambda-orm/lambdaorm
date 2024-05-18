|Function   |Description                                   										|
|-----------|-----------------------------------------------------------------|
|avg				|Calculates the average of the specified columns in a set of rows	|
|count			|Calculating the number of rows in a set.													|
|first			|Returns the first value of the selected column										|
|last				|Returns the last value of the selected column.										|
|max				|Calculating the maximum.																					|
|min				|Calculating the minimum.																					|
|sum				|Calculating the sum.																							|

## Examples

```js
Countries.filter(p=> p.region == "Americas").map(p=> {result:count(1)})
```

```json
[{"result":57}]
```

```js
Countries.map(p=> {region:p.region,countries:count(1)})|
```

```json
[{"region":"","countries":2}
,{"region":"Africa","countries":60}
,{"region":"Americas","countries":57}
,{"region":"Asia","countries":50}
,{"region":"Europe","countries":53}
,{"region":"Oceania","countries":27}
,{"region":"Polar","countries":1}
]
```

```js
Countries.map(p=> {region:p.region,max:max(p.latitude)})
```

```json
[{"region":"","max":-53.1}
,{"region":"Africa","max":34}
,{"region":"Americas","max":72}
,{"region":"Asia","max":48}
,{"region":"Europe","max":78}
,{"region":"Oceania","max":15.2}
,{"region":"Polar","max":-74.65}
]

```

```js
Countries.map(p=> {region:p.region,min:min(p.latitude)})
```

```json
[{"region":"","min":-54.4333}
,{"region":"Africa","min":-49.25}
,{"region":"Americas","min":-54.5}
,{"region":"Asia","min":-8.8333}
,{"region":"Europe","min":35}
,{"region":"Oceania","min":-41}
,{"region":"Polar","min":-74.65}
]
```

```js
Countries.map(p=> {region:p.region,avg:avg(p.latitude)})
```

```json
[{"region":"","avg":-53.76665}
,{"region":"Africa","avg":1.283335}
,{"region":"Americas","avg":10.42610526}
,{"region":"Asia","avg":25.822002}
,{"region":"Europe","avg":49.35021321}
,{"region":"Oceania","avg":-10.93023704}
,{"region":"Polar","avg":-74.65}
]
```

## Sentences

**Lambda:**

Query to get the count of countries in the Americas region

```js
Countries.filter(p=> p.region == "Americas").map(p=> {result:count(1)})
```

**SQL Result:**

```sql
SELECT COUNT(1) AS result 
FROM Countries c  
WHERE c.region = 'Americas' 
```

**Lambda:**

Query to get the count of countries in each region

```js
Countries.map(p=> {region:p.region,countries:count(1)})
```

**SQL Result:**

```sql
SELECT c.region AS region, COUNT(1) AS countries 
FROM Countries c  
GROUP BY c.region 
```

**Lambda:**

Query to get the maximum latitude of countries in each region

```js
Countries.map(p=> {region:p.region,max:max(p.latitude)})
```

**SQL Result:**

```sql
SELECT c.region AS region, MAX(c.latitude) AS max 
FROM Countries c  
GROUP BY c.region 
```

**Lambda:**

Query to get the minimum latitude of countries in each region

```js
Countries.map(p=> {region:p.region,min:min(p.latitude)})
```

**SQL Result:**

```sql
SELECT c.region AS region, MIN(c.latitude) AS min 
FROM Countries c  
GROUP BY c.region 
```

**Lambda:**

Query to get the average latitude of countries in each region

```js
Countries.map(p=> {region:p.region,avg:avg(p.latitude)})
```

**SQL Result:**

```sql
SELECT c.region AS region, AVG(c.latitude) AS avg 
FROM Countries c  
GROUP BY c.region 
```

## Definition

### avg

- description: Calculates the average of the specified columns in a set of rows
- deterministic: true
- return: number
- params:
	- value: number

### count

- description: Calculating the number of rows in a set.
- deterministic: true
- return: number
- params:
	- value: any

### first

- description: Returns the first value of the selected column
- deterministic: true
- return: T
- params:
	- value: T

### last

- description: Returns the last value of the selected column.
- deterministic: true
- return: T
- params:
	- value: T

### max

- description: Calculating the maximum.
- deterministic: true
- return: T
- params:
	- value: T

### min

- description: Calculating the minimum.
- deterministic: true
- return: T
- params:
	- value: T

### sum

- description: Calculating the sum.
- deterministic: true
- return: number
- params:
	- value: number
