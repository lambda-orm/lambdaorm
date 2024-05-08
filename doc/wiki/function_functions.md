|Function    |Description                                   |
|------------|----------------------------------------------|
|sleep|Sleeps for the specified number of milliseconds|
|console|Prints to console|
|between|Between|
|includes|Includes|
|in|In|
|like|String contains pattern|
|isNull|Check if value is null|
|isNotNull|Check if value is not null|
|isEmpty|Check if value is empty|
|isNotEmpty|Check if value is not empty|
|isBoolean|Check if value is boolean|
|isNumber|Check if value is number|
|isInteger|Check if value is integer|
|isDecimal|Check if value is decimal|
|isString|Check if value is string|
|isDate|Check if value is date|
|isDateTime|Check if value is date time|
|isTime|Check if value is time|
|isObject|Check if value is object|
|isArray|Check if value is array|
|isBooleanFormat|Check if value is boolean format|
|isNumberFormat|Check if value is number format|
|isIntegerFormat|Check if value is integer format|
|isDecimalFormat|Check if value is decimal format|
|isDateFormat|Check if value is date format|
|isDateTimeFormat|Check if value is date time format|
|isTimeFormat|Check if value is time format|
|nvl|Null value|
|nvl2|Null value|
|abs|Absolute value|
|acos|Arc cosine|
|asin|Arc sine|
|atan|Arc tangent|
|atan2|Arc tangent of two variables|
|ceil|Ceiling|
|cos|Cosine|
|cosh|Hyperbolic cosine|
|exp|Exponential|
|floor|Floor|
|ln|Natural logarithm|
|log10|Base 10 logarithm|
|log|Natural logarithm|
|remainder|Remainder|
|round|Round|
|sign|Sign|
|sin|Sine|
|sinh|Hyperbolic sine|
|tan|Tangent|
|tanh|Hyperbolic tangent|
|trunc|Truncate|
|chr|Character|
|capitalize|Capitalize|
|endsWith|Ends with|
|strCount|Count|
|lower|Lower case|
|lpad|Left pad|
|ltrim|Left trim|
|indexOf|Index of|
|join|Join|
|replace|Replace|
|rpad|Right pad|
|rtrim|Right trim|
|substring|Substring|
|trim|Trim|
|upper|Upper case|
|concat|Concatenate|
|test|Test|
|title|Title case|
|match|Match|
|mask|Mask sensitive data|
|split|Split string|
|startWith|Starts with|
|map|Map|
|foreach|Foreach|
|filter|Filter|
|reverse|Reverse|
|sort|Sort|
|remove|Remove|
|push|Push|
|bulkInsert|Bulk Insert|
|pop|Pop|
|length|Length|
|slice|Slice|
|page|Paging|
|distinct|Distinct|
|first|First|
|last|Last|
|count|Count|
|max|Max|
|min|Min|
|avg|Average|
|sum|Sum|
|curTime|Current time|
|today|Current date|
|now|Current date time|
|time|Get time|
|date|Get date|
|dateTime|Get date time|
|year|Get year|
|month|Get month|
|day|Get day|
|weekday|Get day of week|
|hour|Get hours|
|minute|Get minutes|
|second|Get seconds|
|millisecond|Get milliseconds|
|addYear|Add years|
|addMonth|Add months|
|addDay|Add days|
|addHour|Add hours|
|addMinute|Add minutes|
|addSecond|Add seconds|
|addMillisecond|Add milliseconds|
|addTime|Add time|
|subtractTime|Subtract time|
|yearDiff|Year difference|
|dayDiff|Day difference|
|hourDiff|Hour difference|
|secondDiff|Second difference|
|millisecondDiff|Millisecond difference|
|dayToDate|Convert days to date time|
|hourToDate|Convert hours to date time|
|secondToDate|Convert seconds to date time|
|millisecondToDate|Convert milliseconds to date time|
|toString|Convert to string|
|toNumber|Convert to number|
|dateToString|Convert date to string|
|stringify|Convert to JSON string|
|parse|Parse JSON string|
|keys|Object keys|
|values|Object values|
|entries|Object entries|
|fromEntries|Object from entries|
|union|Union|
|intersection|Intersection|
|difference|Difference|
|symmetricDifference|Symmetric Difference|
|toBase64|Convert a string to base64|
|getBase64|Get a string from base64|
|encrypt|Encrypt a string|
|decrypt|Decrypt a string|
|update|Update a list|
|updateAll|Update all items in a list|
|deleteAll|Delete all items in a list|
|merge|Merge a list|
|bulkMerge|Bulk merge a list|
|having|Having a list|
|include|Include a list|
|desc|Descending|
|asc|Ascending|
|orm.execute|Execute query|
|orm.plan|Plan of query|
|orm.metadata|Get metadata from query|
|orm.model|Get model from query|
|orm.parameters|Get parameters from query|
|orm.constraints|Get constraints from query|
|contains|Includes|
|substr|Substring|
|concatenate|Concatenate|
|startsWith|Starts with|
|select|Map|
|each|Foreach|
|where|Filter|
|order|Sort|
|delete|Remove|
|insert|Push|
|len|Length|

## Definition

### sleep

- description: Sleeps for the specified number of milliseconds
- deterministic: true
- return: void
- params:
	- ms?: number

### console

- description: Prints to console
- deterministic: true
- return: void
- params:
	- value: any

### between

- description: Between
- deterministic: true
- return: boolean
- params:
	- value: T
	- from: T
	- to: T

### includes

- description: Includes
- deterministic: true
- return: boolean
- params:
	- source: string|T[]
	- value: string|T

### in

- description: In
- deterministic: true
- return: boolean
- params:
	- source: T
	- values: T

### like

- description: String contains pattern
- deterministic: true
- return: boolean
- params:
	- value: string
	- pattern: string

### isNull

- description: Check if value is null
- deterministic: true
- return: boolean
- params:
	- value: any

### isNotNull

- description: Check if value is not null
- deterministic: true
- return: boolean
- params:
	- value: any

### isEmpty

- description: Check if value is empty
- deterministic: true
- return: boolean
- params:
	- value: string

### isNotEmpty

- description: Check if value is not empty
- deterministic: true
- return: boolean
- params:
	- value: string

### isBoolean

- description: Check if value is boolean
- deterministic: true
- return: boolean
- params:
	- value: any

### isNumber

- description: Check if value is number
- deterministic: true
- return: boolean
- params:
	- value: any

### isInteger

- description: Check if value is integer
- deterministic: true
- return: boolean
- params:
	- value: any

### isDecimal

- description: Check if value is decimal
- deterministic: true
- return: boolean
- params:
	- value: any

### isString

- description: Check if value is string
- deterministic: true
- return: boolean
- params:
	- value: any

### isDate

- description: Check if value is date
- deterministic: true
- return: boolean
- params:
	- value: any

### isDateTime

- description: Check if value is date time
- deterministic: true
- return: boolean
- params:
	- value: any

### isTime

- description: Check if value is time
- deterministic: true
- return: boolean
- params:
	- value: any

### isObject

- description: Check if value is object
- deterministic: true
- return: boolean
- params:
	- value: any

### isArray

- description: Check if value is array
- deterministic: true
- return: boolean
- params:
	- value: any

### isBooleanFormat

- description: Check if value is boolean format
- deterministic: true
- return: boolean
- params:
	- value: string

### isNumberFormat

- description: Check if value is number format
- deterministic: true
- return: boolean
- params:
	- value: string

### isIntegerFormat

- description: Check if value is integer format
- deterministic: true
- return: boolean
- params:
	- value: string

### isDecimalFormat

- description: Check if value is decimal format
- deterministic: true
- return: boolean
- params:
	- value: string

### isDateFormat

- description: Check if value is date format
- deterministic: true
- return: boolean
- params:
	- value: string

### isDateTimeFormat

- description: Check if value is date time format
- deterministic: true
- return: boolean
- params:
	- value: string

### isTimeFormat

- description: Check if value is time format
- deterministic: true
- return: boolean
- params:
	- value: string

### nvl

- description: Null value
- deterministic: true
- return: T
- params:
	- value: T
	- default: T

### nvl2

- description: Null value
- deterministic: true
- return: T
- params:
	- value: any
	- a: T
	- b: T

### abs

- description: Absolute value
- deterministic: true
- return: number
- params:
	- x: number

### acos

- description: Arc cosine
- deterministic: true
- return: number
- params:
	- x: number

### asin

- description: Arc sine
- deterministic: true
- return: number
- params:
	- x: number

### atan

- description: Arc tangent
- deterministic: true
- return: number
- params:
	- x: number

### atan2

- description: Arc tangent of two variables
- deterministic: true
- return: number
- params:
	- x: number

### ceil

- description: Ceiling
- deterministic: true
- return: number
- params:
	- x: number

### cos

- description: Cosine
- deterministic: true
- return: number
- params:
	- x: number

### cosh

- description: Hyperbolic cosine
- deterministic: true
- return: number
- params:
	- x: number

### exp

- description: Exponential
- deterministic: true
- return: number
- params:
	- x: number

### floor

- description: Floor
- deterministic: true
- return: number
- params:
	- x: number

### ln

- description: Natural logarithm
- deterministic: true
- return: number
- params:
	- x: number

### log10

- description: Base 10 logarithm
- deterministic: true
- return: number
- params:
	- x: number

### log

- description: Natural logarithm
- deterministic: true
- return: number
- params:
	- x: number

### remainder

- description: Remainder
- deterministic: true
- return: number
- params:
	- n1: number
	- n2: number

### round

- description: Round
- deterministic: true
- return: number
- params:
	- num: number
	- decimals: 0

### sign

- description: Sign
- deterministic: true
- return: number
- params:
	- x: number

### sin

- description: Sine
- deterministic: true
- return: number
- params:
	- x: number

### sinh

- description: Hyperbolic sine
- deterministic: true
- return: number
- params:
	- x: number

### tan

- description: Tangent
- deterministic: true
- return: number
- params:
	- x: number

### tanh

- description: Hyperbolic tangent
- deterministic: true
- return: number
- params:
	- x: number

### trunc

- description: Truncate
- deterministic: true
- return: number
- params:
	- x: number

### chr

- description: Character
- deterministic: true
- return: string
- params:
	- ascii: number

### capitalize

- description: Capitalize
- deterministic: true
- return: string
- params:
	- value: string

### endsWith

- description: Ends with
- deterministic: true
- return: boolean
- params:
	- value: string
	- sub: string
	- start: number

### strCount

- description: Count
- deterministic: true
- return: number
- params:
	- source: string
	- value: string

### lower

- description: Lower case
- deterministic: true
- return: string
- params:
	- value: string

### lpad

- description: Left pad
- deterministic: true
- return: string
- params:
	- value: string
	- len: number
	- pad: string

### ltrim

- description: Left trim
- deterministic: true
- return: string
- params:
	- value: string

### indexOf

- description: Index of
- deterministic: true
- return: number
- params:
	- value: string
	- sub: string
	- start: number

### join

- description: Join
- deterministic: true
- return: string
- params:
	- values: string[]
	- separator: string
	- : "

### replace

- description: Replace
- deterministic: true
- return: string
- params:
	- value: string
	- source: string
	- target: string

### rpad

- description: Right pad
- deterministic: true
- return: string
- params:
	- value: string
	- len: number
	- pad: string

### rtrim

- description: Right trim
- deterministic: true
- return: string
- params:
	- value: string

### substring

- description: Substring
- deterministic: true
- return: string
- params:
	- value: string
	- from: number
	- count: number

### trim

- description: Trim
- deterministic: true
- return: string
- params:
	- value: string

### upper

- description: Upper case
- deterministic: true
- return: string
- params:
	- value: string

### concat

- description: Concatenate
- deterministic: true
- return: string
- params:
	- values: any

### test

- description: Test
- deterministic: true
- return: boolean
- params:
	- value: string
	- regexp: string

### title

- description: Title case
- deterministic: true
- return: string
- params:
	- value: string

### match

- description: Match
- deterministic: true
- return: any
- params:
	- value: string
	- regexp: string

### mask

- description: Mask sensitive data
- deterministic: true
- return: string
- params:
	- value: string

### split

- description: Split string
- deterministic: true
- return: string[]
- params:
	- value: string
	- separator: string
	- : "

### startWith

- description: Starts with
- deterministic: true
- return: boolean
- params:
	- value: string
	- sub: string
	- start: number

### map

- description: Map
- deterministic: true
- return: T[]
- params:
	- list: any[]
	- predicate: T

### foreach

- description: Foreach
- deterministic: true
- return: void
- params:
	- list: any[]
	- predicate: any

### filter

- description: Filter
- deterministic: true
- return: T[]
- params:
	- list: T[]
	- predicate: boolean

### reverse

- description: Reverse
- deterministic: true
- return: T[]
- params:
	- list: T[]
	- predicate: any

### sort

- description: Sort
- deterministic: true
- return: T[]
- params:
	- list: T[]
	- predicate: any

### remove

- description: Remove
- deterministic: true
- return: T[]
- params:
	- list: T[]
	- predicate: boolean

### push

- description: Push
- deterministic: true
- return: T[]
- params:
	- list: T[]
	- value: T

### bulkInsert

- description: Bulk Insert
- deterministic: true
- return: T[]
- params:
	- list: T[]
	- value: T[]

### pop

- description: Pop
- deterministic: true
- return: T
- params:
	- list: T[]

### length

- description: Length
- deterministic: true
- return: number
- params:
	- source: any[]|string

### slice

- description: Slice
- deterministic: true
- return: T[]
- params:
	- list: T[]
	- from: integer
	- to: integer

### page

- description: Paging
- deterministic: true
- return: T[]
- params:
	- list: T[]
	- page: integer
	- records: integer

### distinct

- description: Distinct
- deterministic: true
- return: any[]
- params:
	- list: any[]
	- predicate: any

### first

- description: First
- deterministic: true
- return: T
- params:
	- list: T[]
	- predicate: boolean

### last

- description: Last
- deterministic: true
- return: T
- params:
	- list: T[]
	- predicate: boolean

### count

- description: Count
- deterministic: true
- return: integer
- params:
	- list: T[]
	- predicate: boolean

### max

- description: Max
- deterministic: true
- return: T
- params:
	- list: T[]
	- predicate: boolean

### min

- description: Min
- deterministic: true
- return: T
- params:
	- list: T[]
	- predicate: boolean

### avg

- description: Average
- deterministic: true
- return: number
- params:
	- list: T[]
	- value: number

### sum

- description: Sum
- deterministic: true
- return: number
- params:
	- list: T[]
	- value: number

### curTime

- description: Current time
- deterministic: true
- return: time
- params:
	- : any

### today

- description: Current date
- deterministic: true
- return: date
- params:
	- : any

### now

- description: Current date time
- deterministic: true
- return: dateTime
- params:
	- : any

### time

- description: Get time
- deterministic: true
- return: time
- params:
	- value: string

### date

- description: Get date
- deterministic: true
- return: date
- params:
	- value: string

### dateTime

- description: Get date time
- deterministic: true
- return: dateTime
- params:
	- value: string

### year

- description: Get year
- deterministic: true
- return: integer
- params:
	- value: dateTime

### month

- description: Get month
- deterministic: true
- return: integer
- params:
	- value: dateTime

### day

- description: Get day
- deterministic: true
- return: integer
- params:
	- value: dateTime

### weekday

- description: Get day of week
- deterministic: true
- return: integer
- params:
	- value: dateTime

### hour

- description: Get hours
- deterministic: true
- return: integer
- params:
	- value: dateTime

### minute

- description: Get minutes
- deterministic: true
- return: integer
- params:
	- value: dateTime

### second

- description: Get seconds
- deterministic: true
- return: integer
- params:
	- value: dateTime

### millisecond

- description: Get milliseconds
- deterministic: true
- return: integer
- params:
	- value: dateTime

### addYear

- description: Add years
- deterministic: true
- return: dateTime
- params:
	- date: dateTime
	- value: number

### addMonth

- description: Add months
- deterministic: true
- return: dateTime
- params:
	- date: dateTime
	- value: number

### addDay

- description: Add days
- deterministic: true
- return: dateTime
- params:
	- date: dateTime
	- value: number

### addHour

- description: Add hours
- deterministic: true
- return: dateTime
- params:
	- date: dateTime
	- value: number

### addMinute

- description: Add minutes
- deterministic: true
- return: dateTime
- params:
	- date: dateTime
	- value: number

### addSecond

- description: Add seconds
- deterministic: true
- return: dateTime
- params:
	- date: dateTime
	- value: number

### addMillisecond

- description: Add milliseconds
- deterministic: true
- return: dateTime
- params:
	- date: dateTime
	- value: number

### addTime

- description: Add time
- deterministic: true
- return: dateTime
- params:
	- date: dateTime
	- time: time

### subtractTime

- description: Subtract time
- deterministic: true
- return: dateTime
- params:
	- date: dateTime
	- time: time

### yearDiff

- description: Year difference
- deterministic: true
- return: integer
- params:
	- date1: dateTime
	- date2: dateTime

### dayDiff

- description: Day difference
- deterministic: true
- return: integer
- params:
	- date1: dateTime
	- date2: dateTime

### hourDiff

- description: Hour difference
- deterministic: true
- return: integer
- params:
	- date1: dateTime
	- date2: dateTime

### secondDiff

- description: Second difference
- deterministic: true
- return: integer
- params:
	- date1: dateTime
	- date2: dateTime

### millisecondDiff

- description: Millisecond difference
- deterministic: true
- return: integer
- params:
	- date1: dateTime
	- date2: dateTime

### dayToDate

- description: Convert days to date time
- deterministic: true
- return: dateTime
- params:
	- value: number

### hourToDate

- description: Convert hours to date time
- deterministic: true
- return: dateTime
- params:
	- value: number

### secondToDate

- description: Convert seconds to date time
- deterministic: true
- return: dateTime
- params:
	- value: number

### millisecondToDate

- description: Convert milliseconds to date time
- deterministic: true
- return: dateTime
- params:
	- value: number

### toString

- description: Convert to string
- deterministic: true
- return: string
- params:
	- value: any

### toNumber

- description: Convert to number
- deterministic: true
- return: number
- params:
	- value: any

### dateToString

- description: Convert date to string
- deterministic: true
- return: string
- params:
	- date: date

### stringify

- description: Convert to JSON string
- deterministic: true
- return: string
- params:
	- value: any

### parse

- description: Parse JSON string
- deterministic: true
- return: any
- params:
	- value: string

### keys

- description: Object keys
- deterministic: true
- return: string[]
- params:
	- obj: any

### values

- description: Object values
- deterministic: true
- return: any[]
- params:
	- obj: any

### entries

- description: Object entries
- deterministic: true
- return: [string,any][]
- params:
	- obj: any

### fromEntries

- description: Object from entries
- deterministic: true
- return: any
- params:
	- entries: [string
	- : any][]

### union

- description: Union
- deterministic: true
- return: T[]
- params:
	- a: T[]
	- b: T[]

### intersection

- description: Intersection
- deterministic: true
- return: T[]
- params:
	- a: T[]
	- b: T[]

### difference

- description: Difference
- deterministic: true
- return: T[]
- params:
	- a: T[]
	- b: T[]

### symmetricDifference

- description: Symmetric Difference
- deterministic: true
- return: T[]
- params:
	- a: T[]
	- b: T[]

### toBase64

- description: Convert a string to base64
- deterministic: true
- return: string
- params:
	- value: string

### getBase64

- description: Get a string from base64
- deterministic: true
- return: string
- params:
	- value: string

### encrypt

- description: Encrypt a string
- deterministic: true
- return: string
- params:
	- value: string

### decrypt

- description: Decrypt a string
- deterministic: true
- return: string
- params:
	- value: string

### update

- description: Update a list
- deterministic: true
- return: any
- params:
	- list: any[]
	- predicate: any

### updateAll

- description: Update all items in a list
- deterministic: true
- return: any
- params:
	- list: any[]
	- predicate: any

### deleteAll

- description: Delete all items in a list
- deterministic: true
- return: any
- params:
	- list: any[]

### merge

- description: Merge a list
- deterministic: true
- return: any
- params:
	- list: any[]
	- predicate: any

### bulkMerge

- description: Bulk merge a list
- deterministic: true
- return: any
- params:
	- list: any[]
	- predicate: any

### having

- description: Having a list
- deterministic: true
- return: T[]
- params:
	- list: T[]
	- predicate: boolean

### include

- description: Include a list
- deterministic: true
- return: any
- params:
	- list: any[]
	- predicate: any

### desc

- description: Descending
- deterministic: true
- return: void
- params:
	- value: any

### asc

- description: Ascending
- deterministic: true
- return: void
- params:
	- value: any

### orm.execute

- description: Execute query
- deterministic: true
- return: any
- params:
	- query: string
	- data: any
	- options: any

### orm.plan

- description: Plan of query
- deterministic: true
- return: any
- params:
	- query: string
	- options: any

### orm.metadata

- description: Get metadata from query
- deterministic: true
- return: any
- params:
	- query: string

### orm.model

- description: Get model from query
- deterministic: true
- return: any
- params:
	- query: string

### orm.parameters

- description: Get parameters from query
- deterministic: true
- return: any
- params:
	- query: string

### orm.constraints

- description: Get constraints from query
- deterministic: true
- return: any
- params:
	- query: string

### contains

- description: Includes
- deterministic: true
- return: boolean
- params:
	- source: string|T[]
	- value: string|T

### substr

- description: Substring
- deterministic: true
- return: string
- params:
	- value: string
	- from: number
	- count: number

### concatenate

- description: Concatenate
- deterministic: true
- return: string
- params:
	- values: any

### startsWith

- description: Starts with
- deterministic: true
- return: boolean
- params:
	- value: string
	- sub: string
	- start: number

### select

- description: Map
- deterministic: true
- return: T[]
- params:
	- list: any[]
	- predicate: T

### each

- description: Foreach
- deterministic: true
- return: void
- params:
	- list: any[]
	- predicate: any

### where

- description: Filter
- deterministic: true
- return: T[]
- params:
	- list: T[]
	- predicate: boolean

### order

- description: Sort
- deterministic: true
- return: T[]
- params:
	- list: T[]
	- predicate: any

### delete

- description: Remove
- deterministic: true
- return: T[]
- params:
	- list: T[]
	- predicate: boolean

### insert

- description: Push
- deterministic: true
- return: T[]
- params:
	- list: T[]
	- value: T

### len

- description: Length
- deterministic: true
- return: number
- params:
	- source: any[]|string
