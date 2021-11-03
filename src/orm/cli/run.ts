/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import { Orm, Helper } from '../index'
import path from 'path'

export class RunCommand implements CommandModule {
	command = 'run';
	describe = 'Run an expression lambda or return information';

	builder (args: Argv) {
		return args
			.option('w', {
				alias: 'workspace',
				describe: 'project path.'
			})
			.option('n', {
				alias: 'name',
				describe: 'Name of database'
			})
			.option('e', {
				alias: 'expression',
				describe: 'Expression to execute'
			})
			.option('d', {
				alias: 'data',
				describe: 'DataContext used to execute expression'
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
		const workspace = path.resolve(process.cwd(), args.workspace as string || '.')
		const expression = args.expression as string
		let dataContext = args.data || {}
		const database = args.name as string
		const sentences = args.sentences as string
		const metadata = args.metadata !== undefined
		const orm = new Orm(workspace)
		if (expression === undefined) {
			console.error('the expression argument is required')
			return
		}
		try {
			const config = await orm.lib.getConfig(workspace)
			const db = orm.lib.getDatabase(database, config)
			await orm.init(config)
			// read context
			if (typeof dataContext === 'string') {
				let data = Helper.tryParse(dataContext as string)
				if (data !== null) {
					dataContext = data
				} else {
					try {
						data = await Helper.readFile(path.join(process.cwd(), dataContext as string))
						dataContext = JSON.parse(data as string)
					} catch (error) {
						throw new Error(`Errror to read context: ${error}`)
					}
				}
			}
			// execute or get metadata
			if (sentences || metadata) {
				if (sentences) {
					const resullt = await orm.expression(expression).sentence(db.name)
					console.log(resullt)
				}
				if (metadata) {
					const model = await orm.expression(expression).model(db.name)
					const metadata = await orm.expression(expression).metadata(db.name)
					console.log('model:')
					console.log(JSON.stringify(model, null, 2))
					console.log('metadata:')
					console.log(JSON.stringify(metadata, null, 2))
				}
			} else {
				const result = await orm.expression(expression).execute(dataContext, db.name)
				console.log(JSON.stringify(result, null, 2))
			}
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			await orm.end()
		}
	}
}
