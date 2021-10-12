/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import { orm, Helper } from '../../index'
import path from 'path'

export class ModelCommand implements CommandModule {
	command = 'model';
	describe = 'Generate model.';

	builder (args: Argv) {
		return args
			.option('d', {
				alias: 'database',
				describe: 'Name of database'
			})
	}

	async handler (args: Arguments) {
		const database = args.database as string
		if (database === undefined) {
			console.error('the database argument is required')
			return
		}
		try {
			orm.init()
			const content = orm.database.model('source')
			await Helper.writeFile(path.join(orm.configInfo.config.paths.src, 'model.d.ts'), content)
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			orm.end()
		}
	}
}
