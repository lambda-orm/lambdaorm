# string functions

|Function    |Description                                   |
|------------|----------------------------------------------|
|chr|Get character from ASCII code|
|initcap|Capitalize words|
|lower|Lowercase string|
|lpad|Pad the left-side of string|
|ltrim|Remove leading chars|
|replace|The replace() method searches a string for a specified value and returns a new string where the specified values are replaced.|
|rpad|Pad the right-side of string|
|rtrim|Remove trailing spaces|
|substr|Get a substring of string|
|trim|Remove characters|
|upper|Uppercase string|
|concat|String concatenation|

## Definition

### chr

- description: Get character from ASCII code
- deterministic: true
- return: string
- params:
	- value: string

### initcap

- description: Capitalize words
- deterministic: true
- return: string
- params:
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
