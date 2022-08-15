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

Context:

```js
const context = { 
	a: '1', b: 2, c: { a: 4, b: 5 }, 
	d: 'house', e: 'car',
	devices: ['phone', 'computer', 'robot'],
	pi: 3.141516 }	
```

| Example         						| Result 			|
|-----------------------------|-------------|
|3>2													|true					|
|a+b													|'12'					|
|-3>2*2												|false				|
|a*3==b+1											|true					|
|a*3===b+1										|true					|
|-4==-(2*2)										|true					|
|4!=2*2												|false				|
|4!==2*2											|false				|
|4<>2*2												|false				|
|c.a>b*2											|false				|
|c.a>=b*2											|true					|
|c.a<=b*2											|true					|
|c.a<b*2											|false				|
|d<e													|false				|
|d>e													|true					|
|d<>e													|true					|
|includes("phone",devices)		|true					|
|includes("other",devices)		|false				|
|in("other",devices)					|false				|
|between(12,10,20)						|true					|
|between(2,10,20)							|false				|
|between(pi,1,5)							|true					|

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
