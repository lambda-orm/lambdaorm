/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import { orm, Helper } from '../index'

export class ExportCommand implements CommandModule {
	command = 'export';
	describe = 'Export data from a database';

	builder (args: Argv) {
		return args
			.option('d', {
				alias: 'database',
				describe: 'Name of database'
			})
			.option('t', {
				alias: 'target',
				describe: 'Destination file with export data.'
			})
	}

	async handler (args: Arguments) {
		const database = args.database as string
		if (database === undefined) {
			console.error('the database argument is required')
			return
		}
		if (!orm.database.exists(database)) {
			console.error(`database ${database} not exists`)
			return
		}

		try {
			orm.init()
			const exportFile = Helper.nvl(args.target, 'data/' + database + '-export.json')
			const data = await orm.database.export(database)
			await Helper.writeFile(exportFile, JSON.stringify(data), true)
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			orm.end()
		}
	}
}
