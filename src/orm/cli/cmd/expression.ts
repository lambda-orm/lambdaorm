/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import { orm } from '../../index'

export class ExpressionCommand implements CommandModule {
	command = 'expression';
	describe = 'Run an expression lambda or return information';

	builder (args: Argv) {
		return args
			.option('d', {
				alias: 'database',
				describe: 'Name of database'
			})
			.option('e', {
				alias: 'expression',
				describe: 'Expression'
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
		const expression = args.expression as string
		const sentences = args.sentences !== undefined
		const metadata = args.metadata !== undefined
		if (database === undefined) {
			console.error('the database argument is required')
			return
		}
		if (expression === undefined) {
			console.error('the expression argument is required')
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
					const resullt = await orm.expression(expression).sentence(DatabaseData.dialect, DatabaseData.schema)
					console.log(resullt)
				}
				if (metadata) {
					const model = await orm.expression(expression).model(DatabaseData.schema)
					const data = await orm.expression(expression).serialize(DatabaseData.schema)
					console.log('model:')
					console.log(JSON.stringify(model, null, 2))
					console.log('metadata:')
					console.log(JSON.stringify(data, null, 2))
				}
			} else {
				const resullt = await orm.expression(expression).execute({}, database)
				console.log(resullt)
			}
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			orm.end()
		}
	}
}
