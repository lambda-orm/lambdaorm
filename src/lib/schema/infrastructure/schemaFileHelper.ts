import path from 'path'
import { helper } from '../../shared/application/helper'

export class SchemaFileHelper {
	public async getConfigPath (source?: string):Promise<string|undefined> {
		let workspace: string
		let configFile: string | undefined
		workspace = process.cwd()

		if (source === undefined) {
			configFile = await this.getConfigFileName(workspace)
		} else if (typeof source === 'string') {
			if (source.startsWith('http')) {
				return source
			} else if (await helper.fs.exists(source)) {
				const lstat = await helper.fs.lstat(source)
				if (lstat.isFile()) {
					configFile = path.basename(source)
					workspace = path.dirname(source)
				} else {
					workspace = source
					configFile = await this.getConfigFileName(workspace)
				}
			} else {
				console.log(`Not exists path ${source}`)
			}
		} else {
			console.log('Schema: not supported:')
			console.log(source)
		}
		if (configFile) {
			return path.join(workspace, configFile)
		} else {
			return undefined
		}
	}

	public async getConfigFileName (workspace: string): Promise<string | undefined> {
		if (await helper.fs.exists(path.join(workspace, 'lambdaORM.yaml'))) {
			return 'lambdaORM.yaml'
		} else if (await helper.fs.exists(path.join(workspace, 'lambdaORM.yml'))) {
			return 'lambdaORM.yml'
		} else if (await helper.fs.exists(path.join(workspace, 'lambdaORM.json'))) {
			return 'lambdaORM.json'
		} else {
			return undefined
		}
	}
}
