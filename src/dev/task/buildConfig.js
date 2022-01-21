/* eslint-disable space-before-function-paren */
const ConfigExtends = require('config-extends')
exports.apply = async function apply(callback) {
	await ConfigExtends.apply('src/dev/config/model.yaml', 'src/lib/parser/config.json')
	await ConfigExtends.apply('src/dev/config/sql', 'src/lib/language/sql/config.json')
	await ConfigExtends.apply('src/dev/config/nosql', 'src/lib/language/nosql/config.json')
	callback()
}
// apply(path.join(function () { console.log('end')})
