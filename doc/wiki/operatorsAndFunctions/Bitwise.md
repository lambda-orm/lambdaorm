|Operator |Description  |
|---------|-------------|
|~				|bitNot				|
|&				|bitAnd				|
|\|				|bitOr				|
|^				|bitXor				|
|<<				|leftShift		|
|>>				|rightShift		|

## Examples

| Example   																																| Result 													|
|---------------------------------------------------------------------------|---------------------------------|
|Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude & 1 })	|[{"result":1}]										|
|Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude | 1 })	|[{"result":18446744073709552000}]|
|Countries.filter(p=> p.iso3=="BRA").first(p=> {result: ~ p.longitude })		|[{"result":54}]									|
|Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude << 1 })	|[{"result":18446744073709552000}]|
|Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude ^ 1 })	|[{"result":18446744073709552000}]|
|Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude >> 1 })	|[{"result":9223372036854776000}]	|

## Sentences

```js
Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude & 1 })
```

```sql
SELECT c.longitude & 1 AS result FROM Countries c  WHERE c.iso3 = 'BRA' ORDER BY result asc  LIMIT 0,1 
```

```js
Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude | 1 })
```

```sql
SELECT c.longitude | 1 AS result FROM Countries c  WHERE c.iso3 = 'BRA' ORDER BY result asc  LIMIT 0,1 
```

```js
Countries.filter(p=> p.iso3=="BRA").first(p=> {result: ~ p.longitude })
```

```sql
SELECT ~ c.longitude AS result FROM Countries c  WHERE c.iso3 = 'BRA' ORDER BY result asc  LIMIT 0,1 
```

```js
Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude << 1 })
```

```sql
SELECT c.longitude << 1 AS result FROM Countries c  WHERE c.iso3 = 'BRA' ORDER BY result asc  LIMIT 0,1 
```

```js
Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude ^ 1 })
```

```sql
SELECT c.longitude ^ 1 AS result FROM Countries c  WHERE c.iso3 = 'BRA' ORDER BY result asc  LIMIT 0,1 
```

```js
Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude >> 1 })
```

```sql
SELECT c.longitude >> 1 AS result FROM Countries c  WHERE c.iso3 = 'BRA' ORDER BY result asc  LIMIT 0,1 
```

## Definition

### Operator ~

- description: bitNot
- return: boolean
- params:
	- value: boolean

### Operator &

- description: bitAnd
- return: number
- params:
	- a: number
	- b: number

### Operator |

- description: bitOr
- return: number
- params:
	- a: number
	- b: number

### Operator ^

- description: bitXor
- return: number
- params:
	- a: number
	- b: number

### Operator <<

- description: leftShift
- return: number
- params:
	- a: number
	- b: number

### Operator >>

- description: rightShift
- return: number
- params:
	- a: number
	- b: number
