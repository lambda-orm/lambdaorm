/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import { orm } from '../index'
import fs from 'fs'

export class ImportCommand implements CommandModule {
	command = 'import';
	describe = 'Import data from file to database';

	builder (args: Argv) {
		return args
			.option('d', {
				alias: 'database',
				describe: 'Name of database'
			})
			.option('s', {
				alias: 'source',
				describe: 'Source file to import.'
			})
	}

	async handler (args: Arguments) {
		const database = args.database as string
		const source = args.source as string
		if (database === undefined) {
			console.error('the database argument is required')
			return
		}
		if (source === undefined) {
			console.error('the source argument is required')
			return
		}
		if (!orm.database.exists(database)) {
			console.error(`database ${database} not exists`)
			return
		}
		if (!fs.existsSync(source)) {
			console.error(`source: ${source} not exists`)
			return
		}

		try {
			orm.init()
			const data = JSON.parse(fs.readFileSync(source, 'utf8'))
			await orm.database.import(database, data)
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			orm.end()
		}
	}
}
