# Development

## Tasks

Main Tasks:

| task   															| Description                                  									  		|
|:-----------------------------------	|:--------------------------------------------------------------------|
| `npm run test`											| Run all tests. 															  											|
| `npm run release`										| Create a new release. 																							|

Subs Tasks:

| task   															| Description                                  									  		|
|:-----------------------------------	|:--------------------------------------------------------------------|
| `npm run lint`											| Run the linter. 																										|
| `npm run build`											| Build the project. 																									|
| `npm run dist`											| Build the project and create a prepare nuw distribution. 						|
| `npm run docs`											| Generate the documentation. 																				|
| `npm run integration-test`					| Run the integration tests. 																					|

Create test tasks

| task   																				| Description                                  							|
|:--------------------------------------------	|:----------------------------------------------------------|
| `npm run build-test`													| Build the test. 																					|
| - `npm run clean-data`												| Clean the data. 																					|
| - `npm run clean-test`												| Clean the test. 																					|
| - `npm run northwind-build-test`							| Build the test for northwind. 														|
| - `npm run countries-build-test`							| Build the test for countries. 														|

Northwind create test tasks

| task   																				| Description                                  							|
|:--------------------------------------------	|:----------------------------------------------------------|
| `npm run db-up`															  | Create the database. 																			|
| - `npm run populate-source`									  | Populate the source. 																			|
| - `npm run populate-databases`								| Populate the databases. 																	|
| `npm run create-data-for-test`							  | Create the data for test. 																|
| `npm run create-data-for-test-suite`				  | Create the data for test suite. 													|
| `npm run create-test`												  | Create the test. 																					|
| `npm run create-test-suite`									  | Create the test suite. 																		|
| `npm run db-down`														  | Drop the database. 																				|

Countries create test tasks

| task   																				| Description                                  							|
|:--------------------------------------------	|:----------------------------------------------------------|
| `npm run countries-db-up`											| Create the database for countries. 												|
| - `npm run countries-populate-source`					| Populate the source for countries. 												|
| `npm run countries-create-data-for-test-suite`| Create the data for test suite for countries. 						|
| `npm run countries-create-test-suite`					| Create the test suite for countries. 											|
| `npm run countries-db-down`										| Drop the database for countries. 													|
