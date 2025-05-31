# Introspect

Introspection is the process of updating the schema defined in the configuration file by introspecting a data file and then applying the changes to the sources (Databases). The introspection process is performed using the `lambdaorm introspect` command.

## CLI

The introspect command allows you to obtain the schema from data introspection.

Running the introspect command:

```sh
lambdaorm introspect -d countries.json -n counties
```

This command updates the schema based on data introspection, in this case from the country.json file.

Files created:

```sh
├── countries.json
├── orm_state
│   ├── default-ddl-20240502T182117031Z-push-default.sql
│   └── default-model.json
├── docker compose.yaml
└── lambdaORM.yaml
```

Script the synchronization in file "default-ddl-20240502T182117031Z-push-default.sql":

```sql
CREATE TABLE CountiesLanguages (id INTEGER  AUTO_INCREMENT,languageCode VARCHAR(4) NOT NULL ,countyName VARCHAR(32) NOT NULL ,CONSTRAINT CountiesLanguages_PK PRIMARY KEY (id));
ALTER TABLE CountiesLanguages ADD CONSTRAINT CountiesLanguages_UK UNIQUE (countyName,languageCode);
CREATE TABLE Languages (code VARCHAR(4) NOT NULL ,name VARCHAR(16) NOT NULL ,CONSTRAINT Languages_PK PRIMARY KEY (code));
CREATE TABLE Regions (code VARCHAR(2) NOT NULL ,name VARCHAR(32) NOT NULL ,CONSTRAINT Regions_PK PRIMARY KEY (code));
CREATE TABLE Positions (lat DECIMAL(10,4) NOT NULL ,`long` DECIMAL(10,4) NOT NULL ,CONSTRAINT Positions_PK PRIMARY KEY (lat));
ALTER TABLE Positions ADD CONSTRAINT Positions_UK UNIQUE (`long`);
CREATE TABLE Timezones (GmtOffset INTEGER  ,name VARCHAR(32) NOT NULL ,positionLat DECIMAL(10,4) NOT NULL ,countyName VARCHAR(32) NOT NULL ,CONSTRAINT Timezones_PK PRIMARY KEY (name));
CREATE TABLE Counties (name VARCHAR(32) NOT NULL ,phoneCode INTEGER NOT NULL ,priority INTEGER NOT NULL ,regionCode VARCHAR(2) NOT NULL ,CONSTRAINT Counties_PK PRIMARY KEY (name));
ALTER TABLE Counties ADD CONSTRAINT Counties_UK UNIQUE (phoneCode);
ALTER TABLE CountiesLanguages ADD CONSTRAINT CountiesLanguages_counties_FK FOREIGN KEY (countyName) REFERENCES Counties (name);
ALTER TABLE CountiesLanguages ADD CONSTRAINT CountiesLanguages_languages_FK FOREIGN KEY (languageCode) REFERENCES Languages (code);
ALTER TABLE Timezones ADD CONSTRAINT Timezones_position_FK FOREIGN KEY (positionLat) REFERENCES Positions (lat);
ALTER TABLE Timezones ADD CONSTRAINT Timezones_counties_FK FOREIGN KEY (countyName) REFERENCES Counties (name);
ALTER TABLE Counties ADD CONSTRAINT Counties_region_FK FOREIGN KEY (regionCode) REFERENCES Regions (code);
```

[View lab](https://github.com/lambda-orm/lambdaorm-labs/tree/main/labs/cli/12-introspect)

## Node

- How to run the introspect method to:
   - Update the schema according to the introspected type of data.
   - Synchronize the schema with the data source.
   - Create files with the model status and update scripts.

```Typescript
import { Orm } from 'lambdaorm'
(async () => {
	const workspace = process.cwd()
	const schemaPath = workspace + '/lambdaORM.yaml'		
	const orm = new Orm(workspace)
	try{
		const data = JSON.parse( await orm.helper.fs.read(workspace + '/countries.json') || '{}')
		await orm.init(schemaPath)	
		await orm.stage.introspect(data, 'countries')
	}catch(e){
		console.log(e)
	} finally {
		await orm.end()
	}	
})()
```

**As a result:**

- The "lambdaORM.yaml" file will be updated according to the type introspected from the data.
- The updated schema is synchronized with the data source.
- Files are created with the model status and update scripts.

[View lab](https://github.com/lambda-orm/lambdaorm-labs/tree/main/labs/node/12-introspect)
