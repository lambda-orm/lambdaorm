// /* eslint-disable no-mixed-spaces-and-tabs */
// import { CommandModule, Argv, Arguments } from 'yargs'
// import { Orm } from '../index'
// import path from 'path'

// export class ModelCommand implements CommandModule {
// command = 'model';
// describe = 'Generate model.';

// builder (args: Argv) {
// return args
// .option('w', {
// alias: 'workspace',
// describe: 'project path.'
// })
// }

// async handler (args: Arguments) {
// const workspace = path.resolve(process.cwd(), args.workspace as string || '.')
// const orm = new Orm()
// try {
// const config = await orm.lib.getConfig(workspace)
// await orm.lib.writeModel(config)
// } catch (error) {
// console.error(`error: ${error}`)
// }
// }
// }
