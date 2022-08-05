|Function    |Description                                   |
|------------|----------------------------------------------|
|sleep|Delay a program execution for a given number of miliseconds.|
|stringify|Convert a JavaScript object or value to a JSON text string.|
|parse|Parses a text string as JSON, optionally transforming the value produced by the parse.|
|as|undefined|
|distinct|undefined|

## Definition

### sleep

- description: Delay a program execution for a given number of miliseconds.
- deterministic: true
- return: void
- params:
	- miliseconds: number

### stringify

- description: Convert a JavaScript object or value to a JSON text string.
- deterministic: true
- return: string
- params:
	- value: any

### parse

- description: Parses a text string as JSON, optionally transforming the value produced by the parse.
- deterministic: true
- return: any
- params:
	- value: string

### as

- description: undefined
- deterministic: true
- return: T
- params:
	- value: T
	- name: string

### distinct

- description: undefined
- deterministic: true
- return: T
- params:
	- value: T
