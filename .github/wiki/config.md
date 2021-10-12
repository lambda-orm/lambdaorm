# Config

Lambda OMR configuration is through a file called lambdaorm.yaml
by default it must be in the root of the project.

The file structure is divided into 3 parts.

- path: paht configuration
- databases: database configuration
- schema:  schemas configuration (represents the entity model that is mapped with the tables of a database)
		
```yaml
path:
  src: path where the project code is located
  data: path where files generated in operations synchronization, export, import, etc. will be stored
databases:
  - name: name with which the database will be identified
    schema: database schema name
    dialect: [mysql|mariadb|postgres|mssql|oracle|mongo]
    connection: connectionString  | environment variable with the connectionString
schemas:
  schemaCode:
    name: schema name
    enums: []
    entities:
      - name: name of entity
        mapping: name table on database
        primaryKey: []
        uniqueKey: []
        properties:
          - name: name of property
            mapping: name field on database
            type: [string|boolean|integer|decimal|datetime|date|time]
            nullable: [true|false]
            autoincrement: [true|false]
        indexes:
          - name: nameOfIndex
            fields: []
        relations:
          - name: name of relation
            type: [manyToOne|oneTpMany|oneToOne]
            composite: [true|false]
            from: field From
            entity: name of entity related
            to: field in entity related			
```

Example:

```yaml
ath:
  src: src
  data: data
databases:
  - name: mydb
    schema: library
    dialect: postgres
    connection: MY_DB_STRING_CONNECTION
  - name: otherDb
    schema: library
    dialect: mysql
    connection:
      host: "0.0.0.0"
      port: 3307
      user: test
      password: test
      database: northwind
      multipleStatements: true
      waitForConnections: true
      connectionLimit: 10
      queueLimit: 0
schemas:
  library:
    name: library
    enums:
    entities:
      - name: Reader
        mapping: TB_READERS
        primaryKey: ["id"]
        uniqueKey: ["name"]
        properties:
          - name: id
            mapping: READER_ID
            type: integer
            nullable: false
            autoincrement: true
          - name: name
            mapping: NAME
            nullable: false
            type: string
            length: 80
      - name: Book
        mapping: TB_BOOKS
        primaryKey: ["id"]
        uniqueKey: ["title"]
        properties:
          - name: id
            mapping: BOOK_ID
            type: integer
            length: 14
            nullable: false
            autoincrement: true
          - name: title
            mapping: TITLE
            nullable: false
            type: string
            length: 80
      - name: Loan
        mapping: TB_LOAN
        primaryKey: ["readerId", "bookId"]
        uniqueKey: ["lastName", "firstName"]
        properties:
          - name: readerId
            mapping: READER_ID
            type: integer
            nullable: false
          - name: bookId
            mapping: BOOK_ID
            type: integer
            nullable: false         
        relations:
          - name: reader
            type: oneToMany
            from: readerId
            entity: Reader
            to: id
          - name: book
            type: oneToMany
            from: bookId
            entity: Book
            to: id  

```

If you want to place the configuration file in another location or with another name, you must pass the path including the name of the configuration file to the method:  orm.init(configPath)

Example:

```ts
import { orm } from 'lambdaorm'
(async () => {
await orm.init('/home/my/db/book.yaml')
try {
	const result = await orm.expression('Loan.map(p=>{user:p.reader.name,book:p.book.title,date:p.date})').execute('mydb')
	console.log(result)	
} catch (error) {
	console.log(error)
} finally {
	await orm.end()
}
})()
```
