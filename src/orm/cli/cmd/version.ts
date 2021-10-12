/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule } from 'yargs'
import { orm } from './../../index'

export class VersionCommand implements CommandModule {
	command = 'version';
	describe = 'Prints lambdaorm version this project uses.';

	async handler () {
		const packageName = 'lambdaorm'
		const localNpmVersion = await orm.lib.getLocalPackage(packageName, process.cwd())
		const globalNpmVersion = await orm.lib.getGlobalPackage(packageName)

		if (localNpmVersion) {
			console.log('Local installed version:', localNpmVersion)
		} else {
			console.log(`No local installed ${packageName} was found.`)
		}
		if (globalNpmVersion) {
			console.log(`Global installed ${packageName} version: ${globalNpmVersion}`)
		} else {
			console.log('No global installed was found.')
		}
		if (localNpmVersion && globalNpmVersion && localNpmVersion !== globalNpmVersion) {
			console.log(`To avoid issues with CLI please make sure your global and local ${packageName} versions match, or you are using locally installed ${packageName} instead of global one.`)
		}
	}
}
