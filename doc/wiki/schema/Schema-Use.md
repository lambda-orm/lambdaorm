# Schema Use

## Simple configuration example

**Configuration using yaml:**

```yaml
domain:
  entities:
    - name: Countries
      primaryKey: ["iso3"]
      uniqueKey: ["name"]
      properties:
        - name: name
          required: true
        - name: iso3
          length: 3
          required: true
infrastructure:        
  mappings:
    - name: mapping1
      entities:
        - name: Countries
          mapping: TBL_COUNTRIES
          properties:
            - name: iso3
              mapping: ISO3
            - name: name
              mapping: NAME
  sources:
    - name: source1
      dialect: MySQL
      mapping: mapping2
      connection: ${CNN_MYSQL}
```

**Configuration using json:**

```json
{ 
  "domain": {
    "entities": [
      {
        "name": "Countries",
        "primaryKey": [ "iso3"  ],
        "uniqueKey": [ "name" ],
        "properties": [
          { "name": "iso3", "required": true, "type": "string", "length": 3 },
          { "name": "name", "required": true, "type": "string" }				
        ]
      }
    ],
  },
  "infrastructure": {
    "mappings":[
      {
        "name":"mapping1",
        "entities":[
          {
            "name": "Countries",
            "mapping": "TBL_COUNTRIES",
            "properties": [
              { "name": "iso3", "mapping": "ISO_3" },
              { "name": "name","mapping": "NAME" },
            ]
          }
        ]
      }
    ],
  	"sources": [
      {
        "name": "source1",
        "mapping": "mapping1",
        "dialect": "MySQL",
        "connection": "${CNN_MYSQL}"
      }
    ]
  }  
}
```

## Build source code

Once the schema is configured or modified, the model can be created or modified by executing the "build" command of [CLI](https://www.npmjs.com/package/lambdaorm-cli)

```sh
lambdaorm build -l node 
```

This command generates the model file with all the entities as a repository file for each entity

model.ts:

``` ts
export class Country {
		iso3?: string
		name?: string		
}
export interface QryCountry {
	iso3: string
	name: number

}
export let Countries : Queryable<QryCountry>		
```

repositoryCountry.ts:

```ts
import { Repository, IOrm } from 'lambdaorm'
import { Country, QryCountry } from './model'
export class CountryRepository extends Repository<Country, QryCountry> {
	constructor (stage?: string, Orm?:IOrm) {
		super('Countries', stage, Orm)
	}
	// Add your code here
}
```

## Set schema

When the orm.init() method is invoked it will execute the ORM initialization according to the schema.

The following options are available to define the settings.

- Invoke the orm.init() method without the first argument and write this configuration to a file called lambdaorm.json or lambdaorm.yaml in the root of the project.
according to the lambdaorm extension you will know how to read it.

- Invoke the orm.init() method passing as an argument the path where the configuration file is located.
This route must include the .yaml or .json extension since that way we will know how to read it.

- Invoke the orm.init() method passing the configuration as a json object as argument

Example passing the configuration file path:

```ts
import { orm } from 'lambdaorm'
(async () => {
	await orm.init('/home/my/app1/lambaORM.yaml')
	try {		
		const countries = await orm.execute(`Countries.map(p=>{name:p.name,code:p.alpha3})
                                                  .sort(p=> desc(p.name))
                                                  .page(1,10)`)
		console.log(countries)	
	} catch (error) {
		console.log(error)
	} finally {
		await orm.end()
	}
})()
```
