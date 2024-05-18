|Operator |Description                                   	|
|---------|-----------------------------------------------|
|-				|negative /subtraction													|
|+				|addition																				|
|*				|multiplication																	|
|/				|division																				|
|**				|exponentiation																	|
|//				|floorDivision																	|
|%				|mod																						|

|Function    	|Description                                   	|
|-------------|-----------------------------------------------|
|abs					|Get the absolute value													|
|acos					|Get the arc cosine															|
|asin					|Get the arc sine																|
|atan					|Get the arc tangent														|
|atan2				|Get the arc tangent of x and y									|
|ceil					|Get the smallest following integer							|
|cos					|Get the cosine																	|
|cosh					|Get hyperbolic cosine													|
|exp					|Raise e to the nth power												|
|floor				|Get the largest preceding integer							|
|ln						|Get natural logarithm of num										|
|log					|Get logarithm, base num1, of num2							|
|log10				|Return the base 10 logarithm of x							|
|remainder		|Get remainder																	|
|round				|Get rounded value															|
|sign					|Get sign of exp																|
|sin					|Get sine																				|
|sinh					|Get hyperbolic sine														|
|tan					|Get tangent																		|
|tanh					|Get hyperbolic tangent													|
|trunc				|Truncate num																		|
|toNumber			|convert to number															|

## Examples

| Example           																														| Result 													|
|-------------------------------------------------------------------------------|---------------------------------|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: 3+2-1 })								|[{"result":4}]										|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: 3*4-1})									|[{"result":11}]									|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: 1-2-5})									|[{"result":-6}]									|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: (2+3)*2})								|[{"result":10}]									|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: 2*(3+2)})								|[{"result":10}]									|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: 1+2*3*4})								|[{"result":25}]									|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: (1+(2**3)*4)})					|[{"result":33}]									|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: 1+2**(3*4)})						|[{"result":4097}]								|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: abs(-9)})								|[{"result":9}]										|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: acos(0.434)})						|[{"result":1.121868332427735}]		|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: asin(0.434)})						|[{"result":0.44892799436716174}]	|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: atan(2)})								|[{"result":1.1071487177940904}]	|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: atan2(90, 15)})					|[{"result":1.4056476493802699}]	|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: ceil(2)})								|[{"result":2}]										|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: cos(2)})								|[{"result":-0.4161468365471424}]	|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: cosh(2)})								|[{"result":3.7621956910836314}]	|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: exp(7)})								|[{"result":1096.6331584284585}]	|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: floor(7)})							|[{"result":7}]										|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: ln(7)})									|[{"result":1.9459101490553132}]	|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: log(7,10)})							|[{"result":1.1832946624549385}]	|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: log10(7)})							|[{"result":0.8450980400142568}]	|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: remainder(7,2)})				|[{"result":-1}]									|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: round(7.984938,2)})			|[{"result":7.98}]								|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: sign(-7)})							|[{"result":-1}]									|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: sin(7)})								|[{"result":0.6569865987187891}]	|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: sinh(7)})								|[{"result":548.3161232732465}]		|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: tan(7)})								|[{"result":0.8714479827243188}]	|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: tanh(7)})								|[{"result":0.9999983369439447}]	|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: trunc(7.984938,2)})			|[{"result":7.98}]								|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: toNumber("3.141516")})	|[{"result":3}]										|

## Sentences

**Lambda:**

Query to get the result of 3+2-1

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: 3+2-1 })
```

**SQL Result:**

```sql
SELECT ((3 + 2) - 1) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the result of 3*4-1

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: 3*4-1})
```

**SQL Result:**

```sql
SELECT ((3 * 4) - 1) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the result of 1-2-5

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: 1-2-5})
```

**SQL Result:**

```sql
SELECT ((1 - 2) - 5) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the result of (2+3)*2

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: (2+3)*2})
```

**SQL Result:**

```sql
SELECT ((2 + 3) * 2) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the result of 2*(3+2)

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: 2*(3+2)})
```

**SQL Result:**

```sql
SELECT (2 * (3 + 2)) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the result of 1+2*3*4

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: 1+2*3*4})
```

**SQL Result:**

```sql
SELECT (1 + ((2 * 3) * 4)) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the result of (1+(2**3)*4)

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: (1+(2**3)*4)})
```

**SQL Result:**

```sql
SELECT (1 + (POWER(2,3) * 4)) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the result of 1+2**(3*4)

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: 1+2**(3*4)})
```

**SQL Result:**

```sql
SELECT (1 + POWER(2,(3 * 4))) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the absolute value of -9

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: abs(-9)})
```

**SQL Result:**

```sql
SELECT ABS(-9) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the arc cosine of 0.434

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: acos(0.434)})
```

**SQL Result:**

```sql
SELECT ACOS(0.434) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the arc sine of 0.434

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: asin(0.434)})
```

**SQL Result:**

```sql
SELECT ASIN(0.434) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the arc tangent of 2

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: atan(2)})
```

**SQL Result:**

```sql
SELECT ATAN(2) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the arc tangent of 90 and 15

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: atan2(90, 15)})
```

**SQL Result:**

```sql
SELECT ATAN(90,15) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the smallest following integer of 2

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: ceil(2)})
```

**SQL Result:**

```sql
SELECT CEIL(2) AS result
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the cosine of 2

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: cos(2)})
```

**SQL Result:**

```sql
SELECT COS(2) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the hyperbolic cosine of 2

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: cosh(2)})
```

**SQL Result:**

```sql
SELECT ((EXP(2) + EXP(-2)) / 2) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get e to the nth power of 7

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: exp(7)})
```

**SQL Result:**

```sql
SELECT EXP(7) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the largest preceding integer of 7

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: floor(7)})
```

**SQL Result:**

```sql
SELECT FLOOR(7) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the natural logarithm of 7

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: ln(7)})
```

**SQL Result:**

```sql
SELECT LN(7) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the logarithm, base 7, of 10

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: log(7,10)})
```

**SQL Result:**

```sql
SELECT LOG(7,10) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the base 10 logarithm of 7

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: log10(7)})
```

**SQL Result:**

```sql
SELECT LOG10(7) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the remainder of 7 and 2

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: remainder(7,2)})
```

**SQL Result:**

```sql
SELECT (7 - 2*ROUND(7/2)) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the rounded value of 7.984938 with 2 decimals

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: round(7.984938,2)})
```

**SQL Result:**

```sql
SELECT ROUND(7.984938,2) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the sign of -7

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: sign(-7)})
```

**SQL Result:**

```sql
SELECT SIGN(-7) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the sine of 7

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: sin(7)})
```

**SQL Result:**

```sql
SELECT SIN(7) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the hyperbolic sine of 7

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: sinh(7)})
```

**SQL Result:**

```sql
SELECT ((EXP(7) - EXP(-7)) / 2) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the tangent of 7

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: tan(7)})
```

**SQL Result:**

```sql
SELECT TAN(7) AS result 
FROM Countries c 
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the hyperbolic tangent of 7

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: tanh(7)})
```

**SQL Result:**

```sql
SELECT (EXP(2*7) - 1)/(EXP(2*7) + 1) AS result 
FROM Countries c 
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the truncated value of 7.984938

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: trunc(7.984938,2)})
```

**SQL Result:**

```sql
SELECT TRUNCATE(7.984938,2) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to convert the string "3.141516" to number

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: toNumber("3.141516")})
```

**SQL Result:**

```sql
SELECT CONVERT('3.141516', DECIMAL) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

## Definition

### Operator -

Negative:

- description: negative
- return: number
- params:
	- value: number

Subtraction:

- description: subtraction
- return: number
- params:
	- a: number
	- b: number

### Operator +

- description: addition
- return: number
- params:
	- a: number
	- b: number

### Operator *

- description: multiplication
- return: number
- params:
	- a: number
	- b: number

### Operator /

- description: division
- return: number
- params:
	- a: number
	- b: number

### Operator **

- description: exponentiation
- return: number
- params:
	- a: number
	- b: number

### Operator //

- description: floorDivision
- return: number
- params:
	- a: number
	- b: number

### Operator %

- description: mod
- return: number
- params:
	- a: number
	- b: number

### abs

- description: Get the absolute value
- deterministic: true
- return: number
- params:
	- value: number

### acos

- description: Get the arc cosine
- deterministic: true
- return: number
- params:
	- value: number

### asin

- description: Get the arc sine
- deterministic: true
- return: number
- params:
	- value: number

### atan

- description: Get the arc tangent
- deterministic: true
- return: number
- params:
	- value: number

### atan2

- description: Get the arc tangent of x and y
- deterministic: true
- return: number
- params:
	- x: number
	- y: number

### ceil

- description: Get the smallest following integer
- deterministic: true
- return: number
- params:
	- value: number

### cos

- description: Get the cosine
- deterministic: true
- return: number
- params:
	- value: number

### cosh

- description: Get hyperbolic cosine
- deterministic: true
- return: number
- params:
	- value: number

### exp

- description: Raise e to the nth power
- deterministic: true
- return: number
- params:
	- value: number

### floor

- description: Get the largest preceding integer
- deterministic: true
- return: number
- params:
	- value: number

### ln

- description: Get natural logarithm of num
- deterministic: true
- return: number
- params:
	- value: number

### log

- description: Get logarithm, base num1, of num2
- deterministic: true
- return: number
- params:
	- n1: number
	- n2: number

### log10

- description: Return the base 10 logarithm of x
- deterministic: true
- return: number
- params:
	- value: number

### remainder

- description: Get remainder
- deterministic: true
- return: number
- params:
	- n1: number
	- n2: number

### round

- description: Get rounded value
- deterministic: true
- return: number
- params:
	- value: number
	- decimals: number

### sign

- description: Get sign of exp
- deterministic: true
- return: number
- params:
	- value: number

### sin

- description: Get sine
- deterministic: true
- return: number
- params:
	- value: number

### sinh

- description: Get hyperbolic sine
- deterministic: true
- return: number
- params:
	- value: number

### tan

- description: Get tangent
- deterministic: true
- return: number
- params:
	- value: number

### tanh

- description: Get hyperbolic tangent
- deterministic: true
- return: number
- params:
	- value: number

### trunc

- description: Truncate num
- deterministic: true
- return: number
- params:
	- value: number

### toNumber

- description: convert to number
- deterministic: true
- return: number
- params:
	- value: string
