const ConfigExtends = require('config-extends');
(async () => {
  await ConfigExtends.apply('config/language/model.yaml', 'src/orm/node/config.json')
  await ConfigExtends.apply('config/language/sql', 'src/orm/language/sql/config.json')
  await ConfigExtends.apply('config/language/nosql', 'src/orm/language/nosql/config.json')
})()
