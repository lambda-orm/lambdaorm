# Lambda expressions

The [lambda expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) are written based on the programming language itself, referring to the business model, completely abstracting from the database language and its structure.

The purpose is to use javascript syntax to write query expressions. Which will be translated into the SQL statement corresponding to the database engine.

Example:

```ts
Countries.page(1,10).include(p => p.states.map(p=> [p.name,p.latitude,p.longitude] ))
```

The engine also allows us to write the expressions in a string.

```ts
'Countries.page(1,10).include(p => p.states.map(p=> [p.name,p.latitude,p.longitude] ))'
```

## Advantage:

 - Use of the same programming language.
 - It is not necessary to learn a new language.
 - Easy to write and understand expressions.
 - Use of the intellisense offered by the IDE to write the expressions.
 - Avoid syntax errors.

## Writing Expressions:

To write the expressions we use lambda methods, operators and functions.

### Lambda Methods:

Starting from the entity we have the following methods.

|Method    		|Description                                   										| SQL Equivalent								|																																								|
|:-----------|:-----------------------------------------------------------------|:------------------------------|:-----------------------------------------------------------------------------:|
|filter			 | To filter the records.																						| WHERE 												|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Select)		|
|having 		 | To filter on groupings.																					|	HAVING 												|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Select)		|
|map				 | To specify the fields to return. 																| SELECT 												|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Select)		|
|distinct		 | to specify the fields to return by sending duplicate records.		|																|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Select)		|
|first			 | returns the first record																					| SELECT + ORDER BY + LIMIT 		|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Select)		|
|last 		 	 | returns the last record																					|	SELECT + ORDER BY DESC + LIMIT|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Select)		|
|take 		 	 | returns one record																								|	SELECT +  LIMIT 							|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Select)		|
|sort				 | To specify the order in which the records are returned.					| ORDER BY 											|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Select)		|
|page				 | To paginate.																											| LIMIT  (MySQL)								|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Select)		|
|include		 | To get records of related entities																|																|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Include)	|
|insert			 | To insert records																								| INSERT												|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Update)		|
|update			 | To update records always including a filter											| UPDATE with WHERE							|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Update)		|
|updateAll	 | to be able to update all the records of an entity								| UPDATE without WHERE					|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Update)		|
|delete			 | To delete records always including a filter											| DELETE with WHERE							|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Delete)		|
|deleteAll	 | To be able to delete all records of an entity										| DELETE without WHERE					|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Delete)		|
|bulkinsert	 | to insert records in bulk																				| INSERT												|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-BulkInsert)|

There are no methods for the INNER JOIN clause since it is deduced when navigating through the relations of a property.

There are no methods for the GROUP BY clause since this is deduced when grouping methods are used.

### Operators

The operators used are the same as those of javascript.

below access to their documentation:

|Category    	|Operators                				|																																												|
|:------------|:-------------------------------:|:-------------------------------------------------------------------------------------:|
|Arithmectic 	| -, +, *, /, **, //, % 					| [more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Operators-Arithmectic) |
|Bitwise 			| ~,&,^,<<,>> 										| [more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Operators-Bitwise)			|
|Comparison 	| ==, ===, !=, !==, >, <, >=, <= 	| [more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Operators-Comparison)	|
|Logical 			| !, && 													| [more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Operators-Logical) 		|
|Array 				| [] 															| [more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Operatos-Array) 				|

### Functions

In the case of functions, some correspond to javascript functions and others are specific to sql

below access to their documentation:

|Category    	|functions                																						|																																												|
|:------------|:--------------------------------------------------------------------|--------------------------------------------------------------------------------------:|
|Numeric			|abs,ceil,cos,exp,ln,log,remainder,round,sign,sin,tan,trunc...				|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Functions-Numeric)			|
|String				|chr,lower,lpad,ltrim,replace,rpad,rtrim,substr,trim,upper,concat...	|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Functions-String)				|
|Datetime			|curtime,today,now,time,date,datetime,year,month,day,weekday,hours...	|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Functions-Datetime)			|
|Convert			|toString,toJson,toNumber																							|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Functions-Convert)			|
|Nullable			|nvl,nvl2,isNull,isNotNull																						|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Functions-Nullable)			|
|General			|as,distinct																													|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Functions-General)			|
|Sort					|asc,desc																															|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Function-Sort)					|
|Conditionals	|between,includes																											|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Functions-Conditionals)	|
|Group				|avg,count,first,last,max,min,sum																			|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Functions-Group)				|
|Metadata			|user,source																													|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Functions-Metadata)			|
