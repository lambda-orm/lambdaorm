|Function    |Description                                   |
|------------|----------------------------------------------|
|as|Is used to assign a new name temporarily to a table column or even a table|
|distinct|Is used with SELECT key word to retrieve only distinct or unique data.|
|sleep|Delay a program execution for a given number of miliseconds.|

## Definition

### as

- description: Is used to assign a new name temporarily to a table column or even a table
- deterministic: true
- return: T
- params:
	- value: T
	- name: string

### distinct

- description: Is used with SELECT key word to retrieve only distinct or unique data.
- deterministic: true
- return: T
- params:
	- value: T

### sleep

- description: Delay a program execution for a given number of miliseconds.
- deterministic: true
- return: void
- params:
	- miliseconds: number
