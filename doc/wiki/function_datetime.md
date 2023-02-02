|Function    |Description                                   |
|------------|----------------------------------------------|
|curTime|Get the current time|
|today|Get the current date|
|now|Get the current dateTime|
|dateToString|Convert date to string with ISO 8601 format|
|time|Convert string to time|
|date|Convert string to date|
|dateTime|Convert string to dateTime|
|year|Get year from date|
|month|Get month from date|
|day|Get day of month from date|
|weekday|get date of week from date|
|hour|get hour from date|
|minute|Get minute from date|
|second|Get second from date|
|millisecond|Get millisecond from date|
|addYear|Add years to a date|
|addMonth|Add months to a date|
|addDay|Add days to a date|
|addHour|Add hours to a date|
|addMinute|Add minutes to a date|
|addSecond|Add seconds to a date|
|addMillisecond|Add milliseconds to a date|
|addTime|Add time to a date|
|subtractTime|subtract time to a date|
|dayDiff|difference between two dates in days|
|hourDiff|difference between two dates in hours|
|secondDiff|difference between two dates in seconds|
|millisecondDiff|difference between two dates in milliseconds|
|dayToDate|days to  Date|
|hourToDate|hours to  Date|
|secondToDate|seconds to  Date|
|millisecondToDate|milliseconds to Date|

## Definition

### curTime

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

- description: Get the current dateTime
- deterministic: true
- return: Date
- params:

### dateToString

- description: Convert date to string with ISO 8601 format
- deterministic: true
- return: string
- params:
	- value: Date

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

### dateTime

- description: Convert string to dateTime
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

### hour

- description: get hour from date
- deterministic: true
- return: number
- params:
	- value: Date

### minute

- description: Get minute from date
- deterministic: true
- return: number
- params:
	- value: Date

### second

- description: Get second from date
- deterministic: true
- return: number
- params:
	- value: Date

### millisecond

- description: Get millisecond from date
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

### addHour

- description: Add hours to a date
- deterministic: true
- return: Date
- params:
	- date: Date
	- value: number

### addMinute

- description: Add minutes to a date
- deterministic: true
- return: Date
- params:
	- date: Date
	- value: number

### addSecond

- description: Add seconds to a date
- deterministic: true
- return: Date
- params:
	- date: Date
	- value: number

### addMillisecond

- description: Add milliseconds to a date
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
	- time: Date

### subtractTime

- description: subtract time to a date
- deterministic: true
- return: Date
- params:
	- date: Date
	- time: Date

### dayDiff

- description: difference between two dates in days
- deterministic: true
- return: Date
- params:
	- date: Date
	- date2: Date

### hourDiff

- description: difference between two dates in hours
- deterministic: true
- return: Date
- params:
	- time: Date
	- time2: Date

### secondDiff

- description: difference between two dates in seconds
- deterministic: true
- return: Date
- params:
	- time: Date
	- time2: Date

### millisecondDiff

- description: difference between two dates in milliseconds
- deterministic: true
- return: Date
- params:
	- time: Date
	- time2: Date

### dayToDate

- description: days to  Date
- deterministic: true
- return: Date
- params:
	- value: number

### hourToDate

- description: hours to  Date
- deterministic: true
- return: Date
- params:
	- value: number

### secondToDate

- description: seconds to  Date
- deterministic: true
- return: Date
- params:
	- value: number

### millisecondToDate

- description: milliseconds to Date
- deterministic: true
- return: Date
- params:
	- value: number
