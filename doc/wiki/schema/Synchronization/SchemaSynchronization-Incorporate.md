# Incorporate

Onboarding is the process of updating the schema defined in the configuration file by introspecting a data file and then applying the changes to the sources (databases) and then importing the data into the sources (Databases). The introspection process is performed using the `lambdaorm incorporate` command.

## CLI

The incorporate command does the following:

- Update the schema
- Generate and apply scripts to synchronize the schema with the data source
- Import data from data source

Running the incorporate command:

```sh
lambdaorm incorporate -d countries.json -n countries
```

Files generated:

```sh
├── orm_state
│   ├── default-data.json
│   ├── default-ddl-20240502T113912983Z-push-default.sql
│   └── default-model.json
```

Scripts generated in **default-ddl-20240502T113912983Z-push-default.sql**:

```sql
CREATE TABLE CountriesLanguages (id INTEGER  AUTO_INCREMENT,languageCode VARCHAR(4) NOT NULL ,countryName VARCHAR(32) NOT NULL ,CONSTRAINT CountriesLanguages_PK PRIMARY KEY (id));
ALTER TABLE CountriesLanguages ADD CONSTRAINT CountriesLanguages_UK UNIQUE (countryName,languageCode);
CREATE TABLE Languages (code VARCHAR(4) NOT NULL ,name VARCHAR(16) NOT NULL ,CONSTRAINT Languages_PK PRIMARY KEY (code));
CREATE TABLE Regions (code VARCHAR(2) NOT NULL ,name VARCHAR(32) NOT NULL ,CONSTRAINT Regions_PK PRIMARY KEY (code));
CREATE TABLE Positions (lat DECIMAL(10,4) NOT NULL ,`long` DECIMAL(10,4) NOT NULL ,CONSTRAINT Positions_PK PRIMARY KEY (lat));
ALTER TABLE Positions ADD CONSTRAINT Positions_UK UNIQUE (`long`);
CREATE TABLE Timezones (GmtOffset INTEGER  ,name VARCHAR(32) NOT NULL ,positionLat DECIMAL(10,4) NOT NULL ,countryName VARCHAR(32) NOT NULL ,CONSTRAINT Timezones_PK PRIMARY KEY (name));
CREATE TABLE Countries (name VARCHAR(32) NOT NULL ,phoneCode INTEGER NOT NULL ,priority INTEGER NOT NULL ,regionCode VARCHAR(2) NOT NULL ,CONSTRAINT Countries_PK PRIMARY KEY (name));
ALTER TABLE Countries ADD CONSTRAINT Countries_UK UNIQUE (phoneCode);
ALTER TABLE CountriesLanguages ADD CONSTRAINT CountriesLanguages_countries_FK FOREIGN KEY (countryName) REFERENCES Countries (name);
ALTER TABLE CountriesLanguages ADD CONSTRAINT CountriesLanguages_languages_FK FOREIGN KEY (languageCode) REFERENCES Languages (code);
ALTER TABLE Timezones ADD CONSTRAINT Timezones_position_FK FOREIGN KEY (positionLat) REFERENCES Positions (lat);
ALTER TABLE Timezones ADD CONSTRAINT Timezones_countries_FK FOREIGN KEY (countryName) REFERENCES Countries (name);
ALTER TABLE Countries ADD CONSTRAINT Countries_region_FK FOREIGN KEY (regionCode) REFERENCES Regions (code);
```

[View lab](https://github.com/lambda-orm/lambdaorm-labs/tree/main/labs/cli/13-incorporate)

## Node

The incorporate command does the following:

- Update the schema
- Generate and apply scripts to synchronize the schema with the data source
- Import data from data source

```Typescript
import { Orm } from 'lambdaorm'
(async () => {
	const workspace = process.cwd()
	const schemaPath = workspace + '/lambdaOrm.yaml'		
	const orm = new Orm(workspace)
	try{
		const data = JSON.parse( await orm.helper.fs.read(workspace + '/countries.json') || '{}')
		await orm.init(schemaPath)	
		await orm.stage.incorporate(data, 'countries')
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

[View lab](https://github.com/lambda-orm/lambdaorm-labs/tree/main/labs/node/13-incorporate)
