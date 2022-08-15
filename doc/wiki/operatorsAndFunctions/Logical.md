|Operator   |Description  |
|-----------|-------------|
|!					|not					|
|&&					|and					|
|\|\|				|or						|

## Examples

Context:

```js
const context = { a: '1', b: 2, c: { a: 4, b: 5 }, d: 'house', e: 'car' }
```

| Example           | Result 		|
|-------------------|-----------|
|a=="1" && b==2			|true				|
|a=="1" && b>2			|false			|
|a=="1" || b>2			|true				|
|!(a=="1" || b>2)		|false			|

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
