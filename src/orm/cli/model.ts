/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import { Orm, Helper, Database } from '../index'
import path from 'path'

export class ModelCommand implements CommandModule {
	command = 'model';
	describe = 'Generate model.';

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
	}

	async handler (args: Arguments) {
		const workspace = path.resolve(process.cwd(), args.workspace as string || '.')
		const database = args.name as string
		const orm = new Orm()
		try {
			const configInfo = await orm.lib.getConfigInfo(workspace)

			let db:Database|undefined
			if (database === undefined) {
				if (configInfo.config.databases.length === 1) {
					db = configInfo.config.databases[0]
				} else {
					throw new Error('the database argument is required')
				}
			} else {
				db = configInfo.config.databases.find(p => p.name === database)
				if (db === undefined) {
					throw new Error(`database: ${database} not found in config`)
				}
			}

			await orm.init(workspace, false)
			const content = orm.database.model(db.name)
			await Helper.writeFile(path.join(workspace, configInfo.config.paths.src, 'model.d.ts'), content)
		} catch (error) {
			console.error(`error: ${error}`)
		}
	}
}
