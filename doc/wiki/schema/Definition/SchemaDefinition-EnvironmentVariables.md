# Environment Variables on Schema

En toda las propiedades de un esquema se puede utilizar variables de entorno. \
Para ellos se debe utilizar la notación `$` or `${}`.

## Ejemplos de uso

**Use environment variables to set the connection to the database:**

```yaml
...
 sources:
    - name: source1
      dialect: MySQL
      mapping: mapping1
      connection: $CNN_MYSQL
    - name: source2
      dialect: PostgreSQL
      mapping: mapping2
      connection: $CNN_POSTGRES
...
```

**Use environment variables to obtain the KEY for encryption functions:**

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
