|Function    |Description                                   |
|------------|----------------------------------------------|
|between|Specifies how to retrieve values from an expression within a specific range.|
|includes|Is used to reduce the use of multiple OR conditions|
|in|Is used to reduce the use of multiple OR conditions|

## Definition

### between

- description: Specifies how to retrieve values from an expression within a specific range.
- deterministic: true
- return: boolean
- params:
	- value: T
	- from: T
	- to: T

### includes

- description: Is used to reduce the use of multiple OR conditions
- deterministic: true
- return: boolean
- params:
	- value: T
	- list: T[]

### in

- description: Is used to reduce the use of multiple OR conditions
- deterministic: true
- return: boolean
- params:
	- value: T
	- list: T[]
