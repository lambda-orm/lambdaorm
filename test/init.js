const ConfigExtends = require('config-extends')
const orm = require('../dist/orm.js')
const dialect = 'mysql'

before(async () => {
  const schemas = await ConfigExtends.apply('test/config/schema')
  for (const p in schemas) {
    const schema = schemas[p]
    orm.applySchema(schema)
  }
  const cnx = { name: 'northwind', dialect: dialect, host: '0.0.0.0', port: 3306, user: 'root', password: 'admin', schema: 'northwind', database: 'northwind' }
  orm.addConnection(cnx)
})
