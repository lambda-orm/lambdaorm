|Function    |Description                                   |
|------------|----------------------------------------------|
|between|Specifies how to retrieve values from an expression within a specific range.|
|includes|Determines if an array includes a certain element|
|in|Determines if an array includes a certain element|

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
