/* eslint-disable space-before-function-paren */
const ConfigExtends = require('config-extends')
exports.apply = async function apply(callback) {
	await ConfigExtends.apply('src/dev/config/SQL', 'src/lib/language/SQL/config.json')
	await ConfigExtends.apply('src/dev/config/NoSQL', 'src/lib/language/NoSQL/config.json')
	callback()
}
// apply(path.join(function () { console.log('end')})
