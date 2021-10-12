/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import { Orm, Database, Helper } from '../index'
import path from 'path'

export class ExportCommand implements CommandModule {
	command = 'export';
	describe = 'Export data from a database';

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
			.option('t', {
				alias: 'target',
				describe: 'Destination file with export data.'
			})
	}

	async handler (args: Arguments) {
		const workspace = path.resolve(process.cwd(), args.workspace as string || '.')
		const database = args.database as string
		const target = path.resolve(process.cwd(), args.target as string || '.')
		const orm = new Orm()

		try {
			await orm.init(workspace)
			const configInfo = await orm.lib.getConfigInfo(workspace)
			// get database
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

			const exportFile = path.join(target, db.name + '-export.json')
			const data = await orm.database.export(db.name)
			await Helper.writeFile(exportFile, JSON.stringify(data), true)
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			await orm.end()
		}
	}
}
