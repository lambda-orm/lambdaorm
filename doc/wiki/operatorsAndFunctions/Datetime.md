|Function    			|Description                                   	|
|-----------------|-----------------------------------------------|
|curTime					|Get the current time														|
|today						|Get the current date														|
|now							|Get the current datetime												|
|dateToString			|Convert date to string with ISO 8601 format		|
|time							|Convert string to time													|
|date							|Convert string to date													|
|datetime					|Convert string to datetime											|
|year							|Get year from date															|
|month						|Get month from date														|
|day							|Get day of month from date											|
|weekday					|Get date of week from date											|
|hour							|Get hour from date															|
|minute						|Get minute from date														|
|second						|Get second from date														|
|millisecond			|Get millisecond from date											|
|addYear					|Add years to a date														|
|addMonth					|Add months to a date														|
|addDay						|Add days to a date															|
|addHour					|Add hours to a date														|
|addMinute				|Add minutes to a date													|
|addSecond				|Add seconds to a date													|
|addMillisecond		|Add milliseconds to a date											|
|addTime					|Add time to a date															|
|subtractTime			|subtract time to a date												|
|dayDiff					|difference between two dates in days						|
|hourDiff					|difference between two dates in hours					|
|secondDiff				|difference between two dates in seconds				|
|millisecondDiff	|difference between two dates in milliseconds		|
|dayToDate				|days to  Date																	|
|hourToDate				|hours to  Date																	|
|secondToDate			|seconds to  Date																|
|millisecondToDate|milliseconds to Date														|

## Examples

| Example                                   										| Result 										|
|---------------------------------------------------------------|---------------------------|
|	curTime() 																										| 18:14:13 									|
|	today()																												| 2022-8-5 									|
|	now()																													| 2022-08-05T16:13:13.510Z 	|
|	dateToString(datetime("2021-09-06T14:39:11.444Z")) 						| 2021-09-06T14:39:11.444Z 	|
|	time("2021-09-06T14:39:11.444Z")															| 16:39:11 									|
|	date("2021-09-06T14:39:11.444Z")															| 2021-9-6									|
|	datetime("2021-09-06T14:39:11.444Z")													| 2021-09-06T14:39:11.444Z 	|
|	year("2021-09-06T14:39:11.444Z")															| 2021											|
|	month("2021-09-06T14:39:11.444Z") 														| 9 												|
|	day("2021-09-06T14:39:11.444Z")																| 6 												|
|	weekday("2021-09-06T14:39:11.444Z") 													| 1 												|
|	hour("2021-09-06T14:39:11.444Z") 															| 16 												|
|	minute("2021-09-06T14:39:11.444Z")														| 39 												|
| second("2021-09-06T14:39:11.444Z") 														| 11												|
|	millisecond("2021-09-06T14:39:11.444Z")												| 444 											|
|	addYear("2021-09-06T14:39:11.444Z",2)													| 2023-09-06T14:39:11.444Z 	|
|	addMonth("2021-09-06T14:39:11.444Z",2)												| 2021-11-06T15:39:11.444Z 	|
|	addDay("2021-09-06T14:39:11.444Z",2)													| 2021-09-08T14:39:11.444Z 	|
|	addHour("2021-09-06T14:39:11.444Z",2) 												| 2021-09-06T16:39:11.444Z 	|
|	addMinute("2021-09-06T14:39:11.444Z",2)												| 2021-09-06T14:41:11.444Z 	|
|	addSecond("2021-09-06T14:39:11.444Z",2)												| 2021-09-06T14:39:13.444Z 	|
| addMillisecond("2021-09-06T14:39:11.444Z",2)									| 2021-09-06T14:39:11.446Z 	|
| addTime("2021-09-06T14:39:11.444Z","08:22:12")								| 2021-09-06T23:01:23.023Z 	|
|	subtractTime("2021-09-06T14:39:11.444Z","08:22:12")						| 2021-09-06T06:16:59.059Z 	|
|	dayDiff("2021-09-06T14:39:11","2021-09-02T12:30:10") 					| 4 												|
|	hourDiff("2021-09-06T14:39:11","2021-09-02T12:30:10")					| 98 												|
|	secondDiff("2021-09-06T14:39:11","2021-09-02T12:30:10") 			| 353341										|
|	millisecondDiff("2021-09-06T14:39:11","2021-09-02T12:30:10") 	| 353341000 								|
|	dayToDate(2000) 																							| 1975-06-24T00:00:00.000Z 	|
|	hourToDate(2000)																							| 1970-03-25T08:00:00.000Z 	|
|	secondToDate(2000)																						| 1970-01-01T00:33:20.000Z 	|
|	millisecondToDate(2000) 																			| 1970-01-01T00:00:02.000Z 	|

## Definition

### curTime

- description: Get the current time
- deterministic: true
- return: Date

### today

- description: Get the current date
- deterministic: true
- return: Date

### now

- description: Get the current datetime
- deterministic: true
- return: Date

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
