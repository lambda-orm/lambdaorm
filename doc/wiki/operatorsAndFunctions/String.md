|Function   			|Description                                   																														|
|-----------------|---------------------------------------------------------------------------------------------------------|
|capitalize				|Make the first character have upper case and the rest lower case																					|
|chr							|Get character from ASCII code																																						|
|concat						|String concatenation																																											|
|initcap					|Capitalize words																																													|
|lower						|Lowercase string																																													|
|lpad							|Pad the left-side of string																																							|
|ltrim						|Remove leading chars																																											|
|replace					|Searches a string for a specified value and returns a new string where the specified values are replaced	|
|match						|Returns an array containing all matches, including capturing groups, or null if no matches are found			|
|mask							|General-purpose function that mask parts of arbitrary strings based on position within the string				|
|parse						|Parses a text string as JSON, optionally transforming the value produced by the parse.										|
|rpad							|Pad the right-side of string																																							|
|rtrim						|Remove trailing spaces																																										|
|substr substring	|Get a substring of string																																								|
|trim							|Remove characters																																												|
|upper						|Uppercase string																																													|
|strCount					|Count value in source																																										|
|stringify				|Convert a JavaScript object or value to a JSON text string.																							|
|template					|Are literal strings that enable the use of embedded expression																						|
|test							|Try a match on a string. Returns true or false																														|
|isEmpty					|Evaluate if it is empty																																									|
|toString					|Convert to string																																												|
|$ ${}					  |Get environment variable																																									|

## Examples

Context:

```js
const context = { firstName: 'Juan'
								, lastName: 'Lopez'
								, email: 'jlopez@email.com'
								, age: 44
								, food: 'pizza'
								, film: 'Estación central'
								, data: '{"b":1}'
								, coordinate: { lat: 48.87, long: 2.29 } 
								}
```

| Example                                   					| Result 																	|
|-----------------------------------------------------|-----------------------------------------|
|capitalize(food)																			|'Pizza'																	|
|chr(68)																							|'D'																			|
|concat(lastName,", ",firstName)											|'Lopez, Juan'														|
|initcap(film)																				|'Estación Central'												|
|lower(film)																					|'estación central'												|
|lpad(firstName,10,"_")																|'______Juan'															|
|ltrim("  a  ")																				|'a  '																		|
|replace(film,"a","*")																|'Est*ción centr*l'												|
|mask(email)																					|'jlo*****com'														|
|parse(data).b																				|1																				|
|rpad(firstName,10,"_")																|'Juan______'															|
|rtrim("  a  ")																				|'  a'																		|
|substr(film,1,3)																			|'st'																			|
|substring(film,1,3)																	|'st'																			|
|upper(film)																					|'ESTACIÓN CENTRAL'												|
|strCount(film,"a")																		|2																				|
|stringify(coordinate)																|'{"lat":48.87,"long":2.29}'							|
|toString(age)																				|'44'																			|
|`${firstName} is ${age} years old and likes ${food}`	|'Juan is 44 years old and likes pizza'		|
|test("5","[a-zA-Z0-9_.]+$")													|true																			|
|test("%","[a-zA-Z0-9_.]+$")													|false																		|
|isEmpty(a)																						|true																			|
|isEmpty(b)																						|true																			|
|isEmpty(c)																						|true																			|
|isEmpty(food)																				|false																		|
|$HOME																								|'/home/flavio'														|
|${USER}																							|'flavio'																	|
|concat($HOME,$USER)																	|'/home/flavioflavio'											|
|concat(${HOME},$USER)																|'/home/flavioflavio'											|
|`value of home: $HOME`																|'value of home: /home/flavio'						|

## Definition

### chr

- description: Get character from ASCII code
- deterministic: true
- return: string
- params:
	- ascii: number

### strCount

- description: Count value in source
- deterministic: true
- return: number
- params:
	- source: string
	- value: string

### initcap

- description: Capitalize words
- deterministic: true
- return: string
- params:
	- value: string

### lower

- description: Lowercase string
- deterministic: true
- return: string
- params:
	- value: string

### lpad

- description: Pad the left-side of string
- deterministic: true
- return: string
- params:
	- value: string
	- len: number
	- pad: string

### ltrim

- description: Remove leading chars
- deterministic: true
- return: string
- params:
	- value: string

### replace

- description: The replace() method searches a string for a specified value and returns a new string where the specified values are replaced.
- deterministic: true
- return: string
- params:
	- value: string
	- source: string
	- target: string

### rpad

- description: Pad the right-side of string
- deterministic: true
- return: string
- params:
	- value: string
	- len: number
	- pad: string

### rtrim

- description: Remove trailing spaces
- deterministic: true
- return: string
- params:
	- value: string

### substr

- description: Get a substring of string
- deterministic: true
- return: string
- params:
	- value: string
	- from: number
	- count: number

### substring

- description: Get a substring of string
- deterministic: true
- return: string
- params:
	- value: string
	- from: number
	- count: number

### trim

- description: Remove characters
- deterministic: true
- return: string
- params:
	- value: string

### upper

- description: Uppercase string
- deterministic: true
- return: string
- params:
	- value: string

### concat

- description: String concatenation
- deterministic: true
- return: string
- params:
	- values: string

### capitalize

- description: Make the first character have upper case and the rest lower case
- deterministic: true
- return: string
- params:
	- value: string

### test

- description: Try a match on a string. Returns true or false.
- deterministic: true
- return: boolean
- params:
	- value: any
	- regexp: string

### match

- description: Returns an array containing all matches, including capturing groups, or null if no matches are found.
- deterministic: true
- return: boolean
- params:
	- value: string
	- regexp: string

### mask

- description: General-purpose function that mask parts of arbitrary strings based on position within the string
- deterministic: true
- return: string
- params:
	- value: string

### stringify

- description: Convert a JavaScript object or value to a JSON text string.
- deterministic: true
- return: string
- params:
	- value: any

### parse

- description: Parses a text string as JSON, optionally transforming the value produced by the parse.
- deterministic: true
- return: any
- params:
	- value: string

### isEmpty

- description: Evaluate if it is empty
- deterministic: true
- return: boolean
- params:
	- value: any

### toString

- description: convert to string
- deterministic: true
- return: string
- params:
	- value: any
