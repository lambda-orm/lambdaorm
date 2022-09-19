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
- deterministic: true
- return: number
- params:
	- value: number

### count

- description: Calculating the number of rows in a set.
- deterministic: true
- return: number
- params:
	- value: any

### first

- description: Returns the first value of the selected column
- deterministic: true
- return: T
- params:
	- value: T

### last

- description: Returns the last value of the selected column.
- deterministic: true
- return: T
- params:
	- value: T

### max

- description: Calculating the maximum.
- deterministic: true
- return: T
- params:
	- value: T

### min

- description: Calculating the minimum.
- deterministic: true
- return: T
- params:
	- value: T

### sum

- description: Calculating the sum.
- deterministic: true
- return: number
- params:
	- value: number
