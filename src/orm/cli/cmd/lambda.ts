/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import { orm } from '../../index'

export class LambdaCommand implements CommandModule {
	command = 'run';
	describe = 'Run an expression lambda or return information';

	builder (args: Argv) {
		return args
			.option('d', {
				alias: 'database',
				describe: 'Name of database'
			})
			.option('l', {
				alias: 'lambda',
				describe: 'Lambda sentence'
			})
			.option('s', {
				alias: 'sentences',
				describe: 'Generates the sentences but does not apply.'
			})
			.option('m', {
				alias: 'metadata',
				describe: 'Generates the metadata but does not apply.'
			})
	}

	async handler (args: Arguments) {
		const database = args.database as string
		const lambda = args.lambda as string
		const sentences = args.sentences !== undefined
		const metadata = args.metadata !== undefined
		if (database === undefined) {
			console.error('the database argument is required')
			return
		}
		if (lambda === undefined) {
			console.error('the lambda argument is required')
			return
		}
		if (!orm.database.exists(database)) {
			console.error(`database ${database} not exists`)
			return
		}
		try {
			orm.init()

			if (sentences || metadata) {
				const DatabaseData = orm.database.get(database)
				if (sentences) {
					const resullt = await orm.expression(lambda).sentence(DatabaseData.dialect, DatabaseData.schema)
					console.log(resullt)
				}
				if (metadata) {
					const model = await orm.expression(lambda).model(DatabaseData.schema)
					const data = await orm.expression(lambda).serialize(DatabaseData.schema)
					console.log('model:')
					console.log(JSON.stringify(model, null, 2))
					console.log('metadata:')
					console.log(JSON.stringify(data, null, 2))
				}
			} else {
				const resullt = await orm.expression(lambda).execute({}, database)
				console.log(resullt)
			}
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			orm.end()
		}
	}
}
