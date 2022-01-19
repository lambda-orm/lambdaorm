|Function    |Description                                   |
|------------|----------------------------------------------|
|curtime|Get the current time|
|today|Get the current date|
|now|Get the current datetime|
|time|Convert string to time|
|date|Convert string to date|
|datetime|Convert string to datetime|
|year|Get year from date|
|month|Get month from date|
|day|Get day of month from date|
|weekday|get date of week from date|
|hours|get hour from date|
|minutes|Get minutes from date|
|seconds|Get seconds from date|
|addYear|Add years to a date|
|addMonth|Add months to a date|
|addDay|Add days to a date|
|addHours|Add hours to a date|
|addMinutes|Add minutes to a date|
|addSeconds|Add seconds to a date|
|addTime|Add time to a date|
|dateDiff|difference between two dates|
|timeDiff|difference between two times|

## Definition

### curtime

- description: Get the current time
- deterministic: true
- return: Date
- params:

### today

- description: Get the current date
- deterministic: true
- return: Date
- params:

### now

- description: Get the current datetime
- deterministic: true
- return: Date
- params:

### time

- description: Convert string to time
- deterministic: true
- return: Date
- params:
	- value: string

### date

- description: Convert string to date
- deterministic: true
- return: Date
- params:
	- value: string

### datetime

- description: Convert string to datetime
- deterministic: true
- return: Date
- params:
	- value: string

### year

- description: Get year from date
- deterministic: true
- return: number
- params:
	- value: Date

### month

- description: Get month from date
- deterministic: true
- return: number
- params:
	- value: Date

### day

- description: Get day of month from date
- deterministic: true
- return: number
- params:
	- value: Date

### weekday

- description: get date of week from date
- deterministic: true
- return: number
- params:
	- value: Date

### hours

- description: get hour from date
- deterministic: true
- return: number
- params:
	- value: Date

### minutes

- description: Get minutes from date
- deterministic: true
- return: number
- params:
	- value: Date

### seconds

- description: Get seconds from date
- deterministic: true
- return: number
- params:
	- value: Date

### addYear

- description: Add years to a date
- deterministic: true
- return: Date
- params:
	- date: Date
	- value: number

### addMonth

- description: Add months to a date
- deterministic: true
- return: Date
- params:
	- date: Date
	- value: number

### addDay

- description: Add days to a date
- deterministic: true
- return: Date
- params:
	- date: Date
	- value: number

### addHours

- description: Add hours to a date
- deterministic: true
- return: Date
- params:
	- date: Date
	- value: number

### addMinutes

- description: Add minutes to a date
- deterministic: true
- return: Date
- params:
	- date: Date
	- value: number

### addSeconds

- description: Add seconds to a date
- deterministic: true
- return: Date
- params:
	- date: Date
	- value: number

### addTime

- description: Add time to a date
- deterministic: true
- return: Date
- params:
	- date: Date
	- value: Date

### dateDiff

- description: difference between two dates
- deterministic: true
- return: Date
- params:
	- date: Date
	- date2: Date

### timeDiff

- description: difference between two times
- deterministic: true
- return: Date
- params:
	- time: Date
	- time2: Date
