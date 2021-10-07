# condition functions

|Function    |Description                                   |
|------------|----------------------------------------------|
|between|Specifies how to retrieve values from an expression within a specific range.|
|includes|Is used to reduce the use of multiple OR conditions|

## Definition

### between

- description: Specifies how to retrieve values from an expression within a specific range.
- deterministic: undefined
- return: boolean
- params:
	- value: T
	- from: T
	- to: T

### includes

- description: Is used to reduce the use of multiple OR conditions
- deterministic: undefined
- return: boolean
- params:
	- value: T
	- list: T[]
