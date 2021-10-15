import { CommandModule, Argv, Arguments } from 'yargs'
import path from 'path'
import { orm, Helper } from './../index'

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

			// create workspace
			await Helper.createIfNotExists(workspace)
			// create config file if not exists
			const config = await orm.lib.getConfig(workspace)
			if (config.app.workspace === undefined) {
				config.app.workspace = workspace
			}
			if (config.app.configFile === undefined) {
				config.app.configFile = 'lambdaorm.yaml'
			}
			const db = orm.lib.completeConfig(config, database, dialect, connection)
			await orm.lib.writeConfig(config)

			// create initial structure
			await Helper.createIfNotExists(path.join(config.app.workspace, config.app.src))
			await Helper.createIfNotExists(path.join(config.app.workspace, config.app.data))
			await Helper.copyFile(path.join(__dirname, './../sintaxis.d.ts'), path.join(config.app.workspace, config.app.src, 'sintaxis.d.ts'))

			// if the package.json does not exist create it
			const packagePath = path.join(config.app.workspace, 'package.json')
			if (!await Helper.existsPath(packagePath)) {
				await Helper.writeFile(packagePath, JSON.stringify({ dependencies: {} }, null, 2))
			}

			// if there is no tsconfig.json create it
			const tsconfigPath = path.join(config.app.workspace, 'tsconfig.json')
			if (!await Helper.existsPath(tsconfigPath)) {
				const tsconfigContent = orm.lib.getTypescriptContent()
				await Helper.writeFile(tsconfigPath, JSON.stringify(tsconfigContent, null, 2))
			}

			// install typescript if not installed.
			const typescriptLib = await orm.lib.getLocalPackage('typescript', config.app.workspace)
			if (typescriptLib === '') {
				await Helper.exec('npm install typescript -D', config.app.workspace)
			}

			// install lambdaorm if it is not installed.
			const lambdaormLib = await orm.lib.getLocalPackage('lambdaorm', config.app.workspace)
			if (lambdaormLib === '') {
				await Helper.exec('npm install lambdaorm', config.app.workspace)
			}
			// if the library is not installed locally corresponding to the dialect it will be installed
			const lib = orm.lib.getLib(db.dialect)
			const localLib = await orm.lib.getLocalPackage(lib, config.app.workspace)
			if (localLib === '') {
				await Helper.exec(`npm install ${lib}`, config.app.workspace)
			}
			// if the library is not installed locally corresponding to the dialect it will be installed
			const globalLib = await orm.lib.getGlobalPackage(lib)
			if (globalLib === '') {
				await Helper.exec(`npm install ${globalLib} -g`, config.app.workspace)
			}
		} catch (error) {
			console.error(`error: ${error}`)
		}
	}
}
