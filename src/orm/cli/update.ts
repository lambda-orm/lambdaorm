/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import { Orm } from '../index'
import path from 'path'

export class UpdateCommand implements CommandModule {
	command = 'update';
	describe = 'Update workspace.';

	builder (args: Argv) {
		return args
			.option('w', {
				alias: 'workspace',
				describe: 'project path.'
			})
	}

	async handler (args: Arguments) {
		const workspace = path.resolve(process.cwd(), args.workspace as string || '.')
		const orm = new Orm(workspace)
		try {
			const config = await orm.lib.getConfig(workspace)
			// write models
			await orm.lib.writeModel(config)
			// create structure
			await orm.lib.createStructure(config)
			// add libraries for dialect
			await orm.lib.addDialects(config, path.resolve(__dirname, './../../'))
		} catch (error) {
			console.error(`error: ${error}`)
		}
	}
}
