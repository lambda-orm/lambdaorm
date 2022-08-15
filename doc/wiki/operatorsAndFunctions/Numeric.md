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

Context:

```js
const context = { a: '1', b: 2, c: { a: 4, b: 5 } }
```

| Example           | Result 							|
|-------------------|---------------------|
|3+2-1							|4										|
|3*4-1							|11										|
|1-2-5							|-6										|
|(2+3)*2						|10										|
|2*(3+2)						|10										|
|1+2*3*4						|25										|
|(1+(2**3)*4				|33										|
|1+2**(3*4)					|4097									|
|(a*b)+(2*a+2*b)		|8										|
|2**b+a							|'41'									|
|c.b								|5										|
|abs(-9)						|9										|
|acos(0.434)				|1.1218683324277348		|
|asin(0.434)				|0.44892799436716174	|
|atan(2)						|1.1071487177940904		|
|atan2(90, 15)			|1.4056476493802699		|
|ceil(2)						|2										|
|cos(2)							|-0.4161468365471424	|
|cosh(2)						|3.7621956910836314		|
|exp(7)							|1096.6331584284585		|
|floor(7)						|7										|
|ln(7)							|1.9459101490553132		|
|log(7,10)					|1.9459101490553132		|
|log10(7)						|0.8450980400142568		|
|remainder(7,2)			|1										|
|round(7.984938,2)	|8										|
|sign(-7)						|-1										|
|sin(7)							|0.6569865987187891		|
|sinh(7)						|548.3161232732465		|
|tan(7)							|0.8714479827243187		|
|tanh(7)						|0.9999983369439447		|
|trunc(7.984938,2)	|7										|
toNumber("3.141516")|3.141516							|

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
