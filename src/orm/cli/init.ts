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
			const configInfo = await orm.lib.getConfigInfo(workspace)
			if (configInfo.configFile === undefined) {
				configInfo.configFile = 'lambdaorm.yaml'
			}
			const db = orm.lib.completeConfig(configInfo, database, dialect, connection)
			await orm.lib.writeConfig(configInfo)

			// create initial structure
			await Helper.createIfNotExists(path.join(workspace, configInfo.config.paths.src))
			await Helper.createIfNotExists(path.join(workspace, configInfo.config.paths.data))
			await Helper.copyFile(path.join(__dirname, './../sintaxis.d.ts'), path.join(workspace, configInfo.config.paths.src, 'sintaxis.d.ts'))

			// si no existe el package.json lo crea
			const packagePath = path.join(workspace, 'package.json')
			if (!await Helper.existsPath(packagePath)) {
				await Helper.writeFile(packagePath, JSON.stringify({ dependencies: {} }, null, 2))
			}

			// si no existe el tsconfig.json lo crea
			const tsconfigPath = path.join(workspace, 'tsconfig.json')
			if (!await Helper.existsPath(tsconfigPath)) {
				const tsconfigContent = orm.lib.getTypescriptContent()
				await Helper.writeFile(tsconfigPath, JSON.stringify(tsconfigContent, null, 2))
			}

			// instala typescript si no esta instalado.
			const typescriptLib = await orm.lib.getLocalPackage('typescript', workspace)
			if (typescriptLib === '') {
				await Helper.exec('npm install typescript -D', workspace)
			}

			// instala ambdaorm si no esta instalado.
			const lambdaormLib = await orm.lib.getLocalPackage('lambdaorm', workspace)
			if (lambdaormLib === '') {
				await Helper.exec('npm install lambdaorm', workspace)
			}
			// si no esta instalada la libreria localmente correspodiente al dialecto la instala
			const lib = orm.lib.getLib(db.dialect)
			const localLib = await orm.lib.getLocalPackage(lib, workspace)
			if (localLib === '') {
				await Helper.exec(`npm install ${lib}`, workspace)
			}
			// si no esta instalada la libreria localmente correspodiente al dialecto la instala
			const globalLib = await orm.lib.getGlobalPackage(lib)
			if (globalLib === '') {
				await Helper.exec(`npm install ${globalLib} -g`, workspace)
			}
		} catch (error) {
			console.error(`error: ${error}`)
		}
	}
}
