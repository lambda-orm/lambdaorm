/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import { Orm, Database } from '../index'
import path from 'path'

export class SyncCommand implements CommandModule {
	command = 'sync';
	describe = 'Syncronize database.';

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
				alias: 'sentences',
				describe: 'Generates the sentences but does not apply.'
			})
	}

	async handler (args: Arguments) {
		const workspace = path.resolve(process.cwd(), args.workspace as string || '.')
		const database = args.name as string
		const sentences = args.sentences as string
		const orm = new Orm(workspace)
		try {
			const config = await orm.lib.getConfig(workspace)
			const db = orm.lib.getDatabase(database, config)
			await orm.init(config)

			if (sentences !== undefined) {
				const result = await orm.database.sync(db.name).sentence()
				console.log(result)
			} else {
				await orm.database.sync(db.name).execute()
			}
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			orm.end()
		}
	}
}
