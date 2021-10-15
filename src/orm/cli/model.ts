/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import { Orm, Helper } from '../index'
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
			const config = await orm.lib.getConfig(workspace)
			const db = orm.lib.getDatabase(database, config)
			await orm.init(config)

			const content = orm.database.model(db.name)
			await Helper.writeFile(path.join(config.app.workspace, config.app.src, 'model.d.ts'), content)
		} catch (error) {
			console.error(`error: ${error}`)
		}
	}
}
