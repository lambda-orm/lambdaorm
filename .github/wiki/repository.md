Los repositories estan asociados a una entidad y tiene varios metodos para interactuar con la entidad.

Example:

```ts
import { orm } from 'lambdaorm'
import { ProductRespository } from './models/northwind'

(async () => {
	await orm.init()
	const productRepository = new ProductRespository('mydb')
	const country = 'USA'
	const result = awaitproductRepository.query().filter(p => (p.price > 5 && p.supplier.country === country) || (p.inStock < 3))
			.having(p => max(p.price) > 50)
			.map(p => ({ category: p.category.name, largestPrice: max(p.price) }))
			.sort(p => desc(p.largestPrice))
			.execute({ country: country })
	
	console.log(JSON.stringify(result, null, 2))
	await orm.end()
})()
```

|method    		| Description																																						|
|:------------|:-------------------------------------------------------------------------------------:|
|insert				|To insert one record																																		|
|bulkInsert		|To insert records																																			|
|update				|To update one record 																																	|
|updateAll		|to be able to update all the records of an entity																			|
|delete				|To delete one record																																		|
|deleteAll		|delete all records of an entity																												|
|get					|get one record																																					|
|first				|returns the first record																																|
|last					|returns the last record																																|
|take					|returns one record																																			|
|query				|permite realizar una consulta personalizada 																						|

Los repositories son generados por lambdaorm ejecutando el comando update.
Al ejecutar este comando entre otras tareas se crea un repositorio por cada entidad de los esquemas definidos.
Estos archivos solo se generan la primera vez, por lo cual es seguro poder agregar metodos personalizados a estos repositorios.

```ts
import { Respository, IOrm } from 'lambdaorm'
import { Product, QryProduct } from './model'

export class ProductRespository extends Respository<Product, QryProduct> {
	constructor (database?: string, Orm?:IOrm) {
		super('Products', database, Orm)
	}
	// Add your methods here
}
```