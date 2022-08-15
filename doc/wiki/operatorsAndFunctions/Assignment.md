|Operator    	|Description                                   	|
|-------------|-----------------------------------------------|
|=						|assignment																			|
|+=						|assignment addition														|
|-=						|assignment subtraction													|
|*=						|assignment multiplication											|
|/=						|assignment division														|
|**=					|assignment exponentiation											|
|//=					|assignment floorDivision												|
|%=						|assignment mod																	|
|&=						|assignment bit And															|
|\|=					|assignment bit Or															|
|^=						|assignment bit Xor															|
|<<=					|assignment leftShift														|
|>>=					|assignment rightShift													|

## Examples

Context:

```js
const context = { a: '1', b: 2, c: { a: 4, b: 5 } }
```

| Example                     | Result 						|
|-----------------------------|-------------------|
|a=8													|8									|
|c.a=1												|1									|
|d=c.b*2											|10									|
|d=`value of a is: ${a}`			|'value of a is: 8'	|

## Definition

### Operator =

- description: assignment
- return: T
- params:
	- a: T
	- b: T

### Operator +=

- description: assignmentAddition
- return: number
- params:
	- a: number
	- b: number

### Operator -=

- description: assignmentSubtraction
- return: number
- params:
	- a: number
	- b: number

### Operator *=

- description: assignmentMultiplication
- return: number
- params:
	- a: number
	- b: number

### Operator /=

- description: assignmentDivision
- return: number
- params:
	- a: number
	- b: number

### Operator **=

- description: assignmentExponentiation
- return: number
- params:
	- a: number
	- b: number

### Operator //=

- description: assignmentFloorDivision
- return: number
- params:
	- a: number
	- b: number

### Operator %=

- description: assignmentMod
- return: number
- params:
	- a: number
	- b: number

### Operator &=

- description: assignmentBitAnd
- return: number
- params:
	- a: number
	- b: number

### Operator |=

- description: assignmentBitOr
- return: number
- params:
	- a: number
	- b: number

### Operator ^=

- description: assignmentBitXor
- return: number
- params:
	- a: number
	- b: number

### Operator <<=

- description: assignmentLeftShift
- return: number
- params:
	- a: number
	- b: number

### Operator >>=

- description: assignmentRightShift
- return: number
- params:
	- a: number
	- b: number
