/* eslint-disable space-before-function-paren */
const { configExtends } = require('config-extends')
exports.apply = async function apply(callback) {
	await configExtends.apply('src/dev/config/SQL', 'src/lib/sentence/infrastructure/adapters/Sql/config.json')
	await configExtends.apply('src/dev/config/NoSQL', 'src/lib/sentence/infrastructure/adapters/NoSql/config.json')
	callback()
}
// apply(path.join(function () { console.log('end')})
// config-extends apply -s 'src/dev/config/SQL' -t 'src/lib/sentence/infrastructure/adapters/Sql/config.json'
// config-extends apply -s 'src/dev/config/NoSQL' -t 'src/lib/sentence/infrastructure/adapters/NoSql/config.json'
