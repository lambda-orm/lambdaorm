import { CommandModule, Argv, Arguments } from 'yargs'
import path from 'path'
import { Orm, Helper } from './../index'

export class InitCommand implements CommandModule {
	command = 'init';
	describe = 'Generates lambdaorm project structure.';

	builder (args: Argv) {
		return args
			.option('w', {
				alias: 'workspace',
				default: 'my-project',
				describe: 'project path.'
			})
			.option('n', {
				alias: 'name',
				describe: 'Name of database.'
			})
			.option('d', {
				alias: 'dialect',
				describe: 'Database type you\'ll use in your project.'
			})
			.option('c', {
				alias: 'connection',
				describe: 'string connection to database'
			})
	}

	async handler (args: Arguments) {
		try {
			const workspace = path.resolve(process.cwd(), args.workspace as string || '.') // args.workspace as string || path.join(process.cwd(), name)
			const database = args.name as string || path.basename(workspace) // name of database
			const dialect: string = args.dialect as string
			const connection: string = args.connection as string
			const orm = new Orm(workspace)

			// create workspace
			await Helper.createIfNotExists(workspace)
			// create config file if not exists
			const config = await orm.lib.getConfig(workspace)
			// if (config.app.workspace === undefined) {
			// config.app.workspace = workspace
			// }
			if (config.app.configFile === undefined) {
				config.app.configFile = 'lambdaorm.yaml'
			}
			orm.lib.completeConfig(config, database, dialect, connection)
			// write lambdaorm config
			await orm.lib.writeConfig(config)
			// create structure
			await orm.lib.createStructure(config)
			// add libraries for dialect
			await orm.lib.addDialects(config)
		} catch (error) {
			console.error(`error: ${error}`)
		}
	}
}
