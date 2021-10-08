/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import path from 'path'
import { Utils } from '../utils'

export class InitCommand implements CommandModule {
	command = 'init';
	describe = 'Generates lambdaORM project structure.';

	builder (args: Argv) {
		return args
			.option('w', {
				alias: 'workspace',
				describe: 'project path.'
			})
			.option('n', {
				alias: 'name',
				describe: 'Name of the project.'
			})
			.option('d', {
				alias: 'dialect',
				default: 'mysql',
				describe: 'Database type you\'ll use in your project.'
			})
			.option('c', {
				alias: 'connection',
				describe: 'string connection to database'
			})
	}

	async handler (args: Arguments) {
		try {
			const name = args.name as string
			const workspace = args.workspace as string || path.join(process.cwd(), name)
			const dialect: string = args.dialect as string
			const connection: string = args.connection as string
			await Utils.writeConfig(workspace, name, dialect, connection)
		} catch (error) {
			console.error(`error: ${error}`)
		}
	}
}
