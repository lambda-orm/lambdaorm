# Expressions on Schema

All the expressions that are used for the definition of conditions and for the execution of actions are based on the expression engine [3xpr](https://www.npmjs.com/package/3xpr)

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

| Functions 																										| Description 																			|
| --------------------------------------------------------- | ------------------------------------------------------|
| orm.execute(expression:string,data:any,options:any):any 	| Execute an expression and return the result 					|
| orm.plan(expression:string,options:any):any 							| Return the execution plan of the expression 					|
| orm.metadata(expression:string):any 											| Return the metadata of the expression 								|
| orm.model(expression:string):any 													| Return the model of the expression 										|
| orm.parameters(expression:string):any 										| Return the parameters of the expression 							|
| orm.constraints(expression:string):any 										| Return the constraints of the expression 							|

**Example of use:**

En este ejemplo se utiliza **orm.execute** para ejecutar la misma expression que fue ejecutada en los stages default y cqrs pero en el stage insights.
Esto lo utiliza para implementar el patron CQRS.

```yaml
...
application:
  listeners:
  - name: syncInsights
    on: [insert, bulkInsert, update, delete]
    condition: options.stage.in("default","cqrs")
    after: orm.execute(expression,data,{stage:"insights"}) 
```

View in [CLI - northwind CQRS lab](https://github.com/lambda-orm/lambdaorm-labs/tree/main/labs/cli/08-northwind-cqrs)
