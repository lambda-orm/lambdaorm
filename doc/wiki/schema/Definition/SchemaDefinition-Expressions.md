# Expressions on Schema

All the queries that are used for the definition of conditions and for the execution of actions are based on the expression engine [3xpr](https://www.npmjs.com/package/3xpr)

In addition to the operations and functions defined in [3xpr](https://www.npmjs.com/package/3xpr) lambdaorm extends the expression model with the following functions.

## General functions

| Function 																	| Description 														|
| ----------------------------------------- | --------------------------------------- |
| toBase64(value:string):string 						| Encode a string to base64 							|
| getBase64(value:string):string 						| Decode a base64 string 									|
| encrypt(value:string,key:string):string 	| Encrypt a string with a key 						|
| decrypt(value:string,key:string):string 	| Decrypt a string with a key 						|

**Example of use:**

In this example, **encrypt** is used to save the encrypted email in the database and **decrypt** is used to obtain the decrypted email when returning the results.

```yaml
domain:
  entities:
    ...
    - name: Users
      view: true
      extends: Basics
      primaryKey: ["username"]
      uniqueKey: ["email"]
      properties:
        - name: username
          length: 32
          required: true
        - name: firstname
          required: true
        - name: lastname
          required: true
        - name: fullmane
          view: true
          readExp: concat(lastname,", ",firstname)
        - name: email
          required: true
          length: 255
          writeValue: encrypt(lower(email),"${USERS_SECRET_KEY}")
          readValue: decrypt(email,"${USERS_SECRET_KEY}")
    ...      
```

## **Orm** class methods

| Functions 																					| Description 															|
| ----------------------------------------------------| ------------------------------------------|
| orm.execute(query:string,data:any,options:any):any 	| Execute an query and return the result 		|
| orm.plan(query:string,options:any):any 							| Return the execution plan of the query 		|
| orm.metadata(query:string):any 											| Return the metadata of the query 					|
| orm.model(query:string):any 												| Return the model of the query 						|
| orm.parameters(query:string):any 										| Return the parameters of the query 				|
| orm.constraints(query:string):any 									| Return the constraints of the query 			|

**Example of use:**

In this example **orm.execute** is used to execute the same query that was executed in the default and cqrs stages but in the insights stage.
This is used to implement the CQRS pattern.

```yaml
...
application:
  listeners:
  - name: syncInsights
    on: [insert, bulkInsert, update, delete]
    condition: options.stage.in("default","cqrs")
    after: orm.execute(query,data,{stage:"insights"}) 
```

View in [CLI - northwind CQRS lab](https://github.com/lambda-orm/lambdaorm-labs/tree/main/labs/cli/08-northwind-cqrs)
