|Function    |Description                                   |
|------------|----------------------------------------------|
|foreach|Calls a function for each element in an array.|
|each|Calls a function for each element in an array.|
|filter|Creates a new array filled with elements that pass a test provided by a function|
|where|Creates a new array filled with elements that pass a test provided by a function|
|first|Returns the first value of the array that meets a condition|
|last|Returns the last value of the array that meets a condition|
|map|Creates a new array from calling a function for every array element.|
|select|Creates a new array from calling a function for every array element.|
|sort|Sorts the elements of an array.|
|order|Sorts the elements of an array.|
|reverse|Reverses the order of the elements in an array.|
|remove|Eliminate the elements of the array that meet the filter condition|
|delete|Eliminate the elements of the array that meet the filter condition|
|push|Adds new items to the end of an array|
|insert|Adds new items to the end of an array|
|pop|Removes (pops) the last element of an array and return element|
|length|Calculating the number of items in a array.|
|len|Calculating the number of items in a array.|

## Definition

### foreach

- description: Calls a function for each element in an array.
- deterministic: true
- return: void
- params:
	- list: any[]
	- method: function

### each

- description: Calls a function for each element in an array.
- deterministic: true
- return: void
- params:
	- list: any[]
	- method: function

### filter

- description: Creates a new array filled with elements that pass a test provided by a function
- deterministic: true
- return: T[]
- params:
	- list: T[]
	- method: function

### where

- description: Creates a new array filled with elements that pass a test provided by a function
- deterministic: true
- return: T[]
- params:
	- list: T[]
	- method: function

### first

- description: Returns the first value of the array that meets a condition
- deterministic: true
- return: T
- params:
	- list: T[]
	- method: function

### last

- description: Returns the last value of the array that meets a condition
- deterministic: true
- return: T
- params:
	- list: T[]
	- method: function

### map

- description: Creates a new array from calling a function for every array element.
- deterministic: true
- return: any[]
- params:
	- list: any[]
	- method: function

### select

- description: Creates a new array from calling a function for every array element.
- deterministic: true
- return: any[]
- params:
	- list: any[]
	- method: function

### sort

- description: Sorts the elements of an array.
- deterministic: true
- return: T[]
- params:
	- list: T[]
	- method: function

### order

- description: Sorts the elements of an array.
- deterministic: true
- return: T[]
- params:
	- list: T[]
	- method: function

### reverse

- description: Reverses the order of the elements in an array.
- deterministic: true
- return: T[]
- params:
	- list: T[]
	- method: function

### remove

- description: Eliminate the elements of the array that meet the filter condition
- deterministic: true
- return: number
- params:
	- list: any[]
	- method: function

### delete

- description: Eliminate the elements of the array that meet the filter condition
- deterministic: true
- return: number
- params:
	- list: any[]
	- method: function

### push

- description: Adds new items to the end of an array
- deterministic: true
- return: number
- params:
	- list: T[]
	- value: T

### insert

- description: Adds new items to the end of an array
- deterministic: true
- return: number
- params:
	- list: T[]
	- value: T

### pop

- description: Removes (pops) the last element of an array and return element
- deterministic: true
- return: T
- params:
	- list: T[]

### length

- description: Calculating the number of items in a array.
- deterministic: true
- return: number
- params:
	- list: T[]

### len

- description: Calculating the number of items in a array.
- deterministic: true
- return: number
- params:
	- list: T[]
