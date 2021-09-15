import { orm } from '../orm'
const fs = require('fs')
const path = require('path')

const start = async () => {
  try {
    await orm.init(path.join(process.cwd(), 'src/test/config.yaml'))
    const content = orm.database.model('source')
    fs.writeFileSync('src/test/model.d.ts', content)
  } catch (error) {
    console.log(error)
  }
}
start()
