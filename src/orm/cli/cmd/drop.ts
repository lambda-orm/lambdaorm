/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import { orm } from '../../index'

export class DropCommand implements CommandModule {
	command = 'drop';
	describe = 'Removes all database objects but not the database.';

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
			.option('f', {
				alias: 'force',
				describe: 'If there is an error in a statement, continue executing the next statements.'
			})
	}

	async handler (args: Arguments) {
		const database = args.database as string
		const sentences = args.sentences !== undefined
		const force = args.force !== undefined
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
			if (sentences) {
				const result = await orm.database.clean(database).sentence()
				console.log(result)
			} else {
				await orm.database.clean(database).execute(force)
			}
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			orm.end()
		}
	}
}
