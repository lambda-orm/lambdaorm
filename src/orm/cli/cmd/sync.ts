/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import { orm } from '../../index'

export class SyncCommand implements CommandModule {
	command = 'sync';
	describe = 'Syncronize database.';

	builder (args: Argv) {
		return args
			.option('d', {
				alias: 'database',
				describe: 'Name of database'
			})
			.option('s', {
				alias: 'sentences',
				describe: 'Generates the sentences but does not apply.'
			})
	}

	async handler (args: Arguments) {
		const database = args.database as string
		const sentences = args.sentences as string
		if (database === undefined) {
			console.error('the database argument is required')
			return
		}
		try {
			orm.init()
			if (sentences !== undefined) {
				const result = await orm.database.sync(database).sentence()
				console.log(result)
			} else {
				await orm.database.sync(database).execute()
			}
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			orm.end()
		}
	}
}
