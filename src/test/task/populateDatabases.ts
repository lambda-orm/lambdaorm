import fs from 'fs'
import { orm } from '../../orm'

async function schemaSync(target: string) {
  await orm.database.sync(target).execute()
}
async function schemaDrop(target: string, TryAndContinue: boolean = false) {
  if (orm.database.exists(target))
    await orm.database.clean(target).execute(TryAndContinue)
}
async function schemaExport(source: string) {
  let exportFile = 'src/test/data/' + source + '-export.json'
  let data = await orm.database.export(source)
  fs.writeFileSync(exportFile, JSON.stringify(data, null, 2))
}
async function schemaImport(source: string, target: string) {
  let sourceFile = 'src/test/data/' + source + '-export.json'
  let data = JSON.parse(fs.readFileSync(sourceFile, 'utf8'))
  await orm.database.import(target, data)
}

export async function apply(configPath: string, databases: string[], callback: any) {

  await orm.init(configPath)

  await schemaSync('source')
  await schemaExport('source')

  for (const p in databases) {
    const database = databases[p]
    await schemaDrop(database, true)
    await schemaSync(database)
    await schemaImport('source', database)
    await schemaExport(database)
  }
  await orm.end()
  callback()
}
//apply('./src/test/config.yaml', ['mysql', 'postgres'], function () { console.log('end')})