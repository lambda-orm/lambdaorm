|Function   			|Description                                   																														|
|-----------------|---------------------------------------------------------------------------------------------------------|
|chr							|Get character from ASCII code																																						|
|concat						|String concatenation																																											|
|lower						|Lowercase string																																													|
|lpad							|Pad the left-side of string																																							|
|ltrim						|Remove leading chars																																											|
|replace					|Searches a string for a specified value and returns a new string where the specified values are replaced	|
|match						|Returns an array containing all matches, including capturing groups, or null if no matches are found			|
|mask							|General-purpose function that mask parts of arbitrary strings based on position within the string				|
|rpad							|Pad the right-side of string																																							|
|rtrim						|Remove trailing spaces																																										|
|substr substring	|Get a substring of string																																								|
|trim							|Remove characters																																												|
|upper						|Uppercase string																																													|
|strCount					|Count value in source																																										|
|isEmpty					|Evaluate if it is empty																																									|
|toString					|Convert to string																																												|

## Examples

| Example                                   																								| Result 															|
|-------------------------------------------------------------------------------------------|-------------------------------------|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: lower(p.subregion) })								|[{"result":"south america"}]					|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: upper(p.subregion) })								|[{"result":"SOUTH AMERICA"}]					|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: concat(p.region," ",p.subregion) })	|[{"result":"Americas South America"}]|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: lpad(p.region,12,"_") })						|[{"result":"____Americas"}]					|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: rpad(p.region,12,"_") })						|[{"result":"Americas____"}]					|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: chr(68)})														|[{"result":"D"}]											|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: ltrim("  a  ")})										|[{"result":"a  "}]										|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: rtrim("  a  ")})										|[{"result":"  a"}]										|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: replace(p.region,"a","*")})					|[{"result":"Americ*s"}]							|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: mask(p.subregion)})									|[{"result":"Sou***ica"}]							|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: substr(p.subregion,1,3)})						|[{"result":"Sou"}]										|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: substring(p.subregion,1,3)})				|[{"result":"Sou"}]										|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: strCount(p.subregion,"a")})					|[{"result":1}]												|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: toString(p.latitude)})							|[{"result":"-10.0000"}]							|

## Sentences

**Lambda:**

Query to get the subregion in lowercase for the country with the iso3 code "BRA"

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: lower(p.subregion) })
```

**SQL Result:**

```sql
SELECT LOWER(c.subregion) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the subregion in uppercase for the country with the iso3 code "BRA"

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: upper(p.subregion) })
```

**SQL Result:**

```sql
SELECT UPPER(c.subregion) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the region and subregion concatenated for the country with the iso3 code "BRA"

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: concat(p.region," ",p.subregion) })
```

**SQL Result:**

```sql
SELECT CONCAT(CONCAT(c.region,' '),c.subregion) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the region left-padded with "_" for the country with the iso3 code "BRA"

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: lpad(p.region,12,"_") })
```

**SQL Result:**

```sql
SELECT LPAD(c.region,12,'_') AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the region right-padded with "_" for the country with the iso3 code "BRA"

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: rpad(p.region,12,"_") })
```

**SQL Result:**

```sql
SELECT RPAD(c.region,12,'_') AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the character "D" from ASCII code 68 for the country with the iso3 code "BRA"

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: chr(68)})
```

**SQL Result:**

```sql
SELECT CHAR(68 USING ASCII) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the subregion with leading spaces removed for the country with the iso3 code "BRA"

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: ltrim("  a  ")})
```

**SQL Result:**

```sql
SELECT LTRIM('  a  ') AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the subregion with trailing spaces removed for the country with the iso3 code "BRA"

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: rtrim("  a  ")})
```

**SQL Result:**

```sql
SELECT RTRIM('  a  ') AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the region with "a" replaced by "*" for the country with the iso3 code "BRA"

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: replace(p.region,"a","*")})
```

**SQL Result:**

```sql
SELECT REPLACE(c.region,'a','*') AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the subregion masked for the country with the iso3 code "BRA"

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: mask(p.subregion)})
```

**SQL Result:**

```sql
SELECT Concat(LEFT(c.subregion,3),'***',RIGHT(c.subregion,3)) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the first 3 characters of the subregion for the country with the iso3 code "BRA"

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: substr(p.subregion,1,3)})
```

**SQL Result:**

```sql
SELECT SUBSTR(c.subregion,1,3) AS result
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the first 3 characters of the subregion for the country with the iso3 code "BRA"

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: substring(p.subregion,1,3)})
```

**SQL Result:**

```sql
SELECT SUBSTR(c.subregion,1,3) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the count of "a" in the subregion for the country with the iso3 code "BRA"

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: strCount(p.subregion,"a")})
```

**SQL Result:**

```sql
SELECT (LENGTH(c.subregion)-LENGTH(REPLACE(c.subregion,'a',''))) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the latitude as string for the country with the iso3 code "BRA"

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: toString(p.latitude)})
```

**SQL Result:**

```sql
SELECT CONVERT(c.latitude, CHAR) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

## Definition

### chr

- description: Get character from ASCII code
- deterministic: true
- return: string
- params:
	- ascii: number

### strCount

- description: Count value in source
- deterministic: true
- return: number
- params:
	- source: string
	- value: string

### lower

- description: Lowercase string
- deterministic: true
- return: string
- params:
	- value: string

### lpad

- description: Pad the left-side of string
- deterministic: true
- return: string
- params:
	- value: string
	- len: number
	- pad: string

### ltrim

- description: Remove leading chars
- deterministic: true
- return: string
- params:
	- value: string

### replace

- description: The replace() method searches a string for a specified value and returns a new string where the specified values are replaced.
- deterministic: true
- return: string
- params:
	- value: string
	- source: string
	- target: string

### rpad

- description: Pad the right-side of string
- deterministic: true
- return: string
- params:
	- value: string
	- len: number
	- pad: string

### rtrim

- description: Remove trailing spaces
- deterministic: true
- return: string
- params:
	- value: string

### substr

- description: Get a substring of string
- deterministic: true
- return: string
- params:
	- value: string
	- from: number
	- count: number

### substring

- description: Get a substring of string
- deterministic: true
- return: string
- params:
	- value: string
	- from: number
	- count: number

### trim

- description: Remove characters
- deterministic: true
- return: string
- params:
	- value: string

### upper

- description: Uppercase string
- deterministic: true
- return: string
- params:
	- value: string

### concat

- description: String concatenation
- deterministic: true
- return: string
- params:
	- values: string

### mask

- description: General-purpose function that mask parts of arbitrary strings based on position within the string
- deterministic: true
- return: string
- params:
	- value: string

### isEmpty

- description: Evaluate if it is empty
- deterministic: true
- return: boolean
- params:
	- value: any

### toString

- description: convert to string
- deterministic: true
- return: string
- params:
	- value: any
