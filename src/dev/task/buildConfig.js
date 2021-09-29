const ConfigExtends = require('config-extends')
exports.apply = async function apply (callback) {
	await ConfigExtends.apply('src/dev/config/model.yaml', 'src/orm/node/config.json')
	await ConfigExtends.apply('src/dev/config/sql', 'src/orm/language/sql/config.json')
	await ConfigExtends.apply('src/dev/config/nosql', 'src/orm/language/nosql/config.json')
	callback()
}
// apply(path.join(function () { console.log('end')})
