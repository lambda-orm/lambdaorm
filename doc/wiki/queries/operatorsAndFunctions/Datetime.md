|Function    			|Description                                   	|
|-----------------|-----------------------------------------------|
|curTime					|Get the current time														|
|today						|Get the current date														|
|now							|Get the current dateTime												|
|dateToString			|Convert date to string with ISO 8601 format		|
|time							|Convert string to time													|
|date							|Convert string to date													|
|dateTime					|Convert string to dateTime											|
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

| Example                                   																																					| Result 																	|
|---------------------------------------------------------------------------------------------------------------------|-----------------------------------------|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:today()})																											|[{"result":"2022-08-14T22:00:00.000Z"}]	|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:now()})																												|[{"result":"2022-08-15T09:54:22.000Z"}]	|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:curTime()})																										|[{"result":"11:54:22"}]									|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:time("2021-09-06T14:39:11.444Z")})															|[{"result":"00:20:21"}]									|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:date("2021-09-06T14:39:11.444Z")})															|[{"result":"2021-09-05T22:00:00.000Z"}]	|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:dateTime("2021-09-06T14:39:11.444Z")})													|[{"result":"2021-09-06T12:39:11.000Z"}]	|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:dateToString(dateTime("2021-09-06T14:39:11.444Z"))})						|[{"result":"2021-09-06T14:39:11Z"}]			|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:year("2021-09-06T14:39:11.444Z")})															|[{"result":2021}]												|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:month("2021-09-06T14:39:11.444Z")})														|[{"result":9}]														|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:day("2021-09-06T14:39:11.444Z")})															|[{"result":6}]														|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:weekday("2021-09-06T14:39:11.444Z")})													|[{"result":2}]														|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:hour("2021-09-06T14:39:11.444Z")})															|[{"result":0}]														|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:minute("2021-09-06T14:39:11.444Z")})														|[{"result":20}]													|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:second("2021-09-06T14:39:11.444Z")})														|[{"result":21}]													|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:millisecond("2021-09-06T14:39:11.444Z")})											|[{"result":0}]														|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:addYear("2021-09-06T14:39:11.444Z",2)})												|[{"result":"2023-09-06 14:39:11.444000"}]|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:addMonth("2021-09-06T14:39:11.444Z",2)})												|[{"result":"2021-11-06 14:39:11.444000"}]|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:addDay("2021-09-06T14:39:11.444Z",2)})													|[{"result":"2021-09-08 14:39:11.444000"}]|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:addHour("2021-09-06T14:39:11.444Z",2)})												|[{"result":"2021-09-06 16:39:11.444000"}]|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:addMinute("2021-09-06T14:39:11.444Z",2)})											|[{"result":"2021-09-06 14:41:11.444000"}]|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:addSecond("2021-09-06T14:39:11.444Z",2)})											|[{"result":"2021-09-06 14:39:13.444000"}]|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:addMillisecond("2021-09-06T14:39:11.444Z",2)})									|[{"result":"2021-09-06 14:39:11.446000"}]|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:addTime("2021-09-06T14:39:11.444Z","08:22:12")})								|[{"result":"08:42:33"}]									|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:subtractTime("2021-09-06T14:39:11.444Z","08:22:12")})					|[{"result":"-08:01:51"}]									|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:dayDiff("2021-09-06T14:39:11","2021-09-02T12:30:10")})					|[{"result":4}]														|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:hourDiff("2021-09-06T14:39:11","2021-09-02T12:30:10")})				|[{"result":98}]													|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:secondDiff("2021-09-06T14:39:11","2021-09-02T12:30:10")})			|[{"result":353341}]											|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:millisecondDiff("2021-09-06T14:39:11","2021-09-02T12:30:10")})	|[{"result":353341000}]										|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:dayToDate(2000)})																							|[{"result":"1975-06-24T00:00:00Z"}]			|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:hourToDate(2000)})																							|[{"result":"1970-03-25T08:00:00Z"}]			|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:secondToDate(2000)})																						|[{"result":"1970-01-01T00:33:20Z"}]			|
|Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:millisecondToDate(2000)})																			|[{"result":"1970-01-01T00:00:02Z"}]			|

## Sentences

**Lambda:**

Query to select the current date from the Countries entity where the iso3 is equal to "BRA".

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:today()})
```

**SQL Result:**

```sql
SELECT CURDATE() AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to select the current dateTime from the Countries entity where the iso3 is equal to "BRA".

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:now()})
```

**SQL Result:**

```sql
SELECT NOW() AS result 
FROM Countries c 
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to select the current time from the Countries entity where the iso3 is equal to "BRA".

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:curTime()})
```

**SQL Result:**

```sql
SELECT CURTIME() AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to select the time from the Countries entity where the iso3 is equal to "BRA".

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:time("2021-09-06T14:39:11.444Z")})
```

**SQL Result:**

```sql
SELECT CONVERT('2021-09-06T14:39:11.444Z', TIME) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to select the date from the Countries entity where the iso3 is equal to "BRA".

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:date("2021-09-06T14:39:11.444Z")})
```

**SQL Result:**

```sql
SELECT CONVERT('2021-09-06T14:39:11.444Z', DATE) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to select the dateTime from the Countries entity where the iso3 is equal to "BRA".

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:dateTime("2021-09-06T14:39:11.444Z")})
```

**SQL Result:**

```sql
SELECT CONVERT('2021-09-06T14:39:11.444Z', DATETIME) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to select the date as string from the Countries entity where the iso3 is equal to "BRA".

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:dateToString(dateTime("2021-09-06T14:39:11.444Z"))})
```

**SQL Result:**

```sql
SELECT DATE_FORMAT(CONVERT('2021-09-06T14:39:11.444Z', DATETIME), '%Y-%m-%dT%TZ') AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to select the year from the Countries entity where the iso3 is equal to "BRA".

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:year("2021-09-06T14:39:11.444Z")})
```

**SQL Result:**

```sql
SELECT EXTRACT(YEAR 
FROM '2021-09-06T14:39:11.444Z') AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to select the month from the Countries entity where the iso3 is equal to "BRA".

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:month("2021-09-06T14:39:11.444Z")})
```

**SQL Result:**

```sql
SELECT EXTRACT(MONTH FROM '2021-09-06T14:39:11.444Z') AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to select the day from the Countries entity where the iso3 is equal to "BRA".

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:day("2021-09-06T14:39:11.444Z")})
```

**SQL Result:**

```sql
SELECT DAYOFMONTH('2021-09-06T14:39:11.444Z') AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to select the date of week from the Countries entity where the iso3 is equal to "BRA".

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:weekday("2021-09-06T14:39:11.444Z")})
```

**SQL Result:**

```sql
SELECT DAYOFWEEK('2021-09-06T14:39:11.444Z') AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to select the hour from the Countries entity where the iso3 is equal to "BRA".

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:hour("2021-09-06T14:39:11.444Z")})
```

**SQL Result:**

```sql
SELECT EXTRACT(HOUR FROM '2021-09-06T14:39:11.444Z') AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to select the minute from the Countries entity where the iso3 is equal to "BRA".

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:minute("2021-09-06T14:39:11.444Z")})
```

**SQL Result:**

```sql
SELECT EXTRACT(MINUTE FROM '2021-09-06T14:39:11.444Z') AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to select the second from the Countries entity where the iso3 is equal to "BRA".

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:second("2021-09-06T14:39:11.444Z")})
```

**SQL Result:**

```sql
SELECT EXTRACT(SECOND FROM '2021-09-06T14:39:11.444Z') AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to select the millisecond from the Countries entity where the iso3 is equal to "BRA".

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:millisecond("2021-09-06T14:39:11.444Z")})
```

**SQL Result:**

```sql
SELECT ROUND(EXTRACT(MICROSECOND FROM '2021-09-06T14:39:11.444Z')/1000,0) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to add years to a date from the Countries entity where the iso3 is equal to "BRA".

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:addYear("2021-09-06T14:39:11.444Z",2)})
```

**SQL Result:**

```sql
SELECT DATE_ADD('2021-09-06T14:39:11.444Z', INTERVAL 2 YEAR) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to add months to a date from the Countries entity where the iso3 is equal to "BRA".

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:addMonth("2021-09-06T14:39:11.444Z",2)})
```

**SQL Result:**

```sql
SELECT DATE_ADD('2021-09-06T14:39:11.444Z', INTERVAL 2 MONTH) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to add days to a date from the Countries entity where the iso3 is equal to "BRA".

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:addDay("2021-09-06T14:39:11.444Z",2)})
```

**SQL Result:**

```sql
SELECT DATE_ADD('2021-09-06T14:39:11.444Z', INTERVAL 2 DAY) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to add hours to a date from the Countries entity where the iso3 is equal to "BRA".

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:addHour("2021-09-06T14:39:11.444Z",2)})
```

**SQL Result:**

```sql
SELECT '2021-09-06T14:39:11.444Z' + interval '2' HOUR AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to add minutes to a date from the Countries entity where the iso3 is equal to "BRA".

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:addMinute("2021-09-06T14:39:11.444Z",2)})
```

**SQL Result:**

```sql
SELECT '2021-09-06T14:39:11.444Z' + interval '2' MINUTE AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to add seconds to a date from the Countries entity where the iso3 is equal to "BRA".

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:addSecond("2021-09-06T14:39:11.444Z",2)})
```

**SQL Result:**

```sql
SELECT '2021-09-06T14:39:11.444Z' + interval '2' SECOND AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to add milliseconds to a date from the Countries entity where the iso3 is equal to "BRA".

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:addMillisecond("2021-09-06T14:39:11.444Z",2)})
```

**SQL Result:**

```sql
SELECT DATE_ADD('2021-09-06T14:39:11.444Z', INTERVAL (2 * 1000) MICROSECOND) AS result 
FROM Countries c 
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to add time to a date from the Countries entity where the iso3 is equal to "BRA".

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:addTime("2021-09-06T14:39:11.444Z","08:22:12")})
```

**SQL Result:**

```sql
SELECT ADDTIME('2021-09-06T14:39:11.444Z','08:22:12') AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to subtract time to a date from the Countries entity where the iso3 is equal to "BRA".

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:subtractTime("2021-09-06T14:39:11.444Z","08:22:12")})
```

**SQL Result:**

```sql
SELECT SUBTIME('2021-09-06T14:39:11.444Z','08:22:12') AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the difference between two dates in days from the Countries entity where the iso3 is equal to "BRA".

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:dayDiff("2021-09-06T14:39:11","2021-09-02T12:30:10")})
```

**SQL Result:**

```sql
SELECT DATEDIFF('2021-09-06T14:39:11','2021-09-02T12:30:10') AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the difference between two dates in hours from the Countries entity where the iso3 is equal to "BRA".

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:hourDiff("2021-09-06T14:39:11","2021-09-02T12:30:10")})
```

**SQL Result:**

```sql
SELECT TIMESTAMPDIFF(HOUR, '2021-09-02T12:30:10','2021-09-06T14:39:11') AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the difference between two dates in seconds from the Countries entity where the iso3 is equal to "BRA".

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:secondDiff("2021-09-06T14:39:11","2021-09-02T12:30:10")})
```

**SQL Result:**

```sql
SELECT TIMESTAMPDIFF(SECOND, '2021-09-02T12:30:10','2021-09-06T14:39:11') AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:millisecondDiff("2021-09-06T14:39:11","2021-09-02T12:30:10")})
```

**SQL Result:**

```sql
SELECT ROUND(TIMESTAMPDIFF(MICROSECOND, '2021-09-02T12:30:10','2021-09-06T14:39:11')/1000,0) AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the date from days from the Countries entity where the iso3 is equal to "BRA".

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:dayToDate(2000)})
```

**SQL Result:**

```sql
SELECT DATE_FORMAT(FROM_UNIXTIME(2000*24*3600), '%Y-%m-%dT%TZ') AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the date from hours from the Countries entity where the iso3 is equal to "BRA".

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:hourToDate(2000)})
```

**SQL Result:**

```sql
SELECT DATE_FORMAT(FROM_UNIXTIME(2000*3600), '%Y-%m-%dT%TZ') AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the date from seconds from the Countries entity where the iso3 is equal to "BRA".

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:secondToDate(2000)})
```

**SQL Result:**

```sql
SELECT DATE_FORMAT(FROM_UNIXTIME(2000), '%Y-%m-%dT%TZ') AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

**Lambda:**

Query to get the date from milliseconds from the Countries entity where the iso3 is equal to "BRA".

```js
Countries.filter(p=> p.iso3 == "BRA").map(p=> {result:millisecondToDate(2000)})
```

**SQL Result:**

```sql
SELECT DATE_FORMAT(FROM_UNIXTIME(2000/1000), '%Y-%m-%dT%TZ') AS result 
FROM Countries c  
WHERE c.iso3 = 'BRA' 
```

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

- description: Get the current dateTime
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
