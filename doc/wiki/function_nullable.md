|Function    |Description                                   |
|------------|----------------------------------------------|
|nvl|Allows you to replace null values with a default value.|
|nvl2|Extends the functionality found in the NVL function. It lets you substitutes a value when a null value is encountered as well as when a non-null value is encountered.|
|isNull|Evaluate if it is null|
|isNotNull|Evaluate if it is not null|
|isEmpty|Evaluate if it is empty|

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

### isEmpty

- description: Evaluate if it is empty
- deterministic: true
- return: boolean
- params:
	- value: any
