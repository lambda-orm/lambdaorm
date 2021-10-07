/* eslint-disable no-mixed-spaces-and-tabs */
import { Helper } from '../../helper'
import { CommandModule } from 'yargs'

export class VersionCommand implements CommandModule {
	command = 'version';
	describe = 'Prints lambdaORM version this project uses.';

	async handler () {
		const localNpmList = await Helper.exec('npm list --depth=0')
		const localMatches = localNpmList.match(/ lambda-orm@(.*)\n/)
		const localNpmVersion = (localMatches && localMatches[1] ? localMatches[1] : '').replace(/"invalid"/gi, '').trim()

		const globalNpmList = await Helper.exec('npm list -g --depth=0')
		const globalMatches = globalNpmList.match(/ lambda-orm@(.*)\n/)
		const globalNpmVersion = (globalMatches && globalMatches[1] ? globalMatches[1] : '').replace(/"invalid"/gi, '').trim()

		if (localNpmVersion) {
			console.log('Local installed version:', localNpmVersion)
		} else {
			console.log('No local installed lambdaORM was found.')
		}
		if (globalNpmVersion) {
			console.log('Global installed lambdaORM version:', globalNpmVersion)
		} else {
			console.log('No global installed was found.')
		}

		if (localNpmVersion && globalNpmVersion && localNpmVersion !== globalNpmVersion) {
			console.log(`To avoid issues with CLI please make sure your global and local lambdaORM versions match,
	or you are using locally installed lambdaORM instead of global one.`)
		}
	}
}
