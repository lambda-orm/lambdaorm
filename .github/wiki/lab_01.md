
# Laboratory 01

## Create project

creara la carpeta del proyecto con la estructura basica.

```sh
lambdaorm init -w lab_01
```

posicionese dentro de la carpeta del proyecto:

```sh
cd lab_01
```

## Complete Schema

En la creacion del proyecto el esquema fue creado pero sin ninguna entidad.
Agregue la entidad Country como se ve en el siguiente ejemplo

```yaml
paths:
  src: src
  data: data
databases:
  - name: lab_01
    dialect: mysql
    schema: lab_01
    connection:
      type: mysql
      host: localhost
      port: 3306
      username: test
      password: test
      database: test
schemas:
  - name: lab_01
    enums: []
    entities:
      - name: Country
        mapping: COUNTRY
        primaryKey: ["id"]
        uniqueKey: ["name"]
        properties:
          - name: id
            mapping: ID
            type: integer
            nullable: false
          - name: name
            mapping: NAME
            nullable: false
            type: string
            length: 127
          - name: alpha2
            mapping: ALPHA_2
            nullable: false
            type: string
            length: 2
          - name: alpha3
            mapping: ALPHA_3
            nullable: false
            type: string
            length: 3

```

## Update Model

```sh
lambdaorm model
```

se creara el archivo model.d.ts dentro de src con el siguiente contenido

```ts
import './sintaxis'
declare global {
	interface Country{
		id: number
		name: string
		alpha2: string
		alpha3: string
  }
	let Country: Entity<Country>
}
```

