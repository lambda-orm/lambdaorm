# group functions

|Function    |Description                                   |
|------------|----------------------------------------------|
|avg|Calculates the average of the specified columns in a set of rows|
|count|Calculating the number of rows in a set.|
|first|Returns the first value of the selected column|
|last|Returns the last value of the selected column.|
|max|Calculating the maximum.|
|min|Calculating the minimum.|
|sum|Calculating the sum.|

## Definition

### avg

- description: Calculates the average of the specified columns in a set of rows
- deterministic: undefined
- return: number
- params:
	- value: number

### count

- description: Calculating the number of rows in a set.
- deterministic: undefined
- return: number
- params:
	- value: any

### first

- description: Returns the first value of the selected column
- deterministic: undefined
- return: T
- params:
	- value: T

### last

- description: Returns the last value of the selected column.
- deterministic: undefined
- return: T
- params:
	- value: T

### max

- description: Calculating the maximum.
- deterministic: undefined
- return: T
- params:
	- value: T

### min

- description: Calculating the minimum.
- deterministic: undefined
- return: T
- params:
	- value: T

### sum

- description: Calculating the sum.
- deterministic: undefined
- return: number
- params:
	- value: number
