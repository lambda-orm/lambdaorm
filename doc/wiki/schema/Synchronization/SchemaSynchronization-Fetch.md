# Fetch

The fetch is the process show differences between sources and schema but not apply changes.The pull process is done by the command  `lambdaorm fetch`.

## CLI

The fetch command allows you to obtain the mapping of the database tables. \
Using the -o argument you can specify the output format, in this case yaml. \
The mapping.yaml file will contain the mapping of the database tables. \

Ejecución del comando fetch

```sh
lambdaorm fetch -o yaml  > mapping.yaml
```

[View lab](https://github.com/lambda-orm/lambdaorm-labs/tree/main/labs/cli/10-fetch)

## Node

The fetch command allows you to obtain the mapping of the database tables. \
Using the -o argument you can specify the output format, in this case yaml. \
The mapping.yaml file will contain the mapping of the database tables. \

```Typescript
import { Orm } from 'lambdaorm'
(async () => {
	const workspace = process.cwd()
	const orm = new Orm(workspace)
	try{		
		const originalSchema = orm.helper.yaml.load(await orm.helper.fs.read(workspace + '/lambdaOrm.yaml'))
		await orm.init(originalSchema)	
		const mappings = await orm.stage.fetch()
		await orm.helper.fs.write( workspace + '/mappings.yaml', orm.helper.yaml.dump(mappings))
	}catch(e){
		console.log(e)
	} finally {
		await orm.end()
	}	
})()
```

[View lab](https://github.com/lambda-orm/lambdaorm-labs/tree/main/labs/node/10-fetch)
