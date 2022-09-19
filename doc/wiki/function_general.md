|Function    |Description                                   |
|------------|----------------------------------------------|
|sleep|Delay a program execution for a given number of milliseconds.|
|console|Show a message on the console.|
|as|Is used to assign a new name temporarily to a table column or even a table|
|distinct|Is used with SELECT key word to retrieve only distinct or unique data.|

## Definition

### sleep

- description: Delay a program execution for a given number of milliseconds.
- deterministic: true
- return: void
- params:
	- milliseconds: number

### console

- description: Show a message on the console.
- deterministic: true
- return: void
- params:
	- value: any

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
