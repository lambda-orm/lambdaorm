|Operator |Description  |
|---------|-------------|
|~				|bitNot				|
|&				|bitAnd				|
|\|				|bitOr				|
|^				|bitXor				|
|<<				|leftShift		|
|>>				|rightShift		|

## Examples

Context:

```js
const context = { }
```

| Example   | Result 		|
|-----------|-----------|
|5 & 1			|1					|
|5 \| 1			|5					|
|~ 5				|-6					|
|5 << 1			|10					|
|5 ^ 1			|4					|
|5 >> 1			|2					|

## Definition

### Operator ~

- description: bitNot
- return: boolean
- params:
	- value: boolean

### Operator &

- description: bitAnd
- return: number
- params:
	- a: number
	- b: number

### Operator |

- description: bitOr
- return: number
- params:
	- a: number
	- b: number

### Operator ^

- description: bitXor
- return: number
- params:
	- a: number
	- b: number

### Operator <<

- description: leftShift
- return: number
- params:
	- a: number
	- b: number

### Operator >>

- description: rightShift
- return: number
- params:
	- a: number
	- b: number
