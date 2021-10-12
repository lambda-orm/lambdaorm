/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import { Orm, Database, Helper } from '../index'
import path from 'path'

export class ImportCommand implements CommandModule {
	command = 'import';
	describe = 'Import data from file to database';

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
			.option('s', {
				alias: 'source',
				describe: 'Source file to import.'
			})
	}

	async handler (args: Arguments) {
		const workspace = path.resolve(process.cwd(), args.workspace as string || '.')
		const database = args.database as string
		const source = args.source as string
		const orm = new Orm()

		if (source === undefined) {
			console.error('the source argument is required')
			return
		}

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
			// get content
			const content = await Helper.readFile(source)
			if (content === null) {
				throw new Error(`source: ${source} not found or empty`)
			}
			// import data
			const data = JSON.parse(content)
			await orm.database.import(db.name, data)
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			await orm.end()
		}
	}
}
