|Function   |Description                                   					|
|-----------|-------------------------------------------------------|
|desc				|This statement is used to sort data in descending order|
|asc				|This statement is used to sort data in ascending order	|

## Examples

```js
Countries.map(p=> {region:p.region,countries:count(1)}).sort(p=> p.countries)
```

```json
[{"region":"Polar","countries":1}
,{"region":"","countries":2}
,{"region":"Oceania","countries":27}
,{"region":"Asia","countries":50}
,{"region":"Europe","countries":53}
,{"region":"Americas","countries":57}
,{"region":"Africa","countries":60}
]
```

```js
Countries.filter(p=> p.subregion == "South America").map(p=> p.iso3).sort(p=> desc(iso3))
```

```json
[{"iso3":"ARG"}
,{"iso3":"BOL"}
,{"iso3":"BRA"}
,{"iso3":"CHL"}
,{"iso3":"COL"}
,{"iso3":"ECU"}
,{"iso3":"FLK"}
,{"iso3":"GUF"}
,{"iso3":"GUY"}
,{"iso3":"PER"}
,{"iso3":"PRY"}
,{"iso3":"SGS"}
,{"iso3":"SUR"}
,{"iso3":"URY"}
,{"iso3":"VEN"}
]
```

```js
Countries.map(p=> {region:p.region,max:max(p.latitude)}).sort(p=> asc(p.max))
```

```json
[{"region":"Polar","max":-74.65}
,{"region":"","max":-53.1}
,{"region":"Oceania","max":15.2}
,{"region":"Africa","max":34}
,{"region":"Asia","max":48}
,{"region":"Americas","max":72}
,{"region":"Europe","max":78}
]
```

## Sentences

**Lambda:**

Query to get the count of countries in each region

```js
Countries.map(p=> {region:p.region,countries:count(1)}).sort(p=> p.countries)
```

**SQL Result:**

```sql
SELECT c.region AS region, COUNT(1) AS countries 
FROM Countries c  
GROUP BY c.region 
ORDER BY countries asc 
```

**Lambda:**

Query to get the iso3 codes of countries in the South America subregion in descending order

```js
Countries.filter(p=> p.subregion == "South America").map(p=> p.iso3).sort(p=> desc(iso3))
```

**SQL Result:**

```sql
SELECT c.iso3 AS iso3 
FROM Countries c  
WHERE c.subregion = 'South America' 
ORDER BY ? desc 
```

**Lambda:**

Query to get the maximum latitude of countries in each region

```js
Countries.map(p=> {region:p.region,max:max(p.latitude)}).sort(p=> asc(p.max))
```

**SQL Result:**

```sql
SELECT c.region AS region, MAX(c.latitude) AS max 
FROM Countries c  
GROUP BY c.region 
ORDER BY max asc 
```

## Definition

### desc

- description: This statement is used to sort data in descending order
- deterministic: true
- return: void
- params:
	- value: any

### asc

- description: This statement is used to sort data in ascending order.
- deterministic: true
- return: void
- params:
	- value: any
