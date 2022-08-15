|Function   |Description                                   						|
|-----------|---------------------------------------------------------|
|nvl				|Allows you to replace null values with a default value.	|
|nvl2				|It lets you substitutes a value when a null value is encountered as well as when a non-null value is encountered.|
|isNull			|Evaluate if it is null																		|
|isNotNull	|Evaluate if it is not null																|

## Examples

Context:

```js
const context = { a: 1, b: null, c: '', e: 'hello' }

```

| Example                             | Result 					|
|-------------------------------------|-----------------|
|nvl(a,2)															|1								|
|nvl(b,2)															|2								|
|nvl2(b,"is not null","is null")			|'is null'				|
|nvl2(c,"is not null","is null")			|'is not null'		|
|nvl2(d,"is not null","is null")			|'is null'				|
|isNull(b)														|true							|
|isNull(c)														|false						|
|isNotNull(b)													|false						|
|isNotNull(c)													|true							|

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
